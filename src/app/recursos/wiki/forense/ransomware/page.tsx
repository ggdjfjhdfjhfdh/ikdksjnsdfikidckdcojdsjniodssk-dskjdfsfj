import ArticleLayout from '@/components/wiki/ArticleLayout';
import { FiExternalLink } from 'react-icons/fi';

export default function RansomwarePage() {
  return (
    <ArticleLayout 
      title="Ransomware Analysis"
      description="Análisis y flujo de decryptores"
      backUrl="/recursos/wiki/forense"
    >
      <div className="space-y-10 text-gray-800">
        <section className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Etapas de Análisis</h2>
          <div className="prose max-w-none">
            <ul className="list-disc pl-6 space-y-2 mb-4 text-gray-700">
              <li><strong>Identificación:</strong> Firmas y comportamiento</li>
              <li><strong>Desensamblado:</strong> Reversing estático/dinámico</li>
              <li><strong>Claves:</strong> Extracción de claves de cifrado</li>
              <li><strong>Decryptor:</strong> Desarrollo de herramienta de descifrado</li>
            </ul>
          </div>
        </section>

        <section className="bg-blue-50 p-6 rounded-lg border border-blue-200">
          <h2 className="text-2xl font-bold mb-4 text-blue-800">Familias Comunes</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white p-3 rounded shadow">
              <h3 className="font-semibold text-gray-900">CryptoLocker</h3>
              <ul className="list-disc pl-5 mt-2 text-sm text-gray-700">
                <li>RSA-2048 + AES</li>
                <li>Botnet Gameover ZeuS</li>
              </ul>
            </div>
            <div className="bg-white p-3 rounded shadow">
              <h3 className="font-semibold text-gray-900">WannaCry</h3>
              <ul className="list-disc pl-5 mt-2 text-sm text-gray-700">
                <li>EternalBlue exploit</li>
                <li>Kill switch domain</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="border-t pt-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Referencias</h2>
          <div className="border-l-4 border-blue-600 pl-4">
            <ul className="space-y-3">
              <li>
                <a href="https://www.nomoreransom.org" className="flex items-center text-blue-600 hover:underline">
                  <FiExternalLink className="mr-2" /> No More Ransom
                </a>
              </li>
              <li>
                <a href="https://www.bleepingcomputer.com/forums/f/239/ransomware-help-tech-support/" className="flex items-center text-blue-600 hover:underline">
                  <FiExternalLink className="mr-2" /> BleepingComputer Forum
                </a>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </ArticleLayout>
  );
}
