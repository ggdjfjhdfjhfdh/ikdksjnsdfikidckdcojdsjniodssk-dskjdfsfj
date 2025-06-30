import Link from 'next/link';
import DownloadButton from '@/components/DownloadButton';
import ShareButton from '@/components/ShareButton';
import BackButton from '@/components/BackButton';

export default function PrivacidadRedesSociales() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto mb-6 max-w-6xl">
        <BackButton href="/recursos/guias" label="Volver a todas las guías" />
      </div>
      
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8">
        <div className="flex-1 bg-white rounded-xl shadow-md overflow-hidden">
          {/* Hero Section - Estilo Seguridad en Contraseñas */}
          <div className="bg-transparent p-8 text-center">
            <span className="text-6xl mb-4 inline-block">🔒</span>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Privacidad en Redes Sociales
            </h1>
            <p className="text-xl text-gray-600 mb-4">
              Protege tu información personal y controla tu huella digital
            </p>
            <div className="flex justify-center gap-2">
              <span className="text-xs font-semibold px-3 py-1 bg-purple-100 text-purple-800 rounded-full">
                Privacidad
              </span>
              <span className="text-xs font-semibold px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full">
                Avanzado
              </span>
              <span className="text-xs font-semibold px-3 py-1 bg-blue-100 text-blue-800 rounded-full">
                15 min lectura
              </span>
            </div>
          </div>

          <div className="p-8">
            {/* Sección 1 - Estilo consistente */}
            <section className="mb-12">
              <div className="flex items-center mb-6">
                <div className="h-0.5 bg-blue-200 flex-1 mr-4"></div>
                <h2 className="text-2xl font-bold text-gray-900 flex-shrink-0">
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-lg font-bold mr-3">1</span>
                  Configuración Básica
                </h2>
                <div className="h-0.5 bg-blue-200 flex-1 ml-4"></div>
              </div>
              
              <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
                <p className="font-medium text-gray-900 mb-2">🔐 Configuraciones esenciales:</p>
                <ul className="list-disc pl-5 space-y-1 text-gray-800">
                  <li>Perfil privado (solo para seguidores aprobados)</li>
                  <li>Limitar quién puede comentar en tus publicaciones</li>
                  <li>Desactivar la geolocalización automática</li>
                  <li>Revisar permisos de aplicaciones conectadas</li>
                </ul>
              </div>
            </section>

            {/* Mantener resto de secciones con el mismo estilo */}
            <section className="mb-12">
              <div className="flex items-center mb-6">
                <div className="h-0.5 bg-blue-200 flex-1 mr-4"></div>
                <h2 className="text-2xl font-bold text-gray-900 flex-shrink-0">
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-lg font-bold mr-3">2</span>
                  Plataformas Principales
                </h2>
                <div className="h-0.5 bg-blue-200 flex-1 ml-4"></div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white border border-gray-200 p-5 rounded-lg shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <span className="text-blue-600">Facebook</span>
                  </h3>
                  <ol className="list-decimal pl-5 space-y-2 text-gray-800">
                    <li>Ve a Configuración → Privacidad</li>
                    <li>Configura "Quién puede ver tus publicaciones" como "Amigos"</li>
                    <li>Revisa "Cómo las personas pueden encontrarte y contactarte"</li>
                    <li>Desactiva "Face Recognition" si no lo usas</li>
                  </ol>
                </div>
                
                <div className="bg-white border border-gray-200 p-5 rounded-lg shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <span className="text-pink-600">Instagram</span>
                  </h3>
                  <ol className="list-decimal pl-5 space-y-2 text-gray-800">
                    <li>Activa cuenta privada</li>
                    <li>Configura "Comentarios" para filtrar ofensas</li>
                    <li>Desactiva "Mostrar actividad"</li>
                    <li>Revisa "Etiquetado" y "Menciones"</li>
                  </ol>
                </div>
              </div>
            </section>

            <section className="mb-12">
              <div className="flex items-center mb-6">
                <div className="h-0.5 bg-blue-200 flex-1 mr-4"></div>
                <h2 className="text-2xl font-bold text-gray-900 flex-shrink-0">
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-lg font-bold mr-3">3</span>
                  Consejos Avanzados
                </h2>
                <div className="h-0.5 bg-blue-200 flex-1 ml-4"></div>
              </div>
              
              <div className="space-y-4 text-gray-800">
                <p>
                  <strong className="text-gray-900">Revisión trimestral:</strong> Haz una auditoría de privacidad cada 3 meses ya que las plataformas actualizan frecuentemente sus políticas.
                </p>
                <p>
                  <strong className="text-gray-900">Huella digital:</strong> Busca tu nombre en Google para ver qué información es pública.
                </p>
                <p>
                  <strong className="text-gray-900">Datos personales:</strong> Nunca publiques documentos oficiales, boletos de viaje o fotos con direcciones visibles.
                </p>
              </div>
            </section>

            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Herramientas útiles</h3>
              <p className="mb-4 text-gray-800">
                Descarga tu información periódicamente para saber qué datos tienen las plataformas sobre ti.
              </p>
              <Link 
                href="#"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
              >
                Ver tutorial de descarga de datos
              </Link>
            </div>
          </div>
        </div>
        
        <div className="md:w-64 flex-shrink-0">
          <div className="bg-white p-6 rounded-xl shadow-md sticky top-4 space-y-4">
            <h3 className="font-bold text-gray-900">Contenido</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-blue-600 hover:underline">1. Configuración Básica</a></li>
              <li><a href="#" className="text-blue-600 hover:underline">2. Plataformas Principales</a></li>
              <li><a href="#" className="text-blue-600 hover:underline">3. Consejos Avanzados</a></li>
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
