import ArticleLayout from '@/components/wiki/ArticleLayout';
import { FiExternalLink } from 'react-icons/fi';

export default function SecurityHeadersPage() {
  return (
    <ArticleLayout 
      title="HSTS, CSP, SRI"
      description="Cabeceras de seguridad avanzadas para protección web"
      backUrl="/recursos/wiki/web"
    >
      <div className="space-y-10 text-gray-800">
        <section className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Cabeceras Clave</h2>
          <div className="prose max-w-none">
            <ul className="list-disc pl-6 space-y-2 mb-4 text-gray-700">
              <li><strong>HSTS:</strong> HTTP Strict Transport Security</li>
              <li><strong>CSP:</strong> Content Security Policy</li>
              <li><strong>SRI:</strong> Subresource Integrity</li>
              <li><strong>SameSite Cookies:</strong> Protección CSRF</li>
            </ul>
          </div>
        </section>

        <section className="bg-blue-50 p-6 rounded-lg border border-blue-200">
          <h2 className="text-2xl font-bold mb-4 text-blue-800">Configuraciones Recomendadas</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white p-3 rounded shadow">
              <h3 className="font-semibold text-gray-900">HSTS</h3>
              <code className="text-xs block bg-gray-100 p-2 rounded">Strict-Transport-Security: max-age=63072000; includeSubDomains; preload</code>
            </div>
            <div className="bg-white p-3 rounded shadow">
              <h3 className="font-semibold text-gray-900">CSP</h3>
              <code className="text-xs block bg-gray-100 p-2 rounded">Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'</code>
            </div>
          </div>
        </section>

        <section className="border-t pt-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Referencias</h2>
          <div className="border-l-4 border-blue-600 pl-4">
            <ul className="space-y-3">
              <li>
                <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy" className="flex items-center text-blue-600 hover:underline">
                  <FiExternalLink className="mr-2" /> MDN: CSP Documentation
                </a>
              </li>
              <li>
                <a href="https://hstspreload.org/" className="flex items-center text-blue-600 hover:underline">
                  <FiExternalLink className="mr-2" /> HSTS Preload List
                </a>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </ArticleLayout>
  );
}
