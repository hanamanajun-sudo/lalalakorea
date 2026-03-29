'use client';
import { useState, useMemo, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Fuse from 'fuse.js';

export default function SearchClient({ posts }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [searched, setSearched] = useState(false);
  const inputRef = useRef(null);

  // Fuse.js 인스턴스 — 마운트 시 한 번만 생성
  const fuse = useMemo(() => new Fuse(posts, {
    keys: [
      { name: 'title',      weight: 0.6 },
      { name: 'excerpt',    weight: 0.3 },
      { name: 'categories', weight: 0.1 },
    ],
    threshold: 0.4,   // 0에 가까울수록 엄격, 1에 가까울수록 유연
    minMatchCharLength: 1,
    includeScore: true,
  }), [posts]);

  // 페이지 열리면 입력창 포커스
  useEffect(() => { inputRef.current?.focus(); }, []);

  const handleSearch = (value) => {
    setQuery(value);
    if (value.trim().length === 0) {
      setResults([]);
      setSearched(false);
      return;
    }
    const raw = fuse.search(value.trim());
    setResults(raw.map(r => r.item));
    setSearched(true);
  };

  return (
    <div className="search-page">
      {/* 검색창 */}
      <div className="search-bar-wrap">
        <div className="search-bar">
          <svg className="search-icon" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input
            ref={inputRef}
            type="search"
            className="search-input"
            placeholder="キーワードで検索..."
            value={query}
            onChange={e => handleSearch(e.target.value)}
            aria-label="記事を検索"
          />
          {query && (
            <button
              className="search-clear"
              onClick={() => handleSearch('')}
              aria-label="クリア"
            >✕</button>
          )}
        </div>
      </div>

      {/* 결과 */}
      {!searched && (
        <p className="search-hint">韓国語、グルメ、Kpop、旅行など、気になるキーワードを入力してください。</p>
      )}

      {searched && results.length === 0 && (
        <div className="search-empty">
          <p>「{query}」の検索結果はありませんでした。</p>
          <p className="search-empty-sub">別のキーワードをお試しください。</p>
        </div>
      )}

      {results.length > 0 && (
        <>
          <p className="search-count">「{query}」— {results.length}件ヒット</p>
          <div className="posts-grid">
            {results.map(post => (
              <Link key={post.slug} href={`/${post.slug}`} className="post-card">
                {post.thumbnail && (
                  <div className="post-card-img">
                    <Image
                      src={post.thumbnail}
                      alt={post.title}
                      width={600}
                      height={338}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                )}
                <div className="post-card-body">
                  {post.categories.length > 0 && (
                    <div className="post-cats">
                      {post.categories.slice(0, 2).map(cat => (
                        <span key={cat} className="post-cat-tag">{cat}</span>
                      ))}
                    </div>
                  )}
                  <div className="post-title">{post.title}</div>
                  {post.excerpt && <div className="post-excerpt">{post.excerpt}</div>}
                  <div className="post-date">{post.date}</div>
                </div>
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
