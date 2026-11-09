import Database from 'better-sqlite3';
import path from 'path';
import Breadcrumbs from '@/layouts/Breadcrumbs';
import ServicesList from '@/views/ServicesList';

export default async function ServicesPage() {
  const db = new Database(path.join(process.cwd(), 'dev.db'));

  const initialServices = db.prepare('SELECT * FROM services LIMIT 12').all();
  const { total } = db.prepare('SELECT COUNT(*) as total FROM services').get();

  db.close();

  const breadcrumbs = [
    { label: 'Главная', href: '/' },
    { label: 'Услуги', href: null },
  ];

  return (
    <>
      <Breadcrumbs items={breadcrumbs}/>      
      <div className='wrapper'>
        <ServicesList initialServices={initialServices} total={total} />
      </div>
    </>
  );
}