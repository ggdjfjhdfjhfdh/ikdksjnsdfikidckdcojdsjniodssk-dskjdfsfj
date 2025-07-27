'use client';

import Link from 'next/link';
import BackButton from '@/components/BackButton';
import { useLanguage } from '@/lib/LanguageContext';
import { toolsTranslations } from '@/lib/toolsTranslations';

export default function HerramientasPage() {
  const { language } = useLanguage();
  const t = toolsTranslations[language];

  const tools = [
    {
      key: 'password-checker',
      href: '/recursos/herramientas/comprobador-contrasenas',
      icon: '🔒',
      title: t.passwordChecker.title,
      description: t.passwordChecker.description,
    },
    {
      key: 'security-quiz',
      href: '/recursos/herramientas/test-ciberseguridad',
      icon: '🧠',
      title: t.securityQuiz.title,
      description: t.securityQuiz.description,
    },
    {
      key: 'risk-calculator',
      href: '/recursos/herramientas/calculadora-riesgo',
      icon: '🛡️',
      title: 'Calculadora de Riesgo',
      description: 'Evalúe el nivel de ciberseguridad de su organización y reciba recomendaciones personalizadas.',
    },
  ] as const;

  return (
    <main className="min-h-screen bg-gray-50 py-6 sm:py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <BackButton href="/recursos" label={t.backToResources} className="mb-4 sm:mb-6" />
        
        <div className="text-center mb-12">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8">
            {t.pageTitle}
          </h1>
          <p className="text-lg text-gray-600">{t.pageDescription}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {tools.map((tool) => (
            <Link
              key={tool.key}
              href={tool.href}
              className="group flex flex-col items-center border border-gray-200 rounded-xl sm:rounded-2xl p-6 sm:p-8 bg-white shadow-sm hover:shadow-lg transition-all
              active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              <div className="text-4xl sm:text-5xl mb-3 sm:mb-4 group-hover:scale-110 transition-transform">
                {tool.icon}
              </div>
              <div className="text-lg sm:text-xl md:text-2xl font-bold mb-1 sm:mb-2 text-gray-900 text-center">
                {tool.title}
              </div>
              <p className="text-gray-600 text-center text-xs sm:text-sm md:text-base max-w-xs">
                {tool.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
