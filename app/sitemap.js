import { getAllPosts, getAllCategories } from '../lib/posts';

export default function sitemap() {
  const posts = getAllPosts();
  const categories = getAllCategories();

  const postUrls = posts.map(post => ({
    url: `https://lalalakorea.com/${post.slug}/`,
    lastModified: post.date ? new Date(post.date).toISOString() : new Date().toISOString(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  const categoryUrls = categories.map(cat => ({
    url: `https://lalalakorea.com/category/${encodeURIComponent(cat)}/`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly',
    priority: 0.6,
  }));

  return [
    {
      url: 'https://lalalakorea.com/',
      lastModified: new Date().toISOString(),
      changeFrequency: 'daily',
      priority: 1,
    },
    ...postUrls,
    ...categoryUrls,
  ];
}
