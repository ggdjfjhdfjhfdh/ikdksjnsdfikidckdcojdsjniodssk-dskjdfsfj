import ArticleLayout from '@/components/wiki/ArticleLayout';
import { ResponsiveTable, TableCell } from '@/components/wiki/ResponsiveTable';
import { 
  Shield, 
  AlertTriangle, 
  BookOpen, 
  BarChart3, 
  ExternalLink,
  Lock,
  Eye,
  Clock,
  Star,
  TrendingUp,
  CheckCircle,
  Users,
  Network,
  Building,
  Globe
} from 'lucide-react';

export default function ZeroTrustPage() {
  return (
    <ArticleLayout 
      title="Zero Trust Architecture (ZTA)" 
      description="Modelo de seguridad 'Never Trust, Always Verify' según NIST SP 800-207"
      backUrl="/recursos/wiki/fundamentos"
    >
      <div className="w-full px-4 sm:px-6">
        <div className="max-w-6xl mx-auto prose max-w-none text-gray-800">
          {/* Sección Conceptual Ampliada */}
          <section className="mb-8">
            <h2 className="text-xl sm:text-2xl font-semibold border-b border-gray-300 pb-2 text-gray-900">¿Qué es Zero Trust?</h2>
            
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
              <p className="font-medium text-blue-900 text-sm sm:text-base">
                <strong>Definición técnica:</strong> Marco de seguridad que elimina la confianza implícita y requiere autenticación continua, 
                autorización y validación de configuración de seguridad para cada interacción.
              </p>
            </div>
            
            <h3 className="text-lg sm:text-xl font-semibold mt-6 mb-3 text-gray-900">Principios Fundamentales</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
              <div className="relative bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-white" />
                  </div>
                  <h4 className="font-semibold text-gray-900 text-base">
                    1. Verificar Explícitamente
                  </h4>
                </div>
                <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                  Cada acceso se autentica y autoriza usando toda la información disponible (identidad, ubicación, 
                  estado del dispositivo, etc.) antes de conceder permisos.
                </p>
              </div>
              
              <div className="relative bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg">
                    <Lock className="h-5 w-5 text-white" />
                  </div>
                  <h4 className="font-semibold text-gray-900 text-base">
                    2. Acceso con Mínimos Privilegios
                  </h4>
                </div>
                <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                  Los usuarios y dispositivos solo obtienen el acceso estrictamente necesario para su función, 
                  limitado en tiempo y alcance (Just-In-Time, Just-Enough-Access).
                </p>
              </div>
            </div>
            
            <h3 className="text-lg sm:text-xl font-semibold mt-6 mb-3 text-gray-900">¿Por qué es diferente?</h3>
            <div className="bg-gray-100 p-4 rounded-lg border border-gray-200 mb-6">
              <ResponsiveTable>
                <table className="min-w-full border border-gray-200">
                  <thead>
                    <tr>
                      <TableCell header>Aspecto</TableCell>
                      <TableCell header>Modelo Tradicional</TableCell>
                      <TableCell header>Zero Trust</TableCell>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <TableCell>Ubicación</TableCell>
                      <TableCell>Confía en redes internas</TableCell>
                      <TableCell>Trata todo acceso como no confiable</TableCell>
                    </tr>
                    <tr>
                      <TableCell>Autenticación</TableCell>
                      <TableCell>Una vez al inicio</TableCell>
                      <TableCell>Continua y contextual</TableCell>
                    </tr>
                    <tr>
                      <TableCell>Segmentación</TableCell>
                      <TableCell>Perímetro de red</TableCell>
                      <TableCell>Microsegmentación granular</TableCell>
                    </tr>
                  </tbody>
                </table>
              </ResponsiveTable>
            </div>
            
            <h3 className="text-lg sm:text-xl font-semibold mt-6 mb-3 text-gray-900">Metáfora de Seguridad</h3>
            <div className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm">
              <div className="text-gray-700 text-sm sm:text-base">
                <strong>Castillo y foso vs. Embajada moderna:</strong>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>Modelo antiguo: Muros gruesos (firewalls) protegen todo el castillo (red interna)</li>
                  <li>Zero Trust: Como una embajada moderna: múltiples puntos de control, verificaciones continuas, 
                    y áreas restringidas incluso dentro del edificio</li>
                  <li>Incluso el embajador (CEO) debe mostrar credenciales en cada puerta</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Definición y Contexto Histórico</h2>
            <div className="text-gray-700 text-sm sm:text-base">
              El concepto Zero Trust fue formalizado por Forrester Research en 2010 (John Kindervag) y adoptado por NIST en 2020. 
              Surge como respuesta al fracaso del modelo de "castillo y foso" en entornos cloud y móviles.
            </div>
            
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6 my-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg">
                  <BookOpen className="h-5 w-5 text-white" />
                </div>
                <h3 className="font-semibold text-blue-900 text-base">
                  Documentación Oficial
                </h3>
              </div>
              <div className="space-y-3">
                <div className="bg-white rounded-lg p-4 border border-blue-100 hover:border-blue-200 transition-colors">
                  <a href="https://csrc.nist.gov/publications/detail/sp/800-207/final" 
                     className="text-blue-700 hover:text-blue-800 flex items-center gap-2 font-medium text-sm sm:text-base group">
                    <ExternalLink className="h-4 w-4 group-hover:translate-x-1 transition-transform" /> 
                    NIST SP 800-207: Zero Trust Architecture (2020)
                  </a>
                </div>
                <div className="bg-white rounded-lg p-4 border border-blue-100 hover:border-blue-200 transition-colors">
                  <a href="https://www.cisa.gov/sites/default/files/publications/CISA%20Zero%20Trust%20Maturity%20Model%20v2%20Final.pdf" 
                     className="text-blue-700 hover:text-blue-800 flex items-center gap-2 font-medium text-sm sm:text-base group">
                    <ExternalLink className="h-4 w-4 group-hover:translate-x-1 transition-transform" /> 
                    CISA Zero Trust Maturity Model v2 (2023)
                  </a>
                </div>
                <div className="bg-white rounded-lg p-4 border border-blue-100 hover:border-blue-200 transition-colors">
                  <a href="https://cloud.google.com/beyondcorp" 
                     className="text-blue-700 hover:text-blue-800 flex items-center gap-2 font-medium text-sm sm:text-base group">
                    <ExternalLink className="h-4 w-4 group-hover:translate-x-1 transition-transform" /> 
                    Google BeyondCorp Implementation
                  </a>
                </div>
                <div className="bg-white rounded-lg p-4 border border-blue-100 hover:border-blue-200 transition-colors">
                  <a href="https://www.microsoft.com/en-us/security/business/zero-trust" 
                     className="text-blue-700 hover:text-blue-800 flex items-center gap-2 font-medium text-sm sm:text-base group">
                    <ExternalLink className="h-4 w-4 group-hover:translate-x-1 transition-transform" /> 
                    Microsoft Zero Trust Security Model
                  </a>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Componentes Técnicos (NIST SP 800-207)</h2>
            
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl p-6 mb-6 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg">
                  <AlertTriangle className="h-5 w-5 text-white" />
                </div>
                <h3 className="font-semibold text-yellow-800 text-base">
                  Aviso Crítico
                </h3>
              </div>
              <div className="text-yellow-800 text-sm sm:text-base leading-relaxed">
                La implementación completa requiere cambios organizacionales profundos, con un ROI promedio de 2-3 años según Gartner.
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg">
                    <Network className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 text-base">1. Policy Engine (PEP)</h3>
                </div>
                <div className="text-gray-700 text-sm sm:text-base">
                  <strong>Implementaciones reales:</strong> 
                  <ul className="list-disc pl-5 mt-3 space-y-2">
                    <li>Google BeyondCorp Proxy</li>
                    <li>Microsoft Azure AD Conditional Access</li>
                    <li>Palo Alto Prisma Access</li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-cyan-50 to-blue-50 border border-cyan-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg">
                    <Users className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 text-base">2. Identity Verification</h3>
                </div>
                <div className="text-gray-700 text-sm sm:text-base">
                  <strong>Estándares utilizados:</strong>
                  <ul className="list-disc pl-5 mt-3 space-y-2">
                    <li>FIDO2/WebAuthn (sin contraseñas)</li>
                    <li>NIST 800-63B (Niveles IAL/AAL)</li>
                    <li>OAuth 2.0 + OpenID Connect</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Datos y Métricas Reales</h2>
            
            <div className="bg-gradient-to-r from-gray-50 to-slate-50 border border-gray-200 rounded-xl p-6 mb-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-gradient-to-r from-gray-600 to-slate-600 rounded-lg">
                  <BarChart3 className="h-5 w-5 text-white" />
                </div>
                <h3 className="font-semibold text-base">
                  Estadísticas Clave (2024)
                </h3>
              </div>
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
            
            <h3 className="font-semibold mt-6 mb-4 text-base">Implementación por Sector</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-red-50 to-rose-50 border border-red-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-gradient-to-r from-red-500 to-rose-500 rounded-lg">
                    <Building className="h-5 w-5 text-white" />
                  </div>
                  <h4 className="font-semibold text-gray-900 text-base">Gobierno USA</h4>
                </div>
                <div className="text-sm text-gray-700 leading-relaxed">
                  <strong>EO 14028 (2021):</strong> Requiere ZTA para todas las agencias federales antes de 2024
                </div>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg">
                    <Shield className="h-5 w-5 text-white" />
                  </div>
                  <h4 className="font-semibold text-gray-900 text-base">Sector Salud</h4>
                </div>
                <div className="text-sm text-gray-700 leading-relaxed">
                  <strong>HIPAA:</strong> Reducción del 72% en incidentes según HHS
                </div>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg">
                    <TrendingUp className="h-5 w-5 text-white" />
                  </div>
                  <h4 className="font-semibold text-gray-900 text-base">Financiero</h4>
                </div>
                <div className="text-sm text-gray-700 leading-relaxed">
                  <strong>FFIEC:</strong> 89% de bancos con implementación parcial
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Casos de Implementación</h2>
            
            <div className="bg-gradient-to-br from-purple-50 to-indigo-50 border border-purple-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg">
                  <Globe className="h-5 w-5 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 text-base">Google BeyondCorp</h3>
              </div>
              <div className="text-gray-700 text-sm sm:text-base">
                <div className="mb-3">
                  <strong>Resultados:</strong> Eliminación completa de VPN corporativa (2011-2017)
                </div>
                <ul className="list-disc pl-5 space-y-2 text-gray-700 text-sm sm:text-base">
                  <li>Reducción del 90% en incidentes de acceso no autorizado</li>
                  <li>Integración con 150+ aplicaciones internas</li>
                  <li>Modelo replicado en Cloud Identity Aware Proxy</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-orange-50 to-red-50 border border-orange-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg">
                  <Shield className="h-5 w-5 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 text-base">Departamento de Defensa USA</h3>
              </div>
              <div className="text-gray-700 text-sm sm:text-base">
                <div className="mb-3">
                  <strong>Presupuesto:</strong> $9.8B asignados para ZTA (2023-2027)
                </div>
                <ul className="list-disc pl-5 space-y-2 text-gray-700 text-sm sm:text-base">
                  <li>7 pilares técnicos (identidad, dispositivos, etc.)</li>
                  <li>91 actividades concretas en roadmap</li>
                  <li>Primeros resultados: 60% reducción en superficie de ataque</li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      </div>
    </ArticleLayout>
  );
}
