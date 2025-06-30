import ArticleLayout from '@/components/wiki/ArticleLayout';
import { FiExternalLink } from 'react-icons/fi';

export default function ThreatIntelPage() {
  return (
    <ArticleLayout 
      title="Threat Intelligence"
      description="STIX/TAXII y feeds de inteligencia"
      backUrl="/recursos/wiki/monitorizacion"
    >
      <div className="space-y-10 text-gray-800">
        <section className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Estándares</h2>
          <div className="prose max-w-none">
            <ul className="list-disc pl-6 space-y-2 mb-4 text-gray-700">
              <li><strong>STIX:</strong> Structured Threat Information eXpression</li>
              <li><strong>TAXII:</strong> Trusted Automated Exchange of Intelligence</li>
              <li><strong>OpenIOC:</strong> Indicator of Compromise format</li>
              <li><strong>MISP:</strong> Malware Information Sharing Platform</li>
            </ul>
          </div>
        </section>

        <section className="bg-blue-50 p-6 rounded-lg border border-blue-200">
          <h2 className="text-2xl font-bold mb-4 text-blue-800">Fuentes</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white p-3 rounded shadow">
              <h3 className="font-semibold text-gray-900">Públicas</h3>
              <ul className="list-disc pl-5 mt-2 text-sm text-gray-700">
                <li>AlienVault OTX</li>
                <li>MITRE ATT&CK</li>
                <li>VirusTotal</li>
              </ul>
            </div>
            <div className="bg-white p-3 rounded shadow">
              <h3 className="font-semibold text-gray-900">Comerciales</h3>
              <ul className="list-disc pl-5 mt-2 text-sm text-gray-700">
                <li>Recorded Future</li>
                <li>Mandiant</li>
                <li>ThreatConnect</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="border-t pt-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Referencias</h2>
          <div className="border-l-4 border-blue-600 pl-4">
            <ul className="space-y-3">
              <li>
                <a href="https://oasis-open.github.io/cti-documentation/" className="flex items-center text-blue-600 hover:underline">
                  <FiExternalLink className="mr-2" /> STIX/TAXII Docs
                </a>
              </li>
              <li>
                <a href="https://www.misp-project.org" className="flex items-center text-blue-600 hover:underline">
                  <FiExternalLink className="mr-2" /> MISP Project
                </a>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </ArticleLayout>
  );
}
