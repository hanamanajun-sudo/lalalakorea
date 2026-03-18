import { getPostBySlug, getAllPosts } from '../../lib/posts';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map(p => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const post = await getPostBySlug(params.slug);
  if (!post) return {};
  return {
    title: `${post.title} | LalaLaKorea`,
    description: post.excerpt || post.title,
  };
}

export default async function PostPage({ params }) {
  const post = await getPostBySlug(params.slug);
  if (!post) notFound();

  return (
    <article className="post-page">
      <div className="post-header">
        {post.categories.length > 0 && (
          <div className="cats">
            {post.categories.map(cat => (
              <a key={cat} href={`/category/${encodeURIComponent(cat)}`} className="cat">
                {cat}
              </a>
            ))}
          </div>
        )}
        <h1>{post.title}</h1>
        <div className="meta">{post.date}</div>
      </div>
      <div
        className="post-content"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </article>
  );
}
