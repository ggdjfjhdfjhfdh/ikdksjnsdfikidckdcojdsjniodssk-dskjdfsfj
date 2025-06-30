import ArticleLayout from '@/components/wiki/ArticleLayout';
import { FiExternalLink } from 'react-icons/fi';

export default function BiometriaPage() {
  return (
    <ArticleLayout 
      title="Autenticación Biométrica"
      description="Sistemas de verificación basados en características físicas o conductuales únicas"
      backUrl="/recursos/wiki/criptografia"
    >
      <div className="space-y-10 text-gray-800">
        <section className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">¿Qué es la Biometría?</h2>
          <div className="prose max-w-none">
            <p className="mb-4 text-gray-700">
              La autenticación biométrica utiliza características fisiológicas o de comportamiento para identificar individuos de forma única:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4 text-gray-700">
              <li><strong>Fisiológicas:</strong> Huellas dactilares, iris, rostro</li>
              <li><strong>Conductuales:</strong> Voz, firma, tecleo</li>
              <li><strong>Biológicas:</strong> ADN, venas, geometría de la mano</li>
            </ul>
            
            <div className="bg-blue-50 p-4 rounded border-l-4 border-blue-500">
              <p className="text-sm text-gray-700">
                <strong>Dato clave:</strong> Los sistemas biométricos modernos combinan múltiples factores para mayor seguridad (ej: rostro + voz).
              </p>
            </div>
          </div>
        </section>

        <section className="bg-blue-50 p-6 rounded-lg border border-blue-200">
          <h2 className="text-2xl font-bold mb-4 text-blue-800">Tipos de Biometría</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white p-3 rounded shadow text-center">
              <p className="font-semibold text-sm text-gray-900">Huella Dactilar</p>
              <p className="text-xs text-gray-600">Patrones de crestas y valles</p>
            </div>
            <div className="bg-white p-3 rounded shadow text-center">
              <p className="font-semibold text-sm text-gray-900">Reconocimiento Facial</p>
              <p className="text-xs text-gray-600">Análisis de 80+ puntos nodales</p>
            </div>
            <div className="bg-white p-3 rounded shadow text-center">
              <p className="font-semibold text-sm text-gray-900">Iris/Escaneo Retinal</p>
              <p className="text-xs text-gray-600">Patrones únicos del ojo</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Consideraciones de Seguridad</h2>
          
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="font-semibold mb-3 text-gray-900">Ventajas</h3>
              <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
                <li>No requiere recordar contraseñas</li>
                <li>Difícil de transferir o robar</li>
                <li>Alta precisión en sistemas modernos</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-3 text-gray-900">Riesgos</h3>
              <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
                <li>Falsos positivos/negativos</li>
                <li>Preocupaciones de privacidad</li>
                <li>Dificultad para revocar credenciales</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="border-t pt-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Estándares y Normativas</h2>
          
          <div className="bg-gray-100 p-4 rounded-lg mb-6">
            <h3 className="font-semibold mb-3 text-gray-900">Regulaciones Clave</h3>
            <ol className="list-decimal pl-5 space-y-2 text-sm text-gray-700">
              <li>ISO/IEC 19794 (Formatos de datos biométricos)</li>
              <li>GDPR para protección de datos en UE</li>
              <li>NIST SP 800-76 (Estándares USA)</li>
            </ol>
          </div>
        </section>

        <section className="border-t pt-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Referencias</h2>
          
          <div className="border-l-4 border-blue-600 pl-4">
            <h3 className="font-semibold mb-2 text-gray-900">Fuentes Técnicas</h3>
            <ul className="space-y-3">
              <li>
                <a href="https://www.iso.org/standard/50839.html" className="flex items-center text-blue-600 hover:underline">
                  <FiExternalLink className="mr-2" /> ISO/IEC 19794-2
                </a>
              </li>
              <li>
                <a href="https://www.nist.gov/programs-projects/biometric-standards-program" className="flex items-center text-blue-600 hover:underline">
                  <FiExternalLink className="mr-2" /> NIST Biometric Standards
                </a>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </ArticleLayout>
  );
}
