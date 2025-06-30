import Link from 'next/link';
import BackButton from '@/components/BackButton';

const articles = [
  {
    id: 'firewall',
    title: '¿Qué es un Firewall?',
    description: 'Explicación sobre sistemas de protección perimetral',
    difficulty: 'Básico',
  },
  {
    id: 'malware',
    title: 'Tipos de Malware',
    description: 'Guía completa sobre virus, ransomware y otras amenazas',
    difficulty: 'Intermedio',
  },
  {
    id: 'encryption',
    title: 'Encriptación 101',
    description: 'Fundamentos de cifrado de datos',
    difficulty: 'Básico',
  },
];

export default function ConceptosPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <BackButton href="/recursos/wiki" label="Volver a Wiki" />
      
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Conceptos Básicos</h1>
        <p className="text-lg text-gray-600 mb-8">
          Fundamentos de seguridad informática explicados de forma sencilla
        </p>
        
        <div className="space-y-4">
          {articles.map((article) => (
            <Link
              key={article.id}
              href={`/recursos/wiki/conceptos/${article.id}`}
              className="block bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-all border border-gray-200"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-1">{article.title}</h2>
              <p className="text-gray-600 mb-2">{article.description}</p>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {article.difficulty}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
