import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import remarkHtml from 'remark-html';

const postsDir = path.join(process.cwd(), 'content/posts');
const outputPath = path.join(process.cwd(), 'lib', 'posts-data.generated.json');

function headingToId(text) {
  return text
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w぀-ゟ゠-ヿ一-龯㐀-䶿가-힣-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '') || `h-${Math.random().toString(36).slice(2, 7)}`;
}

function convertBold(html) {
  return html.replace(/\*\*([^*\n]+?)\*\*/g, '<strong>$1</strong>');
}

function calcReadingTime(html) {
  const text = html.replace(/<[^>]+>/g, '').replace(/\s+/g, '');
  return Math.max(1, Math.ceil(text.length / 400));
}

function processExternalLinks(html) {
  return html.replace(
    /<a\s+href="(https?:\/\/[^"]+)"([^>]*)>/gi,
    '<a href="$1" target="_blank" rel="noopener noreferrer"$2>'
  );
}

function processHeadings(html) {
  const headings = [];
  const usedIds = {};

  const processed = html.replace(
    /<(h[23])>([\s\S]*?)<\/\1>/gi,
    (match, tag, inner) => {
      const text = inner.replace(/<[^>]+>/g, '').trim();
      let id = headingToId(text);
      if (usedIds[id]) { usedIds[id]++; id = `${id}-${usedIds[id]}`; }
      else usedIds[id] = 1;
      headings.push({ id, text, level: parseInt(tag[1]) });
      return `<${tag} id="${id}">${inner}</${tag}>`;
    }
  );

  return { processed, headings };
}

function toDateString(date) {
  return date ? (date instanceof Date ? date.toISOString().slice(0, 10) : String(date).slice(0, 10)) : '';
}

async function main() {
  const files = fs.readdirSync(postsDir).filter(f => f.endsWith('.md'));

  const parsed = files.map(filename => {
    const raw = fs.readFileSync(path.join(postsDir, filename), 'utf8');
    const { data, content } = matter(raw);
    return { filename, data, content };
  });

  const lightweight = parsed
    .map(({ filename, data }) => ({
      slug: data.slug || filename.replace('.md', ''),
      title: data.title || '',
      date: toDateString(data.date),
      categories: data.categories || [],
      excerpt: data.excerpt || '',
      thumbnail: data.thumbnail || '',
    }))
    .sort((a, b) => (a.date < b.date ? 1 : -1));

  const lightweightMap = Object.fromEntries(lightweight.map(p => [p.slug, p]));

  const posts = [];
  for (const { filename, data, content } of parsed) {
    const slug = data.slug || filename.replace('.md', '');

    const remarkResult = await remark().use(remarkGfm).use(remarkHtml, { sanitize: false }).process(content);
    const { processed, headings } = processHeadings(convertBold(processExternalLinks(remarkResult.toString())));

    let relatedSlugs = data.related_posts || [];
    relatedSlugs = relatedSlugs.filter(s => s && lightweightMap[s] && s !== slug);

    if (relatedSlugs.length < 2) {
      const currentCats = data.categories || [];
      const others = lightweight.filter(p => p.slug !== slug && !relatedSlugs.includes(p.slug));
      const sameCat = others.filter(p => p.categories.some(c => currentCats.includes(c)));
      const pool = sameCat.length >= 2 ? sameCat : others;
      const shuffled = pool.sort(() => Math.random() - 0.5);
      while (relatedSlugs.length < 2 && shuffled.length > 0) {
        relatedSlugs.push(shuffled.pop().slug);
      }
    }

    const relatedPosts = relatedSlugs.slice(0, 3).map(s => lightweightMap[s]).filter(Boolean);

    posts.push({
      slug,
      title: data.title || '',
      date: toDateString(data.date),
      categories: data.categories || [],
      excerpt: data.excerpt || '',
      thumbnail: data.thumbnail || '',
      content: processed,
      headings,
      relatedPosts,
      readingTime: calcReadingTime(processed),
    });
  }

  posts.sort((a, b) => (a.date < b.date ? 1 : -1));

  fs.writeFileSync(outputPath, JSON.stringify(posts), 'utf8');
  console.log(`[generate-posts-data] ${posts.length}件の記事を書き出しました -> ${outputPath}`);
}

main().catch(err => {
  console.error('[generate-posts-data] failed:', err);
  process.exit(1);
});
