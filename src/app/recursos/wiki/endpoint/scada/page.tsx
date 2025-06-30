import ArticleLayout from '@/components/wiki/ArticleLayout';
import { FiExternalLink } from 'react-icons/fi';

export default function SCADAPage() {
  return (
    <ArticleLayout 
      title="SCADA / PLC Security"
      description="Protección de sistemas industriales (Modbus, DNP3)"
      backUrl="/recursos/wiki/endpoint"
    >
      <div className="space-y-10 text-gray-800">
        <section className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Protocolos Industriales</h2>
          <div className="prose max-w-none">
            <ul className="list-disc pl-6 space-y-2 mb-4 text-gray-700">
              <li><strong>Modbus:</strong> Protocolo serial abierto</li>
              <li><strong>DNP3:</strong> Protocolo para utilities</li>
              <li><strong>OPC UA:</strong> Arquitectura unificada</li>
              <li><strong>Profibus:</strong> Red de campo</li>
            </ul>
          </div>
        </section>

        <section className="bg-blue-50 p-6 rounded-lg border border-blue-200">
          <h2 className="text-2xl font-bold mb-4 text-blue-800">Amenazas Comunes</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white p-3 rounded shadow">
              <h3 className="font-semibold text-gray-900">Técnicas</h3>
              <ul className="list-disc pl-5 mt-2 text-sm text-gray-700">
                <li>Replay Attacks</li>
                <li>Command Injection</li>
                <li>Denial of Service</li>
              </ul>
            </div>
            <div className="bg-white p-3 rounded shadow">
              <h3 className="font-semibold text-gray-900">Protecciones</h3>
              <ul className="list-disc pl-5 mt-2 text-sm text-gray-700">
                <li>Network Segmentation</li>
                <li>Protocol Encryption</li>
                <li>Anomaly Detection</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="border-t pt-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Referencias</h2>
          <div className="border-l-4 border-blue-600 pl-4">
            <ul className="space-y-3">
              <li>
                <a href="https://www.cisa.gov/topics/industrial-control-systems" className="flex items-center text-blue-600 hover:underline">
                  <FiExternalLink className="mr-2" /> CISA ICS Security
                </a>
              </li>
              <li>
                <a href="https://www.nist.gov/el/cybersecurity-framework-nist-sp-800-82" className="flex items-center text-blue-600 hover:underline">
                  <FiExternalLink className="mr-2" /> NIST SP 800-82
                </a>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </ArticleLayout>
  );
}
