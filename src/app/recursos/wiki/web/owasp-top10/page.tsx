import ArticleLayout from '@/components/wiki/ArticleLayout';
import { FiExternalLink } from 'react-icons/fi';

export default function OwaspTop10Page() {
  return (
    <ArticleLayout 
      title="OWASP Top 10"
      description="Principales vulnerabilidades de seguridad en aplicaciones web"
      backUrl="/recursos/wiki/web"
    >
      <div className="space-y-10 text-gray-800">
        <section className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Vulnerabilidades Principales</h2>
          <div className="prose max-w-none">
            <ul className="list-disc pl-6 space-y-2 mb-4 text-gray-700">
              <li><strong>Broken Access Control:</strong> Fallos en controles de acceso</li>
              <li><strong>Cryptographic Failures:</strong> Problemas en cifrado de datos</li>
              <li><strong>Injection:</strong> SQLi, NoSQLi, Command Injection</li>
              <li><strong>Insecure Design:</strong> Fallos en diseño de seguridad</li>
              <li><strong>Security Misconfiguration:</strong> Configuraciones inseguras</li>
              <li><strong>Vulnerable Components:</strong> Dependencias vulnerables</li>
              <li><strong>Authentication Failures:</strong> Problemas en autenticación</li>
              <li><strong>Software/Data Integrity:</strong> Falsificación de datos</li>
              <li><strong>Security Logging Failures:</strong> Falta de monitoreo</li>
              <li><strong>SSRF:</strong> Server-Side Request Forgery</li>
            </ul>
          </div>
        </section>

        <section className="bg-blue-50 p-6 rounded-lg border border-blue-200">
          <h2 className="text-2xl font-bold mb-4 text-blue-800">Mitigaciones</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white p-3 rounded shadow">
              <h3 className="font-semibold text-gray-900">Prevención</h3>
              <ul className="list-disc pl-5 mt-2 text-sm text-gray-700">
                <li>Principio de menor privilegio</li>
                <li>Validación de inputs</li>
                <li>Autenticación fuerte</li>
              </ul>
            </div>
            <div className="bg-white p-3 rounded shadow">
              <h3 className="font-semibold text-gray-900">Detección</h3>
              <ul className="list-disc pl-5 mt-2 text-sm text-gray-700">
                <li>SAST/DAST</li>
                <li>Code reviews</li>
                <li>Pentesting</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="border-t pt-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Referencias</h2>
          <div className="border-l-4 border-blue-600 pl-4">
            <ul className="space-y-3">
              <li>
                <a href="https://owasp.org/www-project-top-ten/" className="flex items-center text-blue-600 hover:underline">
                  <FiExternalLink className="mr-2" /> OWASP Top 10 Official
                </a>
              </li>
              <li>
                <a href="https://cheatsheetseries.owasp.org/" className="flex items-center text-blue-600 hover:underline">
                  <FiExternalLink className="mr-2" /> OWASP Cheat Sheets
                </a>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </ArticleLayout>
  );
}
