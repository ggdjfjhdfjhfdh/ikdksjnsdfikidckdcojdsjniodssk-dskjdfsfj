import ArticleLayout from '@/components/wiki/ArticleLayout';
import { FiExternalLink } from 'react-icons/fi';
import { ResponsiveTable, TableCell } from '@/components/wiki/ResponsiveTable';

export default function ModosCifradoPage() {
  return (
    <ArticleLayout 
      title="Modos de Cifrado"
      description="Técnicas para aplicar algoritmos de cifrado por bloques a mensajes de cualquier tamaño"
      backUrl="/recursos/wiki/criptografia"
    >
      <div className="space-y-10 text-gray-800">
        <section className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h2 className="text-2xl font-bold mb-4">Definición Técnica</h2>
          <div className="prose max-w-none">
            <p className="mb-4">
              Los modos de operación especifican cómo aplicar repetidamente un cifrado por bloques (como AES) a datos más largos que el tamaño de bloque (128 bits para AES).
            </p>
            <div className="bg-yellow-50 p-4 rounded border-l-4 border-yellow-500 mb-4">
              <p className="text-sm">
                <strong>Nota clave:</strong> El modo de operación es crucial para la seguridad - un algoritmo fuerte como AES puede volverse inseguro si se usa con un modo débil.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-blue-50 p-6 rounded-lg border border-blue-200">
          <h2 className="text-2xl font-bold mb-4 text-blue-800">Modos Principales</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="font-bold text-lg mb-3">GCM (Galois/Counter Mode)</h3>
              <ul className="list-disc pl-6 space-y-2 text-sm">
                <li><strong>Autenticación integrada:</strong> Proporciona confidencialidad y autenticidad</li>
                <li><strong>Eficiencia:</strong> Paralelizable, ideal para hardware</li>
                <li><strong>Uso:</strong> Estándar en TLS 1.2/1.3, IPsec</li>
                <li><strong>Ventaja:</strong> Resistente a ataques de padding oracle</li>
              </ul>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="font-bold text-lg mb-3">CBC (Cipher Block Chaining)</h3>
              <ul className="list-disc pl-6 space-y-2 text-sm">
                <li><strong>Operación:</strong> Cada bloque se XOR con el cifrado anterior</li>
                <li><strong>Requisito:</strong> IV único e impredecible para cada mensaje</li>
                <li><strong>Vulnerabilidad:</strong> Ataques de padding oracle</li>
                <li><strong>Historia:</strong> Ampliamente usado en SSL/TLS 1.0-1.1</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h2 className="text-2xl font-bold mb-4">Comparativa Técnica</h2>
          <div className="bg-gray-100 p-4 rounded-lg border border-gray-200 mb-6">
            <ResponsiveTable>
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <TableCell header>Modo</TableCell>
                    <TableCell header>Seguridad</TableCell>
                    <TableCell header>Uso Recomendado</TableCell>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <TableCell>GCM</TableCell>
                    <TableCell>Alta (Autenticado)</TableCell>
                    <TableCell>TLS, almacenamiento</TableCell>
                  </tr>
                </tbody>
              </table>
            </ResponsiveTable>
          </div>
        </section>

        <section className="border-t pt-6">
          <h2 className="text-2xl font-bold mb-4">Referencias</h2>
          <div className="border-l-4 border-blue-600 pl-4">
            <h3 className="font-semibold mb-2">Estándares y Guías</h3>
            <ul className="space-y-3">
              <li>
                <a href="https://nvlpubs.nist.gov/nistpubs/Legacy/SP/nistspecialpublication800-38a.pdf" className="flex items-center text-blue-700 hover:text-blue-900">
                  <FiExternalLink className="mr-2" /> NIST SP 800-38A - Modos de Operación
                </a>
              </li>
              <li>
                <a href="https://csrc.nist.gov/projects/block-cipher-techniques" className="flex items-center text-blue-700 hover:text-blue-900">
                  <FiExternalLink className="mr-2" /> NIST Block Cipher Techniques
                </a>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </ArticleLayout>
  );
}
