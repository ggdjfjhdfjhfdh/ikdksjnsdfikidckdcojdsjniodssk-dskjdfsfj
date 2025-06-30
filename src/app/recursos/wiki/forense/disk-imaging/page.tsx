import ArticleLayout from '@/components/wiki/ArticleLayout';
import { FiExternalLink } from 'react-icons/fi';

export default function DiskImagingPage() {
  return (
    <ArticleLayout 
      title="Disk Imaging"
      description="Adquisición forense con write-blocking"
      backUrl="/recursos/wiki/forense"
    >
      <div className="space-y-10 text-gray-800">
        <section className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Métodos de Adquisición</h2>
          <div className="prose max-w-none">
            <ul className="list-disc pl-6 space-y-2 mb-4 text-gray-700">
              <li><strong>Raw Image:</strong> Bit-for-bit copy (dd, FTK Imager)</li>
              <li><strong>E01:</strong> Formato EnCase comprimido</li>
              <li><strong>AFF:</strong> Advanced Forensic Format</li>
              <li><strong>Live Imaging:</strong> Adquisición en sistemas encendidos</li>
            </ul>
          </div>
        </section>

        <section className="bg-blue-50 p-6 rounded-lg border border-blue-200">
          <h2 className="text-2xl font-bold mb-4 text-blue-800">Write-Blocking</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white p-3 rounded shadow">
              <h3 className="font-semibold text-gray-900">Hardware</h3>
              <ul className="list-disc pl-5 mt-2 text-sm text-gray-700">
                <li>Tableau Forensic Bridges</li>
                <li>WiebeTech Forensic Drivedock</li>
                <li>CRU WriteBlocker</li>
              </ul>
            </div>
            <div className="bg-white p-3 rounded shadow">
              <h3 className="font-semibold text-gray-900">Software</h3>
              <ul className="list-disc pl-5 mt-2 text-sm text-gray-700">
                <li>Linux (read-only mounts)</li>
                <li>Windows Forensic Toolchest</li>
                <li>macOS Target Disk Mode</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="border-t pt-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Referencias</h2>
          <div className="border-l-4 border-blue-600 pl-4">
            <ul className="space-y-3">
              <li>
                <a href="https://www.cfreds.nist.gov/" className="flex items-center text-blue-600 hover:underline">
                  <FiExternalLink className="mr-2" /> NIST CFReDS
                </a>
              </li>
              <li>
                <a href="https://www.sleuthkit.org/" className="flex items-center text-blue-600 hover:underline">
                  <FiExternalLink className="mr-2" /> The Sleuth Kit
                </a>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </ArticleLayout>
  );
}
