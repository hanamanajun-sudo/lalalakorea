import Link from 'next/link';
import { getAllCourses } from '../../../lib/courses';

export const metadata = {
  title: 'ハングルレッスン | LaLaLaKorea',
  description: 'ハングルの読み方から使える韓国語まで、クイズ付きで学べるレッスン一覧。',
  alternates: { canonical: 'https://lalalakorea.com/learn/lessons' },
};

const CATEGORIES = [
  { id: 'all', label: 'すべて' },
  { id: 'basic', label: '基礎' },
  { id: 'grammar', label: '文法' },
  { id: 'vocab', label: '表現・単語' },
];

export default function LessonsPage({ searchParams }) {
  const courses = getAllCourses();
  const activeCategory = CATEGORIES.some(c => c.id === searchParams?.category) ? searchParams.category : 'all';
  const filtered = activeCategory === 'all' ? courses : courses.filter(c => c.category === activeCategory);

  return (
    <div className="learn-page">
      <div className="learn-hero learn-hero-course">
        <div className="learn-course-emoji-lg"><i className="ph-fill ph-book-open-text" /></div>
        <h1>ハングルレッスン</h1>
        <p>好きなレッスンを選んで、自分のペースで進めよう</p>
      </div>

      <div className="learn-container">
        <div className="learn-breadcrumb">
          <Link href="/learn">学習トップ</Link> ／ ハングルレッスン
        </div>

        {courses.length === 0 ? (
          <p className="learn-empty">レッスンを準備中です。</p>
        ) : (
          <>
            <div className="learn-filter-tabs">
              {CATEGORIES.map(cat => (
                <Link
                  key={cat.id}
                  href={cat.id === 'all' ? '/learn/lessons' : `/learn/lessons?category=${cat.id}`}
                  className={`learn-filter-tab${activeCategory === cat.id ? ' active' : ''}`}
                >
                  {cat.label}
                </Link>
              ))}
            </div>

            {filtered.length === 0 ? (
              <p className="learn-empty">この分野のレッスンは準備中です。</p>
            ) : (
              <div className="premium-grid">
                {filtered.map(course => (
                  <Link key={course.id} href={`/learn/${course.id}`} className="premium-card">
                    <div className="premium-card-ribbon">{course.level || '入門'}</div>
                    <div className="premium-card-icon"><i className={`ph-fill ph-${course.icon || 'book-open'}`} /></div>
                    <h2 className="premium-card-title">{course.title}</h2>
                    <div className="premium-card-foot">
                      <span className="premium-card-count">全{(course.lessons || []).length}レッスン</span>
                      <span className="premium-card-cta">はじめる <i className="ph ph-arrow-right" /></span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
