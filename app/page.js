import HomeGrid from './HomeGrid';

export const metadata = {
  title: 'LaLaLaKorea – 韓国語・韓国文化をもっと楽しく',
  description: '韓国在住10年の韓日夫婦が運営。韓国語学習・韓国グルメ・Kpop・韓国ドラマを、リアルな体験談とともに日本語で発信しています。',
  alternates: { canonical: 'https://lalalakorea.com/' },
};

export default function Home() {
  return <HomeGrid currentPage={1} />;
}
