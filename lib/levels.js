// 教材の難易度（やさしい順）。上級はまだ教材なし
export const LEVELS = ['基礎', '入門', '中級', '上級'];

export function levelRank(level) {
  const i = LEVELS.indexOf(level);
  return i === -1 ? LEVELS.indexOf('入門') : i;
}
