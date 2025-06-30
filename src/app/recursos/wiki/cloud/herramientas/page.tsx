import ArticleLayout from '@/components/wiki/ArticleLayout';
import { FiExternalLink } from 'react-icons/fi';

export default function CloudSecurityToolsPage() {
  return (
    <ArticleLayout 
      title="CSPM, CWPP, CNAPP, CASB"
      description="Herramientas de seguridad para entornos cloud"
      backUrl="/recursos/wiki/cloud"
    >
      <div className="space-y-10 text-gray-800">
        <section className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Categorías Principales</h2>
          <div className="prose max-w-none">
            <ul className="list-disc pl-6 space-y-2 mb-4 text-gray-700">
              <li><strong>CSPM:</strong> Cloud Security Posture Management (gestión de configuración segura)</li>
              <li><strong>CWPP:</strong> Cloud Workload Protection Platform (protección de cargas de trabajo)</li>
              <li><strong>CNAPP:</strong> Cloud-Native Application Protection Platform (plataforma unificada)</li>
              <li><strong>CASB:</strong> Cloud Access Security Broker (seguridad en acceso a SaaS)</li>
            </ul>
          </div>
        </section>

        <section className="bg-blue-50 p-6 rounded-lg border border-blue-200">
          <h2 className="text-2xl font-bold mb-4 text-blue-800">Ejemplos de Herramientas</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white p-3 rounded shadow">
              <h3 className="font-semibold text-gray-900">CSPM</h3>
              <ul className="list-disc pl-5 mt-2 text-sm text-gray-700">
                <li>Prisma Cloud (Palo Alto)</li>
                <li>Wiz</li>
                <li>Orca Security</li>
              </ul>
            </div>
            <div className="bg-white p-3 rounded shadow">
              <h3 className="font-semibold text-gray-900">CWPP</h3>
              <ul className="list-disc pl-5 mt-2 text-sm text-gray-700">
                <li>Aqua Security</li>
                <li>Sysdig Secure</li>
                <li>Twistlock</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="border-t pt-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Referencias</h2>
          <div className="border-l-4 border-blue-600 pl-4">
            <ul className="space-y-3">
              <li>
                <a href="https://www.gartner.com/reviews/market/cloud-security-posture-management" className="flex items-center text-blue-600 hover:underline">
                  <FiExternalLink className="mr-2" /> Gartner CSPM Market Guide
                </a>
              </li>
              <li>
                <a href="https://www.gartner.com/reviews/market/cloud-workload-protection-platforms" className="flex items-center text-blue-600 hover:underline">
                  <FiExternalLink className="mr-2" /> Gartner CWPP Market Guide
                </a>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </ArticleLayout>
  );
}
