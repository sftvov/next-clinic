'use client';
import { useState, useEffect } from 'react';
import { getServices } from '@/app/services/actions/getServices';
import LoadMoreButton from '@/components/LoadMoreButton';
import ServiceCard from '@/components/ServiceCard';

export default function ServicesList({ initialServices, total }) {
  const [services, setServices] = useState(initialServices);
  const [visible, setVisible] = useState(initialServices.length);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(12);
  const loadMore = async (step) => {
    setLoading(true);
    try {
      const newServices = await getServices(visible, step);
      setServices([...services, ...newServices]);
      setVisible(visible + newServices.length);
    } catch (error) {
      console.error('Ошибка загрузки:', error);
    } finally {
      setLoading(false);
    }
  };
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
        {visible < total && <LoadMoreButton onLoadMore={loadMore} step={step} total={total} visible={visible} loading={loading} containerClass="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-2 md:gap-4" wrapperClass="sm:translate-x-[calc(50%+var(--spacing))] md:translate-x-[calc(50%+var(--spacing)*2)] xl:translate-x-0 xl:col-start-2 xl:col-span-1 px-4" />}
      </div>
    </section>
    )
}