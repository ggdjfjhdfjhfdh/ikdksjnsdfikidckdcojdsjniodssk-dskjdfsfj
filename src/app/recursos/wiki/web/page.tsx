'use client';

import ArticleCard from '@/components/wiki/ArticleCard';
import BackButton from '@/components/BackButton';
import { useI18n } from '@/lib/i18n';

export default function WebSecurityPage() {
  const { t } = useI18n();

  const articles = [
    {
      title: t('wikiArticleWebSecurityOWASPTop10Title'),
      description: t('wikiArticleWebSecurityOWASPTop10Desc'),
      href: '/recursos/wiki/web/owasp-top10'
    },
    {
      title: t('wikiArticleWebSecurityDeserializacionTitle'),
      description: t('wikiArticleWebSecurityDeserializacionDesc'),
      href: '/recursos/wiki/web/deserializacion'
    },
    {
      title: t('wikiArticleWebSecuritySSRFTitle'),
      description: t('wikiArticleWebSecuritySSRFDesc'),
      href: '/recursos/wiki/web/ssrf'
    },
    {
      title: t('wikiArticleWebSecurityFileUploadTitle'),
      description: t('wikiArticleWebSecurityFileUploadDesc'),
      href: '/recursos/wiki/web/file-upload'
    },
    {
      title: t('wikiArticleWebSecurityOpenRedirectTitle'),
      description: t('wikiArticleWebSecurityOpenRedirectDesc'),
      href: '/recursos/wiki/web/open-redirect'
    },
    {
      title: t('wikiArticleWebSecurityJWTTitle'),
      description: t('wikiArticleWebSecurityJWTDesc'),
      href: '/recursos/wiki/web/jwt-security'
    },
    {
      title: t('wikiArticleWebSecuritySecurityHeadersTitle'),
      description: t('wikiArticleWebSecuritySecurityHeadersDesc'),
      href: '/recursos/wiki/web/security-headers'
    },
    {
      title: t('wikiArticleWebSecurityGraphQLTitle'),
      description: t('wikiArticleWebSecurityGraphQLDesc'),
      href: '/recursos/wiki/web/graphql'
    },
    {
      title: t('wikiArticleWebSecurityRASPTitle'),
      description: t('wikiArticleWebSecurityRASPDsc'),
      href: '/recursos/wiki/web/rasp'
    },
    {
      title: t('wikiArticleWebSecuritySecurityTestingTitle'),
      description: t('wikiArticleWebSecuritySecurityTestingDesc'),
      href: '/recursos/wiki/web/security-testing'
    },
    {
      title: t('wikiArticleWebSecuritySCATitle'),
      description: t('wikiArticleWebSecuritySCADesc'),
      href: '/recursos/wiki/web/sca-sbom'
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <BackButton href="/recursos/wiki" className="mb-6" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">{t('wikiCategoryWeb')}</h1>
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
