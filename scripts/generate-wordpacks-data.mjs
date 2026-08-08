import fs from 'fs';
import path from 'path';

const packsDir = path.join(process.cwd(), 'content/wordpacks');
const outputPath = path.join(process.cwd(), 'lib', 'wordpacks-data.generated.json');

function main() {
  if (!fs.existsSync(packsDir)) {
    fs.writeFileSync(outputPath, '[]', 'utf8');
    console.log('[generate-wordpacks-data] content/wordpacks not found, wrote empty array');
    return;
  }

  const packs = fs
    .readdirSync(packsDir)
    .filter(f => f.endsWith('.json'))
    .map(f => {
      const data = JSON.parse(fs.readFileSync(path.join(packsDir, f), 'utf8'));
      return { ...data, id: data.id || f.replace('.json', '') };
    })
    .sort((a, b) => (a.order ?? 99) - (b.order ?? 99));

  fs.writeFileSync(outputPath, JSON.stringify(packs), 'utf8');
  console.log(`[generate-wordpacks-data] ${packs.length}件の単語パックを書き出しました -> ${outputPath}`);
}

main();
