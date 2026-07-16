'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient } from '../lib/supabase/client';

// ヘッダー右側：ログイン状態に応じてリンクを出し分け
export default function AuthNav() {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
      setReady(true);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      setUser(session?.user ?? null);
    });
    return () => sub.subscription.unsubscribe();
  }, [supabase]);

  async function handleLogout() {
    await supabase.auth.signOut();
    router.refresh();
  }

  if (!ready) return null;

  return user ? (
    <button onClick={handleLogout} className="auth-nav-btn" title={user.email}>
      ログアウト
    </button>
  ) : (
    <Link href="/login" className="auth-nav-btn">ログイン</Link>
  );
}
