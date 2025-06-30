import ArticleLayout from '@/components/wiki/ArticleLayout';
import { FiExternalLink } from 'react-icons/fi';

export default function CANBusPage() {
  return (
    <ArticleLayout 
      title="Automotive CAN-Bus Security"
      description="Protección de redes vehiculares"
      backUrl="/recursos/wiki/endpoint"
    >
      <div className="space-y-10 text-gray-800">
        <section className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Conceptos Clave</h2>
          <div className="prose max-w-none">
            <ul className="list-disc pl-6 space-y-2 mb-4 text-gray-700">
              <li><strong>CAN Bus:</strong> Red de control vehicular</li>
              <li><strong>OBD-II:</strong> Puerto de diagnóstico</li>
              <li><strong>ECU:</strong> Unidades de control electrónico</li>
              <li><strong>Frame Injection:</strong> Inyección de comandos</li>
            </ul>
          </div>
        </section>

        <section className="bg-blue-50 p-6 rounded-lg border border-blue-200">
          <h2 className="text-2xl font-bold mb-4 text-blue-800">Protecciones</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white p-3 rounded shadow">
              <h3 className="font-semibold text-gray-900">Técnicas</h3>
              <ul className="list-disc pl-5 mt-2 text-sm text-gray-700">
                <li>Autenticación de mensajes</li>
                <li>Segmentación de redes</li>
                <li>Firewalls vehiculares</li>
              </ul>
            </div>
            <div className="bg-white p-3 rounded shadow">
              <h3 className="font-semibold text-gray-900">Estándares</h3>
              <ul className="list-disc pl-5 mt-2 text-sm text-gray-700">
                <li>ISO/SAE 21434</li>
                <li>UNECE R155</li>
                <li>AutoSAR SecOC</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="border-t pt-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Referencias</h2>
          <div className="border-l-4 border-blue-600 pl-4">
            <ul className="space-y-3">
              <li>
                <a href="https://www.sae.org/standards/content/j3061_201601" className="flex items-center text-blue-600 hover:underline">
                  <FiExternalLink className="mr-2" /> SAE J3061
                </a>
              </li>
              <li>
                <a href="https://www.autosar.org/fileadmin/standards/foundation/1-3/AUTOSAR_PRS_SecureOnboardCommunication.pdf" className="flex items-center text-blue-600 hover:underline">
                  <FiExternalLink className="mr-2" /> AutoSAR SecOC
                </a>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </ArticleLayout>
  );
}
