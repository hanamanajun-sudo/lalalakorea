import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllCourses, getCourse, getLesson } from '../../../../lib/courses';
import Quiz from '../../Quiz';

export function generateStaticParams() {
  const params = [];
  for (const course of getAllCourses()) {
    for (const lessonId of course.lessons || []) {
      params.push({ course: course.id, lesson: lessonId });
    }
  }
  return params;
}

export async function generateMetadata({ params }) {
  const lesson = await getLesson(params.course, params.lesson);
  if (!lesson) return {};
  return {
    title: `${lesson.title} | ${lesson.courseTitle} | LaLaLaKorea`,
    description: `${lesson.courseTitle}のレッスン「${lesson.title}」。クイズ付きで韓国語を楽しく学べます。`,
    alternates: { canonical: `https://lalalakorea.com/learn/${params.course}/${params.lesson}` },
  };
}

export default async function LessonPage({ params }) {
  const lesson = await getLesson(params.course, params.lesson);
  if (!lesson) notFound();

  return (
    <div className="learn-page">
      <article className="learn-lesson-page">
        <div className="learn-breadcrumb">
          <Link href="/learn">学習トップ</Link> ／{' '}
          <Link href={`/learn/${params.course}`}>{lesson.courseTitle}</Link> ／ {lesson.title}
        </div>

        <h1 className="learn-lesson-heading">{lesson.title}</h1>

        <div
          className="post-content learn-lesson-content"
          dangerouslySetInnerHTML={{ __html: lesson.content }}
        />

        <Quiz
          courseId={params.course}
          lessonId={params.lesson}
          questions={lesson.quiz}
          nextLesson={lesson.next}
        />

        <nav className="learn-lesson-nav">
          {lesson.prev ? (
            <Link href={`/learn/${params.course}/${lesson.prev.id}`} className="learn-nav-prev">
              ← {lesson.prev.title}
            </Link>
          ) : <span />}
          {lesson.next ? (
            <Link href={`/learn/${params.course}/${lesson.next.id}`} className="learn-nav-next">
              {lesson.next.title} →
            </Link>
          ) : <span />}
        </nav>
      </article>
    </div>
  );
}
