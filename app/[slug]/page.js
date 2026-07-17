import { getPostBySlug, getAllPosts } from '../../lib/posts';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import InstagramEmbed from './InstagramEmbed';
import RelatedPosts from './RelatedPosts';
import TableOfContents from './TableOfContents';
import ShareButtons from './ShareButtons';
import LearnCTA from './LearnCTA';
import LearnBanner from './LearnBanner';

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
  const ogImageUrl = post.thumbnail
    ? post.thumbnail.startsWith('http') ? post.thumbnail : `${siteUrl}${post.thumbnail.startsWith('/') ? '' : '/'}${post.thumbnail}`
    : `${siteUrl}/og-default.png`;
  const ogImage = { url: ogImageUrl, width: 1200, height: 630, alt: post.title };
  return {
    title: `${post.title} | LaLaLaKorea`,
    description,
    openGraph: {
      title: post.title,
      description,
      url: `${siteUrl}/${post.slug}/`,
      siteName: 'LaLaLaKorea',
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
      name: 'LaLaLaKorea',
      logo: { '@type': 'ImageObject', url: 'https://lalalakorea.com/og-default.png' },
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
        <div className="meta">{post.date}　・　約{post.readingTime}分で読めます</div>
      </div>
      <LearnBanner />
      <ShareButtons title={post.title} url={postUrl} />
      <TableOfContents headings={post.headings} />
      <div
        className="post-content"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
      {hasInstagram && <InstagramEmbed />}
      {post.categories.includes('韓国語') && <LearnCTA />}
      <ShareButtons title={post.title} url={postUrl} />
      <RelatedPosts posts={post.relatedPosts} />
    </article>
    </>
  );
}
