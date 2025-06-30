import ArticleLayout from '@/components/wiki/ArticleLayout';
import { FiExternalLink } from 'react-icons/fi';

export default function DhcpSnoopingPage() {
  return (
    <ArticleLayout 
      title="DHCP Snooping & DAI"
      description="Protecciones contra ataques a DHCP y ARP"
      backUrl="/recursos/wiki/redes"
    >
      <div className="space-y-10 text-gray-800">
        <section className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Amenazas en DHCP</h2>
          <div className="prose max-w-none">
            <p className="mb-4 text-gray-700">
              Ataques comunes que requieren DHCP Snooping:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4 text-gray-700">
              <li><strong>DHCP Spoofing:</strong> Servidores DHCP maliciosos</li>
              <li><strong>DHCP Starvation:</strong> Agotamiento de direcciones</li>
              <li><strong>ARP Poisoning:</strong> Envenenamiento de caché ARP</li>
            </ul>
          </div>
        </section>

        <section className="bg-blue-50 p-6 rounded-lg border border-blue-200">
          <h2 className="text-2xl font-bold mb-4 text-blue-800">Mecanismos de Protección</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white p-3 rounded shadow text-center">
              <p className="font-semibold text-sm text-gray-900">DHCP Snooping</p>
              <p className="text-xs text-gray-600">Filtra mensajes DHCP no autorizados</p>
            </div>
            <div className="bg-white p-3 rounded shadow text-center">
              <p className="font-semibold text-sm text-gray-900">DAI</p>
              <p className="text-xs text-gray-600">Previene ARP Poisoning</p>
            </div>
          </div>
        </section>

        <section className="border-t pt-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Configuración Recomendada</h2>
          <div className="prose max-w-none">
            <p className="mb-4 text-gray-700">
              Pasos para implementar estas protecciones:
            </p>
            <ol className="list-decimal pl-6 space-y-2 mb-4 text-gray-700">
              <li>Habilitar DHCP Snooping en VLANs</li>
              <li>Definir puertos de confianza</li>
              <li>Configurar límite de tasa</li>
              <li>Activar DAI con binding dinámico</li>
            </ol>
          </div>
        </section>

        <section className="border-t pt-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Referencias</h2>
          <div className="border-l-4 border-blue-600 pl-4">
            <ul className="space-y-3">
              <li>
                <a href="https://www.cisco.com/c/en/us/td/docs/switches/lan/catalyst3750x_3560x/software/release/12-2_55_se/configuration/guide/3750xscg/swdhcp82.html" className="flex items-center text-blue-600 hover:underline">
                  <FiExternalLink className="mr-2" /> Cisco DHCP Snooping Guide
                </a>
              </li>
              <li>
                <a href="https://datatracker.ietf.org/doc/html/rfc7513" className="flex items-center text-blue-600 hover:underline">
                  <FiExternalLink className="mr-2" /> RFC 7513 - DAI Best Practices
                </a>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </ArticleLayout>
  );
}
