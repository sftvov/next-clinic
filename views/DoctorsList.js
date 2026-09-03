import DoctorCard from '@/components/DoctorCard';
import { Link } from 'next-view-transitions';

export default function DoctorsList({ doctors }) {
  return (
    <section className="section">
      <div className='flex flex-col gap-8'>
        <div className='flex justify-center'>
          <h1 
            className="text-indigo t1"
            style={{ viewTransitionName: `doctors` }}
          >
              Наши врачи
          </h1>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 md:gap-4">
          {doctors.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))}
        </div>
      </div>
    </section>
  );
}