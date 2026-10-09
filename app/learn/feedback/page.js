import Link from 'next/link';
import FeedbackForm from './FeedbackForm';

export const metadata = {
  title: 'レッスンへのご意見・ご要望 | LaLaLaKorea',
  description: 'レッスンへのご意見・ご要望、読みたいレッスンのリクエストをお寄せください。',
  robots: { index: false },
};

export default function FeedbackPage() {
  return (
    <div className="learn-page">
      <div className="learn-hero learn-hero-course">
        <div className="learn-course-emoji-lg"><i className="ph ph-chat-circle-text" /></div>
        <h1>ご意見・ご要望</h1>
        <p>レッスンへの感想や、作ってほしいレッスンを教えてください</p>
      </div>

      <div className="learn-container learn-container-narrow">
        <div className="learn-breadcrumb">
          <Link href="/learn">学習トップ</Link> ／ ご意見・ご要望
        </div>
        <FeedbackForm />
      </div>
    </div>
  );
}
