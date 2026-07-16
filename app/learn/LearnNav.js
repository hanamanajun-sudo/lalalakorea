'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const ITEMS = [
  { href: '/learn', label: '学習トップ', emoji: '🏠', match: p => p === '/learn' || (p.startsWith('/learn/') && !/^\/learn\/(review|notes|packs)/.test(p)) },
  { href: '/learn/review', label: '単語復習', emoji: '🔁', match: p => p.startsWith('/learn/review') },
  { href: '/learn/notes', label: '学習ノート', emoji: '📓', match: p => p.startsWith('/learn/notes') },
  { href: '/learn/packs', label: '単語パック', emoji: '🧩', match: p => p.startsWith('/learn/packs') },
];

export default function LearnNav() {
  const pathname = usePathname();
  return (
    <aside className="learn-sidebar">
      <Link href="/learn" className="learn-brand">
        <span className="learn-brand-emoji">📚</span>
        <span className="learn-brand-text">韓国語を学ぼう</span>
      </Link>
      <nav className="learn-sidenav">
        {ITEMS.map(it => (
          <Link
            key={it.href}
            href={it.href}
            className={`learn-sidenav-item${it.match(pathname) ? ' active' : ''}`}
          >
            <span className="learn-sidenav-emoji">{it.emoji}</span>
            <span className="learn-sidenav-label">{it.label}</span>
          </Link>
        ))}
      </nav>
      <Link href="/" className="learn-back-blog">← ブログにもどる</Link>
    </aside>
  );
}
