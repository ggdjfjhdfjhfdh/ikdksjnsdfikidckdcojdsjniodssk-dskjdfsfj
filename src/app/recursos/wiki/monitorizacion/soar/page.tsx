import ArticleLayout from '@/components/wiki/ArticleLayout';
import { FiExternalLink } from 'react-icons/fi';

export default function SOARPage() {
  return (
    <ArticleLayout 
      title="SOAR Playbooks"
      description="Automatización de respuesta a incidentes"
      backUrl="/recursos/wiki/monitorizacion"
    >
      <div className="space-y-10 text-gray-800">
        <section className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Conceptos Clave</h2>
          <div className="prose max-w-none">
            <ul className="list-disc pl-6 space-y-2 mb-4 text-gray-700">
              <li><strong>SOAR:</strong> Security Orchestration, Automation and Response</li>
              <li><strong>Playbooks:</strong> Flujos de respuesta automatizados</li>
              <li><strong>Orquestación:</strong> Integración de herramientas</li>
              <li><strong>Runbooks:</strong> Procedimientos documentados</li>
            </ul>
          </div>
        </section>

        <section className="bg-blue-50 p-6 rounded-lg border border-blue-200">
          <h2 className="text-2xl font-bold mb-4 text-blue-800">Componentes</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white p-3 rounded shadow">
              <h3 className="font-semibold text-gray-900">Automatización</h3>
              <ul className="list-disc pl-5 mt-2 text-sm text-gray-700">
                <li>Contención automática</li>
                <li>Investigación enriquecida</li>
                <li>Notificaciones</li>
              </ul>
            </div>
            <div className="bg-white p-3 rounded shadow">
              <h3 className="font-semibold text-gray-900">Integraciones</h3>
              <ul className="list-disc pl-5 mt-2 text-sm text-gray-700">
                <li>SIEM</li>
                <li>EDR</li>
                <li>Ticketing</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="border-t pt-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Referencias</h2>
          <div className="border-l-4 border-blue-600 pl-4">
            <ul className="space-y-3">
              <li>
                <a href="https://www.sans.org/blog/what-is-soar/" className="flex items-center text-blue-600 hover:underline">
                  <FiExternalLink className="mr-2" /> SANS SOAR Guide
                </a>
              </li>
              <li>
                <a href="https://github.com/phantomcyber/playbooks" className="flex items-center text-blue-600 hover:underline">
                  <FiExternalLink className="mr-2" /> Phantom Playbooks
                </a>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </ArticleLayout>
  );
}
