import Link from 'next/link';
import { getAllWordPacks } from '../../../lib/wordpacks';

export const metadata = {
  title: '単語パック | LaLaLaKorea',
  description: 'テーマ別の韓国語単語セット。好きなパックを選んで、復習リストに追加しよう。',
  alternates: { canonical: 'https://lalalakorea.com/learn/packs/' },
};

export default function PacksPage() {
  const packs = getAllWordPacks();

  return (
    <div className="learn-page">
      <div className="learn-hero learn-hero-course">
        <div className="learn-course-emoji-lg">🧩</div>
        <h1>単語パック</h1>
        <p>テーマ別の単語セットを選んで、単語帳に追加しよう</p>
      </div>

      <div className="learn-container">
        <div className="learn-breadcrumb">
          <Link href="/learn">学習トップ</Link> ／ 単語パック
        </div>

        <div className="pack-grid">
          {packs.map(pack => (
            <Link key={pack.id} href={`/learn/packs/${pack.id}`} className="pack-card">
              <div className="pack-card-ribbon">{pack.level}</div>
              <div className="pack-card-emoji">{pack.emoji}</div>
              <h2 className="pack-card-title">{pack.title}</h2>
              <p className="pack-card-desc">{pack.description}</p>
              <div className="pack-card-foot">
                <span className="pack-card-count">全{pack.words.length}語</span>
                <span className="pack-card-cta">追加する →</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
