import ArticleCard from '@/components/wiki/ArticleCard';
import BackButton from '@/components/BackButton';

export default function EndpointPage() {
  const articles = [
    {
      title: 'EDR / XDR',
      description: 'Detección y respuesta en endpoints',
      href: '/recursos/wiki/endpoint/edr-xdr'
    },
    {
      title: 'MDM / MAM',
      description: 'Gestión de dispositivos móviles',
      href: '/recursos/wiki/endpoint/mdm'
    },
    {
      title: 'Application Control',
      description: 'Whitelisting y Blacklisting',
      href: '/recursos/wiki/endpoint/app-control'
    },
    {
      title: 'CIS Benchmarks',
      description: 'Hardening de sistemas',
      href: '/recursos/wiki/endpoint/cis-benchmarks'
    },
    {
      title: 'Device Control',
      description: 'USB, Bluetooth y periféricos',
      href: '/recursos/wiki/endpoint/device-control'
    },
    {
      title: 'SCADA / PLC',
      description: 'Seguridad industrial (Modbus, DNP3)',
      href: '/recursos/wiki/endpoint/scada'
    },
    {
      title: 'CAN-Bus Security',
      description: 'Seguridad en sistemas automotrices',
      href: '/recursos/wiki/endpoint/can-bus'
    },
    {
      title: 'Patch Management',
      description: 'Gestión de vulnerabilidades y parches',
      href: '/recursos/wiki/endpoint/patch-management'
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <BackButton href="/recursos/wiki" className="mb-6" />
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Endpoint & OT/IoT Security</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <ArticleCard key={article.title} {...article} />
          ))}
        </div>
      </div>
    </div>
  );
}
