import ArticleLayout from '@/components/wiki/ArticleLayout';
import { FiExternalLink } from 'react-icons/fi';

export default function SecureCICDPage() {
  return (
    <ArticleLayout 
      title="CI/CD Seguro & Firmado de Artefactos"
      description="Prácticas para pipelines seguros y verificación de artefactos"
      backUrl="/recursos/wiki/cloud"
    >
      <div className="space-y-10 text-gray-800">
        <section className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Principios Clave</h2>
          <div className="prose max-w-none">
            <ul className="list-disc pl-6 space-y-2 mb-4 text-gray-700">
              <li><strong>Least Privilege:</strong> Permisos mínimos para pipelines</li>
              <li><strong>Artifact Signing:</strong> Firmado con Sigstore/cosign</li>
              <li><strong>Supply Chain Security:</strong> SBOM y verificación de dependencias</li>
              <li><strong>Immutable Artifacts:</strong> Contenedores y binarios inmutables</li>
            </ul>
          </div>
        </section>

        <section className="bg-blue-50 p-6 rounded-lg border border-blue-200">
          <h2 className="text-2xl font-bold mb-4 text-blue-800">Herramientas</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white p-3 rounded shadow">
              <h3 className="font-semibold text-gray-900">Firmado</h3>
              <ul className="list-disc pl-5 mt-2 text-sm text-gray-700">
                <li>Sigstore/cosign</li>
                <li>Notary v2</li>
                <li>SPDX for SBOM</li>
              </ul>
            </div>
            <div className="bg-white p-3 rounded shadow">
              <h3 className="font-semibold text-gray-900">Verificación</h3>
              <ul className="list-disc pl-5 mt-2 text-sm text-gray-700">
                <li>Kyverno</li>
                <li>OPA Gatekeeper</li>
                <li>Trivy</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="border-t pt-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Referencias</h2>
          <div className="border-l-4 border-blue-600 pl-4">
            <ul className="space-y-3">
              <li>
                <a href="https://sigstore.dev/" className="flex items-center text-blue-600 hover:underline">
                  <FiExternalLink className="mr-2" /> Sigstore Project
                </a>
              </li>
              <li>
                <a href="https://slsa.dev/" className="flex items-center text-blue-600 hover:underline">
                  <FiExternalLink className="mr-2" /> SLSA Framework
                </a>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </ArticleLayout>
  );
}
