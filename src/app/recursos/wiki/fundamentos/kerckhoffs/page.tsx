import ArticleLayout from '@/components/wiki/ArticleLayout';
import { FiExternalLink } from 'react-icons/fi';

export default function KerckhoffsPage() {
  return (
    <ArticleLayout 
      title="Principios de Kerckhoffs" 
      description="Fundamentos de diseño criptográfico basados en seguridad por transparencia"
      backUrl="/recursos/wiki/fundamentos"
    >
      <div className="space-y-10 text-gray-800">
        <section className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h2 className="text-2xl font-bold mb-4">¿Qué son los Principios de Kerckhoffs?</h2>
          <div className="prose max-w-none">
            <p className="mb-4">
              Formulados por Auguste Kerckhoffs en 1883, estos principios establecen que:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Un sistema criptográfico debe ser seguro incluso si todo su diseño es público</li>
              <li>La seguridad debe residir únicamente en la clave secreta</li>
              <li>El sistema debe ser comprensible y verificable por expertos</li>
            </ul>
            
            <div className="bg-blue-50 p-4 rounded border-l-4 border-blue-500">
              <p className="text-sm">
                <strong>Contraste con "seguridad por oscuridad":</strong> Kerckhoffs argumentaba que depender del secreto del diseño es inherentemente inseguro.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-blue-50 p-6 rounded-lg border border-blue-200">
          <h2 className="text-2xl font-bold mb-4 text-blue-800">Los 6 Principios Originales</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm">
              <h3 className="font-semibold mb-2 text-blue-700">1. Seguridad en las claves</h3>
              <p className="text-sm">El sistema debe ser prácticamente irrompible si no se conoce la clave</p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm">
              <h3 className="font-semibold mb-2 text-blue-700">2. Diseño verificable</h3>
              <p className="text-sm">Debe poder ser examinado por expertos sin comprometer su seguridad</p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm">
              <h3 className="font-semibold mb-2 text-blue-700">3. Claves modificables</h3>
              <p className="text-sm">Las claves deben poder cambiarse sin modificar el sistema</p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm">
              <h3 className="font-semibold mb-2 text-blue-700">4. Claridad en protocolos</h3>
              <p className="text-sm">Los mensajes cifrados deben poder transmitirse por canales inseguros</p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm">
              <h3 className="font-semibold mb-2 text-blue-700">5. Portabilidad</h3>
              <p className="text-sm">El sistema debe ser usable por una sola persona si es necesario</p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm">
              <h3 className="font-semibold mb-2 text-blue-700">6. Implementación práctica</h3>
              <p className="text-sm">No debe requerir condiciones operativas complejas</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Aplicaciones Modernas</h2>
          
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="font-semibold mb-3">En Criptografía</h3>
              <ul className="list-disc pl-5 space-y-2 text-sm">
                <li>Diseño de algoritmos como AES y RSA</li>
                <li>Estándares de cifrado de clave pública</li>
                <li>Protocolos TLS/SSL</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-3">En Seguridad Informática</h3>
              <ul className="list-disc pl-5 space-y-2 text-sm">
                <li>Desarrollo de software open-source</li>
                <li>Auditorías públicas de seguridad</li>
                <li>Bug bounty programs</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="border-t pt-6">
          <h2 className="text-2xl font-bold mb-4">Referencias</h2>
          
          <div className="border-l-4 border-blue-600 pl-4">
            <h3 className="font-semibold mb-2">Documentación Original</h3>
            <ul className="space-y-3">
              <li>
                <a href="https://petitcolas.net/kerckhoffs/" className="flex items-center text-blue-700 hover:text-blue-900">
                  <FiExternalLink className="mr-2" /> La Cryptographie Militaire (1883)
                </a>
              </li>
              <li>
                <a href="https://www.cs.utexas.edu/~byoung/cs361/lecture-kerckhoffs.pdf" className="flex items-center text-blue-700 hover:text-blue-900">
                  <FiExternalLink className="mr-2" /> Análisis Académico
                </a>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </ArticleLayout>
  );
}
