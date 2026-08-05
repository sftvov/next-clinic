import { Link } from 'next-view-transitions';

export default function DoctorProfile({ doctor }) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Link
        href={`/doctors#doctor-${doctor.id}`}
        className="inline-block mb-6 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200"
      >
        ← Все врачи
      </Link>
      <div className="flex flex-col lg:flex-row gap-6 items-center">
        {/* Информация */}
        <div className="lg:w-3/4 flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h1
              className="text-3xl font-bold"
              style={{ viewTransitionName: `name-${doctor.id}` }}
            >
              {doctor.name}
            </h1>

            <p
              className="text-xl text-gray-600"
              style={{ viewTransitionName: `speciality-${doctor.id}` }}
            >
              {doctor.specialties || 'Специальность не указана'}
            </p>
          </div>

          <div className="bg-gray-50 rounded-xl p-6">
            <p className="text-lg">
              <strong>Стаж:</strong> с {doctor.career_start_year} года
            </p>
            {doctor.price_from && (
              <p className="text-lg mt-2">
                <strong>Цена от:</strong> {doctor.price_from.toLocaleString()} ₽
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
          <div
            className="w-full aspect-2/3 rounded-2xl overflow-hidden shadow-lg"
            style={{ viewTransitionName: `image-${doctor.id}` }}
          >
            <img
              src={`/img/doctors/${doctor.id}/profile@0.6x.webp`}
              alt={doctor.name}
              className="w-full h-full object-cover"
              fetchPriority="high"
              loading="eager"
            />
          </div>
        </div>
      </div>
    </div>
  );
}