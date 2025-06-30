import ArticleLayout from '@/components/wiki/ArticleLayout';
import { FiExternalLink } from 'react-icons/fi';

export default function IPv6SecurityPage() {
  return (
    <ArticleLayout 
      title="IPv6 Security"
      description="Protecciones contra amenazas en redes IPv6"
      backUrl="/recursos/wiki/redes"
    >
      <div className="space-y-10 text-gray-800">
        <section className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Amenazas en IPv6</h2>
          <div className="prose max-w-none">
            <p className="mb-4 text-gray-700">
              IPv6 introduce nuevos vectores de ataque que requieren protecciones específicas:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4 text-gray-700">
              <li><strong>NDP Spoofing:</strong> Suplantación de vecinos en el descubrimiento</li>
              <li><strong>RA Attacks:</strong> Anuncios maliciosos de routers</li>
              <li><strong>SEND Vulnerabilities:</strong> Problemas en la autenticación</li>
            </ul>
          </div>
        </section>

        <section className="bg-blue-50 p-6 rounded-lg border border-blue-200">
          <h2 className="text-2xl font-bold mb-4 text-blue-800">Mecanismos de Protección</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white p-3 rounded shadow text-center">
              <p className="font-semibold text-sm text-gray-900">RA Guard</p>
              <p className="text-xs text-gray-600">Filtra anuncios no autorizados</p>
            </div>
            <div className="bg-white p-3 rounded shadow text-center">
              <p className="font-semibold text-sm text-gray-900">SEND</p>
              <p className="text-xs text-gray-600">Autenticación criptográfica</p>
            </div>
            <div className="bg-white p-3 rounded shadow text-center">
              <p className="font-semibold text-sm text-gray-900">NDP Inspection</p>
              <p className="text-xs text-gray-600">Monitoriza vecinos legítimos</p>
            </div>
          </div>
        </section>

        <section className="border-t pt-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Referencias</h2>
          <div className="border-l-4 border-blue-600 pl-4">
            <ul className="space-y-3">
              <li>
                <a href="https://tools.ietf.org/html/rfc3971" className="flex items-center text-blue-600 hover:underline">
                  <FiExternalLink className="mr-2" /> RFC 3971 - Secure Neighbor Discovery
                </a>
              </li>
              <li>
                <a href="https://www.nist.gov/publications/secure-ipv6-networks" className="flex items-center text-blue-600 hover:underline">
                  <FiExternalLink className="mr-2" /> NIST IPv6 Security Guidelines
                </a>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </ArticleLayout>
  );
}
