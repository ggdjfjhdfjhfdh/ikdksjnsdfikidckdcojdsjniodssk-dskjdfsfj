'use client';

import ArticleCard from '@/components/wiki/ArticleCard';
import BackButton from '@/components/BackButton';
import { useI18n } from '@/lib/LanguageContext';
import { 
  Cloud, 
  Shield, 
  Code, 
  GitBranch, 
  Users, 
  Network, 
  Activity, 
  Zap, 
  Lock, 
  Eye,
  CloudSnow,
  TrendingUp
} from 'lucide-react';

export default function CloudPage() {
  const { t } = useI18n();

  const articles = [
    {
      title: t('wikiArticleCloudSecurityModelTitle'),
      description: t('wikiArticleCloudSecurityModelDesc'),
      href: '/recursos/wiki/cloud/cloud-security-model',
      icon: Shield,
      difficulty: 'Intermedio' as const,
      readTime: '10 min',
      popularity: 5,
      gradient: 'from-blue-500 to-blue-600'
    },
    {
      title: t('wikiArticleCloudSecurityToolsTitle'),
      description: t('wikiArticleCloudSecurityToolsDesc'),
      href: '/recursos/wiki/cloud/herramientas',
      icon: Cloud,
      difficulty: 'Básico' as const,
      readTime: '8 min',
      popularity: 4,
      gradient: 'from-cyan-500 to-cyan-600'
    },
    {
      title: t('wikiArticleCloudSecurityIaCTitle'),
      description: t('wikiArticleCloudSecurityIaCDesc'),
      href: '/recursos/wiki/cloud/iac',
      icon: Code,
      difficulty: 'Avanzado' as const,
      readTime: '12 min',
      popularity: 5,
      gradient: 'from-green-500 to-green-600'
    },
    {
      title: t('wikiArticleCloudSecurityCICDTitle'),
      description: t('wikiArticleCloudSecurityCICDDesc'),
      href: '/recursos/wiki/cloud/cicd',
      icon: GitBranch,
      difficulty: 'Intermedio' as const,
      readTime: '9 min',
      popularity: 4,
      gradient: 'from-purple-500 to-purple-600'
    },
    {
      title: t('wikiArticleCloudSecurityIAMTitle'),
      description: t('wikiArticleCloudSecurityIAMDesc'),
      href: '/recursos/wiki/cloud/iam',
      icon: Users,
      difficulty: 'Intermedio' as const,
      readTime: '11 min',
      popularity: 5,
      gradient: 'from-indigo-500 to-indigo-600'
    },
    {
      title: t('wikiArticleCloudSecurityNetworkTitle'),
      description: t('wikiArticleCloudSecurityNetworkDesc'),
      href: '/recursos/wiki/cloud/redes',
      icon: Network,
      difficulty: 'Avanzado' as const,
      readTime: '13 min',
      popularity: 4,
      gradient: 'from-teal-500 to-teal-600'
    },
    {
      title: t('wikiArticleCloudSecurityMonitoringTitle'),
      description: t('wikiArticleCloudSecurityMonitoringDesc'),
      href: '/recursos/wiki/cloud/monitoreo',
      icon: Activity,
      difficulty: 'Intermedio' as const,
      readTime: '10 min',
      popularity: 5,
      gradient: 'from-orange-500 to-orange-600'
    },
    {
      title: t('wikiArticleCloudSecurityAutomationTitle'),
      description: t('wikiArticleCloudSecurityAutomationDesc'),
      href: '/recursos/wiki/cloud/automation',
      icon: Zap,
      difficulty: 'Avanzado' as const,
      readTime: '14 min',
      popularity: 4,
      gradient: 'from-yellow-500 to-yellow-600'
    },
    {
      title: t('wikiArticleCloudSecurityImmutableTitle'),
      description: t('wikiArticleCloudSecurityImmutableDesc'),
      href: '/recursos/wiki/cloud/infraestructura',
      icon: Lock,
      difficulty: 'Avanzado' as const,
      readTime: '11 min',
      popularity: 3,
      gradient: 'from-gray-500 to-gray-600'
    },
    {
      title: t('wikiArticleCloudSecurityConfidentialTitle'),
      description: t('wikiArticleCloudSecurityConfidentialDesc'),
      href: '/recursos/wiki/cloud/confidential',
      icon: Eye,
      difficulty: 'Avanzado' as const,
      readTime: '15 min',
      popularity: 3,
      gradient: 'from-pink-500 to-pink-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <BackButton href="/recursos/wiki" className="mb-6" />
        
        {/* Hero Section */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center justify-center p-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl mb-6">
            <CloudSnow className="h-12 w-12 text-white" />
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            {t('wikiCategoryCloud')}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Guías completas para implementar y mantener la seguridad en entornos cloud.
            Desde los fundamentos hasta las técnicas más avanzadas de protección.
          </p>
          
          {/* Stats */}
          <div className="flex justify-center items-center mt-8 space-x-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">{articles.length}</div>
              <div className="text-sm text-gray-500">Temas Cubiertos</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center text-yellow-500 mb-1">
                <TrendingUp className="h-5 w-5 mr-1" />
                <span className="text-3xl font-bold text-gray-900">100%</span>
              </div>
              <div className="text-sm text-gray-500">Cobertura Cloud</div>
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
            ¿Migrando a la nube?
          </h2>
          <p className="text-gray-600 mb-6">
            Nuestros consultores especializados te ayudan a diseñar una arquitectura cloud segura desde el primer día.
          </p>
          <div className="flex justify-center space-x-4">
            <button className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-600 hover:to-cyan-600 transition-all duration-300">
              Consultoría Cloud
            </button>
            <button className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-all duration-300">
              Auditoría Gratuita
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
