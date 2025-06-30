import ArticleLayout from '@/components/wiki/ArticleLayout';
import { FiExternalLink } from 'react-icons/fi';

export default function CloudMonitoringPage() {
  return (
    <ArticleLayout 
      title="GuardDuty, CloudTrail & Azure Defender"
      description="Herramientas de monitoreo y detección en cloud"
      backUrl="/recursos/wiki/cloud"
    >
      <div className="space-y-10 text-gray-800">
        <section className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Servicios Clave</h2>
          <div className="prose max-w-none">
            <ul className="list-disc pl-6 space-y-2 mb-4 text-gray-700">
              <li><strong>AWS GuardDuty:</strong> Detección inteligente de amenazas</li>
              <li><strong>AWS CloudTrail:</strong> Registro de actividad y API calls</li>
              <li><strong>Azure Defender:</strong> Protección avanzada contra amenazas</li>
              <li><strong>GCP Security Command Center:</strong> Visibilidad centralizada</li>
            </ul>
          </div>
        </section>

        <section className="bg-blue-50 p-6 rounded-lg border border-blue-200">
          <h2 className="text-2xl font-bold mb-4 text-blue-800">Configuraciones Recomendadas</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white p-3 rounded shadow">
              <h3 className="font-semibold text-gray-900">AWS</h3>
              <ul className="list-disc pl-5 mt-2 text-sm text-gray-700">
                <li>Habilitar GuardDuty en todas las regiones</li>
                <li>CloudTrail con encriptación y validación</li>
                <li>Integrar con AWS Security Hub</li>
              </ul>
            </div>
            <div className="bg-white p-3 rounded shadow">
              <h3 className="font-semibold text-gray-900">Azure</h3>
              <ul className="list-disc pl-5 mt-2 text-sm text-gray-700">
                <li>Habilitar Azure Defender para todos los recursos</li>
                <li>Configurar alertas personalizadas</li>
                <li>Usar Azure Sentinel para SIEM</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="border-t pt-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Referencias</h2>
          <div className="border-l-4 border-blue-600 pl-4">
            <ul className="space-y-3">
              <li>
                <a href="https://docs.aws.amazon.com/guardduty/latest/ug/what-is-guardduty.html" className="flex items-center text-blue-600 hover:underline">
                  <FiExternalLink className="mr-2" /> AWS GuardDuty Documentation
                </a>
              </li>
              <li>
                <a href="https://docs.microsoft.com/en-us/azure/security-center/azure-defender" className="flex items-center text-blue-600 hover:underline">
                  <FiExternalLink className="mr-2" /> Azure Defender Docs
                </a>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </ArticleLayout>
  );
}
