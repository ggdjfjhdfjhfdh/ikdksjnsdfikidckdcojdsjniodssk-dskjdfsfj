'use client';

import ArticleCard from '@/components/wiki/ArticleCard';
import BackButton from '@/components/BackButton';
import { useI18n } from '@/lib/LanguageContext';
import { 
  Monitor, 
  Smartphone, 
  Shield, 
  CheckCircle, 
  Usb, 
  Factory, 
  Car, 
  Download,
  Laptop,
  TrendingUp
} from 'lucide-react';

export default function EndpointPage() {
  const { t } = useI18n();

  const articles = [
    {
      title: t('wikiArticleEndpointSecurityEDRTitle'),
      description: t('wikiArticleEndpointSecurityEDRDesc'),
      href: '/recursos/wiki/endpoint/edr-xdr',
      icon: Monitor,
      difficulty: 'Avanzado' as const,
      readTime: '14 min',
      popularity: 5,
      gradient: 'from-red-500 to-red-600'
    },
    {
      title: t('wikiArticleEndpointSecurityMDMTitle'),
      description: t('wikiArticleEndpointSecurityMDMDesc'),
      href: '/recursos/wiki/endpoint/mdm',
      icon: Smartphone,
      difficulty: 'Intermedio' as const,
      readTime: '10 min',
      popularity: 4,
      gradient: 'from-blue-500 to-blue-600'
    },
    {
      title: t('wikiArticleEndpointSecurityApplicationControlTitle'),
      description: t('wikiArticleEndpointSecurityApplicationControlDesc'),
      href: '/recursos/wiki/endpoint/app-control',
      icon: Shield,
      difficulty: 'Intermedio' as const,
      readTime: '12 min',
      popularity: 4,
      gradient: 'from-green-500 to-green-600'
    },
    {
      title: t('wikiArticleEndpointSecurityCISBenchmarksTitle'),
      description: t('wikiArticleEndpointSecurityCISBenchmarksDesc'),
      href: '/recursos/wiki/endpoint/cis-benchmarks',
      icon: CheckCircle,
      difficulty: 'Intermedio' as const,
      readTime: '11 min',
      popularity: 4,
      gradient: 'from-purple-500 to-purple-600'
    },
    {
      title: t('wikiArticleEndpointSecurityDeviceControlTitle'),
      description: t('wikiArticleEndpointSecurityDeviceControlDesc'),
      href: '/recursos/wiki/endpoint/device-control',
      icon: Usb,
      difficulty: 'Básico' as const,
      readTime: '8 min',
      popularity: 3,
      gradient: 'from-orange-500 to-orange-600'
    },
    {
      title: t('wikiArticleEndpointSecuritySCADATitle'),
      description: t('wikiArticleEndpointSecuritySCADADesc'),
      href: '/recursos/wiki/endpoint/scada',
      icon: Factory,
      difficulty: 'Avanzado' as const,
      readTime: '16 min',
      popularity: 3,
      gradient: 'from-indigo-500 to-indigo-600'
    },
    {
      title: t('wikiArticleEndpointSecurityCANBusTitle'),
      description: t('wikiArticleEndpointSecurityCANBusDesc'),
      href: '/recursos/wiki/endpoint/can-bus',
      icon: Car,
      difficulty: 'Avanzado' as const,
      readTime: '13 min',
      popularity: 2,
      gradient: 'from-teal-500 to-teal-600'
    },
    {
      title: t('wikiArticleEndpointSecurityPatchManagementTitle'),
      description: t('wikiArticleEndpointSecurityPatchManagementDesc'),
      href: '/recursos/wiki/endpoint/patch-management',
      icon: Download,
      difficulty: 'Básico' as const,
      readTime: '9 min',
      popularity: 5,
      gradient: 'from-yellow-500 to-yellow-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <BackButton href="/recursos/wiki" />
        
        {/* Hero Section */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center justify-center p-4 bg-gradient-to-r from-slate-600 to-gray-600 rounded-2xl mb-6">
            <Laptop className="h-12 w-12 text-white" />
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            {t('wikiCategoryEndpoint')}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Protección integral de dispositivos finales. Desde EDR hasta gestión de dispositivos móviles,
            aprende a asegurar todos los puntos de acceso a tu red.
          </p>
          
          {/* Stats */}
          <div className="flex justify-center items-center mt-8 space-x-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-slate-600">{articles.length}</div>
              <div className="text-sm text-gray-500">Tecnologías Cubiertas</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center text-yellow-500 mb-1">
                <TrendingUp className="h-5 w-5 mr-1" />
                <span className="text-3xl font-bold text-gray-900">95%</span>
              </div>
              <div className="text-sm text-gray-500">Cobertura Endpoint</div>
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
            ¿Necesitas proteger tus endpoints?
          </h2>
          <p className="text-gray-600 mb-6">
            Implementamos soluciones EDR/XDR y estrategias de seguridad endpoint adaptadas a tu infraestructura.
          </p>
          <div className="flex justify-center space-x-4">
            <button className="bg-gradient-to-r from-slate-600 to-gray-600 text-white px-6 py-3 rounded-lg font-medium hover:from-slate-700 hover:to-gray-700 transition-all duration-300">
              Consultoría Endpoint
            </button>
            <button className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-all duration-300">
              Assessment Gratuito
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
