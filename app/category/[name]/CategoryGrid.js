import { getAllPosts, getAllCategories } from '../../../lib/posts';
import Link from 'next/link';
import Image from 'next/image';
import { getCategoryIcon } from '../../../lib/categoryIcons';

export const POSTS_PER_PAGE = 12;

export function getCategoryPosts(name) {
  return getAllPosts().filter(p => p.categories.includes(name));
}

export function getCategoryTotalPages(name) {
  return Math.ceil(getCategoryPosts(name).length / POSTS_PER_PAGE);
}

export default function CategoryGrid({ name, currentPage }) {
  const posts = getCategoryPosts(name);
  const categories = getAllCategories();

  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const paginatedPosts = posts.slice(startIndex, startIndex + POSTS_PER_PAGE);

  const categoryBase = `/category/${encodeURIComponent(name)}`;
  const pageHref = (page) => (page === 1 ? categoryBase : `${categoryBase}/page/${page}`);

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
