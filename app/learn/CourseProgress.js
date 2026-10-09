'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { createClient } from '../../lib/supabase/client';
import { addCourseToNotes } from '../../lib/userCourses';

// 教材詳細ページ用：ログインしていれば各レッスンの完了状態と「続きから」を表示
export default function CourseProgress({ courseId, lessons }) {
  const [completed, setCompleted] = useState(null); // null=読込中, Set=結果
  const [userId, setUserId] = useState(null);
  const [inNotes, setInNotes] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    let active = true;
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { if (active) setCompleted(new Set()); return; }
      const [{ data }, { data: added }] = await Promise.all([
        supabase.from('user_progress').select('lesson_id').eq('user_id', user.id).eq('course_id', courseId),
        supabase.from('user_courses').select('course_id').eq('user_id', user.id).eq('course_id', courseId),
      ]);
      if (!active) return;
      setUserId(user.id);
      setCompleted(new Set((data || []).map(r => r.lesson_id)));
      setInNotes((added || []).length > 0 || (data || []).length > 0);
    })();
    return () => { active = false; };
  }, [supabase, courseId]);

  // 学習を始める操作（ボタン／レッスン選択）でマイノートに自動追加
  function handleStart() {
    if (!userId || inNotes) return;
    setInNotes(true);
    addCourseToNotes(supabase, userId, courseId);
  }

  const doneSet = completed || new Set();
  const firstUndone = lessons.find(l => !doneSet.has(l.id)) || lessons[lessons.length - 1];
  const doneCount = lessons.filter(l => doneSet.has(l.id)).length;
  const pct = lessons.length ? Math.round((doneCount / lessons.length) * 100) : 0;

  return (
    <>
      <div className="learn-progress-summary">
        <div className="learn-progress-track">
          <div className="learn-progress-value" style={{ width: `${pct}%` }} />
        </div>
        <div className="learn-progress-text">
          {doneCount} / {lessons.length} レッスン完了（{pct}%）
        </div>
        {firstUndone && (
          <Link href={`/learn/${courseId}/${firstUndone.id}`} className="learn-continue-btn" onClick={handleStart}>
            {doneCount === 0 ? '学習を始める' : '続きから学習'} →
          </Link>
        )}
        {userId && (
          <div className="learn-notes-status">
            {inNotes
              ? <><i className="ph-fill ph-check-circle" /> マイノートに追加されています</>
              : <><i className="ph ph-notebook" /> 学習を始めると、マイノートに自動で追加されます</>}
          </div>
        )}
      </div>

      <ol className="learn-lesson-list">
        {lessons.map((lesson, i) => {
          const done = doneSet.has(lesson.id);
          return (
            <li key={lesson.id}>
              <Link href={`/learn/${courseId}/${lesson.id}`} className={`learn-lesson-item${done ? ' done' : ''}`} onClick={handleStart}>
                <span className="learn-lesson-num">{done ? <i className="ph ph-check" /> : i + 1}</span>
                <span className="learn-lesson-title">{lesson.title}</span>
              </Link>
            </li>
          );
        })}
      </ol>
    </>
  );
}
