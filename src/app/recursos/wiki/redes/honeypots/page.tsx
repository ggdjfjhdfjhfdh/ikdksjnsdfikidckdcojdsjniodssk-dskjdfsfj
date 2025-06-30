import ArticleLayout from '@/components/wiki/ArticleLayout';
import { FiExternalLink } from 'react-icons/fi';

export default function HoneypotsPage() {
  return (
    <ArticleLayout 
      title="Honeypots & Deception Grids"
      description="Sistemas de engaño para detección temprana de amenazas"
      backUrl="/recursos/wiki/redes"
    >
      <div className="space-y-10 text-gray-800">
        <section className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Tipos de Honeypots</h2>
          <div className="prose max-w-none">
            <p className="mb-4 text-gray-700">
              Clasificación por nivel de interacción:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4 text-gray-700">
              <li><strong>Low-interaction:</strong> Simulan servicios básicos</li>
              <li><strong>High-interaction:</strong> Sistemas reales con monitorización</li>
              <li><strong>Deception Grids:</strong> Redes completas de señuelos</li>
            </ul>
          </div>
        </section>

        <section className="bg-blue-50 p-6 rounded-lg border border-blue-200">
          <h2 className="text-2xl font-bold mb-4 text-blue-800">Implementaciones Populares</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white p-3 rounded shadow text-center">
              <p className="font-semibold text-sm text-gray-900">Cowrie</p>
              <p className="text-xs text-gray-600">SSH/Telnet honeypot</p>
            </div>
            <div className="bg-white p-3 rounded shadow text-center">
              <p className="font-semibold text-sm text-gray-900">CanaryTokens</p>
              <p className="text-xs text-gray-600">Señuelos distribuidos</p>
            </div>
            <div className="bg-white p-3 rounded shadow text-center">
              <p className="font-semibold text-sm text-gray-900">T-Pot</p>
              <p className="text-xs text-gray-600">Plataforma multi-honeypot</p>
            </div>
          </div>
        </section>

        <section className="border-t pt-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Consideraciones Legales</h2>
          <div className="prose max-w-none">
            <p className="mb-4 text-gray-700">
              Aspectos importantes a considerar:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4 text-gray-700">
              <li>Notificación de privacidad si se capturan datos</li>
              <li>Restricciones geográficas para ciertas técnicas</li>
              <li>Documentación clara de propósitos</li>
            </ul>
          </div>
        </section>

        <section className="border-t pt-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Referencias</h2>
          <div className="border-l-4 border-blue-600 pl-4">
            <ul className="space-y-3">
              <li>
                <a href="https://www.honeynet.org" className="flex items-center text-blue-600 hover:underline">
                  <FiExternalLink className="mr-2" /> The Honeynet Project
                </a>
              </li>
              <li>
                <a href="https://github.com/cowrie/cowrie" className="flex items-center text-blue-600 hover:underline">
                  <FiExternalLink className="mr-2" /> Cowrie GitHub
                </a>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </ArticleLayout>
  );
}
