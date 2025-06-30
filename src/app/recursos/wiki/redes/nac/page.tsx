import ArticleLayout from '@/components/wiki/ArticleLayout';
import { FiExternalLink } from 'react-icons/fi';

export default function NacPage() {
  return (
    <ArticleLayout 
      title="Network Access Control"
      description="Sistemas para controlar acceso a redes empresariales"
      backUrl="/recursos/wiki/redes"
    >
      <div className="space-y-10 text-gray-800">
        <section className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Componentes NAC</h2>
          <div className="prose max-w-none">
            <p className="mb-4 text-gray-700">
              Elementos clave de una solución NAC:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4 text-gray-700">
              <li><strong>802.1X:</strong> Autenticación basada en puertos</li>
              <li><strong>Supplicant:</strong> Cliente en el dispositivo</li>
              <li><strong>Authenticator:</strong> Switch/AP que controla acceso</li>
              <li><strong>Authentication Server:</strong> RADIUS/IAS</li>
            </ul>
          </div>
        </section>

        <section className="bg-blue-50 p-6 rounded-lg border border-blue-200">
          <h2 className="text-2xl font-bold mb-4 text-blue-800">Flujos de Autenticación</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white p-3 rounded shadow text-center">
              <p className="font-semibold text-sm text-gray-900">EAP-TLS</p>
              <p className="text-xs text-gray-600">Certificados digitales</p>
            </div>
            <div className="bg-white p-3 rounded shadow text-center">
              <p className="font-semibold text-sm text-gray-900">PEAP-MSCHAPv2</p>
              <p className="text-xs text-gray-600">Credenciales de dominio</p>
            </div>
            <div className="bg-white p-3 rounded shadow text-center">
              <p className="font-semibold text-sm text-gray-900">MAC Authentication</p>
              <p className="text-xs text-gray-600">Para dispositivos IoT</p>
            </div>
          </div>
        </section>

        <section className="border-t pt-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Implementación</h2>
          <div className="prose max-w-none">
            <p className="mb-4 text-gray-700">
              Pasos para desplegar NAC:
            </p>
            <ol className="list-decimal pl-6 space-y-2 mb-4 text-gray-700">
              <li>Configurar servidor RADIUS (FreeRADIUS, NPS)</li>
              <li>Preparar infraestructura PKI para certificados</li>
              <li>Configurar switches para 802.1X</li>
              <li>Desplegar supplicants en clientes</li>
              <li>Definir políticas de acceso</li>
            </ol>
          </div>
        </section>

        <section className="border-t pt-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Referencias</h2>
          <div className="border-l-4 border-blue-600 pl-4">
            <ul className="space-y-3">
              <li>
                <a href="https://tools.ietf.org/html/rfc3748" className="flex items-center text-blue-600 hover:underline">
                  <FiExternalLink className="mr-2" /> RFC 3748 - EAP Standard
                </a>
              </li>
              <li>
                <a href="https://www.nist.gov/publications/guide-8021x-based-network-access-control" className="flex items-center text-blue-600 hover:underline">
                  <FiExternalLink className="mr-2" /> NIST NAC Guide
                </a>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </ArticleLayout>
  );
}
