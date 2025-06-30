import ArticleLayout from '@/components/wiki/ArticleLayout';
import { FiExternalLink } from 'react-icons/fi';

export default function MITMPage() {
  return (
    <ArticleLayout 
      title="Ataques Man-in-the-Middle (MitM)" 
      description="Interceptación y manipulación de comunicaciones entre dos partes"
      backUrl="/recursos/wiki/amenazas"
    >
      <div className="space-y-10 text-gray-800">
        <section className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h2 className="text-2xl font-bold mb-4">¿Qué es un ataque MitM?</h2>
          <div className="prose max-w-none">
            <p className="mb-4">
              Un ataque Man-in-the-Middle:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Intercepta comunicaciones entre dos partes legítimas</li>
              <li>Puede leer, modificar o inyectar datos</li>
              <li>Es especialmente peligroso en redes no cifradas</li>
              <li>Difícil de detectar para las víctimas</li>
            </ul>
            
            <div className="bg-yellow-50 p-4 rounded border-l-4 border-yellow-500">
              <p className="text-sm">
                <strong>Característica clave:</strong> El atacante se posiciona de forma transparente en medio del canal de comunicación.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-blue-50 p-6 rounded-lg border border-blue-200">
          <h2 className="text-2xl font-bold mb-4 text-blue-800">Técnicas Comunes</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white p-3 rounded shadow text-center">
              <p className="font-semibold text-sm">ARP Spoofing</p>
              <p className="text-xs">Envenenamiento de tablas ARP en redes locales</p>
            </div>
            <div className="bg-white p-3 rounded shadow text-center">
              <p className="font-semibold text-sm">DNS Spoofing</p>
              <p className="text-xs">Redirección a sitios falsos mediante DNS comprometidos</p>
            </div>
            <div className="bg-white p-3 rounded shadow text-center">
              <p className="font-semibold text-sm">SSL Stripping</p>
              <p className="text-xs">Degradación de HTTPS a HTTP</p>
            </div>
            <div className="bg-white p-3 rounded shadow text-center">
              <p className="font-semibold text-sm">WiFi Evil Twin</p>
              <p className="text-xs">Puntos de acceso falsos con nombres legítimos</p>
            </div>
            <div className="bg-white p-3 rounded shadow text-center">
              <p className="font-semibold text-sm">Session Hijacking</p>
              <p className="text-xs">Robo de cookies/tokens de sesión</p>
            </div>
            <div className="bg-white p-3 rounded shadow text-center">
              <p className="font-semibold text-sm">IMSI Catchers</p>
              <p className="text-xs">Interceptación de comunicaciones móviles</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Escenarios y Estadísticas</h2>
          
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="font-semibold mb-3">Casos de Uso</h3>
              <ul className="list-disc pl-5 space-y-2 text-sm">
                <li>Robo de credenciales bancarias</li>
                <li>Interceptación de comunicaciones corporativas</li>
                <li>Manipulación de transacciones financieras</li>
                <li>Espionaje industrial</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-3">Datos Relevantes</h3>
              <ul className="list-disc pl-5 space-y-2 text-sm">
                <li>35% de ataques a redes WiFi públicas son MitM</li>
                <li>+60% de apps móviles vulnerables a SSL stripping</li>
                <li>Detectabilidad promedio: 156 días</li>
                <li>Impacto financiero promedio: $390k por incidente</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="border-t pt-6">
          <h2 className="text-2xl font-bold mb-4">Protecciones</h2>
          
          <div className="bg-gray-100 p-4 rounded-lg mb-6">
            <h3 className="font-semibold mb-3">Estrategias Defensivas</h3>
            <ol className="list-decimal pl-5 space-y-2">
              <li><strong>Cifrado fuerte:</strong> Uso de TLS 1.3 con certificados válidos</li>
              <li><strong>Autenticación mutua:</strong> Certificados en ambos extremos</li>
              <li><strong>HSTS:</strong> HTTP Strict Transport Security</li>
              <li><strong>VPNs:</strong> Para conexiones en redes no confiables</li>
              <li><strong>Monitoreo:</strong> Detección de anomalías en comunicaciones</li>
            </ol>
          </div>
        </section>

        <section className="border-t pt-6">
          <h2 className="text-2xl font-bold mb-4">Referencias</h2>
          
          <div className="border-l-4 border-blue-600 pl-4">
            <h3 className="font-semibold mb-2">Estándares y Guías</h3>
            <ul className="space-y-3">
              <li>
                <a href="https://www.ncsc.gov.uk/guidance/mitigating-man-middle-attacks" className="flex items-center text-blue-700 hover:text-blue-900">
                  <FiExternalLink className="mr-2" /> NCSC MitM Guidance
                </a>
              </li>
              <li>
                <a href="https://owasp.org/www-community/attacks/Man-in-the-middle_attack" className="flex items-center text-blue-700 hover:text-blue-900">
                  <FiExternalLink className="mr-2" /> OWASP MitM Resources
                </a>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </ArticleLayout>
  );
}