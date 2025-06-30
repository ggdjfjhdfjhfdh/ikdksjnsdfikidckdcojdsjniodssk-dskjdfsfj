'use client';

import { useState, useEffect, useRef } from 'react';
import ArticleCard from './ArticleCard';

type Article = {
  title: string;
  description: string;
  href: string;
};

interface SearchBarProps {
  allArticles: Article[];
}

export default function SearchBar({ allArticles }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);

  // Cerrar resultados al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setSearchTerm('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredArticles([]);
      return;
    }

    const searchInWiki = async () => {
      try {
        const response = await fetch(`/api/wiki/search?q=${encodeURIComponent(searchTerm)}`);
        const results = await response.json();
        setFilteredArticles(results);
      } catch (error) {
        console.error('Error searching wiki:', error);
        // Fallback to local search if API fails
        const localResults = allArticles.filter((article: Article) => 
          article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          article.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredArticles(localResults);
      }
    };
    
    searchInWiki();
  }, [searchTerm, allArticles]);

  return (
    <div className="relative mb-8" ref={searchRef}>
      <input
        type="text"
        placeholder="Buscar artículos..."
        className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      
      {searchTerm && (
        <div className="absolute z-10 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-96 overflow-y-auto">
          {filteredArticles.length > 0 ? (
            filteredArticles.map((article: Article) => (
              <ArticleCard 
                key={article.href} 
                title={article.title}
                description={article.description}
                href={article.href}
                className="border-none shadow-none rounded-none hover:bg-gray-50"
              />
            ))
          ) : (
            <div className="p-4 text-gray-500">No se encontraron resultados para "{searchTerm}"</div>
          )}
        </div>
      )}
      
      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
    </div>
  );
}
