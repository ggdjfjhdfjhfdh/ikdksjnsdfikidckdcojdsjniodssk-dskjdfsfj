import ArticleLayout from '@/components/wiki/ArticleLayout';
import { FiExternalLink } from 'react-icons/fi';

export default function ISO27001Page() {
  return (
    <ArticleLayout 
      title="ISO 27001 & 27002"
      description="Sistema de Gestión de Seguridad de la Información"
      backUrl="/recursos/wiki/cumplimiento"
    >
      <div className="space-y-10 text-gray-800">
        <section className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Componentes Clave</h2>
          <div className="prose max-w-none">
            <ul className="list-disc pl-6 space-y-2 mb-4 text-gray-700">
              <li><strong>ISO 27001:</strong> Requisitos para SGSI</li>
              <li><strong>ISO 27002:</strong> Controles de seguridad</li>
              <li><strong>Anexo A:</strong> 114 controles organizados en 14 dominios</li>
              <li><strong>Ciclo PDCA:</strong> Planificar-Hacer-Verificar-Actuar</li>
            </ul>
          </div>
        </section>

        <section className="bg-blue-50 p-6 rounded-lg border border-blue-200">
          <h2 className="text-2xl font-bold mb-4 text-blue-800">Implementación</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white p-3 rounded shadow">
              <h3 className="font-semibold text-gray-900">Fases</h3>
              <ul className="list-disc pl-5 mt-2 text-sm text-gray-700">
                <li>Análisis de brechas</li>
                <li>Evaluación de riesgos</li>
                <li>Documentación de políticas</li>
              </ul>
            </div>
            <div className="bg-white p-3 rounded shadow">
              <h3 className="font-semibold text-gray-900">Certificación</h3>
              <ul className="list-disc pl-5 mt-2 text-sm text-gray-700">
                <li>Auditoría etapa 1 (documental)</li>
                <li>Auditoría etapa 2 (implementación)</li>
                <li>Auditorías de seguimiento anuales</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="border-t pt-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Referencias</h2>
          <div className="border-l-4 border-blue-600 pl-4">
            <ul className="space-y-3">
              <li>
                <a href="https://www.iso.org/isoiec-27001-information-security.html" className="flex items-center text-blue-600 hover:underline">
                  <FiExternalLink className="mr-2" /> ISO 27001 Official
                </a>
              </li>
              <li>
                <a href="https://www.isms.online/" className="flex items-center text-blue-600 hover:underline">
                  <FiExternalLink className="mr-2" /> ISMS Online
                </a>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </ArticleLayout>
  );
}
