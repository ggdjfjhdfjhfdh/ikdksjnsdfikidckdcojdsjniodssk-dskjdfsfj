import ArticleLayout from '@/components/wiki/ArticleLayout';
import { FiExternalLink } from 'react-icons/fi';

export default function SIEMPage() {
  return (
    <ArticleLayout 
      title="SIEM & Log Management"
      description="Correlación de eventos y gestión centralizada de logs"
      backUrl="/recursos/wiki/monitorizacion"
    >
      <div className="space-y-10 text-gray-800">
        <section className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Componentes Clave</h2>
          <div className="prose max-w-none">
            <ul className="list-disc pl-6 space-y-2 mb-4 text-gray-700">
              <li><strong>Agentes:</strong> Recolección de logs</li>
              <li><strong>Normalización:</strong> Formato común</li>
              <li><strong>Correlación:</strong> Reglas de detección</li>
              <li><strong>Dashboards:</strong> Visualización</li>
            </ul>
          </div>
        </section>

        <section className="bg-blue-50 p-6 rounded-lg border border-blue-200">
          <h2 className="text-2xl font-bold mb-4 text-blue-800">Soluciones</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white p-3 rounded shadow">
              <h3 className="font-semibold text-gray-900">Enterprise</h3>
              <ul className="list-disc pl-5 mt-2 text-sm text-gray-700">
                <li>Splunk</li>
                <li>IBM QRadar</li>
                <li>Microsoft Sentinel</li>
              </ul>
            </div>
            <div className="bg-white p-3 rounded shadow">
              <h3 className="font-semibold text-gray-900">Open Source</h3>
              <ul className="list-disc pl-5 mt-2 text-sm text-gray-700">
                <li>ELK Stack</li>
                <li>Wazuh</li>
                <li>Graylog</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="border-t pt-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Referencias</h2>
          <div className="border-l-4 border-blue-600 pl-4">
            <ul className="space-y-3">
              <li>
                <a href="https://www.gartner.com/reviews/market/security-information-event-management" className="flex items-center text-blue-600 hover:underline">
                  <FiExternalLink className="mr-2" /> Gartner SIEM Market
                </a>
              </li>
              <li>
                <a href="https://csrc.nist.gov/publications/detail/sp/800-137/final" className="flex items-center text-blue-600 hover:underline">
                  <FiExternalLink className="mr-2" /> NIST SP 800-137
                </a>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </ArticleLayout>
  );
}
