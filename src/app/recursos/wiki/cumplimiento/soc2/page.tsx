import ArticleLayout from '@/components/wiki/ArticleLayout';
import { FiExternalLink } from 'react-icons/fi';

export default function SOC2Page() {
  return (
    <ArticleLayout 
      title="SOC 2"
      description="Trust Service Criteria"
      backUrl="/recursos/wiki/cumplimiento"
    >
      <div className="space-y-10 text-gray-800">
        <section className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Criterios de Confianza</h2>
          <div className="prose max-w-none">
            <ul className="list-disc pl-6 space-y-2 mb-4 text-gray-700">
              <li><strong>Seguridad:</strong> Protección contra accesos no autorizados</li>
              <li><strong>Disponibilidad:</strong> Accesibilidad del sistema</li>
              <li><strong>Procesamiento:</strong> Integridad y completitud</li>
              <li><strong>Confidencialidad:</strong> Protección de información sensible</li>
              <li><strong>Privacidad:</strong> Manejo de datos personales</li>
            </ul>
          </div>
        </section>

        <section className="bg-blue-50 p-6 rounded-lg border border-blue-200">
          <h2 className="text-2xl font-bold mb-4 text-blue-800">Tipos de Reportes</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white p-3 rounded shadow">
              <h3 className="font-semibold text-gray-900">SOC 2 Tipo I</h3>
              <ul className="list-disc pl-5 mt-2 text-sm text-gray-700">
                <li>Evaluación puntual</li>
                <li>Diseño de controles</li>
                <li>Fecha específica</li>
              </ul>
            </div>
            <div className="bg-white p-3 rounded shadow">
              <h3 className="font-semibold text-gray-900">SOC 2 Tipo II</h3>
              <ul className="list-disc pl-5 mt-2 text-sm text-gray-700">
                <li>Evaluación periódica (6-12 meses)</li>
                <li>Efectividad operativa</li>
                <li>Período de tiempo</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="border-t pt-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Referencias</h2>
          <div className="border-l-4 border-blue-600 pl-4">
            <ul className="space-y-3">
              <li>
                <a href="https://www.aicpa.org/interestareas/frc/assuranceadvisoryservices/aicpasoc2report.html" className="flex items-center text-blue-600 hover:underline">
                  <FiExternalLink className="mr-2" /> AICPA SOC 2
                </a>
              </li>
              <li>
                <a href="https://trustservicescriteria.org/" className="flex items-center text-blue-600 hover:underline">
                  <FiExternalLink className="mr-2" /> TSC Official
                </a>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </ArticleLayout>
  );
}
