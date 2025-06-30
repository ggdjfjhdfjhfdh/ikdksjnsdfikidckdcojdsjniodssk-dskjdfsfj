import ArticleCard from '@/components/wiki/ArticleCard';
import BackButton from '@/components/BackButton';

export default function MonitorizacionPage() {
  const articles = [
    {
      title: 'SIEM & Log Management',
      description: 'Correlación de eventos y gestión de logs',
      href: '/recursos/wiki/monitorizacion/siem'
    },
    {
      title: 'MITRE ATT&CK & D3FEND',
      description: 'Marcos de referencia para detección',
      href: '/recursos/wiki/monitorizacion/mitre'
    },
    {
      title: 'IOC vs IOA',
      description: 'Indicadores de compromiso vs actividad',
      href: '/recursos/wiki/monitorizacion/ioc'
    },
    {
      title: 'UEBA / NDR',
      description: 'Análisis de comportamiento y red',
      href: '/recursos/wiki/monitorizacion/ueba'
    },
    {
      title: 'Threat Intelligence',
      description: 'STIX/TAXII y feeds de inteligencia',
      href: '/recursos/wiki/monitorizacion/threat-intel'
    },
    {
      title: 'Threat Hunting',
      description: 'Caza de amenazas y Purple Teaming',
      href: '/recursos/wiki/monitorizacion/threat-hunting'
    },
    {
      title: 'SOAR Playbooks',
      description: 'Automatización de respuesta',
      href: '/recursos/wiki/monitorizacion/soar'
    },
    {
      title: 'Métricas de Respuesta',
      description: 'MTTD, MTTR y KPIs de seguridad',
      href: '/recursos/wiki/monitorizacion/metricas'
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <BackButton href="/recursos/wiki" className="mb-6" />
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Monitorización, Detección y Respuesta</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <ArticleCard key={article.title} {...article} />
          ))}
        </div>
      </div>
    </div>
  );
}
