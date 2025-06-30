import ArticleLayout from '@/components/wiki/ArticleLayout';
import { FiExternalLink } from 'react-icons/fi';

export default function ITDRPage() {
  return (
    <ArticleLayout 
      title="Identity Threat Detection & Response (ITDR)"
      description="Detección y respuesta a amenazas en sistemas de identidad"
      backUrl="/recursos/wiki/identidad"
    >
      <div className="space-y-10 text-gray-800">
        <section className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Amenazas Comunes</h2>
          <div className="prose max-w-none">
            <ul className="list-disc pl-6 space-y-2 mb-4 text-gray-700">
              <li><strong>Credential Stuffing:</strong> Reutilización de credenciales</li>
              <li><strong>Golden Ticket Attacks:</strong> Abuso de tickets Kerberos</li>
              <li><strong>Pass-the-Hash:</strong> Robo de hashes de autenticación</li>
              <li><strong>Token Theft:</strong> Robo de tokens OAuth/SAML</li>
            </ul>
          </div>
        </section>

        <section className="bg-blue-50 p-6 rounded-lg border border-blue-200">
          <h2 className="text-2xl font-bold mb-4 text-blue-800">Técnicas de Detección</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white p-3 rounded shadow">
              <h3 className="font-semibold text-gray-900">Anomalías</h3>
              <ul className="list-disc pl-5 mt-2 text-sm text-gray-700">
                <li>Accesos en horarios inusuales</li>
                <li>Geolocalizaciones imposibles</li>
                <li>Patrones de acceso anómalos</li>
              </ul>
            </div>
            <div className="bg-white p-3 rounded shadow">
              <h3 className="font-semibold text-gray-900">Herramientas</h3>
              <ul className="list-disc pl-5 mt-2 text-sm text-gray-700">
                <li>Azure AD Identity Protection</li>
                <li>CrowdStrike Identity Protection</li>
                <li>Okta ThreatInsight</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="border-t pt-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Referencias</h2>
          <div className="border-l-4 border-blue-600 pl-4">
            <ul className="space-y-3">
              <li>
                <a href="https://www.microsoft.com/en-us/security/business/identity-access/identity-threat-detection-response" className="flex items-center text-blue-600 hover:underline">
                  <FiExternalLink className="mr-2" /> Microsoft ITDR Solutions
                </a>
              </li>
              <li>
                <a href="https://www.gartner.com/en/articles/what-is-identity-threat-detection-and-response" className="flex items-center text-blue-600 hover:underline">
                  <FiExternalLink className="mr-2" /> Gartner ITDR Overview
                </a>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </ArticleLayout>
  );
}
