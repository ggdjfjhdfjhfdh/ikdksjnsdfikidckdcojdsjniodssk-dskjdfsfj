import ArticleLayout from '@/components/wiki/ArticleLayout';
import { FiExternalLink } from 'react-icons/fi';

export default function SecurityTestingPage() {
  return (
    <ArticleLayout 
      title="SAST/DAST/IAST"
      description="Técnicas de testing de seguridad estático, dinámico e interactivo"
      backUrl="/recursos/wiki/web"
    >
      <div className="space-y-10 text-gray-800">
        <section className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Tipos de Testing</h2>
          <div className="prose max-w-none">
            <ul className="list-disc pl-6 space-y-2 mb-4 text-gray-700">
              <li><strong>SAST:</strong> Static Application Security Testing (análisis de código)</li>
              <li><strong>DAST:</strong> Dynamic Application Security Testing (pruebas en runtime)</li>
              <li><strong>IAST:</strong> Interactive Application Security Testing (instrumentación)</li>
              <li><strong>SCA:</strong> Software Composition Analysis (dependencias)</li>
            </ul>
          </div>
        </section>

        <section className="bg-blue-50 p-6 rounded-lg border border-blue-200">
          <h2 className="text-2xl font-bold mb-4 text-blue-800">Comparativa</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white p-3 rounded shadow text-center">
              <p className="font-semibold text-sm text-gray-900">SAST</p>
              <p className="text-xs text-gray-600">Early in SDLC</p>
              <p className="text-xs text-gray-600">High false positives</p>
            </div>
            <div className="bg-white p-3 rounded shadow text-center">
              <p className="font-semibold text-sm text-gray-900">DAST</p>
              <p className="text-xs text-gray-600">Production-like</p>
              <p className="text-xs text-gray-600">Misses logic flaws</p>
            </div>
            <div className="bg-white p-3 rounded shadow text-center">
              <p className="font-semibold text-sm text-gray-900">IAST</p>
              <p className="text-xs text-gray-600">Best accuracy</p>
              <p className="text-xs text-gray-600">Runtime overhead</p>
            </div>
          </div>
        </section>

        <section className="border-t pt-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Referencias</h2>
          <div className="border-l-4 border-blue-600 pl-4">
            <ul className="space-y-3">
              <li>
                <a href="https://owasp.org/www-community/Source_Code_Analysis_Tools" className="flex items-center text-blue-600 hover:underline">
                  <FiExternalLink className="mr-2" /> OWASP SAST Tools
                </a>
              </li>
              <li>
                <a href="https://owasp.org/www-project-devsecops-guideline/latest/02b-Dynamic-Application-Security-Testing" className="flex items-center text-blue-600 hover:underline">
                  <FiExternalLink className="mr-2" /> OWASP DAST Guide
                </a>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </ArticleLayout>
  );
}
