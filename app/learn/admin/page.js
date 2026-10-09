import Link from 'next/link';
import { getAllCourses, getCourse } from '../../../lib/courses';
import AdminDashboard from './AdminDashboard';

export const metadata = {
  title: '学習管理 | LaLaLaKorea',
  robots: { index: false, follow: false },
};

export default function LearnAdminPage() {
  // いいね集計にレッスン名を出すためのタイトル表
  const titles = {};
  for (const c of getAllCourses()) {
    const full = getCourse(c.id);
    titles[c.id] = {
      course: c.title,
      lessons: Object.fromEntries((full?.lessons || []).map(l => [l.id, l.title])),
    };
  }

  return (
    <div className="learn-page">
      <div className="learn-hero learn-hero-course">
        <div className="learn-course-emoji-lg"><i className="ph ph-gauge" /></div>
        <h1>学習管理</h1>
        <p>いいね・ご意見の確認（管理者のみ）</p>
      </div>

      <div className="learn-container">
        <div className="learn-breadcrumb">
          <Link href="/learn">学習トップ</Link> ／ 学習管理
        </div>
        <AdminDashboard titles={titles} />
      </div>
    </div>
  );
}
