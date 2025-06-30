import ArticleLayout from '@/components/wiki/ArticleLayout';
import { FiExternalLink } from 'react-icons/fi';

export default function NatPatAclPage() {
  return (
    <ArticleLayout 
      title="NAT, PAT y ACL"
      description="Técnicas de traducción de direcciones y control de acceso en redes"
      backUrl="/recursos/wiki/redes"
    >
      <div className="space-y-10 text-gray-800">
        <section className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Conceptos Básicos</h2>
          <div className="prose max-w-none">
            <p className="mb-4 text-gray-700">
              Tecnologías fundamentales para gestión de tráfico y seguridad en redes:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4 text-gray-700">
              <li><strong>NAT (Network Address Translation):</strong> Traducción de direcciones IP privadas a públicas</li>
              <li><strong>PAT (Port Address Translation):</strong> Variante de NAT que usa puertos para múltiples mapeos</li>
              <li><strong>ACL (Access Control Lists):</strong> Reglas para permitir/denegar tráfico</li>
            </ul>
          </div>
        </section>

        <section className="bg-blue-50 p-6 rounded-lg border border-blue-200">
          <h2 className="text-2xl font-bold mb-4 text-blue-800">Tipos y Configuraciones</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white p-3 rounded shadow text-center">
              <p className="font-semibold text-sm text-gray-900">NAT Estático</p>
              <p className="text-xs text-gray-600">Mapeo 1:1 direcciones</p>
            </div>
            <div className="bg-white p-3 rounded shadow text-center">
              <p className="font-semibold text-sm text-gray-900">NAT Dinámico</p>
              <p className="text-xs text-gray-600">Pool de direcciones públicas</p>
            </div>
            <div className="bg-white p-3 rounded shadow text-center">
              <p className="font-semibold text-sm text-gray-900">PAT</p>
              <p className="text-xs text-gray-600">Múltiples privadas a 1 pública</p>
            </div>
          </div>
        </section>

        <section className="border-t pt-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Mejores Prácticas</h2>
          <div className="bg-gray-100 p-4 rounded-lg mb-6">
            <h3 className="font-semibold mb-3 text-gray-900">Seguridad con ACL</h3>
            <ol className="list-decimal pl-5 space-y-2 text-sm text-gray-700">
              <li>Implementar listas restrictivas (deny por defecto)</li>
              <li>Limitar acceso a interfaces administrativas</li>
              <li>Auditar y documentar cambios</li>
            </ol>
          </div>
        </section>

        <section className="border-t pt-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Referencias</h2>
          <div className="border-l-4 border-blue-600 pl-4">
            <ul className="space-y-3">
              <li>
                <a href="https://tools.ietf.org/html/rfc2663" className="flex items-center text-blue-600 hover:underline">
                  <FiExternalLink className="mr-2" /> RFC 2663 - NAT Terminology
                </a>
              </li>
              <li>
                <a href="https://www.cisco.com/c/en/us/support/docs/ip/access-lists/26448-ACLsamples.html" className="flex items-center text-blue-600 hover:underline">
                  <FiExternalLink className="mr-2" /> Cisco ACL Examples
                </a>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </ArticleLayout>
  );
}
