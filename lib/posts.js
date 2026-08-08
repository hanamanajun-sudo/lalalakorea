import postsData from './posts-data.generated.json';

export function getAllPosts() {
  return postsData.map(({ slug, title, date, categories, excerpt, thumbnail }) => ({
    slug, title, date, categories, excerpt, thumbnail,
  }));
}

export async function getPostBySlug(slug) {
  return postsData.find(p => p.slug === slug) || null;
}

export function getAllCategories() {
  const cats = new Set();
  postsData.forEach(p => (p.categories || []).forEach(c => c && cats.add(c)));
  return Array.from(cats);
}
