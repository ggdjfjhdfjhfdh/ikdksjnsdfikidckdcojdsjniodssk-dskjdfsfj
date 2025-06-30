import ArticleLayout from '@/components/wiki/ArticleLayout';
import { FiExternalLink } from 'react-icons/fi';

export default function GDPRPage() {
  return (
    <ArticleLayout 
      title="GDPR & LOPDGDD"
      description="Reglamento Europeo y Ley Orgánica de Protección de Datos"
      backUrl="/recursos/wiki/cumplimiento"
    >
      <div className="space-y-10 text-gray-800">
        <section className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Principios Clave</h2>
          <div className="prose max-w-none">
            <ul className="list-disc pl-6 space-y-2 mb-4 text-gray-700">
              <li><strong>Leyenda:</strong> Consentimiento explícito e informado</li>
              <li><strong>Minimización:</strong> Solo datos necesarios</li>
              <li><strong>Limitación:</strong> Finalidad específica</li>
              <li><strong>Derechos ARCO+:</strong> Acceso, Rectificación, Cancelación, Oposición</li>
            </ul>
          </div>
        </section>

        <section className="bg-blue-50 p-6 rounded-lg border border-blue-200">
          <h2 className="text-2xl font-bold mb-4 text-blue-800">Especificidades Españolas</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white p-3 rounded shadow">
              <h3 className="font-semibold text-gray-900">LOPDGDD</h3>
              <ul className="list-disc pl-5 mt-2 text-sm text-gray-700">
                <li>Edad consentimiento: 14 años</li>
                <li>Delegado de Protección de Datos</li>
                <li>Registro de Actividades de Tratamiento</li>
              </ul>
            </div>
            <div className="bg-white p-3 rounded shadow">
              <h3 className="font-semibold text-gray-900">Sanciones</h3>
              <ul className="list-disc pl-5 mt-2 text-sm text-gray-700">
                <li>Hasta 20M€ o 4% facturación global</li>
                <li>Infracciones graves/leves/muy graves</li>
                <li>AEPD como autoridad competente</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="border-t pt-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Referencias</h2>
          <div className="border-l-4 border-blue-600 pl-4">
            <ul className="space-y-3">
              <li>
                <a href="https://gdpr-info.eu/" className="flex items-center text-blue-600 hover:underline">
                  <FiExternalLink className="mr-2" /> GDPR Texto Completo
                </a>
              </li>
              <li>
                <a href="https://www.aepd.es/es" className="flex items-center text-blue-600 hover:underline">
                  <FiExternalLink className="mr-2" /> AEPD Oficial
                </a>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </ArticleLayout>
  );
}
