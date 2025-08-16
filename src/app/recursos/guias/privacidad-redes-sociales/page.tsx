'use client';

import Link from 'next/link';
import ShareButton from '@/components/ShareButton';
import BackButton from '@/components/BackButton';
import DownloadButton from '@/components/DownloadButton';
import {
  Info as InfoIcon,
  Lock,
  HelpCircle,
  ChevronDown,
  ShieldCheck,
  Facebook,
  MapPin
} from 'lucide-react';
import { useState } from 'react';

export default function PrivacidadRedesSociales() {
  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>({});
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    facebook: false,
    instagram: false,
    twitter: false,
    tiktok: false,
    linkedin: false,
  });

  const toggleItem = (index: number) => {
    setExpandedItems(prev => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const toggleSection = (platform: string) => {
    setExpandedSections(prev => ({
      ...Object.fromEntries(Object.keys(prev).map(k => [k, false] as const)),
      [platform]: !prev[platform],
    }));
  };

  const faqItems = [
    {
      question: '¿Con qué frecuencia debo revisar mis configuraciones?',
      answer:
        'Recomendamos una revisión trimestral, ya que las plataformas actualizan frecuentemente sus funciones y configuraciones.',
    },
    {
      question: '¿Qué información nunca debería compartir?',
      answer:
        'Documentos oficiales, boletos de viaje, direcciones exactas, fotos de menores con ubicaciones visibles.',
    },
    {
      question: '¿Cómo puedo ver qué datos tienen sobre mí?',
      answer:
        'Busca "Descargar tu información" en la configuración de privacidad de cada red social.',
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto mb-6 max-w-6xl">
        <BackButton href="/recursos/guias" label="Volver a todas las guías" />
      </div>

      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8">
        <div className="flex-1 bg-white rounded-xl shadow-md overflow-hidden">
          {/* Hero */}
          <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-10 text-center border-b border-gray-200">
            <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-10 h-10 text-purple-600" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Privacidad en Redes Sociales
            </h1>
            <p className="text-gray-900 text-lg max-w-2xl mx-auto">
              Protege tu información personal y controla tu huella digital
            </p>
          </div>

          <div id="content" className="p-8">
            {/* Sección 1 */}
            <section id="basica" className="mb-12 bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-50">
                  <span className="text-xl font-bold text-blue-600">1</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Configuración Básica</h2>
              </div>

              <div className="space-y-4">
                <h3 className="font-bold text-gray-900 flex items-center gap-2">
                  <Lock className="w-5 h-5 text-blue-600" />
                  Configuraciones esenciales
                </h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-900">
                  <li>
                    <strong>Perfil privado:</strong> Configura tu cuenta como privada para aprobar seguidores manualmente
                  </li>
                  <li>
                    <strong>Comentarios:</strong> Limita quién puede comentar (amigos/solo tú)
                  </li>
                  <li>
                    <strong>Geolocalización:</strong> Desactiva el etiquetado automático de ubicación
                  </li>
                  <li>
                    <strong>Aplicaciones:</strong> Revisa y elimina apps conectadas no utilizadas
                  </li>
                </ul>
              </div>
            </section>

            {/* Sección 2 */}
            <section id="plataformas" className="mb-12 bg-gray-50/50 p-8 rounded-xl border border-gray-200 shadow-sm">
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-50">
                  <span className="text-xl font-bold text-blue-600">2</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Plataformas Principales</h2>
              </div>

              <div className="flex flex-col gap-6">
                {/* Facebook */}
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 mb-6">
                  <div
                    className="flex items-center justify-between cursor-pointer group"
                    onClick={() => toggleSection('facebook')}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center shadow-inner">
                        <Facebook className="w-6 h-6 text-blue-600" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                        Facebook
                      </h3>
                    </div>
                    <ChevronDown
                      className={`w-6 h-6 text-gray-500 transition-all duration-200 ${
                        expandedSections.facebook ? 'rotate-180 text-blue-600' : 'group-hover:text-gray-700'
                      }`}
                    />
                  </div>

                  {expandedSections.facebook && (
                    <div className="mt-6 space-y-6 animate-fadeIn">
                      <div className="bg-blue-50/70 p-4 rounded-lg border border-blue-100">
                        <h4 className="text-lg font-semibold text-blue-800 mb-2 flex items-center gap-2">
                          <MapPin className="w-5 h-5" />
                          Ruta de configuración
                        </h4>
                        <p className="text-blue-900 font-medium">Menú ▾ → Configuración y privacidad → Privacidad</p>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <Lock className="w-5 h-5 text-blue-600 flex-shrink-0" />
                          <h4 className="text-lg font-semibold text-gray-900">Configuración paso a paso</h4>
                        </div>

                        <ol className="space-y-4 pl-2">
                          <li className="flex gap-3">
                            <div className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                              1
                            </div>
                            <div>
                              <p className="text-gray-900 font-medium">
                                <span className="text-red-600 font-bold">Nunca</span> selecciones &apos;Público&apos; →{' '}
                                <span className="text-green-600 font-medium">Siempre</span> usa &apos;Amigos&apos; o &apos;Solo yo&apos;
                              </p>
                              <p className="text-sm text-gray-600 mt-1">Evita que extraños vean tu información personal</p>
                            </div>
                          </li>

                          <li className="flex gap-3">
                            <div className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                              2
                            </div>
                            <div>
                              <p className="text-gray-900 font-medium">
                                <span className="text-red-600 font-bold">Desactiva completamente</span> la búsqueda por mail/teléfono
                              </p>
                              <p className="text-sm text-gray-600 mt-1">Previene que te encuentren con información personal</p>
                            </div>
                          </li>

                          <li className="flex gap-3">
                            <div className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                              3
                            </div>
                            <div>
                              <p className="text-gray-900 font-medium">
                                <span className="text-red-600 font-bold">Desactiva</span> &apos;Etiquetas automáticas&apos;
                              </p>
                              <p className="text-sm text-gray-600 mt-1">Evita que te etiqueten sin tu consentimiento</p>
                            </div>
                          </li>

                          <li className="flex gap-3">
                            <div className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                              4
                            </div>
                            <div>
                              <p className="text-gray-900 font-medium">
                                <span className="text-red-600 font-bold">Nunca</span> permitas &apos;Compartir en otras aplicaciones&apos;
                              </p>
                              <p className="text-sm text-gray-600 mt-1">Previene la distribución no deseada de tu contenido</p>
                            </div>
                          </li>
                        </ol>

                        <div className="bg-gray-100/80 p-4 rounded-lg border-l-4 border-blue-600 mt-4">
                          <div className="flex items-center gap-2">
                            <ShieldCheck className="w-5 h-5 text-blue-600" />
                            <h4 className="text-lg font-semibold text-gray-900">Resultado final</h4>
                          </div>
                          <p className="text-gray-800 mt-2">
                            Solo tus amigos ven tu contenido; evitas auto-etiquetas y rastreo por IA
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Instagram */}
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 mb-6">
                  <div
                    className="flex items-center justify-between cursor-pointer group"
                    onClick={() => toggleSection('instagram')}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 via-pink-500 to-yellow-400 flex items-center justify-center shadow-inner">
                        <svg
                          className="w-6 h-6 text-white"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          aria-label="Instagram icon"
                        >
                          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                          <circle cx="12" cy="12" r="5" />
                          <circle cx="18" cy="6" r="1" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                        Instagram
                      </h3>
                    </div>
                    <ChevronDown
                      className={`w-6 h-6 text-gray-500 transition-all duration-200 ${
                        expandedSections.instagram ? 'rotate-180 text-blue-600' : 'group-hover:text-gray-700'
                      }`}
                    />
                  </div>

                  {expandedSections.instagram && (
                    <div className="mt-6 space-y-6 animate-fadeIn">
                      <div className="bg-blue-50/70 p-4 rounded-lg border border-blue-100">
                        <h4 className="text-lg font-semibold text-blue-800 mb-2 flex items-center gap-2">
                          <MapPin className="w-5 h-5" />
                          Ruta de configuración
                        </h4>
                        <p className="text-blue-900 font-medium">Configuración → Cuenta → Privacidad</p>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <Lock className="w-5 h-5 text-blue-600 flex-shrink-0" />
                          <h4 className="text-lg font-semibold text-gray-900">Configuración paso a paso</h4>
                        </div>

                        <ol className="space-y-4 pl-2">
                          <li className="flex gap-3">
                            <div className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                              1
                            </div>
                            <div>
                              <p className="text-gray-900 font-medium">
                                <span className="text-red-600 font-bold">Activa obligatoriamente</span> la cuenta privada
                              </p>
                              <p className="text-sm text-gray-600 mt-1">Evita que extraños vean tu contenido</p>
                            </div>
                          </li>

                          <li className="flex gap-3">
                            <div className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                              2
                            </div>
                            <div>
                              <p className="text-gray-900 font-medium">
                                <span className="text-red-600 font-bold">Desactiva completamente</span> la sincronización de contactos
                              </p>
                              <p className="text-sm text-gray-600 mt-1">Previene que te encuentren con información personal</p>
                            </div>
                          </li>

                          <li className="flex gap-3">
                            <div className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                              3
                            </div>
                            <div>
                              <p className="text-gray-900 font-medium">
                                <span className="text-red-600 font-bold">Deshabilita</span> &apos;Permitir que otros te etiqueten&apos;
                              </p>
                              <p className="text-sm text-gray-600 mt-1">Evita que te etiqueten sin tu consentimiento</p>
                            </div>
                          </li>

                          <li className="flex gap-3">
                            <div className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                              4
                            </div>
                            <div>
                              <p className="text-gray-900 font-medium">
                                <span className="text-red-600 font-bold">Nunca</span> permitas &apos;Compartir en otras aplicaciones&apos;
                              </p>
                              <p className="text-sm text-gray-600 mt-1">Previene la distribución no deseada de tu contenido</p>
                            </div>
                          </li>
                        </ol>

                        <div className="bg-gray-100/80 p-4 rounded-lg border-l-4 border-blue-600 mt-4">
                          <div className="flex items-center gap-2">
                            <ShieldCheck className="w-5 h-5 text-blue-600" />
                            <h4 className="text-lg font-semibold text-gray-900">Resultado final</h4>
                          </div>
                          <p className="text-gray-800 mt-2">
                            Solo tus seguidores ven tu contenido; evitas auto-etiquetas y rastreo por IA
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* X / Twitter */}
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 mb-6">
                  <div
                    className="flex items-center justify-between cursor-pointer group"
                    onClick={() => toggleSection('twitter')}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-black flex items-center justify-center shadow-inner">
                        <svg
                          className="w-6 h-6 text-white"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          aria-label="X (Twitter) icon"
                        >
                          <path d="M18.244 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                        X (Twitter)
                      </h3>
                    </div>
                    <ChevronDown
                      className={`w-6 h-6 text-gray-500 transition-all duration-200 ${
                        expandedSections.twitter ? 'rotate-180 text-blue-600' : 'group-hover:text-gray-700'
                      }`}
                    />
                  </div>

                  {expandedSections.twitter && (
                    <div className="mt-6 space-y-6 animate-fadeIn">
                      <div className="bg-blue-50/70 p-4 rounded-lg border border-blue-100">
                        <h4 className="text-lg font-semibold text-blue-800 mb-2 flex items-center gap-2">
                          <MapPin className="w-5 h-5" />
                          Ruta de configuración
                        </h4>
                        <p className="text-blue-900 font-medium">
                          Más … → Configuración y soporte → Configuración → Privacidad y seguridad
                        </p>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <Lock className="w-5 h-5 text-blue-600 flex-shrink-0" />
                          <h4 className="text-lg font-semibold text-gray-900">Configuración paso a paso</h4>
                        </div>

                        <ol className="space-y-4 pl-2">
                          <li className="flex gap-3">
                            <div className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                              1
                            </div>
                            <div>
                              <p className="text-gray-900 font-medium">
                                <span className="text-red-600 font-bold">Protege tus tuits</span>
                              </p>
                              <p className="text-sm text-gray-600 mt-1">Evita que extraños vean tu contenido</p>
                            </div>
                          </li>

                          <li className="flex gap-3">
                            <div className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                              2
                            </div>
                            <div>
                              <p className="text-gray-900 font-medium">
                                <span className="text-red-600 font-bold">Desactiva completamente</span> la búsqueda por mail/teléfono
                              </p>
                              <p className="text-sm text-gray-600 mt-1">Previene que te encuentren con información personal</p>
                            </div>
                          </li>

                          <li className="flex gap-3">
                            <div className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                              3
                            </div>
                            <div>
                              <p className="text-gray-900 font-medium">
                                <span className="text-red-600 font-bold">Desactiva</span> &apos;Mostrar ubicación en los tweets&apos;
                              </p>
                              <p className="text-sm text-gray-600 mt-1">Protege tu ubicación física</p>
                            </div>
                          </li>

                          <li className="flex gap-3">
                            <div className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                              4
                            </div>
                            <div>
                              <p className="text-gray-900 font-medium">
                                <span className="text-red-600 font-bold">Elimina</span> todos los datos de ubicación históricos
                              </p>
                              <p className="text-sm text-gray-600 mt-1">Borra tu historial de ubicaciones</p>
                            </div>
                          </li>
                        </ol>

                        <div className="bg-gray-100/80 p-4 rounded-lg border-l-4 border-blue-600 mt-4">
                          <div className="flex items-center gap-2">
                            <ShieldCheck className="w-5 h-5 text-blue-600" />
                            <h4 className="text-lg font-semibold text-gray-900">Resultado final</h4>
                          </div>
                          <p className="text-gray-800 mt-2">
                            Solo tus seguidores ven tu contenido; evitas auto-etiquetas y rastreo por IA
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* TikTok */}
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 mb-6">
                  <div
                    className="flex items-center justify-between cursor-pointer group"
                    onClick={() => toggleSection('tiktok')}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gray-900 flex items-center justify-center shadow-inner">
                        {/* Icono TikTok simplificado */}
                        <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor" aria-label="TikTok icon">
                          <path d="M9 3a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1v2.2a5.8 5.8 0 0 0 4 3.7V12a8.3 8.3 0 0 1-4.8-1.6v5.9A5.3 5.3 0 1 1 9 11h0v2.4a2.9 2.9 0 1 0 2.9 2.9V3H9z" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                        TikTok
                      </h3>
                    </div>
                    <ChevronDown
                      className={`w-6 h-6 text-gray-500 transition-all duration-200 ${
                        expandedSections.tiktok ? 'rotate-180 text-blue-600' : 'group-hover:text-gray-700'
                      }`}
                    />
                  </div>

                  {expandedSections.tiktok && (
                    <div className="mt-6 space-y-6 animate-fadeIn">
                      <div className="bg-blue-50/70 p-4 rounded-lg border border-blue-100">
                        <h4 className="text-lg font-semibold text-blue-800 mb-2 flex items-center gap-2">
                          <MapPin className="w-5 h-5" />
                          Ruta de configuración
                        </h4>
                        <p className="text-blue-900 font-medium">Perfil → ☰ → Ajustes y privacidad → Privacidad</p>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <Lock className="w-5 h-5 text-blue-600 flex-shrink-0" />
                          <h4 className="text-lg font-semibold text-gray-900">Configuración paso a paso</h4>
                        </div>

                        <ol className="space-y-4 pl-2">
                          <li className="flex gap-3">
                            <div className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                              1
                            </div>
                            <div>
                              <p className="text-gray-900 font-medium">
                                <span className="text-red-600 font-bold">Activa</span> la cuenta privada
                              </p>
                              <p className="text-sm text-gray-600 mt-1">Evita que extraños vean tu contenido</p>
                            </div>
                          </li>

                          <li className="flex gap-3">
                            <div className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                              2
                            </div>
                            <div>
                              <p className="text-gray-900 font-medium">
                                <span className="text-red-600 font-bold">Desactiva completamente</span> la sincronización de contactos
                              </p>
                              <p className="text-sm text-gray-600 mt-1">Previene que te encuentren con información personal</p>
                            </div>
                          </li>

                          <li className="flex gap-3">
                            <div className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                              3
                            </div>
                            <div>
                              <p className="text-gray-900 font-medium">
                                <span className="text-red-600 font-bold">Desactiva</span> &apos;Permitir que tus vídeos sean descargados&apos;
                              </p>
                              <p className="text-sm text-gray-600 mt-1">Evita la redistribución no autorizada</p>
                            </div>
                          </li>

                          <li className="flex gap-3">
                            <div className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                              4
                            </div>
                            <div>
                              <p className="text-gray-900 font-medium">
                                <span className="text-red-600 font-bold">Restringe</span> &apos;Quién puede enviarte mensajes directos&apos;
                              </p>
                              <p className="text-sm text-gray-600 mt-1">Solo permite mensajes de amigos</p>
                            </div>
                          </li>
                        </ol>

                        <div className="bg-gray-100/80 p-4 rounded-lg border-l-4 border-blue-600 mt-4">
                          <div className="flex items-center gap-2">
                            <ShieldCheck className="w-5 h-5 text-blue-600" />
                            <h4 className="text-lg font-semibold text-gray-900">Resultado final</h4>
                          </div>
                          <p className="text-gray-800 mt-2">
                            Solo tus seguidores ven tu contenido; evitas auto-etiquetas y rastreo por IA
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* LinkedIn */}
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 mb-6">
                  <div
                    className="flex items-center justify-between cursor-pointer group"
                    onClick={() => toggleSection('linkedin')}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-blue-700 flex items-center justify-center shadow-inner">
                        <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor" aria-label="LinkedIn icon">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                        LinkedIn
                      </h3>
                    </div>
                    <ChevronDown
                      className={`w-6 h-6 text-gray-500 transition-all duration-200 ${
                        expandedSections.linkedin ? 'rotate-180 text-blue-600' : 'group-hover:text-gray-700'
                      }`}
                    />
                  </div>

                  {expandedSections.linkedin && (
                    <div className="mt-6 space-y-6 animate-fadeIn">
                      <div className="bg-blue-50/70 p-4 rounded-lg border border-blue-100">
                        <h4 className="text-lg font-semibold text-blue-800 mb-2 flex items-center gap-2">
                          <MapPin className="w-5 h-5" />
                          Ruta de configuración
                        </h4>
                        <p className="text-blue-900 font-medium">Yo → Ajustes y privacidad → Visibilidad</p>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <Lock className="w-5 h-5 text-blue-600 flex-shrink-0" />
                          <h4 className="text-lg font-semibold text-gray-900">Configuración paso a paso</h4>
                        </div>

                        <ol className="space-y-4 pl-2">
                          <li className="flex gap-3">
                            <div className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                              1
                            </div>
                            <div>
                              <p className="text-gray-900 font-medium">
                                <span className="text-red-600 font-bold">Oculta siempre</span> foto y titular a buscadores externos
                              </p>
                              <p className="text-sm text-gray-600 mt-1">Evita que te encuentren con información personal</p>
                            </div>
                          </li>

                          <li className="flex gap-3">
                            <div className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                              2
                            </div>
                            <div>
                              <p className="text-gray-900 font-medium">
                                <span className="text-red-600 font-bold">Desactiva completamente</span> la búsqueda por mail/teléfono
                              </p>
                              <p className="text-sm text-gray-600 mt-1">Previene que te encuentren con información personal</p>
                            </div>
                          </li>

                          <li className="flex gap-3">
                            <div className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                              3
                            </div>
                            <div>
                              <p className="text-gray-900 font-medium">
                                <span className="text-red-600 font-bold">Desactiva</span> &apos;Compartir datos con terceros&apos;
                              </p>
                              <p className="text-sm text-gray-600 mt-1">Evita el uso comercial de tu información</p>
                            </div>
                          </li>

                          <li className="flex gap-3">
                            <div className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                              4
                            </div>
                            <div>
                              <p className="text-gray-900 font-medium">
                                <span className="text-red-600 font-bold">Activa</span> &apos;Modo privado&apos; cuando investigues perfiles
                              </p>
                              <p className="text-sm text-gray-600 mt-1">Evita notificar a otros de tus visitas</p>
                            </div>
                          </li>
                        </ol>

                        <div className="bg-gray-100/80 p-4 rounded-lg border-l-4 border-blue-600 mt-4">
                          <div className="flex items-center gap-2">
                            <ShieldCheck className="w-5 h-5 text-blue-600" />
                            <h4 className="text-lg font-semibold text-gray-900">Resultado final</h4>
                          </div>
                          <p className="text-gray-800 mt-2">
                            Solo tus seguidores ven tu contenido; evitas auto-etiquetas y rastreo por IA
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </section>

            {/* Consejos */}
            <section id="consejos" className="mb-12">
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-50">
                  <span className="text-xl font-bold text-blue-600">3</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Consejos Avanzados</h2>
              </div>

              <div className="space-y-4 text-gray-900">
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

            {/* FAQ */}
            <section id="faq" className="mb-12 bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-50">
                  <InfoIcon className="w-6 h-6 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Preguntas Frecuentes</h2>
              </div>

              <div className="space-y-4">
                {faqItems.map((item, index) => (
                  <div key={index} className="border-b border-gray-200 pb-4">
                    <div
                      className="flex items-center justify-between cursor-pointer"
                      onClick={() => toggleItem(index)}
                    >
                      <h3 className="text-lg font-semibold text-gray-900">
                        <HelpCircle className="inline mr-2 w-5 h-5 text-blue-600" />
                        {item.question}
                      </h3>
                      <ChevronDown
                        className={`w-5 h-5 text-gray-500 transition-transform ${
                          expandedItems[index] ? 'rotate-180' : ''
                        }`}
                      />
                    </div>
                    {expandedItems[index] && <p className="mt-2 pl-7 text-gray-900">{item.answer}</p>}
                  </div>
                ))}
              </div>
            </section>

            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Herramientas útiles</h3>
              <p className="mb-4 text-gray-900">
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

        {/* Sidebar */}
        <div className="md:w-64 flex-shrink-0">
          <div className="bg-white p-6 rounded-xl shadow-md sticky top-4 space-y-4">
            <h3 className="font-bold text-gray-900">Contenido</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#basica" className="text-blue-600 hover:underline">
                  1. Configuración Básica
                </a>
              </li>
              <li>
                <a href="#plataformas" className="text-blue-600 hover:underline">
                  2. Plataformas Principales
                </a>
              </li>
              <li>
                <a href="#consejos" className="text-blue-600 hover:underline">
                  3. Consejos Avanzados
                </a>
              </li>
              <li>
                <a href="#faq" className="text-blue-600 hover:underline">
                  Preguntas Frecuentes
                </a>
              </li>
            </ul>

            <div className="mt-4 space-y-4">
              <DownloadButton title="Guía: Privacidad en Redes Sociales" contentSelector="#content" />
              <ShareButton />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
