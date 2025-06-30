import ArticleLayout from '@/components/wiki/ArticleLayout';
import { FiExternalLink } from 'react-icons/fi';

export default function DeviceControlPage() {
  return (
    <ArticleLayout 
      title="Device Control"
      description="Seguridad en puertos USB, Bluetooth y periféricos"
      backUrl="/recursos/wiki/endpoint"
    >
      <div className="space-y-10 text-gray-800">
        <section className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Riesgos Principales</h2>
          <div className="prose max-w-none">
            <ul className="list-disc pl-6 space-y-2 mb-4 text-gray-700">
              <li><strong>USB Drop Attacks:</strong> Dispositivos maliciosos</li>
              <li><strong>Bluetooth Hacking:</strong> Bluejacking/Sniffing</li>
              <li><strong>Data Exfiltration:</strong> Robo de información</li>
              <li><strong>BadUSB:</strong> Dispositivos reprogramados</li>
            </ul>
          </div>
        </section>

        <section className="bg-blue-50 p-6 rounded-lg border border-blue-200">
          <h2 className="text-2xl font-bold mb-4 text-blue-800">Controles de Seguridad</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white p-3 rounded shadow">
              <h3 className="font-semibold text-gray-900">Técnicas</h3>
              <ul className="list-disc pl-5 mt-2 text-sm text-gray-700">
                <li>Whitelisting de dispositivos</li>
                <li>Cifrado de medios extraíbles</li>
                <li>Deshabilitar puertos no usados</li>
              </ul>
            </div>
            <div className="bg-white p-3 rounded shadow">
              <h3 className="font-semibold text-gray-900">Herramientas</h3>
              <ul className="list-disc pl-5 mt-2 text-sm text-gray-700">
                <li>Windows Device Control</li>
                <li>Symantec Device Control</li>
                <li>McAfee Device Control</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="border-t pt-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Referencias</h2>
          <div className="border-l-4 border-blue-600 pl-4">
            <ul className="space-y-3">
              <li>
                <a href="https://www.us-cert.gov/security-publications/usb-threats-against-industrial-control-systems" className="flex items-center text-blue-600 hover:underline">
                  <FiExternalLink className="mr-2" /> US-CERT USB Threats
                </a>
              </li>
              <li>
                <a href="https://learn.microsoft.com/en-us/windows/security/device-security/device-control" className="flex items-center text-blue-600 hover:underline">
                  <FiExternalLink className="mr-2" /> Microsoft Device Control
                </a>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </ArticleLayout>
  );
}
