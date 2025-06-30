import ArticleLayout from '@/components/wiki/ArticleLayout';
import { FiExternalLink } from 'react-icons/fi';

export default function SharedResponsibilityPage() {
  return (
    <ArticleLayout 
      title="Modelo de Responsabilidad Compartida"
      description="División de responsabilidades de seguridad en AWS/Azure/GCP"
      backUrl="/recursos/wiki/cloud"
    >
      <div className="space-y-10 text-gray-800">
        <section className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Responsabilidades del Proveedor</h2>
          <div className="prose max-w-none">
            <ul className="list-disc pl-6 space-y-2 mb-4 text-gray-700">
              <li><strong>Infraestructura física:</strong> Centros de datos, redes, hosts</li>
              <li><strong>Servicios gestionados:</strong> Bases de datos, almacenamiento, computación</li>
              <li><strong>Controles de seguridad físicos:</strong> Acceso, energía redundante, etc.</li>
            </ul>
          </div>
        </section>

        <section className="bg-blue-50 p-6 rounded-lg border border-blue-200">
          <h2 className="text-2xl font-bold mb-4 text-blue-800">Responsabilidades del Cliente</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white p-3 rounded shadow text-center">
              <p className="font-semibold text-sm text-gray-900">IaaS</p>
              <p className="text-xs text-gray-600">Sistema operativo, aplicaciones, datos</p>
            </div>
            <div className="bg-white p-3 rounded shadow text-center">
              <p className="font-semibold text-sm text-gray-900">PaaS</p>
              <p className="text-xs text-gray-600">Aplicaciones, datos, configuración</p>
            </div>
            <div className="bg-white p-3 rounded shadow text-center">
              <p className="font-semibold text-sm text-gray-900">SaaS</p>
              <p className="text-xs text-gray-600">Datos y configuración</p>
            </div>
          </div>
        </section>

        <section className="border-t pt-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Referencias</h2>
          <div className="border-l-4 border-blue-600 pl-4">
            <ul className="space-y-3">
              <li>
                <a href="https://aws.amazon.com/compliance/shared-responsibility-model/" className="flex items-center text-blue-600 hover:underline">
                  <FiExternalLink className="mr-2" /> AWS Shared Responsibility Model
                </a>
              </li>
              <li>
                <a href="https://learn.microsoft.com/en-us/azure/security/fundamentals/shared-responsibility" className="flex items-center text-blue-600 hover:underline">
                  <FiExternalLink className="mr-2" /> Azure Shared Responsibility
                </a>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </ArticleLayout>
  );
}
