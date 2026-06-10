/**
 * 카테고리별 아이콘(이모지) + 배경색 매핑
 * 썸네일 없는 글의 카드에 자동 표시됨
 */

const categoryIconMap = {
  '韓国語': { emoji: '🇰🇷', label: '韓国語', gradient: 'linear-gradient(135deg, #e8e0ff 0%, #d0c8f0 100%)' },
  '韓国グルメ': { emoji: '🍜', label: 'グルメ', gradient: 'linear-gradient(135deg, #ffe0e5 0%, #ffd0d8 100%)' },
  '韓国エンタメ': { emoji: '🎬', label: 'エンタメ', gradient: 'linear-gradient(135deg, #dce8ff 0%, #c8d8f0 100%)' },
  '韓国の文化': { emoji: '🏯', label: '文化', gradient: 'linear-gradient(135deg, #fff0d0 0%, #f8e0b0 100%)' },
  '韓国旅行': { emoji: '✈️', label: '旅行', gradient: 'linear-gradient(135deg, #d8f0e8 0%, #c0e8d8 100%)' },
  '韓国コスメ': { emoji: '💄', label: 'コスメ', gradient: 'linear-gradient(135deg, #ffe0f0 0%, #f0d0e0 100%)' },
  'ハッシュタグ': { emoji: '#️⃣', label: 'ハッシュタグ', gradient: 'linear-gradient(135deg, #e8e8e8 0%, #d8d8d8 100%)' },
  '韓国ホットイシュー': { emoji: '🔥', label: 'ホットイシュー', gradient: 'linear-gradient(135deg, #fff0e0 0%, #f8e0c8 100%)' },
  '日常': { emoji: '☕️', label: '日常', gradient: 'linear-gradient(135deg, #e0f0f0 0%, #d0e0e0 100%)' },
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
