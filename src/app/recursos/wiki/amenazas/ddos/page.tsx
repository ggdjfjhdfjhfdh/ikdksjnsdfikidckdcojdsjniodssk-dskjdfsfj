import ArticleLayout from '@/components/wiki/ArticleLayout';
import { FiExternalLink } from 'react-icons/fi';

export default function DDOSPage() {
  return (
    <ArticleLayout 
      title="Ataques DDoS (Denegación de Servicio Distribuido)" 
      description="Sobrecarga intencional de sistemas para interrumpir servicios legítimos"
      backUrl="/recursos/wiki/amenazas"
    >
      <div className="space-y-10 text-gray-800">
        <section className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h2 className="text-2xl font-bold mb-4">¿Qué es un ataque DDoS?</h2>
          <div className="prose max-w-none">
            <p className="mb-4">
              Un ataque DDoS:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Inunda sistemas con tráfico malicioso desde múltiples fuentes</li>
              <li>Busca hacer inaccesibles servicios online</li>
              <li>Puede alcanzar varios terabits por segundo (Tbps) de volumen</li>
              <li>Utiliza redes de dispositivos comprometidos (botnets)</li>
            </ul>
            
            <div className="bg-red-50 p-4 rounded border-l-4 border-red-500">
              <p className="text-sm">
                <strong>Impacto:</strong> Pérdidas promedio de $120k-$2M por ataque según tamaño de organización.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-blue-50 p-6 rounded-lg border border-blue-200">
          <h2 className="text-2xl font-bold mb-4 text-blue-800">Tipos Principales</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white p-3 rounded shadow text-center">
              <p className="font-semibold text-sm">Volumétricos</p>
              <p className="text-xs">Saturación de ancho de banda (UDP floods, ICMP)</p>
            </div>
            <div className="bg-white p-3 rounded shadow text-center">
              <p className="font-semibold text-sm">Protocolo</p>
              <p className="text-xs">Explota debilidades en TCP/IP (SYN floods, Ping of Death)</p>
            </div>
            <div className="bg-white p-3 rounded shadow text-center">
              <p className="font-semibold text-sm">Aplicación</p>
              <p className="text-xs">Targetea capa 7 (HTTP floods, Slowloris)</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Estadísticas Clave</h2>
          
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="font-semibold mb-3">Tendencias</h3>
              <ul className="list-disc pl-5 space-y-2 text-sm">
                <li>+25% ataques DDoS en 2023 vs 2022</li>
                <li>Duración promedio: 34 minutos</li>
                <li>Ataque récord: 3.47 Tbps (Google, 2020)</li>
                <li>47% usa múltiples vectores simultáneos</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-3">Vectores Populares</h3>
              <ul className="list-disc pl-5 space-y-2 text-sm">
                <li>UDP Flood (35% de ataques)</li>
                <li>TCP SYN Flood (28%)</li>
                <li>HTTP Flood (18%)</li>
                <li>DNS Amplification (12%)</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="border-t pt-6">
          <h2 className="text-2xl font-bold mb-4">Mitigación</h2>
          
          <div className="bg-gray-100 p-4 rounded-lg mb-6">
            <h3 className="font-semibold mb-3">Estrategias Defensivas</h3>
            <ol className="list-decimal pl-5 space-y-2">
              <li><strong>Protección perimetral:</strong> Firewalls y sistemas de mitigación</li>
              <li><strong>Redundancia:</strong> Balanceo de carga y CDNs</li>
              <li><strong>Rate Limiting:</strong> Límites de solicitudes por IP</li>
              <li><strong>Monitoreo:</strong> Detección temprana de patrones anómalos</li>
              <li><strong>Plan de respuesta:</strong> Protocolos para activación rápida</li>
            </ol>
          </div>
        </section>

        <section className="border-t pt-6">
          <h2 className="text-2xl font-bold mb-4">Referencias</h2>
          
          <div className="border-l-4 border-blue-600 pl-4">
            <h3 className="font-semibold mb-2">Guías Oficiales</h3>
            <ul className="space-y-3">
              <li>
                <a href="https://www.cisa.gov/denial-service-ddos" className="flex items-center text-blue-700 hover:text-blue-900">
                  <FiExternalLink className="mr-2" /> CISA DDoS Guidance
                </a>
              </li>
              <li>
                <a href="https://www.cloudflare.com/learning/ddos/" className="flex items-center text-blue-700 hover:text-blue-900">
                  <FiExternalLink className="mr-2" /> Cloudflare DDoS Resources
                </a>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </ArticleLayout>
  );
}