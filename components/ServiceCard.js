import { Link } from 'next-view-transitions';

export default function ServiceCard({ service }) {
  return (
    <article 
      id={`service-${service.id}`}
      className="flex gap-4 bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow duration-200 scroll-mt-4"
    >
      {/* Картинка (квадратная, слева) */}
      <div 
        className="w-1/3 aspect-square rounded-lg overflow-hidden flex-shrink-0"
        style={{ viewTransitionName: `image-${service.id}` }}
      >
        <img
          className="w-full h-full object-cover"
          src={`/img/services/${service.id}/service.png`}
          alt={service.name}
          fetchPriority="high"
          loading="eager"
        />
      </div>

      {/* Контент */}
      <div className="flex flex-col flex-1">
        <h3 
          className="text-indigo t3"
          style={{ viewTransitionName: `name-${service.id}` }}
        >
          <Link href={`/services/${service.slug}`} className="hover:text-ruby transition-colors">
            {service.name}
          </Link>
        </h3>

        <div className="mt-auto">
          {service.price_from && (
            <p className="text-burgundy t3">
              от {service.price_from.toLocaleString()} ₽
            </p>
          )}

          <Link 
            href={`/services/${service.slug}`} 
            className="btn-solid btn block mt-2"
          >
            Подробнее
          </Link>
        </div>
      </div>
    </article>
  );
}