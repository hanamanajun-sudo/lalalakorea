import Link from 'next/link';
import { getAllCourses, getAllReviewWords } from '../../../lib/courses';
import StudyNotes from './StudyNotes';

export const metadata = {
  title: '学習ノート | LaLaLaKorea',
  description: '完了した教材や覚えた単語を記録する、あなたの学習ノート。',
  robots: { index: false },
};

export default function NotesPage() {
  const courses = getAllCourses();
  const allWords = getAllReviewWords();

  return (
    <div className="learn-page">
      <div className="learn-hero learn-hero-course">
        <div className="learn-course-emoji-lg">📓</div>
        <h1>学習ノート</h1>
        <p>あなたの学びの記録</p>
      </div>

      <div className="learn-container learn-container-narrow">
        <div className="learn-breadcrumb">
          <Link href="/learn">学習トップ</Link> ／ 学習ノート
        </div>
        <StudyNotes courses={courses} allWords={allWords} />
      </div>
    </div>
  );
}
