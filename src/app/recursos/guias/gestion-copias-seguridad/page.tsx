import Link from 'next/link';
import DownloadButton from '@/components/DownloadButton';
import ShareButton from '@/components/ShareButton';
import BackButton from '@/components/BackButton';

export default function GestionCopiasSeguridad() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* Botón de volver */}
      <div className="container mx-auto mb-6 max-w-6xl">
        <BackButton href="/recursos/guias" label="Volver a todas las guías" />
      </div>
      
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8">
        {/* Contenido principal */}
        <div className="flex-1 bg-white rounded-xl shadow-md overflow-hidden">
          {/* Hero Section */}
          <div className="bg-transparent p-8 text-center">
            <span className="text-6xl mb-4 inline-block">💾</span>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Gestión de Copias de Seguridad
            </h1>
            <p className="text-xl text-gray-600 mb-4">
              Protege tus datos con estrategias efectivas de respaldo y recuperación
            </p>
            <div className="flex justify-center gap-2">
              <span className="text-xs font-semibold px-3 py-1 bg-green-100 text-green-800 rounded-full">
                Datos
              </span>
              <span className="text-xs font-semibold px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full">
                Intermedio
              </span>
              <span className="text-xs font-semibold px-3 py-1 bg-blue-100 text-blue-800 rounded-full">
                12 min lectura
              </span>
            </div>
          </div>

          {/* Contenido */}
          <div className="p-8">
            {/* Sección 1 */}
            <section className="mb-12">
              <div className="flex items-center mb-6">
                <div className="h-0.5 bg-blue-200 flex-1 mr-4"></div>
                <h2 className="text-2xl font-bold text-gray-900 flex-shrink-0">
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-lg font-bold mr-3">1</span>
                  Importancia de las copias
                </h2>
                <div className="h-0.5 bg-blue-200 flex-1 ml-4"></div>
              </div>
              
              <p className="mb-4 text-gray-800">
                Las copias de seguridad son tu última línea de defensa contra pérdida de datos por fallos hardware, ransomware o errores humanos.
              </p>
              
              <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-6">
                <p className="font-medium text-gray-900 mb-2">📊 Datos clave:</p>
                <ul className="list-disc pl-5 space-y-1 text-gray-800">
                  <li>60% de las PYMEs que pierden sus datos cierran en 6 meses</li>
                  <li>El 96% de los servidores con backups completos sobreviven a desastres</li>
                  <li>El costo promedio de pérdida de datos es $3.92 millones</li>
                </ul>
              </div>
            </section>

            {/* Sección 2 */}
            <section className="mb-12">
              <div className="flex items-center mb-6">
                <div className="h-0.5 bg-blue-200 flex-1 mr-4"></div>
                <h2 className="text-2xl font-bold text-gray-900 flex-shrink-0">
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-lg font-bold mr-3">2</span>
                  Métodos de backup
                </h2>
                <div className="h-0.5 bg-blue-200 flex-1 ml-4"></div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white border border-gray-200 p-5 rounded-lg shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Regla 3-2-1</h3>
                  <ul className="list-disc pl-5 space-y-2 text-gray-800">
                    <li>3 copias de tus datos</li>
                    <li>2 medios de almacenamiento diferentes</li>
                    <li>1 copia fuera del sitio</li>
                  </ul>
                </div>
                
                <div className="bg-white border border-gray-200 p-5 rounded-lg shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Soluciones recomendadas</h3>
                  <ul className="list-disc pl-5 space-y-2 text-gray-800">
                    <li>Cloud: Backblaze, Google Drive, AWS S3</li>
                    <li>Local: NAS, discos externos</li>
                    <li>Híbrido: Combinación cloud + local</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Sección 3 */}
            <section className="mb-12">
              <div className="flex items-center mb-6">
                <div className="h-0.5 bg-blue-200 flex-1 mr-4"></div>
                <h2 className="text-2xl font-bold text-gray-900 flex-shrink-0">
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-lg font-bold mr-3">3</span>
                  Frecuencia recomendada
                </h2>
                <div className="h-0.5 bg-blue-200 flex-1 ml-4"></div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="py-2 px-4 border-b text-left text-gray-900">Tipo de dato</th>
                      <th className="py-2 px-4 border-b text-left text-gray-900">Frecuencia</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="py-2 px-4 border-b text-gray-800">Documentos personales</td>
                      <td className="py-2 px-4 border-b text-gray-800">Diaria</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4 border-b text-gray-800">Fotos y videos</td>
                      <td className="py-2 px-4 border-b text-gray-800">Semanal</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4 border-b text-gray-800">Sistema operativo</td>
                      <td className="py-2 px-4 border-b text-gray-800">Mensual</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* CTA */}
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-3">¿No tienes un sistema de backups?</h3>
              <p className="mb-4 text-gray-800">
                Configura hoy mismo tu primera copia de seguridad automatizada.
              </p>
              <Link 
                href="#"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
              >
                Configurar backups automáticos
              </Link>
            </div>
          </div>
        </div>
        
        {/* Barra lateral */}
        <div className="md:w-64 flex-shrink-0">
          <div className="bg-white p-6 rounded-xl shadow-md sticky top-4 space-y-4">
            <h3 className="font-bold text-gray-900">Contenido</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-blue-600 hover:underline">1. Importancia de las copias</a></li>
              <li><a href="#" className="text-blue-600 hover:underline">2. Métodos de backup</a></li>
              <li><a href="#" className="text-blue-600 hover:underline">3. Frecuencia recomendada</a></li>
            </ul>
            <div className="mt-4">
              <DownloadButton />
              <ShareButton />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
