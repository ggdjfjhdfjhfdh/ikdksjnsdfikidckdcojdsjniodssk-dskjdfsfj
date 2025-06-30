import ArticleLayout from '@/components/wiki/ArticleLayout';
import { FiExternalLink } from 'react-icons/fi';

export default function JWTSecurityPage() {
  return (
    <ArticleLayout 
      title="JWT Security"
      description="Vulnerabilidades y buenas prácticas en implementación de JSON Web Tokens"
      backUrl="/recursos/wiki/web"
    >
      <div className="space-y-10 text-gray-800">
        <section className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Vulnerabilidades Comunes</h2>
          <div className="prose max-w-none">
            <ul className="list-disc pl-6 space-y-2 mb-4 text-gray-700">
              <li><strong>alg=none:</strong> Eliminación de firma</li>
              <li><strong>Key Confusion:</strong> Confusión entre algoritmos simétricos/asimétricos</li>
              <li><strong>Weak Secrets:</strong> Secretos débiles en HS256</li>
              <li><strong>Token Replay:</strong> Reutilización de tokens válidos</li>
            </ul>
          </div>
        </section>

        <section className="bg-blue-50 p-6 rounded-lg border border-blue-200">
          <h2 className="text-2xl font-bold mb-4 text-blue-800">Buenas Prácticas</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white p-3 rounded shadow">
              <h3 className="font-semibold text-gray-900">Configuración</h3>
              <ul className="list-disc pl-5 mt-2 text-sm text-gray-700">
                <li>Usar RS256 en lugar de HS256</li>
                <li>Validar algoritmo explícitamente</li>
                <li>JWT expiration corta (15-30 min)</li>
              </ul>
            </div>
            <div className="bg-white p-3 rounded shadow">
              <h3 className="font-semibold text-gray-900">Protecciones</h3>
              <ul className="list-disc pl-5 mt-2 text-sm text-gray-700">
                <li>Implementar token revocation</li>
                <li>Usar nonces para operaciones críticas</li>
                <li>Validar issuer y audience</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="border-t pt-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Referencias</h2>
          <div className="border-l-4 border-blue-600 pl-4">
            <ul className="space-y-3">
              <li>
                <a href="https://auth0.com/docs/secure/tokens/json-web-tokens" className="flex items-center text-blue-600 hover:underline">
                  <FiExternalLink className="mr-2" /> Auth0 JWT Best Practices
                </a>
              </li>
              <li>
                <a href="https://cheatsheetseries.owasp.org/cheatsheets/JSON_Web_Token_for_Java_Cheat_Sheet.html" className="flex items-center text-blue-600 hover:underline">
                  <FiExternalLink className="mr-2" /> OWASP JWT Cheat Sheet
                </a>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </ArticleLayout>
  );
}
