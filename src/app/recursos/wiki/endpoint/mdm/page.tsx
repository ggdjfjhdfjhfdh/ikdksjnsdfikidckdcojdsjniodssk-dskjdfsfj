import ArticleLayout from '@/components/wiki/ArticleLayout';
import { FiExternalLink } from 'react-icons/fi';

export default function MDMPage() {
  return (
    <ArticleLayout 
      title="MDM / MAM"
      description="Gestión de dispositivos y aplicaciones móviles"
      backUrl="/recursos/wiki/endpoint"
    >
      <div className="space-y-10 text-gray-800">
        <section className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Definiciones</h2>
          <div className="prose max-w-none">
            <ul className="list-disc pl-6 space-y-2 mb-4 text-gray-700">
              <li><strong>MDM:</strong> Mobile Device Management</li>
              <li><strong>MAM:</strong> Mobile Application Management</li>
              <li><strong>BYOD:</strong> Bring Your Own Device</li>
              <li><strong>COPE:</strong> Corporately Owned, Personally Enabled</li>
            </ul>
          </div>
        </section>

        <section className="bg-blue-50 p-6 rounded-lg border border-blue-200">
          <h2 className="text-2xl font-bold mb-4 text-blue-800">Funcionalidades Clave</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white p-3 rounded shadow">
              <h3 className="font-semibold text-gray-900">MDM</h3>
              <ul className="list-disc pl-5 mt-2 text-sm text-gray-700">
                <li>Configuración remota</li>
                <li>Inventario de dispositivos</li>
                <li>Wipe remoto</li>
              </ul>
            </div>
            <div className="bg-white p-3 rounded shadow">
              <h3 className="font-semibold text-gray-900">MAM</h3>
              <ul className="list-disc pl-5 mt-2 text-sm text-gray-700">
                <li>Contenedores seguros</li>
                <li>Políticas por aplicación</li>
                <li>Distribución de apps</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="border-t pt-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Referencias</h2>
          <div className="border-l-4 border-blue-600 pl-4">
            <ul className="space-y-3">
              <li>
                <a href="https://learn.microsoft.com/en-us/mem/intune/fundamentals/what-is-device-management" className="flex items-center text-blue-600 hover:underline">
                  <FiExternalLink className="mr-2" /> Microsoft Intune
                </a>
              </li>
              <li>
                <a href="https://www.vmware.com/products/workspace-one.html" className="flex items-center text-blue-600 hover:underline">
                  <FiExternalLink className="mr-2" /> VMware Workspace ONE
                </a>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </ArticleLayout>
  );
}
