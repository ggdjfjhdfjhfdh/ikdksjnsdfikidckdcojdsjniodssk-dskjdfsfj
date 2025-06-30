import ArticleLayout from '@/components/wiki/ArticleLayout';
import { FiExternalLink } from 'react-icons/fi';

export default function CloudForensicsPage() {
  return (
    <ArticleLayout 
      title="Cloud Forensics"
      description="AWS, Azure y GCP"
      backUrl="/recursos/wiki/forense"
    >
      <div className="space-y-10 text-gray-800">
        <section className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Retos Clave</h2>
          <div className="prose max-w-none">
            <ul className="list-disc pl-6 space-y-2 mb-4 text-gray-700">
              <li><strong>Multi-tenancy:</strong> Aislamiento de datos</li>
              <li><strong>Logging:</strong> Configuración necesaria</li>
              <li><strong>Jurisdicción:</strong> Ubicación de datos</li>
              <li><strong>API:</strong> Acceso programático</li>
            </ul>
          </div>
        </section>

        <section className="bg-blue-50 p-6 rounded-lg border border-blue-200">
          <h2 className="text-2xl font-bold mb-4 text-blue-800">Herramientas</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white p-3 rounded shadow">
              <h3 className="font-semibold text-gray-900">AWS</h3>
              <ul className="list-disc pl-5 mt-2 text-sm text-gray-700">
                <li>CloudTrail</li>
                <li>VPC Flow Logs</li>
                <li>GuardDuty</li>
              </ul>
            </div>
            <div className="bg-white p-3 rounded shadow">
              <h3 className="font-semibold text-gray-900">Azure</h3>
              <ul className="list-disc pl-5 mt-2 text-sm text-gray-700">
                <li>Sentinel</li>
                <li>Activity Logs</li>
                <li>Defender for Cloud</li>
              </ul>
            </div>
            <div className="bg-white p-3 rounded shadow">
              <h3 className="font-semibold text-gray-900">GCP</h3>
              <ul className="list-disc pl-5 mt-2 text-sm text-gray-700">
                <li>Cloud Audit Logs</li>
                <li>Chronicle</li>
                <li>Security Command Center</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="border-t pt-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Referencias</h2>
          <div className="border-l-4 border-blue-600 pl-4">
            <ul className="space-y-3">
              <li>
                <a href="https://docs.aws.amazon.com/whitepapers/latest/aws-security-incident-response-guide/welcome.html" className="flex items-center text-blue-600 hover:underline">
                  <FiExternalLink className="mr-2" /> AWS IR Guide
                </a>
              </li>
              <li>
                <a href="https://learn.microsoft.com/en-us/azure/security/fundamentals/log-audit" className="flex items-center text-blue-600 hover:underline">
                  <FiExternalLink className="mr-2" /> Azure Logging
                </a>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </ArticleLayout>
  );
}
