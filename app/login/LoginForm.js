'use client';

import { useState } from 'react';
import { createClient } from '../../lib/supabase/client';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [state, setState] = useState('idle'); // idle | sending | sent | error
  const [errorMsg, setErrorMsg] = useState('');
  const supabase = createClient();

  async function handleSubmit(e) {
    e.preventDefault();
    if (!email) return;
    setState('sending');
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    if (error) {
      setErrorMsg(error.message);
      setState('error');
    } else {
      setState('sent');
    }
  }

  async function handleGoogle() {
    setState('sending');
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    if (error) {
      setErrorMsg(error.message);
      setState('error');
    }
    // 成功時は Google の認証画面へ自動遷移するため、ここでは何もしない
  }

  if (state === 'sent') {
    return (
      <div className="login-sent">
        <div className="login-sent-icon">📬</div>
        <h2>メールを送信しました！</h2>
        <p>
          <strong>{email}</strong> にログイン用のリンクを送りました。<br />
          メールを開いてリンクをクリックしてください。
        </p>
        <p className="login-sent-note">
          （メールが届かない場合は、迷惑メールフォルダもご確認ください）
        </p>
      </div>
    );
  }

  return (
    <div className="login-methods">
      <button
        type="button"
        onClick={handleGoogle}
        className="login-google-btn"
        disabled={state === 'sending'}
      >
        <svg viewBox="0 0 18 18" width="18" height="18" aria-hidden="true">
          <path fill="#4285F4" d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.92c1.71-1.57 2.68-3.89 2.68-6.62z"/>
          <path fill="#34A853" d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.92-2.26c-.8.54-1.84.86-3.04.86-2.34 0-4.32-1.58-5.03-3.7H.96v2.33A9 9 0 0 0 9 18z"/>
          <path fill="#FBBC05" d="M3.97 10.72a5.4 5.4 0 0 1 0-3.44V4.95H.96a9 9 0 0 0 0 8.1l3.01-2.33z"/>
          <path fill="#EA4335" d="M9 3.58c1.32 0 2.5.45 3.44 1.35l2.58-2.58C13.46.9 11.43 0 9 0A9 9 0 0 0 .96 4.95l3.01 2.33C4.68 5.16 6.66 3.58 9 3.58z"/>
        </svg>
        Googleでログイン
      </button>

      <div className="login-divider"><span>または</span></div>

      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="you@example.com"
          required
          className="login-input"
          disabled={state === 'sending'}
        />
        <button type="submit" className="login-btn" disabled={state === 'sending'}>
          {state === 'sending' ? '送信中…' : 'メールでログインリンクを送る'}
        </button>
        {state === 'error' && <p className="login-error">⚠️ {errorMsg}</p>}
      </form>
    </div>
  );
}
