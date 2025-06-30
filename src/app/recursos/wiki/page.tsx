import Link from 'next/link';
import SearchBar from '@/components/wiki/SearchBar';
import { getAllWikiArticles } from '@/lib/wikiSearch';

export default async function WikiPage() {
  const allArticles = await getAllWikiArticles();
  
  // Contar artículos por categoría (incluyendo subdirectorios)
  const getCategoryCount = (categoryPath: string) => {
    return allArticles.filter(article => 
      article.href.startsWith(`/recursos/wiki/${categoryPath}/`) &&
      !article.href.endsWith('page.tsx')
    ).length;
  };

  const categories = [
    {
      title: 'Fundamentos',
      description: 'Conceptos teóricos y principios de seguridad',
      path: 'fundamentos'
    },
    {
      title: 'Amenazas y Ataques',
      description: 'Técnicas de ataque y vectores de amenaza',
      path: 'amenazas'
    },
    {
      title: 'Malware',
      description: 'Tipos y características de software malicioso',
      path: 'malware'
    },
    {
      title: 'Criptografía & Autenticación',
      description: 'Métodos de cifrado y verificación de identidad',
      path: 'criptografia'
    },
    {
      title: 'Redes e Infraestructura',
      description: 'Protección de sistemas de red',
      path: 'redes'
    },
    {
      title: 'Seguridad Web y AppSec',
      description: 'Protección de aplicaciones y sitios web',
      path: 'web'
    },
    {
      title: 'Cloud & DevSecOps',
      description: 'Seguridad en entornos cloud y pipelines',
      path: 'cloud'
    },
    {
      title: 'Gestión de Identidad',
      description: 'Control de acceso y autenticación',
      path: 'identidad'
    },
    {
      title: 'Endpoint & OT/IoT',
      description: 'Protección de dispositivos y sistemas operacionales',
      path: 'endpoint'
    },
    {
      title: 'Monitorización y Respuesta',
      description: 'Detección y manejo de incidentes',
      path: 'monitorizacion'
    },
    {
      title: 'Forense Digital',
      description: 'Investigación post-incidente',
      path: 'forense'
    },
    {
      title: 'Cumplimiento y Gobierno',
      description: 'Estándares y regulaciones',
      path: 'cumplimiento'
    },
    {
      title: 'Seguridad Física',
      description: 'Controles físicos y continuidad',
      path: 'fisica'
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Wiki de Ciberseguridad</h1>
        
        <SearchBar allArticles={allArticles} />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map(({title, path, description}) => (
            <Link key={path} href={`/recursos/wiki/${path}`}>
              <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 h-full flex flex-col bg-white p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-2">{title}</h2>
                <p className="text-gray-600">{description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
