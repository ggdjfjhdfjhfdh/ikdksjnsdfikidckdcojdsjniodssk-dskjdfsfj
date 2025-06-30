import ArticleLayout from '@/components/wiki/ArticleLayout';
import { FiExternalLink } from 'react-icons/fi';

export default function SessionManagementPage() {
  return (
    <ArticleLayout 
      title="Gestión de Sesiones y Revocación"
      description="Control y terminación de sesiones activas"
      backUrl="/recursos/wiki/identidad"
    >
      <div className="space-y-10 text-gray-800">
        <section className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Parámetros Clave</h2>
          <div className="prose max-w-none">
            <ul className="list-disc pl-6 space-y-2 mb-4 text-gray-700">
              <li><strong>Timeout:</strong> Duración máxima de sesión</li>
              <li><strong>Inactividad:</strong> Cierre por falta de uso</li>
              <li><strong>Token Refresh:</strong> Rotación periódica</li>
              <li><strong>Single Sign-Out:</strong> Terminación global</li>
            </ul>
          </div>
        </section>

        <section className="bg-blue-50 p-6 rounded-lg border border-blue-200">
          <h2 className="text-2xl font-bold mb-4 text-blue-800">Mecanismos de Revocación</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white p-3 rounded shadow">
              <h3 className="font-semibold text-gray-900">OAuth 2.0</h3>
              <ul className="list-disc pl-5 mt-2 text-sm text-gray-700">
                <li>Revocation Endpoint</li>
                <li>Token Blacklisting</li>
                <li>Short-lived tokens</li>
              </ul>
            </div>
            <div className="bg-white p-3 rounded shadow">
              <h3 className="font-semibold text-gray-900">SAML</h3>
              <ul className="list-disc pl-5 mt-2 text-sm text-gray-700">
                <li>Single Logout (SLO)</li>
                <li>Session Index</li>
                <li>ForceAuthn</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="border-t pt-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Referencias</h2>
          <div className="border-l-4 border-blue-600 pl-4">
            <ul className="space-y-3">
              <li>
                <a href="https://datatracker.ietf.org/doc/html/rfc7009" className="flex items-center text-blue-600 hover:underline">
                  <FiExternalLink className="mr-2" /> OAuth 2.0 Token Revocation
                </a>
              </li>
              <li>
                <a href="https://docs.oasis-open.org/security/saml/v2.0/saml-core-2.0-os.pdf" className="flex items-center text-blue-600 hover:underline">
                  <FiExternalLink className="mr-2" /> SAML Logout Profiles
                </a>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </ArticleLayout>
  );
}
