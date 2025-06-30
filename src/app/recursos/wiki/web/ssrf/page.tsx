import ArticleLayout from '@/components/wiki/ArticleLayout';
import { FiExternalLink } from 'react-icons/fi';

export default function SSRFPage() {
  return (
    <ArticleLayout 
      title="Server-Side Request Forgery (SSRF)"
      description="Ataques y protecciones contra solicitudes maliciosas desde servidores"
      backUrl="/recursos/wiki/web"
    >
      <div className="space-y-10 text-gray-800">
        <section className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Vectores de Ataque</h2>
          <div className="prose max-w-none">
            <ul className="list-disc pl-6 space-y-2 mb-4 text-gray-700">
              <li><strong>Metadata APIs:</strong> AWS, GCP, Azure metadata services</li>
              <li><strong>Internal Services:</strong> Acceso a servicios internos</li>
              <li><strong>Port Scanning:</strong> Escaneo de puertos internos</li>
              <li><strong>File Disclosure:</strong> Lectura de archivos locales (file://)</li>
            </ul>
          </div>
        </section>

        <section className="bg-blue-50 p-6 rounded-lg border border-blue-200">
          <h2 className="text-2xl font-bold mb-4 text-blue-800">Mitigaciones</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white p-3 rounded shadow">
              <h3 className="font-semibold text-gray-900">Prevención</h3>
              <ul className="list-disc pl-5 mt-2 text-sm text-gray-700">
                <li>Listas blancas de dominios</li>
                <li>Validación estricta de URLs</li>
                <li>Deshabilitar esquemas peligrosos (file://, gopher://)</li>
              </ul>
            </div>
            <div className="bg-white p-3 rounded shadow">
              <h3 className="font-semibold text-gray-900">Detección</h3>
              <ul className="list-disc pl-5 mt-2 text-sm text-gray-700">
                <li>Monitoreo de solicitudes salientes</li>
                <li>Network policies restrictivas</li>
                <li>Canary tokens para metadata APIs</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="border-t pt-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Referencias</h2>
          <div className="border-l-4 border-blue-600 pl-4">
            <ul className="space-y-3">
              <li>
                <a href="https://cheatsheetseries.owasp.org/cheatsheets/Server_Side_Request_Forgery_Prevention_Cheat_Sheet.html" className="flex items-center text-blue-600 hover:underline">
                  <FiExternalLink className="mr-2" /> OWASP SSRF Prevention Cheat Sheet
                </a>
              </li>
              <li>
                <a href="https://cwe.mitre.org/data/definitions/918.html" className="flex items-center text-blue-600 hover:underline">
                  <FiExternalLink className="mr-2" /> CWE-918: Server-Side Request Forgery
                </a>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </ArticleLayout>
  );
}
