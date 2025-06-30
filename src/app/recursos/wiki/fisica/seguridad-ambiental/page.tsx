import ArticleLayout from '@/components/wiki/ArticleLayout';
import { FiExternalLink } from 'react-icons/fi';

export default function SeguridadAmbientalPage() {
  return (
    <ArticleLayout 
      title="Seguridad Ambiental"
      description="UPS, HVAC, Detectores"
      backUrl="/recursos/wiki/fisica"
    >
      <div className="space-y-10 text-gray-800">
        <section className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Componentes Clave</h2>
          <div className="prose max-w-none">
            <ul className="list-disc pl-6 space-y-2 mb-4 text-gray-700">
              <li><strong>Energía:</strong> UPS, generadores, protección contra picos</li>
              <li><strong>Climatización:</strong> HVAC con controles de humedad/temperatura</li>
              <li><strong>Detección:</strong> Humo, agua, gases, movimiento</li>
              <li><strong>Protección:</strong> Contra incendios, inundaciones</li>
            </ul>
          </div>
        </section>

        <section className="bg-blue-50 p-6 rounded-lg border border-blue-200">
          <h2 className="text-2xl font-bold mb-4 text-blue-800">Estándares</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white p-3 rounded shadow">
              <h3 className="font-semibold text-gray-900">TIA-942</h3>
              <ul className="list-disc pl-5 mt-2 text-sm text-gray-700">
                <li>Niveles de disponibilidad (Tier I-IV)</li>
                <li>Requisitos para data centers</li>
                <li>Redundancia de sistemas</li>
              </ul>
            </div>
            <div className="bg-white p-3 rounded shadow">
              <h3 className="font-semibold text-gray-900">ISO 27001</h3>
              <ul className="list-disc pl-5 mt-2 text-sm text-gray-700">
                <li>A.11.2 Equipamiento</li>
                <li>A.11.1 Áreas seguras</li>
                <li>Controles ambientales</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="border-t pt-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Referencias</h2>
          <div className="border-l-4 border-blue-600 pl-4">
            <ul className="space-y-3">
              <li>
                <a href="https://www.tiaonline.org/" className="flex items-center text-blue-600 hover:underline">
                  <FiExternalLink className="mr-2" /> TIA-942 Estándar
                </a>
              </li>
              <li>
                <a href="https://www.nfpa.org/" className="flex items-center text-blue-600 hover:underline">
                  <FiExternalLink className="mr-2" /> NFPA 75/76
                </a>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </ArticleLayout>
  );
}
