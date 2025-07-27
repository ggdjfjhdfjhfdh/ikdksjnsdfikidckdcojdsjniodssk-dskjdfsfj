'use client';

import { useState } from 'react';
import Link from 'next/link';
import BackButton from '@/components/BackButton';
import { Shield, Lock, Users, HardDrive, MessageSquare, Clock, BookOpen, Star, TrendingUp } from 'lucide-react';

interface Guia {
  id: number;
  titulo: string;
  descripcion: string;
  icon: any;
  categoria: string;
  nivel: string;
  ruta: string;
  tiempoLectura: string;
  popularidad: number;
  fechaActualizacion: string;
  tags: string[];
}

export default function GuiasPage() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [sortBy, setSortBy] = useState('popularidad');

  const guias: Guia[] = [
    {
      id: 1,
      titulo: 'Guía de seguridad de contraseñas',
      descripcion: 'Aprende a crear contraseñas seguras y a proteger tus cuentas con técnicas modernas y gestores de contraseñas',
      icon: Lock,
      categoria: 'seguridad',
      nivel: 'básico',
      ruta: '/recursos/guias/seguridad-contrasenas',
      tiempoLectura: '8 min',
      popularidad: 95,
      fechaActualizacion: '2024-01-15',
      tags: ['contraseñas', 'gestores', 'MFA']
    },
    {
      id: 2,
      titulo: 'Guía de autenticación de dos factores',
      descripcion: 'Aprende a proteger tus cuentas con autenticación de dos factores y bloquea el 96% de ataques',
      icon: Shield,
      categoria: 'seguridad',
      nivel: 'intermedio',
      ruta: '/recursos/guias/autenticacion-dos-pasos',
      tiempoLectura: '6 min',
      popularidad: 88,
      fechaActualizacion: '2024-01-10',
      tags: ['2FA', 'TOTP', 'FIDO2']
    },
    {
      id: 3,
      titulo: 'Guía de privacidad en redes sociales',
      descripcion: 'Aprende a proteger tu privacidad en redes sociales y controlar tu huella digital',
      icon: Users,
      categoria: 'privacidad',
      nivel: 'avanzado',
      ruta: '/recursos/guias/privacidad-redes-sociales',
      tiempoLectura: '12 min',
      popularidad: 76,
      fechaActualizacion: '2024-01-08',
      tags: ['privacidad', 'redes sociales', 'datos']
    },
    {
      id: 4,
      titulo: 'Guía de protección contra phishing',
      descripcion: 'Aprende a identificar y protegerte contra ataques de phishing y ingeniería social',
      icon: MessageSquare,
      categoria: 'seguridad',
      nivel: 'intermedio',
      ruta: '/recursos/guias/proteccion-phishing',
      tiempoLectura: '10 min',
      popularidad: 82,
      fechaActualizacion: '2024-01-12',
      tags: ['phishing', 'email', 'ingeniería social']
    },
    {
      id: 5,
      titulo: 'Guía de gestión de copias de seguridad',
      descripcion: 'Aprende a crear y gestionar copias de seguridad efectivas con la regla 3-2-1',
      icon: HardDrive,
      categoria: 'organización',
      nivel: 'básico',
      ruta: '/recursos/guias/gestion-copias-seguridad',
      tiempoLectura: '15 min',
      popularidad: 71,
      fechaActualizacion: '2024-01-05',
      tags: ['backup', 'recuperación', 'almacenamiento']
    }
  ];

  const categorias = ['all', 'seguridad', 'privacidad', 'organización'];
  const niveles = ['all', 'básico', 'intermedio', 'avanzado'];

  const filteredGuias = guias.filter(guia => {
    if (activeFilter === 'all') return true;
    return guia.categoria === activeFilter;
  }).sort((a, b) => {
    if (sortBy === 'popularidad') return b.popularidad - a.popularidad;
    if (sortBy === 'fecha') return new Date(b.fechaActualizacion).getTime() - new Date(a.fechaActualizacion).getTime();
    if (sortBy === 'tiempo') return parseInt(a.tiempoLectura) - parseInt(b.tiempoLectura);
    return 0;
  });

  const filterButtons = [
    { id: 'all', label: 'Todas' },
    { id: 'seguridad', label: 'Seguridad' },
    { id: 'privacidad', label: 'Privacidad' },
    { id: 'organización', label: 'Organización' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <BackButton href="/recursos" className="mb-6" />
        
        {/* Hero Section */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center justify-center p-3 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mb-6">
            <BookOpen className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Guías de Seguridad
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Aprende a protegerte en el mundo digital con nuestras guías paso a paso, 
            actualizadas y diseñadas para todos los niveles de experiencia
          </p>
          <div className="flex items-center justify-center space-x-6 mt-6 text-sm text-gray-500">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>{guias.length} guías disponibles</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>Actualizadas regularmente</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span>Para todos los niveles</span>
            </div>
          </div>
        </div>

        {/* Controles de filtrado y ordenamiento */}
        <div className="mb-8 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            {/* Filtros por categoría */}
            <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
              <span className="text-sm font-medium text-gray-700">Filtrar por:</span>
              <div className="flex flex-wrap gap-2">
                {categorias.map((categoria) => (
                  <button
                    key={categoria}
                    onClick={() => setActiveFilter(categoria)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                      activeFilter === categoria
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-sm'
                    }`}
                  >
                    {categoria === 'all' ? 'Todas' : categoria.charAt(0).toUpperCase() + categoria.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Ordenamiento */}
            <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
              <span className="text-sm font-medium text-gray-700">Ordenar por:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              >
                <option value="popularidad">Popularidad</option>
                <option value="fecha">Más recientes</option>
                <option value="tiempo">Tiempo de lectura</option>
              </select>
            </div>
          </div>
        </div>

        {/* Estadísticas rápidas */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Shield className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Guías de Seguridad</p>
                <p className="text-xl font-semibold text-gray-900">{guias.filter(g => g.categoria === 'seguridad').length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Users className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Guías de Privacidad</p>
                <p className="text-xl font-semibold text-gray-900">{guias.filter(g => g.categoria === 'privacidad').length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <HardDrive className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Guías de Organización</p>
                <p className="text-xl font-semibold text-gray-900">{guias.filter(g => g.categoria === 'organización').length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Grid de guías */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredGuias.map((guia) => (
            <GuideCard key={guia.id} guia={guia} />
          ))}
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">¿No encuentras lo que buscas?</h2>
          <p className="text-xl mb-6 opacity-90">
            Sugiérenos nuevas guías o temas que te gustaría que cubramos
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
          >
            Contactar
            <MessageSquare className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>
    </div>
  );
}

function GuideCard({ guia }: { guia: Guia }) {
  const IconComponent = guia.icon;
  return (
    <Link href={guia.ruta} className="block group">
      <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-all duration-300 border border-gray-100 group-hover:border-blue-200 group-hover:-translate-y-1">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-gradient-to-br from-blue-50 to-indigo-100 mr-4 group-hover:from-blue-100 group-hover:to-indigo-200 transition-all duration-300">
              <IconComponent className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">{guia.titulo}</h3>
              <div className="flex items-center mt-2 space-x-2">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  guia.categoria === 'seguridad' ? 'bg-red-100 text-red-700' :
                  guia.categoria === 'privacidad' ? 'bg-blue-100 text-blue-700' :
                  'bg-green-100 text-green-700'
                }`}>
                  {guia.categoria}
                </span>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  guia.nivel === 'básico' ? 'bg-gray-100 text-gray-700' :
                  guia.nivel === 'intermedio' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-purple-100 text-purple-700'
                }`}>
                  {guia.nivel}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-1 text-yellow-500">
            <Star className="w-4 h-4 fill-current" />
            <span className="text-sm font-medium text-gray-600">{guia.popularidad}</span>
          </div>
        </div>
        
        <p className="text-gray-600 mb-4 leading-relaxed">{guia.descripcion}</p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>{guia.tiempoLectura}</span>
            </div>
            <div className="flex items-center space-x-1">
              <TrendingUp className="w-4 h-4" />
              <span>Actualizada {new Date(guia.fechaActualizacion).toLocaleDateString('es-ES')}</span>
            </div>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 mt-4">
          {guia.tags.map((tag, index) => (
            <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md">
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
