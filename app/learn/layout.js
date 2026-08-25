import LearnNav from './LearnNav';
import { getAllCourses } from '../../lib/courses';

export default function LearnLayout({ children }) {
  const totalLessons = getAllCourses().reduce((sum, c) => sum + (c.lessons || []).length, 0);

  return (
    <div className="learn-shell">
      <LearnNav totalLessons={totalLessons} />
      <div className="learn-shell-main">{children}</div>
    </div>
  );
}
