import { getAllPosts, getAllCategories } from '../lib/posts';
import Link from 'next/link';
import Image from 'next/image';

export const metadata = {
  title: 'LaLaLaKorea – 韓国語・韓国文化をもっと楽しく',
  description: '韓国在住10年の韓日夫婦が運営。韓国語学習・韓国グルメ・Kpop・韓国ドラマを、リアルな体験談とともに日本語で発信しています。',
};

export default function Home() {
  const posts = getAllPosts();
  const categories = getAllCategories();

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

      <section className="posts-section">
        <div className="container">
          <div className="posts-grid">
            {posts.map(post => (
              <Link key={post.slug} href={`/${post.slug}`} className="post-card">
                {post.thumbnail && (
                  <div className="post-card-img">
                    <Image
                      src={post.thumbnail}
                      alt={post.title}
                      width={600}
                      height={338}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
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
