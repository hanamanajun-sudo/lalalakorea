'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { createClient } from '../../lib/supabase/client';

const ITEMS = [
  { href: '/learn/notes', label: 'マイノート', icon: 'notebook',
    match: p => p.startsWith('/learn/notes') },
  { href: '/learn/lessons', label: 'ハングルレッスン', icon: 'book-open-text', badge: 'lessons',
    match: p => p.startsWith('/learn/lessons') || (/^\/learn\/[^/]+/.test(p) && !/^\/learn\/(review|notes|packs|lessons)/.test(p)) },
  { href: '/learn/review', label: '単語復習', icon: 'arrows-clockwise', badge: 'review',
    match: p => p.startsWith('/learn/review') },
  { href: '/learn/packs', label: '単語パック', icon: 'puzzle-piece', sub: true,
    match: p => p.startsWith('/learn/packs') },
];

export default function LearnNav({ totalLessons = 0 }) {
  const pathname = usePathname();
  const [doneLessons, setDoneLessons] = useState(null);
  const [dueWords, setDueWords] = useState(null);
  const supabase = createClient();

  useEffect(() => {
    let active = true;
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { count: lessonCount } = await supabase
        .from('user_progress')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id);
      if (active) setDoneLessons(lessonCount || 0);

      const { count: reviewCount } = await supabase
        .from('review_cards')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id)
        .lte('due', new Date().toISOString());
      if (active) setDueWords(reviewCount || 0);
    })();
    return () => { active = false; };
  }, [supabase]);

  return (
    <aside className="learn-sidebar">
      <Link href="/learn" className="learn-brand">
        <span className="learn-brand-emoji"><i className="ph-fill ph-graduation-cap" /></span>
        <span className="learn-brand-text">韓国語を学ぼう</span>
      </Link>
      <nav className="learn-sidenav">
        {ITEMS.map(it => {
          let badge = null;
          let title;
          if (it.badge === 'lessons' && doneLessons > 0) {
            badge = <span className="learn-sidenav-badge">{doneLessons > 99 ? '99+' : doneLessons}</span>;
            title = `${doneLessons} / ${totalLessons} レッスン完了`;
          } else if (it.badge === 'review' && dueWords > 0) {
            badge = <span className="learn-sidenav-badge alert">{dueWords > 99 ? '99+' : dueWords}</span>;
            title = `復習待ちの単語 ${dueWords}個`;
          }
          return (
            <Link
              key={it.href}
              href={it.href}
              title={title}
              className={`learn-sidenav-item${it.sub ? ' sub' : ''}${it.match(pathname) ? ' active' : ''}`}
            >
              <span className="learn-sidenav-emoji">
                <i className={`ph ph-${it.icon}`} />
                {badge}
              </span>
              <span className="learn-sidenav-label">{it.label}</span>
            </Link>
          );
        })}
      </nav>
      <Link href="/" className="learn-back-blog"><i className="ph ph-arrow-left" /> ブログにもどる</Link>
    </aside>
  );
}
