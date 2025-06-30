import ArticleLayout from '@/components/wiki/ArticleLayout';
import { FiExternalLink } from 'react-icons/fi';

export default function CadenaCustodiaPage() {
  return (
    <ArticleLayout 
      title="Cadena de Custodia"
      description="Manejo legal de evidencia digital"
      backUrl="/recursos/wiki/forense"
    >
      <div className="space-y-10 text-gray-800">
        <section className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Elementos Clave</h2>
          <div className="prose max-w-none">
            <ul className="list-disc pl-6 space-y-2 mb-4 text-gray-700">
              <li><strong>Documentación:</strong> Registro detallado de cada manipulación</li>
              <li><strong>Integridad:</strong> Hash criptográficos (SHA-256, MD5)</li>
              <li><strong>Custodia:</strong> Personas responsables en cada fase</li>
              <li><strong>Almacenamiento:</strong> Condiciones seguras y controladas</li>
            </ul>
          </div>
        </section>

        <section className="bg-blue-50 p-6 rounded-lg border border-blue-200">
          <h2 className="text-2xl font-bold mb-4 text-blue-800">Proceso</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white p-3 rounded shadow">
              <h3 className="font-semibold text-gray-900">Recolección</h3>
              <ul className="list-disc pl-5 mt-2 text-sm text-gray-700">
                <li>Fotografías del estado original</li>
                <li>Registro de fecha/hora</li>
                <li>Testigos presentes</li>
              </ul>
            </div>
            <div className="bg-white p-3 rounded shadow">
              <h3 className="font-semibold text-gray-900">Transporte</h3>
              <ul className="list-disc pl-5 mt-2 text-sm text-gray-700">
                <li>Embalaje antiestático</li>
                <li>Registro de traslados</li>
                <li>Control de accesos</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="border-t pt-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Referencias</h2>
          <div className="border-l-4 border-blue-600 pl-4">
            <ul className="space-y-3">
              <li>
                <a href="https://www.nist.gov/forensics" className="flex items-center text-blue-600 hover:underline">
                  <FiExternalLink className="mr-2" /> NIST Forensics Standards
                </a>
              </li>
              <li>
                <a href="https://www.interpol.int/How-we-work/Forensics/Digital-forensics" className="flex items-center text-blue-600 hover:underline">
                  <FiExternalLink className="mr-2" /> INTERPOL Digital Forensics
                </a>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </ArticleLayout>
  );
}
