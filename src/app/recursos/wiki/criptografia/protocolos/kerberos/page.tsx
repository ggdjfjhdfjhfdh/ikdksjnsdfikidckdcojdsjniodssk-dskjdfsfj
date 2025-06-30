import ArticleLayout from '@/components/wiki/ArticleLayout';
import { FiExternalLink } from 'react-icons/fi';

export default function KerberosPage() {
  return (
    <ArticleLayout 
      title="Kerberos"
      description="Protocolo de autenticación de red basado en tickets"
      backUrl="/recursos/wiki/criptografia"
    >
      <div className="space-y-10 text-gray-800">
        <section className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h2 className="text-2xl font-bold mb-4">Arquitectura</h2>
          <div className="prose max-w-none">
            <p className="mb-4">
              Kerberos utiliza un servidor central de autenticación (KDC) que contiene:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Authentication Server (AS)</li>
              <li>Ticket Granting Server (TGS)</li>
              <li>Base de datos de principios (usuarios/servicios)</li>
            </ul>
          </div>
        </section>

        <section className="bg-blue-50 p-6 rounded-lg border border-blue-200">
          <h2 className="text-2xl font-bold mb-4 text-blue-800">Flujo de Autenticación</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="font-bold text-lg mb-3">1. Autenticación Inicial</h3>
              <ol className="list-decimal pl-5 space-y-1 text-sm">
                <li>Cliente solicita TGT al AS</li>
                <li>AS verifica credenciales</li>
                <li>Envía TGT cifrado con clave del TGS</li>
              </ol>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="font-bold text-lg mb-3">2. Obtención de Service Ticket</h3>
              <ol className="list-decimal pl-5 space-y-1 text-sm">
                <li>Cliente envía TGT al TGS</li>
                <li>TGS verifica y emite Service Ticket</li>
                <li>Ticket cifrado con clave del servicio</li>
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
                <a href="https://tools.ietf.org/html/rfc4120" className="flex items-center text-blue-700 hover:text-blue-900">
                  <FiExternalLink className="mr-2" /> RFC 4120 (Kerberos v5)
                </a>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </ArticleLayout>
  );
}
