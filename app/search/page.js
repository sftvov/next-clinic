import Database from 'better-sqlite3';
import path from 'path';
import { Link } from 'next-view-transitions';
import DoctorCard from '@/components/DoctorCard';
import ServiceCard from '@/components/ServiceCard';

export default async function SearchPage({ searchParams }) {
  // Если searchParams нет — используем пустой объект
  const params = await searchParams || {};
  const query = params.q?.trim() || '';

  const db = new Database(path.join(process.cwd(), 'dev.db'));

  // Поиск врачей
  const doctors = db.prepare(`
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
    WHERE d.name LIKE '%' || ? || '%'
    ORDER BY d.id
  `).all(query);

  // Поиск услуг
  const services = db.prepare(`
    SELECT 
      s.id,
      s.name,
      s.slug,
      s.description,
      (
        SELECT MIN(p.price)
        FROM service_prices sp
        JOIN prices p ON sp.price_id = p.id
        WHERE sp.service_id = s.id
      ) AS price_from
    FROM services s
    WHERE s.name LIKE '%' || ? || '%'
    ORDER BY s.id
  `).all(query);

  db.close();

  const hasResults = doctors.length > 0 || services.length > 0;

  return (
    <div className="section py-8">
      <h1 className="t1 text-navy mb-6">
        Результаты поиска {query && `по запросу «${query}»`}
      </h1>

      {!query && (
        <p className="p1 text-gray-500">Введите запрос для поиска</p>
      )}

      {query && !hasResults && (
        <p className="p1 text-gray-500">Ничего не найдено по запросу «{query}»</p>
      )}

      {/* Врачи */}
      {doctors.length > 0 && (
        <div className="mb-12">
          <h2 className="t2 text-navy mb-4">Врачи ({doctors.length})</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 md:gap-4">
            {doctors.map((doctor) => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))}
          </div>
        </div>
      )}

      {/* Услуги */}
      {services.length > 0 && (
        <div>
          <h2 className="t2 text-navy mb-4">Услуги ({services.length})</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-2 md:gap-4">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}