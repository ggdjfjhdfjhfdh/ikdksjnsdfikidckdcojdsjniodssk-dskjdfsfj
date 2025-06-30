import ArticleLayout from '@/components/wiki/ArticleLayout';
import { FiExternalLink } from 'react-icons/fi';

export default function PAMPage() {
  return (
    <ArticleLayout 
      title="Privileged Access Management (PAM)"
      description="Gestión segura de cuentas con privilegios elevados"
      backUrl="/recursos/wiki/identidad"
    >
      <div className="space-y-10 text-gray-800">
        <section className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Principios Clave</h2>
          <div className="prose max-w-none">
            <ul className="list-disc pl-6 space-y-2 mb-4 text-gray-700">
              <li><strong>Just-in-Time:</strong> Acceso temporal cuando se necesita</li>
              <li><strong>Just-Enough:</strong> Mínimos privilegios necesarios</li>
              <li><strong>Segregation:</strong> Separación de deberes</li>
              <li><strong>Rotation:</strong> Rotación regular de credenciales</li>
            </ul>
          </div>
        </section>

        <section className="bg-blue-50 p-6 rounded-lg border border-blue-200">
          <h2 className="text-2xl font-bold mb-4 text-blue-800">Componentes PAM</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white p-3 rounded shadow">
              <h3 className="font-semibold text-gray-900">Discovery</h3>
              <ul className="list-disc pl-5 mt-2 text-sm text-gray-700">
                <li>Identificar cuentas privilegiadas</li>
                <li>Mapear relaciones y dependencias</li>
              </ul>
            </div>
            <div className="bg-white p-3 rounded shadow">
              <h3 className="font-semibold text-gray-900">Control</h3>
              <ul className="list-disc pl-5 mt-2 text-sm text-gray-700">
                <li>Vault para almacenar credenciales</li>
                <li>Sesiones supervisadas</li>
                <li>Workflow de aprobación</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="border-t pt-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Referencias</h2>
          <div className="border-l-4 border-blue-600 pl-4">
            <ul className="space-y-3">
              <li>
                <a href="https://www.gartner.com/reviews/market/privileged-access-management" className="flex items-center text-blue-600 hover:underline">
                  <FiExternalLink className="mr-2" /> Gartner PAM Market Guide
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
