"use client";
import * as React from 'react';
import Link from 'next/link';
import { 
  ShieldCheckIcon,
  EyeIcon,
  BoltIcon,
  Bars3Icon,
  ArrowTrendingUpIcon,
  ChartBarSquareIcon
} from '@heroicons/react/24/outline';
import {
  ShieldCheckIcon as SolidShieldCheckIcon
} from '@heroicons/react/24/solid';
import { useI18n } from '@/lib/LanguageContext';

export default function HomePage(): React.ReactElement {
  const { t } = useI18n();

  const solutionsCards = [
    {
      title: t('solution1Title'),
      description: t('solution1Description'),
      icon: <ShieldCheckIcon className="h-8 w-8 text-white" />,
      gradient: 'from-blue-500 to-cyan-400',
      border: 'group-hover:border-cyan-500/30'
    },
    {
      title: t('solution2Title'),
      description: t('solution2Description'),
      icon: <EyeIcon className="h-8 w-8 text-white" />,
      gradient: 'from-blue-500 to-cyan-400',
      border: 'group-hover:border-blue-500/30'
    },
    {
      title: t('solution3Title'),
      description: t('solution3Description'),
      icon: <BoltIcon className="h-8 w-8 text-white" />,
      gradient: 'from-cyan-500 to-blue-400',
      border: 'group-hover:border-cyan-500/30'
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Hero Section */}
      <main className="relative min-h-screen overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/videos/cyber-bg.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/60 to-transparent z-10"></div>
        </div>
        <section className="relative z-20 w-full max-w-4xl mx-auto flex flex-col items-center md:items-start text-center md:text-left px-4 pt-24 pb-20">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 leading-tight">
            {t('heroTitle1')} <span className="text-cyan-500">{t('heroTitle2')}</span>
          </h1>
          <p className="text-lg md:text-2xl text-gray-700 mb-8 max-w-2xl">
            {t('heroDescription')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto justify-center md:justify-start mb-8">
            <Link href="/contact" className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all text-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 flex items-center justify-center">
              {t('askUs')}
            </Link>
            <Link href="/about" className="bg-white hover:bg-gray-100 text-gray-800 font-bold py-3 px-8 rounded-full shadow-lg transition-all text-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 flex items-center justify-center">
              {t('learnMore')}
            </Link>
          </div>
        </section>
      </main>



      {/* Why Sesecpro Section */}
      <section className="w-screen relative left-1/2 right-1/2 bg-white flex flex-col justify-center items-center px-4 py-24 sm:py-32" style={{transform: 'translateX(-50%)'}}>
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-base font-semibold leading-7 text-cyan-600">Diferenciación</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {t('whySesecproTitle')}
            </p>
          </div>
          <div className="mt-20 grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
            <div className="flex flex-col items-start p-6 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-cyan-500 text-white">
                <ArrowTrendingUpIcon className="h-6 w-6" aria-hidden="true" />
              </div>
              <h3 className="mt-6 text-xl font-semibold leading-7 text-gray-900">{t('whySesecproPoint1Title')}</h3>
              <p className="mt-4 text-base leading-7 text-gray-600">{t('whySesecproPoint1Desc')}</p>
            </div>
            <div className="flex flex-col items-start p-6 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-cyan-500 text-white">
                <ChartBarSquareIcon className="h-6 w-6" aria-hidden="true" />
              </div>
              <h3 className="mt-6 text-xl font-semibold leading-7 text-gray-900">{t('whySesecproPoint2Title')}</h3>
              <p className="mt-4 text-base leading-7 text-gray-600">{t('whySesecproPoint2Desc')}</p>
            </div>
            <div className="flex flex-col items-start p-6 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-cyan-500 text-white">
                <SolidShieldCheckIcon className="h-6 w-6" aria-hidden="true" />
              </div>
              <h3 className="mt-6 text-xl font-semibold leading-7 text-gray-900">{t('whySesecproPoint3Title')}</h3>
              <p className="mt-4 text-base leading-7 text-gray-600">{t('whySesecproPoint3Desc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Soluciones Section */}
      <section className="relative w-screen left-1/2 right-1/2 py-24 md:py-32 overflow-hidden" style={{transform: 'translateX(-50%)'}}>
        <img 
          src="/hero-cybersecurity.png"
          alt="Cybersecurity background for solutions section"
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
        <div className="absolute inset-0 bg-black/70 z-10"></div>
        <div className="relative z-20 w-full max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4 drop-shadow-xl">
              {t('solutionsTitle')}
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              {t('solutionsDescription')}
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {solutionsCards.map((card, index) => (
              <div key={index} className={`group relative bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 transition-all duration-300 hover:bg-white/20 hover:scale-105 ${card.border}`}>
                <div className={`absolute -top-5 -left-5 w-16 h-16 rounded-xl flex items-center justify-center bg-gradient-to-br ${card.gradient} shadow-lg`}>
                  {card.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mt-8 mb-4">{card.title}</h3>
                <p className="text-gray-300">{card.description}</p>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-12">
            <Link
              href="/solutions"
              className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all text-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 flex items-center justify-center"
            >
              {t('exploreSolutions')}
            </Link>
          </div>
        </div>
      </section>

      {/* Calculadora de Riesgo Section */}
      <section className="w-screen relative left-1/2 right-1/2 bg-gradient-to-br from-blue-50 to-cyan-50 flex flex-col justify-center items-center px-4 py-20 text-center overflow-hidden" style={{transform: 'translateX(-50%)'}}>
        <div className="w-full max-w-4xl mx-auto flex flex-col items-center justify-center">
          <div className="flex items-center justify-center mb-6">
            <ShieldCheckIcon className="h-16 w-16 text-blue-600 mr-4" />
            <div className="text-left">
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2">
                Evalúe su Nivel de Ciberseguridad
              </h2>
              <p className="text-lg text-blue-600 font-semibold">
                Calculadora Gratuita de Riesgo
              </p>
            </div>
          </div>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-8">
            Descubra qué tan protegida está su empresa contra ciberataques. Nuestra calculadora gratuita evalúa 18 aspectos críticos de seguridad y le proporciona recomendaciones personalizadas.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <Link 
               href="/recursos/herramientas/calculadora-riesgo" 
               className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-full shadow-lg transition-all text-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 flex items-center justify-center"
             >
              <ShieldCheckIcon className="h-5 w-5 mr-2" />
              Evaluar Ahora Gratis
            </Link>
            <div className="text-sm text-gray-600 flex items-center justify-center">
              ✓ Sin registro requerido • ✓ Resultados inmediatos • ✓ 100% confidencial
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-3xl">
            <div className="bg-white p-4 rounded-lg shadow-md">
              <div className="text-2xl font-bold text-blue-600 mb-1">18</div>
              <div className="text-sm text-gray-600">Aspectos Evaluados</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <div className="text-2xl font-bold text-green-600 mb-1">5 min</div>
              <div className="text-sm text-gray-600">Tiempo Estimado</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <div className="text-2xl font-bold text-purple-600 mb-1">100%</div>
              <div className="text-sm text-gray-600">Personalizado</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-screen relative left-1/2 right-1/2 bg-white flex flex-col justify-center items-center px-4 py-16 text-center mb-0 overflow-hidden" style={{transform: 'translateX(-50%)'}}>
        <div className="w-full flex flex-col items-center justify-center">
          <h2 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-indigo-500 mb-6 drop-shadow-xl">
            {t('ctaTitle')}
          </h2>
          <p className="text-xl text-gray-700 w-full text-center mb-8">
            {t('ctaSubtitle')}
          </p>
          <Link 
            href="/contact" 
            className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all text-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 flex items-center justify-center"
          >
            {t('ctaButton')}
          </Link>
        </div>
      </section>
    </div>
  );
}

