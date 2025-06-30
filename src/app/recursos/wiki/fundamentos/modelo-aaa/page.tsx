import ArticleLayout from '@/components/wiki/ArticleLayout';
import { FiExternalLink } from 'react-icons/fi';

export default function ModeloAAAPage() {
  return (
    <ArticleLayout 
      title="Modelo AAA (Autenticación, Autorización, Auditoría)" 
      description="Marco fundamental para la gestión de accesos y seguridad de sistemas"
      backUrl="/recursos/wiki/fundamentos"
    >
      <div className="space-y-8 text-gray-800">
        <section>
          <h2 className="text-2xl font-bold mb-4">Definición</h2>
          <p className="mb-4">
            El modelo AAA es un marco de seguridad que establece tres procesos clave para el control de accesos:
            <strong>Autenticación</strong>, <strong>Autorización</strong> y <strong>Auditoría</strong>.
          </p>
        </section>

        <section className="bg-gray-100 p-6 rounded-lg border-l-4 border-blue-700">
          <h3 className="text-xl font-semibold mb-4">Componentes Principales</h3>
          
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <div className="bg-white p-4 rounded shadow">
              <h4 className="font-bold text-lg mb-2 text-blue-700">1. Autenticación</h4>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Verificación de identidad</li>
                <li>Métodos: Contraseñas, MFA, Certificados</li>
                <li>Protocolos: OAuth, SAML, OpenID</li>
              </ul>
            </div>
            
            <div className="bg-white p-4 rounded shadow">
              <h4 className="font-bold text-lg mb-2 text-blue-700">2. Autorización</h4>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Determina permisos post-autenticación</li>
                <li>Modelos: RBAC, ABAC, ACL</li>
                <li>Principio de mínimo privilegio</li>
              </ul>
            </div>
            
            <div className="bg-white p-4 rounded shadow">
              <h4 className="font-bold text-lg mb-2 text-blue-700">3. Auditoría</h4>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Registro de actividades</li>
                <li>Traza de eventos críticos</li>
                <li>Cumplimiento normativo</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h3 className="text-xl font-semibold mb-4">Implementación Práctica</h3>
          
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <h4 className="font-medium mb-3 text-gray-900">En Sistemas Corporativos:</h4>
              <ul className="list-disc pl-5 space-y-2">
                <li>Active Directory/LDAP para autenticación centralizada</li>
                <li>PAM para gestión de accesos privilegiados</li>
                <li>SIEM para consolidación de logs</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-3 text-gray-900">En Aplicaciones Web:</h4>
              <ul className="list-disc pl-5 space-y-2">
                <li>JWT para autorización stateless</li>
                <li>OAuth 2.0 para delegación de accesos</li>
                <li>Logging estructurado para auditoría</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="border-t pt-6">
          <h3 className="text-xl font-semibold mb-3">Estándares Relacionados</h3>
          
          <div className="space-y-4">
            <div className="flex items-start">
              <FiExternalLink className="mt-1 mr-2 flex-shrink-0 text-blue-700" />
              <div>
                <a 
                  href="https://csrc.nist.gov/projects/role-based-access-control" 
                  className="text-blue-700 hover:text-blue-900 font-medium block"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  NIST Special Publication 800-53
                </a>
                <p className="text-sm text-gray-600">Controles de seguridad para sistemas federales (AC familia)</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <FiExternalLink className="mt-1 mr-2 flex-shrink-0 text-blue-700" />
              <div>
                <a 
                  href="https://www.iso.org/standard/54534.html" 
                  className="text-blue-700 hover:text-blue-900 font-medium block"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  ISO/IEC 27001:2022
                </a>
                <p className="text-sm text-gray-600">A.9 Control de acceso - Requisitos AAA</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </ArticleLayout>
  );
}
