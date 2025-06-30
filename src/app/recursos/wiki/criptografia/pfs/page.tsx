import ArticleLayout from '@/components/wiki/ArticleLayout';
import { FiExternalLink } from 'react-icons/fi';

export default function PFSPage() {
  return (
    <ArticleLayout 
      title="PFS (Perfect Forward Secrecy)"
      description="Mecanismo de seguridad que protege sesiones pasadas incluso si se compromete la clave privada"
      backUrl="/recursos/wiki/criptografia"
    >
      <div className="space-y-10 text-gray-800">
        <section className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h2 className="text-2xl font-bold mb-4">Definición Técnica</h2>
          <div className="prose max-w-none">
            <p className="mb-4">
              PFS garantiza que el compromiso de claves a largo plazo no permita descifrar comunicaciones pasadas, mediante el uso de claves efímeras.
            </p>
            <div className="bg-green-50 p-4 rounded border-l-4 border-green-500 mb-4">
              <p className="text-sm">
                <strong>Beneficio clave:</strong> Protección contra grabaciones futuras ("record now, decrypt later").
              </p>
            </div>
          </div>
        </section>

        <section className="bg-blue-50 p-6 rounded-lg border border-blue-200">
          <h2 className="text-2xl font-bold mb-4 text-blue-800">Implementaciones</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="font-bold text-lg mb-3">Diffie-Hellman Ephemeral</h3>
              <ul className="list-disc pl-6 space-y-2 text-sm">
                <li><strong>DHE:</strong> Nueva clave por sesión</li>
                <li><strong>ECDHE:</strong> Versión elíptica más eficiente</li>
                <li><strong>Protección:</strong> Resistente a ataques cuánticos</li>
                <li><strong>Uso:</strong> TLS 1.2/1.3, Signal, SSH</li>
              </ul>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="font-bold text-lg mb-3">Otras Técnicas</h3>
              <ul className="list-disc pl-6 space-y-2 text-sm">
                <li><strong>PQ3 (Apple):</strong> Post-cuántico con Kyber</li>
                <li><strong>OQS:</strong> Open Quantum Safe</li>
                <li><strong>Signal Protocol:</strong> Double Ratchet</li>
                <li><strong>Oportunista:</strong> TLS con DHE/ECDHE</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h2 className="text-2xl font-bold mb-4">Comparativa de Protocolos</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Protocolo</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">PFS</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Seguridad</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Recomendado</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">TLS 1.3</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Obligatorio</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Alta</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">✓ (IETF)</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">TLS 1.2</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Opcional</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Media</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Condicional</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="border-t pt-6">
          <h2 className="text-2xl font-bold mb-4">Referencias</h2>
          <div className="border-l-4 border-blue-600 pl-4">
            <h3 className="font-semibold mb-2">Estándares y Guías</h3>
            <ul className="space-y-3">
              <li>
                <a href="https://datatracker.ietf.org/doc/html/rfc8446" className="flex items-center text-blue-700 hover:text-blue-900">
                  <FiExternalLink className="mr-2" /> RFC 8446 (TLS 1.3)
                </a>
              </li>
              <li>
                <a href="https://signal.org/docs/" className="flex items-center text-blue-700 hover:text-blue-900">
                  <FiExternalLink className="mr-2" /> Signal Protocol Docs
                </a>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </ArticleLayout>
  );
}
