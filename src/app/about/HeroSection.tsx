"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/lib/LanguageContext';

const HeroSection = () => {
  const { t } = useLanguage();

  return (
    <section className="relative py-24 md:py-32 text-white overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/about-bg.png"
          alt={t('hero.alt') || 'Seguridad Cibernética'}
          fill
          className="object-cover"
          priority
          quality={100}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 to-blue-900/80"></div>
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            {t('hero.title') || 'Protegiendo Tu Mundo Digital'}
          </h1>
          <p className="text-xl md:text-2xl text-gray-100 max-w-3xl mx-auto leading-relaxed">
            {t('hero.subtitle') || 'Expertos en ciberseguridad comprometidos con la protección de tu negocio en el entorno digital'}
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
