import Database from 'better-sqlite3';
import path from 'path';
import { Link } from 'next-view-transitions';
import ServiceProfile from '@/views/ServiceProfile';
import PriceList from '@/views/PriceList';

export async function generateStaticParams() {
  const db = new Database(path.join(process.cwd(), 'dev.db'));  
  const services = db.prepare('SELECT slug FROM services').all();  
  db.close();  
  return services.map((service) => ({
    slug : service.slug
  }));
}

export default async function ServicePage({ params }) {
  const { slug } = await params;
  const db = new Database(path.join(process.cwd(), 'dev.db'));
  
  const service = db.prepare(`SELECT * FROM services WHERE slug = ?`).get(slug);

  if (!service) {
    db.close();
    return <div>Услуга не найдена</div>;
  }

  const prices = db.prepare(`
    SELECT 
      p.name,
      p.code,
      p.price
    FROM prices p
    LEFT JOIN service_prices sp ON p.id = sp.price_id
    WHERE sp.service_id = ?
    GROUP BY p.id
    ORDER BY p.price ASC
  `).all(service.id);

  return (    
    <>
      <ServiceProfile service={service} />
      <PriceList prices={prices} />
    </>
  )
}