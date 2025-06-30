import ArticleLayout from '@/components/wiki/ArticleLayout';
import { FiExternalLink } from 'react-icons/fi';

export default function RASPPage() {
  return (
    <ArticleLayout 
      title="RASP (Runtime Application Self-Protection)"
      description="Protección de aplicaciones en tiempo de ejecución"
      backUrl="/recursos/wiki/web"
    >
      <div className="space-y-10 text-gray-800">
        <section className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Características Principales</h2>
          <div className="prose max-w-none">
            <ul className="list-disc pl-6 space-y-2 mb-4 text-gray-700">
              <li><strong>Detección en Runtime:</strong> Monitoreo continuo del comportamiento</li>
              <li><strong>Protección contra:</strong> Inyecciones, deserialización maliciosa, etc.</li>
              <li><strong>Integración:</strong> Directamente en la aplicación o como middleware</li>
              <li><strong>Autoprotección:</strong> Bloqueo automático de ataques</li>
            </ul>
          </div>
        </section>

        <section className="bg-blue-50 p-6 rounded-lg border border-blue-200">
          <h2 className="text-2xl font-bold mb-4 text-blue-800">Implementación</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white p-3 rounded shadow">
              <h3 className="font-semibold text-gray-900">Ventajas</h3>
              <ul className="list-disc pl-5 mt-2 text-sm text-gray-700">
                <li>Protección contra 0-days</li>
                <li>Visibilidad completa del contexto</li>
                <li>Bajo tasa de falsos positivos</li>
              </ul>
            </div>
            <div className="bg-white p-3 rounded shadow">
              <h3 className="font-semibold text-gray-900">Consideraciones</h3>
              <ul className="list-disc pl-5 mt-2 text-sm text-gray-700">
                <li>Impacto en performance</li>
                <li>Configuración compleja</li>
                <li>No reemplaza WAF/SAST</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="border-t pt-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Referencias</h2>
          <div className="border-l-4 border-blue-600 pl-4">
            <ul className="space-y-3">
              <li>
                <a href="https://owasp.org/www-project-rasp/" className="flex items-center text-blue-600 hover:underline">
                  <FiExternalLink className="mr-2" /> OWASP RASP Project
                </a>
              </li>
              <li>
                <a href="https://www.gartner.com/reviews/market/runtime-application-self-protection" className="flex items-center text-blue-600 hover:underline">
                  <FiExternalLink className="mr-2" /> Gartner RASP Market Guide
                </a>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </ArticleLayout>
  );
}
