import ArticleLayout from '@/components/wiki/ArticleLayout';
import { FiExternalLink } from 'react-icons/fi';

export default function MetricasPage() {
  return (
    <ArticleLayout 
      title="Métricas de Respuesta"
      description="MTTD, MTTR y KPIs de seguridad"
      backUrl="/recursos/wiki/monitorizacion"
    >
      <div className="space-y-10 text-gray-800">
        <section className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Métricas Clave</h2>
          <div className="prose max-w-none">
            <ul className="list-disc pl-6 space-y-2 mb-4 text-gray-700">
              <li><strong>MTTD:</strong> Mean Time to Detect</li>
              <li><strong>MTTR:</strong> Mean Time to Respond</li>
              <li><strong>MTTI:</strong> Mean Time to Investigate</li>
              <li><strong>MTTC:</strong> Mean Time to Contain</li>
            </ul>
          </div>
        </section>

        <section className="bg-blue-50 p-6 rounded-lg border border-blue-200">
          <h2 className="text-2xl font-bold mb-4 text-blue-800">Mejora Continua</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white p-3 rounded shadow">
              <h3 className="font-semibold text-gray-900">Reducción de Tiempos</h3>
              <ul className="list-disc pl-5 mt-2 text-sm text-gray-700">
                <li>Automatización</li>
                <li>Playbooks estandarizados</li>
                <li>Monitoreo continuo</li>
              </ul>
            </div>
            <div className="bg-white p-3 rounded shadow">
              <h3 className="font-semibold text-gray-900">Benchmarking</h3>
              <ul className="list-disc pl-5 mt-2 text-sm text-gray-700">
                <li>Comparación con estándares</li>
                <li>Evolución histórica</li>
                <li>Objetivos SMART</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="border-t pt-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Referencias</h2>
          <div className="border-l-4 border-blue-600 pl-4">
            <ul className="space-y-3">
              <li>
                <a href="https://www.sans.org/white-papers/36250/" className="flex items-center text-blue-600 hover:underline">
                  <FiExternalLink className="mr-2" /> SANS Security Metrics
                </a>
              </li>
              <li>
                <a href="https://www.cisecurity.org/insights/white-papers/metrics-that-matter" className="flex items-center text-blue-600 hover:underline">
                  <FiExternalLink className="mr-2" /> CIS Security Metrics
                </a>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </ArticleLayout>
  );
}
