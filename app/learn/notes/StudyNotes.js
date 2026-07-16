'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { createClient } from '../../../lib/supabase/client';
import { rowToCard, isDue, State } from '../../../lib/fsrs';

// 単語の定着ステータスを算出
function wordStatus(cardRow) {
  if (!cardRow) return { label: '未復習', cls: 'new' };
  const card = rowToCard(cardRow);
  if (card.state === State.New) return { label: '新規', cls: 'new' };
  if (card.state === State.Learning || card.state === State.Relearning) return { label: '学習中', cls: 'learning' };
  // Review 状態：安定度で「定着」を判定
  if (card.stability >= 30) return { label: '定着', cls: 'mastered' };
  return { label: '復習中', cls: 'review' };
}

// 次の復習日を表示用に整形
function formatDue(cardRow, now) {
  if (!cardRow) return '—';
  const due = new Date(cardRow.due);
  if (due.getTime() <= now.getTime()) return '今日';
  const sameYear = due.getFullYear() === now.getFullYear();
  const opts = sameYear ? { month: 'long', day: 'numeric' } : { year: 'numeric', month: 'long', day: 'numeric' };
  return due.toLocaleDateString('ja-JP', opts);
}

export default function StudyNotes({ courses, allWords }) {
  const [status, setStatus] = useState('loading'); // loading | guest | ready
  const [data, setData] = useState(null);
  const supabase = createClient();

  useEffect(() => {
    let active = true;
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { if (active) setStatus('guest'); return; }

      const [{ data: progress }, { data: cards }] = await Promise.all([
        supabase.from('user_progress').select('course_id, lesson_id').eq('user_id', user.id),
        supabase.from('review_cards').select('*').eq('user_id', user.id),
      ]);
      if (!active) return;

      const doneSet = new Set((progress || []).map(p => `${p.course_id}/${p.lesson_id}`));
      const cardMap = new Map((cards || []).map(c => [`${c.course_id}/${c.word_ko}`, c]));

      // 教材ごとの進捗
      const courseProgress = courses.map(c => {
        const total = (c.lessons || []).length;
        const done = (c.lessons || []).filter(lid => doneSet.has(`${c.id}/${lid}`)).length;
        return { id: c.id, title: c.title, icon: c.icon, done, total, pct: total ? Math.round((done / total) * 100) : 0 };
      });

      // 学んだ単語 = 完了レッスンの単語 ∪ 復習カード（単語パック含む）
      const wordMap = new Map();
      // ① 完了レッスンの単語
      for (const w of allWords) {
        if (!doneSet.has(`${w.courseId}/${w.lessonId}`)) continue;
        const key = `${w.courseId}/${w.ko}`;
        wordMap.set(key, { ko: w.ko, read: w.read, mean: w.mean, card: cardMap.get(key) });
      }
      // ② 復習カード（レッスン外＝単語パックなども取り込む）
      for (const [key, row] of cardMap) {
        if (!wordMap.has(key)) {
          wordMap.set(key, { ko: row.word_ko, read: row.word_read || '', mean: row.word_mean || '', card: row });
        }
      }
      const learnedWords = Array.from(wordMap.values()).map(w => ({ ...w, status: wordStatus(w.card) }));

      const now = new Date();
      const dueCount = learnedWords.filter(w => (w.card ? isDue(rowToCard(w.card), now) : true)).length;

      setData({ courseProgress, learnedWords, dueCount, now });
      setStatus('ready');
    })();
    return () => { active = false; };
  }, [supabase, courses, allWords]);

  if (status === 'loading') return <div className="review-msg">読み込み中…</div>;

  if (status === 'guest') {
    return (
      <div className="review-msg">
        <div className="review-msg-emoji"><i className="ph ph-notebook" /></div>
        <h2>ログインして学習ノートを作ろう</h2>
        <p>完了した教材や覚えた単語が、ここに記録されていきます。</p>
        <Link href="/login" className="quiz-btn-primary">ログイン</Link>
      </div>
    );
  }

  const { courseProgress, learnedWords, dueCount, now } = data;

  return (
    <div className="notes">
      {/* 今日の復習 */}
      <section className="notes-section">
        <div className="notes-review-banner">
          <div>
            <div className="notes-review-count">{dueCount}<span>個</span></div>
            <div className="notes-review-label">今日復習する単語</div>
          </div>
          <Link href="/learn/review" className="quiz-btn-primary">
            {dueCount > 0 ? '復習をはじめる →' : '復習ページへ →'}
          </Link>
        </div>
      </section>

      {/* 教材の進捗 */}
      <section className="notes-section">
        <h2 className="notes-heading"><i className="ph ph-books" /> 教材の進捗</h2>
        <div className="notes-courses">
          {courseProgress.map(c => (
            <Link key={c.id} href={`/learn/${c.id}`} className="notes-course">
              <span className="notes-course-emoji"><i className={`ph-fill ph-${c.icon || 'book-open'}`} /></span>
              <span className="notes-course-info">
                <span className="notes-course-title">
                  {c.title}
                  {c.pct === 100 && <span className="notes-course-done"><i className="ph-fill ph-trophy" /> 修了</span>}
                </span>
                <span className="notes-course-track">
                  <span className="notes-course-fill" style={{ width: `${c.pct}%` }} />
                </span>
                <span className="notes-course-meta">{c.done} / {c.total} レッスン（{c.pct}%）</span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* 私の単語帳 */}
      <section className="notes-section">
        <h2 className="notes-heading"><i className="ph ph-cards" /> 私の単語帳（{learnedWords.length}語）</h2>
        {learnedWords.length === 0 ? (
          <p className="notes-empty">レッスンを完了すると、覚えた単語がここに追加されます。</p>
        ) : (
          <div className="notes-words">
            {learnedWords.map(w => (
              <div key={`${w.courseId}/${w.ko}`} className="notes-word">
                <div className="notes-word-main">
                  <span className="notes-word-ko">{w.ko}</span>
                  <span className="notes-word-read">{w.read}</span>
                  <span className="notes-word-mean">{w.mean}</span>
                </div>
                <div className="notes-word-meta">
                  <span className={`notes-word-status ${w.status.cls}`}>{w.status.label}</span>
                  <span className="notes-word-due">次の復習：{formatDue(w.card, now)}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
