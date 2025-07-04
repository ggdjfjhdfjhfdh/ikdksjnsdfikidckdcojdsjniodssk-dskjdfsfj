import ArticleLayout from '@/components/wiki/ArticleLayout';
import { FiExternalLink } from 'react-icons/fi';

export default function IOCPage() {
  return (
    <ArticleLayout 
      title="IOC vs IOA"
      description="Indicadores de compromiso y actividad"
      backUrl="/recursos/wiki/monitorizacion"
    >
      <div className="space-y-10 text-gray-800">
        <section className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Conceptos Clave</h2>
          <div className="prose max-w-none">
            <ul className="list-disc pl-6 space-y-2 mb-4 text-gray-700">
              <li><strong>IOC:</strong> Indicadores de Compromiso</li>
              <li><strong>IOA:</strong> Indicadores de Actividad</li>
              <li><strong>YARA:</strong> Reglas para identificación</li>
              <li><strong>Sigma:</strong> Reglas genéricas de detección</li>
            </ul>
          </div>
        </section>

        <section className="bg-blue-50 p-6 rounded-lg border border-blue-200">
          <h2 className="text-2xl font-bold mb-4 text-blue-800">Implementación</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white p-3 rounded shadow">
              <h3 className="font-semibold text-gray-900">Formatos</h3>
              <ul className="list-disc pl-5 mt-2 text-sm text-gray-700">
                <li>STIX Objects</li>
                <li>OpenIOC</li>
                <li>YAML/JSON</li>
              </ul>
            </div>
            <div className="bg-white p-3 rounded shadow">
              <h3 className="font-semibold text-gray-900">Herramientas</h3>
              <ul className="list-disc pl-5 mt-2 text-sm text-gray-700">
                <li>MISP</li>
                <li>ThreatQ</li>
                <li>Sigma Converter</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="border-t pt-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Referencias</h2>
          <div className="border-l-4 border-blue-600 pl-4">
            <ul className="space-y-3">
              <li>
                <a href="https://yara.readthedocs.io" className="flex items-center text-blue-600 hover:underline">
                  <FiExternalLink className="mr-2" /> YARA Documentation
                </a>
              </li>
              <li>
                <a href="https://github.com/SigmaHQ/sigma" className="flex items-center text-blue-600 hover:underline">
                  <FiExternalLink className="mr-2" /> Sigma GitHub
                </a>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </ArticleLayout>
  );
}
