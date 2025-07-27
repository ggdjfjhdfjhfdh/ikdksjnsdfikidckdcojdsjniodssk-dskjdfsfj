"use client";

import Link from 'next/link';
import { useI18n } from '@/lib/LanguageContext';
import { Shield, HardDrive, HelpCircle } from 'lucide-react';

export default function RecursosHome() {
  const { t } = useI18n();
  
  const categories = [
    {
      key: 'guias',
      href: '/recursos/guias',
      icon: Shield,
      gradient: 'from-blue-500 to-cyan-500',
      bgGradient: 'from-blue-50 to-cyan-50',
      hoverGradient: 'from-blue-100 to-cyan-100',
      title: t('resourcesCategoriesGuiasTitle'),
      description: t('resourcesCategoriesGuiasDescription'),
    },
    {
      key: 'wiki',
      href: '/recursos/wiki',
      icon: HelpCircle,
      gradient: 'from-purple-500 to-pink-500',
      bgGradient: 'from-purple-50 to-pink-50',
      hoverGradient: 'from-purple-100 to-pink-100',
      title: t('resourcesCategoriesWikiTitle'),
      description: t('resourcesCategoriesWikiDescription'),
    },
    {
      key: 'herramientas',
      href: '/recursos/herramientas',
      icon: HardDrive,
      gradient: 'from-emerald-500 to-teal-500',
      bgGradient: 'from-emerald-50 to-teal-50',
      hoverGradient: 'from-emerald-100 to-teal-100',
      title: t('resourcesCategoriesHerramientasTitle'),
      description: t('resourcesCategoriesHerramientasDescription'),
    },
  ] as const;

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
        <div className="relative px-4 py-24 sm:py-32">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-8">
              <span className="inline-flex items-center rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-800 ring-1 ring-inset ring-blue-600/20">
                🔒 Centro de Recursos
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent mb-6">
              {t('resourcesTitle')}
            </h1>
            <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              {t('resourcesSubtitle')}
            </p>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="px-4 pb-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {categories.map((cat) => {
              const IconComponent = cat.icon;
              return (
                <Link
                  key={cat.key}
                  href={cat.href}
                  className="group relative overflow-hidden rounded-3xl transition-all duration-300 hover:scale-105 hover:-translate-y-2"
                >
                  {/* Background with gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${cat.bgGradient} group-hover:bg-gradient-to-br group-hover:${cat.hoverGradient} transition-all duration-300`}></div>
                  
                  {/* Border gradient */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-white/20 to-white/5 p-[1px]">
                    <div className="h-full w-full rounded-3xl bg-white/80 backdrop-blur-sm"></div>
                  </div>
                  
                  {/* Content */}
                  <div className="relative p-8 lg:p-10 text-center">
                    {/* Icon with gradient background */}
                    <div className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-r ${cat.gradient} mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      <IconComponent className="w-10 h-10 text-white" strokeWidth={1.5} />
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-gray-700 transition-colors">
                      {cat.title}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-gray-600 text-base leading-relaxed mb-6">
                      {cat.description}
                    </p>
                    
                    {/* CTA Button */}
                    <div className={`inline-flex items-center px-6 py-3 rounded-xl bg-gradient-to-r ${cat.gradient} text-white font-medium text-sm group-hover:shadow-lg transition-all duration-300`}>
                      Explorar
                      <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                  
                  {/* Hover effect overlay */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-white/0 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom CTA Section */}
      <div className="px-4 pb-16">
        <div className="mx-auto max-w-4xl">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 to-purple-600 p-8 lg:p-12 text-center">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative">
              <h2 className="text-3xl font-bold text-white mb-4">
                ¿No encuentras lo que buscas?
              </h2>
              <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
                Nuestro equipo está aquí para ayudarte con recursos personalizados y consultoría especializada.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl hover:bg-blue-50 transition-colors duration-300 shadow-lg hover:shadow-xl"
              >
                Contactar Expertos
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
