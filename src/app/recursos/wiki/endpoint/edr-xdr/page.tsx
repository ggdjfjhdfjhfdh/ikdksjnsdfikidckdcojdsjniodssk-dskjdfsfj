import ArticleLayout from '@/components/wiki/ArticleLayout';
import { FiExternalLink } from 'react-icons/fi';

export default function EDRXDRPage() {
  return (
    <ArticleLayout 
      title="EDR / XDR"
      description="Detección y respuesta en endpoints y sistemas"
      backUrl="/recursos/wiki/endpoint"
    >
      <div className="space-y-10 text-gray-800">
        <section className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Conceptos Clave</h2>
          <div className="prose max-w-none">
            <ul className="list-disc pl-6 space-y-2 mb-4 text-gray-700">
              <li><strong>EDR:</strong> Endpoint Detection and Response</li>
              <li><strong>XDR:</strong> Extended Detection and Response</li>
              <li><strong>Telemetría:</strong> Recolección de datos de seguridad</li>
              <li><strong>Behavioral Analysis:</strong> Detección de anomalías</li>
            </ul>
          </div>
        </section>

        <section className="bg-blue-50 p-6 rounded-lg border border-blue-200">
          <h2 className="text-2xl font-bold mb-4 text-blue-800">Capacidades Principales</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white p-3 rounded shadow">
              <h3 className="font-semibold text-gray-900">Detección</h3>
              <ul className="list-disc pl-5 mt-2 text-sm text-gray-700">
                <li>Malware avanzado</li>
                <li>Amenazas persistentes</li>
                <li>Actividad sospechosa</li>
              </ul>
            </div>
            <div className="bg-white p-3 rounded shadow">
              <h3 className="font-semibold text-gray-900">Respuesta</h3>
              <ul className="list-disc pl-5 mt-2 text-sm text-gray-700">
                <li>Aislamiento de endpoints</li>
                <li>Terminación de procesos</li>
                <li>Remedio automático</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="border-t pt-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Referencias</h2>
          <div className="border-l-4 border-blue-600 pl-4">
            <ul className="space-y-3">
              <li>
                <a href="https://www.gartner.com/reviews/market/endpoint-detection-and-response-solutions" className="flex items-center text-blue-600 hover:underline">
                  <FiExternalLink className="mr-2" /> Gartner EDR Market Guide
                </a>
              </li>
              <li>
                <a href="https://www.paloaltonetworks.com/cyberpedia/what-is-xdr" className="flex items-center text-blue-600 hover:underline">
                  <FiExternalLink className="mr-2" /> XDR Explained
                </a>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </ArticleLayout>
  );
}
