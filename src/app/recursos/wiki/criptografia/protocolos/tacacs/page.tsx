import ArticleLayout from '@/components/wiki/ArticleLayout';
import { FiExternalLink } from 'react-icons/fi';

export default function TacacsPage() {
  return (
    <ArticleLayout 
      title="TACACS+"
      description="Protocolo AAA para administración de dispositivos de red"
      backUrl="/recursos/wiki/criptografia/protocolos"
    >
      <div className="space-y-10 text-gray-800">
        <section className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h2 className="text-2xl font-bold mb-4">Diferencias con RADIUS</h2>
          <div className="prose max-w-none">
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li><strong>Cifrado completo:</strong> Todo el paquete cifrado (no solo contraseñas)</li>
              <li><strong>Separación AAA:</strong> Autenticación, Autorización y Accounting son procesos distintos</li>
              <li><strong>Uso principal:</strong> Administración de dispositivos de red (no acceso de usuarios)</li>
            </ul>
          </div>
        </section>

        <section className="border-t pt-6">
          <h2 className="text-2xl font-bold mb-4">Referencias</h2>
          <div className="border-l-4 border-blue-600 pl-4">
            <ul className="space-y-3">
              <li>
                <a href="https://tools.ietf.org/html/draft-ietf-opsawg-tacacs-15" className="flex items-center text-blue-700 hover:text-blue-900">
                  <FiExternalLink className="mr-2" /> Draft IETF TACACS+
                </a>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </ArticleLayout>
  );
}
