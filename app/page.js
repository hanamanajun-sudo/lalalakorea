import { getAllPosts, getAllCategories } from '../lib/posts';
import Link from 'next/link';

export const metadata = {
  title: 'LalaLaKorea – 韓国語・韓国文化をもっと楽しく',
  description: '韓国語の勉強、韓国グルメ、韓国ドラマ、韓国文化など。',
};

export default function Home() {
  const posts = getAllPosts();
  const categories = getAllCategories();

  return (
    <>
      <div className="hero">
        <h1>🇰🇷 LalaLaKorea</h1>
        <p>韓国語・韓国文化・韓国グルメ、もっと韓国を楽しもう</p>
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

      <section className="posts-section">
        <div className="container">
          <div className="posts-grid">
            {posts.map(post => (
              <Link key={post.slug} href={`/${post.slug}`} className="post-card">
                {post.thumbnail && (
                  <div className="post-card-img">
                    <img src={post.thumbnail} alt={post.title} loading="lazy" />
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
        </div>
      </section>
    </>
  );
}
