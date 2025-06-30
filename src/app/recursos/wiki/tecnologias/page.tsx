import ArticleCard from '@/components/wiki/ArticleCard';
import BackButton from '@/components/BackButton';

export default function TechnologiesPage() {
  const articles = [
    {
      title: 'Criptografía Moderna',
      description: 'Métodos de cifrado y autenticación',
      href: '/recursos/wiki/tecnologias/criptografia'
    },
    {
      title: 'Seguridad en Redes',
      description: 'Protección de infraestructura de red',
      href: '/recursos/wiki/tecnologias/redes'
    },
    {
      title: 'Seguridad Web',
      description: 'Protección de aplicaciones web',
      href: '/recursos/wiki/tecnologias/web'
    },
    {
      title: 'Cloud Security',
      description: 'Seguridad en entornos cloud',
      href: '/recursos/wiki/tecnologias/cloud'
    },
    {
      title: 'Gestión de Identidad',
      description: 'Sistemas IAM y control de acceso',
      href: '/recursos/wiki/tecnologias/iam'
    },
    {
      title: 'Endpoint Security',
      description: 'Protección de dispositivos finales',
      href: '/recursos/wiki/tecnologias/endpoint'
    },
    {
      title: 'Monitorización',
      description: 'Detección y respuesta a amenazas',
      href: '/recursos/wiki/tecnologias/monitorizacion'
    },
    {
      title: 'Forense Digital',
      description: 'Análisis post-incidente',
      href: '/recursos/wiki/tecnologias/forense'
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <BackButton href="/recursos/wiki" className="mb-6" />
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Tecnologías Defensivas</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <ArticleCard key={article.title} {...article} />
          ))}
        </div>
      </div>
    </div>
  );
}
