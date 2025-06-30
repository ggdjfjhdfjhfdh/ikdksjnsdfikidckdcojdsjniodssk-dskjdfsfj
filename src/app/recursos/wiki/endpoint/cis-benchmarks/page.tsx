import ArticleLayout from '@/components/wiki/ArticleLayout';
import { FiExternalLink } from 'react-icons/fi';

export default function CISBenchmarksPage() {
  return (
    <ArticleLayout 
      title="CIS Benchmarks & Hardening"
      description="Configuraciones seguras para sistemas y aplicaciones"
      backUrl="/recursos/wiki/endpoint"
    >
      <div className="space-y-10 text-gray-800">
        <section className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Conceptos Clave</h2>
          <div className="prose max-w-none">
            <ul className="list-disc pl-6 space-y-2 mb-4 text-gray-700">
              <li><strong>CIS Benchmarks:</strong> Configuraciones seguras validadas</li>
              <li><strong>Hardening:</strong> Reducción de superficie de ataque</li>
              <li><strong>Niveles:</strong> Perfil L1 (básico) y L2 (avanzado)</li>
              <li><strong>SCAP:</strong> Protocolo de validación automática</li>
            </ul>
          </div>
        </section>

        <section className="bg-blue-50 p-6 rounded-lg border border-blue-200">
          <h2 className="text-2xl font-bold mb-4 text-blue-800">Implementación</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white p-3 rounded shadow">
              <h3 className="font-semibold text-gray-900">Sistemas Operativos</h3>
              <ul className="list-disc pl-5 mt-2 text-sm text-gray-700">
                <li>Windows 10/11</li>
                <li>Linux Distributions</li>
                <li>macOS</li>
              </ul>
            </div>
            <div className="bg-white p-3 rounded shadow">
              <h3 className="font-semibold text-gray-900">Herramientas</h3>
              <ul className="list-disc pl-5 mt-2 text-sm text-gray-700">
                <li>CIS-CAT Pro</li>
                <li>Microsoft Security Compliance Toolkit</li>
                <li>OpenSCAP</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="border-t pt-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Referencias</h2>
          <div className="border-l-4 border-blue-600 pl-4">
            <ul className="space-y-3">
              <li>
                <a href="https://www.cisecurity.org/cis-benchmarks" className="flex items-center text-blue-600 hover:underline">
                  <FiExternalLink className="mr-2" /> CIS Benchmarks Oficiales
                </a>
              </li>
              <li>
                <a href="https://learn.microsoft.com/en-us/windows/security/threat-protection/windows-security-configuration-framework/windows-security-baselines" className="flex items-center text-blue-600 hover:underline">
                  <FiExternalLink className="mr-2" /> Microsoft Security Baselines
                </a>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </ArticleLayout>
  );
}
