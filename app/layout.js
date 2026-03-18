import './globals.css';

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
        <header className="site-header">
          <div className="container">
            <a href="/" className="logo">
              <span className="logo-lala">lalala</span>
              <span className="logo-korea">KOREA</span>
            </a>
            <nav className="nav">
              <a href="/">ホーム</a>
              <a href="/category/韓国語">韓国語</a>
              <a href="/category/韓国グルメ">グルメ</a>
              <a href="/category/韓国エンタメ">エンタメ</a>
              <a href="/category/韓国旅行">旅行</a>
              <a href="/category/韓国コスメ">コスメ</a>
            </nav>
          </div>
        </header>
        <main>{children}</main>
        <footer className="site-footer">
          <div className="container">
            <p>© 2026 LalaLaKorea. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
