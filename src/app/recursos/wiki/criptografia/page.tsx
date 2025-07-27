'use client';

import ArticleCard from '@/components/wiki/ArticleCard';
import BackButton from '@/components/BackButton';
import { useI18n } from '@/lib/LanguageContext';
import { 
  Lock, 
  Key, 
  Shield, 
  Hash, 
  RefreshCw, 
  FileText, 
  Shuffle, 
  Users, 
  Fingerprint,
  KeyRound,
  TrendingUp
} from 'lucide-react';

export default function CriptografiaPage() {
  const { t } = useI18n();

  const articles = [
    {
      title: t('wikiArticleSymmetricTitle'),
      description: t('wikiArticleSymmetricDesc'),
      href: '/recursos/wiki/criptografia/simetrica',
      icon: Lock,
      difficulty: 'Intermedio' as const,
      readTime: '10 min',
      popularity: 4,
      gradient: 'from-purple-500 to-purple-600'
    },
    {
      title: t('wikiArticleModosCifradoTitle'),
      description: t('wikiArticleModosCifradoDesc'),
      href: '/recursos/wiki/criptografia/modos-cifrado',
      icon: Shuffle,
      difficulty: 'Avanzado' as const,
      readTime: '12 min',
      popularity: 3,
      gradient: 'from-indigo-500 to-indigo-600'
    },
    {
      title: t('wikiArticleProtocolosTitle'),
      description: t('wikiArticleProtocolosDesc'),
      href: '/recursos/wiki/criptografia/protocolos',
      icon: Shield,
      difficulty: 'Intermedio' as const,
      readTime: '11 min',
      popularity: 4,
      gradient: 'from-blue-500 to-blue-600'
    },
    {
      title: t('wikiArticleHashingTitle'),
      description: t('wikiArticleHashingDesc'),
      href: '/recursos/wiki/criptografia/hashing',
      icon: Hash,
      difficulty: 'Básico' as const,
      readTime: '8 min',
      popularity: 5,
      gradient: 'from-green-500 to-green-600'
    },
    {
      title: t('wikiArticlePfsTitle'),
      description: t('wikiArticlePfsDesc'),
      href: '/recursos/wiki/criptografia/pfs',
      icon: RefreshCw,
      difficulty: 'Avanzado' as const,
      readTime: '13 min',
      popularity: 3,
      gradient: 'from-teal-500 to-teal-600'
    },
    {
      title: t('wikiArticlePkiTitle'),
      description: t('wikiArticlePkiDesc'),
      href: '/recursos/wiki/criptografia/pki',
      icon: FileText,
      difficulty: 'Avanzado' as const,
      readTime: '15 min',
      popularity: 4,
      gradient: 'from-orange-500 to-orange-600'
    },
    {
      title: t('wikiArticleSaltingTitle'),
      description: t('wikiArticleSaltingDesc'),
      href: '/recursos/wiki/criptografia/salting',
      icon: KeyRound,
      difficulty: 'Intermedio' as const,
      readTime: '9 min',
      popularity: 4,
      gradient: 'from-yellow-500 to-yellow-600'
    },
    {
      title: t('wikiArticleModelosAccesoTitle'),
      description: t('wikiArticleModelosAccesoDesc'),
      href: '/recursos/wiki/criptografia/acceso',
      icon: Users,
      difficulty: 'Intermedio' as const,
      readTime: '10 min',
      popularity: 3,
      gradient: 'from-pink-500 to-pink-600'
    },
    {
      title: t('wikiArticleBiometriaTitle'),
      description: t('wikiArticleBiometriaDesc'),
      href: '/recursos/wiki/criptografia/biometria',
      icon: Fingerprint,
      difficulty: 'Avanzado' as const,
      readTime: '12 min',
      popularity: 3,
      gradient: 'from-gray-500 to-gray-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <BackButton href="/recursos/wiki" />
        
        {/* Hero Section */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center justify-center p-4 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-2xl mb-6">
            <Key className="h-12 w-12 text-white" />
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            {t('wikiCategoryCryptography')}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Domina los fundamentos de la criptografía moderna y las técnicas de cifrado.
            Desde algoritmos básicos hasta implementaciones avanzadas de seguridad.
          </p>
          
          {/* Stats */}
          <div className="flex justify-center items-center mt-8 space-x-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">{articles.length}</div>
              <div className="text-sm text-gray-500">Técnicas Criptográficas</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center text-yellow-500 mb-1">
                <TrendingUp className="h-5 w-5 mr-1" />
                <span className="text-3xl font-bold text-gray-900">85%</span>
              </div>
              <div className="text-sm text-gray-500">Nivel Avanzado</div>
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
            ¿Implementando criptografía?
          </h2>
          <p className="text-gray-600 mb-6">
            Nuestros especialistas en criptografía te ayudan a elegir e implementar las mejores soluciones de cifrado.
          </p>
          <div className="flex justify-center space-x-4">
            <button className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-6 py-3 rounded-lg font-medium hover:from-purple-600 hover:to-indigo-600 transition-all duration-300">
              Consultoría Crypto
            </button>
            <button className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-all duration-300">
              Auditoría de Cifrado
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
