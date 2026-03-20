import { getAllPosts, getAllCategories } from '../../../lib/posts';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }) {
  const name = decodeURIComponent(params.name);
  return {
    title: `${name}の記事一覧 | LaLaLaKorea`,
    description: `韓国の${name}に関する記事一覧。韓国在住10年のジュンが、リアルな体験をもとに日本語で発信しています。`,
    alternates: {
      canonical: `https://lalalakorea.com/category/${encodeURIComponent(name)}/`,
    },
  };
}

export async function generateStaticParams() {
  const cats = getAllCategories();
  return cats.map(c => ({ name: c }));
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
