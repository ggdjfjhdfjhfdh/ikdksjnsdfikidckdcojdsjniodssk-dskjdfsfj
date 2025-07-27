'use client';

import ArticleCard from '@/components/wiki/ArticleCard';
import BackButton from '@/components/BackButton';
import { useI18n } from '@/lib/LanguageContext';
import { 
  Globe, 
  Network, 
  Shield, 
  Lock, 
  Route, 
  Server, 
  Wifi, 
  Key, 
  Cloud, 
  UserCheck, 
  Bug,
  Router,
  TrendingUp
} from 'lucide-react';

export default function RedesPage() {
  const { t } = useI18n();

  const articles = [
    {
      title: 'VPN & Túneles',
      description: 'NAT, PAT, ACLs y tecnologías de túnel',
      href: '/recursos/wiki/redes/vpn',
      icon: Globe,
      difficulty: 'Intermedio' as const,
      readTime: '14 min',
      popularity: 5,
      gradient: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Segmentación & VLANs',
      description: 'Microsegmentación y aislamiento de red',
      href: '/recursos/wiki/redes/segmentacion-vlan',
      icon: Network,
      difficulty: 'Intermedio' as const,
      readTime: '12 min',
      popularity: 4,
      gradient: 'from-green-500 to-green-600'
    },
    {
      title: 'IPv6 Security',
      description: 'Seguridad en protocolos IPv6',
      href: '/recursos/wiki/redes/ipv6-security',
      icon: Shield,
      difficulty: 'Avanzado' as const,
      readTime: '16 min',
      popularity: 3,
      gradient: 'from-purple-500 to-purple-600'
    },
    {
      title: 'DNS Security',
      description: 'DNSSEC, DoH, DoT y DoQ',
      href: '/recursos/wiki/redes/dns-sec',
      icon: Lock,
      difficulty: 'Avanzado' as const,
      readTime: '18 min',
      popularity: 4,
      gradient: 'from-orange-500 to-orange-600'
    },
    {
      title: 'BGP Security & RPKI',
      description: 'Seguridad en enrutamiento BGP',
      href: '/recursos/wiki/redes/bgp-security',
      icon: Route,
      difficulty: 'Avanzado' as const,
      readTime: '20 min',
      popularity: 3,
      gradient: 'from-red-500 to-red-600'
    },
    {
      title: 'DHCP Snooping & DAI',
      description: 'Protección contra ataques DHCP',
      href: '/recursos/wiki/redes/dhcp-snooping',
      icon: Server,
      difficulty: 'Intermedio' as const,
      readTime: '11 min',
      popularity: 3,
      gradient: 'from-indigo-500 to-indigo-600'
    },
    {
      title: 'WiFi Seguro',
      description: 'WPA3, Enterprise y seguridad inalámbrica',
      href: '/recursos/wiki/redes/wifi-seguro',
      icon: Wifi,
      difficulty: 'Intermedio' as const,
      readTime: '13 min',
      popularity: 5,
      gradient: 'from-teal-500 to-teal-600'
    },
    {
      title: 'WireGuard & IPSec',
      description: 'Protocolos VPN modernos y seguros',
      href: '/recursos/wiki/redes/wireguard-ipsec',
      icon: Key,
      difficulty: 'Avanzado' as const,
      readTime: '17 min',
      popularity: 4,
      gradient: 'from-yellow-500 to-yellow-600'
    },
    {
      title: 'Firewalls Next-Gen',
      description: 'NGFW, WAF y protección avanzada',
      href: '/recursos/wiki/redes/firewalls',
      icon: Shield,
      difficulty: 'Intermedio' as const,
      readTime: '15 min',
      popularity: 5,
      gradient: 'from-pink-500 to-pink-600'
    },
    {
      title: 'SD-WAN & SASE',
      description: 'Redes definidas por software y SASE',
      href: '/recursos/wiki/redes/sd-wan',
      icon: Cloud,
      difficulty: 'Avanzado' as const,
      readTime: '19 min',
      popularity: 4,
      gradient: 'from-cyan-500 to-cyan-600'
    },
    {
      title: 'Network Access Control',
      description: 'NAC y control de acceso a red',
      href: '/recursos/wiki/redes/nac',
      icon: UserCheck,
      difficulty: 'Intermedio' as const,
      readTime: '12 min',
      popularity: 3,
      gradient: 'from-violet-500 to-violet-600'
    },
    {
      title: 'Honeypots',
      description: 'Señuelos y detección de intrusos',
      href: '/recursos/wiki/redes/honeypots',
      icon: Bug,
      difficulty: 'Avanzado' as const,
      readTime: '14 min',
      popularity: 3,
      gradient: 'from-amber-500 to-amber-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <BackButton href="/recursos/wiki" />
        
        {/* Hero Section */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center justify-center p-4 bg-gradient-to-r from-green-500 to-teal-500 rounded-2xl mb-6">
            <Router className="h-12 w-12 text-white" />
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Seguridad de Redes
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Tecnologías y protocolos para la protección de infraestructuras de red.
            Desde firewalls next-gen hasta SD-WAN y protocolos de túnel seguros.
          </p>
          
          {/* Stats */}
          <div className="flex justify-center items-center mt-8 space-x-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">{articles.length}</div>
              <div className="text-sm text-gray-500">Tecnologías de Red</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center text-yellow-500 mb-1">
                <TrendingUp className="h-5 w-5 mr-1" />
                <span className="text-3xl font-bold text-gray-900">Zero Trust</span>
              </div>
              <div className="text-sm text-gray-500">Network Architecture</div>
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
            ¿Necesitas diseño de red segura?
          </h2>
          <p className="text-gray-600 mb-6">
            Diseñamos e implementamos arquitecturas de red con enfoque Zero Trust, microsegmentación y tecnologías SD-WAN/SASE.
          </p>
          <div className="flex justify-center space-x-4">
            <button className="bg-gradient-to-r from-green-500 to-teal-500 text-white px-6 py-3 rounded-lg font-medium hover:from-green-600 hover:to-teal-600 transition-all duration-300">
              Consultoría de Red
            </button>
            <button className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-all duration-300">
              Auditoría de Seguridad
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
