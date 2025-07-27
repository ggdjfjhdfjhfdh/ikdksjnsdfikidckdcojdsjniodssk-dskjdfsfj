'use client';

import ArticleCard from '@/components/wiki/ArticleCard';
import BackButton from '@/components/BackButton';
import { useI18n } from '@/lib/LanguageContext';
import { 
  Shield, 
  Bug, 
  Lock, 
  Key, 
  Eye, 
  Network, 
  Database, 
  Fingerprint,
  BookOpen,
  TrendingUp
} from 'lucide-react';

const articles = [
  {
    title: '¿Qué es un Firewall?',
    description: 'Explicación sobre sistemas de protección perimetral y filtrado de tráfico de red.',
    href: '/recursos/wiki/conceptos/firewall',
    icon: Shield,
    difficulty: 'Básico' as const,
    readTime: '5 min',
    popularity: 5,
    gradient: 'from-blue-500 to-blue-600'
  },
  {
    title: 'Tipos de Malware',
    description: 'Guía completa sobre virus, ransomware y otras amenazas de software malicioso.',
    href: '/recursos/wiki/conceptos/malware',
    icon: Bug,
    difficulty: 'Intermedio' as const,
    readTime: '8 min',
    popularity: 5,
    gradient: 'from-red-500 to-red-600'
  },
  {
    title: 'Encriptación 101',
    description: 'Fundamentos de cifrado de datos y protección de información sensible.',
    href: '/recursos/wiki/conceptos/encryption',
    icon: Lock,
    difficulty: 'Básico' as const,
    readTime: '6 min',
    popularity: 4,
    gradient: 'from-green-500 to-green-600'
  },
  {
    title: 'Autenticación y Autorización',
    description: 'Diferencias entre verificar identidad y otorgar permisos de acceso.',
    href: '/recursos/wiki/conceptos/auth',
    icon: Key,
    difficulty: 'Básico' as const,
    readTime: '7 min',
    popularity: 4,
    gradient: 'from-purple-500 to-purple-600'
  },
  {
    title: 'Privacidad de Datos',
    description: 'Principios fundamentales para proteger la información personal.',
    href: '/recursos/wiki/conceptos/privacy',
    icon: Eye,
    difficulty: 'Básico' as const,
    readTime: '5 min',
    popularity: 4,
    gradient: 'from-indigo-500 to-indigo-600'
  },
  {
    title: 'Seguridad de Redes',
    description: 'Conceptos básicos de protección en comunicaciones de red.',
    href: '/recursos/wiki/conceptos/network-security',
    icon: Network,
    difficulty: 'Intermedio' as const,
    readTime: '9 min',
    popularity: 4,
    gradient: 'from-teal-500 to-teal-600'
  },
  {
    title: 'Backup y Recuperación',
    description: 'Estrategias para proteger y recuperar información crítica.',
    href: '/recursos/wiki/conceptos/backup',
    icon: Database,
    difficulty: 'Básico' as const,
    readTime: '6 min',
    popularity: 5,
    gradient: 'from-orange-500 to-orange-600'
  },
  {
    title: 'Biometría y Seguridad',
    description: 'Uso de características físicas para autenticación segura.',
    href: '/recursos/wiki/conceptos/biometrics',
    icon: Fingerprint,
    difficulty: 'Intermedio' as const,
    readTime: '8 min',
    popularity: 3,
    gradient: 'from-pink-500 to-pink-600'
  }
];

export default function ConceptosPage() {
  const { t } = useI18n();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <BackButton href="/recursos/wiki" />
        
        {/* Hero Section */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center justify-center p-4 bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl mb-6">
            <BookOpen className="h-12 w-12 text-white" />
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Conceptos Básicos
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Fundamentos de seguridad informática explicados de forma sencilla.
            Construye una base sólida de conocimientos en ciberseguridad.
          </p>
          
          {/* Stats */}
          <div className="flex justify-center items-center mt-8 space-x-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">{articles.length}</div>
              <div className="text-sm text-gray-500">Conceptos Fundamentales</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center text-yellow-500 mb-1">
                <TrendingUp className="h-5 w-5 mr-1" />
                <span className="text-3xl font-bold text-gray-900">90%</span>
              </div>
              <div className="text-sm text-gray-500">Nivel Principiante</div>
            </div>
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <ArticleCard
              key={index}
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
            ¿Nuevo en ciberseguridad?
          </h2>
          <p className="text-gray-600 mb-6">
            Comienza tu viaje en seguridad informática con nuestros cursos básicos diseñados para principiantes.
          </p>
          <div className="flex justify-center space-x-4">
            <button className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-6 py-3 rounded-lg font-medium hover:from-green-600 hover:to-blue-600 transition-all duration-300">
              Curso Básico
            </button>
            <button className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-all duration-300">
              Guía de Inicio
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
