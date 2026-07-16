import Link from 'next/link';
import { getAllCourses } from '../../lib/courses';

export const metadata = {
  title: 'ハングル学習 | LaLaLaKorea',
  description: 'K-POP・韓国ドラマが好きなあなたへ。ハングルの読み方から、実際に使える韓国語まで、クイズ付きで楽しく学べる無料オンライン学習。',
  alternates: { canonical: 'https://lalalakorea.com/learn/' },
};

export default function LearnHome() {
  const courses = getAllCourses();

  return (
    <div className="learn-page">
      <div className="learn-hero">
        <h1>📚 韓国語を学ぼう</h1>
        <p>K-POP・ドラマが好きなあなたへ。クイズ付きで楽しく、自分のペースで。</p>
      </div>

      <div className="learn-container">
        {courses.length === 0 ? (
          <p className="learn-empty">教材を準備中です。もう少しお待ちください 🙏</p>
        ) : (
          <div className="learn-course-grid">
            {courses.map(course => (
              <Link key={course.id} href={`/learn/${course.id}`} className="learn-course-card">
                <div className="learn-course-emoji">{course.emoji || '📖'}</div>
                <div className="learn-course-body">
                  <span className="learn-course-level">{course.level || '入門'}</span>
                  <h2>{course.title}</h2>
                  <p>{course.description}</p>
                  <span className="learn-course-meta">全{(course.lessons || []).length}レッスン</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
