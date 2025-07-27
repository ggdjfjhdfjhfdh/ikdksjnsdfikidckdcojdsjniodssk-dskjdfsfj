'use client';

import ArticleCard from '@/components/wiki/ArticleCard';
import BackButton from '@/components/BackButton';
import { useI18n } from '@/lib/LanguageContext';
import { 
  Shield, 
  FileCheck, 
  Heart, 
  Building, 
  Scale, 
  Globe, 
  Award, 
  Eye, 
  Network, 
  Banknote, 
  CreditCard, 
  MapPin, 
  Database,
  CheckCircle,
  TrendingUp
} from 'lucide-react';

export default function CumplimientoPage() {
  const { t } = useI18n();

  const articles = [
    {
      title: t('wikiArticleComplianceISO27002Title'),
      description: t('wikiArticleComplianceISO27002Desc'),
      href: '/recursos/wiki/cumplimiento/iso27002',
      icon: Shield,
      difficulty: 'Avanzado' as const,
      readTime: '15 min',
      popularity: 5,
      gradient: 'from-blue-500 to-blue-600'
    },
    {
      title: t('wikiArticleComplianceSOC2Title'),
      description: t('wikiArticleComplianceSOC2Desc'),
      href: '/recursos/wiki/cumplimiento/soc2',
      icon: FileCheck,
      difficulty: 'Intermedio' as const,
      readTime: '12 min',
      popularity: 4,
      gradient: 'from-green-500 to-green-600'
    },
    {
      title: t('wikiArticleComplianceHIPAATitle'),
      description: t('wikiArticleComplianceHIPAADesc'),
      href: '/recursos/wiki/cumplimiento/hipaa',
      icon: Heart,
      difficulty: 'Intermedio' as const,
      readTime: '11 min',
      popularity: 4,
      gradient: 'from-red-500 to-red-600'
    },
    {
      title: t('wikiArticleComplianceFedRAMPTitle'),
      description: t('wikiArticleComplianceFedRAMPDesc'),
      href: '/recursos/wiki/cumplimiento/fedramp',
      icon: Building,
      difficulty: 'Avanzado' as const,
      readTime: '14 min',
      popularity: 3,
      gradient: 'from-indigo-500 to-indigo-600'
    },
    {
      title: t('wikiArticleComplianceCCPA_CPRA'),
      description: t('wikiArticleComplianceCCPA_CPRADesc'),
      href: '/recursos/wiki/cumplimiento/ccpa-cpra',
      icon: Scale,
      difficulty: 'Intermedio' as const,
      readTime: '10 min',
      popularity: 4,
      gradient: 'from-purple-500 to-purple-600'
    },
    {
      title: t('wikiArticleComplianceGDPRTitle'),
      description: t('wikiArticleComplianceGDPRDesc'),
      href: '/recursos/wiki/cumplimiento/gdpr',
      icon: Globe,
      difficulty: 'Avanzado' as const,
      readTime: '16 min',
      popularity: 5,
      gradient: 'from-teal-500 to-teal-600'
    },
    {
      title: t('wikiArticleComplianceCMMCTitle'),
      description: t('wikiArticleComplianceCMMCDesc'),
      href: '/recursos/wiki/cumplimiento/cmmc',
      icon: Award,
      difficulty: 'Avanzado' as const,
      readTime: '13 min',
      popularity: 3,
      gradient: 'from-orange-500 to-orange-600'
    },
    {
      title: t('wikiArticleCompliancePrivacyByDesignTitle'),
      description: t('wikiArticleCompliancePrivacyByDesignDesc'),
      href: '/recursos/wiki/cumplimiento/privacy-design',
      icon: Eye,
      difficulty: 'Intermedio' as const,
      readTime: '9 min',
      popularity: 4,
      gradient: 'from-pink-500 to-pink-600'
    },
    {
      title: t('wikiArticleComplianceNIS2Title'),
      description: t('wikiArticleComplianceNIS2Desc'),
      href: '/recursos/wiki/cumplimiento/nis2',
      icon: Network,
      difficulty: 'Avanzado' as const,
      readTime: '12 min',
      popularity: 3,
      gradient: 'from-cyan-500 to-cyan-600'
    },
    {
      title: t('wikiArticleComplianceDORATitle'),
      description: t('wikiArticleComplianceDORADesc'),
      href: '/recursos/wiki/cumplimiento/dora',
      icon: Banknote,
      difficulty: 'Avanzado' as const,
      readTime: '11 min',
      popularity: 3,
      gradient: 'from-yellow-500 to-yellow-600'
    },
    {
      title: t('wikiArticleCompliancePCIDSSTitle'),
      description: t('wikiArticleCompliancePCIDSSDesc'),
      href: '/recursos/wiki/cumplimiento/pci-dss',
      icon: CreditCard,
      difficulty: 'Intermedio' as const,
      readTime: '10 min',
      popularity: 4,
      gradient: 'from-emerald-500 to-emerald-600'
    },
    {
      title: t('wikiArticleCompliancePOPIATitle'),
      description: t('wikiArticleCompliancePOPIADesc'),
      href: '/recursos/wiki/cumplimiento/popia',
      icon: MapPin,
      difficulty: 'Intermedio' as const,
      readTime: '8 min',
      popularity: 2,
      gradient: 'from-lime-500 to-lime-600'
    },
    {
      title: t('wikiArticleComplianceDataClassificationTitle'),
      description: t('wikiArticleComplianceDataClassificationDesc'),
      href: '/recursos/wiki/cumplimiento/data-classification',
      icon: Database,
      difficulty: 'Básico' as const,
      readTime: '7 min',
      popularity: 4,
      gradient: 'from-gray-500 to-gray-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <BackButton href="/recursos/wiki" />
        
        {/* Hero Section */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center justify-center p-4 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl mb-6">
            <CheckCircle className="h-12 w-12 text-white" />
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            {t('wikiCategoryCompliance')}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Guías completas sobre estándares de cumplimiento y regulaciones de seguridad.
            Mantén tu organización alineada con los marcos normativos más importantes.
          </p>
          
          {/* Stats */}
          <div className="flex justify-center items-center mt-8 space-x-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-600">{articles.length}</div>
              <div className="text-sm text-gray-500">Estándares Cubiertos</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center text-yellow-500 mb-1">
                <TrendingUp className="h-5 w-5 mr-1" />
                <span className="text-3xl font-bold text-gray-900">98%</span>
              </div>
              <div className="text-sm text-gray-500">Cobertura Normativa</div>
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
            ¿Necesitas certificarte?
          </h2>
          <p className="text-gray-600 mb-6">
            Nuestros consultores especializados te guían en el proceso de certificación y cumplimiento normativo.
          </p>
          <div className="flex justify-center space-x-4">
            <button className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-6 py-3 rounded-lg font-medium hover:from-emerald-600 hover:to-teal-600 transition-all duration-300">
              Consultoría Compliance
            </button>
            <button className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-all duration-300">
              Gap Analysis
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
