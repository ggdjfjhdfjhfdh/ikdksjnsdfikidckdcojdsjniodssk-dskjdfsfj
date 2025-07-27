'use client';

import ArticleCard from '@/components/wiki/ArticleCard';
import BackButton from '@/components/BackButton';
import { useI18n } from '@/lib/LanguageContext';
import { 
  Shield, 
  Package, 
  Server, 
  Upload, 
  ExternalLink, 
  Key, 
  FileText, 
  Database, 
  Eye, 
  TestTube, 
  Search,
  Globe,
  TrendingUp
} from 'lucide-react';

export default function WebSecurityPage() {
  const { t } = useI18n();

  const articles = [
    {
      title: 'OWASP Top 10',
      description: 'Las 10 vulnerabilidades web más críticas',
      href: '/recursos/wiki/web/owasp-top10',
      icon: Shield,
      difficulty: 'Básico' as const,
      readTime: '20 min',
      popularity: 5,
      gradient: 'from-red-500 to-red-600'
    },
    {
      title: 'Deserialización',
      description: 'Vulnerabilidades en deserialización de objetos',
      href: '/recursos/wiki/web/deserializacion',
      icon: Package,
      difficulty: 'Avanzado' as const,
      readTime: '16 min',
      popularity: 3,
      gradient: 'from-purple-500 to-purple-600'
    },
    {
      title: 'SSRF',
      description: 'Server-Side Request Forgery',
      href: '/recursos/wiki/web/ssrf',
      icon: Server,
      difficulty: 'Avanzado' as const,
      readTime: '14 min',
      popularity: 4,
      gradient: 'from-orange-500 to-orange-600'
    },
    {
      title: 'File Upload',
      description: 'Vulnerabilidades en subida de archivos',
      href: '/recursos/wiki/web/file-upload',
      icon: Upload,
      difficulty: 'Intermedio' as const,
      readTime: '12 min',
      popularity: 4,
      gradient: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Open Redirect',
      description: 'Redirecciones abiertas y phishing',
      href: '/recursos/wiki/web/open-redirect',
      icon: ExternalLink,
      difficulty: 'Intermedio' as const,
      readTime: '10 min',
      popularity: 3,
      gradient: 'from-green-500 to-green-600'
    },
    {
      title: 'JWT Security',
      description: 'Seguridad en JSON Web Tokens',
      href: '/recursos/wiki/web/jwt-security',
      icon: Key,
      difficulty: 'Avanzado' as const,
      readTime: '15 min',
      popularity: 5,
      gradient: 'from-indigo-500 to-indigo-600'
    },
    {
      title: 'Security Headers',
      description: 'Cabeceras de seguridad HTTP',
      href: '/recursos/wiki/web/security-headers',
      icon: FileText,
      difficulty: 'Intermedio' as const,
      readTime: '13 min',
      popularity: 4,
      gradient: 'from-teal-500 to-teal-600'
    },
    {
      title: 'GraphQL Security',
      description: 'Seguridad en APIs GraphQL',
      href: '/recursos/wiki/web/graphql',
      icon: Database,
      difficulty: 'Avanzado' as const,
      readTime: '17 min',
      popularity: 3,
      gradient: 'from-pink-500 to-pink-600'
    },
    {
      title: 'RASP',
      description: 'Runtime Application Self-Protection',
      href: '/recursos/wiki/web/rasp',
      icon: Eye,
      difficulty: 'Avanzado' as const,
      readTime: '14 min',
      popularity: 3,
      gradient: 'from-yellow-500 to-yellow-600'
    },
    {
      title: 'Security Testing',
      description: 'SAST, DAST, IAST y testing de seguridad',
      href: '/recursos/wiki/web/security-testing',
      icon: TestTube,
      difficulty: 'Intermedio' as const,
      readTime: '18 min',
      popularity: 4,
      gradient: 'from-cyan-500 to-cyan-600'
    },
    {
      title: 'SCA & SBOM',
      description: 'Análisis de componentes y SBOM',
      href: '/recursos/wiki/web/sca-sbom',
      icon: Search,
      difficulty: 'Intermedio' as const,
      readTime: '16 min',
      popularity: 4,
      gradient: 'from-violet-500 to-violet-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <BackButton href="/recursos/wiki" />
        
        {/* Hero Section */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center justify-center p-4 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl mb-6">
            <Globe className="h-12 w-12 text-white" />
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Seguridad Web
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Vulnerabilidades, técnicas de explotación y defensas para aplicaciones web.
            Desde OWASP Top 10 hasta técnicas avanzadas como SSRF y deserialización.
          </p>
          
          {/* Stats */}
          <div className="flex justify-center items-center mt-8 space-x-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600">{articles.length}</div>
              <div className="text-sm text-gray-500">Vulnerabilidades Web</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center text-yellow-500 mb-1">
                <TrendingUp className="h-5 w-5 mr-1" />
                <span className="text-3xl font-bold text-gray-900">DevSecOps</span>
              </div>
              <div className="text-sm text-gray-500">Integración</div>
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
            ¿Necesitas auditoría de seguridad web?
          </h2>
          <p className="text-gray-600 mb-6">
            Realizamos pentesting de aplicaciones web, revisiones de código y implementación de pipelines DevSecOps.
          </p>
          <div className="flex justify-center space-x-4">
            <button className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-lg font-medium hover:from-orange-600 hover:to-red-600 transition-all duration-300">
              Pentesting Web
            </button>
            <button className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-all duration-300">
              Code Review
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
