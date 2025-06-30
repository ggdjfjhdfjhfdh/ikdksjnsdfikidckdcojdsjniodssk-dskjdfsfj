import ArticleLayout from '@/components/wiki/ArticleLayout';
import { FiExternalLink } from 'react-icons/fi';

export default function WifiSeguroPage() {
  return (
    <ArticleLayout 
      title="Wi-Fi Seguro"
      description="Protocolos y estándares para redes inalámbricas seguras"
      backUrl="/recursos/wiki/redes"
    >
      <div className="space-y-10 text-gray-800">
        <section className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Evolución de Seguridad Wi-Fi</h2>
          <div className="prose max-w-none">
            <p className="mb-4 text-gray-700">
              Tecnologías para proteger redes inalámbricas:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4 text-gray-700">
              <li><strong>WPA3:</strong> Encriptación más fuerte (SAE)</li>
              <li><strong>OWE:</strong> Reemplazo seguro de redes abiertas</li>
              <li><strong>802.11w:</strong> Protección de frames de gestión</li>
            </ul>
          </div>
        </section>

        <section className="bg-blue-50 p-6 rounded-lg border border-blue-200">
          <h2 className="text-2xl font-bold mb-4 text-blue-800">Comparativa de Protocolos</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white p-3 rounded shadow text-center">
              <p className="font-semibold text-sm text-gray-900">WPA3-Personal</p>
              <p className="text-xs text-gray-600">SAE para PSK</p>
            </div>
            <div className="bg-white p-3 rounded shadow text-center">
              <p className="font-semibold text-sm text-gray-900">WPA3-Enterprise</p>
              <p className="text-xs text-gray-600">192-bit security</p>
            </div>
            <div className="bg-white p-3 rounded shadow text-center">
              <p className="font-semibold text-sm text-gray-900">OWE</p>
              <p className="text-xs text-gray-600">Forward secrecy</p>
            </div>
          </div>
        </section>

        <section className="border-t pt-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Recomendaciones de Implementación</h2>
          <div className="bg-gray-100 p-4 rounded-lg mb-6">
            <h3 className="font-semibold mb-3 text-gray-900">Mejores Prácticas</h3>
            <ol className="list-decimal pl-5 space-y-2 text-sm text-gray-700">
              <li>Priorizar WPA3 sobre WPA2</li>
              <li>Usar OWE en lugar de redes abiertas</li>
              <li>Habilitar 802.11w para protección</li>
              <li>Configurar PMF (Protected Management Frames)</li>
            </ol>
          </div>
        </section>

        <section className="border-t pt-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Referencias</h2>
          <div className="border-l-4 border-blue-600 pl-4">
            <ul className="space-y-3">
              <li>
                <a href="https://www.wi-fi.org/discover-wi-fi/security" className="flex items-center text-blue-600 hover:underline">
                  <FiExternalLink className="mr-2" /> Wi-Fi Alliance Security
                </a>
              </li>
              <li>
                <a href="https://tools.ietf.org/html/rfc8110" className="flex items-center text-blue-600 hover:underline">
                  <FiExternalLink className="mr-2" /> RFC 8110 - OWE Standard
                </a>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </ArticleLayout>
  );
}
