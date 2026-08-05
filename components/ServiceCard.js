import { Link } from 'next-view-transitions';



export default function ServiceCard({ service }) {
  return (
    <div className='flex gap-4 items-center' id={`service-${service.id}`}>         
      <img
        src={`/img/services/${service.id}/service.png`}
        alt={service.name}
        className="w-1/3" 
        fetchPriority="high"
        loading="eager"
      />
      <p style={{ viewTransitionName: `name-${service.id}` }}>
        <Link 
          href={`/services/${service.slug}`} 
          className="inline-block mt-auto text-blue-600 hover:underline font-medium"
        >
          {service.name}
        </Link>
      </p> 
    </div>
  );
}