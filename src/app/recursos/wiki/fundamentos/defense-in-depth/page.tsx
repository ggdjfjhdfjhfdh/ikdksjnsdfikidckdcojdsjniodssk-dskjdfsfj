import ArticleLayout from '@/components/wiki/ArticleLayout';
import { FiExternalLink } from 'react-icons/fi';

export default function DefenseInDepthPage() {
  return (
    <ArticleLayout 
      title="Defense in Depth" 
      description="Estrategia de seguridad en capas con controles redundantes"
      backUrl="/recursos/wiki/fundamentos"
    >
      <div className="space-y-8 text-gray-800">
        <section>
          <h2 className="text-2xl font-bold mb-4">Concepto Fundamental</h2>
          <p className="mb-4">
            Arquitectura de seguridad que implementa múltiples capas de protección independientes y redundantes para:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-6">
            <li>Mitigar el riesgo de fallos individuales en controles de seguridad</li>
            <li>Dificultar el movimiento lateral y la persistencia de atacantes</li>
            <li>Proporcionar tiempo de detección y respuesta ante brechas</li>
            <li>Reducir la superficie de ataque en cada capa defensiva</li>
          </ul>
        </section>

        <section className="bg-gray-100 p-6 rounded-lg border-l-4 border-blue-700">
          <h3 className="text-xl font-semibold mb-4">Modelo de Capas Defensivas</h3>
          
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <h4 className="font-medium mb-3 text-gray-900">Capas Técnicas:</h4>
              <ol className="list-decimal pl-5 space-y-2">
                <li><strong>Red/Perímetro:</strong> Firewalls, IDS/IPS, segmentación</li>
                <li><strong>Autenticación:</strong> MFA, IAM, gestión de identidades</li>
                <li><strong>Endpoints:</strong> EDR, hardening, parcheo</li>
                <li><strong>Aplicaciones:</strong> WAF, SAST, DAST</li>
                <li><strong>Datos:</strong> Encryption, tokenization, DLP</li>
              </ol>
            </div>
            
            <div>
              <h4 className="font-medium mb-3 text-gray-900">Capas Organizativas:</h4>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Políticas:</strong> Governance, compliance, estándares</li>
                <li><strong>Concienciación:</strong> Training, phishing simulations</li>
                <li><strong>Respuesta:</strong> IRP, backups, disaster recovery</li>
                <li><strong>Física:</strong> Accesos, CCTV, zonas seguras</li>
              </ul>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded border border-gray-200">
            <h4 className="font-medium mb-2">Ejemplo de Implementación:</h4>
            <p className="mb-2">Protección de un sistema de gestión de identidades:</p>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>Network: Segmentación VLAN, firewalls de aplicación</li>
              <li>App: WAF, rate limiting, sanitización de inputs</li>
              <li>Auth: MFA, roles mínimos, revisión de permisos</li>
              <li>Data: Encryption in-transit/at-rest, máscara de datos</li>
              <li>Monitoring: SIEM, behavioral analytics</li>
            </ul>
          </div>
        </section>

        <section>
          <h3 className="text-xl font-semibold mb-4">Modelos de Referencia</h3>
          
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-medium mb-2">NIST Cybersecurity Framework</h4>
              <ul className="list-disc pl-5 space-y-1 text-sm mb-3">
                <li>Identify: Asset management, risk assessment</li>
                <li>Protect: Controles de acceso, awareness</li>
                <li>Detect: Anomaly monitoring</li>
                <li>Respond: Incident response planning</li>
                <li>Recover: Improvement planning</li>
              </ul>
              <a 
                href="https://www.nist.gov/cyberframework" 
                className="flex items-center text-blue-700 hover:text-blue-900 text-sm font-medium"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FiExternalLink className="mr-1" /> Framework completo
              </a>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-medium mb-2">Zero Trust Architecture</h4>
              <p className="text-sm mb-2">Complemento estratégico que asume:</p>
              <ul className="list-disc pl-5 space-y-1 text-sm mb-3">
                <li>Redes internas/externas igualmente hostiles</li>
                <li>Verificación explícita para cada acceso</li>
                <li>Privilegios mínimos y just-in-time</li>
              </ul>
              <a 
                href="https://csrc.nist.gov/publications/detail/sp/800-207/final" 
                className="flex items-center text-blue-700 hover:text-blue-900 text-sm font-medium"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FiExternalLink className="mr-1" /> NIST SP 800-207
              </a>
            </div>
          </div>
        </section>

        <section className="border-t pt-6">
          <h3 className="text-xl font-semibold mb-3">Métricas Clave</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="border p-2 text-left">Capa</th>
                  <th className="border p-2 text-left">% Reducción Riesgo</th>
                  <th className="border p-2 text-left">Ejemplo Control</th>
                  <th className="border p-2 text-left">KPI Asociado</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white">
                  <td className="border p-2">Red</td>
                  <td className="border p-2">40-60%</td>
                  <td className="border p-2">Segmentación micro</td>
                  <td className="border p-2">% tráfico inspeccionado</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border p-2">Autenticación</td>
                  <td className="border p-2">30-50%</td>
                  <td className="border p-2">MFA + SSO</td>
                  <td className="border p-2">% cuentas con MFA</td>
                </tr>
                <tr className="bg-white">
                  <td className="border p-2">Endpoint</td>
                  <td className="border p-2">25-40%</td>
                  <td className="border p-2">EDR + hardening</td>
                  <td className="border p-2">Tiempo parcheo crítico</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </ArticleLayout>
  );
}
