'use client';
import { useState } from 'react';
import Link from 'next/link';

const NAV = [
  { href: '/', label: 'ホーム' },
  { href: '/category/%E9%9F%93%E5%9B%BD%E8%AA%9E', label: '韓国語' },
  { href: '/category/%E9%9F%93%E5%9B%BD%E3%82%B0%E3%83%AB%E3%83%A1', label: 'グルメ' },
  { href: '/category/%E9%9F%93%E5%9B%BD%E3%82%A8%E3%83%B3%E3%82%BF%E3%83%A1', label: 'エンタメ' },
  { href: '/category/%E9%9F%93%E5%9B%BD%E6%97%85%E8%A1%8C', label: '旅行' },
  { href: '/category/%E9%9F%93%E5%9B%BD%E3%82%B3%E3%82%B9%E3%83%A1', label: 'コスメ' },
  { href: '/learn', label: '📚 学習' },
  { href: '/about', label: 'About' },
];

export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button className="hamburger" onClick={() => setOpen(!open)} aria-label="メニュー">
        <span className={`ham-line ${open ? 'open' : ''}`} />
        <span className={`ham-line ${open ? 'open' : ''}`} />
        <span className={`ham-line ${open ? 'open' : ''}`} />
      </button>
      {open && (
        <div className="mobile-nav-overlay" onClick={() => setOpen(false)}>
          <nav className="mobile-nav" onClick={e => e.stopPropagation()}>
            <button className="mobile-nav-close" onClick={() => setOpen(false)}>✕</button>
            {NAV.map(item => (
              <Link key={item.href} href={item.href} className="mobile-nav-link" onClick={() => setOpen(false)}>
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}
