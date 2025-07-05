'use client';
import { Shield, Lock, Eye, Code2, AlertTriangle, BookOpen, Key, Binoculars, RotateCw } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useI18n } from '@/lib/i18n';

export default function SolutionsPage() {
  const { t } = useI18n();
  
  const solutions = [
    {
      icon: <Shield className="w-6 h-6 text-blue-500" />,
      title: t('solution1Title'),
      description: t('solution1Description'),
      features: [t('solution1Feature1'), t('solution1Feature2'), t('solution1Feature3')],
      bgImage: '/solutions/security-bg.svg'
    },
    {
      icon: <Lock className="w-6 h-6 text-blue-500" />,
      title: t('solution2Title'),
      description: t('solution2Description'),
      features: [t('solution2Feature1'), t('solution2Feature2'), t('solution2Feature3')],
      bgImage: '/solutions/encryption-bg.svg'
    },
    {
      icon: <Eye className="w-6 h-6 text-blue-500" />,
      title: t('solution3Title'),
      description: t('solution3Description'),
      features: [t('solution3Feature1'), t('solution3Feature2'), t('solution3Feature3')],
      bgImage: '/solutions/insight-bg.svg'
    },
    {
      icon: <Code2 className="w-6 h-6 text-blue-500" />,
      title: t('solution6Title'),
      description: t('solution6Description'),
      features: [t('solution6Feature1'), t('solution6Feature2'), t('solution6Feature3')],
      bgImage: '/solutions/development-bg.svg'
    },
    {
      icon: <AlertTriangle className="w-6 h-6 text-blue-500" />,
      title: t('solution5Title'),
      description: t('solution5Description'),
      features: [t('solution5Feature1'), t('solution5Feature2'), t('solution5Feature3')],
      bgImage: '/solutions/compliance-bg.svg'
    },
    {
      icon: <BookOpen className="w-6 h-6 text-blue-500" />,
      title: t('solution4Title'),
      description: t('solution4Description'),
      features: [t('solution4Feature1'), t('solution4Feature2'), t('solution4Feature3')],
      bgImage: '/solutions/knowledge-bg.svg'
    },
    {
      icon: <Key className="w-6 h-6 text-blue-500" />,
      title: t('solution7Title'),
      description: t('solution7Description'),
      features: [t('solution7Feature1'), t('solution7Feature2'), t('solution7Feature3')],
      bgImage: '/solutions/access-bg.svg'
    },
    {
      icon: <Binoculars className="w-6 h-6 text-blue-500" />,
      title: t('solution8Title'),
      description: t('solution8Description'),
      features: [t('solution8Feature1'), t('solution8Feature2'), t('solution8Feature3')],
      bgImage: '/solutions/discovery-bg.svg'
    },
    {
      icon: <RotateCw className="w-6 h-6 text-blue-500" />,
      title: t('solution9Title'),
      description: t('solution9Description'),
      features: [t('solution9Feature1'), t('solution9Feature2'), t('solution9Feature3')],
      bgImage: '/solutions/innovation-bg.svg'
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[320px] md:h-[380px] flex items-center justify-center">
        <Image
          src="/solutions/hero-bg.jpg"
          alt="Cybersecurity solutions background"
          fill
          className="object-cover object-center z-0"
          priority
        />
        <div className="absolute inset-0 bg-blue-900/20 backdrop-blur-sm z-10" aria-hidden="true"></div>
        <div className="relative z-20 w-full text-center px-6">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-blue-200 drop-shadow-lg tracking-tight">{t('solutionsTitle')}</h1>
          <p className="text-xl md:text-2xl max-w-2xl mx-auto text-white/90 drop-shadow-sm font-light">
            {t('solutionsSubtitle')}
          </p>
        </div>
      </section>

      <div className="py-16 bg-gray-50">
      <div className="container mx-auto px-6 max-w-6xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >

        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {solutions.map((solution, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5 }}
              className="relative rounded-xl overflow-hidden group"
            >
              <div className="absolute inset-0 bg-black/40 z-10 group-hover:bg-black/30 transition-colors" />
              <Image 
                src={solution.bgImage}
                alt=""
                fill
                className="object-cover"
                quality={80}
              />
              <div className="relative z-20 p-8 h-full flex flex-col">
                <div className="flex items-center mb-6">
                  <div className="p-3 rounded-lg bg-black/20 backdrop-blur-sm mr-4">
                    {solution.icon}
                  </div>
                  <h2 className="text-xl font-semibold text-white">{solution.title}</h2>
                </div>
                
                <p className="text-white/90 mb-6 text-sm flex-grow">{solution.description}</p>
                
                <div className="mb-6">
                  <h3 className="text-xs font-medium text-white/70 uppercase tracking-wider mb-3">
                    {t('keyBenefits')}
                  </h3>
                  <ul className="space-y-2">
                    {solution.features.map((feature, i) => (
                      <li key={i} className="flex items-start text-sm text-white">
                        <div className="w-5 h-5 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center mr-2 mt-0.5">
                          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <Link 
                  href="/contact" 
                  className="inline-block w-full text-center px-4 py-3 bg-white/10 backdrop-blur-sm text-blue-500 border border-white/20 rounded-lg hover:bg-white/20 transition-colors text-sm font-medium"
                >
                  {t('learnMore')}
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      </div>
    </>
  );
}
