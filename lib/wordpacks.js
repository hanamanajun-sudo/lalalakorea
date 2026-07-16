import fs from 'fs';
import path from 'path';

const packsDir = path.join(process.cwd(), 'content/wordpacks');

export function getAllWordPacks() {
  if (!fs.existsSync(packsDir)) return [];
  return fs
    .readdirSync(packsDir)
    .filter(f => f.endsWith('.json'))
    .map(f => {
      const data = JSON.parse(fs.readFileSync(path.join(packsDir, f), 'utf8'));
      return { ...data, id: data.id || f.replace('.json', '') };
    })
    .sort((a, b) => (a.order ?? 99) - (b.order ?? 99));
}

export function getWordPack(id) {
  return getAllWordPacks().find(p => p.id === id) || null;
}
