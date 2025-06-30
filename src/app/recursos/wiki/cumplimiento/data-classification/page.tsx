import ArticleLayout from '@/components/wiki/ArticleLayout';
import { FiExternalLink } from 'react-icons/fi';

export default function DataClassificationPage() {
  return (
    <ArticleLayout 
      title="Data Classification"
      description="Retention & Minimization"
      backUrl="/recursos/wiki/cumplimiento"
    >
      <div className="space-y-10 text-gray-800">
        <section className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Niveles de Clasificación</h2>
          <div className="prose max-w-none">
            <ul className="list-disc pl-6 space-y-2 mb-4 text-gray-700">
              <li><strong>Público:</strong> Información no sensible</li>
              <li><strong>Interno:</strong> Uso interno de la organización</li>
              <li><strong>Confidencial:</strong> Daño moderado si se expone</li>
              <li><strong>Secreto:</strong> Daño severo a la organización</li>
            </ul>
          </div>
        </section>

        <section className="bg-blue-50 p-6 rounded-lg border border-blue-200">
          <h2 className="text-2xl font-bold mb-4 text-blue-800">Políticas</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white p-3 rounded shadow">
              <h3 className="font-semibold text-gray-900">Retención</h3>
              <ul className="list-disc pl-5 mt-2 text-sm text-gray-700">
                <li>Plazos legales y operacionales</li>
                <li>Programas de destrucción segura</li>
                <li>Excepciones documentadas</li>
              </ul>
            </div>
            <div className="bg-white p-3 rounded shadow">
              <h3 className="font-semibold text-gray-900">Minimización</h3>
              <ul className="list-disc pl-5 mt-2 text-sm text-gray-700">
                <li>Principio de necesidad</li>
                <li>Pseudonimización/anonymización</li>
                <li>Evaluaciones periódicas</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="border-t pt-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Referencias</h2>
          <div className="border-l-4 border-blue-600 pl-4">
            <ul className="space-y-3">
              <li>
                <a href="https://www.iso.org/standard/73906.html" className="flex items-center text-blue-600 hover:underline">
                  <FiExternalLink className="mr-2" /> ISO 15489 Records Management
                </a>
              </li>
              <li>
                <a href="https://gdpr-info.eu/art-5-gdpr/" className="flex items-center text-blue-600 hover:underline">
                  <FiExternalLink className="mr-2" /> GDPR Artículo 5
                </a>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </ArticleLayout>
  );
}
