import { Link } from 'next-view-transitions';

export default function ServiceProfile({ service }) {
  return (
    <div className="section">
      <div className='flex flex-col lg:flex-row items-center gap-4 md:gap-8'>
        <div className="lg:w-3/5 flex justify-center">
          <div
            className="w-full aspect-3/2 rounded-2xl overflow-hidden shadow-lg"
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
        </div>
        <div className='lg:w-2/5 flex flex-col gap-2' >
          <h1
            className="text-indigo t2"
            style={{ viewTransitionName: `name-${service.id}` }}
          >
            {service.name}
          </h1>
          <p
            className='p1'          >
            {service.description}
          </p>
        </div>
      </div>      
    </div>
  )
}