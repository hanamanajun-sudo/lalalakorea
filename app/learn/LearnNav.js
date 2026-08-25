'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const ITEMS = [
  { href: '/learn/notes', label: 'マイノート', icon: 'notebook',
    match: p => p.startsWith('/learn/notes') },
  { href: '/learn/lessons', label: 'ハングルレッスン', icon: 'book-open-text',
    match: p => p.startsWith('/learn/lessons') || (/^\/learn\/[^/]+/.test(p) && !/^\/learn\/(review|notes|packs|lessons)/.test(p)) },
  { href: '/learn/review', label: '単語復習', icon: 'arrows-clockwise',
    match: p => p.startsWith('/learn/review') },
  { href: '/learn/packs', label: '単語パック', icon: 'puzzle-piece', sub: true,
    match: p => p.startsWith('/learn/packs') },
];

export default function LearnNav() {
  const pathname = usePathname();
  return (
    <aside className="learn-sidebar">
      <Link href="/learn" className="learn-brand">
        <span className="learn-brand-emoji"><i className="ph-fill ph-graduation-cap" /></span>
        <span className="learn-brand-text">韓国語を学ぼう</span>
      </Link>
      <nav className="learn-sidenav">
        {ITEMS.map(it => (
          <Link
            key={it.href}
            href={it.href}
            className={`learn-sidenav-item${it.sub ? ' sub' : ''}${it.match(pathname) ? ' active' : ''}`}
          >
            <span className="learn-sidenav-emoji"><i className={`ph ph-${it.icon}`} /></span>
            <span className="learn-sidenav-label">{it.label}</span>
          </Link>
        ))}
      </nav>
      <Link href="/" className="learn-back-blog"><i className="ph ph-arrow-left" /> ブログにもどる</Link>
    </aside>
  );
}
