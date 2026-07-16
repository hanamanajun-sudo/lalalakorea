import { createEmptyCard, fsrs, Rating, State } from 'ts-fsrs';

export { Rating };

const scheduler = fsrs();

// FSRS Card ⇔ Supabase 行 の変換
// DB 側は日付を ISO 文字列で保持する

export function newCard() {
  return createEmptyCard();
}

// DB 行（review_cards）→ FSRS Card オブジェクト
export function rowToCard(row) {
  return {
    due: new Date(row.due),
    stability: row.stability,
    difficulty: row.difficulty,
    elapsed_days: row.elapsed_days,
    scheduled_days: row.scheduled_days,
    reps: row.reps,
    lapses: row.lapses,
    learning_steps: row.learning_steps ?? 0,
    state: row.state,
    last_review: row.last_review ? new Date(row.last_review) : undefined,
  };
}

// FSRS Card → DB に保存する列（日付は ISO 文字列）
export function cardToColumns(card) {
  return {
    due: card.due.toISOString(),
    stability: card.stability,
    difficulty: card.difficulty,
    elapsed_days: card.elapsed_days,
    scheduled_days: card.scheduled_days,
    reps: card.reps,
    lapses: card.lapses,
    learning_steps: card.learning_steps ?? 0,
    state: card.state,
    last_review: card.last_review ? card.last_review.toISOString() : null,
  };
}

// 評価を適用して次のカード状態を返す
export function rateCard(card, rating, now = new Date()) {
  const result = scheduler.next(card, now, rating);
  return result.card;
}

// カードが「復習期限」かどうか
export function isDue(card, now = new Date()) {
  return card.due.getTime() <= now.getTime();
}

export { State };
