'use client';

import ArticleCard from '@/components/wiki/ArticleCard';
import BackButton from '@/components/BackButton';
import { useI18n } from '@/lib/LanguageContext';
import { 
  Camera, 
  Thermometer, 
  FileText, 
  RotateCcw, 
  AlertTriangle, 
  Users,
  Building,
  TrendingUp
} from 'lucide-react';

export default function FisicaPage() {
  const { t } = useI18n();

  const articles = [
    {
      title: 'Controles Físicos',
      description: 'CCTV, Mantrap, Cerraduras Biométricas',
      href: '/recursos/wiki/fisica/controles-fisicos',
      icon: Camera,
      difficulty: 'Intermedio' as const,
      readTime: '12 min',
      popularity: 4,
      gradient: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Seguridad Ambiental',
      description: 'UPS, HVAC, Detectores',
      href: '/recursos/wiki/fisica/seguridad-ambiental',
      icon: Thermometer,
      difficulty: 'Básico' as const,
      readTime: '10 min',
      popularity: 3,
      gradient: 'from-green-500 to-green-600'
    },
    {
      title: 'BCP',
      description: 'Business Continuity Plan',
      href: '/recursos/wiki/fisica/bcp',
      icon: FileText,
      difficulty: 'Avanzado' as const,
      readTime: '18 min',
      popularity: 5,
      gradient: 'from-purple-500 to-purple-600'
    },
    {
      title: 'DRP',
      description: 'Disaster Recovery Plan',
      href: '/recursos/wiki/fisica/drp',
      icon: RotateCcw,
      difficulty: 'Avanzado' as const,
      readTime: '16 min',
      popularity: 5,
      gradient: 'from-red-500 to-red-600'
    },
    {
      title: 'Gestión de Crisis',
      description: 'Protocolos y Comunicación',
      href: '/recursos/wiki/fisica/gestion-crisis',
      icon: AlertTriangle,
      difficulty: 'Intermedio' as const,
      readTime: '14 min',
      popularity: 4,
      gradient: 'from-orange-500 to-orange-600'
    },
    {
      title: 'Ejercicios de Mesa',
      description: 'Simulacros y pruebas',
      href: '/recursos/wiki/fisica/ejercicios-mesa',
      icon: Users,
      difficulty: 'Intermedio' as const,
      readTime: '11 min',
      popularity: 4,
      gradient: 'from-teal-500 to-teal-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <BackButton href="/recursos/wiki" />
        
        {/* Hero Section */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center justify-center p-4 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl mb-6">
            <Building className="h-12 w-12 text-white" />
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Seguridad Física & Continuidad
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Protección integral de instalaciones y continuidad del negocio. Desde controles físicos
            hasta planes de recuperación ante desastres.
          </p>
          
          {/* Stats */}
          <div className="flex justify-center items-center mt-8 space-x-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-amber-600">{articles.length}</div>
              <div className="text-sm text-gray-500">Áreas de Control</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center text-yellow-500 mb-1">
                <TrendingUp className="h-5 w-5 mr-1" />
                <span className="text-3xl font-bold text-gray-900">99.9%</span>
              </div>
              <div className="text-sm text-gray-500">Disponibilidad Objetivo</div>
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
            ¿Necesitas un plan de continuidad?
          </h2>
          <p className="text-gray-600 mb-6">
            Desarrollamos planes BCP/DRP personalizados y evaluamos la seguridad física de tus instalaciones.
          </p>
          <div className="flex justify-center space-x-4">
            <button className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-3 rounded-lg font-medium hover:from-amber-600 hover:to-orange-600 transition-all duration-300">
              Consultoría BCP/DRP
            </button>
            <button className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-all duration-300">
              Auditoría Física
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
