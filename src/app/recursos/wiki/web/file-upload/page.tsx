import ArticleLayout from '@/components/wiki/ArticleLayout';
import { FiExternalLink } from 'react-icons/fi';

export default function FileUploadPage() {
  return (
    <ArticleLayout 
      title="Insecure File Upload & Path Traversal"
      description="Riesgos y protecciones en subida de archivos y acceso a rutas"
      backUrl="/recursos/wiki/web"
    >
      <div className="space-y-10 text-gray-800">
        <section className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Vulnerabilidades Comunes</h2>
          <div className="prose max-w-none">
            <ul className="list-disc pl-6 space-y-2 mb-4 text-gray-700">
              <li><strong>Malicious File Execution:</strong> Subida de shells web</li>
              <li><strong>Path Traversal:</strong> Acceso a archivos fuera del directorio raíz</li>
              <li><strong>Content-Type Bypass:</strong> Evasión de validaciones</li>
              <li><strong>File Overwrite:</strong> Sobreescritura de archivos críticos</li>
            </ul>
          </div>
        </section>

        <section className="bg-blue-50 p-6 rounded-lg border border-blue-200">
          <h2 className="text-2xl font-bold mb-4 text-blue-800">Protecciones</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white p-3 rounded shadow text-center">
              <p className="font-semibold text-sm text-gray-900">Validación</p>
              <p className="text-xs text-gray-600">Extensiones, magic numbers</p>
            </div>
            <div className="bg-white p-3 rounded shadow text-center">
              <p className="font-semibold text-sm text-gray-900">Sanitización</p>
              <p className="text-xs text-gray-600">Nombres de archivo</p>
            </div>
            <div className="bg-white p-3 rounded shadow text-center">
              <p className="font-semibold text-sm text-gray-900">Almacenamiento</p>
              <p className="text-xs text-gray-600">Fuera del webroot</p>
            </div>
          </div>
        </section>

        <section className="border-t pt-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Mejores Prácticas</h2>
          <div className="prose max-w-none">
            <ol className="list-decimal pl-6 space-y-2 mb-4 text-gray-700">
              <li>Renombrar archivos con UUIDs</li>
              <li>Almacenar en buckets/almacenamiento externo</li>
              <li>Validar content-type y extensiones</li>
              <li>Usar listas blancas en lugar de negras</li>
            </ol>
          </div>
        </section>

        <section className="border-t pt-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Referencias</h2>
          <div className="border-l-4 border-blue-600 pl-4">
            <ul className="space-y-3">
              <li>
                <a href="https://owasp.org/www-community/vulnerabilities/Unrestricted_File_Upload" className="flex items-center text-blue-600 hover:underline">
                  <FiExternalLink className="mr-2" /> OWASP File Upload Guide
                </a>
              </li>
              <li>
                <a href="https://cheatsheetseries.owasp.org/cheatsheets/File_Upload_Cheat_Sheet.html" className="flex items-center text-blue-600 hover:underline">
                  <FiExternalLink className="mr-2" /> OWASP File Upload Cheat Sheet
                </a>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </ArticleLayout>
  );
}
