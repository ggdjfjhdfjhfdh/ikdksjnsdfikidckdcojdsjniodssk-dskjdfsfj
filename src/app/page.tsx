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
          <div className="absolute inset-0 bg-gradient-to-b from-white/95 via-white/70 to-white/30 z-10"></div>
        </div>
        <section className="relative z-20 w-full max-w-7xl mx-auto flex flex-col items-center md:items-start text-center md:text-left px-6 pt-32 pb-24">
          <div className="mb-8">
      
          </div>
          <h1 className="text-6xl md:text-8xl font-black tracking-tight mb-8 leading-[0.9] text-gray-900">
            {t('heroTitle1')}
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-700 animate-pulse">
              {t('heroTitle2')}
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-4xl leading-relaxed font-medium">
            {t('heroDescription')}
          </p>
          <div className="flex flex-col sm:flex-row gap-6 w-full md:w-auto justify-center md:justify-start mb-12">
            <Link href="/contact" className="btn-primary text-lg px-12 py-5 shadow-2xl hover:shadow-blue-500/30 transform hover:scale-105">
              {t('askUs')}
            </Link>
            <Link href="/about" className="btn-secondary text-lg px-12 py-5 shadow-xl hover:shadow-blue-500/20 transform hover:scale-105">
              {t('learnMore')}
            </Link>
          </div>

        </section>
      </main>



      {/* Why Sesecpro Section */}
      <section className="py-24 md:py-32 bg-gradient-to-br from-gray-50 via-white to-blue-50/30 relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>
        <div className="container relative">
          <div className="text-center mb-20">
        
            <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-6 leading-tight">
              {t('whySesecproTitle')}
            </h2>
            <div className="w-32 h-1.5 bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 mx-auto rounded-full shadow-lg"></div>
            <p className="text-xl text-gray-600 mt-6 max-w-3xl mx-auto leading-relaxed">
              Transformamos la ciberseguridad de un centro de costos en una ventaja competitiva
            </p>
          </div>
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative bg-white p-8 rounded-2xl shadow-xl border border-gray-100 group-hover:border-blue-200 transition-all duration-300 hover:-translate-y-3">
                <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-2xl mb-8 group-hover:scale-110 transition-transform duration-300">
                  <ArrowTrendingUpIcon className="h-10 w-10" aria-hidden="true" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-700 transition-colors">{t('whySesecproPoint1Title')}</h3>
                <p className="text-gray-600 leading-relaxed text-lg">{t('whySesecproPoint1Desc')}</p>
              </div>
            </div>
            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative bg-white p-8 rounded-2xl shadow-xl border border-gray-100 group-hover:border-cyan-200 transition-all duration-300 hover:-translate-y-3">
                <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-600 to-cyan-700 text-white shadow-2xl mb-8 group-hover:scale-110 transition-transform duration-300">
                  <ChartBarSquareIcon className="h-10 w-10" aria-hidden="true" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-cyan-700 transition-colors">{t('whySesecproPoint2Title')}</h3>
                <p className="text-gray-600 leading-relaxed text-lg">{t('whySesecproPoint2Desc')}</p>
              </div>
            </div>
            <div className="group relative sm:col-span-2 lg:col-span-1">
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative bg-white p-8 rounded-2xl shadow-xl border border-gray-100 group-hover:border-indigo-200 transition-all duration-300 hover:-translate-y-3">
                <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 text-white shadow-2xl mb-8 group-hover:scale-110 transition-transform duration-300">
                  <SolidShieldCheckIcon className="h-10 w-10" aria-hidden="true" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-indigo-700 transition-colors">{t('whySesecproPoint3Title')}</h3>
                <p className="text-gray-600 leading-relaxed text-lg">{t('whySesecproPoint3Desc')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Soluciones Section */}
      <section className="py-24 md:py-32 bg-gradient-to-br from-white via-blue-50/20 to-gray-50 relative">
        <div className="container">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-700 text-sm font-semibold rounded-full mb-6">
              <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
              Soluciones
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-6 leading-tight">
              {t('solutionsTitle')}
            </h2>
            <div className="w-32 h-1.5 bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 mx-auto rounded-full shadow-lg"></div>
            <p className="text-xl text-gray-600 mt-6 max-w-3xl mx-auto leading-relaxed">
              Protección integral adaptada a las necesidades específicas de tu empresa
            </p>
          </div>
          <div className="grid grid-cols-1 gap-10 lg:gap-12 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
            {solutionsCards.map((card, index) => (
              <div key={index} className="group relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-3xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative bg-white p-10 rounded-3xl shadow-2xl border border-gray-100 group-hover:border-blue-200 transition-all duration-500 hover:-translate-y-4 hover:shadow-blue-500/20">
                  <div className={`flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br ${card.gradient} text-white shadow-2xl mb-8 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                    {card.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 group-hover:text-blue-700 transition-colors">{card.title}</h3>
                  <p className="text-gray-600 leading-relaxed mb-8 text-lg">{card.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-16">
            <Link
              href="/solutions"
              className="btn-primary text-lg px-10 py-4 shadow-2xl hover:shadow-blue-500/25"
            >
              {t('exploreSolutions')}
            </Link>
          </div>
        </div>
      </section>

      {/* Calculadora de Riesgo Section */}
      <section className="py-24 md:py-32 bg-gradient-to-br from-blue-50 via-white to-cyan-50/50 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-200/20 to-cyan-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-cyan-200/20 to-blue-200/20 rounded-full blur-3xl"></div>
        
        <div className="container relative">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-100 to-orange-100 text-red-700 text-sm font-semibold rounded-full mb-6">
                <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                Evaluación de Riesgo
              </div>
              <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-6 leading-tight">
                {t('riskCalculatorTitle')}
              </h2>
              <div className="w-32 h-1.5 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 mx-auto rounded-full shadow-lg"></div>
              <p className="text-xl text-gray-600 mt-6 max-w-4xl mx-auto leading-relaxed">
                {t('riskCalculatorDescription')}
              </p>
            </div>
            
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-600 rounded-3xl blur opacity-25"></div>
              <div className="relative bg-white rounded-3xl shadow-2xl p-12 border border-gray-100">
                <div className="flex flex-col lg:flex-row items-center justify-center mb-12 gap-8">
                  <div className="flex-shrink-0">
                    <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-3xl flex items-center justify-center shadow-2xl">
                      <ShieldCheckIcon className="h-12 w-12 text-white" />
                    </div>
                  </div>
                  <div className="text-center lg:text-left">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">
                      {t('riskCalculatorSubtitle')}
                    </h3>
                    <p className="text-lg text-blue-600 font-semibold">
                      {t('riskCalculatorFeatures')}
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                  <div className="text-center group">
                    <div className="relative mb-6">
                      <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
                      <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-2xl mx-auto group-hover:scale-110 transition-transform duration-300">
                        <div className="text-2xl font-black">18</div>
                      </div>
                    </div>
                    <h4 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">{t('riskCalculatorAspects')}</h4>
                    <p className="text-gray-600 text-sm">Aspectos evaluados</p>
                  </div>
                  
                  <div className="text-center group">
                    <div className="relative mb-6">
                      <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-cyan-600 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
                      <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-cyan-600 text-white shadow-2xl mx-auto group-hover:scale-110 transition-transform duration-300">
                        <div className="text-xl font-black">5min</div>
                      </div>
                    </div>
                    <h4 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-cyan-600 transition-colors">{t('riskCalculatorTime')}</h4>
                    <p className="text-gray-600 text-sm">Tiempo promedio</p>
                  </div>
                  
                  <div className="text-center group">
                    <div className="relative mb-6">
                      <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
                      <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-indigo-600 text-white shadow-2xl mx-auto group-hover:scale-110 transition-transform duration-300">
                        <div className="text-xl font-black">100%</div>
                      </div>
                    </div>
                    <h4 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">{t('riskCalculatorPersonalized')}</h4>
                    <p className="text-gray-600 text-sm">Personalizado</p>
                  </div>
                </div>
                
                <div className="text-center">
                  <Link 
                     href="/recursos/herramientas/calculadora-riesgo" 
                     className="inline-flex items-center px-12 py-5 bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-lg font-bold rounded-2xl hover:from-blue-700 hover:to-cyan-700 transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-blue-500/30 group"
                   >
                    <ShieldCheckIcon className="h-6 w-6 mr-3 group-hover:scale-110 transition-transform" />
                    {t('riskCalculatorButton')}
                  </Link>
                  <p className="text-sm text-gray-500 mt-4">✨ Evaluación gratuita y confidencial</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-32 bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 text-white relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('/pattern-grid.svg')] opacity-10"></div>
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="container relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm text-white text-sm font-semibold rounded-full mb-8 border border-white/20">
                <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></span>
                ¿Listo para proteger tu empresa?
              </div>
              <h2 className="text-5xl md:text-7xl font-black mb-8 leading-tight bg-gradient-to-r from-white via-cyan-200 to-blue-200 bg-clip-text text-transparent">
                {t('ctaTitle')}
              </h2>
              <div className="w-32 h-1.5 bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 mx-auto rounded-full shadow-lg mb-8"></div>
              <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed font-medium">
                {t('ctaSubtitle')}
              </p>
            </div>
            
            <div className="flex flex-col lg:flex-row gap-8 justify-center items-center mb-16">
              <div className="group relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
                <Link href="/contact" className="relative inline-flex items-center px-12 py-6 bg-white text-gray-900 text-xl font-bold rounded-2xl hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-2xl">
                  {t('ctaButton')}
                </Link>
              </div>
              
              
              <div className="group relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-2xl blur opacity-50 group-hover:opacity-75 transition duration-300"></div>
          
              </div>
            </div>
            
            {/* Trust indicators */}
            
          </div>
        </div>
      </section>
    </div>
  );
}

