import ArticleLayout from '@/components/wiki/ArticleLayout';
import { FiExternalLink } from 'react-icons/fi';

export default function MFAPage() {
  return (
    <ArticleLayout 
      title="Autenticación Multifactor (MFA)"
      description="Mecanismos de verificación en múltiples factores"
      backUrl="/recursos/wiki/identidad"
    >
      <div className="space-y-10 text-gray-800">
        <section className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Factores de Autenticación</h2>
          <div className="prose max-w-none">
            <ul className="list-disc pl-6 space-y-2 mb-4 text-gray-700">
              <li><strong>Algo que sabes:</strong> Contraseña, PIN</li>
              <li><strong>Algo que tienes:</strong> Token, smartphone</li>
              <li><strong>Algo que eres:</strong> Biometría</li>
              <li><strong>Algo que haces:</strong> Patrones de comportamiento</li>
            </ul>
          </div>
        </section>

        <section className="bg-blue-50 p-6 rounded-lg border border-blue-200">
          <h2 className="text-2xl font-bold mb-4 text-blue-800">Tecnologías MFA</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white p-3 rounded shadow">
              <h3 className="font-semibold text-gray-900">Basados en Tiempo</h3>
              <ul className="list-disc pl-5 mt-2 text-sm text-gray-700">
                <li>TOTP (Google Authenticator)</li>
                <li>SMS/Email OTP</li>
                <li>Push Notifications</li>
              </ul>
            </div>
            <div className="bg-white p-3 rounded shadow">
              <h3 className="font-semibold text-gray-900">Basados en Hardware</h3>
              <ul className="list-disc pl-5 mt-2 text-sm text-gray-700">
                <li>YubiKey</li>
                <li>Smart Cards</li>
                <li>FIDO2 Security Keys</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="border-t pt-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Referencias</h2>
          <div className="border-l-4 border-blue-600 pl-4">
            <ul className="space-y-3">
              <li>
                <a href="https://www.nist.gov/itl/tig/projects/special-publication-800-63" className="flex items-center text-blue-600 hover:underline">
                  <FiExternalLink className="mr-2" /> NIST SP 800-63 (Digital Identity Guidelines)
                </a>
              </li>
              <li>
                <a href="https://fidoalliance.org/" className="flex items-center text-blue-600 hover:underline">
                  <FiExternalLink className="mr-2" /> FIDO Alliance Standards
                </a>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </ArticleLayout>
  );
}
