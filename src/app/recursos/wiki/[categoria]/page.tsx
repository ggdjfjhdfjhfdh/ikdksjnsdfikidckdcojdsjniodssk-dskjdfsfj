import BackButton from '@/components/BackButton';
import { BookOpenIcon, CodeBracketIcon, GlobeAltIcon } from '@heroicons/react/24/outline';

export default function CategoryPage({
  params,
}: {
  params: { categoria: string };
}) {
  // Datos de ejemplo (en producción vendría de una API/BD)
  const categoryData = {
    fundamentos: {
      title: 'Fundamentos',
      description: 'Conceptos esenciales de ciberseguridad',
      icon: <BookOpenIcon className="h-6 w-6 text-blue-600" />,
      articles: [
        { id: 'modelo-osi', title: 'Modelo OSI', summary: 'Modelo de referencia para comunicaciones en red' },
        { id: 'principios-seguridad', title: 'Principios CIA', summary: 'Confidencialidad, Integridad y Disponibilidad' },
        { id: 'tipos-amenazas', title: 'Tipos de Amenazas', summary: 'Clasificación de riesgos de seguridad' }
      ]
    },
    tecnologias: {
      title: 'Tecnologías',
      description: 'Herramientas y protocolos de seguridad',
      icon: <CodeBracketIcon className="h-6 w-6 text-green-600" />,
      articles: [
        { id: 'firewalls', title: 'Firewalls', summary: 'Sistemas de protección perimetral' },
        { id: 'vpn', title: 'VPNs', summary: 'Redes Privadas Virtuales' },
        { id: 'ssl-tls', title: 'SSL/TLS', summary: 'Protocolos de cifrado web' }
      ]
    },
    web: {
      title: 'Seguridad Web',
      description: 'Protección de aplicaciones y sitios web',
      icon: <GlobeAltIcon className="h-6 w-6 text-purple-600" />,
      articles: [
        { id: 'owasp-top10', title: 'OWASP Top 10', summary: 'Principales vulnerabilidades web' },
        { id: 'xss', title: 'XSS', summary: 'Cross-Site Scripting' },
        { id: 'sql-injection', title: 'SQL Injection', summary: 'Inyección de código SQL' }
      ]
    }
  };

  const category = categoryData[params.categoria as keyof typeof categoryData] || {
    title: 'Categoría no encontrada',
    description: '',
    articles: []
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <BackButton href="/recursos/wiki" label="Volver a Wiki" />
      
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-6">
          <div className="p-2 rounded-lg bg-blue-50 mr-4">
            {category.icon}
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{category.title}</h1>
            <p className="text-gray-600">{category.description}</p>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Artículos</h2>
            <div className="space-y-4">
              {category.articles.map((article) => (
                <div key={article.id} className="border-b border-gray-200 pb-4 last:border-0">
                  <h3 className="text-lg font-medium text-gray-900">
                    <a href={`/recursos/wiki/${params.categoria}/${article.id}`} className="hover:text-blue-600">
                      {article.title}
                    </a>
                  </h3>
                  <p className="text-gray-600 mt-1">{article.summary}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
