import { notFound } from 'next/navigation';
import HomeGrid, { getHomeTotalPages } from '../../HomeGrid';

// generateStaticParams에 없는 페이지 번호는 SSR 렌더링 없이 즉시 404 처리
export const dynamicParams = false;

export async function generateStaticParams() {
  const totalPages = getHomeTotalPages();
  return Array.from({ length: Math.max(totalPages - 1, 0) }, (_, i) => ({ num: String(i + 2) }));
}

export async function generateMetadata({ params }) {
  const page = Number(params.num);
  return {
    title: `LaLaLaKorea – 韓国語・韓国文化をもっと楽しく（${page}ページ目）`,
    description: '韓国在住10年の韓日夫婦が運営。韓国語学習・韓国グルメ・Kpop・韓国ドラマを、リアルな体験談とともに日本語で発信しています。',
    alternates: { canonical: `https://lalalakorea.com/page/${page}` },
  };
}

export default function HomeNumberedPage({ params }) {
  const page = Number(params.num);
  const totalPages = getHomeTotalPages();
  if (!Number.isInteger(page) || page < 2 || page > totalPages) notFound();
  return <HomeGrid currentPage={page} />;
}
