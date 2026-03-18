import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkHtml from 'remark-html';

const postsDir = path.join(process.cwd(), 'content/posts');

export function getAllPosts() {
  const files = fs.readdirSync(postsDir);
  const posts = files
    .filter(f => f.endsWith('.md'))
    .map(filename => {
      const raw = fs.readFileSync(path.join(postsDir, filename), 'utf8');
      const { data } = matter(raw);
      return {
        slug: data.slug || filename.replace('.md', ''),
        title: data.title || '',
        date: data.date || '',
        categories: data.categories || [],
        excerpt: data.excerpt || '',
        thumbnail: data.thumbnail || '',
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
  return posts;
}

export async function getPostBySlug(slug) {
  const filePath = path.join(postsDir, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(raw);
  const processed = await remark().use(remarkHtml).process(content);
  return {
    slug: data.slug || slug,
    title: data.title || '',
    date: data.date || '',
    categories: data.categories || [],
    excerpt: data.excerpt || '',
    content: processed.toString(),
  };
}

export function getAllCategories() {
  const posts = getAllPosts();
  const cats = new Set();
  posts.forEach(p => (p.categories || []).forEach(c => c && cats.add(c)));
  return Array.from(cats);
}
