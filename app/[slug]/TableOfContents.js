'use client';
import { useState, useEffect, useRef } from 'react';

export default function TableOfContents({ headings }) {
  const [open, setOpen] = useState(true);
  const [activeId, setActiveId] = useState('');
  const observerRef = useRef(null);

  // 현재 읽는 섹션 감지 (Google 점프 링크와 같은 앵커 사용)
  useEffect(() => {
    if (!headings || headings.length === 0) return;

    const callback = (entries) => {
      // 화면에 보이는 헤딩 중 가장 위쪽 것을 active로
      const visible = entries
        .filter(e => e.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
      if (visible.length > 0) {
        setActiveId(visible[0].target.id);
      }
    };

    observerRef.current = new IntersectionObserver(callback, {
      rootMargin: '-60px 0px -70% 0px',
      threshold: 0,
    });

    headings.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observerRef.current.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, [headings]);

  if (!headings || headings.length < 2) return null;

  return (
    <aside className="toc-box">
      <button
        className="toc-toggle"
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
      >
        <span className="toc-icon">📋</span>
        <span className="toc-title">目次</span>
        <span className="toc-arrow">{open ? '▲' : '▼'}</span>
      </button>

      {open && (
        <nav className="toc-nav" aria-label="目次">
          <ol className="toc-list">
            {headings.map(({ id, text, level }) => (
              <li
                key={id}
                className={`toc-item toc-level-${level}${activeId === id ? ' toc-active' : ''}`}
              >
                <a
                  href={`#${id}`}
                  className="toc-link"
                  onClick={(e) => {
                    e.preventDefault();
                    const el = document.getElementById(id);
                    if (el) {
                      const offset = 80; // ヘッダー分のオフセット
                      const top = el.getBoundingClientRect().top + window.scrollY - offset;
                      window.scrollTo({ top, behavior: 'smooth' });
                    }
                    setActiveId(id);
                  }}
                >
                  {text}
                </a>
              </li>
            ))}
          </ol>
        </nav>
      )}
    </aside>
  );
}
