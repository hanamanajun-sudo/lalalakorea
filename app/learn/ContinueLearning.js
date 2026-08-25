'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { createClient } from '../../lib/supabase/client';

// ログイン済みで進行中の教材があれば「続きから学習」カードを表示。ゲスト・進捗なしの場合は何も出さない
export default function ContinueLearning({ courses }) {
  const [state, setState] = useState(null);
  const supabase = createClient();

  useEffect(() => {
    let active = true;
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data } = await supabase
        .from('user_progress')
        .select('course_id, lesson_id, completed_at')
        .eq('user_id', user.id)
        .order('completed_at', { ascending: false });
      if (!active || !data || data.length === 0) return;

      const doneByCourse = new Map();
      const recentOrder = [];
      for (const row of data) {
        if (!doneByCourse.has(row.course_id)) {
          doneByCourse.set(row.course_id, new Set());
          recentOrder.push(row.course_id);
        }
        doneByCourse.get(row.course_id).add(row.lesson_id);
      }

      for (const courseId of recentOrder) {
        const course = courses.find(c => c.id === courseId);
        if (!course) continue;
        const lessons = course.lessons || [];
        const doneSet = doneByCourse.get(courseId);
        const firstUndone = lessons.find(id => !doneSet.has(id));
        if (firstUndone) {
          if (active) {
            setState({
              course,
              lessonId: firstUndone,
              doneCount: lessons.filter(id => doneSet.has(id)).length,
              total: lessons.length,
            });
          }
          return;
        }
      }
    })();
    return () => { active = false; };
  }, [supabase, courses]);

  if (!state) return null;

  const pct = state.total ? Math.round((state.doneCount / state.total) * 100) : 0;

  return (
    <Link href={`/learn/${state.course.id}/${state.lessonId}`} className="continue-card">
      <div className="continue-card-icon"><i className={`ph-fill ph-${state.course.icon || 'book-open'}`} /></div>
      <div className="continue-card-body">
        <div className="continue-card-label">前回の続き</div>
        <div className="continue-card-title">{state.course.title}</div>
        <div className="continue-card-track">
          <div className="continue-card-fill" style={{ width: `${pct}%` }} />
        </div>
        <div className="continue-card-progress">{state.doneCount} / {state.total} レッスン完了</div>
      </div>
      <div className="continue-card-cta">続きから <i className="ph ph-arrow-right" /></div>
    </Link>
  );
}
