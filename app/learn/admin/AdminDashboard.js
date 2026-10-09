'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { createClient } from '../../../lib/supabase/client';

// 表示の可否はここで判定するが、実際のデータ保護は Supabase の RLS（管理者メールのみ全件 select 可）で行う
const ADMIN_EMAIL = 'hanamanajun@gmail.com';

const KIND_LABEL = {
  request: '作ってほしいレッスン',
  want: '改善してほしいこと',
  complaint: '困ったこと・不満',
  other: 'その他',
};

function formatDateTime(iso) {
  if (!iso) return '';
  return new Date(iso).toLocaleString('ja-JP', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' });
}

export default function AdminDashboard({ titles }) {
  const [state, setState] = useState('loading'); // loading | guest | denied | ready | error
  const [likes, setLikes] = useState([]);
  const [feedback, setFeedback] = useState([]);
  const [kindFilter, setKindFilter] = useState('all');
  const supabase = createClient();

  useEffect(() => {
    let active = true;
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { if (active) setState('guest'); return; }
      if (user.email !== ADMIN_EMAIL) { if (active) setState('denied'); return; }

      const [likesRes, fbRes] = await Promise.all([
        supabase.from('lesson_likes').select('course_id, lesson_id, created_at'),
        supabase.from('lesson_feedback').select('id, kind, message, created_at').order('created_at', { ascending: false }),
      ]);
      if (!active) return;
      if (likesRes.error || fbRes.error) { setState('error'); return; }
      setLikes(likesRes.data || []);
      setFeedback(fbRes.data || []);
      setState('ready');
    })();
    return () => { active = false; };
  }, [supabase]);

  async function deleteFeedback(id) {
    if (!window.confirm('このご意見を削除しますか？（元に戻せません）')) return;
    const { error } = await supabase.from('lesson_feedback').delete().eq('id', id);
    if (error) { window.alert('削除に失敗しました。'); return; }
    setFeedback(list => list.filter(f => f.id !== id));
  }

  if (state === 'loading') return <div className="review-msg">読み込み中…</div>;
  if (state === 'guest') {
    return (
      <div className="review-msg">
        <h2>ログインが必要です</h2>
        <Link href="/login" className="quiz-btn-primary">ログイン</Link>
      </div>
    );
  }
  if (state === 'denied') return <div className="review-msg"><h2>管理者のみ閲覧できます</h2></div>;
  if (state === 'error') {
    return (
      <div className="review-msg">
        <h2>データを取得できませんでした</h2>
        <p>Supabase に lesson_likes / lesson_feedback テーブル（supabase-setup.sql）が作成されているか確認してください。</p>
      </div>
    );
  }

  // いいねをレッスンごとに集計（多い順）
  const counts = new Map();
  for (const l of likes) {
    const key = `${l.course_id}/${l.lesson_id}`;
    counts.set(key, (counts.get(key) || 0) + 1);
  }
  const ranking = Array.from(counts, ([key, count]) => {
    const [courseId, lessonId] = key.split('/');
    const t = titles[courseId];
    return { key, courseId, lessonId, count, course: t?.course || courseId, lesson: t?.lessons?.[lessonId] || lessonId };
  }).sort((a, b) => b.count - a.count);

  const shownFeedback = kindFilter === 'all' ? feedback : feedback.filter(f => f.kind === kindFilter);

  return (
    <div className="admin-dash">
      <section className="notes-section">
        <h2 className="notes-heading"><i className="ph ph-heart" /> レッスンのいいね（合計 {likes.length}）</h2>
        {ranking.length === 0 ? (
          <p className="notes-empty">まだいいねはありません。</p>
        ) : (
          <table className="admin-table">
            <thead><tr><th>順位</th><th>教材 / レッスン</th><th>いいね数</th></tr></thead>
            <tbody>
              {ranking.map((r, i) => (
                <tr key={r.key}>
                  <td>{i + 1}</td>
                  <td>
                    <Link href={`/learn/${r.courseId}/${r.lessonId}`}>{r.lesson}</Link>
                    <div className="admin-sub">{r.course}</div>
                  </td>
                  <td><strong>{r.count}</strong></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      <section className="notes-section">
        <h2 className="notes-heading"><i className="ph ph-chat-circle-text" /> ご意見・ご要望（{feedback.length}件）</h2>
        <div className="learn-filter-tabs">
          {[['all', 'すべて'], ...Object.entries(KIND_LABEL)].map(([id, label]) => (
            <button
              key={id}
              type="button"
              className={`learn-filter-tab${kindFilter === id ? ' active' : ''}`}
              onClick={() => setKindFilter(id)}
            >
              {label}
            </button>
          ))}
        </div>
        {shownFeedback.length === 0 ? (
          <p className="notes-empty">該当するご意見はありません。</p>
        ) : (
          <ul className="admin-feedback-list">
            {shownFeedback.map(f => (
              <li key={f.id} className="admin-feedback-item">
                <div className="admin-feedback-head">
                  <span className="admin-feedback-kind">{KIND_LABEL[f.kind] || f.kind}</span>
                  <span className="admin-sub">{formatDateTime(f.created_at)}</span>
                  <button type="button" className="admin-feedback-del" onClick={() => deleteFeedback(f.id)} aria-label="削除">
                    <i className="ph ph-trash" />
                  </button>
                </div>
                <p className="admin-feedback-msg">{f.message}</p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
