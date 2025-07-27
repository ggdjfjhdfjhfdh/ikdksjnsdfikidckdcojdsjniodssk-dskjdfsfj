'use client';

import ArticleCard from '@/components/wiki/ArticleCard';
import BackButton from '@/components/BackButton';
import { useI18n } from '@/lib/LanguageContext';
import { 
  Shield, 
  Lock, 
  Users, 
  Target, 
  TrendingUp, 
  Layers, 
  Eye, 
  BarChart3, 
  Key,
  BookOpen,
  Clock,
  Star,
  ArrowRight
} from 'lucide-react';
import Link from 'next/link';

export default function FundamentosPage() {
  const { t } = useI18n();
  
  const articles = [
    {
      title: t('wikiArticleZeroTrustTitle'),
      description: t('wikiArticleZeroTrustDesc'),
      href: '/recursos/wiki/fundamentos/zero-trust',
      icon: Shield,
      difficulty: 'Intermedio',
      readTime: '8 min',
      popularity: 95
    },
    {
      title: t('wikiArticleDefenseInDepthTitle'),
      description: t('wikiArticleDefenseInDepthDesc'),
      href: '/recursos/wiki/fundamentos/defense-in-depth',
      icon: Layers,
      difficulty: 'Básico',
      readTime: '6 min',
      popularity: 88
    },
    {
      title: t('wikiArticleLeastPrivilegeTitle'),
      description: t('wikiArticleLeastPrivilegeDesc'),
      href: '/recursos/wiki/fundamentos/minimo-privilegio',
      icon: Lock,
      difficulty: 'Básico',
      readTime: '5 min',
      popularity: 92
    },
    {
      title: t('wikiArticleAAAModelTitle'),
      description: t('wikiArticleAAAModelDesc'),
      href: '/recursos/wiki/fundamentos/modelo-aaa',
      icon: Users,
      difficulty: 'Intermedio',
      readTime: '7 min',
      popularity: 85
    },
    {
      title: t('wikiArticleRiskManagementTitle'),
      description: t('wikiArticleRiskManagementDesc'),
      href: '/recursos/wiki/fundamentos/gestion-riesgos',
      icon: TrendingUp,
      difficulty: 'Avanzado',
      readTime: '12 min',
      popularity: 78
    },
    {
      title: t('wikiArticleSecureByDesignTitle'),
      description: t('wikiArticleSecureByDesignDesc'),
      href: '/recursos/wiki/fundamentos/seguridad-diseno',
      icon: Target,
      difficulty: 'Intermedio',
      readTime: '9 min',
      popularity: 82
    },
    {
      title: t('wikiArticleAttackSurfaceTitle'),
      description: t('wikiArticleAttackSurfaceDesc'),
      href: '/recursos/wiki/fundamentos/superficie-ataque',
      icon: Eye,
      difficulty: 'Intermedio',
      readTime: '7 min',
      popularity: 75
    },
    {
      title: t('wikiArticleSecurityMetricsTitle'),
      description: t('wikiArticleSecurityMetricsDesc'),
      href: '/recursos/wiki/fundamentos/metricas-seguridad',
      icon: BarChart3,
      difficulty: 'Avanzado',
      readTime: '10 min',
      popularity: 70
    },
    {
      title: t('wikiArticleKerckhoffsTitle'),
      description: t('wikiArticleKerckhoffsDesc'),
      href: '/recursos/wiki/fundamentos/kerckhoffs',
      icon: Key,
      difficulty: 'Básico',
      readTime: '4 min',
      popularity: 68
    }
  ];

  // Función para obtener el color de la dificultad
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Básico': return 'bg-green-100 text-green-800';
      case 'Intermedio': return 'bg-yellow-100 text-yellow-800';
      case 'Avanzado': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <BackButton href="/recursos/wiki" className="mb-6" />
      
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-600 py-16">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center mb-6">
            <div className="p-4 bg-white/10 backdrop-blur-sm rounded-2xl mr-6">
              <Shield className="h-12 w-12 text-white" />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
                <span className="bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                  {t('wikiCategoryFundamentals')}
                </span>
              </h1>
              <p className="text-xl text-blue-100">
                Conceptos esenciales y principios fundamentales de la ciberseguridad
              </p>
            </div>
          </div>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-white">{articles.length}</div>
              <div className="text-blue-100">Artículos</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-white">
                {Math.round(articles.reduce((acc, article) => acc + article.popularity, 0) / articles.length)}%
              </div>
              <div className="text-blue-100">Popularidad</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-white">
                {Math.round(articles.reduce((acc, article) => acc + parseInt(article.readTime), 0) / articles.length)} min
              </div>
              <div className="text-blue-100">Tiempo promedio</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-white">100%</div>
              <div className="text-blue-100">Gratuito</div>
            </div>
          </div>
        </div>
      </div>

      {/* Articles Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Artículos Fundamentales
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Domina los conceptos básicos que todo profesional de ciberseguridad debe conocer
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map(({title, description, href, icon: Icon, difficulty, readTime, popularity}) => (
            <Link key={href} href={href}>
              <div className="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 overflow-hidden h-full">
                {/* Gradient Header */}
                <div className="h-2 bg-gradient-to-r from-blue-500 to-indigo-500"></div>
                
                <div className="p-6">
                  {/* Icon and Badges */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl group-hover:scale-110 transition-transform duration-300">
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(difficulty)}`}>
                        {difficulty}
                      </span>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-6 line-clamp-3">
                    {description}
                  </p>
                  
                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{readTime}</span>
                      </div>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 mr-1 text-yellow-400" />
                        <span>{popularity}%</span>
                      </div>
                    </div>
                    <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all duration-300" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-gray-900 to-blue-900 py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            ¿Quieres profundizar más?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Explora otras categorías de nuestra wiki para ampliar tus conocimientos
          </p>
          <Link 
            href="/recursos/wiki"
            className="inline-flex items-center px-8 py-4 bg-white text-gray-900 font-semibold rounded-xl hover:bg-gray-100 transition-colors duration-300 shadow-lg hover:shadow-xl"
          >
            <BookOpen className="h-5 w-5 mr-2" />
            Explorar todas las categorías
          </Link>
        </div>
      </div>
    </div>
  );
}
