import ArticleCard from '@/components/wiki/ArticleCard';
import BackButton from '@/components/BackButton';

export default function AmenazasPage() {
  const articles = [
    {
      title: 'APT',
      description: 'Advanced Persistent Threat - amenazas persistentes avanzadas',
      href: '/recursos/wiki/amenazas/apt'
    },
    {
      title: 'Zero-Day',
      description: 'Exploits de vulnerabilidades desconocidas',
      href: '/recursos/wiki/amenazas/zero-day'
    },
    {
      title: 'Supply-Chain Attack',
      description: 'Ataques a través de la cadena de suministro',
      href: '/recursos/wiki/amenazas/supply-chain'
    },
    {
      title: 'Phishing',
      description: 'Técnicas de ingeniería social',
      href: '/recursos/wiki/amenazas/phishing'
    },
    {
      title: 'DDoS',
      description: 'Ataques de denegación de servicio distribuido',
      href: '/recursos/wiki/amenazas/ddos'
    },
    {
      title: 'Man-in-the-Middle',
      description: 'Interceptación de comunicaciones',
      href: '/recursos/wiki/amenazas/man-in-the-middle'
    },
    {
      title: 'Insider Threat',
      description: 'Amenazas internas en organizaciones',
      href: '/recursos/wiki/amenazas/insider'
    },
    {
      title: 'Malware Avanzado',
      description: 'RATs, rootkits y malware polimórfico',
      href: '/recursos/wiki/amenazas/malware'
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <BackButton href="/recursos/wiki" className="mb-6" />
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Amenazas y Ataques</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <ArticleCard key={article.title} {...article} />
          ))}
        </div>
      </div>
    </div>
  );
}
