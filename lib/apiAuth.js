export const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'x-api-key',
};

export function checkApiKey(request) {
  const key = request.headers.get('x-api-key');
  return Boolean(key) && key === process.env.LEARN_API_KEY;
}

export function unauthorizedResponse() {
  return Response.json({ error: 'unauthorized' }, { status: 401, headers: CORS_HEADERS });
}
