'use client';

import { useState } from 'react';
import { createClient } from '../../../lib/supabase/client';

const KINDS = [
  { id: 'request', label: '作ってほしいレッスン' },
  { id: 'want', label: '改善してほしいこと' },
  { id: 'complaint', label: '困ったこと・不満' },
  { id: 'other', label: 'その他' },
];

const MAX = 2000;

export default function FeedbackForm() {
  const [kind, setKind] = useState('request');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const supabase = createClient();

  async function handleSubmit(e) {
    e.preventDefault();
    const text = message.trim();
    if (!text || status === 'sending') return;
    setStatus('sending');
    const { error } = await supabase.from('lesson_feedback').insert({ kind, message: text });
    if (error) { setStatus('error'); return; }
    setMessage('');
    setStatus('sent');
  }

  if (status === 'sent') {
    return (
      <div className="feedback-done">
        <div className="feedback-done-icon"><i className="ph-fill ph-check-circle" /></div>
        <h2>送信しました。ありがとうございます！</h2>
        <p>いただいたご意見は、今後のレッスン作りの参考にさせていただきます。</p>
        <button type="button" className="quiz-btn-primary" onClick={() => setStatus('idle')}>
          もう一件送る
        </button>
      </div>
    );
  }

  return (
    <form className="feedback-form" onSubmit={handleSubmit}>
      <p className="feedback-lead">
        レッスンについて、よかった点・困った点・読みたいレッスンなど、なんでも自由に書いてください。
        返信はできませんが、すべて目を通します。
      </p>

      <fieldset className="feedback-kinds">
        <legend>内容の種類</legend>
        {KINDS.map(k => (
          <label key={k.id} className={`feedback-kind${kind === k.id ? ' active' : ''}`}>
            <input type="radio" name="kind" value={k.id} checked={kind === k.id} onChange={() => setKind(k.id)} />
            {k.label}
          </label>
        ))}
      </fieldset>

      <label className="feedback-label" htmlFor="feedback-message">メッセージ</label>
      <textarea
        id="feedback-message"
        className="feedback-textarea"
        value={message}
        onChange={e => setMessage(e.target.value.slice(0, MAX))}
        rows={7}
        placeholder="例：パッチムの発音をもっと詳しく学べるレッスンがほしいです。"
        required
      />
      <div className="feedback-count">{message.length} / {MAX}</div>

      {status === 'error' && (
        <p className="feedback-error">送信できませんでした。時間をおいてもう一度お試しください。</p>
      )}

      <button type="submit" className="quiz-btn-primary" disabled={!message.trim() || status === 'sending'}>
        {status === 'sending' ? '送信中…' : '送信する'}
      </button>
    </form>
  );
}
