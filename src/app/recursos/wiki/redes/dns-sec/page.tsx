import ArticleLayout from '@/components/wiki/ArticleLayout';
import { FiExternalLink } from 'react-icons/fi';

export default function DnsSecPage() {
  return (
    <ArticleLayout 
      title="DNS Security"
      description="Protocolos para asegurar las consultas DNS"
      backUrl="/recursos/wiki/redes"
    >
      <div className="space-y-10 text-gray-800">
        <section className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Protección de Consultas DNS</h2>
          <div className="prose max-w-none">
            <p className="mb-4 text-gray-700">
              Tecnologías para prevenir ataques como spoofing e interceptación:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4 text-gray-700">
              <li><strong>DNSSEC:</strong> Firma criptográfica de registros</li>
              <li><strong>DoH (DNS over HTTPS):</strong> DNS cifrado en HTTPS</li>
              <li><strong>DoT (DNS over TLS):</strong> DNS cifrado con TLS</li>
              <li><strong>DoQ (DNS over QUIC):</strong> DNS sobre protocolo QUIC</li>
            </ul>
          </div>
        </section>

        <section className="bg-blue-50 p-6 rounded-lg border border-blue-200">
          <h2 className="text-2xl font-bold mb-4 text-blue-800">Comparativa de Protocolos</h2>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="bg-white p-3 rounded shadow text-center">
              <p className="font-semibold text-sm text-gray-900">DNSSEC</p>
              <p className="text-xs text-gray-600">Autenticación</p>
            </div>
            <div className="bg-white p-3 rounded shadow text-center">
              <p className="font-semibold text-sm text-gray-900">DoH</p>
              <p className="text-xs text-gray-600">Puerto 443</p>
            </div>
            <div className="bg-white p-3 rounded shadow text-center">
              <p className="font-semibold text-sm text-gray-900">DoT</p>
              <p className="text-xs text-gray-600">Puerto 853</p>
            </div>
            <div className="bg-white p-3 rounded shadow text-center">
              <p className="font-semibold text-sm text-gray-900">DoQ</p>
              <p className="text-xs text-gray-600">Sobre QUIC</p>
            </div>
          </div>
        </section>

        <section className="border-t pt-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Referencias</h2>
          <div className="border-l-4 border-blue-600 pl-4">
            <ul className="space-y-3">
              <li>
                <a href="https://tools.ietf.org/html/rfc4033" className="flex items-center text-blue-600 hover:underline">
                  <FiExternalLink className="mr-2" /> RFC 4033 - DNSSEC
                </a>
              </li>
              <li>
                <a href="https://datatracker.ietf.org/doc/html/rfc8484" className="flex items-center text-blue-600 hover:underline">
                  <FiExternalLink className="mr-2" /> RFC 8484 - DNS over HTTPS
                </a>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </ArticleLayout>
  );
}
