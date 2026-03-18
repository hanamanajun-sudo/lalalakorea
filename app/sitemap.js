import { getAllPosts } from '../lib/posts';

export default function sitemap() {
  const posts = getAllPosts();
  const postUrls = posts.map(post => ({
    url: `https://lalalakorea.com/${post.slug}`,
    lastModified: post.date || new Date().toISOString(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [
    {
      url: 'https://lalalakorea.com',
      lastModified: new Date().toISOString(),
      changeFrequency: 'daily',
      priority: 1,
    },
    ...postUrls,
  ];
}
