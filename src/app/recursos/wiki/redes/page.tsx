import ArticleCard from '@/components/wiki/ArticleCard';
import BackButton from '@/components/BackButton';
import { FiGlobe, FiDivideSquare, FiShield, FiLock } from 'react-icons/fi';

export default function RedesPage() {
  const articles = [
    {
      title: 'NAT, PAT y ACL',
      description: 'Técnicas de traducción de direcciones y control de acceso',
      href: '/recursos/wiki/redes/nat-pat-acl',
      icon: <FiGlobe />
    },
    {
      title: 'Segmentación de Red & VLANs',
      description: 'División lógica de redes para mejorar seguridad',
      href: '/recursos/wiki/redes/segmentacion-vlan',
      icon: <FiDivideSquare />
    },
    {
      title: 'IPv6 Security',
      description: 'Protecciones contra amenazas en redes IPv6',
      href: '/recursos/wiki/redes/ipv6-security',
      icon: <FiShield />
    },
    {
      title: 'DNS SEC / DoH / DoT / DoQ',
      description: 'Protocolos para asegurar las consultas DNS',
      href: '/recursos/wiki/redes/dns-sec',
      icon: <FiLock />
    },
    {
      title: 'BGP Security & RPKI',
      description: 'Protecciones para el protocolo de routing BGP',
      href: '/recursos/wiki/redes/bgp-security'
    },
    {
      title: 'DHCP Snooping & DAI',
      description: 'Protecciones contra ataques a DHCP y ARP',
      href: '/recursos/wiki/redes/dhcp-snooping'
    },
    {
      title: 'Wi-Fi Seguro (WPA3, OWE)',
      description: 'Protocolos para redes inalámbricas seguras',
      href: '/recursos/wiki/redes/wifi-seguro'
    },
    {
      title: 'WireGuard & IPsec IKEv2',
      description: 'Protocolos VPN modernos para conectividad segura',
      href: '/recursos/wiki/redes/wireguard-ipsec'
    },
    {
      title: 'Firewalls & Next-Gen',
      description: 'Sistemas de protección perimetral avanzados',
      href: '/recursos/wiki/redes/firewalls'
    },
    {
      title: 'SD-WAN y SASE',
      description: 'Arquitecturas modernas para redes empresariales',
      href: '/recursos/wiki/redes/sd-wan'
    },
    {
      title: 'Network Access Control',
      description: 'Sistemas para controlar acceso a redes',
      href: '/recursos/wiki/redes/nac'
    },
    {
      title: 'Honeypots',
      description: 'Sistemas de engaño para detección de amenazas',
      href: '/recursos/wiki/redes/honeypots'
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <BackButton href="/recursos/wiki" className="mb-6" />
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Seguridad en Redes</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <ArticleCard key={article.title} {...article} />
          ))}
        </div>
      </div>
    </div>
  );
}
