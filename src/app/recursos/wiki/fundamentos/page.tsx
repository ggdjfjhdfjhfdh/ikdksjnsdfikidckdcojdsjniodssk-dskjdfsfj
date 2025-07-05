'use client';

import ArticleCard from '@/components/wiki/ArticleCard';
import BackButton from '@/components/BackButton';
import { useI18n } from '@/lib/i18n';

export default function FundamentosPage() {
  const { t } = useI18n();
  
  const articles = [
    {
      title: t('wikiArticleZeroTrustTitle'),
      description: t('wikiArticleZeroTrustDesc'),
      href: '/recursos/wiki/fundamentos/zero-trust'
    },
    {
      title: t('wikiArticleDefenseInDepthTitle'),
      description: t('wikiArticleDefenseInDepthDesc'),
      href: '/recursos/wiki/fundamentos/defense-in-depth'
    },
    {
      title: t('wikiArticleLeastPrivilegeTitle'),
      description: t('wikiArticleLeastPrivilegeDesc'),
      href: '/recursos/wiki/fundamentos/minimo-privilegio'
    },
    {
      title: t('wikiArticleAAAModelTitle'),
      description: t('wikiArticleAAAModelDesc'),
      href: '/recursos/wiki/fundamentos/modelo-aaa'
    },
    {
      title: t('wikiArticleRiskManagementTitle'),
      description: t('wikiArticleRiskManagementDesc'),
      href: '/recursos/wiki/fundamentos/gestion-riesgos'
    },
    {
      title: t('wikiArticleSecureByDesignTitle'),
      description: t('wikiArticleSecureByDesignDesc'),
      href: '/recursos/wiki/fundamentos/seguridad-diseno'
    },
    {
      title: t('wikiArticleAttackSurfaceTitle'),
      description: t('wikiArticleAttackSurfaceDesc'),
      href: '/recursos/wiki/fundamentos/superficie-ataque'
    },
    {
      title: t('wikiArticleSecurityMetricsTitle'),
      description: t('wikiArticleSecurityMetricsDesc'),
      href: '/recursos/wiki/fundamentos/metricas-seguridad'
    },
    {
      title: t('wikiArticleKerckhoffsTitle'),
      description: t('wikiArticleKerckhoffsDesc'),
      href: '/recursos/wiki/fundamentos/kerckhoffs'
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <BackButton href="/recursos/wiki" className="mb-6" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">{t('wikiCategoryFundamentals')}</h1>
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
