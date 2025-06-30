import ArticleLayout from '@/components/wiki/ArticleLayout';
import { FiExternalLink } from 'react-icons/fi';

export default function DeserializacionPage() {
  return (
    <ArticleLayout 
      title="Deserialización Insegura"
      description="Riesgos y mitigaciones en la deserialización de objetos"
      backUrl="/recursos/wiki/web"
    >
      <div className="space-y-10 text-gray-800">
        <section className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Vulnerabilidades Comunes</h2>
          <div className="prose max-w-none">
            <ul className="list-disc pl-6 space-y-2 mb-4 text-gray-700">
              <li><strong>Remote Code Execution:</strong> Ejecución arbitraria de código</li>
              <li><strong>Denial of Service:</strong> Ataques de deserialización infinita</li>
              <li><strong>Data Tampering:</strong> Manipulación de objetos serializados</li>
              <li><strong>Type Confusion:</strong> Manipulación de tipos de objetos</li>
            </ul>
          </div>
        </section>

        <section className="bg-blue-50 p-6 rounded-lg border border-blue-200">
          <h2 className="text-2xl font-bold mb-4 text-blue-800">Lenguajes Afectados</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white p-3 rounded shadow text-center">
              <p className="font-semibold text-sm text-gray-900">Java</p>
              <p className="text-xs text-gray-600">ObjectInputStream</p>
            </div>
            <div className="bg-white p-3 rounded shadow text-center">
              <p className="font-semibold text-sm text-gray-900">.NET</p>
              <p className="text-xs text-gray-600">BinaryFormatter</p>
            </div>
            <div className="bg-white p-3 rounded shadow text-center">
              <p className="font-semibold text-sm text-gray-900">Python</p>
              <p className="text-xs text-gray-600">pickle module</p>
            </div>
          </div>
        </section>

        <section className="border-t pt-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Mejores Prácticas</h2>
          <div className="prose max-w-none">
            <ol className="list-decimal pl-6 space-y-2 mb-4 text-gray-700">
              <li>Usar formatos seguros (JSON, XML) en lugar de binarios</li>
              <li>Implementar validación estricta de datos</li>
              <li>Usar listas blancas de clases permitidas</li>
              <li>Firmar digitalmente datos serializados</li>
            </ol>
          </div>
        </section>

        <section className="border-t pt-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Referencias</h2>
          <div className="border-l-4 border-blue-600 pl-4">
            <ul className="space-y-3">
              <li>
                <a href="https://cheatsheetseries.owasp.org/cheatsheets/Deserialization_Cheat_Sheet.html" className="flex items-center text-blue-600 hover:underline">
                  <FiExternalLink className="mr-2" /> OWASP Deserialization Cheat Sheet
                </a>
              </li>
              <li>
                <a href="https://cwe.mitre.org/data/definitions/502.html" className="flex items-center text-blue-600 hover:underline">
                  <FiExternalLink className="mr-2" /> CWE-502: Deserialization of Untrusted Data
                </a>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </ArticleLayout>
  );
}
