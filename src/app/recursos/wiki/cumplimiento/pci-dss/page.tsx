import ArticleLayout from '@/components/wiki/ArticleLayout';
import { FiExternalLink } from 'react-icons/fi';

export default function PCIDSSPage() {
  return (
    <ArticleLayout 
      title="PCI DSS v4.0"
      description="Estándar de seguridad para datos de tarjetas"
      backUrl="/recursos/wiki/cumplimiento"
    >
      <div className="space-y-10 text-gray-800">
        <section className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Requisitos Clave</h2>
          <div className="prose max-w-none">
            <ul className="list-disc pl-6 space-y-2 mb-4 text-gray-700">
              <li><strong>Ámbito:</strong> Almacenamiento, procesamiento y transmisión de datos de tarjetas</li>
              <li><strong>Niveles:</strong> 1-4 según volumen de transacciones</li>
              <li><strong>SAQ:</strong> Self-Assessment Questionnaires</li>
              <li><strong>Novedades v4.0:</strong> Enfoque basado en riesgo, autenticación multifactor</li>
            </ul>
          </div>
        </section>

        <section className="bg-blue-50 p-6 rounded-lg border border-blue-200">
          <h2 className="text-2xl font-bold mb-4 text-blue-800">Implementación</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white p-3 rounded shadow">
              <h3 className="font-semibold text-gray-900">Controles Técnicos</h3>
              <ul className="list-disc pl-5 mt-2 text-sm text-gray-700">
                <li>Segmentación de redes</li>
                <li>Cifrado de datos en tránsito/reposo</li>
                <li>Monitoreo continuo</li>
              </ul>
            </div>
            <div className="bg-white p-3 rounded shadow">
              <h3 className="font-semibold text-gray-900">Procesos</h3>
              <ul className="list-disc pl-5 mt-2 text-sm text-gray-700">
                <li>Gestión de vulnerabilidades</li>
                <li>Formación de empleados</li>
                <li>Pruebas de penetración anuales</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="border-t pt-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Referencias</h2>
          <div className="border-l-4 border-blue-600 pl-4">
            <ul className="space-y-3">
              <li>
                <a href="https://www.pcisecuritystandards.org/document_library" className="flex items-center text-blue-600 hover:underline">
                  <FiExternalLink className="mr-2" /> PCI SSC Documentación
                </a>
              </li>
              <li>
                <a href="https://www.pcisecuritystandards.org/security_standards/documents.php" className="flex items-center text-blue-600 hover:underline">
                  <FiExternalLink className="mr-2" /> Guía de Implementación
                </a>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </ArticleLayout>
  );
}
