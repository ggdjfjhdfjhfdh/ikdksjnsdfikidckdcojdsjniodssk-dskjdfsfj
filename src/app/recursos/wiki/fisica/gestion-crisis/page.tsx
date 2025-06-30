import ArticleLayout from '@/components/wiki/ArticleLayout';
import { FiExternalLink } from 'react-icons/fi';

export default function GestionCrisisPage() {
  return (
    <ArticleLayout 
      title="Gestión de Crisis"
      description="Protocolos y Comunicación"
      backUrl="/recursos/wiki/fisica"
    >
      <div className="space-y-10 text-gray-800">
        <section className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Componentes Clave</h2>
          <div className="prose max-w-none">
            <ul className="list-disc pl-6 space-y-2 mb-4 text-gray-700">
              <li><strong>Equipo de Crisis:</strong> Roles y responsabilidades definidas</li>
              <li><strong>Protocolos:</strong> Activación, escalado y resolución</li>
              <li><strong>Comunicación:</strong> Interna, externa y con stakeholders</li>
              <li><strong>Documentación:</strong> Registro de decisiones y acciones</li>
            </ul>
          </div>
        </section>

        <section className="bg-blue-50 p-6 rounded-lg border border-blue-200">
          <h2 className="text-2xl font-bold mb-4 text-blue-800">Implementación</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white p-3 rounded shadow">
              <h3 className="font-semibold text-gray-900">Herramientas</h3>
              <ul className="list-disc pl-5 mt-2 text-sm text-gray-700">
                <li>Sistemas de notificación masiva</li>
                <li>Plataformas de colaboración</li>
                <li>Centros de operaciones</li>
              </ul>
            </div>
            <div className="bg-white p-3 rounded shadow">
              <h3 className="font-semibold text-gray-900">Mejores Prácticas</h3>
              <ul className="list-disc pl-5 mt-2 text-sm text-gray-700">
                <li>Simulacros periódicos</li>
                <li>Post-mortem y lecciones aprendidas</li>
                <li>Actualización continua</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="border-t pt-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Referencias</h2>
          <div className="border-l-4 border-blue-600 pl-4">
            <ul className="space-y-3">
              <li>
                <a href="https://www.iso.org/standard/50038.html" className="flex items-center text-blue-600 hover:underline">
                  <FiExternalLink className="mr-2" /> ISO 22320
                </a>
              </li>
              <li>
                <a href="https://www.ready.gov/business/implementation/emergency" className="flex items-center text-blue-600 hover:underline">
                  <FiExternalLink className="mr-2" /> Ready.gov
                </a>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </ArticleLayout>
  );
}
