import { Link } from 'next-view-transitions';

export default function DoctorProfile({ doctor }) {
  return (
    <div className="section">
      <div className="flex flex-col lg:flex-row gap-6  lg:mr-40  items-center bg-white rounded-2xl">
        {/* Информация */}
        <div className="lg:ml-40 flex flex-col flex-1 gap-8 ml-auto">
          <div className="flex flex-col gap-2">
            <h1 
              className="text-indigo t1"
              style={{ viewTransitionName: `name-${doctor.id}` }}
            >
              {doctor.name}
            </h1>

            <p className="text-gray-600 p1" style={{ viewTransitionName: `speciality-${doctor.id}` }}>
              {doctor.specialties || 'Специальность не указана'}
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-gray-600 t3">
              <strong className="text-indigo">Стаж:</strong> с {doctor.career_start_year} года
            </p>
            {doctor.price_from && (
              <p className="text-gray-600 t3">
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
        <div className="lg:w-1/4 flex justify-center">
          <div className="w-full aspect-2/3 rounded-2xl overflow-hidden shadow-lg" style={{ viewTransitionName: `image-${doctor.id}` }}>
            <img 
              className="w-full h-full object-cover"
              src={`/img/doctors/${doctor.id}/profile@0.6x.webp`} 
              alt={doctor.name} 
              fetchPriority="high" 
              loading="eager" 
            />
          </div>
        </div>
      </div>
    </div>
  );
}
