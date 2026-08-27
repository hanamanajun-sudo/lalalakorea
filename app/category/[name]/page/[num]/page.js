import { notFound } from 'next/navigation';
import { getAllCategories } from '../../../../../lib/posts';
import CategoryGrid, { getCategoryTotalPages } from '../../CategoryGrid';

// generateStaticParams에 없는 (카테고리, 페이지) 조합은 SSR 없이 즉시 404 처리
export const dynamicParams = false;

export async function generateStaticParams() {
  const cats = getAllCategories();
  const params = [];
  for (const name of cats) {
    const totalPages = getCategoryTotalPages(name);
    for (let p = 2; p <= totalPages; p++) {
      params.push({ name, num: String(p) });
    }
  }
  return params;
}

export async function generateMetadata({ params }) {
  const name = decodeURIComponent(params.name);
  const page = Number(params.num);
  const description = `韓国の${name}に関する記事一覧。韓国在住10年のジュンが、リアルな体験をもとに日本語で発信しています。`;
  const baseUrl = `https://lalalakorea.com/category/${encodeURIComponent(name)}`;
  const url = `${baseUrl}/page/${page}`;
  return {
    title: `${name}の記事一覧（${page}ページ目） | LaLaLaKorea`,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${name}の記事一覧（${page}ページ目） | LaLaLaKorea`,
      description,
      url,
      siteName: 'LaLaLaKorea',
      images: [{ url: 'https://lalalakorea.com/og-default.png', width: 1200, height: 630, alt: 'LaLaLaKorea' }],
      locale: 'ja_JP',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${name}の記事一覧（${page}ページ目） | LaLaLaKorea`,
      description,
      images: ['https://lalalakorea.com/og-default.png'],
    },
  };
}

export default function CategoryNumberedPage({ params }) {
  const name = decodeURIComponent(params.name);
  const page = Number(params.num);
  const totalPages = getCategoryTotalPages(name);
  if (!Number.isInteger(page) || page < 2 || page > totalPages) notFound();
  return <CategoryGrid name={name} currentPage={page} />;
}
