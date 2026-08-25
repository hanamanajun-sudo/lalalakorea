import Link from 'next/link';
import { getAllCourses } from '../../lib/courses';
import { getAllWordPacks } from '../../lib/wordpacks';
import LearnStats from './LearnStats';

export const metadata = {
  title: 'ハングル学習 | LaLaLaKorea',
  description: 'K-POP・韓国ドラマが好きなあなたへ。ハングルの読み方から、実際に使える韓国語まで、クイズ付きで楽しく学べる無料オンライン学習。',
  alternates: { canonical: 'https://lalalakorea.com/learn' },
};

const COURSE_LIMIT = 6;
const PACK_LIMIT = 6;

export default function LearnHome() {
  const courses = getAllCourses();
  const packs = getAllWordPacks();
  const visibleCourses = courses.slice(0, COURSE_LIMIT);
  const visiblePacks = packs.slice(0, PACK_LIMIT);

  return (
    <div className="learn-page">
      <div className="learn-hero">
        <h1><i className="ph-fill ph-graduation-cap" /> 韓国語を学ぼう</h1>
        <p>K-POP・ドラマが好きなあなたへ。クイズ付きで楽しく、自分のペースで。</p>
      </div>

      <div className="learn-container">
        <LearnStats />

        {/* ハングル学習レッスン */}
        <section className="learn-section">
          <h2 className="learn-section-title">
            <i className="ph-fill ph-book-open-text" /> ハングル学習レッスン
          </h2>
          {courses.length === 0 ? (
            <p className="learn-empty">教材を準備中です。</p>
          ) : (
            <div className="premium-grid">
              {visibleCourses.map(course => (
                <Link key={course.id} href={`/learn/${course.id}`} className="premium-card">
                  <div className="premium-card-ribbon">{course.level || '入門'}</div>
                  <div className="premium-card-icon"><i className={`ph-fill ph-${course.icon || 'book-open'}`} /></div>
                  <h3 className="premium-card-title">{course.title}</h3>
                  <p className="premium-card-desc">{course.description}</p>
                  <div className="premium-card-foot">
                    <span className="premium-card-count">全{(course.lessons || []).length}レッスン</span>
                    <span className="premium-card-cta">はじめる <i className="ph ph-arrow-right" /></span>
                  </div>
                </Link>
              ))}
              {courses.length > COURSE_LIMIT && (
                <Link href="/learn/lessons" className="premium-card premium-card-more">
                  <div className="premium-card-more-icon"><i className="ph ph-dots-three-outline-fill" /></div>
                  <div className="premium-card-more-text">もっと見る</div>
                  <div className="premium-card-more-count">他{courses.length - COURSE_LIMIT}件のレッスン</div>
                </Link>
              )}
            </div>
          )}
        </section>

        {/* 単語学習（復習 + 単語パック） */}
        <section className="learn-section">
          <h2 className="learn-section-title">
            <i className="ph-fill ph-cards-three" /> 単語学習
          </h2>

          <Link href="/learn/review" className="learn-review-entry review-wide">
            <span className="learn-review-emoji"><i className="ph ph-arrows-clockwise" /></span>
            <span className="learn-review-text">
              <strong>単語復習</strong>
              覚えた単語を、忘れそうなタイミングで復習しよう
            </span>
            <span className="learn-review-arrow"><i className="ph ph-arrow-right" /></span>
          </Link>

          <h3 className="learn-subsection-title">
            <i className="ph-fill ph-puzzle-piece" /> 単語パック
          </h3>
          <div className="premium-grid">
            {visiblePacks.map(pack => (
              <Link key={pack.id} href={`/learn/packs/${pack.id}`} className="premium-card">
                <div className="premium-card-ribbon">{pack.level}</div>
                <div className="premium-card-icon"><i className={`ph-fill ph-${pack.icon || 'stack'}`} /></div>
                <h3 className="premium-card-title">{pack.title}</h3>
                <p className="premium-card-desc">{pack.description}</p>
                <div className="premium-card-foot">
                  <span className="premium-card-count">全{pack.words.length}語</span>
                  <span className="premium-card-cta">追加する <i className="ph ph-arrow-right" /></span>
                </div>
              </Link>
            ))}
            {packs.length > PACK_LIMIT && (
              <Link href="/learn/packs" className="premium-card premium-card-more">
                <div className="premium-card-more-icon"><i className="ph ph-dots-three-outline-fill" /></div>
                <div className="premium-card-more-text">もっと見る</div>
                <div className="premium-card-more-count">他{packs.length - PACK_LIMIT}件のパック</div>
              </Link>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
