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
        {state === 'sending' ? '送信中…' : 'ログインリンクを送る'}
      </button>
      {state === 'error' && <p className="login-error">⚠️ {errorMsg}</p>}
    </form>
  );
}
