import { Link } from 'next-view-transitions';

export default function ServiceCard({ service }) {
  return (
    <article 
      id={`service-${service.id}`}
      className="scroll-mt-4 duration-300 transition-shadow flex flex-col gap-4 bg-white rounded-xl p-4 shadow-md hover:shadow-lg"
    >
      {/* Картинка (квадратная, слева) */}
      <div 
        className="overflow-hidden flex items-center w-full"
      >
        <img
          className="w-full aspect-3/2 object-cover rounded-lg"
          style={{ viewTransitionName: `image-${service.id}` }}
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