import ArticleLayout from '@/components/wiki/ArticleLayout';
import { FiExternalLink } from 'react-icons/fi';

export default function VpnPage() {
  return (
    <ArticleLayout 
      title="WireGuard & IPsec IKEv2"
      description="Protocolos VPN modernos para conectividad segura"
      backUrl="/recursos/wiki/redes"
    >
      <div className="space-y-10 text-gray-800">
        <section className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Comparativa de VPNs</h2>
          <div className="prose max-w-none">
            <p className="mb-4 text-gray-700">
              Soluciones para tunelización segura:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4 text-gray-700">
              <li><strong>WireGuard:</strong> Simple, rápido, criptografía moderna</li>
              <li><strong>IPsec IKEv2:</strong> Estándar empresarial, móvil-friendly</li>
              <li><strong>OpenVPN:</strong> Flexible, ampliamente compatible</li>
            </ul>
          </div>
        </section>

        <section className="bg-blue-50 p-6 rounded-lg border border-blue-200">
          <h2 className="text-2xl font-bold mb-4 text-blue-800">Características Clave</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white p-3 rounded shadow text-center">
              <p className="font-semibold text-sm text-gray-900">WireGuard</p>
              <p className="text-xs text-gray-600">Noise protocol, ChaCha20</p>
            </div>
            <div className="bg-white p-3 rounded shadow text-center">
              <p className="font-semibold text-sm text-gray-900">IPsec IKEv2</p>
              <p className="text-xs text-gray-600">MOBIKE, Suite B crypto</p>
            </div>
          </div>
        </section>

        <section className="border-t pt-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Casos de Uso</h2>
          <div className="prose max-w-none">
            <p className="mb-4 text-gray-700">
              Escenarios recomendados para cada protocolo:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4 text-gray-700">
              <li><strong>WireGuard:</strong> Conexiones simples, alto rendimiento</li>
              <li><strong>IPsec IKEv2:</strong> Entornos empresariales, movilidad</li>
              <li><strong>Combinados:</strong> WireGuard para datos, IPsec para gestión</li>
            </ul>
          </div>
        </section>

        <section className="border-t pt-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Referencias</h2>
          <div className="border-l-4 border-blue-600 pl-4">
            <ul className="space-y-3">
              <li>
                <a href="https://www.wireguard.com" className="flex items-center text-blue-600 hover:underline">
                  <FiExternalLink className="mr-2" /> WireGuard Official Site
                </a>
              </li>
              <li>
                <a href="https://tools.ietf.org/html/rfc7296" className="flex items-center text-blue-600 hover:underline">
                  <FiExternalLink className="mr-2" /> RFC 7296 - IKEv2
                </a>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </ArticleLayout>
  );
}
