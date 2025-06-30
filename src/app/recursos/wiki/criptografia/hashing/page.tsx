import ArticleLayout from '@/components/wiki/ArticleLayout';
import { FiExternalLink } from 'react-icons/fi';

export default function HashingPage() {
  return (
    <ArticleLayout 
      title="Hashing y KDF"
      description="Funciones criptográficas para integridad de datos y derivación segura de claves"
      backUrl="/recursos/wiki/criptografia"
    >
      <div className="space-y-10 text-gray-800">
        <section className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h2 className="text-2xl font-bold mb-4">Definición Técnica</h2>
          <div className="prose max-w-none">
            <p className="mb-4">
              Las funciones hash criptográficas transforman datos de tamaño arbitrario en valores de tamaño fijo, mientras que los KDF derivan claves seguras a partir de contraseñas.
            </p>
            <div className="bg-yellow-50 p-4 rounded border-l-4 border-yellow-500 mb-4">
              <p className="text-sm">
                <strong>Propiedades clave:</strong> Resistencia a preimagen, segunda preimagen y colisiones.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-blue-50 p-6 rounded-lg border border-blue-200">
          <h2 className="text-2xl font-bold mb-4 text-blue-800">Algoritmos Principales</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="font-bold text-lg mb-3">Funciones Hash</h3>
              <ul className="list-disc pl-6 space-y-2 text-sm">
                <li><strong>SHA-256/512:</strong> Estándar actual (FIPS 180-4)</li>
                <li><strong>SHA-3:</strong> Basado en Keccak, resistente a ataques</li>
                <li><strong>BLAKE3:</strong> Alto rendimiento, paralelizable</li>
                <li><strong>MD5:</strong> Obsoleto (vulnerable a colisiones)</li>
              </ul>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="font-bold text-lg mb-3">KDF (Key Derivation)</h3>
              <ul className="list-disc pl-6 space-y-2 text-sm">
                <li><strong>PBKDF2:</strong> Estándar NIST, resistente a GPU</li>
                <li><strong>Argon2:</strong> Ganador PHC, resistente a ASIC</li>
                <li><strong>scrypt:</strong> Requiere mucha memoria</li>
                <li><strong>bcrypt:</strong> Adaptable pero más antiguo</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="border-t pt-6">
          <h2 className="text-2xl font-bold mb-4">Referencias</h2>
          <div className="border-l-4 border-blue-600 pl-4">
            <h3 className="font-semibold mb-2">Estándares y Guías</h3>
            <ul className="space-y-3">
              <li>
                <a href="https://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.180-4.pdf" className="flex items-center text-blue-700 hover:text-blue-900">
                  <FiExternalLink className="mr-2" /> FIPS 180-4 (SHA estándar)
                </a>
              </li>
              <li>
                <a href="https://password-hashing.net" className="flex items-center text-blue-700 hover:text-blue-900">
                  <FiExternalLink className="mr-2" /> Password Hashing Competition
                </a>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </ArticleLayout>
  );
}
