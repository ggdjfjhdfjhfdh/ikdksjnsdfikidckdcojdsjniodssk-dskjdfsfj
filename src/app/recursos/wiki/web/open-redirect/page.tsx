import ArticleLayout from '@/components/wiki/ArticleLayout';
import { FiExternalLink } from 'react-icons/fi';

export default function OpenRedirectPage() {
  return (
    <ArticleLayout 
      title="Open Redirect & Host Header Injection"
      description="Vulnerabilidades en redirecciones y manipulación de headers"
      backUrl="/recursos/wiki/web"
    >
      <div className="space-y-10 text-gray-800">
        <section className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Vectores de Ataque</h2>
          <div className="prose max-w-none">
            <ul className="list-disc pl-6 space-y-2 mb-4 text-gray-700">
              <li><strong>Open Redirect:</strong> Manipulación de parámetros de redirección</li>
              <li><strong>Host Header Injection:</strong> Spoofing de dominios</li>
              <li><strong>Password Reset Poisoning:</strong> Redirección en flujos críticos</li>
              <li><strong>Cache Poisoning:</strong> Envenenamiento mediante Host header</li>
            </ul>
          </div>
        </section>

        <section className="bg-blue-50 p-6 rounded-lg border border-blue-200">
          <h2 className="text-2xl font-bold mb-4 text-blue-800">Mitigaciones</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white p-3 rounded shadow">
              <h3 className="font-semibold text-gray-900">Open Redirect</h3>
              <ul className="list-disc pl-5 mt-2 text-sm text-gray-700">
                <li>Listas blancas de dominios</li>
                <li>Tokens de redirección</li>
                <li>Validación estricta de URLs</li>
              </ul>
            </div>
            <div className="bg-white p-3 rounded shadow">
              <h3 className="font-semibold text-gray-900">Host Header</h3>
              <ul className="list-disc pl-5 mt-2 text-sm text-gray-700">
                <li>Validar contra lista blanca</li>
                <li>Usar SERVER_NAME en lugar de Host header</li>
                <li>Deshabilitar host header rewriting</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="border-t pt-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Referencias</h2>
          <div className="border-l-4 border-blue-600 pl-4">
            <ul className="space-y-3">
              <li>
                <a href="https://cheatsheetseries.owasp.org/cheatsheets/Unvalidated_Redirects_and_Forwards_Cheat_Sheet.html" className="flex items-center text-blue-600 hover:underline">
                  <FiExternalLink className="mr-2" /> OWASP Redirect Cheat Sheet
                </a>
              </li>
              <li>
                <a href="https://portswigger.net/web-security/host-header" className="flex items-center text-blue-600 hover:underline">
                  <FiExternalLink className="mr-2" /> PortSwigger: Host Header Attacks
                </a>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </ArticleLayout>
  );
}
