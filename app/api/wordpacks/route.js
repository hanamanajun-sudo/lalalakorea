import { getAllWordPacks } from '../../../lib/wordpacks';
import { CORS_HEADERS, checkApiKey, unauthorizedResponse } from '../../../lib/apiAuth';

export async function GET(request) {
  if (!checkApiKey(request)) return unauthorizedResponse();

  const packs = getAllWordPacks();
  return Response.json(packs, {
    headers: {
      ...CORS_HEADERS,
      'Cache-Control': 'private, max-age=300',
    },
  });
}

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: CORS_HEADERS });
}
