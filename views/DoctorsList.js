'use client';

import { useState, useEffect } from 'react';
import { getDoctors } from '@/app/doctors/actions/getDoctors';
import DoctorCard from '@/components/DoctorCard';
import LoadMoreButton from '@/components/LoadMoreButton';

export default function DoctorsList({ initialDoctors, total }) {
  const [doctors, setDoctors] = useState(initialDoctors);
  const [visible, setVisible] = useState(initialDoctors.length);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(12);

  const loadMore = async (step) => {
    setLoading(true);
    try {
      const newDoctors = await getDoctors(visible, step);
      setDoctors([...doctors, ...newDoctors]);
      setVisible(visible + newDoctors.length);
    } catch (error) {
      console.error('Ошибка загрузки:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {    
    if (typeof window === 'undefined') return;
    if (window.innerWidth >= 1280 && visible === initialDoctors.length) {
      loadMore(3);
    }
    const getStep = () => {
      const width = window.innerWidth;
      if (width >= 1280) return 15;
      return 12;
    };
    setStep(getStep());
  }, []);

  return (
    <section className="section">
      <div className="flex flex-col gap-8">
        <h1 className="text-indigo t1 text-center">Наши врачи</h1>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 md:gap-4">
          {doctors.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))}
        </div>

        {visible < total && <LoadMoreButton onLoadMore={loadMore} step={step} total={total} visible={visible} loading={loading} containerClass="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 md:gap-4" wrapperClass="col-span-2 sm:col-start-2 sm:col-span-1 lg:col-start-2 lg:col-span-2 xl:col-start-3 xl:col-span-1 px-2 md:px-4" />}
      </div>
    </section>
  );
}
