'use client';

import ArticleCard from '@/components/wiki/ArticleCard';
import BackButton from '@/components/BackButton';
import { useI18n } from '@/lib/i18n';

export default function CloudPage() {
  const { t } = useI18n();

  const articles = [
    {
      title: t('wikiArticleCloudSecurityModelTitle'),
      description: t('wikiArticleCloudSecurityModelDesc'),
      href: '/recursos/wiki/cloud/cloud-security-model'
    },
    {
      title: t('wikiArticleCloudSecurityToolsTitle'),
      description: t('wikiArticleCloudSecurityToolsDesc'),
      href: '/recursos/wiki/cloud/herramientas'
    },
    {
      title: t('wikiArticleCloudSecurityIaCTitle'),
      description: t('wikiArticleCloudSecurityIaCDesc'),
      href: '/recursos/wiki/cloud/iac'
    },
    {
      title: t('wikiArticleCloudSecurityCICDTitle'),
      description: t('wikiArticleCloudSecurityCICDDesc'),
      href: '/recursos/wiki/cloud/cicd'
    },
    {
      title: t('wikiArticleCloudSecurityIAMTitle'),
      description: t('wikiArticleCloudSecurityIAMDesc'),
      href: '/recursos/wiki/cloud/iam'
    },
    {
      title: t('wikiArticleCloudSecurityNetworkTitle'),
      description: t('wikiArticleCloudSecurityNetworkDesc'),
      href: '/recursos/wiki/cloud/redes'
    },
    {
      title: t('wikiArticleCloudSecurityMonitoringTitle'),
      description: t('wikiArticleCloudSecurityMonitoringDesc'),
      href: '/recursos/wiki/cloud/monitoreo'
    },
    {
      title: t('wikiArticleCloudSecurityAutomationTitle'),
      description: t('wikiArticleCloudSecurityAutomationDesc'),
      href: '/recursos/wiki/cloud/automation'
    },
    {
      title: t('wikiArticleCloudSecurityImmutableTitle'),
      description: t('wikiArticleCloudSecurityImmutableDesc'),
      href: '/recursos/wiki/cloud/infraestructura'
    },
    {
      title: t('wikiArticleCloudSecurityConfidentialTitle'),
      description: t('wikiArticleCloudSecurityConfidentialDesc'),
      href: '/recursos/wiki/cloud/confidential'
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <BackButton href="/recursos/wiki" className="mb-6" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">{t('wikiCategoryCloud')}</h1>
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
