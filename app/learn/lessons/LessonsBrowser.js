'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { levelRank } from '../../../lib/levels';

const CATEGORIES = [
  { id: 'all', label: 'すべて' },
  { id: 'basic', label: '基礎' },
  { id: 'grammar', label: '文法' },
  { id: 'vocab', label: '表現・単語' },
];

const SORTS = [
  { id: 'new', label: '追加日が新しい順' },
  { id: 'old', label: '追加日が古い順' },
  { id: 'easy', label: 'やさしい順（難易度）' },
  { id: 'hard', label: '難しい順（難易度）' },
];

function compare(sort) {
  const byDate = (a, b) => (b.date || '').localeCompare(a.date || '');
  switch (sort) {
    case 'old': return (a, b) => -byDate(a, b);
    case 'easy': return (a, b) => levelRank(a.level) - levelRank(b.level) || byDate(a, b);
    case 'hard': return (a, b) => levelRank(b.level) - levelRank(a.level) || byDate(a, b);
    default: return byDate;
  }
}

function formatDate(date) {
  if (!date) return '';
  const [y, m, d] = date.split('-');
  return `${y}.${m}.${d}`;
}

function safeGet(key) {
  try { return window.localStorage.getItem(key); } catch { return null; }
}
function safeSet(key, value) {
  try { window.localStorage.setItem(key, value); } catch { /* 保存できなくても動作に影響なし */ }
}

export default function LessonsBrowser({ courses }) {
  const [category, setCategory] = useState('all');
  const [sort, setSort] = useState('new');
  const [view, setView] = useState('grid'); // grid | list

  // 保存済みの表示設定と、?category= の復元
  useEffect(() => {
    const savedView = safeGet('lessons-view');
    if (savedView === 'grid' || savedView === 'list') setView(savedView);
    const savedSort = safeGet('lessons-sort');
    if (SORTS.some(s => s.id === savedSort)) setSort(savedSort);
    const cat = new URLSearchParams(window.location.search).get('category');
    if (CATEGORIES.some(c => c.id === cat)) setCategory(cat);
  }, []);

  function changeView(v) { setView(v); safeSet('lessons-view', v); }
  function changeSort(s) { setSort(s); safeSet('lessons-sort', s); }
  function changeCategory(id) {
    setCategory(id);
    const url = id === 'all' ? '/learn/lessons' : `/learn/lessons?category=${id}`;
    window.history.replaceState(null, '', url);
  }

  const items = useMemo(() => {
    const filtered = category === 'all' ? courses : courses.filter(c => c.category === category);
    return [...filtered].sort(compare(sort));
  }, [courses, category, sort]);

  return (
    <>
      <div className="learn-filter-tabs">
        {CATEGORIES.map(cat => (
          <button
            key={cat.id}
            type="button"
            onClick={() => changeCategory(cat.id)}
            className={`learn-filter-tab${category === cat.id ? ' active' : ''}`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="lessons-toolbar">
        <label className="lessons-sort">
          <span>並び替え</span>
          <select value={sort} onChange={e => changeSort(e.target.value)}>
            {SORTS.map(s => <option key={s.id} value={s.id}>{s.label}</option>)}
          </select>
        </label>
        <div className="lessons-view-toggle" role="group" aria-label="表示形式">
          <button
            type="button"
            className={view === 'grid' ? 'active' : ''}
            onClick={() => changeView('grid')}
            aria-pressed={view === 'grid'}
          >
            <i className="ph ph-squares-four" /> カード
          </button>
          <button
            type="button"
            className={view === 'list' ? 'active' : ''}
            onClick={() => changeView('list')}
            aria-pressed={view === 'list'}
          >
            <i className="ph ph-list-bullets" /> リスト
          </button>
        </div>
      </div>

      {items.length === 0 ? (
        <p className="learn-empty">この分野のレッスンは準備中です。</p>
      ) : view === 'grid' ? (
        <div className="premium-grid">
          {items.map(course => (
            <Link key={course.id} href={`/learn/${course.id}`} className="premium-card">
              <div className="premium-card-ribbon">{course.level || '入門'}</div>
              <div className="premium-card-icon"><i className={`ph-fill ph-${course.icon || 'book-open'}`} /></div>
              <h2 className="premium-card-title">{course.title}</h2>
              <div className="premium-card-foot">
                <span className="premium-card-count">全{course.lessonCount}レッスン</span>
                <span className="premium-card-cta">はじめる <i className="ph ph-arrow-right" /></span>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <ul className="lessons-list">
          {items.map(course => (
            <li key={course.id}>
              <Link href={`/learn/${course.id}`} className="lessons-list-item">
                <span className="lessons-list-icon"><i className={`ph-fill ph-${course.icon || 'book-open'}`} /></span>
                <span className="lessons-list-main">
                  <span className="lessons-list-title">{course.title}</span>
                  <span className="lessons-list-meta">
                    全{course.lessonCount}レッスン
                    {course.date && <> ・ 追加日 {formatDate(course.date)}</>}
                  </span>
                </span>
                <span className="lessons-list-level">{course.level || '入門'}</span>
                <i className="ph ph-caret-right lessons-list-arrow" />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
