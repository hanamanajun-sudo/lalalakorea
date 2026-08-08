import coursesData from './courses-data.generated.json';

// 全教材のメタ情報を取得（lessons は course.json 由来のレッスンID文字列配列のまま）
export function getAllCourses() {
  return coursesData.map(c => ({ ...c, lessons: (c.lessons || []).map(l => l.id) }));
}

// 教材1件のメタ + レッスン一覧（本文なし・軽量オブジェクト配列）
export function getCourse(courseId) {
  const course = coursesData.find(c => c.id === courseId);
  if (!course) return null;
  return {
    ...course,
    lessons: (course.lessons || []).map(({ id, title, order }) => ({ id, title, order })),
  };
}

// 全教材・全レッスンの復習単語を返す
// [{ courseId, lessonId, ko, read, mean }]
export function getAllReviewWords() {
  const words = [];
  for (const course of coursesData) {
    for (const lesson of course.lessons || []) {
      for (const w of lesson.words || []) {
        if (w && w.ko) {
          words.push({ courseId: course.id, lessonId: lesson.id, ko: w.ko, read: w.read || '', mean: w.mean || '' });
        }
      }
    }
  }
  return words;
}

// レッスン1件の本文 + クイズ + 前後ナビ
export async function getLesson(courseId, lessonId) {
  const course = coursesData.find(c => c.id === courseId);
  if (!course) return null;

  const lessons = course.lessons || [];
  const idx = lessons.findIndex(l => l.id === lessonId);
  if (idx === -1) return null;

  const lesson = lessons[idx];
  const prev = idx > 0 ? lessons[idx - 1] : null;
  const next = idx < lessons.length - 1 ? lessons[idx + 1] : null;

  return {
    id: lesson.id,
    courseId,
    courseTitle: course.title || '',
    title: lesson.title || lesson.id,
    content: lesson.content,
    quiz: lesson.quiz || [],
    prev: prev ? { id: prev.id, title: prev.title } : null,
    next: next ? { id: next.id, title: next.title } : null,
  };
}
