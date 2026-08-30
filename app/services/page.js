import Database from 'better-sqlite3';
import path from 'path';
import Breadcrumbs from '@/layouts/Breadcrumbs';
import ServicesList from '@/views/ServicesList';

export default async function ServicesPage() {
  const db = new Database(path.join(process.cwd(), 'dev.db'));

  const services = db.prepare('SELECT * FROM services').all();

  db.close();

  const breadcrumbs = [
    { label: 'Главная', href: '/' },
    { label: 'Услуги', href: null },
  ];

  return (
    <>
      <Breadcrumbs items={breadcrumbs}/>      
      <div className='wrapper'>
        <ServicesList services={services} />
      </div>
    </>
  );
}