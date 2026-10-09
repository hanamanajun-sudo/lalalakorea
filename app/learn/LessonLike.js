'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { createClient } from '../../lib/supabase/client';

// レッスン末尾の「いいね」。件数は公開せず、内部データとして保存する（管理画面で集計）
export default function LessonLike({ courseId, lessonId }) {
  const [state, setState] = useState('loading'); // loading | guest | idle | liked | error
  const [userId, setUserId] = useState(null);
  const [busy, setBusy] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    let active = true;
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { if (active) setState('guest'); return; }
      const { data, error } = await supabase
        .from('lesson_likes')
        .select('lesson_id')
        .eq('user_id', user.id)
        .eq('course_id', courseId)
        .eq('lesson_id', lessonId);
      if (!active) return;
      setUserId(user.id);
      setState(error ? 'error' : (data || []).length > 0 ? 'liked' : 'idle');
    })();
    return () => { active = false; };
  }, [supabase, courseId, lessonId]);

  async function toggle() {
    if (busy || !userId) return;
    setBusy(true);
    const liked = state === 'liked';
    const q = supabase.from('lesson_likes');
    const { error } = liked
      ? await q.delete().eq('user_id', userId).eq('course_id', courseId).eq('lesson_id', lessonId)
      : await q.upsert({ user_id: userId, course_id: courseId, lesson_id: lessonId }, { onConflict: 'user_id,course_id,lesson_id' });
    setBusy(false);
    if (error) { setState('error'); return; }
    setState(liked ? 'idle' : 'liked');
  }

  if (state === 'loading') return null;

  return (
    <div className="lesson-like">
      <p className="lesson-like-text">このレッスンが役に立ったら、いいねを押してください</p>
      {state === 'guest' ? (
        <p className="lesson-like-sub">
          いいねはログインすると押せます。<Link href="/login">ログイン</Link>
        </p>
      ) : (
        <button
          type="button"
          className={`lesson-like-btn${state === 'liked' ? ' liked' : ''}`}
          onClick={toggle}
          disabled={busy}
          aria-pressed={state === 'liked'}
        >
          <i className={`ph${state === 'liked' ? '-fill' : ''} ph-heart`} />
          {state === 'liked' ? 'いいね済み（ありがとう！）' : 'いいね'}
        </button>
      )}
      {state === 'error' && <p className="lesson-like-sub">保存できませんでした。時間をおいてもう一度お試しください。</p>}
      <p className="lesson-like-sub">
        ご意見・ご要望は<Link href="/learn/feedback">こちら</Link>からお寄せください。
      </p>
    </div>
  );
}
