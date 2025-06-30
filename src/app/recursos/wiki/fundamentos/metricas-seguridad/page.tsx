import ArticleLayout from '@/components/wiki/ArticleLayout';
import { FiExternalLink } from 'react-icons/fi';

export default function MetricasSeguridadPage() {
  return (
    <ArticleLayout 
      title="Métricas de Seguridad" 
      description="Indicadores cuantitativos y cualitativos para medir la postura de seguridad de una organización"
      backUrl="/recursos/wiki/fundamentos"
    >
      <div className="space-y-10 text-gray-800">
        <section className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h2 className="text-2xl font-bold mb-4">Fundamentos de Métricas de Seguridad</h2>
          <div className="prose max-w-none">
            <p className="mb-4">
              Las <strong>métricas de seguridad</strong> permiten:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Evaluar objetivamente la postura de seguridad</li>
              <li>Identificar tendencias y patrones</li>
              <li>Priorizar inversiones en controles</li>
              <li>Demostrar cumplimiento regulatorio</li>
              <li>Comunicar riesgos a stakeholders</li>
            </ul>
            
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-blue-50 p-4 rounded border-l-4 border-blue-500">
                <p className="text-sm font-medium mb-2">Métricas Lagging:</p>
                <p className="text-sm">Indicadores retrospectivos (ej: tiempo de detección/respuesta)</p>
              </div>
              <div className="bg-green-50 p-4 rounded border-l-4 border-green-500">
                <p className="text-sm font-medium mb-2">Métricas Leading:</p>
                <p className="text-sm">Indicadores predictivos (ej: cobertura de parches)</p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-blue-50 p-6 rounded-lg border border-blue-200">
          <h2 className="text-2xl font-bold mb-4 text-blue-800">Métricas Clave</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm">
              <h3 className="font-semibold mb-2 text-blue-700">Prevención</h3>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>% sistemas con hardening aplicado</li>
                <li>Tiempo promedio de parcheo</li>
                <li>Cobertura de controles preventivos</li>
              </ul>
            </div>
            <div className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm">
              <h3 className="font-semibold mb-2 text-blue-700">Detección</h3>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>MTTD (Mean Time To Detect)</li>
                <li>% eventos investigados</li>
                <li>Alertas falsas positivas/negativas</li>
              </ul>
            </div>
            <div className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm">
              <h3 className="font-semibold mb-2 text-blue-700">Respuesta</h3>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>MTTR (Mean Time To Respond)</li>
                <li>% incidentes contenidos</li>
                <li>Ejercicios de respuesta realizados</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Implementación Práctica</h2>
          
          <div className="bg-gray-100 p-4 rounded-lg mb-6">
            <h3 className="font-semibold mb-3">Proceso de Definición</h3>
            <ol className="list-decimal pl-5 space-y-2">
              <li><strong>Alineación:</strong> Vincular métricas a objetivos de negocio</li>
              <li><strong>Priorización:</strong> Enfocarse en indicadores accionables</li>
              <li><strong>Automatización:</strong> Integrar con sistemas existentes</li>
              <li><strong>Comunicación:</strong> Dashboards para diferentes audiencias</li>
              <li><strong>Mejora:</strong> Revisión y ajuste periódico</li>
            </ol>
          </div>
          
          <div className="mb-6">
            <h3 className="font-semibold mb-3">Errores Comunes</h3>
            <ul className="list-disc pl-5 space-y-2 text-sm">
              <li>Medir solo lo fácil, no lo importante</li>
              <li>Falta de contexto para interpretación</li>
              <li>No vincular a objetivos de negocio</li>
              <li>Exceso de métricas sin capacidad de acción</li>
            </ul>
          </div>
        </section>

        <section className="border-t pt-6">
          <h2 className="text-2xl font-bold mb-4">Estándares y Referencias</h2>
          
          <div className="border-l-4 border-blue-600 pl-4">
            <h3 className="font-semibold mb-2">Marcos de Referencia</h3>
            <ul className="space-y-3">
              <li>
                <a href="https://csrc.nist.gov/projects/risk-management/metrics" className="flex items-center text-blue-700 hover:text-blue-900">
                  <FiExternalLink className="mr-2" /> NIST Cybersecurity Metrics
                </a>
              </li>
              <li>
                <a href="https://www.isaca.org/resources/isaca-journal/issues/2016/volume-3/measuring-what-matters" className="flex items-center text-blue-700 hover:text-blue-900">
                  <FiExternalLink className="mr-2" /> ISACA Cybersecurity Metrics
                </a>
              </li>
              <li>
                <a href="https://www.sans.org/security-metrics" className="flex items-center text-blue-700 hover:text-blue-900">
                  <FiExternalLink className="mr-2" /> SANS Security Metrics
                </a>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </ArticleLayout>
  );
}
