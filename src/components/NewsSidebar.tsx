import React from 'react';
import { useI18n } from '@/lib/i18n';

interface NewsSidebarProps {
  news: { category?: string }[];
  selectedCategory: string;
  onCategorySelect: (category: string) => void;
  dateFrom: string;
  dateTo: string;
  setDateFrom: (date: string) => void;
  setDateTo: (date: string) => void;
}

const categoryDisplay: Record<string, { label: string }> = {
  'malware': { label: 'Malware' },
  'vulnerabilidades': { label: 'Vulnerabilidades' },
  'ataques': { label: 'Ataques' },
  'brechas de datos': { label: 'Brechas de datos' },
  'regulación': { label: 'Regulación' },
  'infraestructura crítica': { label: 'Infraestructura crítica' },
  'empresas': { label: 'Empresas' },
  'tecnología': { label: 'Tecnología' },
  'educación': { label: 'Educación' },
  'otros': { label: 'Otros' },
};

const NewsSidebar: React.FC<NewsSidebarProps> = ({
  news,
  selectedCategory,
  onCategorySelect,
  dateFrom,
  dateTo,
  setDateFrom,
  setDateTo
}) => {
  const t = useI18n();
  const uniqueCategories = Array.from(new Set(news.map(n => (n.category || 'otros').toLowerCase())));
  uniqueCategories.sort((a, b) => (a === 'otros' ? 1 : b === 'otros' ? -1 : a.localeCompare(b, 'es')));

  return (
    <aside className="md:w-64 md:shrink-0 mb-6 md:mb-0 p-2 sm:p-0 w-full">
      <div className="md:sticky md:top-8 flex flex-col gap-4">
        {/* Filtro de fecha */}
        <div className="flex flex-col gap-3 bg-white border border-gray-200 rounded-lg sm:rounded-xl shadow px-3 sm:px-4 py-4 sm:py-5">
          <span className="text-base font-semibold text-gray-700 mb-2">{t('filterByDate')}</span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="flex flex-col gap-1">
              <span className="text-sm text-gray-600">{t('from')}:</span>
              <input
                type="date"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
                value={dateFrom}
                onChange={e => setDateFrom(e.target.value)}
                max={dateTo || undefined}
              />
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-sm text-gray-600">{t('to')}:</span>
              <input
                type="date"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
                value={dateTo}
                onChange={e => setDateTo(e.target.value)}
                min={dateFrom || undefined}
              />
            </div>
          </div>
        </div>
        <hr className="my-3 border-gray-200" />
        <nav
          className="flex flex-col gap-2 bg-white border border-gray-200 rounded-xl shadow px-4 py-5"
          aria-label={t('filterByCategory')}
        >
          <span className="block text-xs font-bold text-gray-500 tracking-widest uppercase mb-2">{t('filterByCategory')}</span>
          <button
            type="button"
            className={`px-4 py-2 rounded-full text-sm font-semibold border transition-all duration-200 whitespace-nowrap shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 ${selectedCategory === '' ? 'bg-blue-600 text-white border-blue-600 scale-105' : 'bg-white border-gray-200 text-gray-700 hover:bg-blue-50 hover:border-blue-300'}`}
            onClick={() => onCategorySelect('')}
            aria-pressed={selectedCategory === ''}
            aria-current={selectedCategory === '' ? 'true' : undefined}
          >
            {t('all')}
          </button>
          {uniqueCategories.map(cat => {
            const disp = categoryDisplay[cat] || { label: cat, icon: '📰' };
            const selected = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                className={`px-4 py-2 rounded-full text-sm font-semibold border transition-all duration-200 whitespace-nowrap shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 ${selected ? 'bg-blue-600 text-white border-blue-600 scale-105' : 'bg-white border-gray-200 text-gray-700 hover:bg-blue-50 hover:border-blue-300'}`}
                onClick={() => onCategorySelect(cat)}
                aria-pressed={selected}
                aria-current={selected ? 'true' : undefined}
              >
                {disp.label}
              </button>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};

export default React.memo(NewsSidebar);
