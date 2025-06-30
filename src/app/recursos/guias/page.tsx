import { useState } from 'react';
import { guias as allGuias } from '@/data/guias';
import GuiaCard from '@/components/GuiaCard';

export default function GuiasPage() {
  
    
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


  const [categoryFilter, setCategoryFilter] = useState<string>('Todas');
  const [search, setSearch] = useState('');
  const categorias = Array.from(new Set(allGuias.map((g) => g.categoria)));
  const filteredGuias = allGuias.filter(
    (g) =>
      (categoryFilter === 'Todas' || g.categoria === categoryFilter) &&
      (g.titulo.toLowerCase().includes(search.toLowerCase()) ||
        g.descripcion.toLowerCase().includes(search.toLowerCase()))
  );

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

        

        {/* Buscador */}
        <div className="max-w-md mx-auto mb-8">
          <input
            type="search"
            placeholder="Buscar guía..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Filtros */}
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          {['Todas', ...categorias].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-4 py-2 rounded-lg shadow transition ${
                categoryFilter === cat
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
              aria-pressed={categoryFilter === cat}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Lista de guías */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredGuias.map((guia) => (
            <GuiaCard key={guia.id} guia={guia} />
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
