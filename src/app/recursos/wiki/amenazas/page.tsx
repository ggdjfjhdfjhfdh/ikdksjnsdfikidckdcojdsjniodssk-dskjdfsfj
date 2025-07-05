'use client';

import ArticleCard from '@/components/wiki/ArticleCard';
import BackButton from '@/components/BackButton';
import { useI18n } from '@/lib/i18n';

export default function AmenazasPage() {
  const { t } = useI18n();

  const articles = [
    {
      title: t('wikiArticleAPTTitle'),
      description: t('wikiArticleAPTDesc'),
      href: '/recursos/wiki/amenazas/apt'
    },
    {
      title: t('wikiArticleZeroDayTitle'),
      description: t('wikiArticleZeroDayDesc'),
      href: '/recursos/wiki/amenazas/zero-day'
    },
    {
      title: t('wikiArticleSupplyChainTitle'),
      description: t('wikiArticleSupplyChainDesc'),
      href: '/recursos/wiki/amenazas/supply-chain'
    },
    {
      title: t('wikiArticlePhishingTitle'),
      description: t('wikiArticlePhishingDesc'),
      href: '/recursos/wiki/amenazas/phishing'
    },
    {
      title: t('wikiArticleDDoSTitle'),
      description: t('wikiArticleDDOSDesc'),
      href: '/recursos/wiki/amenazas/ddos'
    },
    {
      title: t('wikiArticleManInTheMiddleTitle'),
      description: t('wikiArticleManInTheMiddleDesc'),
      href: '/recursos/wiki/amenazas/man-in-the-middle'
    },
    {
      title: t('wikiArticleInsiderThreatTitle'),
      description: t('wikiArticleInsiderThreatDesc'),
      href: '/recursos/wiki/amenazas/insider'
    },
    {
      title: t('wikiArticleMalwareTitle'),
      description: t('wikiArticleMalwareDesc'),
      href: '/recursos/wiki/amenazas/malware'
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <BackButton href="/recursos/wiki" className="mb-6" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">{t('wikiCategoryThreats')}</h1>
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
