import { createServerClient } from '@supabase/ssr';
import { NextResponse } from 'next/server';

// 구 WordPress 시절의 이미지 경로. 61개 글이 아직 참조 중이므로
// 아래 스캐너 차단보다 먼저 통과시켜야 한다 (차단하면 썸네일이 전부 깨진다).
const LEGACY_UPLOADS = /^\/wp-content\/uploads\//i;

// 취약점 스캐너가 두드리는 경로(WordPress·PHP·설정 파일 등).
// Next 라우팅 이전에 404로 끊어, 존재하지 않는 slug를 렌더링하느라
// Worker CPU 시간을 소모하지 않게 한다.
const SCANNER_PATH =
  /^\/(?:wp-|wordpress|xmlrpc|phpmyadmin|administrator|vendor\/|cgi-bin\/|\.env|\.git|\.aws|\.well-known\/traffic-advice)|\.(?:php\d?|asp|aspx|jsp|cgi|sql|bak|old|ini)$/i;

// 로그인 세션 갱신이 필요한 경로
const AUTH_PATH = /^\/(?:learn|login|auth)(?:\/|$)/;

// ログインセッションのトークンを自動更新する
export async function middleware(request) {
  const { pathname } = request.nextUrl;

  if (!LEGACY_UPLOADS.test(pathname) && SCANNER_PATH.test(pathname)) {
    return new NextResponse(null, { status: 404 });
  }

  if (!AUTH_PATH.test(pathname)) {
    return NextResponse.next();
  }

  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // トークン更新（/learn と /login 配下のみで実行）
  await supabase.auth.getUser();

  return response;
}

export const config = {
  // Next 내부 요청과 정적 파일을 제외한 모든 경로에서 실행한다.
  // (스캐너 경로를 잡아내려면 /learn·/login 밖에서도 돌아야 한다)
  matcher: [
    '/((?!_next/static|_next/image|images/|favicon\.ico|.*\.(?:png|jpe?g|gif|svg|webp|ico|css|js|txt|xml|json|woff2?)$).*)',
  ],
};
