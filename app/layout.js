import './globals.css';
import Link from 'next/link';
import ScrollToTop from './ScrollToTop';
import MobileMenu from './MobileMenu';
import ReadingProgress from './ReadingProgress';

export const metadata = {
  title: 'LalaLaKorea – 韓国語・韓国文化をもっと楽しく',
  description: '韓国語の勉強、韓国グルメ、韓国ドラマ、韓国文化など、韓国に関するあらゆる情報をお届けします。',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <ReadingProgress />
        <header className="site-header">
          <div className="container">
            <a href="/" className="logo">
              <span className="logo-lala">lalala</span>
              <span className="logo-korea">KOREA</span>
            </a>
            <nav className="nav">
              <Link href="/">ホーム</Link>
              <Link href="/category/%E9%9F%93%E5%9B%BD%E8%AA%9E">韓国語</Link>
              <Link href="/category/%E9%9F%93%E5%9B%BD%E3%82%B0%E3%83%AB%E3%83%A1">グルメ</Link>
              <Link href="/category/%E9%9F%93%E5%9B%BD%E3%82%A8%E3%83%B3%E3%82%BF%E3%83%A1">エンタメ</Link>
              <Link href="/category/%E9%9F%93%E5%9B%BD%E6%97%85%E8%A1%8C">旅行</Link>
              <Link href="/category/%E9%9F%93%E5%9B%BD%E3%82%B3%E3%82%B9%E3%83%A1">コスメ</Link>
              <Link href="/about">About</Link>
            </nav>
            <MobileMenu />
          </div>
        </header>
        <main>{children}</main>
        <ScrollToTop />
        <footer className="site-footer">
          <div className="container">
            <p>© 2026 LalaLaKorea. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
