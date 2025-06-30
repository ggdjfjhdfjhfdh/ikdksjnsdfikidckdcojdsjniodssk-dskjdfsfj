import Link from 'next/link';
import DownloadButton from '@/components/DownloadButton';
import ShareButton from '@/components/ShareButton';
import BackButton from '@/components/BackButton';

export default function SeguridadContrasenas() {
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
              {/* Hero Section */}
              <div className="bg-transparent p-8 text-center">
                <span className="text-6xl mb-4 inline-block">🔑</span>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                  Guía Completa de Seguridad en Contraseñas
                </h1>
                <p className="text-xl text-gray-600 mb-4">
                  Protege tus cuentas con contraseñas robustas y prácticas seguras
                </p>
                <div className="flex justify-center gap-2">
                  <span className="text-xs font-semibold px-3 py-1 bg-blue-100 text-blue-800 rounded-full">
                    Seguridad
                  </span>
                  <span className="text-xs font-semibold px-3 py-1 bg-green-100 text-green-800 rounded-full">
                    Básico
                  </span>
                  <span className="text-xs font-semibold px-3 py-1 bg-blue-100 text-blue-800 rounded-full">
                    10 min lectura
                  </span>
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
                      ¿Por qué son importantes?
                    </h2>
                    <div className="h-0.5 bg-blue-200 flex-1 ml-4"></div>
                  </div>
                  
                  <p className="text-gray-800 mb-4">
                    Las contraseñas son las llaves de tu vida digital. Según el <strong>Verizon Data Breach Report 2023</strong>, el 81% de las brechas de seguridad son causadas por contraseñas vulnerables o robadas.
                  </p>
                  
                  <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 rounded-r-lg">
                    <h3 className="font-bold text-blue-800 mb-3 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                      Datos alarmantes
                    </h3>
                    <ul className="list-disc pl-5 space-y-2 text-gray-700">
                      <li>El 59% de usuarios reutiliza contraseñas en múltiples sitios</li>
                      <li>Las 5 contraseñas más comunes son predecibles: 123456, password, 123456789, etc.</li>
                      <li>Un ataque de fuerza bruta puede probar 100,000 millones de combinaciones por segundo</li>
                    </ul>
                  </div>
                </section>

                {/* Sección 2 */}
                <section className="mb-12">
                  <div className="flex items-center mb-6">
                    <div className="h-0.5 bg-blue-200 flex-1 mr-4"></div>
                    <h2 className="text-2xl font-bold text-gray-900 flex-shrink-0">
                      <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm mr-3">2</span>
                      Creación segura
                    </h2>
                    <div className="h-0.5 bg-blue-200 flex-1 ml-4"></div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                      <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        Frases de contraseña
                      </h3>
                      <p className="text-gray-700 mb-4">
                        Combina 4-6 palabras aleatorias que sean fáciles de recordar pero difíciles de adivinar.
                      </p>
                      <div className="bg-green-50 p-3 rounded-lg">
                        <p className="font-medium text-green-800 mb-2">Ejemplos:</p>
                        <ul className="text-sm space-y-1">
                          <li className="font-mono">GirafaTazaPianoLluvia</li>
                          <li className="font-mono">SandiaReloj$TrenElectrico</li>
                          <li className="font-mono">Murcielago@Teclado123</li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                      <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947z" clipRule="evenodd" />
                        </svg>
                        Reglas de complejidad
                      </h3>
                      <p className="text-gray-700 mb-4">
                        Estructura mínima recomendada por el NIST (Instituto Nacional de Estándares y Tecnología):
                      </p>
                      <ol className="list-decimal pl-5 space-y-2 text-gray-700">
                        <li>Mínimo 12 caracteres</li>
                        <li>Mezcla de mayúsculas/minúsculas</li>
                        <li>2 números no consecutivos</li>
                        <li>1 símbolo especial</li>
                        <li>Sin información personal</li>
                      </ol>
                    </div>
                  </div>
                </section>
                
                {/* Call to Action */}
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-xl border border-blue-200 mt-12">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">¿Listo para mejorar tu seguridad?</h3>
                  <p className="mb-4 text-gray-700">
                    Usa nuestro comprobador de contraseñas para evaluar la fortaleza de tus claves actuales y recibe recomendaciones personalizadas.
                  </p>
                  <Link 
                    href="/recursos/herramientas/comprobador-contrasenas"
                    className="inline-flex items-center px-5 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition shadow-md"
                  >
                    Probar comprobador
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
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 极 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                      </svg>
                      1. Creación de contraseñas
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-blue-600 hover:text-blue-800 text-sm flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 极 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                      </svg>
                      2. Gestores de contraseñas
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-blue-600 hover:text-blue-800 text-sm flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 极 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                      </svg>
                      3. Autenticación en dos pasos
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
