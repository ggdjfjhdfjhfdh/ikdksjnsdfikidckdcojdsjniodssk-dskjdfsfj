'use client';

import ArticleCard from '@/components/wiki/ArticleCard';
import BackButton from '@/components/BackButton';
import { useI18n } from '@/lib/LanguageContext';
import { 
  Shield, 
  Zap, 
  Link, 
  Mail, 
  Wifi, 
  Users, 
  UserX, 
  Bug,
  AlertTriangle,
  TrendingUp
} from 'lucide-react';

export default function AmenazasPage() {
  const { t } = useI18n();

  const articles = [
    {
      title: t('wikiArticleAPTTitle'),
      description: t('wikiArticleAPTDesc'),
      href: '/recursos/wiki/amenazas/apt',
      icon: Shield,
      difficulty: 'Avanzado' as const,
      readTime: '12 min',
      popularity: 5,
      gradient: 'from-red-500 to-red-600'
    },
    {
      title: t('wikiArticleZeroDayTitle'),
      description: t('wikiArticleZeroDayDesc'),
      href: '/recursos/wiki/amenazas/zero-day',
      icon: Zap,
      difficulty: 'Avanzado' as const,
      readTime: '10 min',
      popularity: 5,
      gradient: 'from-orange-500 to-red-500'
    },
    {
      title: t('wikiArticleSupplyChainTitle'),
      description: t('wikiArticleSupplyChainDesc'),
      href: '/recursos/wiki/amenazas/supply-chain',
      icon: Link,
      difficulty: 'Intermedio' as const,
      readTime: '8 min',
      popularity: 4,
      gradient: 'from-purple-500 to-purple-600'
    },
    {
      title: t('wikiArticlePhishingTitle'),
      description: t('wikiArticlePhishingDesc'),
      href: '/recursos/wiki/amenazas/phishing',
      icon: Mail,
      difficulty: 'Básico' as const,
      readTime: '6 min',
      popularity: 5,
      gradient: 'from-blue-500 to-blue-600'
    },
    {
      title: t('wikiArticleDDoSTitle'),
      description: t('wikiArticleDDoSDesc'),
      href: '/recursos/wiki/amenazas/ddos',
      icon: Wifi,
      difficulty: 'Intermedio' as const,
      readTime: '9 min',
      popularity: 4,
      gradient: 'from-indigo-500 to-indigo-600'
    },
    {
      title: t('wikiArticleManInTheMiddleTitle'),
      description: t('wikiArticleManInTheMiddleDesc'),
      href: '/recursos/wiki/amenazas/man-in-the-middle',
      icon: Users,
      difficulty: 'Intermedio' as const,
      readTime: '7 min',
      popularity: 4,
      gradient: 'from-teal-500 to-teal-600'
    },
    {
      title: t('wikiArticleInsiderThreatTitle'),
      description: t('wikiArticleInsiderThreatDesc'),
      href: '/recursos/wiki/amenazas/insider',
      icon: UserX,
      difficulty: 'Avanzado' as const,
      readTime: '11 min',
      popularity: 4,
      gradient: 'from-pink-500 to-pink-600'
    },
    {
      title: t('wikiArticleMalwareTitle'),
      description: t('wikiArticleMalwareDesc'),
      href: '/recursos/wiki/amenazas/malware',
      icon: Bug,
      difficulty: 'Intermedio' as const,
      readTime: '8 min',
      popularity: 5,
      gradient: 'from-gray-500 to-gray-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <BackButton href="/recursos/wiki" className="mb-6" />
        
        {/* Hero Section */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center justify-center p-4 bg-gradient-to-r from-red-500 to-red-600 rounded-2xl mb-6">
            <AlertTriangle className="h-12 w-12 text-white" />
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            {t('wikiCategoryThreats')}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Análisis detallado de las principales amenazas de ciberseguridad y sus contramedidas.
            Comprende los vectores de ataque más comunes y aprende a defenderte.
          </p>
          
          {/* Stats */}
          <div className="flex justify-center items-center mt-8 space-x-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-red-600">{articles.length}</div>
              <div className="text-sm text-gray-500">Amenazas Cubiertas</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center text-yellow-500 mb-1">
                <TrendingUp className="h-5 w-5 mr-1" />
                <span className="text-3xl font-bold text-gray-900">95%</span>
              </div>
              <div className="text-sm text-gray-500">Cobertura de Amenazas</div>
            </div>
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <ArticleCard
              key={article.href}
              title={article.title}
              description={article.description}
              href={article.href}
              icon={article.icon}
              difficulty={article.difficulty}
              readTime={article.readTime}
              popularity={article.popularity}
              gradient={article.gradient}
            />
          ))}
        </div>
        
        {/* Call to Action */}
        <div className="mt-16 text-center bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            ¿Necesitas ayuda con una amenaza específica?
          </h2>
          <p className="text-gray-600 mb-6">
            Nuestros expertos están aquí para ayudarte a identificar y mitigar cualquier amenaza de seguridad.
          </p>
          <div className="flex justify-center space-x-4">
            <button className="bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-3 rounded-lg font-medium hover:from-red-600 hover:to-red-700 transition-all duration-300">
              Contactar Expertos
            </button>
            <button className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-all duration-300">
              Ver Más Recursos
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
