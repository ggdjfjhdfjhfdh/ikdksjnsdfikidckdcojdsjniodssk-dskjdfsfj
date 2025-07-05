'use client';

import ArticleCard from '@/components/wiki/ArticleCard';
import BackButton from '@/components/BackButton';
import { useI18n } from '@/lib/i18n';

export default function CumplimientoPage() {
  const { t } = useI18n();

  const articles = [
    {
      title: t('wikiArticleComplianceISO27002Title'),
      description: t('wikiArticleComplianceISO27002Desc'),
      href: '/recursos/wiki/cumplimiento/iso27002'
    },
    {
      title: t('wikiArticleComplianceSOC2Title'),
      description: t('wikiArticleComplianceSOC2Desc'),
      href: '/recursos/wiki/cumplimiento/soc2'
    },
    {
      title: t('wikiArticleComplianceHIPAATitle'),
      description: t('wikiArticleComplianceHIPAADesc'),
      href: '/recursos/wiki/cumplimiento/hipaa'
    },
    {
      title: t('wikiArticleComplianceFedRAMPTitle'),
      description: t('wikiArticleComplianceFedRAMPDesc'),
      href: '/recursos/wiki/cumplimiento/fedramp'
    },
    {
      title: t('wikiArticleComplianceCCPA_CPRA'),
      description: t('wikiArticleComplianceCCPA_CPRADesc'),
      href: '/recursos/wiki/cumplimiento/ccpa-cpra'
    },
    {
      title: t('wikiArticleComplianceGDPRTitle'),
      description: t('wikiArticleComplianceGDPRDesc'),
      href: '/recursos/wiki/cumplimiento/gdpr'
    },
    {
      title: t('wikiArticleComplianceCMMCTitle'),
      description: t('wikiArticleComplianceCMMCDesc'),
      href: '/recursos/wiki/cumplimiento/cmmc'
    },
    {
      title: t('wikiArticleCompliancePrivacyByDesignTitle'),
      description: t('wikiArticleCompliancePrivacyByDesignDesc'),
      href: '/recursos/wiki/cumplimiento/privacy-design'
    },
    {
      title: t('wikiArticleComplianceNIS2Title'),
      description: t('wikiArticleComplianceNIS2Desc'),
      href: '/recursos/wiki/cumplimiento/nis2'
    },
    {
      title: t('wikiArticleComplianceDORATitle'),
      description: t('wikiArticleComplianceDORADesc'),
      href: '/recursos/wiki/cumplimiento/dora'
    },
    {
      title: t('wikiArticleCompliancePCIDSSTitle'),
      description: t('wikiArticleCompliancePCIDSSDesc'),
      href: '/recursos/wiki/cumplimiento/pci-dss'
    },
    {
      title: t('wikiArticleCompliancePOPIATitle'),
      description: t('wikiArticleCompliancePOPIADesc'),
      href: '/recursos/wiki/cumplimiento/popia'
    },
    {
      title: t('wikiArticleComplianceDataClassificationTitle'),
      description: t('wikiArticleComplianceDataClassificationDesc'),
      href: '/recursos/wiki/cumplimiento/data-classification'
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <BackButton href="/recursos/wiki" className="mb-6" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">{t('wikiCategoryCompliance')}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map(({title, description, href}) => (
            <ArticleCard 
              key={href}
              title={title}
              description={description}
              href={href}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
