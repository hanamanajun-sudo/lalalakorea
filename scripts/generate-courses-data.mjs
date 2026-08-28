import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import remarkHtml from 'remark-html';

const coursesDir = path.join(process.cwd(), 'content/courses');
const outputPath = path.join(process.cwd(), 'lib', 'courses-data.generated.json');

// **bold** が日本語・韓国語の記号隣接で表示されない問題への後処理（lib/posts.js と同じ）
function convertBold(html) {
  return html.replace(/\*\*([^*\n]+?)\*\*/g, '<strong>$1</strong>');
}

function readLessonRaw(courseId, lessonId) {
  const filePath = path.join(coursesDir, courseId, `${lessonId}.md`);
  if (!fs.existsSync(filePath)) return null;
  return fs.readFileSync(filePath, 'utf8');
}

async function main() {
  if (!fs.existsSync(coursesDir)) {
    fs.writeFileSync(outputPath, '[]', 'utf8');
    console.log('[generate-courses-data] content/courses not found, wrote empty array');
    return;
  }

  const courseDirs = fs
    .readdirSync(coursesDir, { withFileTypes: true })
    .filter(d => d.isDirectory());

  const courses = [];

  for (const dirent of courseDirs) {
    const metaPath = path.join(coursesDir, dirent.name, 'course.json');
    if (!fs.existsSync(metaPath)) continue;
    const meta = JSON.parse(fs.readFileSync(metaPath, 'utf8'));
    const courseId = meta.id || dirent.name;

    const lessons = [];
    for (let i = 0; i < (meta.lessons || []).length; i++) {
      const lessonId = meta.lessons[i];
      const raw = readLessonRaw(courseId, lessonId);
      if (!raw) continue;
      const { data, content } = matter(raw);

      const remarkResult = await remark().use(remarkGfm).use(remarkHtml, { sanitize: false }).process(content);
      const html = convertBold(remarkResult.toString());

      lessons.push({
        id: lessonId,
        title: data.title || lessonId,
        order: i + 1,
        content: html,
        quiz: data.quiz || [],
        words: data.words || [],
      });
    }

    courses.push({ ...meta, id: courseId, lessons });
  }

  courses.sort((a, b) => (b.date || '').localeCompare(a.date || ''));

  fs.writeFileSync(outputPath, JSON.stringify(courses), 'utf8');
  console.log(`[generate-courses-data] ${courses.length}件の教材を書き出しました -> ${outputPath}`);
}

main().catch(err => {
  console.error('[generate-courses-data] failed:', err);
  process.exit(1);
});
