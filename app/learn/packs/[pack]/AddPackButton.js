'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { createClient } from '../../../../lib/supabase/client';
import { newCard, cardToColumns } from '../../../../lib/fsrs';

export default function AddPackButton({ packId, words }) {
  const [status, setStatus] = useState('loading'); // loading | guest | ready | adding | done
  const [addedCount, setAddedCount] = useState(0);
  const supabase = createClient();
  const courseId = `pack-${packId}`;

  useEffect(() => {
    let active = true;
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { if (active) setStatus('guest'); return; }
      const { data } = await supabase
        .from('review_cards')
        .select('word_ko')
        .eq('user_id', user.id)
        .eq('course_id', courseId);
      if (!active) return;
      setAddedCount((data || []).length);
      setStatus('ready');
    })();
    return () => { active = false; };
  }, [supabase, courseId]);

  async function handleAdd() {
    setStatus('adding');
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { setStatus('guest'); return; }

    // すでに追加済みの単語を除いて、新規のみ挿入（FSRS状態を上書きしない）
    const { data: existing } = await supabase
      .from('review_cards')
      .select('word_ko')
      .eq('user_id', user.id)
      .eq('course_id', courseId);
    const have = new Set((existing || []).map(r => r.word_ko));

    const rows = words
      .filter(w => !have.has(w.ko))
      .map(w => ({
        user_id: user.id,
        course_id: courseId,
        word_ko: w.ko,
        word_read: w.read,
        word_mean: w.mean,
        ...cardToColumns(newCard()),
      }));

    if (rows.length > 0) {
      await supabase.from('review_cards').upsert(rows, { onConflict: 'user_id,course_id,word_ko' });
    }
    setAddedCount(have.size + rows.length);
    setStatus('done');
  }

  if (status === 'loading') return <div className="pack-add-box">読み込み中…</div>;

  if (status === 'guest') {
    return (
      <div className="pack-add-box">
        <p>このパックを単語帳に追加するには、ログインが必要です。</p>
        <Link href="/login" className="quiz-btn-primary">ログイン</Link>
      </div>
    );
  }

  const allAdded = addedCount >= words.length;

  if (status === 'done' || allAdded) {
    return (
      <div className="pack-add-box added">
        <div className="pack-add-check"><i className="ph-fill ph-check-circle" /></div>
        <p>{allAdded ? 'このパックはすべて追加済みです' : `${addedCount}語を単語帳に追加しました！`}</p>
        <div className="pack-add-links">
          <Link href="/learn/review" className="quiz-btn-primary">さっそく復習する</Link>
          <Link href="/learn/notes" className="pack-add-sub">単語帳を見る</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pack-add-box">
      {addedCount > 0 && <p className="pack-add-note">{addedCount}語は追加済み。残りを追加できます。</p>}
      <button className="quiz-btn-primary pack-add-btn" onClick={handleAdd} disabled={status === 'adding'}>
        {status === 'adding' ? '追加中…' : <><i className="ph ph-tray-arrow-down" /> このパックを単語帳に追加（全{words.length}語）</>}
      </button>
    </div>
  );
}
