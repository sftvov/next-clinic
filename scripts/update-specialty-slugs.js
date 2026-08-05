import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';
import { transliterate } from 'transliteration';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Генерируем slug с помощью библиотеки
function generateSlug(text) {
  const transliterated = transliterate(text);
  return transliterated
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '-')  // Все небуквенные → тире
    .replace(/-+/g, '-')          // Убираем двойные тире
    .replace(/^-|-$/g, '');       // Убираем тире в начале и конце
}

// Подключаемся к базе
const db = new Database(path.join(__dirname, '../dev.db'));

// Получаем все специальности
const specialties = db.prepare('SELECT id, name FROM specialties').all();

console.log(`🔄 Найдено ${specialties.length} специальностей`);
console.log('');

// Обновляем slug для каждой
const update = db.prepare(`
  UPDATE specialties SET slug = ? WHERE id = ?
`);

let updated = 0;
for (const spec of specialties) {
  const slug = generateSlug(spec.name);
  update.run(slug, spec.id);
  updated++;
  console.log(`✅ ${spec.name} → ${slug}`);
}

console.log('');
console.log(`🎉 Обновлено ${updated} специальностей`);
db.close();