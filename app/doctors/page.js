import Database from 'better-sqlite3';
import path from 'path';
import Breadcrumbs from '@/layouts/Breadcrumbs';
import DoctorsList from '@/views/DoctorsList';

export default async function DoctorsPage() {
  const db = new Database(path.join(process.cwd(), 'dev.db'));

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
    ORDER BY d.name
  `).all();

  db.close();

  const breadcrumbs = [
    { label: 'Главная', href: '/' },
    { label: 'Врачи', href: null },
  ];

  return (
    <>
      <Breadcrumbs items={breadcrumbs} />      
      <div className='wrapper'>
        <DoctorsList doctors={doctors} />
      </div>
    </>
  );
}