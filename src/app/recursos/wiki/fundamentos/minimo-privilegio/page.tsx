import ArticleLayout from '@/components/wiki/ArticleLayout';
import { FiExternalLink } from 'react-icons/fi';
import { ResponsiveTable, TableCell } from '@/components/wiki/ResponsiveTable';

export default function MinimoPrivilegioPage() {
  return (
    <ArticleLayout 
      title="Principio de Mínimo Privilegio" 
      description="Conceder solo los accesos necesarios para realizar tareas específicas"
      backUrl="/recursos/wiki/fundamentos"
    >
      <div className="space-y-8 text-gray-800 px-4 sm:px-6">
        <section>
          <h2 className="text-xl sm:text-2xl font-bold mb-4">Definición Fundamental</h2>
          <p className="mb-4 text-sm sm:text-base">
            Estrategia de seguridad que limita estrictamente los permisos de usuarios, procesos y sistemas
            al conjunto mínimo necesario para realizar sus funciones legítimas, durante el menor tiempo posible.
          </p>
        </section>

        <section className="bg-gray-100 p-6 rounded-lg border-l-4 border-blue-700">
          <h3 className="text-lg sm:text-xl font-semibold mb-4">Patrones de Implementación</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
            <div>
              <h4 className="font-medium mb-3 text-gray-900 text-base">Modelos de Acceso:</h4>
              <ul className="list-disc pl-5 space-y-2 text-sm sm:text-base">
                <li><strong>RBAC:</strong> Roles basados en funciones con permisos predefinidos</li>
                <li><strong>ABAC:</strong> Atributos dinámicos para decisiones granulares</li>
                <li><strong>JIT:</strong> Acceso Just-in-Time con aprobación y temporalidad</li>
                <li><strong>PAM:</strong> Gestión de accesos privilegiados con auditoría</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-3 text-gray-900 text-base">Estrategias Clave:</h4>
              <ul className="list-disc pl-5 space-y-2 text-sm sm:text-base">
                <li>Revisión trimestral de permisos (recertificación)</li>
                <li>Separación clara de deberes (SoD)</li>
                <li>Elevación temporal de privilegios</li>
                <li>Cuentas privilegiadas dedicadas (no compartidas)</li>
              </ul>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded border border-gray-200">
            <h4 className="font-medium mb-2 text-base">Ejemplo en Entornos Cloud:</h4>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li><strong>AWS:</strong> Políticas IAM con permisos mínimos usando service control policies</li>
              <li><strong>Azure:</strong> Privileged Identity Management con activación JIT</li>
              <li><strong>K8s:</strong> RBAC con namespaces y NetworkPolicies restrictivas</li>
            </ul>
          </div>
        </section>

        <section>
          <h3 className="text-lg sm:text-xl font-semibold mb-4">Estándares y Marcos</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-medium mb-2 text-base">NIST RBAC</h4>
              <p className="text-sm mb-2">
                Modelo de referencia para implementar control de acceso basado en roles:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-sm mb-3">
                <li>Roles jerárquicos</li>
                <li>Asignación mínima de permisos</li>
                <li>Restricción de operaciones sensibles</li>
              </ul>
              <a 
                href="https://csrc.nist.gov/projects/role-based-access-control" 
                className="flex items-center text-blue-700 hover:text-blue-900 text-sm font-medium"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FiExternalLink className="mr-1" /> Guía NIST RBAC
              </a>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-medium mb-2 text-base">ISO 27001</h4>
              <p className="text-sm mb-2">
                Requisitos para gestión de accesos:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-sm mb-3">
                <li>A.9.1 - Control de acceso a la información</li>
                <li>A.9.2 - Gestión de derechos de acceso</li>
                <li>A.9.4 - Restricción de acceso físico y lógico</li>
              </ul>
              <a 
                href="https://www.iso.org/standard/54534.html" 
                className="flex items-center text-blue-700 hover:text-blue-900 text-sm font-medium"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FiExternalLink className="mr-1" /> ISO 27001
              </a>
            </div>
          </div>
        </section>

        <section className="border-t pt-6">
          <h3 className="text-lg sm:text-xl font-semibold mb-3">Métricas Clave</h3>
          <ResponsiveTable>
            <table className="min-w-full border border-gray-200">
              <thead>
                <tr>
                  <TableCell header>Ámbito</TableCell>
                  <TableCell header>KPI</TableCell>
                  <TableCell header>Objetivo</TableCell>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <TableCell>Usuarios</TableCell>
                  <TableCell>% cuentas con permisos mínimos</TableCell>
                  <TableCell>&gt;95%</TableCell>
                </tr>
                <tr>
                  <TableCell>Sistemas</TableCell>
                  <TableCell>% servicios sin privilegios root</TableCell>
                  <TableCell>100%</TableCell>
                </tr>
                <tr>
                  <TableCell>Cloud</TableCell>
                  <TableCell>% políticas IAM restrictivas</TableCell>
                  <TableCell>&gt;90%</TableCell>
                </tr>
              </tbody>
            </table>
          </ResponsiveTable>
        </section>
      </div>
    </ArticleLayout>
  );
}
