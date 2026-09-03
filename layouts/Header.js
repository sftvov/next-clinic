import { Link } from 'next-view-transitions';
import Search from '@/components/Search';

export default function Header() {
  return (
    <header className="py-4 bg-white sticky top-0 z-2">
      <div className="section flex justify-between items-center gap-4">
        {/* Логотип */}
        <Link href="/" className=" duration-300 text-indigo t2 hover:text-ruby">
          Клиника
        </Link>

        {/* Навигация */}
        <nav className="flex items-center gap-4 md:gap-6">
          <Link href="/doctors" className="duration-300 text-gray-600 hover:text-ruby p2">
            Врачи
          </Link>
          <Link href="/services" className="duration-300 text-gray-600 hover:text-ruby p2">
            Услуги
          </Link>
        </nav>

        {/* Поиск (клиентский компонент) */}
        <Search />
      </div>
    </header>
  );
}