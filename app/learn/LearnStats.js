'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { createClient } from '../../lib/supabase/client';

// 完了日付を「YYYY-M-D」（ローカルタイム）に変換
function dayKey(dateStr) {
  const d = new Date(dateStr);
  return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
}

// 連続学習日数を算出（今日 or 昨日から遡って連続している日数）
function calcStreak(rows) {
  const days = new Set(rows.map(r => dayKey(r.completed_at)));
  if (days.size === 0) return 0;
  let streak = 0;
  const cursor = new Date();
  // 今日まだ学習していなくても、昨日やっていれば連続は継続
  if (!days.has(dayKey(cursor))) cursor.setDate(cursor.getDate() - 1);
  while (days.has(dayKey(cursor))) {
    streak++;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}

const BADGES = [
  { id: 'first',   icon: 'plant',        label: 'はじめの一歩', desc: '最初のレッスンを完了', earned: s => s.total >= 1 },
  { id: 'streak3', icon: 'fire',         label: '3日連続',      desc: '3日連続で学習',       earned: s => s.streak >= 3 },
  { id: 'five',    icon: 'star',         label: '5レッスン',    desc: '5レッスン完了',       earned: s => s.total >= 5 },
  { id: 'perfect', icon: 'seal-check',   label: '満点',          desc: 'クイズで満点を獲得',   earned: s => s.hasPerfect },
  { id: 'hangul',  icon: 'trophy',       label: 'ハングル修了', desc: 'ハングル基礎を全て完了', earned: s => s.hangulDone >= 10 },
];

export default function LearnStats() {
  const [status, setStatus] = useState('loading'); // loading | guest | ready
  const [stats, setStats] = useState(null);
  const supabase = createClient();

  useEffect(() => {
    let active = true;
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { if (active) setStatus('guest'); return; }
      const { data } = await supabase
        .from('user_progress')
        .select('course_id, lesson_id, score, completed_at')
        .eq('user_id', user.id);
      if (!active) return;
      const rows = data || [];
      setStats({
        total: rows.length,
        streak: calcStreak(rows),
        hasPerfect: rows.some(r => r.score === 100),
        hangulDone: rows.filter(r => r.course_id === 'hangul-basic').length,
      });
      setStatus('ready');
    })();
    return () => { active = false; };
  }, [supabase]);

  if (status === 'loading') return null;

  if (status === 'guest') {
    return (
      <div className="learn-stats-guest">
        <span><i className="ph-fill ph-fire" /> ログインすると、連続学習日数やバッジが記録されます</span>
        <Link href="/login" className="learn-stats-login">ログイン</Link>
      </div>
    );
  }

  return (
    <div className="learn-stats">
      <div className="learn-stats-top">
        <div className="learn-stats-numbers">
          <div className="learn-stat">
            <div className="learn-stat-value">{stats.streak}<span>日</span></div>
            <div className="learn-stat-label"><i className="ph-fill ph-fire" /> 連続</div>
          </div>
          <div className="learn-stat">
            <div className="learn-stat-value">{stats.total}<span>個</span></div>
            <div className="learn-stat-label"><i className="ph-fill ph-check-circle" /> 完了</div>
          </div>
        </div>
        <Link href="/learn/notes" className="learn-notes-btn">
          <i className="ph ph-notebook" /> マイノート
        </Link>
      </div>
      <div className="learn-badges">
        {BADGES.map(b => {
          const earned = b.earned(stats);
          return (
            <div key={b.id} className={`learn-badge${earned ? ' earned' : ''}`} title={b.desc}>
              <span className="learn-badge-emoji"><i className={`${earned ? 'ph-fill' : 'ph'} ph-${b.icon}`} /></span>
              <span className="learn-badge-label">{b.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
