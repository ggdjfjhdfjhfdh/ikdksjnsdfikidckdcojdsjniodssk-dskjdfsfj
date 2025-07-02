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
      <div className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <BackButton href="/recursos/guias" label="Volver a guías" />
        
        <div className="flex flex-col lg:flex-row gap-8 mt-6">
          <article className="flex-1">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <header className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <HardDrive className="w-10 h-10 text-blue-600" />
                  <h1 className="text-3xl font-bold text-gray-900">Gestión de Copias de Seguridad</h1>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => document.getElementById('pdf-generator')?.click()}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                  >
                    <Download className="w-5 h-5" />
                    Descargar PDF
                  </button>
                  <ShareButton />
                </div>
              </header>
              
              <PdfGenerator id="pdf-generator" />
              
              <div className="divide-y divide-gray-100">
                <div id="content">
                  <Section title="Importancia de las copias" icon={<Shield className="w-6 h-6 text-blue-600" />}>
                    <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-4 rounded-r">
                      <p className="font-medium text-blue-800 text-base">
                        60% de las PYMEs que pierden sus datos cierran en 6 meses
                      </p>
                    </div>
                    <p className="text-gray-700 mb-4 text-base">
                      Las copias de seguridad son su última línea de defensa contra pérdida de datos por fallos hardware, ransomware o errores humanos.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2 text-lg">Riesgos comunes:</h3>
                        <ul className="list-disc pl-5 text-sm text-gray-800 space-y-1 text-base">
                          <li>Fallos de hardware</li>
                          <li>Ataques de ransomware</li>
                          <li>Errores humanos</li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2 text-lg">Beneficios:</h3>
                        <ul className="list-disc pl-5 text-sm text-gray-800 space-y-1 text-base">
                          <li>Recuperación rápida</li>
                          <li>Protección contra ransomware</li>
                          <li>Continuidad del negocio</li>
                        </ul>
                      </div>
                    </div>
                  </Section>

                  <Section title="Estrategia 3-2-1" icon={<RefreshCw className="w-6 h-6 text-green-600" />}>
                    <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-4 rounded-r">
                      <p className="font-medium text-green-800 text-base">
                        La estrategia mínima recomendada por expertos en seguridad
                      </p>
                    </div>
                    <ul className="list-disc pl-5 text-sm text-gray-800 space-y-2 text-base">
                      <li>3 copias de tus datos</li>
                      <li>2 medios de almacenamiento diferentes</li>
                      <li>1 copia fuera del sitio</li>
                    </ul>
                  </Section>

                  <Section title="Implementación Práctica" icon={<Clock className="w-6 h-6 text-indigo-600" />}>
                    <div className="bg-indigo-50 border-l-4 border-indigo-500 p-4 mb-4 rounded-r">
                      <p className="font-medium text-indigo-800 text-base">
                        Pasos concretos para implementar un sistema de backups efectivo
                      </p>
                    </div>
                    <div className="space-y-6">
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-3 text-lg">Para empresas:</h3>
                        <ul className="list-disc pl-5 text-gray-800 space-y-2 text-base">
                          <li>Asignar responsable de backups</li>
                          <li>Automatizar procesos con herramientas como Veeam o Acronis</li>
                          <li>Establecer política de retención (ej: 30-60-90 días)</li>
                          <li>Realizar pruebas de recuperación trimestrales</li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-3 text-lg">Para usuarios individuales:</h3>
                        <ul className="list-disc pl-5 text-gray-800 space-y-2 text-base">
                          <li>Usar soluciones como Time Machine (Mac) o File History (Windows)</li>
                          <li>Programar backups semanales</li>
                          <li>Almacenar copia externa en disco duro o nube</li>
                        </ul>
                      </div>
                    </div>
                  </Section>

                  <Section title="Preguntas Frecuentes" icon={<HelpCircle className="w-6 h-6 text-purple-600" />}>
                    <div className="space-y-4">
                      <details className="border border-gray-200 rounded-lg p-4">
                        <summary className="cursor-pointer font-medium text-gray-900 text-lg flex items-center justify-between">
                          ¿Con qué frecuencia debo probar mis copias?
                          <ChevronDown className="w-5 h-5 text-gray-500" />
                        </summary>
                        <p className="mt-3 text-gray-700 pl-2 text-base">
                          <strong>Recomendamos:</strong> Pruebas mensuales para backups críticos y trimestrales para otros datos.
                        </p>
                      </details>
                      <details className="border border-gray-200 rounded-lg p-4">
                        <summary className="cursor-pointer font-medium text-gray-900 text-lg flex items-center justify-between">
                          ¿Es seguro almacenar copias en la nube?
                          <ChevronDown className="w-5 h-5 text-gray-500" />
                        </summary>
                        <p className="mt-3 text-gray-700 pl-2 text-base">
                          Los proveedores profesionales usan cifrado AES-256. Para máxima seguridad, encripte sus datos localmente antes de subirlos.
                        </p>
                      </details>
                      <details className="border border-gray-200 rounded-lg p-4">
                        <summary className="cursor-pointer font-medium text-gray-900 text-lg flex items-center justify-between">
                          ¿Qué datos son más críticos para respaldar?
                          <ChevronDown className="w-5 h-5 text-gray-500" />
                        </summary>
                        <div className="mt-3 text-gray-700 pl-2 text-base space-y-2">
                          <p><strong>Prioridad 1:</strong> Documentos financieros, bases de datos, configuraciones críticas</p>
                          <p><strong>Prioridad 2:</strong> Correos electrónicos, documentos de trabajo</p>
                          <p><strong>Prioridad 3:</strong> Archivos multimedia, otros datos personales</p>
                        </div>
                      </details>
                    </div>
                  </Section>
                </div>
              </div>
            </div>
          </article>

          <aside className="lg:w-64">
            <div className="bg-white border border-gray-200 p-6 rounded-lg sticky top-4 space-y-4">
              <nav>
                <h3 className="text-xs font-semibold text-gray-900 uppercase tracking-wider mb-2 text-sm">Contenido</h3>
                <ul className="space-y-2 text-sm">
                  <li><a href="#" className="text-blue-600 hover:underline">1. Importancia</a></li>
                  <li><a href="#" className="text-blue-600 hover:underline">2. Estrategia 3-2-1</a></li>
                  <li><a href="#" className="text-blue-600 hover:underline">3. Implementación Práctica</a></li>
                  <li><a href="#" className="text-blue-600 hover:underline">4. FAQ</a></li>
                </ul>
              </nav>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

function Section({ title, icon, children }: SectionProps) {
  return (
    <section className="p-8 bg-white/80 backdrop-blur-sm rounded-xl shadow-sm mb-6 last:mb-0">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center shadow-inner">
          {icon}
        </div>
        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
      </div>
      <div className="ml-16">
        {children}
      </div>
    </section>
  );
}
