'use client';
import React from 'react';
import { useI18n } from '@/lib/i18n';
import Image from 'next/image';
import { ShieldCheckIcon, GlobeAltIcon, EyeIcon, BoltIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import Footer from '@/components/Footer';

export default function AboutPage() {
  const t = useI18n();
  return (
    <>
      <div className="min-h-screen flex flex-col">
        {/* Hero Section */}
        <div className="relative bg-gray-900 text-white h-[320px] md:h-[380px] flex items-center justify-center overflow-hidden">
          <Image
            src="/about-bg.png"
            alt={t('backgroundAlt')}
            fill
            className="object-cover object-center z-0"
            priority
          />
          <div className="absolute inset-0 bg-blue-900/30 backdrop-blur-sm z-10" aria-hidden="true"></div>
          <div className="relative z-20 w-full text-center px-6">
            <motion.h1 
              className="text-4xl md:text-5xl font-extrabold mb-8 text-blue-200 drop-shadow-lg tracking-tight text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {t('ourPurpose')}
            </motion.h1>
            <p className="text-xl md:text-2xl w-full mx-auto text-white/90 drop-shadow-sm font-light">
              {t('protectWhatMatters')}
            </p>
          </div>
        </div>

        {/* Content Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <div className="w-full mx-auto text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                {t('combiningTechnologyAndExpertise')}
              </h2>
              <p className="text-xl text-gray-600">
                {t('offeringIntegralSecurity')}
              </p>
            </div>

            {/* Values Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  title: t('proactiveSecurity'),
                  description: t('anticipatingThreats'),
                  icon: <ShieldCheckIcon className="h-10 w-10" />,
                  color: 'text-blue-600'
                },
                {
                  title: t('globalCoverage'),
                  description: t('completeProtection'),
                  icon: <GlobeAltIcon className="h-10 w-10" />,
                  color: 'text-purple-600'
                },
                {
                  title: t('transparency'),
                  description: t('clearCommunication'),
                  icon: <EyeIcon className="h-10 w-10" />,
                  color: 'text-emerald-600'
                },
                {
                  title: t('agileResponse'),
                  description: t('immediateAction'),
                  icon: <BoltIcon className="h-10 w-10" />,
                  color: 'text-amber-600'
                }
              ].map((item, index) => (
                <motion.div 
                  key={index}
                  className="bg-gray-50 p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow"
                  whileHover={{ y: -5 }}
                >
                  <div className={`${item.color} mb-4`}>{item.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
