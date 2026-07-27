import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllCourses, getCourse } from '../../../lib/courses';
import CourseProgress from '../CourseProgress';

export function generateStaticParams() {
  return getAllCourses().map(c => ({ course: c.id }));
}

export function generateMetadata({ params }) {
  const course = getCourse(params.course);
  if (!course) return {};
  return {
    title: `${course.title} | LaLaLaKorea`,
    description: course.description,
    alternates: { canonical: `https://lalalakorea.com/learn/${course.id}` },
  };
}

export default function CoursePage({ params }) {
  const course = getCourse(params.course);
  if (!course) notFound();

  return (
    <div className="learn-page">
      <div className="learn-hero learn-hero-course">
        <div className="learn-course-emoji-lg"><i className={`ph-fill ph-${course.icon || 'book-open'}`} /></div>
        <span className="learn-course-level">{course.level || '入門'}</span>
        <h1>{course.title}</h1>
        <p>{course.description}</p>
      </div>

      <div className="learn-container learn-container-narrow">
        <div className="learn-breadcrumb">
          <Link href="/learn">学習トップ</Link> ／ {course.title}
        </div>

        <CourseProgress courseId={course.id} lessons={course.lessons} />
      </div>
    </div>
  );
}
