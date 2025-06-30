import ArticleLayout from '@/components/wiki/ArticleLayout';
import { FiExternalLink } from 'react-icons/fi';

export default function ControlesFisicosPage() {
  return (
    <ArticleLayout 
      title="Controles Físicos"
      description="CCTV, Mantrap, Cerraduras Biométricas"
      backUrl="/recursos/wiki/fisica"
    >
      <div className="space-y-10 text-gray-800">
        <section className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Tipos de Controles</h2>
          <div className="prose max-w-none">
            <ul className="list-disc pl-6 space-y-2 mb-4 text-gray-700">
              <li><strong>Control de Acceso:</strong> Tarjetas RFID, biométricos</li>
              <li><strong>Videovigilancia:</strong> CCTV con análisis inteligente</li>
              <li><strong>Barreras físicas:</strong> Mantraps, torniquetes</li>
              <li><strong>Detección de intrusos:</strong> Sensores, alarmas</li>
            </ul>
          </div>
        </section>

        <section className="bg-blue-50 p-6 rounded-lg border border-blue-200">
          <h2 className="text-2xl font-bold mb-4 text-blue-800">Implementación</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white p-3 rounded shadow">
              <h3 className="font-semibold text-gray-900">Zonificación</h3>
              <ul className="list-disc pl-5 mt-2 text-sm text-gray-700">
                <li>Áreas públicas vs restringidas</li>
                <li>Control de acceso por niveles</li>
                <li>Registro de movimientos</li>
              </ul>
            </div>
            <div className="bg-white p-3 rounded shadow">
              <h3 className="font-semibold text-gray-900">Tecnologías</h3>
              <ul className="list-disc pl-5 mt-2 text-sm text-gray-700">
                <li>Reconocimiento facial</li>
                <li>Tarjetas inteligentes multifactor</li>
                <li>Integración con sistemas de seguridad</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="border-t pt-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Referencias</h2>
          <div className="border-l-4 border-blue-600 pl-4">
            <ul className="space-y-3">
              <li>
                <a href="https://www.iso.org/standard/54534.html" className="flex items-center text-blue-600 hover:underline">
                  <FiExternalLink className="mr-2" /> ISO 27001 - Controles Físicos
                </a>
              </li>
              <li>
                <a href="https://csrc.nist.gov/publications/detail/sp/800-53/rev-5/final" className="flex items-center text-blue-600 hover:underline">
                  <FiExternalLink className="mr-2" /> NIST SP 800-53
                </a>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </ArticleLayout>
  );
}
