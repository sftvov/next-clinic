import { Link } from 'next-view-transitions';

export default function DoctorCard({ doctor }) {
  return (
    <div 
      id={`doctor-${doctor.id}`}
      className="flex flex-col bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow duration-200 scroll-mt-4"
    >
      {/* Картинка */}
      <div 
        className="w-full aspect-2/3 rounded-lg overflow-hidden mb-3"
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

      {/* Имя */}
      <h2 
        className="text-xs md:text-lg font-semibold mb-1"
        style={{ viewTransitionName: `name-${doctor.id}` }}
      >
        {doctor.name}
      </h2>

      {/* Специальность */}
      <p 
        className="text-gray-600 text-sm"
        style={{ viewTransitionName: `speciality-${doctor.id}` }}
      >
        {doctor.specialties || 'Специальность не указана'}
      </p>

      {/* Цена "от" */}
      {doctor.price_from && (
        <p className="text-sm font-semibold text-green-600 mt-1">
          от {doctor.price_from.toLocaleString()} ₽
        </p>
      )}

      {/* Ссылка "Подробнее" */}
      <Link 
        href={`/doctors/${doctor.slug}`} 
        className="inline-block mt-auto text-blue-600 hover:underline font-medium"
      >
        Подробнее →
      </Link>
    </div>
  );
}