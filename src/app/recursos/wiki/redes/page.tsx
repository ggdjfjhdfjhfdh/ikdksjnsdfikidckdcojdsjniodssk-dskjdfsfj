'use client';

import ArticleCard from '@/components/wiki/ArticleCard';
import BackButton from '@/components/BackButton';
import { FiGlobe, FiDivideSquare, FiShield, FiLock } from 'react-icons/fi';
import { useI18n } from '@/lib/i18n';

export default function RedesPage() {
  const { t } = useI18n();

  const articles = [
    {
      title: t('wikiArticleNatPatAclTitle'),
      description: t('wikiArticleNatPatAclDesc'),
      href: '/recursos/wiki/redes/vpn',
      icon: <FiGlobe />
    },
    {
      title: t('wikiArticleSegmentationVlansTitle'),
      description: t('wikiArticleSegmentationVlansDesc'),
      href: '/recursos/wiki/redes/segmentacion-vlan',
      icon: <FiDivideSquare />
    },
    {
      title: t('wikiArticleIpv6SecurityTitle'),
      description: t('wikiArticleIpv6SecurityDesc'),
      href: '/recursos/wiki/redes/ipv6-security',
      icon: <FiShield />
    },
    {
      title: t('wikiArticleDnsSecDoHDoTDoQTitle'),
      description: t('wikiArticleDnsSecDoHDoTDoQDesc'),
      href: '/recursos/wiki/redes/dns-sec',
      icon: <FiLock />
    },
    {
      title: t('wikiArticleBgpSecurityRpkiTitle'),
      description: t('wikiArticleBgpSecurityRpkiDesc'),
      href: '/recursos/wiki/redes/bgp-security',
      key: 'bgpSecurityRpki'
    },
    {
      title: t('wikiArticleDhcpSnoopingDaiTitle'),
      description: t('wikiArticleDhcpSnoopingDaiDesc'),
      href: '/recursos/wiki/redes/dhcp-snooping',
      key: 'dhcpSnoopingDai'
    },
    {
      title: t('wikiArticleWifiSecureTitle'),
      description: t('wikiArticleWifiSecureDesc'),
      href: '/recursos/wiki/redes/wifi-seguro'
    },
    {
      title: t('wikiArticleWireGuardIpsecIkev2Title'),
      description: t('wikiArticleWireGuardIpsecIkev2Desc'),
      href: '/recursos/wiki/redes/wireguard-ipsec'
    },
    {
      title: t('wikiArticleFirewallsNextGenTitle'),
      description: t('wikiArticleFirewallsNextGenDesc'),
      href: '/recursos/wiki/redes/firewalls'
    },
    {
      title: t('wikiArticleSdwanSaseTitle'),
      description: t('wikiArticleSdwanSaseDesc'),
      href: '/recursos/wiki/redes/sd-wan'
    },
    {
      title: t('wikiArticleNetworkAccessControlTitle'),
      description: t('wikiArticleNetworkAccessControlDesc'),
      href: '/recursos/wiki/redes/nac'
    },
    {
      title: t('wikiArticleHoneypotsTitle'),
      description: t('wikiArticleHoneypotsDesc'),
      href: '/recursos/wiki/redes/honeypots'
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <BackButton href="/recursos/wiki" className="mb-6" />
        <h1 className="text-3xl font-bold text-gray-900 mb-8">{t('wikiCategoryNetworks')}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <ArticleCard 
              key={article.key || article.href}
              title={article.title}
              description={article.description}
              href={article.href}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
