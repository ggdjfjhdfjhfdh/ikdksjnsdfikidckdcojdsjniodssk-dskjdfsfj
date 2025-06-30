import ArticleLayout from '@/components/wiki/ArticleLayout';
import { FiExternalLink } from 'react-icons/fi';

export default function AppControlPage() {
  return (
    <ArticleLayout 
      title="Application Control"
      description="Whitelisting y Blacklisting de aplicaciones"
      backUrl="/recursos/wiki/endpoint"
    >
      <div className="space-y-10 text-gray-800">
        <section className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Conceptos</h2>
          <div className="prose max-w-none">
            <ul className="list-disc pl-6 space-y-2 mb-4 text-gray-700">
              <li><strong>Whitelisting:</strong> Solo aplicaciones aprobadas</li>
              <li><strong>Blacklisting:</strong> Bloqueo de aplicaciones específicas</li>
              <li><strong>Default Deny:</strong> Filosofía de seguridad</li>
              <li><strong>Code Signing:</strong> Verificación de integridad</li>
            </ul>
          </div>
        </section>

        <section className="bg-blue-50 p-6 rounded-lg border border-blue-200">
          <h2 className="text-2xl font-bold mb-4 text-blue-800">Implementación</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white p-3 rounded shadow">
              <h3 className="font-semibold text-gray-900">Técnicas</h3>
              <ul className="list-disc pl-5 mt-2 text-sm text-gray-700">
                <li>Hash de aplicaciones</li>
                <li>Certificados digitales</li>
                <li>Rutas de ejecución</li>
              </ul>
            </div>
            <div className="bg-white p-3 rounded shadow">
              <h3 className="font-semibold text-gray-900">Herramientas</h3>
              <ul className="list-disc pl-5 mt-2 text-sm text-gray-700">
                <li>Windows AppLocker</li>
                <li>Microsoft Defender Application Control</li>
                <li>Symantec Application Control</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="border-t pt-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Referencias</h2>
          <div className="border-l-4 border-blue-600 pl-4">
            <ul className="space-y-3">
              <li>
                <a href="https://learn.microsoft.com/en-us/windows/security/application-security/application-control/windows-defender-application-control" className="flex items-center text-blue-600 hover:underline">
                  <FiExternalLink className="mr-2" /> Microsoft WDAC
                </a>
              </li>
              <li>
                <a href="https://www.cisecurity.org/controls/application-whitelisting" className="flex items-center text-blue-600 hover:underline">
                  <FiExternalLink className="mr-2" /> CIS Whitelisting Guide
                </a>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </ArticleLayout>
  );
}
