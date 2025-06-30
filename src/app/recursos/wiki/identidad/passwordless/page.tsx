import ArticleLayout from '@/components/wiki/ArticleLayout';
import { FiExternalLink } from 'react-icons/fi';

export default function PasswordlessPage() {
  return (
    <ArticleLayout 
      title="Passwordless & Passkeys"
      description="Autenticación sin contraseñas usando estándares FIDO"
      backUrl="/recursos/wiki/identidad"
    >
      <div className="space-y-10 text-gray-800">
        <section className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Conceptos Clave</h2>
          <div className="prose max-w-none">
            <ul className="list-disc pl-6 space-y-2 mb-4 text-gray-700">
              <li><strong>Passkeys:</strong> Credenciales basadas en estándares WebAuthn</li>
              <li><strong>FIDO2:</strong> Framework para autenticación sin contraseñas</li>
              <li><strong>Sincronización:</strong> Passkeys almacenadas en la nube</li>
              <li><strong>Multi-dispositivo:</strong> Uso en diferentes plataformas</li>
            </ul>
          </div>
        </section>

        <section className="bg-blue-50 p-6 rounded-lg border border-blue-200">
          <h2 className="text-2xl font-bold mb-4 text-blue-800">Implementaciones</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white p-3 rounded shadow">
              <h3 className="font-semibold text-gray-900">Plataformas</h3>
              <ul className="list-disc pl-5 mt-2 text-sm text-gray-700">
                <li>Apple iCloud Keychain</li>
                <li>Google Password Manager</li>
                <li>Microsoft Authenticator</li>
              </ul>
            </div>
            <div className="bg-white p-3 rounded shadow">
              <h3 className="font-semibold text-gray-900">Ventajas</h3>
              <ul className="list-disc pl-5 mt-2 text-sm text-gray-700">
                <li>Resistente a phishing</li>
                <li>Sin gestión de contraseñas</li>
                <li>Autenticación biométrica</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="border-t pt-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Referencias</h2>
          <div className="border-l-4 border-blue-600 pl-4">
            <ul className="space-y-3">
              <li>
                <a href="https://developers.google.com/identity/passkeys" className="flex items-center text-blue-600 hover:underline">
                  <FiExternalLink className="mr-2" /> Google Passkeys Documentation
                </a>
              </li>
              <li>
                <a href="https://fidoalliance.org/passkeys/" className="flex items-center text-blue-600 hover:underline">
                  <FiExternalLink className="mr-2" /> FIDO Alliance Passkeys
                </a>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </ArticleLayout>
  );
}
