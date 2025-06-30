// Template inicial para categoría Amenazas y Ataques

import ArticleLayout from '@/components/wiki/ArticleLayout';

export default function AmenazasAtaquesPage() {
  return (
    <ArticleLayout 
      title="Amenazas y Ataques" 
      description="Catálogo de vectores de ataque modernos y técnicas ofensivas"
      backUrl="/recursos/wiki"
    >
      <div className="space-y-8 text-gray-800">
        <section className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h2 className="text-2xl font-bold mb-4">Categorías Principales</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="border border-gray-200 rounded-lg p-4 bg-blue-50 shadow-sm">
              <h3 className="font-semibold mb-2 text-blue-800">Por Vector</h3>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Redes</li>
                <li>Aplicaciones</li>
                <li>Humanos</li>
                <li>Físicos</li>
              </ul>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4 bg-red-50 shadow-sm">
              <h3 className="font-semibold mb-2 text-red-800">Por Técnica</h3>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Ingeniería social</li>
                <li>Explotación de vulnerabilidades</li>
                <li>Ataques de fuerza bruta</li>
                <li>Zero-day</li>
              </ul>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4 bg-purple-50 shadow-sm">
              <h3 className="font-semibold mb-2 text-purple-800">Por Impacto</h3>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Denegación de servicio</li>
                <li>Exfiltración de datos</li>
                <li>Ejecución remota</li>
                <li>Escalación de privilegios</li>
              </ul>
            </div>
          </div>
        </section>
        
        <section className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Artículos Disponibles</h2>
          <div className="grid gap-4">
            <div className="border-l-4 border-blue-500 pl-4 py-2">
              <p className="text-gray-600">Próximamente: contenido detallado por tipo de amenaza</p>
            </div>
          </div>
        </section>
      </div>
    </ArticleLayout>
  );
}
