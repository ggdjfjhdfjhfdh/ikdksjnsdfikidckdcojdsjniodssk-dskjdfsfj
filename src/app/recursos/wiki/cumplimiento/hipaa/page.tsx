import ArticleLayout from '@/components/wiki/ArticleLayout';
import { FiExternalLink } from 'react-icons/fi';

export default function HIPAAPage() {
  return (
    <ArticleLayout 
      title="HIPAA"
      description="Protección de información de salud electrónica (ePHI)"
      backUrl="/recursos/wiki/cumplimiento"
    >
      <div className="space-y-10 text-gray-800">
        <section className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Componentes Clave</h2>
          <div className="prose max-w-none">
            <ul className="list-disc pl-6 space-y-2 mb-4 text-gray-700">
              <li><strong>Regla de Privacidad:</strong> Uso y divulgación de ePHI</li>
              <li><strong>Regla de Seguridad:</strong> Salvaguardas técnicas/físicas/administrativas</li>
              <li><strong>Regla de Notificación:</strong> Breaches de datos</li>
              <li><strong>BAAs:</strong> Business Associate Agreements</li>
            </ul>
          </div>
        </section>

        <section className="bg-blue-50 p-6 rounded-lg border border-blue-200">
          <h2 className="text-2xl font-bold mb-4 text-blue-800">Implementación</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white p-3 rounded shadow">
              <h3 className="font-semibold text-gray-900">Controles Técnicos</h3>
              <ul className="list-disc pl-5 mt-2 text-sm text-gray-700">
                <li>Acceso basado en roles</li>
                <li>Audit logs</li>
                <li>Cifrado en tránsito/reposo</li>
              </ul>
            </div>
            <div className="bg-white p-3 rounded shadow">
              <h3 className="font-semibold text-gray-900">Procesos</h3>
              <ul className="list-disc pl-5 mt-2 text-sm text-gray-700">
                <li>Evaluaciones de riesgo anuales</li>
                <li>Formación del personal</li>
                <li>Plan de contingencia</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="border-t pt-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Referencias</h2>
          <div className="border-l-4 border-blue-600 pl-4">
            <ul className="space-y-3">
              <li>
                <a href="https://www.hhs.gov/hipaa/index.html" className="flex items-center text-blue-600 hover:underline">
                  <FiExternalLink className="mr-2" /> HHS HIPAA
                </a>
              </li>
              <li>
                <a href="https://www.healthit.gov/topic/privacy-security-and-hipaa/hipaa-security-rule" className="flex items-center text-blue-600 hover:underline">
                  <FiExternalLink className="mr-2" /> Security Rule Guide
                </a>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </ArticleLayout>
  );
}
