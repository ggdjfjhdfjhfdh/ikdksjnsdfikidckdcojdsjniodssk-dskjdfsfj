import ArticleLayout from '@/components/wiki/ArticleLayout';
import { FiExternalLink } from 'react-icons/fi';

export default function FirewallsPage() {
  return (
    <ArticleLayout 
      title="Firewalls & Next-Gen Firewalls"
      description="Evolución y características de sistemas de protección perimetral"
      backUrl="/recursos/wiki/redes"
    >
      <div className="space-y-10 text-gray-800">
        <section className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Evolución de Firewalls</h2>
          <div className="prose max-w-none">
            <p className="mb-4 text-gray-700">
              Generaciones de tecnología firewall:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4 text-gray-700">
              <li><strong>Packet Filters:</strong> Filtrado por cabeceras</li>
              <li><strong>Stateful:</strong> Seguimiento de conexiones</li>
              <li><strong>Application:</strong> Inspección profunda</li>
              <li><strong>Next-Gen:</strong> Integración con IDS/IPS</li>
            </ul>
          </div>
        </section>

        <section className="bg-blue-50 p-6 rounded-lg border border-blue-200">
          <h2 className="text-2xl font-bold mb-4 text-blue-800">Características NGFW</h2>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="bg-white p-3 rounded shadow text-center">
              <p className="font-semibold text-sm text-gray-900">SSL Inspection</p>
              <p className="text-xs text-gray-600">Descifrado de tráfico</p>
            </div>
            <div className="bg-white p-3 rounded shadow text-center">
              <p className="font-semibold text-sm text-gray-900">App Control</p>
              <p className="text-xs text-gray-600">Identificación de apps</p>
            </div>
            <div className="bg-white p-3 rounded shadow text-center">
              <p className="font-semibold text-sm text-gray-900">Threat Intel</p>
              <p className="text-xs text-gray-600">Feed de amenazas</p>
            </div>
            <div className="bg-white p-3 rounded shadow text-center">
              <p className="font-semibold text-sm text-gray-900">Sandboxing</p>
              <p className="text-xs text-gray-600">Análisis de archivos</p>
            </div>
          </div>
        </section>

        <section className="border-t pt-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Recomendaciones</h2>
          <div className="prose max-w-none">
            <p className="mb-4 text-gray-700">
              Configuraciones de seguridad recomendadas:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4 text-gray-700">
              <li>Default-deny en todas las políticas</li>
              <li>Segmentación por zonas de seguridad</li>
              <li>Actualizaciones regulares de firmas</li>
              <li>Integración con SIEM</li>
            </ul>
          </div>
        </section>

        <section className="border-t pt-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Referencias</h2>
          <div className="border-l-4 border-blue-600 pl-4">
            <ul className="space-y-3">
              <li>
                <a href="https://www.nist.gov/publications/guidelines-firewalls-and-firewall-policy" className="flex items-center text-blue-600 hover:underline">
                  <FiExternalLink className="mr-2" /> NIST Firewall Guidelines
                </a>
              </li>
              <li>
                <a href="https://www.gartner.com/reviews/market/enterprise-network-firewalls" className="flex items-center text-blue-600 hover:underline">
                  <FiExternalLink className="mr-2" /> Gartner NGFW Market Guide
                </a>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </ArticleLayout>
  );
}
