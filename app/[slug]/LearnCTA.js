import Link from 'next/link';
import { getCourse } from '../../lib/courses';

// 韓国語カテゴリの記事下部に表示する学習誘導バナー
// フロントマターの course に教材IDがあれば、その記事専用レッスンへの導線に差し替える
export default function LearnCTA({ courseId }) {
  const course = courseId ? getCourse(courseId) : null;

  if (course) {
    return (
      <div className="learn-cta">
        <div className="learn-cta-emoji"><i className={`ph-fill ph-${course.icon || 'book-open'}`} /></div>
        <div className="learn-cta-body">
          <h3>{course.title}</h3>
          <p>
            この記事の内容を、全{course.lessons.length}レッスンのクイズで練習できます。
            読んだ内容をその場で定着させましょう。
          </p>
          <Link href={`/learn/${course.id}`} className="learn-cta-btn">
            無料でレッスンを始める <i className="ph ph-arrow-right" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="learn-cta">
      <div className="learn-cta-emoji"><i className="ph-fill ph-translate" /></div>
      <div className="learn-cta-body">
        <h3>ハングル、読めるようになりたい？</h3>
        <p>
          母音・子音から、推しの名前が読めるまで。
          クイズ付きの無料レッスンで、あなたのペースで学べます。
        </p>
        <Link href="/learn/hangul-basic" className="learn-cta-btn">
          無料でハングルを学ぶ <i className="ph ph-arrow-right" />
        </Link>
      </div>
    </div>
  );
}
