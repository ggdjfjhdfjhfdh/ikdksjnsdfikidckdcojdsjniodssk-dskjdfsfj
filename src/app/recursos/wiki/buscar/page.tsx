'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import ArticleCard from '@/components/wiki/ArticleCard';
import BackButton from '@/components/BackButton';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Esta sería una función simulada - deberías implementar la búsqueda real
    const fetchResults = async () => {
      setLoading(true);
      // Aquí iría la llamada a tu API de búsqueda
      // Por ahora simulamos resultados vacíos
      setTimeout(() => {
        setResults([]);
        setLoading(false);
      }, 500);
    };

    if (query) {
      fetchResults();
    } else {
      setResults([]);
      setLoading(false);
    }
  }, [query]);

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <BackButton href="/recursos/wiki" className="mb-6" />
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Resultados de búsqueda: <span className="text-blue-600">{query}</span>
        </h1>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : results.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map((article) => (
              <ArticleCard key={article.title} {...article} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No se encontraron resultados para "{query}"
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
