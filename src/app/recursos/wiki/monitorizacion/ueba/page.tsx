import ArticleLayout from '@/components/wiki/ArticleLayout';
import { FiExternalLink } from 'react-icons/fi';

export default function UEBAPage() {
  return (
    <ArticleLayout 
      title="UEBA / NDR"
      description="Análisis de comportamiento de usuarios y red"
      backUrl="/recursos/wiki/monitorizacion"
    >
      <div className="space-y-10 text-gray-800">
        <section className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Conceptos Clave</h2>
          <div className="prose max-w-none">
            <ul className="list-disc pl-6 space-y-2 mb-4 text-gray-700">
              <li><strong>UEBA:</strong> User and Entity Behavior Analytics</li>
              <li><strong>NDR:</strong> Network Detection and Response</li>
              <li><strong>Baseline:</strong> Comportamiento normal</li>
              <li><strong>Anomalías:</strong> Desviaciones detectadas</li>
            </ul>
          </div>
        </section>

        <section className="bg-blue-50 p-6 rounded-lg border border-blue-200">
          <h2 className="text-2xl font-bold mb-4 text-blue-800">Tecnologías</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white p-3 rounded shadow">
              <h3 className="font-semibold text-gray-900">UEBA</h3>
              <ul className="list-disc pl-5 mt-2 text-sm text-gray-700">
                <li>Machine Learning</li>
                <li>Análisis de sesiones</li>
                <li>Detección de insider threats</li>
              </ul>
            </div>
            <div className="bg-white p-3 rounded shadow">
              <h3 className="font-semibold text-gray-900">NDR</h3>
              <ul className="list-disc pl-5 mt-2 text-sm text-gray-700">
                <li>NetFlow analysis</li>
                <li>Packet inspection</li>
                <li>Lateral movement detection</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="border-t pt-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Referencias</h2>
          <div className="border-l-4 border-blue-600 pl-4">
            <ul className="space-y-3">
              <li>
                <a href="https://www.gartner.com/en/information-technology/glossary/user-and-entity-behavior-analytics-ueba-" className="flex items-center text-blue-600 hover:underline">
                  <FiExternalLink className="mr-2" /> Gartner UEBA Definition
                </a>
              </li>
              <li>
                <a href="https://www.darkreading.com/analytics/an-introduction-to-network-detection-and-response" className="flex items-center text-blue-600 hover:underline">
                  <FiExternalLink className="mr-2" /> NDR Introduction
                </a>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </ArticleLayout>
  );
}
