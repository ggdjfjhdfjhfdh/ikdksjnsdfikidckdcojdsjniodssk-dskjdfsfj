import ArticleLayout from '@/components/wiki/ArticleLayout';
import { FiExternalLink } from 'react-icons/fi';

export default function SupplyChainPage() {
  return (
    <ArticleLayout 
      title="Ataques a la Cadena de Suministro" 
      description="Compromiso de sistemas a través de proveedores y dependencias externas"
      backUrl="/recursos/wiki/amenazas"
    >
      <div className="space-y-10 text-gray-800">
        <section className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h2 className="text-2xl font-bold mb-4">¿Qué es un Supply Chain Attack?</h2>
          <div className="prose max-w-none">
            <p className="mb-4">
              Estos ataques:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Targetean proveedores de software/hardware en lugar del objetivo final</li>
              <li>Comprometen paquetes de dependencias, actualizaciones o componentes</li>
              <li>Tienen alto impacto debido a la amplia distribución</li>
              <li>Son difíciles de detectar por los controles tradicionales</li>
            </ul>
            
            <div className="bg-purple-50 p-4 rounded border-l-4 border-purple-500">
              <p className="text-sm">
                <strong>Característica clave:</strong> El ataque se propaga a través de relaciones de confianza establecidas.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-blue-50 p-6 rounded-lg border border-blue-200">
          <h2 className="text-2xl font-bold mb-4 text-blue-800">Vectores Comunes</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white p-3 rounded shadow text-center">
              <p className="font-semibold text-sm">Compromiso de Actualizaciones</p>
              <p className="text-xs">Inyección de malware en procesos de actualización legítimos</p>
            </div>
            <div className="bg-white p-3 rounded shadow text-center">
              <p className="font-semibold text-sm">Paquetes Maliciosos</p>
              <p className="text-xs">Publicación de librerías comprometidas en repositorios públicos</p>
            </div>
            <div className="bg-white p-3 rounded shadow text-center">
              <p className="font-semibold text-sm">Proveedores de Servicios</p>
              <p className="text-xs">Ataques a MSPs o proveedores en la nube</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Casos Relevantes</h2>
          
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="font-semibold mb-3">Ejemplos Históricos</h3>
              <ul className="list-disc pl-5 space-y-2 text-sm">
                <li><strong>SolarWinds (2020):</strong> Compromiso de Orion a través de actualizaciones</li>
                <li><strong>NotPetya (2017):</strong> Propagado a través de software contable ucraniano</li>
                <li><strong>CCleaner (2017):</strong> Backdoor en instalador legítimo</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-3">Estadísticas</h3>
              <ul className="list-disc pl-5 space-y-2 text-sm">
                <li>62% aumento en ataques a cadena de suministro (2020-2023)</li>
                <li>40% de empresas no monitorea dependencias de terceros</li>
                <li>Tiempo promedio de detección: 287 días</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="border-t pt-6">
          <h2 className="text-2xl font-bold mb-4">Mitigación</h2>
          
          <div className="bg-gray-100 p-4 rounded-lg mb-6">
            <h3 className="font-semibold mb-3">Estrategias Defensivas</h3>
            <ol className="list-decimal pl-5 space-y-2">
              <li><strong>Inventario de dependencias:</strong> Mapeo completo de componentes de terceros</li>
              <li><strong>Verificación de integridad:</strong> Firmas digitales y hashes para actualizaciones</li>
              <li><strong>Segmentación:</strong> Aislamiento de sistemas críticos</li>
              <li><strong>Monitoreo de comportamiento:</strong> Detección de anomalías en procesos de actualización</li>
            </ol>
          </div>
        </section>

        <section className="border-t pt-6">
          <h2 className="text-2xl font-bold mb-4">Referencias</h2>
          
          <div className="border-l-4 border-blue-600 pl-4">
            <h3 className="font-semibold mb-2">Estándares y Guías</h3>
            <ul className="space-y-3">
              <li>
                <a href="https://www.cisa.gov/supply-chain-compromise" className="flex items-center text-blue-700 hover:text-blue-900">
                  <FiExternalLink className="mr-2" /> CISA Supply Chain Guidance
                </a>
              </li>
              <li>
                <a href="https://csrc.nist.gov/projects/supply-chain-risk-management" className="flex items-center text-blue-700 hover:text-blue-900">
                  <FiExternalLink className="mr-2" /> NIST SCRM Framework
                </a>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </ArticleLayout>
  );
}