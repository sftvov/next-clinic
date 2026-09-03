'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Search() {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="hidden md:flex items-center gap-2">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Поиск..."
        className="cursor:pointer p2 px-4 py-2 rounded-lg border border-gray-200 focus:border-ruby focus:outline-none"
      />
      <button
        type="submit"
        className="btn-solid btn"
      >
        Найти
      </button>
    </form>
  );
}