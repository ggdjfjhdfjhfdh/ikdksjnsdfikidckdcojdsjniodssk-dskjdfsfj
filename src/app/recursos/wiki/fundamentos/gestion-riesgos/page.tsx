import ArticleLayout from '@/components/wiki/ArticleLayout';
import { FiExternalLink } from 'react-icons/fi';

export default function GestionRiesgosPage() {
  return (
    <ArticleLayout 
      title="Gestión Integral de Riesgos en Ciberseguridad" 
      description="Proceso sistemático para identificar, analizar, evaluar y tratar riesgos de seguridad de la información"
      backUrl="/recursos/wiki/fundamentos"
    >
      <div className="space-y-10 text-gray-800">
        <section className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h2 className="text-2xl font-bold mb-4">¿Qué es la Gestión de Riesgos?</h2>
          <div className="prose max-w-none">
            <p className="mb-4">
              La <strong>Gestión de Riesgos en Ciberseguridad</strong> es un proceso estructurado que permite a las organizaciones:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Identificar activos, amenazas y vulnerabilidades potenciales</li>
              <li>Evaluar la probabilidad e impacto de incidentes de seguridad</li>
              <li>Priorizar riesgos basados en su criticidad</li>
              <li>Implementar controles adecuados para mitigar riesgos</li>
              <li>Monitorear y revisar continuamente el entorno de riesgo</li>
            </ul>
            <div className="bg-blue-50 p-4 rounded border-l-4 border-blue-500">
              <p className="text-sm">
                <strong>Definición formal (ISO 31000):</strong> "Proceso coordinado para dirigir y controlar una organización con respecto al riesgo."
              </p>
            </div>
          </div>
        </section>

        <section className="bg-blue-50 p-6 rounded-lg border border-blue-200">
          <h2 className="text-2xl font-bold mb-4 text-blue-800">¿Por qué gestionar riesgos?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-semibold mb-2 text-blue-700">Estratégico</h3>
              <p className="text-sm">Alinea seguridad con objetivos de negocio y tolerancia al riesgo</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2 text-blue-700">Operacional</h3>
              <p className="text-sm">Prioriza inversiones en controles basados en riesgo real</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2 text-blue-700">Cumplimiento</h3>
              <p className="text-sm">Satisface requisitos regulatorios (GDPR, NIS2, ISO 27001)</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Metodologías Avanzadas</h2>
          
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="border border-gray-200 rounded-lg p-5 bg-white shadow-sm">
              <h3 className="font-bold text-lg mb-3 text-blue-700">FAIR (Factor Analysis of Information Risk)</h3>
              <ul className="list-disc pl-5 space-y-2 text-sm mb-3">
                <li>Enfoque cuantitativo para estimar pérdidas financieras</li>
                <li>Modela frecuencia y magnitud de eventos</li>
                <li>Calcula Pérdida Anual Esperada (ALE)</li>
              </ul>
              <div className="bg-gray-100 p-3 rounded text-xs">
                <p className="font-medium mb-1">Ejemplo ALE:</p>
                <p>ALE = Frecuencia (0.5/año) × Magnitud ($50,000) = $25,000/año</p>
              </div>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-5 bg-white shadow-sm">
              <h3 className="font-bold text-lg mb-3 text-blue-700">OCTAVE Allegro</h3>
              <ul className="list-disc pl-5 space-y-2 text-sm mb-3">
                <li>Enfoque en activos críticos y escenarios de amenaza</li>
                <li>8 pasos desde identificación hasta plan de mitigación</li>
                <li>Desarrollado por CERT/SEI</li>
              </ul>
              <div className="bg-gray-100 p-3 rounded text-xs">
                <p className="font-medium">Fases clave:</p>
                <ol className="list-decimal pl-5 mt-1">
                  <li>Establecer métricas</li>
                  <li>Perfil de activos</li>
                  <li>Árboles de amenazas</li>
                </ol>
              </div>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-5 bg-white shadow-sm">
              <h3 className="font-bold text-lg mb-3 text-blue-700">ISO 31000</h3>
              <ul className="list-disc pl-5 space-y-2 text-sm mb-3">
                <li>Estándar internacional para gestión de riesgos</li>
                <li>Principios, marco y proceso genérico</li>
                <li>Integrable con ISO 27001</li>
              </ul>
              <div className="bg-gray-100 p-3 rounded text-xs">
                <p className="font-medium">Principios clave:</p>
                <ul className="list-disc pl-5 mt-1">
                  <li>Enfoque sistemático</li>
                  <li>Información oportuna</li>
                  <li>Considera factores humanos</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Automatización y Herramientas</h2>
          
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="font-semibold mb-3">Plataformas GRC</h3>
              <ul className="list-disc pl-5 space-y-2 text-sm">
                <li><strong>RSAM</strong>: Gestión integral de riesgo y cumplimiento</li>
                <li><strong>Archer</strong>: Workflows personalizables</li>
                <li><strong>ServiceNow GRC</strong>: Integración con operaciones TI</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-3">Herramientas Open Source</h3>
              <ul className="list-disc pl-5 space-y-2 text-sm">
                <li><strong>OWASP Threat Dragon</strong>: Modelado de amenazas</li>
                <li><strong>Magerit</strong>: Metodología del sector público español</li>
                <li><strong>CORAS</strong>: Framework basado en UML</li>
              </ul>
            </div>
          </div>
          
          <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Flujo de Trabajo Recomendado</h3>
            <ol className="list-decimal pl-5 space-y-2">
              <li>Inventario completo de activos (CMDB)</li>
              <li>Evaluación inicial con metodología rápida (ej: OCTAVE-S)</li>
              <li>Análisis detallado para riesgos críticos (FAIR)</li>
              <li>Priorización basada en impacto económico</li>
              <li>Monitoreo continuo con KRI (Key Risk Indicators)</li>
            </ol>
          </div>
        </section>

        <section className="border-t pt-6">
          <h2 className="text-2xl font-bold mb-4">Recursos para Profundizar</h2>
          
          <div className="border-l-4 border-blue-600 pl-4">
            <h3 className="font-semibold mb-2">Documentación Oficial</h3>
            <ul className="space-y-3">
              <li>
                <a href="https://csrc.nist.gov/projects/risk-management" className="flex items-center text-blue-700 hover:text-blue-900">
                  <FiExternalLink className="mr-2" /> NIST Risk Management Framework
                </a>
              </li>
              <li>
                <a href="https://www.iso.org/standard/65694.html" className="flex items-center text-blue-700 hover:text-blue-900">
                  <FiExternalLink className="mr-2" /> ISO 31000:2018
                </a>
              </li>
              <li>
                <a href="https://www.fairinstitute.org" className="flex items-center text-blue-700 hover:text-blue-900">
                  <FiExternalLink className="mr-2" /> FAIR Institute
                </a>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </ArticleLayout>
  );
}
