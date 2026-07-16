import { createServerClient } from '@supabase/ssr';
import { NextResponse } from 'next/server';

// ログインセッションのトークンを自動更新する
export async function middleware(request) {
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
  matcher: ['/learn/:path*', '/login', '/auth/:path*'],
};
