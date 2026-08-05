import { Link } from 'next-view-transitions';

export default function Breadcrumbs({ items }) {
  return(
    <section className="max-w-7xl mx-auto p-4">      
      <Link href="/" className="inline-block mb-6 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200 ">← На главную</Link>
    </section>
  )
}