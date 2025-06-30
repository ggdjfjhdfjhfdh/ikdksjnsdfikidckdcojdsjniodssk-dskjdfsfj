'use client';
import { Shield, Lock, Eye, Code2, AlertTriangle, BookOpen, Key, Binoculars, RotateCw } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import React from 'react';
import { useI18n } from '@/lib/i18n';
import Footer from '../../components/Footer';


export default function SolutionsPage() {
  const t = useI18n();
  const solutions = [
    {
      icon: <Shield className="w-8 h-8 text-blue-600" />,
      title: t('solution1Title'),
      description: t('solution1Description'),
      why: t('solution1Why'),
      features: [
        t('solution1Feature1'),
        t('solution1Feature2'),
        t('solution1Feature3')
      ]
    },
    {
      icon: <Lock className="w-8 h-8 text-blue-600" />,
      title: t('solution2Title'),
      description: t('solution2Description'),
      why: t('solution2Why'),
      features: [
        t('solution2Feature1'),
        t('solution2Feature2'),
        t('solution2Feature3')
      ]
    },
    {
      icon: <Eye className="w-8 h-8 text-blue-600" />,
      title: t('solution3Title'),
      description: t('solution3Description'),
      why: t('solution3Why'),
      features: [
        t('solution3Feature1'),
        t('solution3Feature2'),
        t('solution3Feature3')
      ]
    },
    {
      icon: <BookOpen className="w-8 h-8 text-blue-600" />,
      title: t('solution4Title'),
      description: t('solution4Description'),
      why: t('solution4Why'),
      features: [
        t('solution4Feature1'),
        t('solution4Feature2'),
        t('solution4Feature3')
      ]
    },
    {
      icon: <AlertTriangle className="w-8 h-8 text-blue-600" />,
      title: t('solution5Title'),
      description: t('solution5Description'),
      why: t('solution5Why'),
      features: [
        t('solution5Feature1'),
        t('solution5Feature2'),
        t('solution5Feature3')
      ]
    },
    {
      icon: <Code2 className="w-8 h-8 text-blue-600" />,
      title: t('solution6Title'),
      description: t('solution6Description'),
      why: t('solution6Why'),
      features: [
        t('solution6Feature1'),
        t('solution6Feature2'),
        t('solution6Feature3')
      ]
    },
    {
      icon: <Key className="w-8 h-8 text-blue-600" />,
      title: t('solution7Title'),
      description: t('solution7Description'),
      why: t('solution7Why'),
      features: [
        t('solution7Feature1'),
        t('solution7Feature2'),
        t('solution7Feature3')
      ]
    },
    {
      icon: <Binoculars className="w-8 h-8 text-blue-600" />,
      title: t('solution8Title'),
      description: t('solution8Description'),
      why: t('solution8Why'),
      features: [
        t('solution8Feature1'),
        t('solution8Feature2'),
        t('solution8Feature3')
      ]
    },
    {
      icon: <RotateCw className="w-8 h-8 text-blue-600" />,
      title: t('solution9Title'),
      description: t('solution9Description'),
      why: t('solution9Why'),
      features: [
        t('solution9Feature1'),
        t('solution9Feature2'),
        t('solution9Feature3')
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/80 to-blue-100/60 relative overflow-x-hidden">
      {/* Fondo decorativo moderno */}
      <div className="absolute -top-32 -left-32 w-[400px] h-[400px] bg-blue-300/30 rounded-full blur-3xl z-0 animate-float" />
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-yellow-100/40 rounded-full blur-2xl z-0 animate-float2" />
      {/* Hero */}
      <section className="relative h-[320px] md:h-[380px] flex items-center justify-center">
        <Image
          src="/hero-cybersecurity.png"
          alt={t('heroAlt')}
          fill
          className="object-cover object-center z-0"
          priority
        />
        <div className="absolute inset-0 bg-blue-900/30 backdrop-blur-sm z-10" aria-hidden="true"></div>
        <div className="relative z-20 w-full text-center px-6">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-blue-200 drop-shadow-lg tracking-tight">{t('heroTitle')}</h1>
          <p className="text-xl md:text-2xl max-w-2xl mx-auto text-white/90 drop-shadow-sm font-light">
            {t('heroDescription')}
          </p>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="py-20 bg-transparent">
        {/* Grid glassmorphism y animaciones */}
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {solutions.map((solution, index) => (
              <div key={index} className="bg-white/70 backdrop-blur-xl border border-blue-100 rounded-3xl shadow-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 flex flex-col animate-fade-in group">
                <div className="flex flex-col items-center text-center gap-4 p-10">
                  <div className="p-4 bg-gradient-to-br from-blue-300 via-blue-100 to-yellow-50 rounded-2xl shadow-lg animate-pop">
                    {solution.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-blue-700 tracking-tight">{solution.title}</h3>
                  <p className="text-gray-700 font-light text-base md:text-lg">{solution.description}</p>
                  <ul className="flex flex-col gap-1 text-gray-600 text-sm w-full max-w-xs mx-auto mt-2">
                    {solution.features.map((f, i) => (
                      <li key={i} className="flex items-center gap-2"><span className="inline-block w-4 h-4"><svg fill='none' viewBox='0 0 24 24' stroke='currentColor' className='w-4 h-4 text-green-500'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' /></svg></span> {f}</li>
                    ))}
                  </ul>
                  {/* If you want to show impact or why, you can add here: */}
                  {/* <div className="bg-blue-50 px-4 py-2 rounded-lg text-blue-800 font-medium text-xs mt-3 shadow animate-fade-in">
                    {solution.why}
                  </div> */}
                  <Link href="/contact" className="mt-4 inline-block text-white bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 px-7 py-3 rounded-xl shadow-lg transition-all text-base font-semibold focus:outline-none focus:ring-2 focus:ring-blue-300 animate-cta">Más</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Custom Solution CTA */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">{t('customSolutionTitle')}</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10">
            {t('customSolutionDesc')}
          </p>
          <Link 
            href="/contact" 
            className="inline-block bg-blue-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300"
          >
            {t('customSolutionButton')}
          </Link>
        </div>
      </section>

      <Footer bgColor="bg-gray-100" links={[
        { label: 'Aviso Legal', href: '/legal' },
        { label: 'Política de Privacidad', href: '/privacy' },
        { label: 'Política de Cookies', href: '/cookies' }
      ]} />
    </div>
  );
}
