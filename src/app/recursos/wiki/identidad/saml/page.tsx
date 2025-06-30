import ArticleLayout from '@/components/wiki/ArticleLayout';
import { FiExternalLink } from 'react-icons/fi';

export default function SAMLPage() {
  return (
    <ArticleLayout 
      title="SAML & Federación de Identidad"
      description="Estándar para SSO y federación entre dominios"
      backUrl="/recursos/wiki/identidad"
    >
      <div className="space-y-10 text-gray-800">
        <section className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Componentes SAML</h2>
          <div className="prose max-w-none">
            <ul className="list-disc pl-6 space-y-2 mb-4 text-gray-700">
              <li><strong>Identity Provider (IdP):</strong> Autentica usuarios</li>
              <li><strong>Service Provider (SP):</strong> Aplica acceso</li>
              <li><strong>Assertions:</strong> XML con datos de autenticación</li>
              <li><strong>Metadata:</strong> Configuración entre IdP y SP</li>
            </ul>
          </div>
        </section>

        <section className="bg-blue-50 p-6 rounded-lg border border-blue-200">
          <h2 className="text-2xl font-bold mb-4 text-blue-800">Flujos SAML</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white p-3 rounded shadow">
              <h3 className="font-semibold text-gray-900">SP-initiated</h3>
              <p className="text-sm text-gray-700 mt-2">El SP redirige al IdP para autenticación</p>
            </div>
            <div className="bg-white p-3 rounded shadow">
              <h3 className="font-semibold text-gray-900">IdP-initiated</h3>
              <p className="text-sm text-gray-700 mt-2">El IdP inicia sesión y envía al SP</p>
            </div>
          </div>
        </section>

        <section className="border-t pt-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Referencias</h2>
          <div className="border-l-4 border-blue-600 pl-4">
            <ul className="space-y-3">
              <li>
                <a href="https://docs.oasis-open.org/security/saml/v2.0/saml-core-2.0-os.pdf" className="flex items-center text-blue-600 hover:underline">
                  <FiExternalLink className="mr-2" /> SAML 2.0 Specification
                </a>
              </li>
              <li>
                <a href="https://www.oasis-open.org/committees/tc_home.php?wg_abbrev=security" className="flex items-center text-blue-600 hover:underline">
                  <FiExternalLink className="mr-2" /> OASIS Security Standards
                </a>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </ArticleLayout>
  );
}
