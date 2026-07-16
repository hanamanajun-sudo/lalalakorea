import { NextResponse } from 'next/server';
import { createClient } from '../../../lib/supabase/server';

// マジックリンクのコードをセッションに交換する
export async function GET(request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');

  // オープンリダイレクト対策：同一サイトの相対パスのみ許可
  const nextParam = searchParams.get('next');
  const safeNext =
    nextParam && nextParam.startsWith('/') && !nextParam.startsWith('//') && !nextParam.startsWith('/\\')
      ? nextParam
      : '/learn';

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(new URL(safeNext, origin));
    }
  }

  return NextResponse.redirect(`${origin}/login?error=auth`);
}
