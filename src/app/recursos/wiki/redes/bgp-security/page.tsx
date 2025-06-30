import ArticleLayout from '@/components/wiki/ArticleLayout';
import { FiExternalLink } from 'react-icons/fi';

export default function BgpSecurityPage() {
  return (
    <ArticleLayout 
      title="BGP Security & RPKI"
      description="Protecciones para el protocolo de routing BGP"
      backUrl="/recursos/wiki/redes"
    >
      <div className="space-y-10 text-gray-800">
        <section className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Amenazas en BGP</h2>
          <div className="prose max-w-none">
            <p className="mb-4 text-gray-700">
              El protocolo BGP es vulnerable a varios ataques críticos:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4 text-gray-700">
              <li><strong>Hijacking:</strong> Secuestro de prefijos IP</li>
              <li><strong>Route Leaks:</strong> Filtración de rutas no autorizadas</li>
              <li><strong>MITM:</strong> Interceptación de tráfico</li>
            </ul>
          </div>
        </section>

        <section className="bg-blue-50 p-6 rounded-lg border border-blue-200">
          <h2 className="text-2xl font-bold mb-4 text-blue-800">Mecanismos de Protección</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white p-3 rounded shadow text-center">
              <p className="font-semibold text-sm text-gray-900">RPKI</p>
              <p className="text-xs text-gray-600">Validación de origen</p>
            </div>
            <div className="bg-white p-3 rounded shadow text-center">
              <p className="font-semibold text-sm text-gray-900">BGPsec</p>
              <p className="text-xs text-gray-600">Firma de rutas</p>
            </div>
            <div className="bg-white p-3 rounded shadow text-center">
              <p className="font-semibold text-sm text-gray-900">PeerLock</p>
              <p className="text-xs text-gray-600">Protección MITM</p>
            </div>
          </div>
        </section>

        <section className="border-t pt-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Implementación RPKI</h2>
          <div className="prose max-w-none">
            <p className="mb-4 text-gray-700">
              Pasos para implementar RPKI en una red:
            </p>
            <ol className="list-decimal pl-6 space-y-2 mb-4 text-gray-700">
              <li>Registrar recursos en el RIR correspondiente</li>
              <li>Crear ROAs (Route Origin Authorizations)</li>
              <li>Configurar validación en routers</li>
            </ol>
          </div>
        </section>

        <section className="border-t pt-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Referencias</h2>
          <div className="border-l-4 border-blue-600 pl-4">
            <ul className="space-y-3">
              <li>
                <a href="https://tools.ietf.org/html/rfc6480" className="flex items-center text-blue-600 hover:underline">
                  <FiExternalLink className="mr-2" /> RFC 6480 - RPKI Architecture
                </a>
              </li>
              <li>
                <a href="https://www.rpki.net" className="flex items-center text-blue-600 hover:underline">
                  <FiExternalLink className="mr-2" /> RPKI.net Resources
                </a>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </ArticleLayout>
  );
}
