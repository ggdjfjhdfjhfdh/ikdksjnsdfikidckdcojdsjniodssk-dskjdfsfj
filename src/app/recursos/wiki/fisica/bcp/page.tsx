import ArticleLayout from '@/components/wiki/ArticleLayout';
import { FiExternalLink } from 'react-icons/fi';

export default function BCPPage() {
  return (
    <ArticleLayout 
      title="BCP"
      description="Business Continuity Plan"
      backUrl="/recursos/wiki/fisica"
    >
      <div className="space-y-10 text-gray-800">
        <section className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Componentes Clave</h2>
          <div className="prose max-w-none">
            <ul className="list-disc pl-6 space-y-2 mb-4 text-gray-700">
              <li><strong>Análisis de Impacto:</strong> BIA (Business Impact Analysis)</li>
              <li><strong>Estrategias de Recuperación:</strong> RTO, RPO</li>
              <li><strong>Equipos de Respuesta:</strong> Roles y responsabilidades</li>
              <li><strong>Procedimientos:</strong> Activación, ejecución, retorno</li>
            </ul>
          </div>
        </section>

        <section className="bg-blue-50 p-6 rounded-lg border border-blue-200">
          <h2 className="text-2xl font-bold mb-4 text-blue-800">Implementación</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white p-3 rounded shadow">
              <h3 className="font-semibold text-gray-900">Metodologías</h3>
              <ul className="list-disc pl-5 mt-2 text-sm text-gray-700">
                <li>ISO 22301</li>
                <li>NIST SP 800-34</li>
                <li>BS 25999</li>
              </ul>
            </div>
            <div className="bg-white p-3 rounded shadow">
              <h3 className="font-semibold text-gray-900">Ejecución</h3>
              <ul className="list-disc pl-5 mt-2 text-sm text-gray-700">
                <li>Sitios alternativos</li>
                <li>Proveedores críticos</li>
                <li>Comunicación de crisis</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="border-t pt-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Referencias</h2>
          <div className="border-l-4 border-blue-600 pl-4">
            <ul className="space-y-3">
              <li>
                <a href="https://www.iso.org/standard/75106.html" className="flex items-center text-blue-600 hover:underline">
                  <FiExternalLink className="mr-2" /> ISO 22301
                </a>
              </li>
              <li>
                <a href="https://csrc.nist.gov/publications/detail/sp/800-34/rev-1/final" className="flex items-center text-blue-600 hover:underline">
                  <FiExternalLink className="mr-2" /> NIST SP 800-34
                </a>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </ArticleLayout>
  );
}
