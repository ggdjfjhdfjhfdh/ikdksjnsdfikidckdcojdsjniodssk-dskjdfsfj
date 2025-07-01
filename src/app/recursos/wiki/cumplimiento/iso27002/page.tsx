import ArticleLayout from '@/components/wiki/ArticleLayout';
import { FiExternalLink } from 'react-icons/fi';

export default function IS027002Page() {
  return (
    <ArticleLayout 
      title="ISO/IEC 27002" 
      description="Guía para la implementación de controles de seguridad de la información"
      backUrl="/recursos/wiki/cumplimiento"
    >
      <div className="space-y-10 text-gray-800">
        <section className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Introducción a ISO/IEC 27002</h2>
          <div className="prose max-w-none">
            <p>ISO/IEC 27002 es una norma internacional que proporciona directrices para los controles de seguridad de la información dentro de un Sistema de Gestión de Seguridad de la Información (SGSI) según se establece en la norma ISO/IEC 27001. Esta norma ofrece un marco de referencia para implementar, mantener y mejorar los controles de seguridad de la información en una organización.</p>
          </div>
        </section>

        <section className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Controles Clave</h2>
          <div className="prose max-w-none">
            <ul className="list-disc pl-6 space-y-2 mb-4 text-gray-700">
              <li><strong>Políticas de seguridad de la información:</strong> Establecer un marco de políticas para iniciar y controlar la implementación de la seguridad de la información.</li>
              <li><strong>Gestión de activos:</strong> Identificar los activos de información y protegerlos adecuadamente.</li>
              <li><strong>Controles de acceso:</strong> Garantizar que el acceso a la información y los sistemas sea autorizado y restringido.</li>
              <li><strong>Criptografía:</strong> Proteger la confidencialidad, autenticidad e integridad de la información mediante técnicas criptográficas.</li>
              <li><strong>Seguridad física y ambiental:</strong> Prevenir el acceso físico no autorizado, daños e interferencias a los activos de información.</li>
              <li><strong>Seguridad en las operaciones:</strong> Garantizar la operación segura y correcta de los sistemas de información.</li>
              <li><strong>Seguridad en las comunicaciones:</strong> Proteger la información en las redes.</li>
              <li><strong>Adquisición, desarrollo y mantenimiento de sistemas:</strong> Integrar la seguridad en los procesos de desarrollo de sistemas.</li>
              <li><strong>Relaciones con proveedores:</strong> Mantener la seguridad de la información en las relaciones con terceros.</li>
              <li><strong>Gestión de incidentes de seguridad de la información:</strong> Planificar y prepararse para responder a incidentes de seguridad.</li>
              <li><strong>Aspectos de seguridad de la información en la gestión de la continuidad del negocio:</strong> Proteger, mantener y recuperar los sistemas críticos tras desastres o interrupciones.</li>
              <li><strong>Cumplimiento:</strong> Evitar incumplimientos de leyes, regulaciones, obligaciones contractuales y cualquier otro requisito de seguridad.</li>
            </ul>
          </div>
        </section>

        <section className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Implementación</h2>
          <div className="prose max-w-none">
            <ol className="list-decimal pl-6 space-y-2 mb-4 text-gray-700">
              <li>Realizar una evaluación de riesgos para identificar vulnerabilidades y amenazas.</li>
              <li>Seleccionar controles apropiados basados en los resultados de la evaluación de riesgos.</li>
              <li>Documentar políticas, procedimientos y responsabilidades.</li>
              <li>Implementar los controles seleccionados.</li>
              <li>Monitorear y revisar continuamente la efectividad de los controles.</li>
              <li>Mejorar continuamente el SGSI basándose en los resultados de las revisiones y auditorías.</li>
            </ol>
          </div>
        </section>

        <section className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Beneficios</h2>
          <div className="prose max-w-none">
            <ul className="list-disc pl-6 space-y-2 mb-4 text-gray-700">
              <li><strong>Protección de información crítica:</strong> Reduce el riesgo de pérdida, robo o daño de información valiosa.</li>
              <li><strong>Cumplimiento normativo:</strong> Ayuda a cumplir con regulaciones como GDPR, CCPA, y otras leyes de protección de datos.</li>
              <li><strong>Mejora de la reputación corporativa:</strong> Demuestra a clientes y socios el compromiso con la seguridad de la información.</li>
              <li><strong>Reducción de costos:</strong> Minimiza el impacto financiero de incidentes de seguridad.</li>
              <li><strong>Ventaja competitiva:</strong> Proporciona una ventaja en licitaciones y relaciones comerciales.</li>
            </ul>
          </div>
        </section>

        <section className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Recursos Adicionales</h2>
          <div className="prose max-w-none">
            <ul className="list-disc pl-6 space-y-2 mb-4 text-gray-700">
              <li>
                <a href="https://www.iso.org/standard/75652.html" className="flex items-center text-blue-600 hover:underline">
                  <FiExternalLink className="mr-2" /> ISO 27002 Official
                </a>
              </li>
              <li>
                <a href="https://www.iso.org/isoiec-27001-information-security.html" className="flex items-center text-blue-600 hover:underline">
                  <FiExternalLink className="mr-2" /> ISO 27001 Information
                </a>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </ArticleLayout>
  );
}
