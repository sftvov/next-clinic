import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';
import { servicesData  } from '../data/services.js';
import { transliterate } from 'transliteration';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Генерируем slug для специальностей (если нужно обновить)
function generateSlug(text) {
  return transliterate(text)
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

// Подключаемся к базе
const db = new Database(path.join(__dirname, '../dev.db'));

// ============================================
// 1. Создаём таблицы
// ============================================
db.exec(`
  -- Услуги (SEO-страницы)
  CREATE TABLE IF NOT EXISTS services (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  -- Прайс-услуги (реальные позиции из прайс-листа)
  CREATE TABLE IF NOT EXISTS prices (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    code TEXT NOT NULL,
    price INTEGER NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  -- Связь услуги с прайс-услугами (SEO-страница состоит из прайс-услуг)
  CREATE TABLE IF NOT EXISTS service_prices (
    service_id INTEGER NOT NULL,
    price_id INTEGER NOT NULL,
    PRIMARY KEY (service_id, price_id),
    FOREIGN KEY (service_id) REFERENCES services(id) ON DELETE CASCADE,
    FOREIGN KEY (price_id) REFERENCES prices(id) ON DELETE CASCADE
  );

  -- Связь специальности с прайс-услугами (какую прайс-услугу может оказывать врач данной специальности)
  CREATE TABLE IF NOT EXISTS specialty_prices (
    specialty_id INTEGER NOT NULL,
    price_id INTEGER NOT NULL,
    PRIMARY KEY (specialty_id, price_id),
    FOREIGN KEY (specialty_id) REFERENCES specialties(id) ON DELETE CASCADE,
    FOREIGN KEY (price_id) REFERENCES prices(id) ON DELETE CASCADE
  );
`);

console.log('✅ Таблицы созданы');

// ============================================
// 2. Очищаем старые данные
// ============================================
db.exec('DELETE FROM specialty_prices;');
db.exec('DELETE FROM service_prices;');
db.exec('DELETE FROM prices;');
db.exec('DELETE FROM services;');
db.exec("DELETE FROM sqlite_sequence WHERE name IN ('services', 'prices');");

console.log('🗑️ Старые данные удалены');

// ============================================
// 3. Получаем маппинг специальностей из базы
// ============================================
const specialties = db.prepare('SELECT id, name FROM specialties').all();
const specialtyMap = {};
for (const s of specialties) {
  specialtyMap[s.name] = s.id;
}
console.log(`📋 Найдено ${specialties.length} специальностей`);

// ============================================
// 4. Добавляем прайс-услуги
// ============================================
const insertPrice = db.prepare(`
  INSERT INTO prices (name, code, price) VALUES (?, ?, ?)
`);

const priceMap = {}; // name -> id

const insertPriceTxn = db.transaction((pricesData) => {
  for (const price of pricesData) {
    const info = insertPrice.run(price.name, price.code, price.price);
    priceMap[price.name] = info.lastInsertRowid;
    console.log(`✅ Прайс: ${price.name} (${price.price}₽)`);
  }
});

// Собираем все уникальные прайс-услуги из services
const allPrices = [];
for (const service of servicesData ) {
  for (const price of service.prices) {
    // Проверяем, есть ли уже такая прайс-услуга
    const exists = allPrices.some(p => p.name === price.name && p.code === price.code);
    if (!exists) {
      allPrices.push(price);
    }
  }
}

insertPriceTxn(allPrices);
console.log(`✅ Добавлено ${allPrices.length} прайс-услуг`);

// ============================================
// 5. Добавляем услуги (SEO-страницы)
// ============================================
const insertService = db.prepare(`
  INSERT INTO services (name, slug, description) VALUES (?, ?, ?)
`);

const serviceMap = {}; // slug -> id

const insertServiceTxn = db.transaction((servicesData) => {
  for (const service of servicesData) {
    const info = insertService.run(service.name, service.slug, service.description);
    serviceMap[service.slug] = info.lastInsertRowid;
    console.log(`✅ Услуга: ${service.name}`);
  }
});

insertServiceTxn(servicesData );
console.log(`✅ Добавлено ${servicesData .length} услуг`);

// ============================================
// 6. Связываем услуги с прайс-услугами
// ============================================
const insertServicePrice = db.prepare(`
  INSERT OR IGNORE INTO service_prices (service_id, price_id) VALUES (?, ?)
`);

const linkServicePriceTxn = db.transaction((servicesData) => {
  for (const service of servicesData) {
    const serviceId = serviceMap[service.slug];
    if (!serviceId) {
      console.error(`❌ Услуга не найдена: ${service.slug}`);
      continue;
    }

    for (const price of service.prices) {
      const priceId = priceMap[price.name];
      if (priceId) {
        insertServicePrice.run(serviceId, priceId);
      } else {
        console.error(`❌ Прайс не найден: ${price.name}`);
      }
    }
  }
});

linkServicePriceTxn(servicesData );
console.log('🔗 Связи услуг с прайс-услугами созданы');

// ============================================
// 7. Связываем специальности с прайс-услугами
// ============================================
const insertSpecialtyPrice = db.prepare(`
  INSERT OR IGNORE INTO specialty_prices (specialty_id, price_id) VALUES (?, ?)
`);

const linkSpecialtyPriceTxn = db.transaction((servicesData) => {
  for (const service of servicesData) {
    for (const price of service.prices) {
      const priceId = priceMap[price.name];
      if (!priceId) continue;

      for (const specName of price.specialty) {
        const specialtyId = specialtyMap[specName];
        if (specialtyId) {
          insertSpecialtyPrice.run(specialtyId, priceId);
        } else {
          console.error(`❌ Специальность не найдена: ${specName}`);
        }
      }
    }
  }
});

linkSpecialtyPriceTxn(servicesData );
console.log('🔗 Связи специальностей с прайс-услугами созданы');

// ============================================
// 8. Итог
// ============================================
console.log(`\n🎉 ИТОГО:`);
console.log(`   - ${servicesData .length} услуг`);
console.log(`   - ${allPrices.length} прайс-услуг`);
console.log(`   - База данных: ${path.join(__dirname, '../dev.db')}`);

db.close();