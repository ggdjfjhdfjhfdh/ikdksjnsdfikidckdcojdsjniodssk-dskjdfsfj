import ArticleCard from '@/components/wiki/ArticleCard';
import BackButton from '@/components/BackButton';

export default function EspecializadasPage() {
  const articles = [
    {
      title: 'IoT/OT Security',
      description: 'Protección de dispositivos IoT y sistemas operacionales',
      href: '/recursos/wiki/especializadas/iot-ot'
    },
    {
      title: 'Seguridad Automotriz',
      description: 'Protección de sistemas vehiculares',
      href: '/recursos/wiki/especializadas/automotriz'
    },
    {
      title: 'Seguridad Médica',
      description: 'Protección de dispositivos médicos',
      href: '/recursos/wiki/especializadas/medica'
    },
    {
      title: 'Seguridad Industrial',
      description: 'Protección de sistemas SCADA/ICS',
      href: '/recursos/wiki/especializadas/industrial'
    },
    {
      title: 'Seguridad Bancaria',
      description: 'Protección de sistemas financieros',
      href: '/recursos/wiki/especializadas/bancaria'
    },
    {
      title: 'Seguridad en Blockchain',
      description: 'Protección de sistemas descentralizados',
      href: '/recursos/wiki/especializadas/blockchain'
    },
    {
      title: 'Seguridad Física',
      description: 'Controles de acceso y vigilancia',
      href: '/recursos/wiki/especializadas/fisica'
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <BackButton href="/recursos/wiki" className="mb-6" />
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Áreas Especializadas</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <ArticleCard key={article.title} {...article} />
          ))}
        </div>
      </div>
    </div>
  );
}
