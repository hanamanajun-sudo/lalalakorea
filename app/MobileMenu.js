'use client';
import { useState } from 'react';
import Link from 'next/link';
import AuthNav from './AuthNav';

const CATEGORIES = [
  { href: '/category/%E9%9F%93%E5%9B%BD%E8%AA%9E', label: '韓国語', icon: 'translate' },
  { href: '/category/%E9%9F%93%E5%9B%BD%E3%82%B0%E3%83%AB%E3%83%A1', label: 'グルメ', icon: 'fork-knife' },
  { href: '/category/%E9%9F%93%E5%9B%BD%E3%82%A8%E3%83%B3%E3%82%BF%E3%83%A1', label: 'エンタメ', icon: 'film-slate' },
  { href: '/category/%E9%9F%93%E5%9B%BD%E6%97%85%E8%A1%8C', label: '旅行', icon: 'airplane-tilt' },
  { href: '/category/%E9%9F%93%E5%9B%BD%E3%82%B3%E3%82%B9%E3%83%A1', label: 'コスメ', icon: 'sparkle' },
];

export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <>
      <button className="hamburger" onClick={() => setOpen(!open)} aria-label="メニュー">
        <span className={`ham-line ${open ? 'open' : ''}`} />
        <span className={`ham-line ${open ? 'open' : ''}`} />
        <span className={`ham-line ${open ? 'open' : ''}`} />
      </button>
      {open && (
        <div className="mobile-nav-overlay" onClick={close}>
          <nav className="mobile-nav" onClick={e => e.stopPropagation()}>
            <button className="mobile-nav-close" onClick={close} aria-label="閉じる">✕</button>

            <Link href="/search" className="mobile-nav-search" onClick={close}>
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2">
                <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              記事を検索
            </Link>

            <div className="mobile-nav-auth" onClick={close}>
              <AuthNav />
            </div>

            <Link href="/learn" className="mobile-nav-cta" onClick={close}>
              <i className="ph-fill ph-graduation-cap" />
              <span>
                <span className="mobile-nav-cta-title">韓国語を学ぼう</span>
                <span className="mobile-nav-cta-sub">クイズ付きレッスン・単語帳</span>
              </span>
            </Link>

            <div className="mobile-nav-grid-label">カテゴリー</div>
            <div className="mobile-nav-grid">
              {CATEGORIES.map(c => (
                <Link key={c.href} href={c.href} className="mobile-nav-tile" onClick={close}>
                  <i className={`ph-fill ph-${c.icon}`} />
                  <span>{c.label}</span>
                </Link>
              ))}
            </div>

            <div className="mobile-nav-secondary">
              <Link href="/about" onClick={close}>About</Link>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
