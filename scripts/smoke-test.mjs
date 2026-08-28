// 배포 직후 라이브 URL을 직접 두드려 검증한다.
// 로컬 빌드가 성공해도 Cloudflare 런타임에서만 깨지는 장애가 있기 때문에
// (예: incrementalCache 미설정 + dynamicParams=false 조합으로 전 글이 404가 된 건),
// 배포 후 실제 응답을 확인하는 이 단계가 유일한 안전망이다.
//
// 사용법: node scripts/smoke-test.mjs [베이스URL]
import fs from 'fs';
import path from 'path';

const BASE = (process.argv[2] || process.env.SMOKE_BASE_URL || 'https://lalalakorea.com').replace(/\/$/, '');

// 빌드 산출물이 있으면 최신 글·카테고리를 실제 데이터에서 뽑아 쓴다.
// (목록을 손으로 관리하면 새 글이 검증에서 빠진다)
function sampleFromBuild() {
  const dataPath = path.join(process.cwd(), 'lib', 'posts-data.generated.json');
  if (!fs.existsSync(dataPath)) return { posts: [], categories: [] };
  const posts = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  const categories = [...new Set(posts.flatMap(p => p.categories || []).filter(Boolean))];
  return {
    posts: posts.slice(0, 3).map(p => p.slug),   // 최신 3건
    categories: categories.slice(0, 2),
  };
}

const { posts, categories } = sampleFromBuild();

// 캐시에서 서빙돼야 하는 경로. x-nextjs-cache: MISS 면 전 요청이 SSR로 돌고 있다는 뜻이라
// 200이어도 실패로 본다 (Worker CPU 초과의 전조).
const CACHED = ['/', '/page/2', ...posts.map(s => `/${s}`)];

const OK = [
  '/about', '/search', '/learn', '/robots.txt', '/sitemap.xml',
  '/learn/hangul-basic', '/learn/hangul-basic/01-intro', '/learn/packs/kpop-fan',
  '/wp-content/uploads/1000001326.png',           // 구 WordPress 이미지(61개 글이 참조)
  ...categories.map(c => `/category/${encodeURIComponent(c)}`),
];

// 스캐너 경로. WAF가 403으로 막거나 미들웨어가 404로 끊거나, 둘 중 하나여야 한다.
const BLOCKED = ['/wp-login.php', '/xmlrpc.php', '/wp-admin/setup-config.php', '/.env'];

const failures = [];

async function probe(pathname) {
  const res = await fetch(`${BASE}${pathname}`, { redirect: 'follow' });
  return { status: res.status, cache: res.headers.get('x-nextjs-cache') };
}

async function check(pathname, label, verify) {
  let result;
  try {
    result = await probe(pathname);
  } catch (e) {
    failures.push(`${pathname} — 요청 실패: ${e.message}`);
    console.log(`  FAIL  ${pathname}  (요청 실패)`);
    return;
  }
  const problem = verify(result);
  const detail = result.cache ? `${result.status} ${result.cache}` : `${result.status}`;
  if (problem) {
    failures.push(`${pathname} — ${problem} (${label})`);
    console.log(`  FAIL  ${pathname}  ${detail}  ← ${problem}`);
  } else {
    console.log(`  ok    ${pathname}  ${detail}`);
  }
}

async function main() {
  console.log(`[smoke-test] ${BASE}`);

  console.log('\n캐시 적중 확인 (200 + HIT)');
  for (const p of CACHED) {
    await check(p, 'cached', r =>
      r.status !== 200 ? `200이어야 하는데 ${r.status}`
      : r.cache !== 'HIT' ? `x-nextjs-cache가 ${r.cache} (HIT이어야 함 — 매 요청 SSR 중)`
      : null);
  }

  console.log('\n정상 응답 확인 (200)');
  for (const p of OK) {
    await check(p, 'ok', r => (r.status === 200 ? null : `200이어야 하는데 ${r.status}`));
  }

  console.log('\n스캐너 차단 확인 (403 또는 404)');
  for (const p of BLOCKED) {
    await check(p, 'blocked', r =>
      [403, 404].includes(r.status) ? null : `403/404여야 하는데 ${r.status}`);
  }

  console.log('\n404 캐치올 확인');
  await check('/this-page-does-not-exist-xyz123', 'catchall', r =>
    (r.status === 404 ? null : `404여야 하는데 ${r.status}`));

  console.log('');
  if (failures.length) {
    console.error(`[smoke-test] ${failures.length}건 실패:`);
    failures.forEach(f => console.error(`  - ${f}`));
    process.exit(1);
  }
  console.log('[smoke-test] 전부 통과');
}

main();
