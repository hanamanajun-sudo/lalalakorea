import { getAllPosts, getAllCategories } from '../../../lib/posts';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getCategoryIcon } from '../../../lib/categoryIcons';

const POSTS_PER_PAGE = 12;

export async function generateMetadata({ params, searchParams }) {
  const name = decodeURIComponent(params.name);
  const description = `韓国の${name}に関する記事一覧。韓国在住10年のジュンが、リアルな体験をもとに日本語で発信しています。`;
  const baseUrl = `https://lalalakorea.com/category/${encodeURIComponent(name)}/`;
  const page = Number(searchParams?.page) || 1;
  const url = page === 1 ? baseUrl : `${baseUrl}?page=${page}`;
  return {
    title: `${name}の記事一覧 | LaLaLaKorea`,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${name}の記事一覧 | LaLaLaKorea`,
      description,
      url: baseUrl,
      siteName: 'LaLaLaKorea',
      images: [{ url: 'https://lalalakorea.com/og-default.png', width: 1200, height: 630, alt: 'LaLaLaKorea' }],
      locale: 'ja_JP',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${name}の記事一覧 | LaLaLaKorea`,
      description,
      images: ['https://lalalakorea.com/og-default.png'],
    },
  };
}

export async function generateStaticParams() {
  const cats = getAllCategories();
  return cats.map(c => ({ name: c }));
}

export default function CategoryPage({ params, searchParams }) {
  const name = decodeURIComponent(params.name);
  const all = getAllPosts();
  const posts = all.filter(p => p.categories.includes(name));
  if (!posts.length) notFound();
  const categories = getAllCategories();

  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const paginatedPosts = posts.slice(startIndex, startIndex + POSTS_PER_PAGE);

  const categoryBase = `/category/${encodeURIComponent(name)}`;

  return (
    <>
      <div className="hero" style={{ padding: '40px 20px' }}>
        <h1>{name}</h1>
        <p>{posts.length}件の記事</p>
      </div>

      <div className="category-filter">
        <div className="container">
          <Link href="/" className="cat-btn">すべて</Link>
          {categories.map(cat => (
            <Link key={cat} href={`/category/${encodeURIComponent(cat)}`} className={`cat-btn${cat === name ? ' active' : ''}`}>
              {cat}
            </Link>
          ))}
        </div>
      </div>

      <section className="posts-section">
        <div className="container">
          <div className="posts-grid">
            {paginatedPosts.map(post => (
              <Link key={post.slug} href={`/${post.slug}`} className="post-card">
                {post.thumbnail ? (
                  <div className="post-card-img">
                    <Image
                      src={post.thumbnail}
                      alt={post.title}
                      width={600}
                      height={338}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                ) : (
                  <div className="post-card-img post-card-img-icon" style={{ background: getCategoryIcon(post.categories).gradient }}>
                    <span className="post-card-icon">{getCategoryIcon(post.categories).emoji}</span>
                  </div>
                )}
                <div className="post-card-body">
                  <div className="post-cats">
                    <span className="post-cat-tag">{name}</span>
                  </div>
                  <div className="post-title">{post.title}</div>
                  {post.excerpt && <div className="post-excerpt">{post.excerpt}</div>}
                  <div className="post-date">{post.date}</div>
                </div>
              </Link>
            ))}
          </div>

          {totalPages > 1 && (
            <nav className="pagination" aria-label="ページナビゲーション">
              {currentPage > 1 && (
                <Link
                  href={currentPage - 1 === 1 ? categoryBase : `${categoryBase}?page=${currentPage - 1}`}
                  className="pagination-btn"
                >
                  ← 前のページ
                </Link>
              )}

              <div className="pagination-numbers">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <Link
                    key={page}
                    href={page === 1 ? categoryBase : `${categoryBase}?page=${page}`}
                    className={`pagination-num${page === currentPage ? ' active' : ''}`}
                  >
                    {page}
                  </Link>
                ))}
              </div>

              {currentPage < totalPages && (
                <Link
                  href={`${categoryBase}?page=${currentPage + 1}`}
                  className="pagination-btn"
                >
                  次のページ →
                </Link>
              )}
            </nav>
          )}
        </div>
      </section>
    </>
  );
}
