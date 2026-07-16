import Link from 'next/link';
import { getAllReviewWords } from '../../../lib/courses';
import ReviewSession from './ReviewSession';

export const metadata = {
  title: '単語復習 | LaLaLaKorea',
  description: '覚えた韓国語を、間隔をあけて効率よく復習しましょう。',
  robots: { index: false },
};

export default function ReviewPage() {
  const allWords = getAllReviewWords();

  return (
    <div className="learn-page">
      <div className="learn-hero learn-hero-course">
        <div className="learn-course-emoji-lg">🔁</div>
        <h1>単語復習</h1>
        <p>覚えた単語を、忘れそうなタイミングで復習します</p>
      </div>

      <div className="learn-container learn-container-narrow">
        <div className="learn-breadcrumb">
          <Link href="/learn">学習トップ</Link> ／ 単語復習
        </div>
        <ReviewSession allWords={allWords} />
      </div>
    </div>
  );
}
