import ArticleLayout from '@/components/wiki/ArticleLayout';
import { FiExternalLink } from 'react-icons/fi';

export default function PKIPage() {
  return (
    <ArticleLayout 
      title="PKI y Certificados"
      description="Infraestructura de Clave Pública para autenticación y cifrado en redes"
      backUrl="/recursos/wiki/criptografia"
    >
      <div className="space-y-10 text-gray-800">
        <section className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h2 className="text-2xl font-bold mb-4">Componentes Clave</h2>
          <div className="prose max-w-none">
            <p className="mb-4">
              La PKI (Public Key Infrastructure) proporciona un marco para gestionar claves digitales y certificados.
            </p>
            <div className="bg-purple-50 p-4 rounded border-l-4 border-purple-500 mb-4">
              <p className="text-sm">
                <strong>Elementos esenciales:</strong> Autoridades Certificadoras (CA), Registros (RA), CRL/OCSP y repositorios.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-blue-50 p-6 rounded-lg border border-blue-200">
          <h2 className="text-2xl font-bold mb-4 text-blue-800">Tipos de Certificados</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="font-bold text-lg mb-3">Por Propósito</h3>
              <ul className="list-disc pl-6 space-y-2 text-sm">
                <li><strong>SSL/TLS:</strong> Autenticación de servidores web</li>
                <li><strong>Code Signing:</strong> Firma de software</li>
                <li><strong>Email S/MIME:</strong> Cifrado de correo</li>
                <li><strong>Client Auth:</strong> Autenticación de usuarios</li>
              </ul>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="font-bold text-lg mb-3">Por Validación</h3>
              <ul className="list-disc pl-6 space-y-2 text-sm">
                <li><strong>DV:</strong> Validación de dominio</li>
                <li><strong>OV:</strong> Validación organizacional</li>
                <li><strong>EV:</strong> Validación extendida</li>
                <li><strong>Wildcard:</strong> Para subdominios</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h2 className="text-2xl font-bold mb-4">Revocación de Certificados</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-3">CRL (Certificate Revocation Lists)</h3>
              <ul className="list-disc pl-5 space-y-2 text-sm">
                <li>Listas periódicamente actualizadas</li>
                <li>Publicadas por la CA</li>
                <li>Problemas de escalabilidad</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3">OCSP (Online Certificate Status Protocol)</h3>
              <ul className="list-disc pl-5 space-y-2 text-sm">
                <li>Consulta en tiempo real</li>
                <li>OCSP Stapling mejora privacidad</li>
                <li>Dependencia de servidores OCSP</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="border-t pt-6">
          <h2 className="text-2xl font-bold mb-4">Referencias</h2>
          <div className="border-l-4 border-blue-600 pl-4">
            <h3 className="font-semibold mb-2">Estándares</h3>
            <ul className="space-y-3">
              <li>
                <a href="https://tools.ietf.org/html/rfc5280" className="flex items-center text-blue-700 hover:text-blue-900">
                  <FiExternalLink className="mr-2" /> RFC 5280 (PKIX)
                </a>
              </li>
              <li>
                <a href="https://cabforum.org/baseline-requirements/" className="flex items-center text-blue-700 hover:text-blue-900">
                  <FiExternalLink className="mr-2" /> CA/Browser Forum Baseline
                </a>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </ArticleLayout>
  );
}
