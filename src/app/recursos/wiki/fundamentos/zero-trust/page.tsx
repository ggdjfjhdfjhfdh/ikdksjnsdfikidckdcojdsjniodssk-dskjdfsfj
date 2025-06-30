import ArticleLayout from '@/components/wiki/ArticleLayout';
import { FiExternalLink, FiBookOpen, FiBarChart2, FiShield, FiAlertTriangle } from 'react-icons/fi';

export default function ZeroTrustPage() {
  return (
    <ArticleLayout 
      title="Zero Trust Architecture (ZTA)" 
      description="Modelo de seguridad 'Never Trust, Always Verify' según NIST SP 800-207"
      backUrl="/recursos/wiki/fundamentos"
      fullWidth
    >
      <div className="w-full px-4">
        <div className="max-w-6xl mx-auto prose max-w-none text-gray-800">
          {/* Sección Conceptual Ampliada */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold border-b border-gray-300 pb-2 text-gray-900">¿Qué es Zero Trust?</h2>
            
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
              <p className="font-medium text-blue-900">
                <strong>Definición técnica:</strong> Marco de seguridad que elimina la confianza implícita y requiere autenticación continua, 
                autorización y validación de configuración de seguridad para cada interacción.
              </p>
            </div>
            
            <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-900">Principios Fundamentales</h3>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm">
                <h4 className="font-semibold flex items-center gap-2 text-gray-900">
                  <FiAlertTriangle className="text-yellow-500" /> 1. Verificar Explícitamente
                </h4>
                <p className="mt-2 text-gray-700">
                  Cada acceso se autentica y autoriza usando toda la información disponible (identidad, ubicación, 
                  estado del dispositivo, etc.) antes de conceder permisos.
                </p>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm">
                <h4 className="font-semibold flex items-center gap-2 text-gray-900">
                  <FiAlertTriangle className="text-yellow-500" /> 2. Acceso con Mínimos Privilegios
                </h4>
                <p className="mt-2 text-gray-700">
                  Los usuarios y dispositivos solo obtienen el acceso estrictamente necesario para su función, 
                  limitado en tiempo y alcance (Just-In-Time, Just-Enough-Access).
                </p>
              </div>
            </div>
            
            <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-900">¿Por qué es diferente?</h3>
            <div className="bg-gray-100 p-4 rounded-lg border border-gray-200 mb-6">
              <table className="min-w-full border border-gray-200">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border border-gray-300 p-3 text-left">Aspecto</th>
                    <th className="border border-gray-300 p-3 text-left">Modelo Tradicional</th>
                    <th className="border border-gray-300 p-3 text-left">Zero Trust</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white">
                    <td className="border border-gray-200 p-3">Ubicación</td>
                    <td className="border border-gray-200 p-3">Confía en redes internas</td>
                    <td className="border border-gray-200 p-3">Trata todo acceso como no confiable</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-200 p-3">Autenticación</td>
                    <td className="border border-gray-200 p-3">Una vez al inicio</td>
                    <td className="border border-gray-200 p-3">Continua y contextual</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="border border-gray-200 p-3">Segmentación</td>
                    <td className="border border-gray-200 p-3">Perímetro de red</td>
                    <td className="border border-gray-200 p-3">Microsegmentación granular</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-900">Metáfora de Seguridad</h3>
            <div className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm">
              <p className="text-gray-700">
                <strong>Castillo y Foso vs. Embajada Moderna:</strong>
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-2 text-gray-700">
                <li><strong>Modelo antiguo:</strong> Muros gruesos (firewalls) protegen todo el castillo (red interna)</li>
                <li><strong>Zero Trust:</strong> Como una embajada moderna: múltiples puntos de control, verificaciones continuas, 
                  y áreas restringidas incluso dentro del edificio</li>
                <li>Incluso el embajador (CEO) debe mostrar credenciales en cada puerta</li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold border-b border-gray-300 pb-2 text-gray-900">Definición y Contexto Histórico</h2>
            <p className="text-lg">
              El concepto Zero Trust fue formalizado por Forrester Research en 2010 (John Kindervag) y adoptado por NIST en 2020. 
              Surge como respuesta al fracaso del modelo de "castillo y foso" en entornos cloud y móviles.
            </p>
            
            <div className="bg-blue-100 p-4 rounded-lg my-4 border border-blue-200">
              <h3 className="font-semibold text-blue-900 flex items-center gap-2">
                <FiBookOpen className="text-blue-700" /> Documentación Oficial
              </h3>
              <ul className="mt-2 space-y-2">
                <li>
                  <a href="https://csrc.nist.gov/publications/detail/sp/800-207/final" 
                     className="text-blue-700 hover:underline flex items-center gap-1 font-medium">
                    <FiExternalLink /> NIST SP 800-207: Zero Trust Architecture (2020)
                  </a>
                </li>
                <li>
                  <a href="https://www.cisa.gov/sites/default/files/publications/CISA%20Zero%20Trust%20Maturity%20Model%20v2%20Final.pdf" 
                     className="text-blue-700 hover:underline flex items-center gap-1 font-medium">
                    <FiExternalLink /> CISA Zero Trust Maturity Model v2 (2023)
                  </a>
                </li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold border-b border-gray-300 pb-2 text-gray-900">Componentes Técnicos (NIST SP 800-207)</h2>
            
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
              <h3 className="font-semibold flex items-center gap-2 text-yellow-800">
                <FiShield /> Aviso Crítico
              </h3>
              <p className="text-yellow-800">
                La implementación completa requiere cambios organizacionales profundos, con un ROI promedio de 2-3 años según Gartner.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm">
                <h3 className="font-semibold mb-2 text-gray-900">1. Policy Engine (PEP)</h3>
                <p className="text-gray-700">
                  <strong>Implementaciones reales:</strong> 
                  <ul className="list-disc pl-5 mt-2 space-y-1">
                    <li>Google BeyondCorp Proxy</li>
                    <li>Microsoft Azure AD Conditional Access</li>
                    <li>Palo Alto Prisma Access</li>
                  </ul>
                </p>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm">
                <h3 className="font-semibold mb-2 text-gray-900">2. Identity Verification</h3>
                <p className="text-gray-700">
                  <strong>Estándares utilizados:</strong>
                  <ul className="list-disc pl-5 mt-2 space-y-1">
                    <li>FIDO2/WebAuthn (sin contraseñas)</li>
                    <li>NIST 800-63B (Niveles IAL/AAL)</li>
                    <li>OAuth 2.0 + OpenID Connect</li>
                  </ul>
                </p>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold border-b border-gray-300 pb-2 text-gray-900">Datos y Métricas Reales</h2>
            
            <div className="bg-gray-100 p-4 rounded-lg border border-gray-200 mb-6">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <FiBarChart2 /> Estadísticas Clave (2024)
              </h3>
              <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-200">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="border border-gray-300 p-3 text-left">Métrica</th>
                      <th className="border border-gray-300 p-3 text-left">Empresas con ZT</th>
                      <th className="border border-gray-300 p-3 text-left">Empresas tradicionales</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-white">
                      <td className="border border-gray-200 p-3">Tiempo medio de detección</td>
                      <td className="border border-gray-200 p-3">1.2 horas</td>
                      <td className="border border-gray-200 p-3">197 días</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-200 p-3">Coste medio por brecha</td>
                      <td className="border border-gray-200 p-3">$2.1M</td>
                      <td className="border border-gray-200 p-3">$4.5M</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-sm mt-2 text-gray-600">Fuente: IBM Cost of Data Breach Report 2024</p>
            </div>
            
            <h3 className="font-semibold mt-6 mb-3">Implementación por Sector</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm">
                <h4 className="font-semibold text-gray-900">Gobierno USA</h4>
                <p className="text-sm text-gray-700">
                  <strong>EO 14028 (2021):</strong> Requiere ZTA para todas las agencias federales antes de 2024
                </p>
              </div>
              <div className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm">
                <h4 className="font-semibold text-gray-900">Sector Salud</h4>
                <p className="text-sm text-gray-700">
                  <strong>HIPAA:</strong> Reducción del 72% en incidentes según HHS
                </p>
              </div>
              <div className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm">
                <h4 className="font-semibold text-gray-900">Financiero</h4>
                <p className="text-sm text-gray-700">
                  <strong>FFIEC:</strong> 89% de bancos con implementación parcial
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold border-b border-gray-300 pb-2 text-gray-900">Casos de Implementación</h2>
            
            <div className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm mb-6">
              <h3 className="font-semibold text-gray-900">Google BeyondCorp</h3>
              <p className="text-gray-700">
                <strong>Resultados:</strong> Eliminación completa de VPN corporativa (2011-2017)
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-700">
                <li>Reducción del 90% en incidentes de acceso no autorizado</li>
                <li>Integración con 150+ aplicaciones internas</li>
                <li>Modelo replicado en Cloud Identity Aware Proxy</li>
              </ul>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm">
              <h3 className="font-semibold text-gray-900">Departamento de Defensa USA</h3>
              <p className="text-gray-700">
                <strong>Presupuesto:</strong> $9.8B asignados para ZTA (2023-2027)
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-700">
                <li>7 pilares técnicos (identidad, dispositivos, etc.)</li>
                <li>91 actividades concretas en roadmap</li>
                <li>Primeros resultados: 60% reducción en superficie de ataque</li>
              </ul>
            </div>
          </section>
        </div>
      </div>
    </ArticleLayout>
  );
}
