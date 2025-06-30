import ArticleLayout from '@/components/wiki/ArticleLayout';
import { FiExternalLink } from 'react-icons/fi';

export default function ArtefactosWindowsPage() {
  return (
    <ArticleLayout 
      title="Artefactos Windows"
      description="ShimCache, AmCache y otros artefactos forenses"
      backUrl="/recursos/wiki/forense"
    >
      <div className="space-y-10 text-gray-800">
        <section className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Artefactos Clave</h2>
          <div className="prose max-w-none">
            <ul className="list-disc pl-6 space-y-2 mb-4 text-gray-700">
              <li><strong>ShimCache:</strong> Ejecución histórica de programas</li>
              <li><strong>AmCache:</strong> Información de instalación de software</li>
              <li><strong>Prefetch:</strong> Archivos precargados para rendimiento</li>
              <li><strong>JumpLists:</strong> Accesos recientes a documentos</li>
            </ul>
          </div>
        </section>

        <section className="bg-blue-50 p-6 rounded-lg border border-blue-200">
          <h2 className="text-2xl font-bold mb-4 text-blue-800">Ubicaciones</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white p-3 rounded shadow">
              <h3 className="font-semibold text-gray-900">ShimCache</h3>
              <ul className="list-disc pl-5 mt-2 text-sm text-gray-700">
                <li>SYSTEM\CurrentControlSet\Control\Session Manager\AppCompatCache</li>
                <li>Mantiene hasta 96 entradas</li>
              </ul>
            </div>
            <div className="bg-white p-3 rounded shadow">
              <h3 className="font-semibold text-gray-900">AmCache</h3>
              <ul className="list-disc pl-5 mt-2 text-sm text-gray-700">
                <li>%SystemRoot%\AppCompat\Programs\Amcache.hve</li>
                <li>Incluye hashes de archivos</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="border-t pt-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Referencias</h2>
          <div className="border-l-4 border-blue-600 pl-4">
            <ul className="space-y-3">
              <li>
                <a href="https://www.fireeye.com/blog/threat-research/2017/05/leveraging-application-compatibility-shims-for-persistence.html" className="flex items-center text-blue-600 hover:underline">
                  <FiExternalLink className="mr-2" /> FireEye ShimCache Analysis
                </a>
              </li>
              <li>
                <a href="https://www.mandiant.com/resources/amcache-still-the-same" className="flex items-center text-blue-600 hover:underline">
                  <FiExternalLink className="mr-2" /> Mandiant AmCache Research
                </a>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </ArticleLayout>
  );
}
