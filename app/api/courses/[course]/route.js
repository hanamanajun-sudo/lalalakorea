import { getCourse } from '../../../../lib/courses';
import { CORS_HEADERS, checkApiKey, unauthorizedResponse } from '../../../../lib/apiAuth';

export async function GET(request, { params }) {
  if (!checkApiKey(request)) return unauthorizedResponse();

  const { course: courseId } = await params;
  const course = getCourse(courseId);

  if (!course) {
    return Response.json({ error: 'course not found' }, { status: 404, headers: CORS_HEADERS });
  }

  return Response.json(course, {
    headers: {
      ...CORS_HEADERS,
      'Cache-Control': 'private, max-age=300',
    },
  });
}

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: CORS_HEADERS });
}
