import './globals.css';
import Link from 'next/link';
import Script from 'next/script';
import ScrollToTop from './ScrollToTop';
import MobileMenu from './MobileMenu';
import ReadingProgress from './ReadingProgress';
import AuthNav from './AuthNav';

export const metadata = {
  title: 'LaLaLaKorea – 韓国語・韓国文化をもっと楽しく',
  description: '韓国在住10年の韓日夫婦が運営。韓国語学習・韓国グルメ・Kpop・韓国ドラマを、リアルな体験談とともに日本語で発信しています。',
  metadataBase: new URL('https://lalalakorea.com'),
  openGraph: {
    siteName: 'LaLaLaKorea',
    images: [{ url: 'https://lalalakorea.com/og-default.png', width: 1200, height: 630, alt: 'LaLaLaKorea' }],
    locale: 'ja_JP',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    images: ['https://lalalakorea.com/og-default.png'],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700&family=Zen+Maru+Gothic:wght@500;700;900&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@phosphor-icons/web@2.1.1/src/regular/style.css" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@phosphor-icons/web@2.1.1/src/fill/style.css" />
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6443201130119317" crossOrigin="anonymous"></script>
      </head>
      <body>
        <ReadingProgress />
        <header className="site-header">
          <div className="container">
            <Link href="/" className="logo">
              <span className="logo-lala">lalala</span>
              <span className="logo-korea">KOREA</span>
            </Link>
            <nav className="nav">
              <Link href="/">ホーム</Link>
              <Link href="/category/%E9%9F%93%E5%9B%BD%E8%AA%9E">韓国語</Link>
              <Link href="/category/%E9%9F%93%E5%9B%BD%E3%82%B0%E3%83%AB%E3%83%A1">グルメ</Link>
              <Link href="/category/%E9%9F%93%E5%9B%BD%E3%82%A8%E3%83%B3%E3%82%BF%E3%83%A1">エンタメ</Link>
              <Link href="/category/%E9%9F%93%E5%9B%BD%E6%97%85%E8%A1%8C">旅行</Link>
              <Link href="/category/%E9%9F%93%E5%9B%BD%E3%82%B3%E3%82%B9%E3%83%A1">コスメ</Link>
              <Link href="/learn" className="nav-learn">📚 学習</Link>
              <Link href="/about">About</Link>
            </nav>
            <AuthNav />
            <Link href="/search" className="search-btn" aria-label="記事を検索">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.2">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
            </Link>
            <MobileMenu />
          </div>
        </header>
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-7F4G21MPYL" strategy="afterInteractive" />
        <Script id="ga4-init" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-7F4G21MPYL');
        `}</Script>
        <main>{children}</main>
        <ScrollToTop />
        <footer className="site-footer">
          <div className="container">
            <nav className="footer-nav">
              <Link href="/category/%E9%9F%93%E5%9B%BD%E8%AA%9E">韓国語</Link>
              <Link href="/category/%E9%9F%93%E5%9B%BD%E3%82%B0%E3%83%AB%E3%83%A1">グルメ</Link>
              <Link href="/category/%E9%9F%93%E5%9B%BD%E3%82%A8%E3%83%B3%E3%82%BF%E3%83%A1">エンタメ</Link>
              <Link href="/category/%E9%9F%93%E5%9B%BD%E6%97%85%E8%A1%8C">旅行</Link>
              <Link href="/category/%E9%9F%93%E5%9B%BD%E3%82%B3%E3%82%B9%E3%83%A1">コスメ</Link>
              <Link href="/about">About</Link>
              <Link href="/contact">お問い合わせ</Link>
              <Link href="/privacy">プライバシーポリシー</Link>
            </nav>
            <p>© 2026 LaLaLaKorea. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
