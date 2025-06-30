import ArticleCard from '@/components/wiki/ArticleCard';
import BackButton from '@/components/BackButton';

export default function FisicaPage() {
  const articles = [
    {
      title: 'Controles Físicos',
      description: 'CCTV, Mantrap, Cerraduras Biométricas',
      href: '/recursos/wiki/fisica/controles-fisicos'
    },
    {
      title: 'Seguridad Ambiental',
      description: 'UPS, HVAC, Detectores',
      href: '/recursos/wiki/fisica/seguridad-ambiental'
    },
    {
      title: 'BCP',
      description: 'Business Continuity Plan',
      href: '/recursos/wiki/fisica/bcp'
    },
    {
      title: 'DRP',
      description: 'Disaster Recovery Plan',
      href: '/recursos/wiki/fisica/drp'
    },
    {
      title: 'Gestión de Crisis',
      description: 'Protocolos y Comunicación',
      href: '/recursos/wiki/fisica/gestion-crisis'
    },
    {
      title: 'Ejercicios de Mesa',
      description: 'Simulacros y pruebas',
      href: '/recursos/wiki/fisica/ejercicios-mesa'
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <BackButton href="/recursos/wiki" />
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Seguridad Física & Continuidad</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article, index) => (
            <ArticleCard 
              key={index}
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
