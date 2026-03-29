import { getPostBySlug, getAllPosts } from '../../lib/posts';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import InstagramEmbed from './InstagramEmbed';
import RelatedPosts from './RelatedPosts';
import TableOfContents from './TableOfContents';

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map(p => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const post = await getPostBySlug(params.slug);
  if (!post) return {};
  const description = post.excerpt || post.title;
  const siteUrl = 'https://lalalakorea.com';
  return {
    title: `${post.title} | LalaLaKorea`,
    description,
    openGraph: {
      title: post.title,
      description,
      url: `${siteUrl}/${post.slug}/`,
      siteName: 'LalaLaKorea',
      images: post.thumbnail ? [{ url: post.thumbnail, width: 1200, height: 630, alt: post.title }] : [],
      type: 'article',
      publishedTime: post.date,
      locale: 'ja_JP',
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description,
      images: post.thumbnail ? [post.thumbnail] : [],
    },
    alternates: {
      canonical: `${siteUrl}/${post.slug}/`,
    },
  };
}

export default async function PostPage({ params }) {
  const post = await getPostBySlug(params.slug);
  if (!post) notFound();

  const hasInstagram = post.content.includes('instagram-media');

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt || post.title,
    image: post.thumbnail || '',
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Person',
      name: 'ジュン（주논）',
      url: 'https://lalalakorea.com/about/',
    },
    publisher: {
      '@type': 'Organization',
      name: 'LalaLaKorea',
      logo: { '@type': 'ImageObject', url: 'https://lalalakorea.com/logo.png' },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `https://lalalakorea.com/${post.slug}/` },
    inLanguage: 'ja',
    keywords: post.categories.join(', '),
  };

  return (
    <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    <article className="post-page">
      <div className="post-header">
        {post.categories.length > 0 && (
          <div className="cats">
            {post.categories.map(cat => (
              <Link key={cat} href={`/category/${encodeURIComponent(cat)}`} className="cat">
                {cat}
              </Link>
            ))}
          </div>
        )}
        <h1>{post.title}</h1>
        <div className="meta">{post.date}</div>
      </div>
      <TableOfContents headings={post.headings} />
      <div
        className="post-content"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
      {hasInstagram && <InstagramEmbed />}
      <RelatedPosts posts={post.relatedPosts} />
    </article>
    </>
  );
}
