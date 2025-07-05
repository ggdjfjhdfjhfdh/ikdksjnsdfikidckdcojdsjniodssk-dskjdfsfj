'use client';

import ArticleCard from '@/components/wiki/ArticleCard';
import BackButton from '@/components/BackButton';
import { useI18n } from '@/lib/i18n';

export default function CriptografiaPage() {
  const { t } = useI18n();

  const articles = [
    {
      title: t('wikiArticleSymmetricTitle'),
      description: t('wikiArticleSymmetricDesc'),
      href: '/recursos/wiki/criptografia/simetrica'
    },
    {
      title: t('wikiArticleModosCifradoTitle'),
      description: t('wikiArticleModosCifradoDesc'),
      href: '/recursos/wiki/criptografia/modos-cifrado'
    },
    {
      title: t('wikiArticleProtocolosTitle'),
      description: t('wikiArticleProtocolosDesc'),
      href: '/recursos/wiki/criptografia/protocolos'
    },
    {
      title: t('wikiArticleHashingTitle'),
      description: t('wikiArticleHashingDesc'),
      href: '/recursos/wiki/criptografia/hashing'
    },
    {
      title: t('wikiArticlePfsTitle'),
      description: t('wikiArticlePfsDesc'),
      href: '/recursos/wiki/criptografia/pfs'
    },
    {
      title: t('wikiArticlePkiTitle'),
      description: t('wikiArticlePkiDesc'),
      href: '/recursos/wiki/criptografia/pki'
    },
    {
      title: t('wikiArticleSaltingTitle'),
      description: t('wikiArticleSaltingDesc'),
      href: '/recursos/wiki/criptografia/salting'
    },
    {
      title: t('wikiArticleModelosAccesoTitle'),
      description: t('wikiArticleModelosAccesoDesc'),
      href: '/recursos/wiki/criptografia/acceso'
    },
    {
      title: t('wikiArticleBiometriaTitle'),
      description: t('wikiArticleBiometriaDesc'),
      href: '/recursos/wiki/criptografia/biometria'
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <BackButton href="/recursos/wiki" className="mb-6" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">{t('wikiCategoryCryptography')}</h1>
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
