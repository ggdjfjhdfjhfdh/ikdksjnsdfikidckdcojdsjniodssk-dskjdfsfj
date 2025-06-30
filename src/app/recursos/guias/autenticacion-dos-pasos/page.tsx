import Link from 'next/link';
import DownloadButton from '@/components/DownloadButton';
import ShareButton from '@/components/ShareButton';
import BackButton from '@/components/BackButton';

export default function AutenticacionDosPasos() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* Botón de volver */}
      <div className="container mx-auto mb-6 max-w-6xl">
        <BackButton href="/recursos/guias" label="Volver a todas las guías" />
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Contenido principal */}
          <div className="flex-1">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              {/* Hero Section con fondo transparente */}
              <div className="p-8 text-center">
                <div className="max-w-3xl mx-auto">
                  <span className="text-5xl mb-4 inline-block">🔒</span>
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    Guía Completa de Autenticación en Dos Pasos
                  </h1>
                  <p className="text-gray-600 text-lg">
                    Protege tus cuentas con una capa adicional de seguridad
                  </p>
                  <div className="flex justify-center gap-3 mt-6">
                    <span className="text-xs font-semibold px-3 py-1 bg-blue-500/10 rounded-full">
                      Seguridad
                    </span>
                    <span className="text-xs font-semibold px-3 py-1 bg-green-500/10 rounded-full">
                      Intermedio
                    </span>
                    <span className="text-xs font-semibold px-3 py-1 bg-yellow-500/10 rounded-full">
                      12 min lectura
                    </span>
                  </div>
                </div>
              </div>

              {/* Contenido */}
              <div className="p-8 prose prose-lg max-w-none">
                {/* Sección 1 */}
                <section className="mb-12">
                  <div className="flex items-center mb-6">
                    <div className="h-0.5 bg-blue-200 flex-1 mr-4"></div>
                    <h2 className="text-2xl font-bold text-gray-900 flex-shrink-0">
                      <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm mr-3">1</span>
                      ¿Qué es la autenticación en dos pasos?
                    </h2>
                    <div className="h-0.5 bg-blue-200 flex-1 ml-4"></div>
                  </div>
                  
                  <p className="text-gray-800 mb-4">
                    La autenticación en dos pasos (2FA) añade una segunda capa de seguridad a tus cuentas. Según <strong>Google Security Blog</strong>, el 2FA bloquea el 100% de los bots automatizados, el 96% de los ataques de phishing y el 76% de los ataques dirigidos.
                  </p>
                  
                  <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 rounded-r-lg">
                    <h3 className="font-bold text-blue-800 mb-3 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                      ¿Por qué es crucial?
                    </h3>
                    <ul className="list-disc pl-5 space-y-2 text-gray-700">
                      <li>Previene el acceso no autorizado incluso si tu contraseña es comprometida</li>
                      <li>Las cuentas con 2FA habilitado tienen un 99.9% menos de probabilidades de ser hackeadas</li>
                      <li>Requerido por estándares de seguridad como PCI DSS para transacciones financieras</li>
                    </ul>
                  </div>
                </section>

                {/* Sección 2 */}
                <section className="mb-12">
                  <div className="flex items-center mb-6">
                    <div className="h-0.5 bg-blue-200 flex-1 mr-4"></div>
                    <h2 className="text-2xl font-bold text-gray-900 flex-shrink-0">
                      <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm mr-3">2</span>
                      Métodos disponibles
                    </h2>
                    <div className="h-0.5 bg-blue-200 flex-1 ml-4"></div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                      <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        Aplicaciones autenticadoras
                      </h3>
                      <p className="text-gray-700 mb-4">
                        Generan códigos temporales incluso sin conexión:
                      </p>
                      <ul className="text-sm space-y-2 text-gray-700">
                        <li><strong>Google Authenticator</strong> - Simple y ampliamente compatible</li>
                        <li><strong>Authy</strong> - Copia de seguridad en la nube</li>
                        <li><strong>Microsoft Authenticator</strong> - Notificaciones push</li>
                      </ul>
                    </div>
                    
                    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                      <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                        </svg>
                        Llaves de seguridad física
                      </h3>
                      <p className="text-gray-700 mb-4">
                        Dispositivos USB/NFC resistentes a phishing:
                      </p>
                      <ul className="text-sm space-y-2 text-gray-700">
                        <li><strong>YubiKey</strong> - Estándar de la industria</li>
                        <li><strong>Google Titan</strong> - Doble chip de seguridad</li>
                        <li><strong>SoloKeys</strong> - Open source</li>
                      </ul>
                    </div>
                  </div>
                </section>
                
                {/* Call to Action */}
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-xl border border-blue-200 mt-12">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">¿Listo para activar 2FA?</h3>
                  <p className="mb-4 text-gray-700">
                    Consulta nuestras guías paso a paso para habilitar autenticación en dos pasos en servicios populares.
                  </p>
                  <Link 
                    href="/recursos/guias"
                    className="inline-flex items-center px-5 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition shadow-md"
                  >
                    Ver todas las guías
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          
          {/* Barra lateral */}
          <div className="lg:w-64">
            <div className="bg-white p-6 rounded-xl shadow-md sticky top-4 space-y-4">
              <DownloadButton />
              <ShareButton />
              <div className="pt-4 border-t border-gray-200">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">En esta guía</h3>
                <ul className="space-y-2">
                  <li>
                    <a href="#" className="text-blue-600 hover:text-blue-800 text-sm flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                      </svg>
                      Introducción al 2FA
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-blue-600 hover:text-blue-800 text-sm flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                      </svg>
                      Métodos disponibles
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-blue-600 hover:text-blue-800 text-sm flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                      </svg>
                      Configuración por servicio
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
