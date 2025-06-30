import ArticleLayout from '@/components/wiki/ArticleLayout';
import { FiExternalLink } from 'react-icons/fi';

export default function SegmentacionVlanPage() {
  return (
    <ArticleLayout 
      title="Segmentación de Red & VLANs"
      description="Técnicas para dividir redes lógicas y mejorar seguridad"
      backUrl="/recursos/wiki/redes"
    >
      <div className="space-y-10 text-gray-800">
        <section className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Conceptos Clave</h2>
          <div className="prose max-w-none">
            <p className="mb-4 text-gray-700">
              La segmentación de red y VLANs permite aislar tráfico y mejorar seguridad:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4 text-gray-700">
              <li><strong>VLAN (Virtual LAN):</strong> Redes lógicas independientes en misma infraestructura física</li>
              <li><strong>Segmentación:</strong> Dividir red en zonas de seguridad</li>
              <li><strong>802.1Q:</strong> Estándar para tagging de VLAN</li>
            </ul>
          </div>
        </section>

        <section className="bg-blue-50 p-6 rounded-lg border border-blue-200">
          <h2 className="text-2xl font-bold mb-4 text-blue-800">Tipos de VLAN</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white p-3 rounded shadow text-center">
              <p className="font-semibold text-sm text-gray-900">Por Puerto</p>
              <p className="text-xs text-gray-600">Asignación estática</p>
            </div>
            <div className="bg-white p-3 rounded shadow text-center">
              <p className="font-semibold text-sm text-gray-900">Por Protocolo</p>
              <p className="text-xs text-gray-600">Según tipo de tráfico</p>
            </div>
            <div className="bg-white p-3 rounded shadow text-center">
              <p className="font-semibold text-sm text-gray-900">Dinámicas</p>
              <p className="text-xs text-gray-600">Basadas en MAC/políticas</p>
            </div>
          </div>
        </section>

        <section className="border-t pt-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Consideraciones de Seguridad</h2>
          <div className="bg-gray-100 p-4 rounded-lg mb-6">
            <h3 className="font-semibold mb-3 text-gray-900">Mejores Prácticas</h3>
            <ol className="list-decimal pl-5 space-y-2 text-sm text-gray-700">
              <li>Aislar VLANs sensibles (ej: gestión)</li>
              <li>Implementar VLAN nativa segura</li>
              <li>Monitorizar saltos entre VLAN</li>
            </ol>
          </div>
        </section>

        <section className="border-t pt-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Referencias</h2>
          <div className="border-l-4 border-blue-600 pl-4">
            <ul className="space-y-3">
              <li>
                <a href="https://standards.ieee.org/standard/802_1Q-2018.html" className="flex items-center text-blue-600 hover:underline">
                  <FiExternalLink className="mr-2" /> IEEE 802.1Q Standard
                </a>
              </li>
              <li>
                <a href="https://www.cisco.com/c/en/us/td/docs/switches/lan/catalyst3750x_3560x/software/release/12-2_55_se/configuration/guide/3750xscg/swvlan.html" className="flex items-center text-blue-600 hover:underline">
                  <FiExternalLink className="mr-2" /> Cisco VLAN Configuration
                </a>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </ArticleLayout>
  );
}
