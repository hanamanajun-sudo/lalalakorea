import Link from 'next/link';

export default function RelatedPosts({ posts }) {
  if (!posts || posts.length === 0) return null;
  return (
    <div className="related-posts">
      <h3 className="related-title">📖 関連記事</h3>
      <div className="related-grid">
        {posts.map(post => (
          <Link key={post.slug} href={`/${post.slug}`} className="related-card">
            <div className="related-img">
              {post.thumbnail
                ? <img src={post.thumbnail} alt={post.title} loading="lazy" />
                : <div className="related-img-placeholder">📝</div>
              }
            </div>
            <div className="related-body">
              {post.categories[0] && (
                <span className="related-cat">{post.categories[0]}</span>
              )}
              <div className="related-post-title">{post.title}</div>
              <div className="related-date">{post.date}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
