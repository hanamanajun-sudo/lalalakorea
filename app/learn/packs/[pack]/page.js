import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllWordPacks, getWordPack } from '../../../../lib/wordpacks';
import AddPackButton from './AddPackButton';

export function generateStaticParams() {
  return getAllWordPacks().map(p => ({ pack: p.id }));
}

export function generateMetadata({ params }) {
  const pack = getWordPack(params.pack);
  if (!pack) return {};
  return {
    title: `${pack.title} | 単語パック | LaLaLaKorea`,
    description: pack.description,
    alternates: { canonical: `https://lalalakorea.com/learn/packs/${pack.id}` },
  };
}

export default function PackDetailPage({ params }) {
  const pack = getWordPack(params.pack);
  if (!pack) notFound();

  return (
    <div className="learn-page">
      <div className="learn-hero learn-hero-course">
        <div className="learn-course-emoji-lg"><i className={`ph-fill ph-${pack.icon || 'stack'}`} /></div>
        <span className="learn-course-level">{pack.level}</span>
        <h1>{pack.title}</h1>
        <p>{pack.description}</p>
      </div>

      <div className="learn-container learn-container-narrow">
        <div className="learn-breadcrumb">
          <Link href="/learn">学習トップ</Link> ／{' '}
          <Link href="/learn/packs">単語パック</Link> ／ {pack.title}
        </div>

        <AddPackButton packId={pack.id} words={pack.words} />

        <div className="pack-word-list">
          {pack.words.map((w, i) => (
            <div key={w.ko} className="pack-word">
              <span className="pack-word-num">{i + 1}</span>
              <span className="pack-word-ko">{w.ko}</span>
              <span className="pack-word-read">{w.read}</span>
              <span className="pack-word-mean">{w.mean}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
