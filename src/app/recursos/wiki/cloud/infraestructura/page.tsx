import ArticleLayout from '@/components/wiki/ArticleLayout';
import { FiExternalLink } from 'react-icons/fi';

export default function ImmutableInfraPage() {
  return (
    <ArticleLayout 
      title="Immutable Infrastructure & Blue-Green/Canary"
      description="Patrones de despliegue seguro en entornos cloud"
      backUrl="/recursos/wiki/cloud"
    >
      <div className="space-y-10 text-gray-800">
        <section className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Conceptos Clave</h2>
          <div className="prose max-w-none">
            <ul className="list-disc pl-6 space-y-2 mb-4 text-gray-700">
              <li><strong>Immutable Infrastructure:</strong> Servidores no modificables</li>
              <li><strong>Blue-Green:</strong> Dos entornos idénticos alternados</li>
              <li><strong>Canary:</strong> Despliegue gradual a subconjunto de usuarios</li>
              <li><strong>Rollback:</strong> Retorno rápido a versión anterior</li>
            </ul>
          </div>
        </section>

        <section className="bg-blue-50 p-6 rounded-lg border border-blue-200">
          <h2 className="text-2xl font-bold mb-4 text-blue-800">Implementación</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white p-3 rounded shadow">
              <h3 className="font-semibold text-gray-900">AWS</h3>
              <ul className="list-disc pl-5 mt-2 text-sm text-gray-700">
                <li>CodeDeploy para Blue-Green</li>
                <li>EC2 Auto Scaling Groups</li>
                <li>Route53 weighted records</li>
              </ul>
            </div>
            <div className="bg-white p-3 rounded shadow">
              <h3 className="font-semibold text-gray-900">Kubernetes</h3>
              <ul className="list-disc pl-5 mt-2 text-sm text-gray-700">
                <li>Deployments con rolling updates</li>
                <li>Service Mesh para Canary</li>
                <li>Helm rollback</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="border-t pt-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Referencias</h2>
          <div className="border-l-4 border-blue-600 pl-4">
            <ul className="space-y-3">
              <li>
                <a href="https://docs.aws.amazon.com/whitepapers/latest/overview-deployment-options/bluegreen-deployments.html" className="flex items-center text-blue-600 hover:underline">
                  <FiExternalLink className="mr-2" /> AWS Blue-Green Deployments
                </a>
              </li>
              <li>
                <a href="https://martinfowler.com/bliki/CanaryRelease.html" className="flex items-center text-blue-600 hover:underline">
                  <FiExternalLink className="mr-2" /> Martin Fowler on Canary Releases
                </a>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </ArticleLayout>
  );
}
