'use client';

import { Metadata } from 'next';
import Link from 'next/link';
import HeroSection from './HeroSection';
import { useLanguage } from '@/lib/LanguageContext';



const teamMembers = [
  {
    name: 'Alejandro Martínez',
    role: 'Director de Seguridad',
    bio: 'Más de 10 años en ciberseguridad, especializado en inteligencia de amenazas',
  },
  {
    name: 'María López',
    role: 'Desarrolladora Principal',
    bio: 'Desarrolladora full-stack apasionada por prácticas de codificación segura',
  },
  {
    name: 'Samuel García',
    role: 'Experto en Cumplimiento',
    bio: 'Garantiza el cumplimiento normativo en todas las soluciones de seguridad',
  },
];

// Note: metadata will be handled differently in client component

export default function AboutPage() {
  const { t } = useLanguage();

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white">
      <HeroSection />

      {/* Hero Section with Integrated Values */}
      <section className="relative py-20 overflow-hidden bg-white text-gray-900">
        <div className="absolute inset-0 bg-[#f8fafc] -z-0"></div>
        <div className="relative container mx-auto px-4 max-w-6xl">
          <div className="text-center py-12 md:py-16">
            <span className="inline-block px-4 py-2 mb-4 text-sm font-semibold text-blue-700 bg-blue-100 rounded-full">
              {t('purpose.badge') || 'Nuestro Propósito'}
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              {t('purpose.title') || 'Transformando la Seguridad en'} <span className="bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">{t('purpose.titleHighlight') || 'Ventaja Competitiva'}</span>
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 mx-auto mb-8 rounded-full"></div>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-16 leading-relaxed">
              {t('purpose.description') || 'En un panorama de amenazas en constante evolución, las empresas necesitan más que herramientas: necesitan experiencia, estrategia y resultados probados. Nuestra misión es ser el socio de confianza que transforma la complejidad de la ciberseguridad en ventaja competitiva.'}
            </p>
            
            <div className="grid md:grid-cols-3 gap-8 mt-16">
              {[
                {
                  icon: '🎯',
                  title: t('values.measurableResults.title') || 'Resultados Medibles',
                  description: t('values.measurableResults.description') || 'Métricas claras que demuestran el ROI de tu inversión en seguridad',
                  bg: 'from-blue-50 to-blue-50/50',
                  border: 'border-blue-100',
                  iconBg: 'bg-blue-100',
                  iconColor: 'text-blue-600',
                  hoverBg: 'hover:bg-blue-50'
                },
                {
                  icon: '🔬',
                  title: t('values.continuousInnovation.title') || 'Innovación Continua',
                  description: t('values.continuousInnovation.description') || 'Adoptamos las últimas tecnologías antes que la competencia',
                  bg: 'from-cyan-50 to-cyan-50/50',
                  border: 'border-cyan-100',
                  iconBg: 'bg-cyan-100',
                  iconColor: 'text-cyan-600',
                  hoverBg: 'hover:bg-cyan-50'
                },
                {
                  icon: '🤝',
                  title: t('values.strategicPartnership.title') || 'Partnership Estratégico',
                  description: t('values.strategicPartnership.description') || 'Nos integramos en tu negocio como una extensión de tu equipo',
                  bg: 'from-indigo-50 to-indigo-50/50',
                  border: 'border-indigo-100',
                  iconBg: 'bg-indigo-100',
                  iconColor: 'text-indigo-600',
                  hoverBg: 'hover:bg-indigo-50'
                }
              ].map((item, index) => (
                <div 
                  key={index}
                  className={`bg-gradient-to-br ${item.bg} rounded-2xl p-0.5 border ${item.border} hover:shadow-lg transition-all duration-300 hover:-translate-y-1`}
                >
                  <div className={`h-full bg-white/80 backdrop-blur-sm p-6 rounded-[15px] ${item.hoverBg} transition-colors`}>
                    <div className={`w-16 h-16 rounded-xl ${item.iconBg} flex items-center justify-center text-3xl mb-6 mx-auto ${item.iconColor}`}>
                      {item.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">{item.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="relative py-20 bg-gray-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[url('/images/pattern-grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
        </div>
        <div className="relative container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 text-sm font-medium text-blue-300 bg-blue-900/30 rounded-full mb-4">
              {t('experience.badge') || 'Nuestra Trayectoria'}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t('experience.title') || 'Experiencia que'} <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">{t('experience.titleHighlight') || 'Inspira Confianza'}</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto rounded-full mb-6"></div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="space-y-8">
              {[
                {
                  title: t('experience.items.yearsExperience.title') || "+10 años de experiencia",
                  description: t('experience.items.yearsExperience.description') || "Protegiendo infraestructuras críticas en diversos sectores"
                },
                {
                  title: t('experience.items.specializedSectors.title') || "Sectores especializados",
                  description: t('experience.items.specializedSectors.description') || "Banca, Salud, Industria, Tecnología"
                }
              ].map((item, index) => (
                <div key={index} className="group flex items-start p-6 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-800 hover:border-blue-500/30 transition-all duration-300">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center text-white text-xl font-bold mr-5 mt-0.5">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-blue-300 transition-colors">{item.title}</h3>
                    <p className="text-gray-400">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="space-y-8">
              {[
                {
                  title: t('experience.items.leadingCertifications.title') || "Certificaciones líderes",
                  description: t('experience.items.leadingCertifications.description') || "En las principales tecnologías de seguridad del mercado"
                },
                {
                  title: t('experience.items.guaranteedCompliance.title') || "Cumplimiento garantizado",
                  description: t('experience.items.guaranteedCompliance.description') || "ISO 27001, RGPD, PCI-DSS y más"
                }
              ].map((item, index) => (
                <div key={index} className="group flex items-start p-6 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-800 hover:border-blue-500/30 transition-all duration-300">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center text-white text-xl font-bold mr-5 mt-0.5">
                    {index + 3}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-blue-300 transition-colors">{item.title}</h3>
                    <p className="text-gray-400">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 overflow-hidden bg-white">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white -z-0"></div>
        <div className="relative container mx-auto px-4 max-w-4xl text-center">
          <div>
            <span className="inline-block px-4 py-1.5 text-sm font-medium text-blue-700 bg-blue-100 rounded-full mb-6">
              {t('cta.badge') || 'Siguiente Paso'}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
              {t('cta.title') || '¿Listo para una Estrategia de Seguridad que'} <span className="bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">{t('cta.titleHighlight') || 'Genere Resultados'}</span>?
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 mx-auto mb-8 rounded-full"></div>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
              {t('cta.description') || 'Descubre cómo nuestro enfoque estratégico puede fortalecer tu posición competitiva en el mercado actual.'}
            </p>
            <div className="inline-block">
              <Link 
                href="/contacto" 
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {t('cta.button') || 'Habla con un experto'}
                <svg className="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                </svg>
              </Link>
            </div>
            <p className="text-sm text-gray-500 mt-6">
              {t('cta.disclaimer') || 'Sin compromiso • Consulta inicial sin costo'}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
