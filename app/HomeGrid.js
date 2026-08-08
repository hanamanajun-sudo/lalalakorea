import { getAllPosts, getAllCategories } from '../lib/posts';
import Link from 'next/link';
import Image from 'next/image';
import { getCategoryIcon } from '../lib/categoryIcons';
import LearnBanner from './LearnBanner';

export const POSTS_PER_PAGE = 12;

export function getHomeTotalPages() {
  return Math.ceil(getAllPosts().length / POSTS_PER_PAGE);
}

function pageHref(page) {
  return page === 1 ? '/' : `/page/${page}`;
}

export default function HomeGrid({ currentPage }) {
  const posts = getAllPosts();
  const categories = getAllCategories();

  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const paginatedPosts = posts.slice(startIndex, startIndex + POSTS_PER_PAGE);

  return (
    <>
      <div className="hero">
        <h1>韓国語・韓国文化をもっと楽しく</h1>
        <p>🇰🇷 韓国在住10年の韓日夫婦が、韓国語・グルメ・ドラマ・旅行をリアルにお届け</p>
      </div>

      <div className="category-filter">
        <div className="container">
          <Link href="/" className="cat-btn active">すべて</Link>
          {categories.map(cat => (
            <Link key={cat} href={`/category/${encodeURIComponent(cat)}`} className="cat-btn">
              {cat}
            </Link>
          ))}
        </div>
      </div>

      <div className="container">
        <LearnBanner />
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
                  {post.categories.length > 0 && (
                    <div className="post-cats">
                      {post.categories.slice(0, 2).map(cat => (
                        <span key={cat} className="post-cat-tag">{cat}</span>
                      ))}
                    </div>
                  )}
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
                <Link href={pageHref(currentPage - 1)} className="pagination-btn">
                  ← 前のページ
                </Link>
              )}

              <div className="pagination-numbers">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <Link
                    key={page}
                    href={pageHref(page)}
                    className={`pagination-num${page === currentPage ? ' active' : ''}`}
                  >
                    {page}
                  </Link>
                ))}
              </div>

              {currentPage < totalPages && (
                <Link href={pageHref(currentPage + 1)} className="pagination-btn">
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
