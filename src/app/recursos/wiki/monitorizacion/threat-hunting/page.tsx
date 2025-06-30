import ArticleLayout from '@/components/wiki/ArticleLayout';
import { FiExternalLink } from 'react-icons/fi';

export default function ThreatHuntingPage() {
  return (
    <ArticleLayout 
      title="Threat Hunting"
      description="Caza de amenazas y Purple Teaming"
      backUrl="/recursos/wiki/monitorizacion"
    >
      <div className="space-y-10 text-gray-800">
        <section className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Metodologías</h2>
          <div className="prose max-w-none">
            <ul className="list-disc pl-6 space-y-2 mb-4 text-gray-700">
              <li><strong>Hypothesis-Driven:</strong> Basado en TTPs conocidas</li>
              <li><strong>Data-Driven:</strong> Análisis de anomalías</li>
              <li><strong>Purple Teaming:</strong> Colaboración ofensa/defensa</li>
              <li><strong>Atomic Hunting:</strong> Búsqueda de indicadores específicos</li>
            </ul>
          </div>
        </section>

        <section className="bg-blue-50 p-6 rounded-lg border border-blue-200">
          <h2 className="text-2xl font-bold mb-4 text-blue-800">Técnicas</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white p-3 rounded shadow">
              <h3 className="font-semibold text-gray-900">Hunting</h3>
              <ul className="list-disc pl-5 mt-2 text-sm text-gray-700">
                <li>Log analysis</li>
                <li>Endpoint forensics</li>
                <li>Memory analysis</li>
              </ul>
            </div>
            <div className="bg-white p-3 rounded shadow">
              <h3 className="font-semibold text-gray-900">Purple Team</h3>
              <ul className="list-disc pl-5 mt-2 text-sm text-gray-700">
                <li>Simulación de adversarios</li>
                <li>Validación de controles</li>
                <li>Mejora de detección</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="border-t pt-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Referencias</h2>
          <div className="border-l-4 border-blue-600 pl-4">
            <ul className="space-y-3">
              <li>
                <a href="https://www.sans.org/white-papers/37130/" className="flex items-center text-blue-600 hover:underline">
                  <FiExternalLink className="mr-2" /> SANS Threat Hunting
                </a>
              </li>
              <li>
                <a href="https://github.com/redcanaryco/atomic-red-team" className="flex items-center text-blue-600 hover:underline">
                  <FiExternalLink className="mr-2" /> Atomic Red Team
                </a>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </ArticleLayout>
  );
}
