'use client';

import { useState } from 'react';
import Link from 'next/link';
import BackButton from '@/components/BackButton';

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
      titulo: 'Guía de seguridad de contraseñas',
      descripcion: 'Aprende a crear contraseñas seguras y a proteger tus cuentas',
      icono: '🔐',
      categoria: 'seguridad',
      nivel: 'básico',
      ruta: '/recursos/guias/seguridad-contrasenas'
    },
    {
      id: 2,
      titulo: 'Guía de autenticación de dos factores',
      descripcion: 'Aprende a proteger tus cuentas con autenticación de dos factores',
      icono: '🛡️',
      categoria: 'seguridad',
      nivel: 'intermedio',
      ruta: '/recursos/guias/autenticacion-dos-pasos'
    },
    {
      id: 3,
      titulo: 'Guía de privacidad en redes sociales',
      descripcion: 'Aprende a proteger tu privacidad en redes sociales',
      icono: '🔒',
      categoria: 'privacidad',
      nivel: 'avanzado',
      ruta: '/recursos/guias/privacidad-redes-sociales'
    },
    {
      id: 4,
      titulo: 'Guía de protección contra phishing',
      descripcion: 'Aprende a protegerte contra ataques de phishing',
      icono: '🎣',
      categoria: 'seguridad',
      nivel: 'intermedio',
      ruta: '/recursos/guias/proteccion-phishing'
    },
    {
      id: 5,
      titulo: 'Guía de gestión de copias de seguridad',
      descripcion: 'Aprende a crear copias de seguridad de tus datos',
      icono: '💾',
      categoria: 'organización',
      nivel: 'básico',
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
    <div className="bg-gray-50 min-h-screen py-8">
      <BackButton href="/recursos" className="mb-6" />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Guías de Seguridad Digital</h1>
          <p className="text-lg text-gray-600 mb-8">Aprende mejores prácticas para proteger tu información</p>
        </div>

        {/* Filtros */}
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          {filterButtons.map((button) => (
            <button
              key={button.id}
              onClick={() => setActiveFilter(button.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeFilter === button.id 
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
          <h3 className="text-2xl font-bold text-gray-900 mb-4">¿Necesitas ayuda?</h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Si tienes alguna pregunta o necesitas ayuda con alguna de nuestras guías, no dudes en contactarnos.
          </p>
          <Link 
            href="/contact"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Contáctanos
          </Link>
        </div>
      </main>
    </div>
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
        <h3 className="text-xl font-semibold mb-2">{guia.titulo}</h3>
        <p className="text-gray-600 mb-4">{guia.descripcion}</p>
        <p className="text-sm text-gray-500">Nivel: {guia.nivel}</p>
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
