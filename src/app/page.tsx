"use client";
import * as React from 'react';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  ArrowRightIcon, 
  ShieldCheckIcon,
  GlobeAltIcon,
  EyeIcon,
  BoltIcon,
  DocumentTextIcon,
  AcademicCapIcon,
  CodeBracketIcon,
  PlusIcon,
  LockClosedIcon,
  Bars3Icon
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import Image from 'next/image';


import { useI18n } from '@/lib/i18n';

export default function HomePage(): React.ReactElement {
  const t = useI18n();

  const [isClient, setIsClient] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Ensure component is mounted
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Cards de soluciones
  const solutionsCards = [
    {
      title: t('solution1Title'),
      description: t('solution1Description'),
      icon: <ShieldCheckIcon className="h-8 w-8 text-white" />, 
      gradient: 'from-blue-500 to-cyan-400',
      border: 'group-hover:border-blue-500/30'
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

  const newsData = [
    {
      title: 'Noticia 1',
      description: 'Descripción de la noticia 1',
      url: 'https://example.com/noticia-1',
      source: 'Fuente de la noticia 1',
      rewrittenTitle: 'Título reescrito de la noticia 1'
    },
    {
      title: 'Noticia 2',
      description: 'Descripción de la noticia 2',
      url: 'https://example.com/noticia-2',
      source: 'Fuente de la noticia 2'
    },
    {
      title: 'Noticia 3',
      description: 'Descripción de la noticia 3',
      url: 'https://example.com/noticia-3',
      source: 'Fuente de la noticia 3'
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <main className="relative min-h-screen overflow-hidden flex items-center justify-center">
        {/* Video Background */}
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
          {/* Overlay para legibilidad */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/60 to-transparent z-10"></div>
        </div>
        {/* Hero Content */}
        <section className="relative z-20 w-full max-w-4xl mx-auto flex flex-col items-center md:items-start text-center md:text-left px-4 pt-24 pb-20 animate-fade-in">
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
            <Link href="/solutions" className="bg-white/90 hover:bg-gray-100 text-cyan-600 font-bold py-3 px-8 rounded-full border border-cyan-400 shadow transition-all text-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 flex items-center justify-center">
              {t('seeSolutions')}
            </Link>
          </div>

        </section>
        {/* Animated particles overlay */}
        {isClient && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-white/10"
                initial={{
                  opacity: 0,
                  width: `${Math.random() * 8 + 2}px`,
                  height: `${Math.random() * 8 + 2}px`,
                  x: `${Math.random() * 100}%`,
                  y: `${Math.random() * 100}%`
                }}
                animate={{
                  opacity: [0, 0.3, 0],
                  x: `${Math.random() * 100}%`,
                  y: `${Math.random() * 100}%`,
                  transition: {
                    duration: Math.random() * 10 + 5,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }
                }}
              />
            ))}
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30 z-10"></div>
      </main>
      {/* Frases animadas de misión/visión */}
      <section className="w-screen relative left-1/2 right-1/2 bg-white flex flex-col justify-center items-center px-4 py-16 text-center" style={{transform: 'translateX(-50%)', borderRadius: 0, marginTop: 0, marginBottom: 0}}>
        <div className="w-full max-w-4xl mx-auto space-y-8">
          <h2 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-indigo-500 mb-6 drop-shadow-xl text-center">
            {t('missionTitle')}
          </h2>
          {[
            { texto: t('mission1'), delay: 0.1 },
            { texto: t('mission2'), delay: 0.2 },
            { texto: t('mission3'), delay: 0.3 },
            { texto: t('mission4'), delay: 0.4 },
          ].map((item, idx) => (
            <motion.p
              key={idx}
              className="font-medium text-xl md:text-2xl text-gray-800 text-center"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: item.delay }}
            >
              {item.texto}
            </motion.p>
          ))}
        </div>
      </section>

      {/* Soluciones Section */}
      <section className="relative w-screen left-1/2 right-1/2 py-24 md:py-32 overflow-hidden" style={{transform: 'translateX(-50%)', borderRadius: 0, marginTop: 0, marginBottom: 0}}>
        <img 
          src="/hero-cybersecurity.png"
          alt="Fondo soluciones"
          className="absolute inset-0 w-full h-full object-cover opacity-80 blur-[3px] scale-105 z-0" 
          draggable="false"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/70 pointer-events-none z-10" />
        <div className="relative z-20 w-full px-4 md:px-12">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-indigo-500 mb-8 drop-shadow-2xl text-center">
              {t('solutionsTitle')}
            </h2>
            <p className="text-xl text-white max-w-3xl mx-auto mb-8 text-center">
              {t('solutionsSubtitle')}
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {solutionsCards.map((item, index) => (
              <div 
                key={index}
                className="p-6 md:p-7 rounded-3xl bg-white shadow-2xl hover:shadow-3xl transition-all duration-300 group relative overflow-hidden flex flex-col items-center gap-2 hover:-translate-y-2 hover:scale-105 border border-transparent hover:border-cyan-300/40 hover:ring-2 hover:ring-cyan-200/50"
                style={{ transitionProperty: 'box-shadow, transform, border, background' }}
              >
                <div className={`w-12 h-12 rounded-xl mb-6 flex items-center justify-center mx-auto bg-gradient-to-br ${item.gradient} shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300 ring-4 ring-cyan-100/40 group-hover:ring-cyan-400/60 animate-pulse`}>
                  {item.icon}
                </div>
                <h3 className="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-indigo-500 mb-2 text-center drop-shadow-lg group-hover:from-cyan-400 group-hover:to-indigo-600 transition-colors duration-300">{item.title}</h3>
                <p className="text-gray-800 text-center text-base font-medium group-hover:text-gray-900 transition-colors duration-300">{item.description}</p>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-12">
            <Link
              href="/solutions"
              className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all text-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 flex items-center justify-center"
            >
              Explorar soluciones
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-screen relative left-1/2 right-1/2 bg-white flex flex-col justify-center items-center px-4 py-16 text-center mb-0 overflow-hidden" style={{transform: 'translateX(-50%)', borderRadius: 0, marginTop: 0}}>
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