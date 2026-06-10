/**
 * 카테고리별 아이콘(이모지) + 배경색 매핑
 * 썸네일 없는 글의 카드에 자동 표시됨
 */

const categoryIconMap = {
  '韓国語': { emoji: '🇰🇷', label: '韓国語', gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
  '韓国グルメ': { emoji: '🍜', label: 'グルメ', gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' },
  '韓国エンタメ': { emoji: '🎬', label: 'エンタメ', gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' },
  '韓国の文化': { emoji: '🏯', label: '文化', gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' },
  '韓国旅行': { emoji: '✈️', label: '旅行', gradient: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)' },
  '韓国コスメ': { emoji: '💄', label: 'コスメ', gradient: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)' },
  'ハッシュタグ': { emoji: '#️⃣', label: 'ハッシュタグ', gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)' },
  '韓国ホットイシュー': { emoji: '🔥', label: 'ホットイシュー', gradient: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)' },
  '日常': { emoji: '☕️', label: '日常', gradient: 'linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)' },
};

const defaultIcon = { emoji: '📝', label: '記事', gradient: 'linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)' };

/**
 * 카테고리 목록에서 첫 번째 유효한 카테고리의 아이콘 정보 반환
 */
export function getCategoryIcon(categories) {
  if (!categories || categories.length === 0) return defaultIcon;
  for (const cat of categories) {
    if (categoryIconMap[cat]) return categoryIconMap[cat];
  }
  return defaultIcon;
}

export default categoryIconMap;
