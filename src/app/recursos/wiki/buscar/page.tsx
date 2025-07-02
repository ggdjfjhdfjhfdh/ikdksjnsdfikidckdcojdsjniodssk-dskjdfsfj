'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import ArticleCard from '@/components/wiki/ArticleCard';
import BackButton from '@/components/BackButton';
import DOMPurify from 'dompurify';

function SearchContent() {
  const searchParams = useSearchParams();
  const rawQuery = searchParams.get('q') || '';
  // Sanitizar y validar la consulta
  const query = DOMPurify.sanitize(rawQuery.substring(0, 100)).trim();
  const [results, setResults] = useState<Array<{title: string, description: string, href: string}>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
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
    <>
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
        <p className="text-center py-12 text-gray-500">
          No se encontraron resultados para "{query.replace(/</g, '&lt;').replace(/>/g, '&gt;')}"
        </p>
      )}
    </>
  );
}

export default function SearchPage() {
  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <BackButton href="/recursos/wiki" className="mb-6" />
        <Suspense fallback={<div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>}>
          <SearchContent />
        </Suspense>
      </div>
    </div>
  );
}
