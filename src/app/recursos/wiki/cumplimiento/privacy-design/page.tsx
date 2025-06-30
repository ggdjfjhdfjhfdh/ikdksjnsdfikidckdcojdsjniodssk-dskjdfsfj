import ArticleLayout from '@/components/wiki/ArticleLayout';
import { FiExternalLink } from 'react-icons/fi';

export default function PrivacyDesignPage() {
  return (
    <ArticleLayout 
      title="Privacy by Design"
      description="& DPIA (Data Protection Impact Assessment)"
      backUrl="/recursos/wiki/cumplimiento"
    >
      <div className="space-y-10 text-gray-800">
        <section className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Principios de PbD</h2>
          <div className="prose max-w-none">
            <ul className="list-disc pl-6 space-y-2 mb-4 text-gray-700">
              <li><strong>Proactivo:</strong> Prevenir, no remediar</li>
              <li><strong>Privacidad por defecto:</strong> Máxima configuración</li>
              <li><strong>Diseño integrado:</strong> No como complemento</li>
              <li><strong>Visibilidad:</strong> Transparencia completa</li>
            </ul>
          </div>
        </section>

        <section className="bg-blue-50 p-6 rounded-lg border border-blue-200">
          <h2 className="text-2xl font-bold mb-4 text-blue-800">DPIA Proceso</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white p-3 rounded shadow">
              <h3 className="font-semibold text-gray-900">Evaluación</h3>
              <ul className="list-disc pl-5 mt-2 text-sm text-gray-700">
                <li>Necesidad y proporcionalidad</li>
                <li>Identificación de riesgos</li>
                <li>Medidas de mitigación</li>
              </ul>
            </div>
            <div className="bg-white p-3 rounded shadow">
              <h3 className="font-semibold text-gray-900">Resultados</h3>
              <ul className="list-disc pl-5 mt-2 text-sm text-gray-700">
                <li>Documentación obligatoria</li>
                <li>Consulta con autoridades</li>
                <li>Revisión periódica</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="border-t pt-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Referencias</h2>
          <div className="border-l-4 border-blue-600 pl-4">
            <ul className="space-y-3">
              <li>
                <a href="https://iapp.org/resources/article/privacy-by-design/" className="flex items-center text-blue-600 hover:underline">
                  <FiExternalLink className="mr-2" /> IAPP PbD Framework
                </a>
              </li>
              <li>
                <a href="https://gdpr-info.eu/art-35-gdpr/" className="flex items-center text-blue-600 hover:underline">
                  <FiExternalLink className="mr-2" /> GDPR Artículo 35
                </a>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </ArticleLayout>
  );
}
