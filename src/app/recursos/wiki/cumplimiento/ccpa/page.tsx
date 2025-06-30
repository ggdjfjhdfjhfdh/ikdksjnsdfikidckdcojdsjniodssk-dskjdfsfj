import ArticleLayout from '@/components/wiki/ArticleLayout';
import { FiExternalLink } from 'react-icons/fi';

export default function CCPAPage() {
  return (
    <ArticleLayout 
      title="CCPA / CPRA"
      description="Ley de Privacidad de California"
      backUrl="/recursos/wiki/cumplimiento"
    >
      <div className="space-y-10 text-gray-800">
        <section className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Derechos del Consumidor</h2>
          <div className="prose max-w-none">
            <ul className="list-disc pl-6 space-y-2 mb-4 text-gray-700">
              <li><strong>Derecho a saber:</strong> Qué datos se recopilan</li>
              <li><strong>Derecho a eliminar:</strong> Solicitar borrado</li>
              <li><strong>Derecho a opt-out:</strong> Venta de datos</li>
              <li><strong>CPRA añade:</strong> Limitación de uso de datos sensibles</li>
            </ul>
          </div>
        </section>

        <section className="bg-blue-50 p-6 rounded-lg border border-blue-200">
          <h2 className="text-2xl font-bold mb-4 text-blue-800">Ámbito de Aplicación</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white p-3 rounded shadow">
              <h3 className="font-semibold text-gray-900">CCPA Original</h3>
              <ul className="list-disc pl-5 mt-2 text-sm text-gray-700">
                <li>Empresas con >$25M en ingresos</li>
                <li>Compra/venta datos de >50k consumidores</li>
                <li>50%+ ingresos por venta de datos</li>
              </ul>
            </div>
            <div className="bg-white p-3 rounded shadow">
              <h3 className="font-semibold text-gray-900">CPRA 2023</h3>
              <ul className="list-disc pl-5 mt-2 text-sm text-gray-700">
                <li>Umbral aumentado a 100k consumidores</li>
                <li>Creación de la CPPA</li>
                <li>Datos sensibles adicionales</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="border-t pt-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Referencias</h2>
          <div className="border-l-4 border-blue-600 pl-4">
            <ul className="space-y-3">
              <li>
                <a href="https://oag.ca.gov/privacy/ccpa" className="flex items-center text-blue-600 hover:underline">
                  <FiExternalLink className="mr-2" /> CCPA Oficial
                </a>
              </li>
              <li>
                <a href="https://cppa.ca.gov/" className="flex items-center text-blue-600 hover:underline">
                  <FiExternalLink className="mr-2" /> CPPA Autoridad
                </a>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </ArticleLayout>
  );
}
