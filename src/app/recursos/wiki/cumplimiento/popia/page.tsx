import ArticleLayout from '@/components/wiki/ArticleLayout';
import { FiExternalLink } from 'react-icons/fi';

export default function POPIAPage() {
  return (
    <ArticleLayout 
      title="POPIA"
      description="Ley de Protección de Información Personal (Sudáfrica)"
      backUrl="/recursos/wiki/cumplimiento"
    >
      <div className="space-y-10 text-gray-800">
        <section className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Principios Clave</h2>
          <div className="prose max-w-none">
            <ul className="list-disc pl-6 space-y-2 mb-4 text-gray-700">
              <li><strong>Procesamiento legítimo:</strong> Propósito específico</li>
              <li><strong>Minimización:</strong> Solo datos necesarios</li>
              <li><strong>Consentimiento:</strong> Explícito e informado</li>
              <li><strong>Derechos ARCO:</strong> Acceso, Rectificación, Cancelación, Oposición</li>
            </ul>
          </div>
        </section>

        <section className="bg-blue-50 p-6 rounded-lg border border-blue-200">
          <h2 className="text-2xl font-bold mb-4 text-blue-800">Implementación</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white p-3 rounded shadow">
              <h3 className="font-semibold text-gray-900">Obligaciones</h3>
              <ul className="list-disc pl-5 mt-2 text-sm text-gray-700">
                <li>Designar un Information Officer</li>
                <li>Evaluaciones de Impacto</li>
                <li>Notificación de brechas (72h)</li>
              </ul>
            </div>
            <div className="bg-white p-3 rounded shadow">
              <h3 className="font-semibold text-gray-900">Sanciones</h3>
              <ul className="list-disc pl-5 mt-2 text-sm text-gray-700">
                <li>Hasta 10M ZAR o 10% facturación</li>
                <li>Responsabilidad penal (hasta 10 años)</li>
                <li>Regulator: Information Regulator SA</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="border-t pt-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Referencias</h2>
          <div className="border-l-4 border-blue-600 pl-4">
            <ul className="space-y-3">
              <li>
                <a href="https://www.justice.gov.za/inforeg/" className="flex items-center text-blue-600 hover:underline">
                  <FiExternalLink className="mr-2" /> Information Regulator
                </a>
              </li>
              <li>
                <a href="https://popia.co.za/" className="flex items-center text-blue-600 hover:underline">
                  <FiExternalLink className="mr-2" /> POPIA Resource Hub
                </a>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </ArticleLayout>
  );
}
