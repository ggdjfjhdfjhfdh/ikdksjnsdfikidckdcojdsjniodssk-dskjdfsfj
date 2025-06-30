import ArticleLayout from '@/components/wiki/ArticleLayout';
import { FiExternalLink } from 'react-icons/fi';

export default function SOARAutomationPage() {
  return (
    <ArticleLayout 
      title="Automatización SOAR & Policy-as-Code"
      description="Automatización de seguridad y gestión de políticas como código"
      backUrl="/recursos/wiki/cloud"
    >
      <div className="space-y-10 text-gray-800">
        <section className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Componentes Clave</h2>
          <div className="prose max-w-none">
            <ul className="list-disc pl-6 space-y-2 mb-4 text-gray-700">
              <li><strong>SOAR:</strong> Security Orchestration, Automation and Response</li>
              <li><strong>Policy-as-Code:</strong> Definición de políticas en version control</li>
              <li><strong>Workflows:</strong> Automatización de procesos de seguridad</li>
              <li><strong>Integraciones:</strong> Con SIEM, ticketing, etc.</li>
            </ul>
          </div>
        </section>

        <section className="bg-blue-50 p-6 rounded-lg border border-blue-200">
          <h2 className="text-2xl font-bold mb-4 text-blue-800">Herramientas</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white p-3 rounded shadow">
              <h3 className="font-semibold text-gray-900">SOAR</h3>
              <ul className="list-disc pl-5 mt-2 text-sm text-gray-700">
                <li>Splunk Phantom</li>
                <li>IBM Resilient</li>
                <li>Demisto (Palo Alto)</li>
              </ul>
            </div>
            <div className="bg-white p-3 rounded shadow">
              <h3 className="font-semibold text-gray-900">Policy-as-Code</h3>
              <ul className="list-disc pl-5 mt-2 text-sm text-gray-700">
                <li>Open Policy Agent (OPA)</li>
                <li>Checkov</li>
                <li>Sentinel (HashiCorp)</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="border-t pt-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Referencias</h2>
          <div className="border-l-4 border-blue-600 pl-4">
            <ul className="space-y-3">
              <li>
                <a href="https://www.openpolicyagent.org/" className="flex items-center text-blue-600 hover:underline">
                  <FiExternalLink className="mr-2" /> Open Policy Agent
                </a>
              </li>
              <li>
                <a href="https://www.gartner.com/reviews/market/security-orchestration-automation-response" className="flex items-center text-blue-600 hover:underline">
                  <FiExternalLink className="mr-2" /> Gartner SOAR Market Guide
                </a>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </ArticleLayout>
  );
}
