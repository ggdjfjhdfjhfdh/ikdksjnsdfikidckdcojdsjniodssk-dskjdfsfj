import ArticleLayout from '@/components/wiki/ArticleLayout';
import BackButton from '@/components/BackButton';

export default function PostQuantumCryptoArticle() {
  return (
    <ArticleLayout 
      title="Criptografía Post-Cuántica" 
      backUrl="/recursos/wiki/tecnologias"
    >
      <div className="prose max-w-none">
        <h2>Riesgos Cuánticos</h2>
        <div className="grid md:grid-cols-2 gap-6 my-6">
          <div className="bg-red-50 p-4 rounded-lg">
            <h3 className="font-bold text-red-800">Algoritmo de Shor</h3>
            <p className="mt-2">Rompe RSA/ECC factorizando números grandes en tiempo polinomial</p>
            <p className="text-sm mt-2">Impacto: Firma digital, intercambio de claves</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <h3 className="font-bold text-purple-800">Algoritmo de Grover</h3>
            <p className="mt-2">Reduce complejidad de búsqueda en hash functions a O(√N)</p>
            <p className="text-sm mt-2">Impacto: Doblar longitud de hashes (SHA-256 → SHA-512)</p>
          </div>
        </div>

        <h3 className="text-xl font-semibold mt-8">Algoritmos NIST Finalistas</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Algoritmo</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ventajas</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">KEM</td>
                <td className="px-6 py-4 whitespace-nowrap font-medium">Kyber</td>
                <td className="px-6 py-4">Eficiente, claves pequeñas</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">Firma Digital</td>
                <td className="px-6 py-4 whitespace-nowrap font-medium">Dilithium</td>
                <td className="px-6 py-4">Rendimiento balanceado</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="text-xl font-semibold mt-8">Timeline de Migración</h3>
        <div className="bg-blue-50 p-4 rounded-lg my-4">
          <ol className="list-decimal pl-5 space-y-2">
            <li><span className="font-medium">Inventario Criptográfico</span> (Ahora)</li>
            <li><span className="font-medium">Pruebas con Algoritmos Híbridos</span> (2024)</li>
            <li><span className="font-medium">Implementación Paralela</span> (2025-2027)</li>
            <li><span className="font-medium">Transición Completa</span> (2028-2030)</li>
          </ol>
        </div>

        <h3 className="text-xl font-semibold mt-8">Estrategia Híbrida TLS 1.3</h3>
        <div className="bg-green-50 border-l-4 border-green-400 p-4 my-4">
          <pre className="text-sm bg-white p-2 rounded">
            {`ClientHello:
  - Traditional: ECDHE (X25519)
  - PQ: Kyber-1024

ServerHello:
  - Combina ambos métodos
  - Usa el más fuerte disponible`}
          </pre>
        </div>
      </div>
    </ArticleLayout>
  );
}
