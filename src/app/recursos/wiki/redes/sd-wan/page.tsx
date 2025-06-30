import ArticleLayout from '@/components/wiki/ArticleLayout';
import { FiExternalLink } from 'react-icons/fi';

export default function SdWanPage() {
  return (
    <ArticleLayout 
      title="SD-WAN y SASE"
      description="Arquitecturas modernas para redes empresariales seguras"
      backUrl="/recursos/wiki/redes"
    >
      <div className="space-y-10 text-gray-800">
        <section className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Conceptos Clave</h2>
          <div className="prose max-w-none">
            <p className="mb-4 text-gray-700">
              Tecnologías para redes definidas por software:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4 text-gray-700">
              <li><strong>SD-WAN:</strong> Gestión centralizada de múltiples enlaces</li>
              <li><strong>SASE:</strong> Convergencia de red y seguridad en la nube</li>
              <li><strong>Zero Trust:</strong> Verificación continua de acceso</li>
            </ul>
          </div>
        </section>

        <section className="bg-blue-50 p-6 rounded-lg border border-blue-200">
          <h2 className="text-2xl font-bold mb-4 text-blue-800">Componentes SASE</h2>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="bg-white p-3 rounded shadow text-center">
              <p className="font-semibold text-sm text-gray-900">SWG</p>
              <p className="text-xs text-gray-600">Secure Web Gateway</p>
            </div>
            <div className="bg-white p-3 rounded shadow text-center">
              <p className="font-semibold text-sm text-gray-900">CASB</p>
              <p className="text-xs text-gray-600">Cloud Access Security</p>
            </div>
            <div className="bg-white p-3 rounded shadow text-center">
              <p className="font-semibold text-sm text-gray-900">ZTNA</p>
              <p className="text-xs text-gray-600">Zero Trust Network</p>
            </div>
            <div className="bg-white p-3 rounded shadow text-center">
              <p className="font-semibold text-sm text-gray-900">FWaaS</p>
              <p className="text-xs text-gray-600">Firewall as a Service</p>
            </div>
          </div>
        </section>

        <section className="border-t pt-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Beneficios</h2>
          <div className="prose max-w-none">
            <p className="mb-4 text-gray-700">
              Ventajas de adoptar estas arquitecturas:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4 text-gray-700">
              <li>Reducción de costos de conectividad</li>
              <li>Seguridad consistente para usuarios remotos</li>
              <li>Mayor visibilidad y control centralizado</li>
              <li>Integración nativa con cloud</li>
            </ul>
          </div>
        </section>

        <section className="border-t pt-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Referencias</h2>
          <div className="border-l-4 border-blue-600 pl-4">
            <ul className="space-y-3">
              <li>
                <a href="https://www.gartner.com/en/information-technology/glossary/secure-access-service-edge-sase" className="flex items-center text-blue-600 hover:underline">
                  <FiExternalLink className="mr-2" /> Gartner SASE Definition
                </a>
              </li>
              <li>
                <a href="https://www.mef.net/" className="flex items-center text-blue-600 hover:underline">
                  <FiExternalLink className="mr-2" /> MEF SD-WAN Standards
                </a>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </ArticleLayout>
  );
}
