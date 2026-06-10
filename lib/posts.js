import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import remarkHtml from 'remark-html';

const postsDir = path.join(process.cwd(), 'content/posts');

// 헤딩 텍스트 → anchor ID 변환 (일본어/한국어 포함)
function headingToId(text) {
  return text
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\u3040-\u309f\u30a0-\u30ff\u4e00-\u9faf\u3400-\u4dbf\uac00-\ud7a3-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '') || `h-${Math.random().toString(36).slice(2, 7)}`;
}

// HTML에서 h2/h3 추출 + id 속성 주입
function processHeadings(html) {
  const headings = [];
  const usedIds = {};

  const processed = html.replace(
    /<(h[23])>([\s\S]*?)<\/\1>/gi,
    (match, tag, inner) => {
      const text = inner.replace(/<[^>]+>/g, '').trim();
      let id = headingToId(text);
      // 중복 ID 방지
      if (usedIds[id]) { usedIds[id]++; id = `${id}-${usedIds[id]}`; }
      else usedIds[id] = 1;
      headings.push({ id, text, level: parseInt(tag[1]) });
      return `<${tag} id="${id}">${inner}</${tag}>`;
    }
  );

  return { processed, headings };
}

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
        date: data.date ? (data.date instanceof Date ? data.date.toISOString().slice(0, 10) : String(data.date).slice(0, 10)) : '',
        categories: data.categories || [],
        excerpt: data.excerpt || '',
        thumbnail: data.thumbnail || '',
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
  return posts;
}

export async function getPostBySlug(slug) {
  const files = fs.readdirSync(postsDir);
  let targetFilename = null;

  // 1. 단순 파일명 매칭 대신, 모든 파일을 순회하며 정확한 slug를 가진 파일을 찾습니다.
  for (const filename of files) {
    if (!filename.endsWith('.md')) continue;
    const raw = fs.readFileSync(path.join(postsDir, filename), 'utf8');
    const { data } = matter(raw);
    const currentSlug = data.slug || filename.replace('.md', '');

    if (currentSlug === slug) {
      targetFilename = filename;
      break;
    }
  }

  // 일치하는 파일이 없으면 404 에러를 위해 null 반환
  if (!targetFilename) return null;

  const filePath = path.join(postsDir, targetFilename);
  const raw = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(raw);

  const remarkResult = await remark().use(remarkGfm).use(remarkHtml, { sanitize: false }).process(content);
  const { processed, headings } = processHeadings(remarkResult.toString());

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
    date: data.date ? (data.date instanceof Date ? data.date.toISOString().slice(0, 10) : String(data.date).slice(0, 10)) : '',
    categories: data.categories || [],
    excerpt: data.excerpt || '',
    thumbnail: data.thumbnail || '',  // ← 추가: OG 이미지 폴백에 필요
    content: processed,
    headings,
    relatedPosts,
  };
}

export function getAllCategories() {
  const posts = getAllPosts();
  const cats = new Set();
  posts.forEach(p => (p.categories || []).forEach(c => c && cats.add(c)));
  return Array.from(cats);
}
