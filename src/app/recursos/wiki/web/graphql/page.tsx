import ArticleLayout from '@/components/wiki/ArticleLayout';
import { FiExternalLink } from 'react-icons/fi';

export default function GraphQLSecurityPage() {
  return (
    <ArticleLayout 
      title="GraphQL Security"
      description="Protección de APIs GraphQL contra ataques comunes"
      backUrl="/recursos/wiki/web"
    >
      <div className="space-y-10 text-gray-800">
        <section className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Vulnerabilidades Comunes</h2>
          <div className="prose max-w-none">
            <ul className="list-disc pl-6 space-y-2 mb-4 text-gray-700">
              <li><strong>Introspection Abuse:</strong> Descubrimiento de esquema</li>
              <li><strong>Batch Attacks:</strong> Múltiples queries en una solicitud</li>
              <li><strong>Denial of Service:</strong> Queries complejas/anidadas</li>
              <li><strong>Injection:</strong> SQL/NoSQL injection a través de argumentos</li>
            </ul>
          </div>
        </section>

        <section className="bg-blue-50 p-6 rounded-lg border border-blue-200">
          <h2 className="text-2xl font-bold mb-4 text-blue-800">Protecciones</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white p-3 rounded shadow">
              <h3 className="font-semibold text-gray-900">Configuración</h3>
              <ul className="list-disc pl-5 mt-2 text-sm text-gray-700">
                <li>Deshabilitar introspection en producción</li>
                <li>Limitar profundidad de queries</li>
                <li>Implementar query cost analysis</li>
              </ul>
            </div>
            <div className="bg-white p-3 rounded shadow">
              <h3 className="font-semibold text-gray-900">Autenticación</h3>
              <ul className="list-disc pl-5 mt-2 text-sm text-gray-700">
                <li>Validar permisos por campo</li>
                <li>Implementar rate limiting</li>
                <li>Persisted queries</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="border-t pt-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Referencias</h2>
          <div className="border-l-4 border-blue-600 pl-4">
            <ul className="space-y-3">
              <li>
                <a href="https://cheatsheetseries.owasp.org/cheatsheets/GraphQL_Cheat_Sheet.html" className="flex items-center text-blue-600 hover:underline">
                  <FiExternalLink className="mr-2" /> OWASP GraphQL Cheat Sheet
                </a>
              </li>
              <li>
                <a href="https://graphql.org/learn/security/" className="flex items-center text-blue-600 hover:underline">
                  <FiExternalLink className="mr-2" /> GraphQL Official Security Guide
                </a>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </ArticleLayout>
  );
}
