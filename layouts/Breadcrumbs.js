import BreadcrumbsItems from '@/components/BreadcrumbsItems';

export default function Breadcrumbs({ items, className = '' }) {
  if (!items || items.length === 0) return null;

  return (
    <nav className={`section py-4 ${className}`} aria-label="Хлебные крошки">
      <BreadcrumbsItems items={items} />
    </nav>
  );
}