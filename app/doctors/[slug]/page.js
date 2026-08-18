import Database from 'better-sqlite3';
import path from 'path';
import Breadcrumbs from '@/layouts/Breadcrumbs';
import DoctorProfile from '@/views/DoctorProfile';
import PriceList from '@/views/PriceList';

export async function generateStaticParams() {
  const db = new Database(path.join(process.cwd(), 'dev.db'));
  
  const doctors = db.prepare('SELECT slug FROM doctors').all();
  
  db.close();
  
  return doctors.map((doctor) => ({
    slug : doctor.slug
  }));
}

export default async function DoctorPage({ params }) {
  const { slug } = await params;
  const db = new Database(path.join(process.cwd(), 'dev.db'));

  // Получаем врача
  const doctor = db.prepare(`
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
      ) AS price_from,
      '' AS description
    FROM doctors d
    WHERE d.slug = ?
  `).get(slug);

  if (!doctor) {
    db.close();
    return <div>Врач не найден</div>;
  }

  // Получаем прайс-услуги врача
  const prices = db.prepare(`
    SELECT 
      p.name,
      p.code,
      p.price
    FROM prices p
    LEFT JOIN specialty_prices sp ON p.id = sp.price_id
    LEFT JOIN specialties s ON sp.specialty_id = s.id
    LEFT JOIN doctor_specialties ds ON s.id = ds.specialty_id
    WHERE ds.doctor_id = ?
    GROUP BY p.id
    ORDER BY p.price ASC
  `).all(doctor.id);

  db.close(); 

  const breadcrumbs = [
    { label: 'Главная', href: '/' },
    { label: 'Врачи', href: '/doctors' },
    { label: doctor.name, href: null },
  ];

  return (
    <>
      <Breadcrumbs items={breadcrumbs}/>
      <DoctorProfile doctor={doctor} />
      <PriceList prices={prices} />
    </>
  );
}