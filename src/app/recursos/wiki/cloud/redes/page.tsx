import ArticleLayout from '@/components/wiki/ArticleLayout';
import { FiExternalLink } from 'react-icons/fi';

export default function VPCSecurityPage() {
  return (
    <ArticleLayout 
      title="VPC, Security Groups & PrivateLink"
      description="Seguridad de red en entornos cloud"
      backUrl="/recursos/wiki/cloud"
    >
      <div className="space-y-10 text-gray-800">
        <section className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Componentes Clave</h2>
          <div className="prose max-w-none">
            <ul className="list-disc pl-6 space-y-2 mb-4 text-gray-700">
              <li><strong>VPC:</strong> Aislamiento lógico de redes</li>
              <li><strong>Security Groups:</strong> Firewall a nivel de instancia</li>
              <li><strong>NACLs:</strong> Firewall a nivel de subred</li>
              <li><strong>PrivateLink:</strong> Conexión privada a servicios</li>
            </ul>
          </div>
        </section>

        <section className="bg-blue-50 p-6 rounded-lg border border-blue-200">
          <h2 className="text-2xl font-bold mb-4 text-blue-800">Configuraciones Seguras</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white p-3 rounded shadow">
              <h3 className="font-semibold text-gray-900">VPC</h3>
              <ul className="list-disc pl-5 mt-2 text-sm text-gray-700">
                <li>Subnets privadas sin acceso a Internet</li>
                <li>Peering solo entre VPCs necesarias</li>
                <li>Flow logs habilitados</li>
              </ul>
            </div>
            <div className="bg-white p-3 rounded shadow">
              <h3 className="font-semibold text-gray-900">Security Groups</h3>
              <ul className="list-disc pl-5 mt-2 text-sm text-gray-700">
                <li>Reglas específicas por protocolo/puerto</li>
                <li>No usar 0.0.0.0/0 sin necesidad</li>
                <li>Revisar regularmente</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="border-t pt-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Referencias</h2>
          <div className="border-l-4 border-blue-600 pl-4">
            <ul className="space-y-3">
              <li>
                <a href="https://docs.aws.amazon.com/vpc/latest/userguide/vpc-security-best-practices.html" className="flex items-center text-blue-600 hover:underline">
                  <FiExternalLink className="mr-2" /> AWS VPC Security Best Practices
                </a>
              </li>
              <li>
                <a href="https://cloud.google.com/vpc/docs/private-access-options" className="flex items-center text-blue-600 hover:underline">
                  <FiExternalLink className="mr-2" /> GCP Private Connectivity
                </a>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </ArticleLayout>
  );
}
