import ArticleLayout from '@/components/wiki/ArticleLayout';
import { FiExternalLink } from 'react-icons/fi';

export default function NIS2Page() {
  return (
    <ArticleLayout 
      title="NIS2"
      description="Directiva UE sobre seguridad de redes y sistemas"
      backUrl="/recursos/wiki/cumplimiento"
    >
      <div className="space-y-10 text-gray-800">
        <section className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Ámbito de Aplicación</h2>
          <div className="prose max-w-none">
            <ul className="list-disc pl-6 space-y-2 mb-4 text-gray-700">
              <li><strong>Sectores esenciales:</strong> Energía, transporte, salud</li>
              <li><strong>Sectores importantes:</strong> Digital, alimentación, manufactura</li>
              <li><strong>Umbrales:</strong> Medianas y grandes empresas</li>
              <li><strong>Cadena de suministro:</strong> Responsabilidad extendida</li>
            </ul>
          </div>
        </section>

        <section className="bg-blue-50 p-6 rounded-lg border border-blue-200">
          <h2 className="text-2xl font-bold mb-4 text-blue-800">Requisitos Clave</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white p-3 rounded shadow">
              <h3 className="font-semibold text-gray-900">Gestión de Riesgos</h3>
              <ul className="list-disc pl-5 mt-2 text-sm text-gray-700">
                <li>Evaluaciones periódicas</li>
                <li>Políticas de seguridad</li>
                <li>Continuidad del negocio</li>
              </ul>
            </div>
            <div className="bg-white p-3 rounded shadow">
              <h3 className="font-semibold text-gray-900">Obligaciones</h3>
              <ul className="list-disc pl-5 mt-2 text-sm text-gray-700">
                <li>Notificación de incidentes (24h)</li>
                <li>Auditorías de cumplimiento</li>
                <li>Sanciones hasta 10M€ o 2% facturación</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="border-t pt-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Referencias</h2>
          <div className="border-l-4 border-blue-600 pl-4">
            <ul className="space-y-3">
              <li>
                <a href="https://digital-strategy.ec.europa.eu/en/policies/nis2-directive" className="flex items-center text-blue-600 hover:underline">
                  <FiExternalLink className="mr-2" /> Comisión Europea NIS2
                </a>
              </li>
              <li>
                <a href="https://www.enisa.europa.eu/topics/nis-directives" className="flex items-center text-blue-600 hover:underline">
                  <FiExternalLink className="mr-2" /> ENISA NIS2
                </a>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </ArticleLayout>
  );
}
