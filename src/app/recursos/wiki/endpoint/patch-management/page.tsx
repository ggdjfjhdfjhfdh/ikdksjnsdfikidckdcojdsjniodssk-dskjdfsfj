import ArticleLayout from '@/components/wiki/ArticleLayout';
import { FiExternalLink } from 'react-icons/fi';

export default function PatchManagementPage() {
  return (
    <ArticleLayout 
      title="Patch Management"
      description="Gestión de parches y escaneo de vulnerabilidades"
      backUrl="/recursos/wiki/endpoint"
    >
      <div className="space-y-10 text-gray-800">
        <section className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Proceso de Gestión</h2>
          <div className="prose max-w-none">
            <ul className="list-disc pl-6 space-y-2 mb-4 text-gray-700">
              <li><strong>Inventario:</strong> Identificación de activos</li>
              <li><strong>Priorización:</strong> Basada en criticidad</li>
              <li><strong>Testing:</strong> Validación en entorno controlado</li>
              <li><strong>Despliegue:</strong> Implementación controlada</li>
            </ul>
          </div>
        </section>

        <section className="bg-blue-50 p-6 rounded-lg border border-blue-200">
          <h2 className="text-2xl font-bold mb-4 text-blue-800">Herramientas</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white p-3 rounded shadow">
              <h3 className="font-semibold text-gray-900">Vulnerability Scanning</h3>
              <ul className="list-disc pl-5 mt-2 text-sm text-gray-700">
                <li>Nessus</li>
                <li>Qualys</li>
                <li>OpenVAS</li>
              </ul>
            </div>
            <div className="bg-white p-3 rounded shadow">
              <h3 className="font-semibold text-gray-900">Patch Management</h3>
              <ul className="list-disc pl-5 mt-2 text-sm text-gray-700">
                <li>WSUS</li>
                <li>SCCM</li>
                <li>Ivanti</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="border-t pt-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Referencias</h2>
          <div className="border-l-4 border-blue-600 pl-4">
            <ul className="space-y-3">
              <li>
                <a href="https://www.cisa.gov/resources-tools/services/stakeholder-specific-vulnerability-categorization-ssvc" className="flex items-center text-blue-600 hover:underline">
                  <FiExternalLink className="mr-2" /> CISA SSVC
                </a>
              </li>
              <li>
                <a href="https://csrc.nist.gov/projects/patch-vulnerability-management" className="flex items-center text-blue-600 hover:underline">
                  <FiExternalLink className="mr-2" /> NIST Patch Management
                </a>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </ArticleLayout>
  );
}
