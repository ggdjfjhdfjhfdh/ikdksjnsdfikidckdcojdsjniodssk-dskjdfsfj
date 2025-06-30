import ArticleLayout from '@/components/wiki/ArticleLayout';
import { FiExternalLink } from 'react-icons/fi';

export default function IAMRolesPage() {
  return (
    <ArticleLayout 
      title="IAM Roles & Service Accounts"
      description="Gestión segura de identidades en entornos cloud"
      backUrl="/recursos/wiki/cloud"
    >
      <div className="space-y-10 text-gray-800">
        <section className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Principios Clave</h2>
          <div className="prose max-w-none">
            <ul className="list-disc pl-6 space-y-2 mb-4 text-gray-700">
              <li><strong>Least Privilege:</strong> Permisos mínimos necesarios</li>
              <li><strong>Role-Based Access:</strong> Asignación por roles, no usuarios</li>
              <li><strong>Conditional Access:</strong> Restricciones por IP, MFA, etc.</li>
              <li><strong>Rotation:</strong> Rotación regular de credenciales</li>
            </ul>
          </div>
        </section>

        <section className="bg-blue-50 p-6 rounded-lg border border-blue-200">
          <h2 className="text-2xl font-bold mb-4 text-blue-800">Mejores Prácticas</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white p-3 rounded shadow">
              <h3 className="font-semibold text-gray-900">AWS IAM</h3>
              <ul className="list-disc pl-5 mt-2 text-sm text-gray-700">
                <li>Usar roles en lugar de credenciales estáticas</li>
                <li>Implementar permisos a nivel de recurso</li>
                <li>Usar permission boundaries</li>
              </ul>
            </div>
            <div className="bg-white p-3 rounded shadow">
              <h3 className="font-semibold text-gray-900">GCP IAM</h3>
              <ul className="list-disc pl-5 mt-2 text-sm text-gray-700">
                <li>Service accounts con mínimos privilegios</li>
                <li>Usar Workload Identity Federation</li>
                <li>Implementar Organization Policies</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="border-t pt-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Referencias</h2>
          <div className="border-l-4 border-blue-600 pl-4">
            <ul className="space-y-3">
              <li>
                <a href="https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html" className="flex items-center text-blue-600 hover:underline">
                  <FiExternalLink className="mr-2" /> AWS IAM Best Practices
                </a>
              </li>
              <li>
                <a href="https://cloud.google.com/iam/docs/best-practices" className="flex items-center text-blue-600 hover:underline">
                  <FiExternalLink className="mr-2" /> GCP IAM Best Practices
                </a>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </ArticleLayout>
  );
}
