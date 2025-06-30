import ArticleLayout from '@/components/wiki/ArticleLayout';
import { FiExternalLink } from 'react-icons/fi';

export default function OAuthPage() {
  return (
    <ArticleLayout 
      title="OAuth 2.0 & OpenID Connect"
      description="Estándares para autorización y autenticación"
      backUrl="/recursos/wiki/identidad"
    >
      <div className="space-y-10 text-gray-800">
        <section className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Conceptos Clave</h2>
          <div className="prose max-w-none">
            <ul className="list-disc pl-6 space-y-2 mb-4 text-gray-700">
              <li><strong>OAuth 2.0:</strong> Framework de autorización</li>
              <li><strong>OIDC:</strong> Capa de autenticación sobre OAuth</li>
              <li><strong>Flujos:</strong> Authorization Code, Implicit, Client Credentials</li>
              <li><strong>Tokens:</strong> Access Token, Refresh Token, ID Token</li>
            </ul>
          </div>
        </section>

        <section className="bg-blue-50 p-6 rounded-lg border border-blue-200">
          <h2 className="text-2xl font-bold mb-4 text-blue-800">Componentes</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white p-3 rounded shadow">
              <h3 className="font-semibold text-gray-900">Roles</h3>
              <ul className="list-disc pl-5 mt-2 text-sm text-gray-700">
                <li>Resource Owner</li>
                <li>Client</li>
                <li>Authorization Server</li>
                <li>Resource Server</li>
              </ul>
            </div>
            <div className="bg-white p-3 rounded shadow">
              <h3 className="font-semibold text-gray-900">Seguridad</h3>
              <ul className="list-disc pl-5 mt-2 text-sm text-gray-700">
                <li>PKCE (Proof Key for Code Exchange)</li>
                <li>State Parameter</li>
                <li>Token Validation</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="border-t pt-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Referencias</h2>
          <div className="border-l-4 border-blue-600 pl-4">
            <ul className="space-y-3">
              <li>
                <a href="https://oauth.net/2/" className="flex items-center text-blue-600 hover:underline">
                  <FiExternalLink className="mr-2" /> OAuth 2.0 Specification
                </a>
              </li>
              <li>
                <a href="https://openid.net/connect/" className="flex items-center text-blue-600 hover:underline">
                  <FiExternalLink className="mr-2" /> OpenID Connect Documentation
                </a>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </ArticleLayout>
  );
}
