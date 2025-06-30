import ArticleLayout from '@/components/wiki/ArticleLayout';
import { FiExternalLink } from 'react-icons/fi';

export default function RadiusPage() {
  return (
    <ArticleLayout 
      title="RADIUS"
      description="Protocolo de autenticación, autorización y accounting (AAA) para acceso a redes"
      backUrl="/recursos/wiki/criptografia"
    >
      <div className="space-y-10 text-gray-800">
        <section className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h2 className="text-2xl font-bold mb-4">Componentes Clave</h2>
          <div className="prose max-w-none">
            <p className="mb-4">
              RADIUS utiliza una arquitectura cliente-servidor con tres elementos principales:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li><strong>NAS (Network Access Server):</strong> Punto de acceso que solicita autenticación</li>
              <li><strong>RADIUS Server:</strong> Verifica credenciales y aplica políticas</li>
              <li><strong>User Database:</strong> Almacena información de usuarios</li>
            </ul>
          </div>
        </section>

        <section className="bg-blue-50 p-6 rounded-lg border border-blue-200">
          <h2 className="text-2xl font-bold mb-4 text-blue-800">Flujo de Autenticación</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="font-bold text-lg mb-3">1. Solicitud de Acceso</h3>
              <ol className="list-decimal pl-5 space-y-1 text-sm">
                <li>Usuario se conecta al NAS</li>
                <li>NAS envía Access-Request al servidor RADIUS</li>
                <li>Incluye credenciales (hash de contraseña)</li>
              </ol>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="font-bold text-lg mb-3">2. Respuesta del Servidor</h3>
              <ol className="list-decimal pl-5 space-y-1 text-sm">
                <li>Servidor verifica contra la base de datos</li>
                <li>Responde con Access-Accept/Reject</li>
                <li>Puede incluir atributos de autorización</li>
              </ol>
            </div>
          </div>
        </section>

        <section className="border-t pt-6">
          <h2 className="text-2xl font-bold mb-4">Referencias</h2>
          <div className="border-l-4 border-blue-600 pl-4">
            <h3 className="font-semibold mb-2">RFCs</h3>
            <ul className="space-y-3">
              <li>
                <a href="https://tools.ietf.org/html/rfc2865" className="flex items-center text-blue-700 hover:text-blue-900">
                  <FiExternalLink className="mr-2" /> RFC 2865 (RADIUS)
                </a>
              </li>
              <li>
                <a href="https://tools.ietf.org/html/rfc2866" className="flex items-center text-blue-700 hover:text-blue-900">
                  <FiExternalLink className="mr-2" /> RFC 2866 (RADIUS Accounting)
                </a>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </ArticleLayout>
  );
}
