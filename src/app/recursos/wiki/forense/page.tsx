import ArticleCard from '@/components/wiki/ArticleCard';
import BackButton from '@/components/BackButton';

export default function ForensePage() {
  const articles = [
    {
      title: 'Cadena de Custodia',
      description: 'Manejo legal de evidencia digital',
      href: '/recursos/wiki/forense/cadena-custodia'
    },
    {
      title: 'Disk Imaging',
      description: 'Adquisición forense con write-blocking',
      href: '/recursos/wiki/forense/disk-imaging'
    },
    {
      title: 'Memory Forensics',
      description: 'Análisis de memoria con Volatility/Rekall',
      href: '/recursos/wiki/forense/memory-forensics'
    },
    {
      title: 'Timeline Analysis',
      description: 'Creación de líneas de tiempo forenses',
      href: '/recursos/wiki/forense/timeline'
    },
    {
      title: 'Artefactos Windows',
      description: 'ShimCache, AmCache y otros artefactos',
      href: '/recursos/wiki/forense/artefactos-windows'
    },
    {
      title: 'Cloud Forensics',
      description: 'AWS, Azure y GCP',
      href: '/recursos/wiki/forense/cloud-forensics'
    },
    {
      title: 'Ransomware Analysis',
      description: 'Análisis y flujo de decryptores',
      href: '/recursos/wiki/forense/ransomware'
    },
    {
      title: 'Informe Forense',
      description: 'Evidencia legal y reportes',
      href: '/recursos/wiki/forense/informe'
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <BackButton href="/recursos/wiki" className="mb-6" />
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Forense Digital</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <ArticleCard key={article.title} {...article} />
          ))}
        </div>
      </div>
    </div>
  );
}
