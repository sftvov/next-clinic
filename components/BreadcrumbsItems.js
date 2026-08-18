import { Link } from 'next-view-transitions';

export default function BreadcrumbsItems({ items, className = '' }) {
  if (!items || items.length === 0) return null;

  return (
    <ul className={`p1 flex flex-wrap items-center gap-2  ${className}`}>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <li key={index} className="flex items-center gap-2">
            {isLast ? (
              <span className="text-gray-600 font-medium">{item.label}</span>
            ) : (
              <Link href={item.href} className="text-ruby hover:text-burgundy transition-colors">
                {item.label}
              </Link>
            )}
            {!isLast && <span className="text-gray-400">/</span>}
          </li>
        );
      })}
    </ul>
  );
}