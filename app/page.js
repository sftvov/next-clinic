import Breadcrumbs from '@/layouts/Breadcrumbs';
import { Link } from 'next-view-transitions';

const breadcrumbs = [
  { label: 'Главная', href: null },
];

export default function Home() {
  return(
    <>
      <Breadcrumbs items={breadcrumbs}/>    
      <div className="wrapper">
        <div className="section">
          <ul className='flex flex-col items-start'>
            <li>
              <Link 
                href={`/doctors/`} 
                className="link p1"
                style={{ viewTransitionName: `doctors` }}            
              >
                Наши врачи
              </Link>
            </li>
            <li>
              <Link 
                href={`/services/`} 
                className="link p1"
                style={{ viewTransitionName: `services` }}
              >
                Наши услуги
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}