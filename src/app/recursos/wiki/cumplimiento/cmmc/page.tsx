import ArticleLayout from '@/components/wiki/ArticleLayout';
import { FiExternalLink } from 'react-icons/fi';

export default function CMMCPage() {
  return (
    <ArticleLayout 
      title="CMMC"
      description="Modelo de Madurez de Ciberseguridad (DoD EE.UU.)"
      backUrl="/recursos/wiki/cumplimiento"
    >
      <div className="space-y-10 text-gray-800">
        <section className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Niveles de Certificación</h2>
          <div className="prose max-w-none">
            <ul className="list-disc pl-6 space-y-2 mb-4 text-gray-700">
              <li><strong>Nivel 1:</strong> 17 prácticas básicas</li>
              <li><strong>Nivel 2:</strong> 110 prácticas (transición)</li>
              <li><strong>Nivel 3:</strong> 110+ prácticas avanzadas</li>
              <li><strong>Obligatorio:</strong> Para contratistas DoD</li>
            </ul>
          </div>
        </section>

        <section className="bg-blue-50 p-6 rounded-lg border border-blue-200">
          <h2 className="text-2xl font-bold mb-4 text-blue-800">Dominios Clave</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white p-3 rounded shadow">
              <h3 className="font-semibold text-gray-900">Controles</h3>
              <ul className="list-disc pl-5 mt-2 text-sm text-gray-700">
                <li>Acceso Control</li>
                <li>Gestión de Identidad</li>
                <li>Protección de Medios</li>
              </ul>
            </div>
            <div className="bg-white p-3 rounded shadow">
              <h3 className="font-semibold text-gray-900">Procesos</h3>
              <ul className="list-disc pl-5 mt-2 text-sm text-gray-700">
                <li>Evaluación de Riesgos</li>
                <li>Gestión de Configuración</li>
                <li>Respuesta a Incidentes</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="border-t pt-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Referencias</h2>
          <div className="border-l-4 border-blue-600 pl-4">
            <ul className="space-y-3">
              <li>
                <a href="https://www.acq.osd.mil/cmmc/" className="flex items-center text-blue-600 hover:underline">
                  <FiExternalLink className="mr-2" /> DoD CMMC Oficial
                </a>
              </li>
              <li>
                <a href="https://www.nist.gov/itl/applied-cybersecurity/nist-cybersecurity-cmmc-project" className="flex items-center text-blue-600 hover:underline">
                  <FiExternalLink className="mr-2" /> NIST CMMC
                </a>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </ArticleLayout>
  );
}
