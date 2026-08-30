import { Link } from 'next-view-transitions';

export default function DoctorProfile({ doctor }) {
  return (
    <div className="flex sm:static section">
      <div className="relative inline-flex sm:flex flex-col sm:flex-row items-center gap-4 sm:gap-8 sm:w-full mx-auto sm:mr-10 sm:ml-0 lg:mr-20 xl:mr-40 sm:bg-white sm:rounded-2xl">
        {/* Информация */}
        <div className="z-1 absolute sm:static bottom-0 flex flex-col flex-1 gap-4 w-full sm:w-auto sm:ml-10 lg:ml-20 xl:ml-40 p-4 sm:p-0 bg-white/80 sm:bg-none rounded-2xl">
          <div className="flex flex-col gap-2">
            <h1 
              className="text-indigo t2"
              style={{ viewTransitionName: `name-${doctor.id}` }}
            >
              {doctor.name}
            </h1>

            <p className="text-gray-600 p1" style={{ viewTransitionName: `speciality-${doctor.id}` }}>
              {doctor.specialties || 'Специальность не указана'}
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-gray-600 p1">
              <strong className="text-indigo">Стаж:</strong> с {doctor.career_start_year} года
            </p>
            {doctor.price_from && (
              <p className="text-gray-600 p1">
                <strong className="text-indigo">Цена:</strong> от {doctor.price_from.toLocaleString()} ₽
              </p>
            )}
          </div>

          {doctor.description && (
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-3">О враче</h3>
              <p className="text-gray-700 leading-relaxed">{doctor.description}</p>
            </div>
          )}
        </div>
        {/* Фото */}
        <div className="overflow-hidden sm:w-1/4 sm:aspect-2/3 rounded-2xl shadow-lg" style={{ viewTransitionName: `image-${doctor.id}` }}>
          <img 
            className="w-full max-w-sm sm:max-w-none h-full object-cover"
            src={`/img/doctors/${doctor.id}/profile@0.6x.webp`} 
            alt={doctor.name} 
            width="614"
            height="922"
            fetchPriority="high" 
            loading="eager" 
          />
        </div>
      </div>
    </div>
  );
}
