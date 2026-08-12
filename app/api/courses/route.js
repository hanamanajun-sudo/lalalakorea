import { getAllCourses } from '../../../lib/courses';
import { CORS_HEADERS, checkApiKey, unauthorizedResponse } from '../../../lib/apiAuth';

export async function GET(request) {
  if (!checkApiKey(request)) return unauthorizedResponse();

  const courses = getAllCourses();
  return Response.json(courses, {
    headers: {
      ...CORS_HEADERS,
      'Cache-Control': 'public, max-age=300, stale-while-revalidate=3600',
    },
  });
}

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: CORS_HEADERS });
}
