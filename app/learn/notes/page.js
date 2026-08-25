import Link from 'next/link';
import { getAllCourses, getAllReviewWords } from '../../../lib/courses';
import StudyNotes from './StudyNotes';

export const metadata = {
  title: 'マイノート | LaLaLaKorea',
  description: '完了した教材や覚えた単語を記録する、あなたのマイノート。',
  robots: { index: false },
};

export default function NotesPage() {
  const courses = getAllCourses();
  const allWords = getAllReviewWords();

  return (
    <div className="learn-page">
      <div className="learn-hero learn-hero-course">
        <div className="learn-course-emoji-lg"><i className="ph ph-notebook" /></div>
        <h1>マイノート</h1>
        <p>あなたの学びの記録</p>
      </div>

      <div className="learn-container learn-container-narrow">
        <div className="learn-breadcrumb">
          <Link href="/learn">学習トップ</Link> ／ マイノート
        </div>
        <StudyNotes courses={courses} allWords={allWords} />
      </div>
    </div>
  );
}
