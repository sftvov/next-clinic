import { Link } from 'next-view-transitions';

export default function ServiceProfile({ service }) {
  return (
    <div className="section">
      <div className='flex items-center gap-8'>
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
            className="text-3xl font-bold"
            style={{ viewTransitionName: `name-${service.id}` }}
          >
            {service.name}
          </h1>
          <p
            className=''
          >
            {service.description}
          </p>
        </div>
      </div>      
    </div>
  )
}