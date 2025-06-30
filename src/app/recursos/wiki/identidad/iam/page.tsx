import ArticleLayout from '@/components/wiki/ArticleLayout';
import { FiExternalLink } from 'react-icons/fi';

export default function IAMPage() {
  return (
    <ArticleLayout 
      title="IAM (Gestión de Identidades y Accesos)"
      description="Sistemas centralizados para gestión de identidades y permisos"
      backUrl="/recursos/wiki/identidad"
    >
      <div className="space-y-10 text-gray-800">
        <section className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Principios Fundamentales</h2>
          <div className="prose max-w-none">
            <ul className="list-disc pl-6 space-y-2 mb-4 text-gray-700">
              <li><strong>Least Privilege:</strong> Mínimos permisos necesarios</li>
              <li><strong>Separation of Duties:</strong> División de responsabilidades</li>
              <li><strong>Centralized Management:</strong> Gestión unificada</li>
              <li><strong>Auditability:</strong> Registro completo de accesos</li>
            </ul>
          </div>
        </section>

        <section className="bg-blue-50 p-6 rounded-lg border border-blue-200">
          <h2 className="text-2xl font-bold mb-4 text-blue-800">Componentes Clave</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white p-3 rounded shadow">
              <h3 className="font-semibold text-gray-900">Identidades</h3>
              <ul className="list-disc pl-5 mt-2 text-sm text-gray-700">
                <li>Usuarios</li>
                <li>Grupos</li>
                <li>Roles</li>
                <li>Service Accounts</li>
              </ul>
            </div>
            <div className="bg-white p-3 rounded shadow">
              <h3 className="font-semibold text-gray-900">Controles</h3>
              <ul className="list-disc pl-5 mt-2 text-sm text-gray-700">
                <li>Políticas de acceso</li>
                <li>MFA</li>
                <li>Conditional Access</li>
                <li>Password Policies</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="border-t pt-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Referencias</h2>
          <div className="border-l-4 border-blue-600 pl-4">
            <ul className="space-y-3">
              <li>
                <a href="https://docs.aws.amazon.com/IAM/latest/UserGuide/introduction.html" className="flex items-center text-blue-600 hover:underline">
                  <FiExternalLink className="mr-2" /> AWS IAM Documentation
                </a>
              </li>
              <li>
                <a href="https://learn.microsoft.com/en-us/azure/active-directory/" className="flex items-center text-blue-600 hover:underline">
                  <FiExternalLink className="mr-2" /> Azure AD Documentation
                </a>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </ArticleLayout>
  );
}
