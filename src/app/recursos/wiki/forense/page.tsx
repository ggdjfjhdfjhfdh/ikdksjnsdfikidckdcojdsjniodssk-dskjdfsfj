'use client';

import ArticleCard from '@/components/wiki/ArticleCard';
import BackButton from '@/components/BackButton';
import { useI18n } from '@/lib/LanguageContext';
import { 
  Link, 
  HardDrive, 
  Cpu, 
  Clock, 
  Monitor, 
  Cloud, 
  Lock, 
  FileText,
  Search,
  TrendingUp
} from 'lucide-react';

export default function ForensePage() {
  const { t } = useI18n();

  const articles = [
    {
      title: 'Cadena de Custodia',
      description: 'Manejo legal de evidencia digital',
      href: '/recursos/wiki/forense/cadena-custodia',
      icon: Link,
      difficulty: 'Básico' as const,
      readTime: '8 min',
      popularity: 5,
      gradient: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Disk Imaging',
      description: 'Adquisición forense con write-blocking',
      href: '/recursos/wiki/forense/disk-imaging',
      icon: HardDrive,
      difficulty: 'Intermedio' as const,
      readTime: '12 min',
      popularity: 4,
      gradient: 'from-green-500 to-green-600'
    },
    {
      title: 'Memory Forensics',
      description: 'Análisis de memoria con Volatility/Rekall',
      href: '/recursos/wiki/forense/memory-forensics',
      icon: Cpu,
      difficulty: 'Avanzado' as const,
      readTime: '16 min',
      popularity: 4,
      gradient: 'from-purple-500 to-purple-600'
    },
    {
      title: 'Timeline Analysis',
      description: 'Creación de líneas de tiempo forenses',
      href: '/recursos/wiki/forense/timeline',
      icon: Clock,
      difficulty: 'Intermedio' as const,
      readTime: '14 min',
      popularity: 4,
      gradient: 'from-orange-500 to-orange-600'
    },
    {
      title: 'Artefactos Windows',
      description: 'ShimCache, AmCache y otros artefactos',
      href: '/recursos/wiki/forense/artefactos-windows',
      icon: Monitor,
      difficulty: 'Avanzado' as const,
      readTime: '18 min',
      popularity: 3,
      gradient: 'from-indigo-500 to-indigo-600'
    },
    {
      title: 'Cloud Forensics',
      description: 'AWS, Azure y GCP',
      href: '/recursos/wiki/forense/cloud-forensics',
      icon: Cloud,
      difficulty: 'Avanzado' as const,
      readTime: '15 min',
      popularity: 3,
      gradient: 'from-teal-500 to-teal-600'
    },
    {
      title: 'Ransomware Analysis',
      description: 'Análisis y flujo de decryptores',
      href: '/recursos/wiki/forense/ransomware',
      icon: Lock,
      difficulty: 'Avanzado' as const,
      readTime: '20 min',
      popularity: 5,
      gradient: 'from-red-500 to-red-600'
    },
    {
      title: 'Informe Forense',
      description: 'Evidencia legal y reportes',
      href: '/recursos/wiki/forense/informe',
      icon: FileText,
      difficulty: 'Intermedio' as const,
      readTime: '10 min',
      popularity: 4,
      gradient: 'from-yellow-500 to-yellow-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <BackButton href="/recursos/wiki" />
        
        {/* Hero Section */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center justify-center p-4 bg-gradient-to-r from-gray-600 to-slate-600 rounded-2xl mb-6">
            <Search className="h-12 w-12 text-white" />
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Forense Digital
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Técnicas avanzadas de investigación digital. Desde la adquisición de evidencia
            hasta el análisis forense en entornos cloud y sistemas comprometidos.
          </p>
          
          {/* Stats */}
          <div className="flex justify-center items-center mt-8 space-x-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-600">{articles.length}</div>
              <div className="text-sm text-gray-500">Técnicas Forenses</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center text-yellow-500 mb-1">
                <TrendingUp className="h-5 w-5 mr-1" />
                <span className="text-3xl font-bold text-gray-900">100%</span>
              </div>
              <div className="text-sm text-gray-500">Admisibilidad Legal</div>
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
            ¿Necesitas investigación forense?
          </h2>
          <p className="text-gray-600 mb-6">
            Nuestros expertos certificados realizan análisis forense digital con validez legal y metodología probada.
          </p>
          <div className="flex justify-center space-x-4">
            <button className="bg-gradient-to-r from-gray-600 to-slate-600 text-white px-6 py-3 rounded-lg font-medium hover:from-gray-700 hover:to-slate-700 transition-all duration-300">
              Servicios Forenses
            </button>
            <button className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-all duration-300">
              Consulta Urgente
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
