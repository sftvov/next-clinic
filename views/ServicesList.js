import { Link } from 'next-view-transitions';
import ServiceCard from '@/components/ServiceCard';

export default function ServicesList({ services }) {
  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <Link href="/" className="inline-block mb-6 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200">← На главную</Link>
      <div className='flex justify-center'>
        <h1 className="text-3xl font-bold text-center mb-8" style={{ viewTransitionName: `services` }}>Наши услуги</h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))} 
      </div>
    </section>
    )
}