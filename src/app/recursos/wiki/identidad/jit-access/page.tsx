import ArticleLayout from '@/components/wiki/ArticleLayout';
import { FiExternalLink } from 'react-icons/fi';

export default function JITAccessPage() {
  return (
    <ArticleLayout 
      title="Just-in-Time / Just-Enough Access"
      description="Modelo de acceso privilegiado temporal y mínimo"
      backUrl="/recursos/wiki/identidad"
    >
      <div className="space-y-10 text-gray-800">
        <section className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Principios Clave</h2>
          <div className="prose max-w-none">
            <ul className="list-disc pl-6 space-y-2 mb-4 text-gray-700">
              <li><strong>Temporalidad:</strong> Acceso con fecha de expiración</li>
              <li><strong>Mínimos Privilegios:</strong> Solo lo necesario para la tarea</li>
              <li><strong>Workflow:</strong> Aprobación previa requerida</li>
              <li><strong>Auditoría:</strong> Registro completo de actividades</li>
            </ul>
          </div>
        </section>

        <section className="bg-blue-50 p-6 rounded-lg border border-blue-200">
          <h2 className="text-2xl font-bold mb-4 text-blue-800">Implementación</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white p-3 rounded shadow">
              <h3 className="font-semibold text-gray-900">Cloud</h3>
              <ul className="list-disc pl-5 mt-2 text-sm text-gray-700">
                <li>Azure PIM (Privileged Identity Management)</li>
                <li>AWS IAM Access Analyzer</li>
                <li>GCP IAM Recommender</li>
              </ul>
            </div>
            <div className="bg-white p-3 rounded shadow">
              <h3 className="font-semibold text-gray-900">Enterprise</h3>
              <ul className="list-disc pl-5 mt-2 text-sm text-gray-700">
                <li>CyberArk</li>
                <li>BeyondTrust</li>
                <li>Thycotic</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="border-t pt-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Referencias</h2>
          <div className="border-l-4 border-blue-600 pl-4">
            <ul className="space-y-3">
              <li>
                <a href="https://learn.microsoft.com/en-us/azure/active-directory/privileged-identity-management/pim-configure" className="flex items-center text-blue-600 hover:underline">
                  <FiExternalLink className="mr-2" /> Azure PIM Documentation
                </a>
              </li>
              <li>
                <a href="https://www.nist.gov/publications/privileged-account-management" className="flex items-center text-blue-600 hover:underline">
                  <FiExternalLink className="mr-2" /> NIST PAM Guidelines
                </a>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </ArticleLayout>
  );
}
