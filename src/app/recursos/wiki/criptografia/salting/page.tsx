import ArticleLayout from '@/components/wiki/ArticleLayout';
import { FiExternalLink } from 'react-icons/fi';

export default function SaltingPage() {
  return (
    <ArticleLayout 
      title="Salting y Peppering"
      description="Técnicas para proteger contraseñas contra ataques con tablas precomputadas"
      backUrl="/recursos/wiki/criptografia"
    >
      <div className="space-y-10 text-gray-800">
        <section className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h2 className="text-2xl font-bold mb-4">Conceptos Fundamentales</h2>
          <div className="prose max-w-none">
            <p className="mb-4">
              Estas técnicas protegen contraseñas incluso cuando se usan hashes criptográficos débiles o cuando múltiples usuarios tienen la misma contraseña.
            </p>
            <div className="bg-red-50 p-4 rounded border-l-4 border-red-500 mb-4">
              <p className="text-sm">
                <strong>Dato crítico:</strong> Un salt debe ser único por cada contraseña, mientras que un pepper es el mismo para todas las contraseñas pero se mantiene secreto.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-blue-50 p-6 rounded-lg border border-blue-200">
          <h2 className="text-2xl font-bold mb-4 text-blue-800">Implementación Segura</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="font-bold text-lg mb-3">Salting</h3>
              <ul className="list-disc pl-6 space-y-2 text-sm">
                <li><strong>Longitud:</strong> Mínimo 16 bytes (128 bits)</li>
                <li><strong>Unicidad:</strong> Generado aleatoriamente para cada usuario</li>
                <li><strong>Almacenamiento:</strong> Guardado junto al hash</li>
                <li><strong>Propósito:</strong> Prevenir rainbow tables</li>
              </ul>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="font-bold text-lg mb-3">Peppering</h3>
              <ul className="list-disc pl-6 space-y-2 text-sm">
                <li><strong>Secreto:</strong> No almacenado en la base de datos</li>
                <li><strong>Longitud:</strong> Mínimo 32 bytes (256 bits)</li>
                <li><strong>Uso:</strong> Aplicado antes del hashing</li>
                <li><strong>Propósito:</strong> Defensa adicional si la DB es comprometida</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h2 className="text-2xl font-bold mb-4">Ejemplo de Flujo Seguro</h2>
          <div className="bg-gray-100 p-4 rounded-lg mb-6">
            <h3 className="font-semibold mb-3">Almacenamiento de Contraseña</h3>
            <ol className="list-decimal pl-5 space-y-2 text-sm">
              <li>Generar salt aleatorio (16+ bytes)</li>
              <li>Concatenar: pepper + contraseña + salt</li>
              <li>Aplicar función KDF (PBKDF2, Argon2, etc.)</li>
              <li>Almacenar salt y hash resultante</li>
            </ol>
          </div>
        </section>

        <section className="border-t pt-6">
          <h2 className="text-2xl font-bold mb-4">Referencias</h2>
          <div className="border-l-4 border-blue-600 pl-4">
            <h3 className="font-semibold mb-2">Guías de Seguridad</h3>
            <ul className="space-y-3">
              <li>
                <a href="https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html" className="flex items-center text-blue-700 hover:text-blue-900">
                  <FiExternalLink className="mr-2" /> OWASP Password Storage
                </a>
              </li>
              <li>
                <a href="https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-63b.pdf" className="flex items-center text-blue-700 hover:text-blue-900">
                  <FiExternalLink className="mr-2" /> NIST SP 800-63B
                </a>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </ArticleLayout>
  );
}
