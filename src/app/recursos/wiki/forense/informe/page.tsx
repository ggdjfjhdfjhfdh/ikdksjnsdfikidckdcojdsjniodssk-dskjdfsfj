import ArticleLayout from '@/components/wiki/ArticleLayout';
import { FiExternalLink } from 'react-icons/fi';

export default function InformeForensePage() {
  return (
    <ArticleLayout 
      title="Informe Forense"
      description="Evidencia legal y reportes"
      backUrl="/recursos/wiki/forense"
    >
      <div className="space-y-10 text-gray-800">
        <section className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Estructura del Informe</h2>
          <div className="prose max-w-none">
            <ul className="list-disc pl-6 space-y-2 mb-4 text-gray-700">
              <li><strong>Resumen Ejecutivo:</strong> Hallazgos clave</li>
              <li><strong>Metodología:</strong> Herramientas y técnicas</li>
              <li><strong>Evidencia:</strong> Artefactos encontrados</li>
              <li><strong>Conclusiones:</strong> Impacto y recomendaciones</li>
            </ul>
          </div>
        </section>

        <section className="bg-blue-50 p-6 rounded-lg border border-blue-200">
          <h2 className="text-2xl font-bold mb-4 text-blue-800">Aspectos Legales</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white p-3 rounded shadow">
              <h3 className="font-semibold text-gray-900">Admisibilidad</h3>
              <ul className="list-disc pl-5 mt-2 text-sm text-gray-700">
                <li>Cadena de custodia</li>
                <li>Reproducibilidad</li>
                <li>Documentación</li>
              </ul>
            </div>
            <div className="bg-white p-3 rounded shadow">
              <h3 className="font-semibold text-gray-900">Estándares</h3>
              <ul className="list-disc pl-5 mt-2 text-sm text-gray-700">
                <li>ISO 27037</li>
                <li>NIST SP 800-86</li>
                <li>RFC 3227</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="border-t pt-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Referencias</h2>
          <div className="border-l-4 border-blue-600 pl-4">
            <ul className="space-y-3">
              <li>
                <a href="https://www.nist.gov/itl/ssd/software-quality-group/computer-forensics-tool-testing-program-cftt" className="flex items-center text-blue-600 hover:underline">
                  <FiExternalLink className="mr-2" /> NIST CFTT
                </a>
              </li>
              <li>
                <a href="https://www.iso.org/standard/44381.html" className="flex items-center text-blue-600 hover:underline">
                  <FiExternalLink className="mr-2" /> ISO 27037
                </a>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </ArticleLayout>
  );
}
