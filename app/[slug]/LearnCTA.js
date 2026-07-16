import Link from 'next/link';

// 韓国語カテゴリの記事下部に表示する学習誘導バナー
export default function LearnCTA() {
  return (
    <div className="learn-cta">
      <div className="learn-cta-emoji">🇰🇷</div>
      <div className="learn-cta-body">
        <h3>ハングル、読めるようになりたい？</h3>
        <p>
          母音・子音から、推しの名前が読めるまで。
          クイズ付きの無料レッスンで、あなたのペースで学べます。
        </p>
        <Link href="/learn/hangul-basic" className="learn-cta-btn">
          無料でハングルを学ぶ →
        </Link>
      </div>
    </div>
  );
}
