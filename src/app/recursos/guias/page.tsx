import Link from 'next/link';

export default function GuiasPage() {
  const guias = [
    {
      id: 1,
      titulo: 'Seguridad en contraseñas',
      descripcion: 'Aprende a crear y gestionar contraseñas seguras para proteger tus cuentas',
      icono: '🔐',
      categoria: 'Seguridad',
      nivel: 'Básico',
      ruta: '/recursos/guias/seguridad-contrasenas'
    },
    {
      id: 2,
      titulo: 'Autenticación en dos pasos',
      descripcion: 'Protege tus cuentas con una capa adicional de seguridad',
      icono: '🛡️',
      categoria: 'Seguridad',
      nivel: 'Intermedio',
      ruta: '/recursos/guias/autenticacion-dos-pasos'
    },
    {
      id: 3,
      titulo: 'Privacidad en redes sociales',
      descripcion: 'Controla tu información personal en plataformas sociales',
      icono: '🔒',
      categoria: 'Privacidad',
      nivel: 'Avanzado',
      ruta: '/recursos/guias/privacidad-redes-sociales'
    },
    {
      id: 4,
      titulo: 'Protección contra phishing',
      descripcion: 'Identifica y evita intentos de estafa en línea',
      icono: '🎣',
      categoria: 'Seguridad',
      nivel: 'Intermedio',
      ruta: '/recursos/guias/proteccion-phishing'
    },
    {
      id: 5,
      titulo: 'Gestión de copias de seguridad',
      descripcion: 'Protege tus datos importantes con backups efectivos',
      icono: '💾',
      categoria: 'Organización',
      nivel: 'Básico',
      ruta: '/recursos/guias/gestion-copias-seguridad'
    }
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Guías de Seguridad Digital
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Aprende las mejores prácticas para proteger tu información digital
          </p>
        </div>

        {/* Filtros */}
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition">
            Todas
          </button>
          <button className="px-4 py-2 bg-white text-gray-700 rounded-lg shadow hover:bg-gray-100 transition">
            Seguridad
          </button>
          <button className="px-4 py-2 bg-white text-gray-700 rounded-lg shadow hover:bg-gray-100 transition">
            Privacidad
          </button>
          <button className="px-4 py-2 bg-white text-gray-700 rounded-lg shadow hover:bg-gray-100 transition">
            Protección de datos
          </button>
        </div>

        {/* Lista de guías */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {guias.map((guia) => (
            <div 
              key={guia.id} 
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="p-6">
                <div className="text-4xl mb-4">{guia.icono}</div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-semibold px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                    {guia.categoria}
                  </span>
                  <span className="text-xs font-semibold px-2 py-1 bg-gray-100 text-gray-800 rounded-full">
                    {guia.nivel}
                  </span>
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">{guia.titulo}</h2>
                <p className="text-gray-600 mb-4">{guia.descripcion}</p>
                <Link 
                  href={guia.ruta}
                  className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
                >
                  Ver guía completa
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">¿No encuentras lo que buscas?</h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Déjanos saber qué tema te gustaría que cubramos en nuestras próximas guías
          </p>
          <button className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition font-medium">
            Sugerir un tema
          </button>
        </div>
      </div>
    </main>
  );
}
