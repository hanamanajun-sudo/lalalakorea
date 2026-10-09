import Link from 'next/link';
import { getAllCourses } from '../../../lib/courses';
import LessonsBrowser from './LessonsBrowser';

export const metadata = {
  title: 'ハングルレッスン | LaLaLaKorea',
  description: 'ハングルの読み方から使える韓国語まで、クイズ付きで学べるレッスン一覧。',
  alternates: { canonical: 'https://lalalakorea.com/learn/lessons' },
};

export default function LessonsPage() {
  // 静的ページのまま、並び替え・絞り込み・表示切替はクライアント側で行う
  const courses = getAllCourses().map(c => ({
    id: c.id,
    title: c.title,
    icon: c.icon || '',
    level: c.level || '',
    category: c.category || '',
    date: c.date || '',
    lessonCount: (c.lessons || []).length,
  }));

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
          <LessonsBrowser courses={courses} />
        )}
      </div>
    </div>
  );
}
