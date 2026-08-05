import DoctorCard from '@/components/DoctorCard';
import { Link } from 'next-view-transitions';

export default function DoctorsList({ doctors }) {
  return (
    <section className="max-w-7xl mx-auto px-4 py-12">      
      <Link href="/" className="inline-block mb-6 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200 ">← На главную</Link>
      <div className='flex justify-center'>
        <h1 
          className="text-3xl font-bold text-center mb-8"
          style={{ viewTransitionName: `doctors` }}
        >
            Наши врачи
        </h1>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {doctors.map((doctor) => (
          <DoctorCard key={doctor.id} doctor={doctor} />
        ))}
      </div>
    </section>
  );
}