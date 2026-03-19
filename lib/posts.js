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
        date: data.date ? String(data.date).slice(0, 10) : '',
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
  const processed = await remark().use(remarkHtml, { sanitize: false }).process(content);

  // 추천 포스트 데이터 가져오기
  const allPosts = getAllPosts();
  const allPostMap = Object.fromEntries(allPosts.map(p => [p.slug, p]));

  let relatedSlugs = data.related_posts || [];
  relatedSlugs = relatedSlugs.filter(s => s && allPostMap[s] && s !== slug);

  // 추천글이 2개 미만이면 랜덤으로 채우기
  if (relatedSlugs.length < 2) {
    const currentCats = data.categories || [];
    const others = allPosts.filter(p =>
      p.slug !== slug &&
      !relatedSlugs.includes(p.slug)
    );
    // 같은 카테고리 우선, 그다음 랜덤
    const sameCat = others.filter(p => p.categories.some(c => currentCats.includes(c)));
    const pool = sameCat.length >= 2 ? sameCat : others;
    const shuffled = pool.sort(() => Math.random() - 0.5);
    while (relatedSlugs.length < 2 && shuffled.length > 0) {
      relatedSlugs.push(shuffled.pop().slug);
    }
  }

  const relatedPosts = relatedSlugs.slice(0, 3).map(s => allPostMap[s]).filter(Boolean);

  return {
    slug: data.slug || slug,
    title: data.title || '',
    date: data.date ? String(data.date).slice(0, 10) : '',
    categories: data.categories || [],
    excerpt: data.excerpt || '',
    content: processed.toString(),
    relatedPosts,
  };
}

export function getAllCategories() {
  const posts = getAllPosts();
  const cats = new Set();
  posts.forEach(p => (p.categories || []).forEach(c => c && cats.add(c)));
  return Array.from(cats);
}
