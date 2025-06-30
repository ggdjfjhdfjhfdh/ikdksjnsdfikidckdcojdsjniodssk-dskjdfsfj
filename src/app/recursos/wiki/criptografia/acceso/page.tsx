import ArticleLayout from '@/components/wiki/ArticleLayout';
import { FiExternalLink } from 'react-icons/fi';

export default function ModelosAccesoPage() {
  return (
    <ArticleLayout 
      title="Modelos de Control de Acceso"
      description="Sistemas para gestionar y restringir acceso a recursos informáticos"
      backUrl="/recursos/wiki/criptografia"
    >
      <div className="space-y-10 text-gray-800">
        <section className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">¿Qué son los Modelos de Acceso?</h2>
          <div className="prose max-w-none">
            <p className="mb-4 text-gray-700">
              Los modelos de control de acceso definen políticas para regular qué usuarios pueden acceder a qué recursos bajo qué condiciones:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4 text-gray-700">
              <li><strong className="text-gray-900">RBAC:</strong> Basado en roles organizacionales</li>
              <li><strong className="text-gray-900">ABAC:</strong> Basado en atributos dinámicos</li>
              <li><strong className="text-gray-900">MAC:</strong> Control obligatorio centralizado</li>
              <li><strong className="text-gray-900">DAC:</strong> Control discrecional por dueños</li>
            </ul>
            
            <div className="bg-blue-50 p-4 rounded border-l-4 border-blue-500">
              <p className="text-sm text-gray-700">
                <strong>Dato clave:</strong> Los modelos pueden combinarse (ej: RBAC + ABAC) para mayor flexibilidad y seguridad.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-blue-50 p-6 rounded-lg border border-blue-200">
          <h2 className="text-2xl font-bold mb-4 text-blue-800">Comparativa de Modelos</h2>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="bg-white p-3 rounded shadow text-center">
              <p className="font-semibold text-sm text-gray-900">RBAC</p>
              <p className="text-xs text-gray-600">Roles predefinidos</p>
            </div>
            <div className="bg-white p-3 rounded shadow text-center">
              <p className="font-semibold text-sm text-gray-900">ABAC</p>
              <p className="text-xs text-gray-600">Atributos dinámicos</p>
            </div>
            <div className="bg-white p-3 rounded shadow text-center">
              <p className="font-semibold text-sm text-gray-900">MAC</p>
              <p className="text-xs text-gray-600">Jerarquías rígidas</p>
            </div>
            <div className="bg-white p-3 rounded shadow text-center">
              <p className="font-semibold text-sm text-gray-900">DAC</p>
              <p className="text-xs text-gray-600">Dueño controla</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Implementaciones Prácticas</h2>
          
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="font-semibold mb-3 text-gray-900">Casos de Uso</h3>
              <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
                <li><strong>RBAC:</strong> Sistemas empresariales con estructura jerárquica clara</li>
                <li><strong>ABAC:</strong> Sistemas cloud con múltiples atributos contextuales</li>
                <li><strong>MAC:</strong> Entornos gubernamentales/militares</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-3 text-gray-900">Estándares Relacionados</h3>
              <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
                <li>XACML para ABAC</li>
                <li>SAML para federación</li>
                <li>LDAP para directorios</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="border-t pt-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Recomendaciones</h2>
          
          <div className="bg-gray-100 p-4 rounded-lg mb-6">
            <h3 className="font-semibold mb-3 text-gray-900">Selección de Modelo</h3>
            <ol className="list-decimal pl-5 space-y-2 text-sm text-gray-700">
              <li>Evaluar complejidad organizacional</li>
              <li>Considerar requisitos regulatorios</li>
              <li>Analizar escalabilidad necesaria</li>
              <li>Planear mantenimiento a largo plazo</li>
            </ol>
          </div>
        </section>

        <section className="border-t pt-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Referencias</h2>
          
          <div className="border-l-4 border-blue-600 pl-4">
            <h3 className="font-semibold mb-2 text-gray-900">Estándares Oficiales</h3>
            <ul className="space-y-3">
              <li>
                <a href="https://csrc.nist.gov/projects/role-based-access-control" className="flex items-center text-blue-600 hover:underline">
                  <FiExternalLink className="mr-2" /> NIST RBAC Standard
                </a>
              </li>
              <li>
                <a href="https://docs.oasis-open.org/xacml/3.0/xacml-3.0-core-spec-os-en.html" className="flex items-center text-blue-600 hover:underline">
                  <FiExternalLink className="mr-2" /> XACML 3.0 Specification
                </a>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </ArticleLayout>
  );
}
