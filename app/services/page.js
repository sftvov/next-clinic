import Database from 'better-sqlite3';
import path from 'path';
import ServicesList from '@/views/ServicesList';

export default async function ServicesPage() {
  const db = new Database(path.join(process.cwd(), 'dev.db'));
  const services = db.prepare('SELECT * FROM services').all();
  db.close();
  return <ServicesList services={services} />;
}