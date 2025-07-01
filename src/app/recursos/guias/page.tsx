'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Guia {
  id: number;
  titulo: string;
  descripcion: string;
  icono: string;
  categoria: string;
  nivel: string;
  ruta: string;
}

export default function GuiasPage() {
  const [activeFilter, setActiveFilter] = useState('all');

  const guias: Guia[] = [
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

  const filteredGuias = activeFilter === 'all' 
    ? guias 
    : guias.filter(guia => {
        // Normalize category names for comparison
        const normalizedCategory = guia.categoria.toLowerCase();
        return normalizedCategory.includes(activeFilter);
      });

  const filterButtons = [
    { id: 'all', label: 'Todas' },
    { id: 'seguridad', label: 'Seguridad' },
    { id: 'privacidad', label: 'Privacidad' },
    { id: 'organización', label: 'Organización' }
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
          {filterButtons.map((button) => (
            <button
              key={button.id}
              onClick={() => setActiveFilter(button.id)}
              className={`px-4 py-2 rounded-lg shadow transition ${activeFilter === button.id 
                ? 'bg-blue-600 text-white' 
                : 'bg-white text-gray-700 hover:bg-gray-100'}`}
            >
              {button.label}
            </button>
          ))}
        </div>

        {/* Lista de guías */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredGuias.map((guia) => (
            <GuideCard key={guia.id} guia={guia} />
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">¿No encuentras lo que buscas?</h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Déjanos saber qué tema te gustaría que cubramos en nuestras próximas guías
          </p>
          <Link 
            href="/contact"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Sugerir un Tema
          </Link>
        </div>
      </div>
    </main>
  );
}

function GuideCard({ guia }: { guia: Guia }) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
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
  );
}
