'use client';

import ArticleCard from '@/components/wiki/ArticleCard';
import BackButton from '@/components/BackButton';
import { useI18n } from '@/lib/LanguageContext';
import { 
  Database, 
  Target, 
  AlertTriangle, 
  Users, 
  Brain, 
  Search, 
  Zap, 
  BarChart3,
  Activity,
  TrendingUp
} from 'lucide-react';

export default function MonitorizacionPage() {
  const { t } = useI18n();

  const articles = [
    {
      title: 'SIEM & Log Management',
      description: 'Correlación de eventos y gestión de logs',
      href: '/recursos/wiki/monitorizacion/siem',
      icon: Database,
      difficulty: 'Intermedio' as const,
      readTime: '15 min',
      popularity: 5,
      gradient: 'from-blue-500 to-blue-600'
    },
    {
      title: 'MITRE ATT&CK & D3FEND',
      description: 'Marcos de referencia para detección',
      href: '/recursos/wiki/monitorizacion/mitre',
      icon: Target,
      difficulty: 'Avanzado' as const,
      readTime: '20 min',
      popularity: 5,
      gradient: 'from-red-500 to-red-600'
    },
    {
      title: 'IOC vs IOA',
      description: 'Indicadores de compromiso vs actividad',
      href: '/recursos/wiki/monitorizacion/ioc',
      icon: AlertTriangle,
      difficulty: 'Intermedio' as const,
      readTime: '12 min',
      popularity: 4,
      gradient: 'from-orange-500 to-orange-600'
    },
    {
      title: 'UEBA / NDR',
      description: 'Análisis de comportamiento y red',
      href: '/recursos/wiki/monitorizacion/ueba',
      icon: Users,
      difficulty: 'Avanzado' as const,
      readTime: '16 min',
      popularity: 4,
      gradient: 'from-purple-500 to-purple-600'
    },
    {
      title: 'Threat Intelligence',
      description: 'STIX/TAXII y feeds de inteligencia',
      href: '/recursos/wiki/monitorizacion/threat-intel',
      icon: Brain,
      difficulty: 'Avanzado' as const,
      readTime: '18 min',
      popularity: 4,
      gradient: 'from-indigo-500 to-indigo-600'
    },
    {
      title: 'Threat Hunting',
      description: 'Caza de amenazas y Purple Teaming',
      href: '/recursos/wiki/monitorizacion/threat-hunting',
      icon: Search,
      difficulty: 'Avanzado' as const,
      readTime: '22 min',
      popularity: 5,
      gradient: 'from-green-500 to-green-600'
    },
    {
      title: 'SOAR Playbooks',
      description: 'Automatización de respuesta',
      href: '/recursos/wiki/monitorizacion/soar',
      icon: Zap,
      difficulty: 'Avanzado' as const,
      readTime: '17 min',
      popularity: 4,
      gradient: 'from-yellow-500 to-yellow-600'
    },
    {
      title: 'Métricas de Respuesta',
      description: 'MTTD, MTTR y KPIs de seguridad',
      href: '/recursos/wiki/monitorizacion/metricas',
      icon: BarChart3,
      difficulty: 'Intermedio' as const,
      readTime: '14 min',
      popularity: 3,
      gradient: 'from-teal-500 to-teal-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <BackButton href="/recursos/wiki" />
        
        {/* Hero Section */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center justify-center p-4 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl mb-6">
            <Activity className="h-12 w-12 text-white" />
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Monitorización, Detección y Respuesta
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Tecnologías y metodologías para la detección temprana de amenazas y respuesta automatizada.
            Desde SIEM hasta threat hunting y marcos como MITRE ATT&CK.
          </p>
          
          {/* Stats */}
          <div className="flex justify-center items-center mt-8 space-x-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">{articles.length}</div>
              <div className="text-sm text-gray-500">Tecnologías MDR</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center text-yellow-500 mb-1">
                <TrendingUp className="h-5 w-5 mr-1" />
                <span className="text-3xl font-bold text-gray-900">24/7</span>
              </div>
              <div className="text-sm text-gray-500">Monitorización</div>
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
            ¿Necesitas un SOC 24/7?
          </h2>
          <p className="text-gray-600 mb-6">
            Implementamos centros de operaciones de seguridad con tecnologías SIEM/SOAR y servicios de threat hunting especializados.
          </p>
          <div className="flex justify-center space-x-4">
            <button className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-600 hover:to-indigo-600 transition-all duration-300">
              SOC as a Service
            </button>
            <button className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-all duration-300">
              Threat Hunting
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
