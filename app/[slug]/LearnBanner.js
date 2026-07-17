import Link from 'next/link';

// 記事上部に表示する学習機能の告知バナー（検索流入者への導線）
export default function LearnBanner() {
  return (
    <Link href="/learn" className="learn-banner">
      <span className="learn-banner-icon"><i className="ph-fill ph-graduation-cap" /></span>
      <span className="learn-banner-text">
        <span className="learn-banner-headline">
          <span className="learn-banner-badge">無料</span>
          推し活で使える韓国語、クイズ付きで学べます
        </span>
        <span className="learn-banner-sub">ハングルの読み方から、推しへのファンレターまで</span>
      </span>
      <span className="learn-banner-cta">
        はじめる <i className="ph ph-arrow-right" />
      </span>
    </Link>
  );
}
