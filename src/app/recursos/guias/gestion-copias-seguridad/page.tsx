"use client";

import Link from 'next/link';
import ShareButton from '@/components/ShareButton';
import BackButton from '@/components/BackButton';
import { HardDrive, Shield, Clock, RefreshCw, HelpCircle, ChevronDown, Download } from 'lucide-react';
import { ReactNode } from 'react';
import PdfGenerator from './PdfGenerator';
import { generateGuidePdf } from '@/utils/generatePdf';

interface SectionProps {
  title: string;
  icon: ReactNode;
  children: ReactNode;
}

export default function GestionCopiasSeguridad() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <BackButton href="/recursos/guias" label="Volver a guías" className="mb-6 sm:mb-8" />
        
        <div className="flex flex-col lg:flex-row gap-6 sm:gap-8">
          <article className="flex-1">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <header className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 sm:p-8 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="p-2 sm:p-3 bg-blue-100 rounded-lg">
                      <HardDrive className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Gestión de Copias de Seguridad</h1>
                  </div>
                </div>
                <p className="mt-3 sm:mt-4 text-gray-800 text-base sm:text-lg">
                  Protección completa contra pérdida de datos con estrategias profesionales
                </p>
              </header>
              
              <div className="divide-y divide-gray-100">
                <div id="content" className="p-4 sm:p-6 md:p-8">
                  <Section 
                    title="Importancia de las copias" 
                    icon={<Shield className="w-6 h-6 text-blue-600" />}
                    className="mb-12"
                  >
                    <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 rounded-r">
                      <p className="font-medium text-blue-800">
                        60% de las PYMEs que pierden sus datos cierran en 6 meses
                      </p>
                    </div>
                    <p className="text-gray-700 mb-6">
                      Las copias de seguridad son su última línea de defensa contra pérdida de datos por fallos hardware, ransomware o errores humanos.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                      <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
                        <h3 className="font-semibold text-gray-900 mb-2 sm:mb-3 text-base sm:text-lg">Riesgos comunes:</h3>
                        <ul className="list-disc pl-4 space-y-1 sm:space-y-2 text-gray-800 text-sm sm:text-base">
                          <li>Fallos de hardware</li>
                          <li>Ataques de ransomware</li>
                          <li>Errores humanos</li>
                        </ul>
                      </div>
                      <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
                        <h3 className="font-semibold text-gray-900 mb-2 sm:mb-3 text-base sm:text-lg">Beneficios:</h3>
                        <ul className="list-disc pl-4 space-y-1 sm:space-y-2 text-gray-800 text-sm sm:text-base">
                          <li>Recuperación rápida</li>
                          <li>Protección contra ransomware</li>
                          <li>Continuidad del negocio</li>
                        </ul>
                      </div>
                    </div>
                  </Section>

                  <Section 
                    title="Estrategia 3-2-1" 
                    icon={<RefreshCw className="w-6 h-6 text-green-600" />}
                    className="mb-12"
                  >
                    <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6 rounded-r">
                      <p className="font-medium text-green-800">
                        La estrategia mínima recomendada por expertos en seguridad
                      </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-6">
                      <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
                        <h3 className="font-semibold text-gray-900 mb-2 sm:mb-3 text-base sm:text-lg">3 Copias</h3>
                        <p className="text-gray-700 text-sm sm:text-base">
                          Mantenga al menos 3 copias de sus datos importantes
                        </p>
                      </div>
                      <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
                        <h3 className="font-semibold text-gray-900 mb-2 sm:mb-3 text-base sm:text-lg">2 Medios</h3>
                        <p className="text-gray-700 text-sm sm:text-base">
                          Use al menos 2 tipos diferentes de almacenamiento
                        </p>
                      </div>
                      <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
                        <h3 className="font-semibold text-gray-900 mb-2 sm:mb-3 text-base sm:text-lg">1 Externa</h3>
                        <p className="text-gray-700 text-sm sm:text-base">
                          Guarde al menos 1 copia fuera del sitio principal
                        </p>
                      </div>
                    </div>
                  </Section>

                  <Section 
                    title="Preguntas Frecuentes" 
                    icon={<HelpCircle className="w-6 h-6 text-purple-600" />}
                  >
                    <div className="space-y-4">
                      <details className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                        <summary className="cursor-pointer font-medium text-gray-900 flex items-center justify-between">
                          ¿Con qué frecuencia debo probar mis copias?
                          <ChevronDown className="w-5 h-5 text-gray-500" />
                        </summary>
                        <p className="mt-3 text-gray-700 pl-2 text-sm sm:text-base">
                          <strong>Recomendamos:</strong> Pruebas mensuales para backups críticos y trimestrales para otros datos.
                        </p>
                      </details>
                      <details className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                        <summary className="cursor-pointer font-medium text-gray-900 flex items-center justify-between">
                          ¿Es seguro almacenar copias en la nube?
                          <ChevronDown className="w-5 h-5 text-gray-500" />
                        </summary>
                        <p className="mt-3 text-gray-700 pl-2 text-sm sm:text-base">
                          Los proveedores profesionales usan cifrado AES-256. Para máxima seguridad, encripte sus datos localmente antes de subirlos.
                        </p>
                      </details>
                    </div>
                  </Section>
                </div>
              </div>
            </div>
          </article>

          <aside className="lg:w-64">
            <div className="bg-white border border-gray-200 p-6 rounded-lg sticky top-4 space-y-6">
              <nav>
                <h3 className="text-xs font-semibold text-gray-900 uppercase tracking-wider mb-3">Contenido</h3>
                <ul className="space-y-3">
                  <li><a href="#" className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-xs">1</span>
                    Importancia
                  </a></li>
                  <li><a href="#" className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-xs">2</span>
                    Estrategia 3-2-1
                  </a></li>
                  <li><a href="#" className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-xs">3</span>
                    Preguntas Frecuentes
                  </a></li>
                </ul>
              </nav>
              <div className="pt-4 border-t border-gray-200">
                <ShareButton />
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

function Section({ title, icon, children, className = '' }: SectionProps & { className?: string }) {
  return (
    <section className={`${className} bg-white p-6 rounded-lg border border-gray-200`}>
      <div className="flex items-center gap-4 mb-6">
        <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
          {icon}
        </div>
        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
      </div>
      <div className="ml-14">
        {children}
      </div>
    </section>
  );
}
