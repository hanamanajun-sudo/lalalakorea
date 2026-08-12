import { getLesson } from '../../../../../lib/courses';
import { CORS_HEADERS, checkApiKey, unauthorizedResponse } from '../../../../../lib/apiAuth';

export async function GET(request, { params }) {
  if (!checkApiKey(request)) return unauthorizedResponse();

  const { course: courseId, lesson: lessonId } = await params;
  const lesson = await getLesson(courseId, lessonId);

  if (!lesson) {
    return Response.json({ error: 'lesson not found' }, { status: 404, headers: CORS_HEADERS });
  }

  return Response.json(lesson, {
    headers: {
      ...CORS_HEADERS,
      'Cache-Control': 'public, max-age=300, stale-while-revalidate=3600',
    },
  });
}

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: CORS_HEADERS });
}
