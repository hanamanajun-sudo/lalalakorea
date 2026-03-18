import { getAllPosts, getAllCategories } from '../../../lib/posts';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const cats = getAllCategories();
  return cats.map(c => ({ name: encodeURIComponent(c) }));
}

export default function CategoryPage({ params }) {
  const name = decodeURIComponent(params.name);
  const all = getAllPosts();
  const posts = all.filter(p => p.categories.includes(name));
  if (!posts.length) notFound();
  const categories = getAllCategories();

  return (
    <>
      <div className="hero" style={{ padding: '40px 20px' }}>
        <h1>{name}</h1>
        <p>{posts.length}件の記事</p>
      </div>

      <div className="category-filter">
        <div className="container">
          <a href="/" className="cat-btn">すべて</a>
          {categories.map(cat => (
            <a key={cat} href={`/category/${encodeURIComponent(cat)}`}
              className={`cat-btn${cat === name ? ' active' : ''}`}>
              {cat}
            </a>
          ))}
        </div>
      </div>

      <section className="posts-section">
        <div className="container">
          <div className="posts-grid">
            {posts.map(post => (
              <Link key={post.slug} href={`/${post.slug}`} className="post-card">
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
        </div>
      </section>
    </>
  );
}
