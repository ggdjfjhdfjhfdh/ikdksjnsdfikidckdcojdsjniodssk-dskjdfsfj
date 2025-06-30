import ArticleLayout from '@/components/wiki/ArticleLayout';
import { FiExternalLink } from 'react-icons/fi';

export default function DORAPage() {
  return (
    <ArticleLayout 
      title="DORA"
      description="Digital Operational Resilience Act (UE)"
      backUrl="/recursos/wiki/cumplimiento"
    >
      <div className="space-y-10 text-gray-800">
        <section className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Ámbito de Aplicación</h2>
          <div className="prose max-w-none">
            <ul className="list-disc pl-6 space-y-2 mb-4 text-gray-700">
              <li><strong>Entidades financieras:</strong> Bancos, aseguradoras</li>
              <li><strong>Proveedores TIC:</strong> Terceros críticos</li>
              <li><strong>Obligatorio:</strong> Desde enero 2025</li>
              <li><strong>Supervisión:</strong> Autoridades nacionales y EBA</li>
            </ul>
          </div>
        </section>

        <section className="bg-blue-50 p-6 rounded-lg border border-blue-200">
          <h2 className="text-2xl font-bold mb-4 text-blue-800">Pilares Principales</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white p-3 rounded shadow">
              <h3 className="font-semibold text-gray-900">Resiliencia Operacional</h3>
              <ul className="list-disc pl-5 mt-2 text-sm text-gray-700">
                <li>Gestión de riesgos TIC</li>
                <li>Continuidad del negocio</li>
                <li>Pruebas de resistencia</li>
              </ul>
            </div>
            <div className="bg-white p-3 rounded shadow">
              <h3 className="font-semibold text-gray-900">Terceros Críticos</h3>
              <ul className="list-disc pl-5 mt-2 text-sm text-gray-700">
                <li>Evaluación de proveedores</li>
                <li>Contratos con cláusulas DORA</li>
                <li>Planes de contingencia</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="border-t pt-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Referencias</h2>
          <div className="border-l-4 border-blue-600 pl-4">
            <ul className="space-y-3">
              <li>
                <a href="https://finance.ec.europa.eu/regulation-and-supervision/financial-services-legislation/digital-finance-package/digital-operational-resilience-act-dora_en" className="flex items-center text-blue-600 hover:underline">
                  <FiExternalLink className="mr-2" /> Comisión Europea DORA
                </a>
              </li>
              <li>
                <a href="https://www.eba.europa.eu/regulation-and-policy/digital-operational-resilience" className="flex items-center text-blue-600 hover:underline">
                  <FiExternalLink className="mr-2" /> EBA DORA Guidelines
                </a>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </ArticleLayout>
  );
}
