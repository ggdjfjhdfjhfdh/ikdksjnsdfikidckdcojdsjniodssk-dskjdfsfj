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

      <footer className="relative w-full bg-gradient-to-t from-gray-950/95 via-gray-900/90 to-gray-800/90 border-t-4 border-cyan-500 shadow-2xl backdrop-blur-xl px-0 py-14 animate-fade-in-up">
        <div className="w-full flex flex-col md:flex-row items-center md:items-start justify-between gap-12 px-6 md:px-16">
          {/* Branding & Socials */}
          <div className="flex flex-col items-center md:items-start gap-5 w-full md:w-auto">
            <p className="text-gray-300 text-sm text-center md:text-left max-w-xs">
              {t('footerSlogan1')}<br/>{t('footerSlogan2')}
            </p>
            <div className="flex gap-6 mt-2">
              <a href="https://instagram.com/sesecpro" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-cyan-400 transition-all drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]" aria-label="Instagram">
                <svg fill="currentColor" viewBox="0 0 24 24" className="w-7 h-7"><path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25v-8.5A4.25 4.25 0 0 0 16.25 3.5zm4.25 2.25a6 6 0 1 1-6 6 6 6 0 0 1 6-6zm0 1.5a4.5 4.5 0 1 0 4.5 4.5 4.5 4.5 0 0 0-4.5-4.5zm5.25.75a1 1 0 1 1-1 1 1 1 0 0 1 1-1z"/></svg>
              </a>
              <a href="https://youtube.com/@sesecpro" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-cyan-400 transition-all drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]" aria-label="YouTube">
                <svg fill="currentColor" viewBox="0 0 24 24" className="w-7 h-7"><path d="M23.498 6.186a2.993 2.993 0 0 0-2.11-2.117C19.411 3.5 12 3.5 12 3.5s-7.411 0-9.388.569A2.993 2.993 0 0 0 .502 6.186C0 8.16 0 12 0 12s0 3.84.502 5.814a2.993 2.993 0 0 0 2.11 2.117C4.589 20.5 12 20.5 12 20.5s7.411 0 9.388-.569a2.993 2.993 0 0 0 2.11-2.117C24 15.84 24 12 24 12s0-3.84-.502-5.814zM9.545 15.568V8.432L15.818 12z"/></svg>
              </a>
              <a href="https://x.com/sesecpro" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-cyan-400 transition-all drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]" aria-label="Twitter">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7"><path d="M23.954 4.569c-.885.389-1.83.654-2.825.775 1.014-.611 1.794-1.574 2.163-2.724-.951.564-2.005.974-3.127 1.195-.897-.959-2.178-1.559-3.594-1.559-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616v.061c0 2.385 1.693 4.374 4.169 4.827-.693.188-1.452.232-2.224.084.627 1.956 2.444 3.377 4.6 3.417-2.07 1.623-4.678 2.348-7.29 2.034 2.179 1.397 4.768 2.212 7.557 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.689 1.797-1.56 2.457-2.549z"/></svg>
              </a>
            </div>
          </div>

          {/* Divider */}
          <div className="hidden md:block h-24 w-px bg-gradient-to-b from-cyan-500/40 via-gray-400/10 to-transparent mx-10 rounded-full" />

          {/* Navegación */}
          <nav className="flex flex-col items-center gap-6 md:gap-4 md:items-end w-full md:w-auto mt-8 md:mt-0">
            <div className="flex gap-6 text-sm font-normal">
              <a href="/" className="text-gray-400 hover:text-cyan-400 transition-colors">{t('navPurpose')}</a>
              <a href="/solutions" className="text-gray-400 hover:text-cyan-400 transition-colors">{t('navSolutions')}</a>
              <a href="/contact" className="text-gray-400 hover:text-cyan-400 transition-colors">{t('navContact')}</a>
            </div>
            <div className="flex flex-wrap gap-6 mt-4 justify-center md:justify-end">
              <a href="/legal/privacy" className="text-gray-400 hover:text-cyan-300 text-xs underline underline-offset-2 transition-colors">{t('privacyPolicy')}</a>
              <a href="/legal/terms" className="text-gray-400 hover:text-cyan-300 text-xs underline underline-offset-2 transition-colors">{t('termsAndConditions')}</a>
              <a href="/legal/cookies" className="text-gray-400 hover:text-cyan-300 text-xs underline underline-offset-2 transition-colors">{t('cookiesPolicy')}</a>
            </div>
          </nav>
        </div>
        <div className="mt-10 text-center text-gray-500 text-xs">
          &copy; {new Date().getFullYear()} Se.Sec.Pro. {t('allRightsReserved')}
        </div>
      </footer>
    </div>
  );
}