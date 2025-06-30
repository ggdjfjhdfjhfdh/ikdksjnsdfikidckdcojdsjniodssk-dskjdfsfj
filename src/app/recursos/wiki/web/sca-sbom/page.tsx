import ArticleLayout from '@/components/wiki/ArticleLayout';
import { FiExternalLink } from 'react-icons/fi';

export default function SCASBOMPage() {
  return (
    <ArticleLayout 
      title="SCA & SBOM"
      description="Software Composition Analysis y Software Bill of Materials"
      backUrl="/recursos/wiki/web"
    >
      <div className="space-y-10 text-gray-800">
        <section className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Conceptos Clave</h2>
          <div className="prose max-w-none">
            <ul className="list-disc pl-6 space-y-2 mb-4 text-gray-700">
              <li><strong>SCA:</strong> Análisis de dependencias vulnerables</li>
              <li><strong>SBOM:</strong> Inventario completo de componentes</li>
              <li><strong>Formats:</strong> SPDX, CycloneDX, SWID</li>
              <li><strong>Licensing:</strong> Cumplimiento de licencias</li>
            </ul>
          </div>
        </section>

        <section className="bg-blue-50 p-6 rounded-lg border border-blue-200">
          <h2 className="text-2xl font-bold mb-4 text-blue-800">Implementación</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white p-3 rounded shadow">
              <h3 className="font-semibold text-gray-900">Proceso</h3>
              <ul className="list-disc pl-5 mt-2 text-sm text-gray-700">
                <li>Generar SBOM en CI/CD</li>
                <li>Integrar con SCA tools</li>
                <li>Monitorear nuevas vulnerabilidades</li>
              </ul>
            </div>
            <div className="bg-white p-3 rounded shadow">
              <h3 className="font-semibold text-gray-900">Herramientas</h3>
              <ul className="list-disc pl-5 mt-2 text-sm text-gray-700">
                <li>Dependabot, Snyk, Black Duck</li>
                <li>OWASP Dependency-Track</li>
                <li>Anchore, Grype</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="border-t pt-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Referencias</h2>
          <div className="border-l-4 border-blue-600 pl-4">
            <ul className="space-y-3">
              <li>
                <a href="https://www.ntia.gov/SBOM" className="flex items-center text-blue-600 hover:underline">
                  <FiExternalLink className="mr-2" /> NTIA SBOM Resources
                </a>
              </li>
              <li>
                <a href="https://owasp.org/www-project-dependency-track/" className="flex items-center text-blue-600 hover:underline">
                  <FiExternalLink className="mr-2" /> OWASP Dependency-Track
                </a>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </ArticleLayout>
  );
}
