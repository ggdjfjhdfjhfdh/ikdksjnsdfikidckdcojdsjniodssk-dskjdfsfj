'use client';

import ArticleCard from '@/components/wiki/ArticleCard';
import BackButton from '@/components/BackButton';
import { useI18n } from '@/lib/i18n';

export default function EndpointPage() {
  const { t } = useI18n();

  const articles = [
    {
      title: t('wikiArticleEndpointSecurityEDRTitle'),
      description: t('wikiArticleEndpointSecurityEDRDesc'),
      href: '/recursos/wiki/endpoint/edr'
    },
    {
      title: t('wikiArticleEndpointSecurityMDMTitle'),
      description: t('wikiArticleEndpointSecurityMDMDesc'),
      href: '/recursos/wiki/endpoint/mdm'
    },
    {
      title: t('wikiArticleEndpointSecurityApplicationControlTitle'),
      description: t('wikiArticleEndpointSecurityApplicationControlDesc'),
      href: '/recursos/wiki/endpoint/app-control'
    },
    {
      title: t('wikiArticleEndpointSecurityCISBenchmarksTitle'),
      description: t('wikiArticleEndpointSecurityCISBenchmarksDesc'),
      href: '/recursos/wiki/endpoint/cis-benchmarks'
    },
    {
      title: t('wikiArticleEndpointSecurityDeviceControlTitle'),
      description: t('wikiArticleEndpointSecurityDeviceControlDesc'),
      href: '/recursos/wiki/endpoint/device-control'
    },
    {
      title: t('wikiArticleEndpointSecuritySCADATitle'),
      description: t('wikiArticleEndpointSecuritySCADADesc'),
      href: '/recursos/wiki/endpoint/scada'
    },
    {
      title: t('wikiArticleEndpointSecurityCANBusTitle'),
      description: t('wikiArticleEndpointSecurityCANBusDesc'),
      href: '/recursos/wiki/endpoint/can-bus'
    },
    {
      title: t('wikiArticleEndpointSecurityPatchManagementTitle'),
      description: t('wikiArticleEndpointSecurityPatchManagementDesc'),
      href: '/recursos/wiki/endpoint/patch-management'
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <BackButton href="/recursos/wiki" className="mb-6" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">{t('wikiCategoryEndpoint')}</h1>
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
