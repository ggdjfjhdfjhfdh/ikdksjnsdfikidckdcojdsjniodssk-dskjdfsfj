import ArticleLayout from '@/components/wiki/ArticleLayout';
import { FiExternalLink } from 'react-icons/fi';

export default function TimelinePage() {
  return (
    <ArticleLayout 
      title="Timeline Analysis"
      description="Creación de líneas de tiempo forenses"
      backUrl="/recursos/wiki/forense"
    >
      <div className="space-y-10 text-gray-800">
        <section className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Fuentes de Datos</h2>
          <div className="prose max-w-none">
            <ul className="list-disc pl-6 space-y-2 mb-4 text-gray-700">
              <li><strong>Metadata:</strong> MAC times (Modified, Accessed, Changed)</li>
              <li><strong>Logs:</strong> Event logs, syslog, auth.log</li>
              <li><strong>Registro:</strong> Windows Registry timelines</li>
              <li><strong>Prefetch:</strong> Ejecución de programas en Windows</li>
            </ul>
          </div>
        </section>

        <section className="bg-blue-50 p-6 rounded-lg border border-blue-200">
          <h2 className="text-2xl font-bold mb-4 text-blue-800">Herramientas</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white p-3 rounded shadow">
              <h3 className="font-semibold text-gray-900">PlumHound</h3>
              <ul className="list-disc pl-5 mt-2 text-sm text-gray-700">
                <li>Generación automatizada</li>
                <li>Visualización interactiva</li>
                <li>Integración con BloodHound</li>
              </ul>
            </div>
            <div className="bg-white p-3 rounded shadow">
              <h3 className="font-semibold text-gray-900">Log2Timeline</h3>
              <ul className="list-disc pl-5 mt-2 text-sm text-gray-700">
                <li>Plaso framework</li>
                <li>Soporte múltiples formatos</li>
                <li>Generación de líneas de tiempo</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="border-t pt-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Referencias</h2>
          <div className="border-l-4 border-blue-600 pl-4">
            <ul className="space-y-3">
              <li>
                <a href="https://plaso.readthedocs.io" className="flex items-center text-blue-600 hover:underline">
                  <FiExternalLink className="mr-2" /> Plaso Documentation
                </a>
              </li>
              <li>
                <a href="https://github.com/PlumHound/PlumHound" className="flex items-center text-blue-600 hover:underline">
                  <FiExternalLink className="mr-2" /> PlumHound GitHub
                </a>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </ArticleLayout>
  );
}
