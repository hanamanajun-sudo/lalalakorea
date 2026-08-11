import { getWordPack } from '../../../../lib/wordpacks';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
};

export async function GET(request, { params }) {
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
