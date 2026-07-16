'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { createClient } from '../../lib/supabase/client';

export default function Quiz({ courseId, lessonId, questions, nextLesson }) {
  const [started, setStarted] = useState(false);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [finished, setFinished] = useState(false);
  const [user, setUser] = useState(null);
  const [saveState, setSaveState] = useState('idle'); // idle | saving | saved | error

  const supabase = createClient();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
  }, [supabase]);

  // クイズが無いレッスンは完了ボタンだけ出す
  const hasQuiz = questions && questions.length > 0;

  async function saveProgress(score) {
    if (!user) return;
    setSaveState('saving');
    const { error } = await supabase.from('user_progress').upsert(
      {
        user_id: user.id,
        course_id: courseId,
        lesson_id: lessonId,
        score,
        completed_at: new Date().toISOString(),
      },
      { onConflict: 'user_id,course_id,lesson_id' }
    );
    setSaveState(error ? 'error' : 'saved');
  }

  function handleSelect(i) {
    if (answered) return;
    setSelected(i);
    setAnswered(true);
    if (i === questions[current].answer) setCorrectCount(c => c + 1);
  }

  function handleNext() {
    if (current < questions.length - 1) {
      setCurrent(c => c + 1);
      setSelected(null);
      setAnswered(false);
    } else {
      const score = Math.round(((correctCount) / questions.length) * 100);
      setFinished(true);
      saveProgress(score);
    }
  }

  // ── クイズなしレッスン：完了ボタンのみ ──
  if (!hasQuiz) {
    return (
      <div className="quiz-box">
        <CompleteFooter
          user={user}
          saveState={saveState}
          onComplete={() => { setFinished(true); saveProgress(100); }}
          finished={finished}
          nextLesson={nextLesson}
          courseId={courseId}
        />
      </div>
    );
  }

  // ── 開始前 ──
  if (!started) {
    return (
      <div className="quiz-box">
        <div className="quiz-intro">
          <div className="quiz-intro-icon"><i className="ph ph-pencil-line" /></div>
          <h3>理解度チェック（全{questions.length}問）</h3>
          <p>学んだ内容をクイズで確認しましょう！</p>
          <button className="quiz-btn-primary" onClick={() => setStarted(true)}>
            クイズを始める
          </button>
        </div>
      </div>
    );
  }

  // ── 結果画面 ──
  if (finished) {
    const score = Math.round((correctCount / questions.length) * 100);
    return (
      <div className="quiz-box">
        <div className="quiz-result">
          <div className="quiz-result-emoji">
            <i className={`ph-fill ph-${score === 100 ? 'confetti' : score >= 60 ? 'smiley' : 'barbell'}`} />
          </div>
          <h3>クイズ完了！</h3>
          <div className="quiz-score">{questions.length}問中 <strong>{correctCount}問</strong>正解</div>
          <div className="quiz-score-pct">{score}点</div>
          <CompleteFooter
            user={user}
            saveState={saveState}
            finished={true}
            nextLesson={nextLesson}
            courseId={courseId}
          />
        </div>
      </div>
    );
  }

  // ── 出題中 ──
  const q = questions[current];
  return (
    <div className="quiz-box">
      <div className="quiz-progress-bar">
        <div className="quiz-progress-fill" style={{ width: `${(current / questions.length) * 100}%` }} />
      </div>
      <div className="quiz-count">問題 {current + 1} / {questions.length}</div>
      <h3 className="quiz-question">{q.question}</h3>
      <div className="quiz-options">
        {q.options.map((opt, i) => {
          let cls = 'quiz-option';
          if (answered) {
            if (i === q.answer) cls += ' correct';
            else if (i === selected) cls += ' wrong';
          }
          return (
            <button key={i} className={cls} onClick={() => handleSelect(i)} disabled={answered}>
              {opt}
            </button>
          );
        })}
      </div>
      {answered && (
        <div className={`quiz-explain ${selected === q.answer ? 'ok' : 'ng'}`}>
          <strong>{selected === q.answer ? '正解！' : '残念…'}</strong> {q.explain}
        </div>
      )}
      {answered && (
        <button className="quiz-btn-primary" onClick={handleNext}>
          {current < questions.length - 1 ? '次の問題へ' : '結果を見る'}
        </button>
      )}
    </div>
  );
}

function CompleteFooter({ user, saveState, onComplete, finished, nextLesson, courseId }) {
  return (
    <div className="quiz-footer">
      {!finished && onComplete && (
        <button className="quiz-btn-primary" onClick={onComplete}>
          このレッスンを完了する
        </button>
      )}

      {finished && (
        <>
          {user ? (
            <div className="quiz-save-msg">
              {saveState === 'saving' && '進捗を保存中…'}
              {saveState === 'saved' && <><i className="ph-fill ph-check-circle" /> 進捗を保存しました</>}
              {saveState === 'error' && <><i className="ph-fill ph-warning-circle" /> 保存に失敗しました（テーブル未作成かも）</>}
            </div>
          ) : (
            <div className="quiz-login-prompt">
              <p>ログインすると進捗が保存され、次回続きから学習できます</p>
              <Link href="/login" className="quiz-btn-primary">ログインして保存</Link>
            </div>
          )}

          <div className="quiz-nav-links">
            {nextLesson ? (
              <Link href={`/learn/${courseId}/${nextLesson.id}`} className="quiz-btn-next">
                次のレッスン：{nextLesson.title} →
              </Link>
            ) : (
              <Link href={`/learn/${courseId}`} className="quiz-btn-next">
                教材トップに戻る
              </Link>
            )}
          </div>
        </>
      )}
    </div>
  );
}
