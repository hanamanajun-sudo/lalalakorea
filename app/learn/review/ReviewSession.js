'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { createClient } from '../../../lib/supabase/client';
import { Rating, newCard, rowToCard, cardToColumns, rateCard, isDue } from '../../../lib/fsrs';

const SESSION_LIMIT = 20;

const RATING_BUTTONS = [
  { rating: Rating.Again, label: 'もう一度', cls: 'again' },
  { rating: Rating.Hard,  label: 'むずかしい', cls: 'hard' },
  { rating: Rating.Good,  label: 'できた', cls: 'good' },
  { rating: Rating.Easy,  label: 'かんたん', cls: 'easy' },
];

export default function ReviewSession({ allWords }) {
  const [status, setStatus] = useState('loading'); // loading | guest | ready | empty | done
  const [queue, setQueue] = useState([]);
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [reviewedCount, setReviewedCount] = useState(0);
  const supabase = createClient();

  useEffect(() => {
    let active = true;
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { if (active) setStatus('guest'); return; }

      // 完了レッスン集合
      const { data: progress } = await supabase
        .from('user_progress')
        .select('course_id, lesson_id')
        .eq('user_id', user.id);
      const doneSet = new Set((progress || []).map(p => `${p.course_id}/${p.lesson_id}`));

      // 既存の復習カード
      const { data: cardRows } = await supabase
        .from('review_cards')
        .select('*')
        .eq('user_id', user.id);
      const cardMap = new Map((cardRows || []).map(r => [`${r.course_id}/${r.word_ko}`, r]));

      // 完了レッスンの単語のみ対象。期限切れ or 未学習のカードをキューに
      const now = new Date();
      const due = [];
      for (const w of allWords) {
        if (!doneSet.has(`${w.courseId}/${w.lessonId}`)) continue;
        const key = `${w.courseId}/${w.ko}`;
        const existing = cardMap.get(key);
        if (existing) {
          const card = rowToCard(existing);
          if (isDue(card, now)) due.push({ word: w, card });
        } else {
          due.push({ word: w, card: newCard() });
        }
      }

      if (!active) return;
      if (due.length === 0) { setStatus('empty'); return; }
      setQueue(due.slice(0, SESSION_LIMIT));
      setStatus('ready');
    })();
    return () => { active = false; };
  }, [supabase, allWords]);

  async function handleRate(rating) {
    const current = queue[index];
    const nextCard = rateCard(current.card, rating);

    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      await supabase.from('review_cards').upsert(
        {
          user_id: user.id,
          course_id: current.word.courseId,
          word_ko: current.word.ko,
          word_read: current.word.read,
          word_mean: current.word.mean,
          ...cardToColumns(nextCard),
        },
        { onConflict: 'user_id,course_id,word_ko' }
      );
    }

    setReviewedCount(c => c + 1);
    setFlipped(false);
    if (index < queue.length - 1) {
      setIndex(i => i + 1);
    } else {
      setStatus('done');
    }
  }

  if (status === 'loading') return <div className="review-msg">読み込み中…</div>;

  if (status === 'guest') {
    return (
      <div className="review-msg">
        <div className="review-msg-emoji">🔒</div>
        <h2>ログインが必要です</h2>
        <p>単語の復習には、進捗の記録が必要です。</p>
        <Link href="/login" className="quiz-btn-primary">ログイン</Link>
      </div>
    );
  }

  if (status === 'empty') {
    return (
      <div className="review-msg">
        <div className="review-msg-emoji">✨</div>
        <h2>今日の復習はありません</h2>
        <p>レッスンを進めると、覚えた単語がここに復習カードとして追加されます。</p>
        <Link href="/learn" className="quiz-btn-primary">教材に戻る</Link>
      </div>
    );
  }

  if (status === 'done') {
    return (
      <div className="review-msg">
        <div className="review-msg-emoji">🎉</div>
        <h2>復習完了！</h2>
        <p>{reviewedCount}個の単語を復習しました。またあとで戻ってきてね。</p>
        <Link href="/learn" className="quiz-btn-primary">教材に戻る</Link>
      </div>
    );
  }

  const current = queue[index];
  return (
    <div className="review-session">
      <div className="review-progress">{index + 1} / {queue.length}</div>

      <div className={`review-card${flipped ? ' flipped' : ''}`} onClick={() => !flipped && setFlipped(true)}>
        <div className="review-card-ko">{current.word.ko}</div>
        {flipped ? (
          <>
            <div className="review-card-read">{current.word.read}</div>
            <div className="review-card-mean">{current.word.mean}</div>
          </>
        ) : (
          <div className="review-card-hint">タップして答えを見る</div>
        )}
      </div>

      {flipped ? (
        <div className="review-ratings">
          {RATING_BUTTONS.map(b => (
            <button key={b.rating} className={`review-rate-btn ${b.cls}`} onClick={() => handleRate(b.rating)}>
              {b.label}
            </button>
          ))}
        </div>
      ) : (
        <button className="quiz-btn-primary review-flip-btn" onClick={() => setFlipped(true)}>
          答えを見る
        </button>
      )}
    </div>
  );
}
