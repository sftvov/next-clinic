import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';
import { doctorsData } from '../data/doctors.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Подключаемся к базе (создаст файл, если его нет)
const db = new Database(path.join(__dirname, '../dev.db'));

// ============================================
// 1. Создаём таблицы с правильными именами
// ============================================
db.exec(`
  -- Врачи
  CREATE TABLE IF NOT EXISTS doctors (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    career_start_year INTEGER NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  -- Специальности
  CREATE TABLE IF NOT EXISTS specialties (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  -- Связь врачей и специальностей (многие ко многим)
  CREATE TABLE IF NOT EXISTS doctor_specialties (
    doctor_id INTEGER NOT NULL,
    specialty_id INTEGER NOT NULL,
    PRIMARY KEY (doctor_id, specialty_id),
    FOREIGN KEY (doctor_id) REFERENCES doctors(id) ON DELETE CASCADE,
    FOREIGN KEY (specialty_id) REFERENCES specialties(id) ON DELETE CASCADE
  );
`);

console.log('✅ Таблицы созданы');

// ============================================
// 2. Очищаем старые данные
// ============================================
db.exec('DELETE FROM doctor_specialties;');
db.exec('DELETE FROM doctors;');
db.exec('DELETE FROM specialties;');
db.exec("DELETE FROM sqlite_sequence WHERE name IN ('doctors', 'specialties');");

console.log('🗑️ Старые данные удалены');

// ============================================
// 3. Добавляем специальности
// ============================================
// Собираем все уникальные специальности и генерируем slug
const allSpecialties = new Map();

for (const doctor of doctorsData) {
  for (const specName of doctor.specialty) {
    if (!allSpecialties.has(specName)) {
      // Генерируем slug из названия специальности
      const slug = specName
        .toLowerCase()
        .replace(/[^а-яёa-z0-9]/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');
      allSpecialties.set(specName, slug);
    }
  }
}

const insertSpecialty = db.prepare(`
  INSERT INTO specialties (name, slug) VALUES (?, ?)
`);

const specialtyMap = {}; // name -> id

const insertSpecialtyTxn = db.transaction((specs) => {
  for (const [name, slug] of specs) {
    const info = insertSpecialty.run(name, slug);
    specialtyMap[name] = info.lastInsertRowid;
    console.log(`✅ Специальность: ${name} (ID: ${info.lastInsertRowid})`);
  }
});

insertSpecialtyTxn(allSpecialties);
console.log(`✅ Добавлено ${allSpecialties.size} специальностей`);

// ============================================
// 4. Добавляем врачей
// ============================================
const insertDoctor = db.prepare(`
  INSERT INTO doctors (name, slug, career_start_year, created_at, updated_at)
  VALUES (?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
`);

const doctorMap = {}; // slug -> id

const insertDoctorTxn = db.transaction((doctors) => {
  for (const doctor of doctors) {
    const info = insertDoctor.run(doctor.name, doctor.slug, doctor.careerStart);
    doctorMap[doctor.slug] = info.lastInsertRowid;
    console.log(`✅ ${doctor.name} (ID: ${info.lastInsertRowid})`);
  }
});

insertDoctorTxn(doctorsData);
console.log(`✅ Добавлено ${doctorsData.length} врачей`);

// ============================================
// 5. Связываем врачей со специальностями
// ============================================
const insertLink = db.prepare(`
  INSERT INTO doctor_specialties (doctor_id, specialty_id) VALUES (?, ?)
`);

const linkTxn = db.transaction((doctors) => {
  for (const doctor of doctors) {
    const doctorId = doctorMap[doctor.slug];
    if (!doctorId) {
      console.error(`❌ Врач не найден: ${doctor.slug}`);
      continue;
    }

    for (const specName of doctor.specialty) {
      const specialtyId = specialtyMap[specName];
      if (specialtyId) {
        insertLink.run(doctorId, specialtyId);
      } else {
        console.error(`❌ Специальность не найдена: ${specName}`);
      }
    }
  }
});

linkTxn(doctorsData);
console.log('🔗 Связи врачей со специальностями созданы');

// ============================================
// 6. Итог
// ============================================
console.log(`\n🎉 ИТОГО:`);
console.log(`   - ${doctorsData.length} врачей`);
console.log(`   - ${allSpecialties.size} специальностей`);
console.log(`   - База данных: ${path.join(__dirname, '../dev.db')}`);

db.close();