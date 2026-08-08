import wordpacksData from './wordpacks-data.generated.json';

export function getAllWordPacks() {
  return wordpacksData;
}

export function getWordPack(id) {
  return wordpacksData.find(p => p.id === id) || null;
}
