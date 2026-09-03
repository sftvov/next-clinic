import { Link } from 'next-view-transitions';

export default function DoctorCard({ doctor }) {
  return (
    <article 
      id={`doctor-${doctor.id}`}
      className="duration-200 flex flex-col gap-2 xs:gap-4 bg-white rounded-xl p-2 md:p-4 shadow-md hover:shadow-lg scroll-mt-4"
    >
      
      <div 
        className="w-full aspect-2/3 rounded-lg overflow-hidden"
        style={{ viewTransitionName: `image-${doctor.id}` }}
      >
        <img 
          src={`/img/doctors/${doctor.id}/profile@0.4x.webp`}
          alt={doctor.name} 
          className="w-full h-full object-cover"
          fetchPriority="high"
          loading="eager"
        />
      </div>

      <div className='flex flex-col flex-1'>
        <h2 
          className="text-indigo t3"
          style={{ viewTransitionName: `name-${doctor.id}` }}
        >
          {doctor.name}
        </h2>

        <div className='mt-auto'>
          <p 
            className="text-gray-600 p2"
            style={{ viewTransitionName: `speciality-${doctor.id}` }}
          >
            {doctor.specialties || 'Специальность не указана'}
          </p>

          {doctor.price_from && (
            <p className="text-burgundy t3">
              от {doctor.price_from.toLocaleString()} ₽
            </p>
          )}

          <Link 
            href={`/doctors/${doctor.slug}`} 
            className="btn-solid btn block mt-2"
          >
            Подробнее
          </Link>
        </div>
      </div>
    </article>
  );
}