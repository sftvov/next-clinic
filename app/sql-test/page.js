import Database from 'better-sqlite3';
import path from 'path';
import SqlQuery from '@/views/SqlQuery';

export default async function SqlTestPage() {
  const db = new Database(path.join(process.cwd(), 'dev.db'));

  // ============================================
  // 1. Врачи со специальностями и ценами
  // ============================================
  const doctorsQuery = `
    SELECT 
      d.id,
      d.name,
      d.slug,
      d.career_start_year,
      (
        SELECT GROUP_CONCAT(name, ' • ')
        FROM (
          SELECT DISTINCT s.name
          FROM doctor_specialties ds
          JOIN specialties s ON ds.specialty_id = s.id
          WHERE ds.doctor_id = d.id
        )
      ) AS specialties,
      (
        SELECT MIN(p.price)
        FROM doctor_specialties ds
        JOIN specialty_prices sp ON ds.specialty_id = sp.specialty_id
        JOIN prices p ON sp.price_id = p.id
        WHERE ds.doctor_id = d.id
      ) AS price_from
    FROM doctors d
    ORDER BY d.id
    LIMIT 10
  `;
  const doctors = db.prepare(doctorsQuery).all();

  // ============================================
  // 2. Специальности с количеством врачей
  // ============================================
  const specialtiesCountQuery = `
    SELECT 
      s.name,
      COUNT(ds.doctor_id) AS doctor_count
    FROM specialties s
    LEFT JOIN doctor_specialties ds ON s.id = ds.specialty_id
    GROUP BY s.id
    ORDER BY doctor_count DESC
    LIMIT 10
  `;
  const specialtiesCount = db.prepare(specialtiesCountQuery).all();

  // ============================================
  // 3. Услуги с минимальной ценой
  // ============================================
  const servicesQuery = `
    SELECT 
      s.id,
      s.name,
      s.slug,
      MIN(p.price) AS min_price
    FROM services s
    LEFT JOIN service_prices sp ON s.id = sp.service_id
    LEFT JOIN prices p ON sp.price_id = p.id
    GROUP BY s.id
    LIMIT 10
  `;
  const services = db.prepare(servicesQuery).all();

  // ============================================
  // 4. Врачи с максимальным стажем
  // ============================================
  const oldestDoctorsQuery = `
    SELECT 
      name,
      career_start_year,
      (strftime('%Y', 'now') - career_start_year) AS experience_years
    FROM doctors
    ORDER BY career_start_year ASC
    LIMIT 10
  `;
  const oldestDoctors = db.prepare(oldestDoctorsQuery).all();

  // ============================================
  // 5. Прайс-услуги по врачам
  // ============================================
  const priceFromDoctorsQuery = `
    SELECT 
      p.name,
      p.code,
      p.price
    FROM prices p
    LEFT JOIN specialty_prices sp ON p.id = sp.price_id
    LEFT JOIN specialties s ON sp.specialty_id = s.id
    LEFT JOIN doctor_specialties ds ON s.id = ds.specialty_id
    LEFT JOIN doctors d ON ds.doctor_id = d.id
    WHERE d.id = 2
    GROUP BY p.id
    ORDER BY p.name
    LIMIT 10
  `;
  const priceFromDoctors = db.prepare(priceFromDoctorsQuery).all();

  db.close();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">🧪 SQL Тестирование</h1>

      {/* <SqlQuery query={doctorsQuery} data={doctors} title="👨‍⚕️ Врачи со специальностями и ценами" /> */}
      {/* <SqlQuery query={specialtiesCountQuery} data={specialtiesCount} title="📊 Специальности с количеством врачей" /> */}
      {/* <SqlQuery query={servicesQuery} data={services} title="💊 Услуги с минимальной ценой" /> */}
      {/* <SqlQuery query={oldestDoctorsQuery} data={oldestDoctors} title="📅 Врачи с максимальным стажем" /> */}
      <SqlQuery query={priceFromDoctorsQuery} data={priceFromDoctors} title="💰 Самые дорогие прайс-услуги" />

    </div>
  );
}