'use client';

import ArticleCard from '@/components/wiki/ArticleCard';
import BackButton from '@/components/BackButton';
import { useI18n } from '@/lib/LanguageContext';
import { 
  Users, 
  Shield, 
  Fingerprint, 
  Key, 
  Link, 
  Settings, 
  Crown, 
  Clock, 
  Eye, 
  UserCheck,
  UserCog,
  TrendingUp
} from 'lucide-react';

export default function IdentityIndexPage() {
  const { t } = useI18n();

  const articles = [
    {
      title: 'IAM',
      description: 'Gestión de identidades y accesos',
      href: '/recursos/wiki/identidad/iam',
      icon: Users,
      difficulty: 'Intermedio' as const,
      readTime: '12 min',
      popularity: 5,
      gradient: 'from-blue-500 to-blue-600'
    },
    {
      title: 'MFA',
      description: 'Autenticación Multifactor',
      href: '/recursos/wiki/identidad/mfa',
      icon: Shield,
      difficulty: 'Básico' as const,
      readTime: '8 min',
      popularity: 5,
      gradient: 'from-green-500 to-green-600'
    },
    {
      title: 'Passwordless',
      description: 'Autenticación sin contraseñas',
      href: '/recursos/wiki/identidad/passwordless',
      icon: Fingerprint,
      difficulty: 'Avanzado' as const,
      readTime: '14 min',
      popularity: 4,
      gradient: 'from-purple-500 to-purple-600'
    },
    {
      title: 'OAuth 2.0 & OIDC',
      description: 'Estándares de autorización',
      href: '/recursos/wiki/identidad/oauth',
      icon: Key,
      difficulty: 'Avanzado' as const,
      readTime: '16 min',
      popularity: 4,
      gradient: 'from-orange-500 to-orange-600'
    },
    {
      title: 'SAML',
      description: 'Federación de identidad',
      href: '/recursos/wiki/identidad/saml',
      icon: Link,
      difficulty: 'Avanzado' as const,
      readTime: '15 min',
      popularity: 3,
      gradient: 'from-indigo-500 to-indigo-600'
    },
    {
      title: 'Conditional Access',
      description: 'Políticas de acceso condicional',
      href: '/recursos/wiki/identidad/conditional-access',
      icon: Settings,
      difficulty: 'Intermedio' as const,
      readTime: '11 min',
      popularity: 4,
      gradient: 'from-teal-500 to-teal-600'
    },
    {
      title: 'PAM',
      description: 'Gestión de acceso privilegiado',
      href: '/recursos/wiki/identidad/pam',
      icon: Crown,
      difficulty: 'Avanzado' as const,
      readTime: '18 min',
      popularity: 4,
      gradient: 'from-red-500 to-red-600'
    },
    {
      title: 'JIT Access',
      description: 'Acceso justo a tiempo',
      href: '/recursos/wiki/identidad/jit-access',
      icon: Clock,
      difficulty: 'Intermedio' as const,
      readTime: '10 min',
      popularity: 3,
      gradient: 'from-yellow-500 to-yellow-600'
    },
    {
      title: 'ITDR',
      description: 'Detección de amenazas en identidad',
      href: '/recursos/wiki/identidad/itdr',
      icon: Eye,
      difficulty: 'Avanzado' as const,
      readTime: '13 min',
      popularity: 3,
      gradient: 'from-pink-500 to-pink-600'
    },
    {
      title: 'Gestión de Sesiones',
      description: 'Control y revocación de sesiones',
      href: '/recursos/wiki/identidad/sesiones',
      icon: UserCheck,
      difficulty: 'Intermedio' as const,
      readTime: '9 min',
      popularity: 4,
      gradient: 'from-cyan-500 to-cyan-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <BackButton href="/recursos/wiki" />
        
        {/* Hero Section */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center justify-center p-4 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl mb-6">
            <UserCog className="h-12 w-12 text-white" />
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Gestión de Identidad
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Tecnologías y estrategias para la gestión segura de identidades y accesos.
            Desde IAM hasta autenticación sin contraseñas y acceso privilegiado.
          </p>
          
          {/* Stats */}
          <div className="flex justify-center items-center mt-8 space-x-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-indigo-600">{articles.length}</div>
              <div className="text-sm text-gray-500">Tecnologías IAM</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center text-yellow-500 mb-1">
                <TrendingUp className="h-5 w-5 mr-1" />
                <span className="text-3xl font-bold text-gray-900">Zero Trust</span>
              </div>
              <div className="text-sm text-gray-500">Arquitectura</div>
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
            ¿Necesitas implementar Zero Trust?
          </h2>
          <p className="text-gray-600 mb-6">
            Diseñamos e implementamos arquitecturas de identidad modernas con enfoque Zero Trust y mejores prácticas de seguridad.
          </p>
          <div className="flex justify-center space-x-4">
            <button className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-3 rounded-lg font-medium hover:from-indigo-600 hover:to-purple-600 transition-all duration-300">
              Consultoría IAM
            </button>
            <button className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-all duration-300">
              Assessment Identidad
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
