import BackButton from '@/components/BackButton';

export default function ArticlePage({
  params,
}: {
  params: { slug: string };
}) {
  // Datos del artículo (en un caso real esto vendría de una base de datos)
  const article = {
    id: params.slug,
    title: 'Título del Artículo',
    content: '<p>Este es el contenido del artículo...</p>',
    lastUpdated: '2025-06-30',
    author: 'Equipo de Seguridad',
    difficulty: 'Básico',
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <BackButton href="/recursos/wiki/conceptos" label="Volver a Conceptos" />
      
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mb-2">
                {article.difficulty}
              </span>
              <h1 className="text-3xl font-bold text-gray-900">{article.title}</h1>
            </div>
            <div className="text-sm text-gray-500">
              Actualizado: {article.lastUpdated}
            </div>
          </div>
          
          <div 
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
          
          <div className="mt-8 pt-6 border-t border-gray-200 text-sm text-gray-500">
            Escrito por: {article.author}
          </div>
        </div>
      </div>
    </main>
  );
}
