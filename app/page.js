import { redirect } from 'next/navigation';
import { Link } from 'next-view-transitions';

export default function Home() {
  return(
    <section className="max-w-7xl mx-auto px-4 py-12">
      <ul className='flex flex-col items-start'>
        <li>
          <Link 
            href={`/doctors/`} 
            className="inline-block mt-auto text-blue-600 hover:underline font-medium"
            style={{ viewTransitionName: `doctors` }}            
          >
            Наши врачи
          </Link>
        </li>
        <li>
          <Link 
            href={`/services/`} 
            className="inline-block mt-auto text-blue-600 hover:underline font-medium"
            style={{ viewTransitionName: `services` }}
          >
            Наши услуги
          </Link>
        </li>
      </ul>
    </section>
  )
}