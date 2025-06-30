import ArticleLayout from '@/components/wiki/ArticleLayout';
import { FiExternalLink } from 'react-icons/fi';

export default function ConfidentialComputingPage() {
  return (
    <ArticleLayout 
      title="Confidential Computing & Encryption-in-Use"
      description="Protección de datos en uso mediante enclaves seguros"
      backUrl="/recursos/wiki/cloud"
    >
      <div className="space-y-10 text-gray-800">
        <section className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Conceptos Clave</h2>
          <div className="prose max-w-none">
            <ul className="list-disc pl-6 space-y-2 mb-4 text-gray-700">
              <li><strong>TEEs:</strong> Trusted Execution Environments</li>
              <li><strong>Enclaves:</strong> Áreas de memoria protegidas</li>
              <li><strong>SGX:</strong> Intel Software Guard Extensions</li>
              <li><strong>Memory Encryption:</strong> AMD SEV, Intel TDX</li>
            </ul>
          </div>
        </section>

        <section className="bg-blue-50 p-6 rounded-lg border border-blue-200">
          <h2 className="text-2xl font-bold mb-4 text-blue-800">Implementaciones Cloud</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white p-3 rounded shadow text-center">
              <p className="font-semibold text-sm text-gray-900">AWS</p>
              <p className="text-xs text-gray-600">Nitro Enclaves</p>
            </div>
            <div className="bg-white p-3 rounded shadow text-center">
              <p className="font-semibold text-sm text-gray-900">Azure</p>
              <p className="text-xs text-gray-600">Confidential VMs</p>
            </div>
            <div className="bg-white p-3 rounded shadow text-center">
              <p className="font-semibold text-sm text-gray-900">GCP</p>
              <p className="text-xs text-gray-600">Confidential VMs</p>
            </div>
          </div>
        </section>

        <section className="border-t pt-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Referencias</h2>
          <div className="border-l-4 border-blue-600 pl-4">
            <ul className="space-y-3">
              <li>
                <a href="https://confidentialcomputing.io/" className="flex items-center text-blue-600 hover:underline">
                  <FiExternalLink className="mr-2" /> Confidential Computing Consortium
                </a>
              </li>
              <li>
                <a href="https://aws.amazon.com/ec2/nitro/nitro-enclaves/" className="flex items-center text-blue-600 hover:underline">
                  <FiExternalLink className="mr-2" /> AWS Nitro Enclaves
                </a>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </ArticleLayout>
  );
}
