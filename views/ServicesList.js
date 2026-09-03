import { Link } from 'next-view-transitions';
import ServiceCard from '@/components/ServiceCard';

export default function ServicesList({ services }) {
  return (
    <section className="section">
      <div className='flex flex-col gap-8'>
        <div className='flex justify-center'>
          <h1 className="text-indigo t1" style={{ viewTransitionName: `services` }}>Наши услуги</h1>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-2 md:gap-4">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))} 
        </div>
      </div>
    </section>
    )
}