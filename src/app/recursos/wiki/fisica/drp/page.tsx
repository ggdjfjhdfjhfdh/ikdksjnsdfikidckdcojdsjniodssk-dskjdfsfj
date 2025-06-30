import ArticleLayout from '@/components/wiki/ArticleLayout';
import { FiExternalLink } from 'react-icons/fi';

export default function DRPPage() {
  return (
    <ArticleLayout 
      title="DRP"
      description="Disaster Recovery Plan"
      backUrl="/recursos/wiki/fisica"
    >
      <div className="space-y-10 text-gray-800">
        <section className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Componentes Clave</h2>
          <div className="prose max-w-none">
            <ul className="list-disc pl-6 space-y-2 mb-4 text-gray-700">
              <li><strong>Objetivos:</strong> RTO (Recovery Time Objective), RPO (Recovery Point Objective)</li>
              <li><strong>Priorización:</strong> Sistemas y procesos críticos</li>
              <li><strong>Estrategias:</strong> Backup, replicación, sitios alternativos</li>
              <li><strong>Procedimientos:</strong> Activación, ejecución, validación</li>
            </ul>
          </div>
        </section>

        <section className="bg-blue-50 p-6 rounded-lg border border-blue-200">
          <h2 className="text-2xl font-bold mb-4 text-blue-800">Implementación</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white p-3 rounded shadow">
              <h3 className="font-semibold text-gray-900">Tecnologías</h3>
              <ul className="list-disc pl-5 mt-2 text-sm text-gray-700">
                <li>Replicación en caliente/fría</li>
                <li>Backups automatizados</li>
                <li>Virtualización para DR</li>
              </ul>
            </div>
            <div className="bg-white p-3 rounded shadow">
              <h3 className="font-semibold text-gray-900">Pruebas</h3>
              <ul className="list-disc pl-5 mt-2 text-sm text-gray-700">
                <li>Simulacros periódicos</li>
                <li>Pruebas de restauración</li>
                <li>Actualización continua</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="border-t pt-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Referencias</h2>
          <div className="border-l-4 border-blue-600 pl-4">
            <ul className="space-y-3">
              <li>
                <a href="https://www.iso.org/standard/75106.html" className="flex items-center text-blue-600 hover:underline">
                  <FiExternalLink className="mr-2" /> ISO 22301
                </a>
              </li>
              <li>
                <a href="https://csrc.nist.gov/publications/detail/sp/800-34/rev-1/final" className="flex items-center text-blue-600 hover:underline">
                  <FiExternalLink className="mr-2" /> NIST SP 800-34
                </a>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </ArticleLayout>
  );
}
