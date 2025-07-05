"use client";

import Link from 'next/link';
import { useI18n } from '@/lib/i18n';

export default function RecursosHome() {
  const { t } = useI18n();
  
  const categories = [
    {
      key: 'guias',
      href: '/recursos/guias',
      icon: '📘',
      title: t('resourcesCategoriesGuiasTitle'),
      description: t('resourcesCategoriesGuiasDescription'),
    },
    {
      key: 'wiki',
      href: '/recursos/wiki',
      icon: '📚',
      title: t('resourcesCategoriesWikiTitle'),
      description: t('resourcesCategoriesWikiDescription'),
    },
    {
      key: 'herramientas',
      href: '/recursos/herramientas',
      icon: '🛠️',
      title: t('resourcesCategoriesHerramientasTitle'),
      description: t('resourcesCategoriesHerramientasDescription'),
    },
  ] as const;

  return (
    <main className="flex min-h-screen flex-col items-center justify-start px-4 py-20 bg-white">
      <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 text-center">
        {t('resourcesTitle')}
      </h1>
      <p className="text-lg text-gray-600 mb-16 text-center max-w-2xl">
        {t('resourcesSubtitle')}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
        {categories.map((cat) => (
          <Link
            key={cat.key}
            href={cat.href}
            className="group flex flex-col items-center border border-gray-200 rounded-2xl p-12 bg-gray-50 shadow-sm hover:shadow-lg hover:bg-blue-50 transition"
          >
            <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">{cat.icon}</div>
            <div className="text-2xl font-bold mb-2 text-gray-900">{cat.title}</div>
            <p className="text-gray-500 text-center text-base max-w-xs">{cat.description}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
