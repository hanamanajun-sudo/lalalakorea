import { getPostBySlug, getAllPosts } from '../../lib/posts';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import InstagramEmbed from './InstagramEmbed';
import RelatedPosts from './RelatedPosts';
import TableOfContents from './TableOfContents';
import ShareButtons from './ShareButtons';

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map(p => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  // 다국어 URL 해독 로직 추가
  const decodedSlug = decodeURIComponent(params.slug);
  const post = await getPostBySlug(decodedSlug);
  
  if (!post) return {};
  const description = post.excerpt || post.title;
  const siteUrl = 'https://lalalakorea.com';
  const ogImage = post.thumbnail
    ? { url: post.thumbnail, width: 1200, height: 630, alt: post.title }
    : { url: `${siteUrl}/og-default.png`, width: 1200, height: 630, alt: 'LaLaLa KOREA' };
  return {
    title: `${post.title} | LalaLaKorea`,
    description,
    openGraph: {
      title: post.title,
      description,
      url: `${siteUrl}/${post.slug}/`,
      siteName: 'LalaLaKorea',
      images: [ogImage],
      type: 'article',
      publishedTime: post.date,
      locale: 'ja_JP',
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description,
      images: [ogImage.url],
    },
    alternates: {
      canonical: `${siteUrl}/${post.slug}/`,
    },
  };
}

export default async function PostPage({ params }) {
  // 다국어 URL 해독 로직 추가
  const decodedSlug = decodeURIComponent(params.slug);
  const post = await getPostBySlug(decodedSlug);
  
  if (!post) notFound();

  const siteUrl = 'https://lalalakorea.com';
  const postUrl = `${siteUrl}/${post.slug}/`;
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
      <ShareButtons title={post.title} url={postUrl} />
      <TableOfContents headings={post.headings}