import ArticleLayout from '@/components/wiki/ArticleLayout';
import { FiExternalLink } from 'react-icons/fi';

export default function FedRAMPPage() {
  return (
    <ArticleLayout 
      title="FedRAMP"
      description="Estándar de seguridad para proveedores cloud del gobierno US"
      backUrl="/recursos/wiki/cumplimiento"
    >
      <div className="space-y-10 text-gray-800">
        <section className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Niveles de Impacto</h2>
          <div className="prose max-w-none">
            <ul className="list-disc pl-6 space-y-2 mb-4 text-gray-700">
              <li><strong>Low:</strong> Información pública o de bajo impacto</li>
              <li><strong>Moderate:</strong> Información sensible pero no crítica</li>
              <li><strong>High:</strong> Información de seguridad nacional</li>
              <li><strong>Proceso:</strong> 6-18 meses, costos $2M-$5M</li>
            </ul>
          </div>
        </section>

        <section className="bg-blue-50 p-6 rounded-lg border border-blue-200">
          <h2 className="text-2xl font-bold mb-4 text-blue-800">Rutas de Autorización</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white p-3 rounded shadow">
              <h3 className="font-semibold text-gray-900">JAB</h3>
              <ul className="list-disc pl-5 mt-2 text-sm text-gray-700">
                <li>Joint Authorization Board</li>
                <li>Evaluación por terceros</li>
                <li>Proceso más riguroso</li>
              </ul>
            </div>
            <div className="bg-white p-3 rounded shadow">
              <h3 className="font-semibold text-gray-900">Agencia</h3>
              <ul className="list-disc pl-5 mt-2 text-sm text-gray-700">
                <li>Patrocinio de agencia federal</li>
                <li>Proceso más rápido</li>
                <li>Limitado a esa agencia</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="border-t pt-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Referencias</h2>
          <div className="border-l-4 border-blue-600 pl-4">
            <ul className="space-y-3">
              <li>
                <a href="https://www.fedramp.gov/" className="flex items-center text-blue-600 hover:underline">
                  <FiExternalLink className="mr-2" /> FedRAMP Oficial
                </a>
              </li>
              <li>
                <a href="https://marketplace.fedramp.gov/" className="flex items-center text-blue-600 hover:underline">
                  <FiExternalLink className="mr-2" /> Marketplace Autorizado
                </a>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </ArticleLayout>
  );
}
