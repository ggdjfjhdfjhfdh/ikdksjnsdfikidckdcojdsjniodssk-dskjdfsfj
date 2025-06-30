import ArticleLayout from '@/components/wiki/ArticleLayout';
import { FiExternalLink } from 'react-icons/fi';

export default function MemoryForensicsPage() {
  return (
    <ArticleLayout 
      title="Memory Forensics"
      description="Análisis de memoria con Volatility/Rekall"
      backUrl="/recursos/wiki/forense"
    >
      <div className="space-y-10 text-gray-800">
        <section className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Proceso de Análisis</h2>
          <div className="prose max-w-none">
            <ul className="list-disc pl-6 space-y-2 mb-4 text-gray-700">
              <li><strong>Adquisición:</strong> Dump de memoria (WinPmem, LiME)</li>
              <li><strong>Perfiles:</strong> Identificación del sistema operativo</li>
              <li><strong>Plugins:</strong> Módulos de análisis específicos</li>
              <li><strong>Artefactos:</strong> Procesos, conexiones, DLLs inyectadas</li>
            </ul>
          </div>
        </section>

        <section className="bg-blue-50 p-6 rounded-lg border border-blue-200">
          <h2 className="text-2xl font-bold mb-4 text-blue-800">Herramientas</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white p-3 rounded shadow">
              <h3 className="font-semibold text-gray-900">Volatility</h3>
              <ul className="list-disc pl-5 mt-2 text-sm text-gray-700">
                <li>pslist - Procesos activos</li>
                <li>netscan - Conexiones de red</li>
                <li>malfind - Inyección de código</li>
              </ul>
            </div>
            <div className="bg-white p-3 rounded shadow">
              <h3 className="font-semibold text-gray-900">Rekall</h3>
              <ul className="list-disc pl-5 mt-2 text-sm text-gray-700">
                <li>Análisis avanzado de memoria</li>
                <li>Soporte para Windows 10/11</li>
                <li>Integración con GRR</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="border-t pt-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Referencias</h2>
          <div className="border-l-4 border-blue-600 pl-4">
            <ul className="space-y-3">
              <li>
                <a href="https://github.com/volatilityfoundation/volatility" className="flex items-center text-blue-600 hover:underline">
                  <FiExternalLink className="mr-2" /> Volatility GitHub
                </a>
              </li>
              <li>
                <a href="https://www.rekall-forensic.com/" className="flex items-center text-blue-600 hover:underline">
                  <FiExternalLink className="mr-2" /> Rekall Documentation
                </a>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </ArticleLayout>
  );
}
