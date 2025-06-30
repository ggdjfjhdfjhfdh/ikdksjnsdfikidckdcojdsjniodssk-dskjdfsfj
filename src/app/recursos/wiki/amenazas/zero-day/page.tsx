import ArticleLayout from '@/components/wiki/ArticleLayout';
import { FiExternalLink } from 'react-icons/fi';

export default function ZeroDayPage() {
  return (
    <ArticleLayout 
      title="Vulnerabilidades Zero-Day" 
      description="Exploits que aprovechan fallos desconocidos sin parches disponibles"
      backUrl="/recursos/wiki/amenazas"
    >
      <div className="space-y-10 text-gray-800">
        <section className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h2 className="text-2xl font-bold mb-4">¿Qué es un Zero-Day?</h2>
          <div className="prose max-w-none">
            <p className="mb-4">
              Una vulnerabilidad <strong>zero-day</strong> es:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Un fallo desconocido para el proveedor</li>
              <li>Sin parche disponible al momento de la explotación</li>
              <li>Con ventana de exposición indefinida</li>
              <li>Altamente valiosa en el mercado negro</li>
            </ul>
            
            <div className="bg-red-50 p-4 rounded border-l-4 border-red-500">
              <p className="text-sm">
                <strong>Definición clave:</strong> "Día cero" se refiere al momento en que el proveedor toma conciencia del fallo - los atacantes llevan ventaja.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-blue-50 p-6 rounded-lg border border-blue-200">
          <h2 className="text-2xl font-bold mb-4 text-blue-800">Ciclo de Vida</h2>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="bg-white p-3 rounded shadow text-center">
              <p className="font-semibold text-sm">1. Descubrimiento</p>
              <p className="text-xs">Investigadores o atacantes encuentran el fallo</p>
            </div>
            <div className="bg-white p-3 rounded shadow text-center">
              <p className="font-semibold text-sm">2. Exploit Development</p>
              <p className="text-xs">Creación del código de explotación</p>
            </div>
            <div className="bg-white p-3 rounded shadow text-center">
              <p className="font-semibold text-sm">3. Explotación</p>
              <p className="text-xs">Uso activo contra objetivos</p>
            </div>
            <div className="bg-white p-3 rounded shadow text-center">
              <p className="font-semibold text-sm">4. Divulgación</p>
              <p className="text-xs">Vendor awareness y parche</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Ejemplos Históricos</h2>
          
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="font-semibold mb-3">Casos Notables</h3>
              <ul className="list-disc pl-5 space-y-2 text-sm">
                <li><strong>Stuxnet (2010):</strong> Ataque a sistemas SCADA</li>
                <li><strong>WannaCry (2017):</strong> EternalBlue en Windows</li>
                <li><strong>SolarWinds (2020):</strong> Cadena de suministro</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-3">Mercado de Zero-Days</h3>
              <ul className="list-disc pl-5 space-y-2 text-sm">
                <li>Precios desde $10k hasta $2.5M</li>
                <li>Brokers como Zerodium, Exodus Intelligence</li>
                <li>Programas de recompensas de empresas</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="border-t pt-6">
          <h2 className="text-2xl font-bold mb-4">Protecciones</h2>
          
          <div className="bg-gray-100 p-4 rounded-lg mb-6">
            <h3 className="font-semibold mb-3">Estrategias Defensivas</h3>
            <ol className="list-decimal pl-5 space-y-2">
              <li><strong>Reducción de superficie:</strong> Minimizar componentes expuestos</li>
              <li><strong>Sandboxing:</strong> Aislamiento de procesos críticos</li>
              <li><strong>Behavior Monitoring:</strong> Detección de anomalías</li>
              <li><strong>Patch Management:</strong> Actualización rápida cuando hay parches</li>
            </ol>
          </div>
        </section>

        <section className="border-t pt-6">
          <h2 className="text-2xl font-bold mb-4">Referencias</h2>
          
          <div className="border-l-4 border-blue-600 pl-4">
            <h3 className="font-semibold mb-2">Fuentes Técnicas</h3>
            <ul className="space-y-3">
              <li>
                <a href="https://www.cisa.gov/zero-day-initiative" className="flex items-center text-blue-700 hover:text-blue-900">
                  <FiExternalLink className="mr-2" /> CISA Zero-Day Initiative
                </a>
              </li>
              <li>
                <a href="https://www.zerodayinitiative.com/advisories/published/" className="flex items-center text-blue-700 hover:text-blue-900">
                  <FiExternalLink className="mr-2" /> ZDI Advisories
                </a>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </ArticleLayout>
  );
}