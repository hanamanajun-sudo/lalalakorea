import { getCourse } from '../../../../lib/courses';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
};

export async function GET(request, { params }) {
  const { course: courseId } = await params;
  const course = getCourse(courseId);

  if (!course) {
    return Response.json({ error: 'course not found' }, { status: 404, headers: CORS_HEADERS });
  }

  return Response.json(course, {
    headers: {
      ...CORS_HEADERS,
      'Cache-Control': 'public, max-age=300, stale-while-revalidate=3600',
    },
  });
}

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: CORS_HEADERS });
}
