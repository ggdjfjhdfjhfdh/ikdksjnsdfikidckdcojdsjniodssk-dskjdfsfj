import ArticleLayout from '@/components/wiki/ArticleLayout';
import { FiExternalLink } from 'react-icons/fi';

export default function SuperficieAtaquePage() {
  return (
    <ArticleLayout 
      title="Superficie de Ataque" 
      description="Conjunto de puntos donde un atacante podría intentar explotar vulnerabilidades en un sistema"
      backUrl="/recursos/wiki/fundamentos"
    >
      <div className="space-y-10 text-gray-800">
        <section className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h2 className="text-2xl font-bold mb-4">Definición y Conceptos Clave</h2>
          <div className="prose max-w-none">
            <p className="mb-4">
              La <strong>Superficie de Ataque</strong> representa todos los posibles vectores de ataque en un sistema, incluyendo:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Interfaces físicas y lógicas expuestas</li>
              <li>Protocolos de comunicación vulnerables</li>
              <li>Credenciales, tokens y mecanismos de autenticación</li>
              <li>Endpoints de API no protegidos</li>
              <li>Componentes con vulnerabilidades conocidas</li>
            </ul>
            
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-blue-50 p-4 rounded border-l-4 border-blue-500">
                <p className="text-sm font-medium mb-2">Superficie de Ataque Absoluta:</p>
                <p className="text-sm">Todos los posibles puntos de entrada, incluyendo aquellos protegidos por controles de seguridad.</p>
              </div>
              <div className="bg-green-50 p-4 rounded border-l-4 border-green-500">
                <p className="text-sm font-medium mb-2">Superficie de Ataque Relativa:</p>
                <p className="text-sm">Solo los puntos de entrada explotables dada la configuración actual de seguridad.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-blue-50 p-6 rounded-lg border border-blue-200">
          <h2 className="text-2xl font-bold mb-4 text-blue-800">Componentes Detallados</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm">
              <h3 className="font-semibold mb-2 text-blue-700">Física</h3>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Puertos USB/HDMI</li>
                <li>Consolas de administración</li>
                <li>Dispositivos IoT</li>
                <li>Medios extraíbles</li>
                <li>Accesos a centros de datos</li>
              </ul>
            </div>
            <div className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm">
              <h3 className="font-semibold mb-2 text-blue-700">Digital</h3>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>APIs públicas/internas</li>
                <li>Puertos abiertos (RDP, SSH)</li>
                <li>Interfaces web/admin</li>
                <li>Servicios en la nube</li>
                <li>Bases de datos expuestas</li>
              </ul>
            </div>
            <div className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm">
              <h3 className="font-semibold mb-2 text-blue-700">Humana</h3>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Phishing/spear phishing</li>
                <li>Pretexting/impersonación</li>
                <li>Ingeniería social inversa</li>
                <li>Manipulación de proveedores</li>
                <li>Insiders malintencionados</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Metodología de Análisis</h2>
          
          <div className="bg-gray-100 p-4 rounded-lg mb-6">
            <h3 className="font-semibold mb-3">Proceso de Mapeo</h3>
            <ol className="list-decimal pl-5 space-y-2">
              <li><strong>Inventario de activos:</strong> Catalogar todos los componentes del sistema</li>
              <li><strong>Identificación de interfaces:</strong> Documentar todos los puntos de entrada/salida</li>
              <li><strong>Evaluación de controles:</strong> Analizar medidas de seguridad existentes</li>
              <li><strong>Clasificación por criticidad:</strong> Priorizar según impacto potencial</li>
              <li><strong>Documentación:</strong> Crear matriz de superficie de ataque</li>
            </ol>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="font-semibold mb-3">Técnicas de Reducción</h3>
              <ul className="list-disc pl-5 space-y-2 text-sm">
                <li><strong>Minimización:</strong> Deshabilitar servicios/protocolos innecesarios</li>
                <li><strong>Segmentación:</strong> Aislamiento de redes y microsegmentación</li>
                <li><strong>Hardening:</strong> Configuraciones seguras por defecto</li>
                <li><strong>Control de acceso:</strong> Mínimo privilegio + autenticación fuerte</li>
                <li><strong>Monitoreo:</strong> Detección de cambios no autorizados</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-3">Herramientas Avanzadas</h3>
              <ul className="list-disc pl-5 space-y-2 text-sm">
                <li><strong>Nmap:</strong> Escaneo completo de puertos y servicios</li>
                <li><strong>OWASP Amass:</strong> Mapeo de dominios y subdominios</li>
                <li><strong>BloodHound:</strong> Análisis de rutas de ataque en Active Directory</li>
                <li><strong>Shodan:</strong> Buscador de dispositivos expuestos en Internet</li>
                <li><strong>Metasploit:</strong> Framework para pruebas de explotación</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="border-t pt-6">
          <h2 className="text-2xl font-bold mb-4">Casos de Estudio</h2>
          
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm">
              <h3 className="font-semibold mb-2 text-blue-700">Infraestructura On-Premise</h3>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Servidores no parchados con RDP expuesto</li>
                <li>Dispositivos IoT con credenciales por defecto</li>
                <li>Switches de red con interfaces de gestión accesibles</li>
              </ul>
            </div>
            <div className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm">
              <h3 className="font-semibold mb-2 text-blue-700">Entorno Cloud</h3>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Buckets S3 configurados como públicos</li>
                <li>APIs de gestión sin autenticación</li>
                <li>Contenedores con vulnerabilidades críticas</li>
              </ul>
            </div>
          </div>
          
          <div className="border-l-4 border-blue-600 pl-4">
            <h3 className="font-semibold mb-2">Estándares y Marcos de Referencia</h3>
            <ul className="space-y-3">
              <li>
                <a href="https://csrc.nist.gov/projects/attack-surface" className="flex items-center text-blue-700 hover:text-blue-900">
                  <FiExternalLink className="mr-2" /> NIST SP 800-53 (Controles de Superficie de Ataque)
                </a>
              </li>
              <li>
                <a href="https://attack.mitre.org" className="flex items-center text-blue-700 hover:text-blue-900">
                  <FiExternalLink className="mr-2" /> MITRE ATT&CK (Tácticas y Técnicas)
                </a>
              </li>
              <li>
                <a href="https://owasp.org/www-project-application-security-verification-standard/" className="flex items-center text-blue-700 hover:text-blue-900">
                  <FiExternalLink className="mr-2" /> OWASP ASVS (Verificación de Seguridad)
                </a>
              </li>
              <li>
                <a href="https://www.iso.org/standard/81227.html" className="flex items-center text-blue-700 hover:text-blue-900">
                  <FiExternalLink className="mr-2" /> ISO/IEC 27035 (Gestión de Incidentes)
                </a>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </ArticleLayout>
  );
}
