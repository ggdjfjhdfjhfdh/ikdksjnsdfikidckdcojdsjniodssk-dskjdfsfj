import ArticleLayout from '@/components/wiki/ArticleLayout';
import { FiExternalLink } from 'react-icons/fi';

export default function InsiderThreatPage() {
  return (
    <ArticleLayout 
      title="Amenazas Internas (Insider Threat)" 
      description="Riesgos de seguridad originados desde dentro de la organización"
      backUrl="/recursos/wiki/amenazas"
    >
      <div className="space-y-10 text-gray-800">
        <section className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h2 className="text-2xl font-bold mb-4">¿Qué es una amenaza interna?</h2>
          <div className="prose max-w-none">
            <p className="mb-4">
              Las amenazas internas:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Provienen de empleados, contratistas o socios con acceso legítimo</li>
              <li>Pueden ser intencionales o accidentales</li>
              <li>Representan el 60% de las violaciones de datos</li>
              <li>Son difíciles de detectar por los controles perimetrales tradicionales</li>
            </ul>
            
            <div className="bg-purple-50 p-4 rounded border-l-4 border-purple-500">
              <p className="text-sm">
                <strong>Dato clave:</strong> El costo promedio de un incidente por amenaza interna es de $11.45M (IBM 2023).
              </p>
            </div>
          </div>
        </section>

        <section className="bg-blue-50 p-6 rounded-lg border border-blue-200">
          <h2 className="text-2xl font-bold mb-4 text-blue-800">Tipos de Amenazas</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white p-3 rounded shadow text-center">
              <p className="font-semibold text-sm">Maliciosas</p>
              <p className="text-xs">Acciones deliberadas para dañar la organización</p>
            </div>
            <div className="bg-white p-3 rounded shadow text-center">
              <p className="font-semibold text-sm">Negligentes</p>
              <p className="text-xs">Falta de cuidado en el manejo de datos sensibles</p>
            </div>
            <div className="bg-white p-3 rounded shadow text-center">
              <p className="font-semibold text-sm">Comprometidas</p>
              <p className="text-xs">Credenciales robadas o coercionadas</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Indicadores y Estadísticas</h2>
          
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="font-semibold mb-3">Señales de Alerta</h3>
              <ul className="list-disc pl-5 space-y-2 text-sm">
                <li>Acceso a datos fuera del horario laboral</li>
                <li>Descargas masivas de información</li>
                <li>Intentos de acceder a áreas restringidas</li>
                <li>Uso de dispositivos de almacenamiento no autorizados</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-3">Datos Relevantes</h3>
              <ul className="list-disc pl-5 space-y-2 text-sm">
                <li>34% de las organizaciones experimentan incidentes internos anuales</li>
                <li>62% son causados por negligencia</li>
                <li>23% involucran a empleados descontentos</li>
                <li>Detección promedio: 85 días</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="border-t pt-6">
          <h2 className="text-2xl font-bold mb-4">Mitigación</h2>
          
          <div className="bg-gray-100 p-4 rounded-lg mb-6">
            <h3 className="font-semibold mb-3">Estrategias Defensivas</h3>
            <ol className="list-decimal pl-5 space-y-2">
              <li><strong>Principio de mínimo privilegio:</strong> Limitar accesos a lo estrictamente necesario</li>
              <li><strong>Monitoreo de comportamiento:</strong> Análisis de patrones de acceso</li>
              <li><strong>Segmentación de redes:</strong> Aislamiento de sistemas críticos</li>
              <li><strong>Cultura de seguridad:</strong> Entrenamiento continuo</li>
              <li><strong>Procedimientos de salida:</strong> Revocación inmediata de accesos</li>
            </ol>
          </div>
        </section>

        <section className="border-t pt-6">
          <h2 className="text-2xl font-bold mb-4">Referencias</h2>
          
          <div className="border-l-4 border-blue-600 pl-4">
            <h3 className="font-semibold mb-2">Estándares y Guías</h3>
            <ul className="space-y-3">
              <li>
                <a href="https://www.cisa.gov/insider-threat-mitigation" className="flex items-center text-blue-700 hover:text-blue-900">
                  <FiExternalLink className="mr-2" /> CISA Insider Threat Guide
                </a>
              </li>
              <li>
                <a href="https://www.ncsc.gov.uk/guidance/mitigating-insider-threat" className="flex items-center text-blue-700 hover:text-blue-900">
                  <FiExternalLink className="mr-2" /> NCSC Insider Threat Guidance
                </a>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </ArticleLayout>
  );
}