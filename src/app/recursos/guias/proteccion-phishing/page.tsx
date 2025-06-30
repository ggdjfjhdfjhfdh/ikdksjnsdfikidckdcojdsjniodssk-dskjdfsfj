import Link from 'next/link';
import DownloadButton from '@/components/DownloadButton';
import ShareButton from '@/components/ShareButton';
import BackButton from '@/components/BackButton';

export default function ProteccionPhishing() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <BackButton href="/recursos/guias" label="Volver a todas las guías" />
      
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8">
        {/* Contenido principal */}
        <div className="flex-1 bg-white rounded-xl shadow-md overflow-hidden">
          {/* Hero Section */}
          <div className="bg-transparent p-8 text-center">
            <span className="text-6xl mb-4 inline-block">🎣</span>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Protección contra Phishing
            </h1>
            <p className="text-xl text-gray-600 mb-4">
              Aprende a identificar y protegerte de intentos de phishing y estafas en línea
            </p>
            <div className="flex justify-center gap-2">
              <span className="text-xs font-semibold px-3 py-1 bg-red-100 text-red-800 rounded-full">
                Seguridad
              </span>
              <span className="text-xs font-semibold px-3 py-1 bg-orange-100 text-orange-800 rounded-full">
                Intermedio
              </span>
              <span className="text-xs font-semibold px-3 py-1 bg-blue-100 text-blue-800 rounded-full">
                10 min lectura
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
                  ¿Qué es el phishing?
                </h2>
                <div className="h-0.5 bg-blue-200 flex-1 ml-4"></div>
              </div>
              
              <p className="mb-4 text-gray-800">
                Técnica fraudulenta donde los atacantes se hacen pasar por entidades legítimas para robar información sensible como contraseñas o datos bancarios.
              </p>
              
              <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
                <p className="font-medium text-gray-900 mb-2">⚠️ Señales de alerta:</p>
                <ul className="list-disc pl-5 space-y-1 text-gray-800">
                  <li>Urgencia o amenazas en el mensaje</li>
                  <li>Errores gramaticales o ortográficos</li>
                  <li>Enlaces que no coinciden con el dominio oficial</li>
                  <li>Solicitud de información personal</li>
                </ul>
              </div>
            </section>

            {/* Sección 2 */}
            <section className="mb-12">
              <div className="flex items-center mb-6">
                <div className="h-0.5 bg-blue-200 flex-1 mr-4"></div>
                <h2 className="text-2xl font-bold text-gray-900 flex-shrink-0">
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-lg font-bold mr-3">2</span>
                  Tipos comunes
                </h2>
                <div className="h-0.5 bg-blue-200 flex-1 ml-4"></div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white border border-gray-200 p-5 rounded-lg shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Email Phishing</h3>
                  <ul className="list-disc pl-5 space-y-2 text-gray-800">
                    <li>Imitan bancos, servicios populares o empresas</li>
                    <li>Incluyen enlaces a sitios falsos</li>
                    <li>Usan logos y diseños similares a los oficiales</li>
                  </ul>
                </div>
                
                <div className="bg-white border border-gray-200 p-5 rounded-lg shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Smishing (SMS)</h3>
                  <ul className="list-disc pl-5 space-y-2 text-gray-800">
                    <li>Mensajes SMS con enlaces maliciosos</li>
                    <li>Afirman ser de servicios de paquetería</li>
                    <li>Ofrecen premios o descuentos falsos</li>
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
                  Cómo protegerte
                </h2>
                <div className="h-0.5 bg-blue-200 flex-1 ml-4"></div>
              </div>
              
              <div className="space-y-4 text-gray-800">
                <p>
                  <strong className="text-gray-900">Verifica los enlaces:</strong> Pasa el cursor sobre ellos antes de hacer clic y revisa el dominio real.
                </p>
                <p>
                  <strong className="text-gray-900">No descargues archivos:</strong> De remitentes desconocidos o inesperados.
                </p>
                <p>
                  <strong className="text-gray-900">Usa autenticación:</strong> La autenticación en dos pasos previene el acceso incluso si roban tu contraseña.
                </p>
              </div>
            </section>

            {/* CTA */}
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-3">¿Has sido víctima de phishing?</h3>
              <p className="mb-4 text-gray-800">
                Cambia inmediatamente tus contraseñas y activa la verificación en dos pasos.
              </p>
              <Link 
                href="/recursos/herramientas/comprobador-contrasenas"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
              >
                Verificar seguridad de contraseñas
              </Link>
            </div>
          </div>
        </div>
        
        {/* Barra lateral */}
        <div className="md:w-64 flex-shrink-0">
          <div className="bg-white p-6 rounded-xl shadow-md sticky top-4 space-y-4">
            <h3 className="font-bold text-gray-900">Contenido</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-blue-600 hover:underline">1. ¿Qué es el phishing?</a></li>
              <li><a href="#" className="text-blue-600 hover:underline">2. Tipos comunes</a></li>
              <li><a href="#" className="text-blue-600 hover:underline">3. Cómo protegerte</a></li>
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
