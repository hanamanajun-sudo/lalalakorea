import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import remarkHtml from 'remark-html';

const coursesDir = path.join(process.cwd(), 'content/courses');

// **bold** が日本語・韓国語の記号隣接で表示されない問題への後処理（lib/posts.js と同じ）
function convertBold(html) {
  return html.replace(/\*\*([^*\n]+?)\*\*/g, '<strong>$1</strong>');
}

// 全教材のメタ情報を取得
export function getAllCourses() {
  if (!fs.existsSync(coursesDir)) return [];
  return fs
    .readdirSync(coursesDir, { withFileTypes: true })
    .filter(d => d.isDirectory())
    .map(d => {
      const metaPath = path.join(coursesDir, d.name, 'course.json');
      if (!fs.existsSync(metaPath)) return null;
      const meta = JSON.parse(fs.readFileSync(metaPath, 'utf8'));
      return { ...meta, id: meta.id || d.name };
    })
    .filter(Boolean)
    .sort((a, b) => (a.order ?? 99) - (b.order ?? 99));
}

// 教材1件のメタ + レッスン一覧（本文なし・軽量）
export function getCourse(courseId) {
  const courses = getAllCourses();
  const meta = courses.find(c => c.id === courseId);
  if (!meta) return null;

  const lessons = (meta.lessons || []).map((lessonId, i) => {
    const raw = readLessonRaw(courseId, lessonId);
    if (!raw) return null;
    const { data } = matter(raw);
    return {
      id: lessonId,
      title: data.title || lessonId,
      order: i + 1,
    };
  }).filter(Boolean);

  return { ...meta, lessons };
}

function readLessonRaw(courseId, lessonId) {
  const filePath = path.join(coursesDir, courseId, `${lessonId}.md`);
  if (!fs.existsSync(filePath)) return null;
  return fs.readFileSync(filePath, 'utf8');
}

// 全教材・全レッスンの復習単語を返す
// [{ courseId, lessonId, ko, read, mean }]
export function getAllReviewWords() {
  const words = [];
  for (const course of getAllCourses()) {
    for (const lessonId of course.lessons || []) {
      const raw = readLessonRaw(course.id, lessonId);
      if (!raw) continue;
      const { data } = matter(raw);
      for (const w of data.words || []) {
        if (w && w.ko) {
          words.push({ courseId: course.id, lessonId, ko: w.ko, read: w.read || '', mean: w.mean || '' });
        }
      }
    }
  }
  return words;
}

// レッスン1件の本文 + クイズ + 前後ナビ
export async function getLesson(courseId, lessonId) {
  const raw = readLessonRaw(courseId, lessonId);
  if (!raw) return null;

  const { data, content } = matter(raw);
  const remarkResult = await remark()
    .use(remarkGfm)
    .use(remarkHtml, { sanitize: false })
    .process(content);
  const html = convertBold(remarkResult.toString());

  // 前後レッスンの算出
  const course = getCourse(courseId);
  const lessonIds = (course?.lessons || []).map(l => l.id);
  const idx = lessonIds.indexOf(lessonId);
  const prev = idx > 0 ? course.lessons[idx - 1] : null;
  const next = idx >= 0 && idx < lessonIds.length - 1 ? course.lessons[idx + 1] : null;

  return {
    id: lessonId,
    courseId,
    courseTitle: course?.title || '',
    title: data.title || lessonId,
    content: html,
    quiz: data.quiz || [],
    prev: prev ? { id: prev.id, title: prev.title } : null,
    next: next ? { id: next.id, title: next.title } : null,
  };
}
