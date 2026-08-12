import { getWordPack } from '../../../../lib/wordpacks';
import { CORS_HEADERS, checkApiKey, unauthorizedResponse } from '../../../../lib/apiAuth';

export async function GET(request, { params }) {
  if (!checkApiKey(request)) return unauthorizedResponse();

  const { pack: packId } = await params;
  const pack = getWordPack(packId);

  if (!pack) {
    return Response.json({ error: 'wordpack not found' }, { status: 404, headers: CORS_HEADERS });
  }

  return Response.json(pack, {
    headers: {
      ...CORS_HEADERS,
      'Cache-Control': 'public, max-age=300, stale-while-revalidate=3600',
    },
  });
}

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: CORS_HEADERS });
}
