import ArticleLayout from '@/components/wiki/ArticleLayout';
import { FiExternalLink } from 'react-icons/fi';

export default function APTPage() {
  return (
    <ArticleLayout 
      title="Amenazas Persistentes Avanzadas (APT)" 
      description="Grupos organizados que realizan ciberataques prolongados contra objetivos específicos"
      backUrl="/recursos/wiki/amenazas"
    >
      <div className="space-y-10 text-gray-800">
        <section className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h2 className="text-2xl font-bold mb-4">¿Qué son los APT?</h2>
          <div className="prose max-w-none">
            <p className="mb-4">
              Las <strong>Advanced Persistent Threats</strong> son:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Operadas por actores estatales o grupos organizados</li>
              <li>Enfocadas en objetivos estratégicos (gobiernos, infraestructura crítica)</li>
              <li>De larga duración (meses o años)</li>
              <li>Altamente sofisticadas y evasivas</li>
            </ul>
            
            <div className="bg-blue-50 p-4 rounded border-l-4 border-blue-500">
              <p className="text-sm">
                <strong>Característica clave:</strong> Persistencia - mantienen acceso aunque sean detectados.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-blue-50 p-6 rounded-lg border border-blue-200">
          <h2 className="text-2xl font-bold mb-4 text-blue-800">Etapas de un Ataque APT</h2>
          <div className="grid md:grid-cols-5 gap-4">
            <div className="bg-white p-3 rounded shadow text-center">
              <p className="font-semibold text-sm">1. Reconocimiento</p>
              <p className="text-xs">Identificación de objetivos y vulnerabilidades</p>
            </div>
            <div className="bg-white p-3 rounded shadow text-center">
              <p className="font-semibold text-sm">2. Infiltración</p>
              <p className="text-xs">Phishing, exploits o supply chain</p>
            </div>
            <div className="bg-white p-3 rounded shadow text-center">
              <p className="font-semibold text-sm">3. Persistencia</p>
              <p className="text-xs">Backdoors, rootkits</p>
            </div>
            <div className="bg-white p-3 rounded shadow text-center">
              <p className="font-semibold text-sm">4. Movimiento Lateral</p>
              <p className="text-xs">Escalada de privilegios</p>
            </div>
            <div className="bg-white p-3 rounded shadow text-center">
              <p className="font-semibold text-sm">5. Exfiltración</p>
              <p className="text-xs">Transferencia de datos</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Ejemplos Notables</h2>
          
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="font-semibold mb-3">Grupos APT</h3>
              <ul className="list-disc pl-5 space-y-2 text-sm">
                <li><strong>APT29 (Cozy Bear):</strong> Rusia, ataque a SolarWinds</li>
                <li><strong>APT34 (OilRig):</strong> Irán, sector energético</li>
                <li><strong>APT10 (Stone Panda):</strong> China, robo de PI</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-3">Técnicas Comunes</h3>
              <ul className="list-disc pl-5 space-y-2 text-sm">
                <li>Spear phishing altamente dirigido</li>
                <li>Zero-days y exploits personalizados</li>
                <li>Living-off-the-land (LOTL)</li>
                <li>Comando y control (C2) evasivo</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="border-t pt-6">
          <h2 className="text-2xl font-bold mb-4">Mitigación</h2>
          
          <div className="bg-gray-100 p-4 rounded-lg mb-6">
            <h3 className="font-semibold mb-3">Estrategias Defensivas</h3>
            <ol className="list-decimal pl-5 space-y-2">
              <li><strong>Segmentación de red:</strong> Limitar movimiento lateral</li>
              <li><strong>Monitoreo avanzado:</strong> Detección de anomalías</li>
              <li><strong>Parcheo riguroso:</strong> Vulnerabilidades conocidas</li>
              <li><strong>Concienciación:</strong> Entrenamiento anti-phishing</li>
              <li><strong>Respuesta a incidentes:</strong> Planes de contención</li>
            </ol>
          </div>
        </section>

        <section className="border-t pt-6">
          <h2 className="text-2xl font-bold mb-4">Referencias</h2>
          
          <div className="border-l-4 border-blue-600 pl-4">
            <h3 className="font-semibold mb-2">Fuentes Oficiales</h3>
            <ul className="space-y-3">
              <li>
                <a href="https://attack.mitre.org/groups/" className="flex items-center text-blue-700 hover:text-blue-900">
                  <FiExternalLink className="mr-2" /> MITRE ATT&CK Groups
                </a>
              </li>
              <li>
                <a href="https://www.mandiant.com/resources/reports/apt-groups" className="flex items-center text-blue-700 hover:text-blue-900">
                  <FiExternalLink className="mr-2" /> Mandiant APT Reports
                </a>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </ArticleLayout>
  );
}