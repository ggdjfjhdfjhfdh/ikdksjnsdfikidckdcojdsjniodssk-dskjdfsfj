// Importaciones (añadimos DownloadButton y quitamos Link)
"use client";

import ShareButton from '@/components/ShareButton';
import BackButton from '@/components/BackButton';
import DownloadButton from '@/components/DownloadButton';
import {
  AlertTriangle,
  MailWarning,
  Smartphone,
  ShieldAlert,
  Lock,
  Link2,
  ChevronDown,
  HelpCircle,
  FileWarning,
  ShieldOff,
} from 'lucide-react';
import { useState, ReactNode } from 'react';

interface SectionProps {
  title: string;
  icon: ReactNode;
  children: ReactNode;
};

interface ChecklistProps {
  items: string[];
  color: 'orange' | 'blue';
};

export default function ProteccionPhishing() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8 scroll-smooth text-base">
      <BackButton href="/recursos/guias" label="Volver a guías" />
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8 mt-8">
        {/* MAIN */}
        <article id="content" className="flex-1 bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
          {/* HERO */}
          <header className="bg-gradient-to-r from-red-50 to-orange-100 p-8 text-center border-b border-gray-200">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-10 h-10 text-red-600" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Cómo Protegerse del Phishing</h1>
            <p className="text-gray-900 text-lg max-w-2xl mx-auto text-base">
              Aprenda a reconocer y evitar los engaños más comunes en internet
            </p>
          </header>

          <div className="divide-y divide-gray-100">
            {/* SECTIONS */}
            <Section title="¿Qué es el phishing?" icon={<FileWarning className="w-6 h-6 text-red-600" />}>
              <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4 rounded-r">
                <p className="font-medium text-red-800 text-base">
                  Es el fraude más común en internet - 9 de cada 10 ataques comienzan así
                </p>
              </div>
              <p className="text-gray-700 mb-4 text-base">
                El phishing es cuando los estafadores se hacen pasar por empresas legítimas para robar sus datos personales o dinero.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2 text-lg">Se hacen pasar por:</h3>
                  <ul className="list-disc pl-5 text-sm text-gray-800 space-y-1 text-base">
                    <li>Bancos y servicios de pago</li>
                    <li>Redes sociales</li>
                    <li>Empresas de envíos</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2 text-lg">Buscan robar:</h3>
                  <ul className="list-disc pl-5 text-sm text-gray-800 space-y-1 text-base">
                    <li>Contraseñas</li>
                    <li>Datos de tarjetas</li>
                    <li>Información personal</li>
                  </ul>
                </div>
              </div>
            </Section>

            <Section title="Cómo detectarlo" icon={<MailWarning className="w-6 h-6 text-orange-600" />}>
              <Checklist color="orange" items={[
                'Dominios con homógrafos IDN (xn--micrsoft-xyz.com)',
                'Certificados SSL emitidos a nombres genéricos',
                'Encabezados de correo con rutas de retorno inconsistentes',
                'Formularios que piden información sensible inusual',
                'Redirecciones a través de múltiples dominios',
                'Solicitudes de credenciales en canales no oficiales'
              ]} />
            </Section>

            <Section title="Principales variantes" icon={<Smartphone className="w-6 h-6 text-yellow-600" />}>
              <ul className="list-disc pl-5 text-sm text-gray-800 space-y-2 text-base">
                <li><strong>Bulk</strong>: campañas masivas sin personalizar.</li>
                <li><strong>Spear</strong>: correo dirigido a un empleado usando OSINT.</li>
                <li><strong>Whaling</strong>: enfocado en ejecutivos (CEO/CFO).</li>
                <li><strong>Smishing</strong>: SMS con enlace acortado.</li>
                <li><strong>Vishing</strong>: llamada solicitando OTP o PIN.</li>
                <li><strong>BEC</strong>: cambio de cuenta bancaria de proveedor.</li>
              </ul>
            </Section>

            <Section title="Prevención" icon={<ShieldAlert className="w-6 h-6 text-blue-600" />}>
              <Checklist color="blue" items={[
                'Implementar DMARC/DKIM/SPF para autenticación de correo',
                'Usar soluciones SEG (Secure Email Gateway) como Proofpoint',
                'Capacitación mensual con simulaciones de phishing',
                'Política de "Zero Trust" para transferencias financieras',
                'Segmentación de red para limitar movimiento lateral',
                'Monitoreo continuo de credenciales expuestas'
              ]} />
            </Section>

            <Section title="Qué hacer si caes" icon={<Lock className="w-6 h-6 text-green-600" />}>
              <ol className="list-decimal pl-6 space-y-2 text-gray-800 text-base">
                <li>Cambia inmediatamente la contraseña y habilita 2FA.</li>
                <li>Revoca sesiones y tokens en el servicio afectado.</li>
                <li>Ejecuta un escaneo antivirus + anti‑malware.</li>
                <li>Contacta con tu banco si diste datos financieros.</li>
                <li>Denuncia el dominio en <code>phish.report</code> o INCIBE.</li>
              </ol>
            </Section>

            <Section title="Herramientas" icon={<Link2 className="w-6 h-6 text-indigo-600" />}>
              <ul className="list-disc pl-5 text-sm text-gray-800 space-y-2 text-base">
                <li><strong>VirusTotal</strong>: analiza URLs/archivos.</li>
                <li><strong>Have I Been Pwned</strong>: alertas de filtraciones.</li>
                <li><strong>Urlscan.io</strong>: sandbox de sitios web.</li>
                <li><strong>uBlock Origin</strong> + EasyList Phishing.</li>
                <li><strong>Proton Pass</strong>: detección de sitios clonados.</li>
              </ul>
            </Section>

            <Section title="Técnicas avanzadas" icon={<ShieldOff className="w-6 h-6 text-red-600" />}>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2 text-lg">Evasion Techniques</h3>
                  <ul className="list-disc pl-5 text-sm text-gray-800 space-y-1 text-base">
                    <li>Polimorfismo de URL (rotación de dominios)</li>
                    <li>Ofuscación de JavaScript</li>
                    <li>Documentos con macros ofuscadas</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2 text-lg">Tácticas recientes</h3>
                  <ul className="list-disc pl-5 text-sm text-gray-800 space-y-1 text-base">
                    <li>Ataques "Living Off The Land" (LOTL)</li>
                    <li>Abuso de servicios legítimos (Azure, Google Forms)</li>
                    <li>Phishing como servicio (PhaaS)</li>
                  </ul>
                </div>
              </div>
            </Section>

            <Section title="Preguntas Frecuentes" icon={<HelpCircle className="w-6 h-6 text-purple-600" />}>
              <div className="space-y-4 text-base">
                <details className="border border-gray-200 rounded-lg p-4">
                  <summary className="cursor-pointer font-medium text-gray-900 text-lg flex items-center justify-between">
                    ¿Cómo sé si un correo es de phishing?
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  </summary>
                  <p className="mt-3 text-gray-700 pl-2 text-base">
                    <span className="font-semibold">Señales clave:</span> Urgencia exagerada, errores gramaticales, enlaces que no coinciden con el texto, remitentes desconocidos o que imitan empresas conocidas.
                  </p>
                </details>

                <details className="border border-gray-200 rounded-lg p-4">
                  <summary className="cursor-pointer font-medium text-gray-900 text-lg flex items-center justify-between">
                    ¿Qué debo hacer si hice clic en un enlace sospechoso?
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  </summary>
                  <ol className="mt-3 pl-5 space-y-2 text-gray-700 text-base">
                    <li>1. <strong>No ingrese información personal</strong> en el sitio</li>
                    <li>2. Cambie inmediatamente sus contraseñas</li>
                    <li>3. Escanee su dispositivo con antivirus</li>
                    <li>4. Reporte el incidente a su departamento de TI</li>
                  </ol>
                </details>

                <details className="border border-gray-200 rounded-lg p-4">
                  <summary className="cursor-pointer font-medium text-gray-900 text-lg flex items-center justify-between">
                    ¿Los bancos envían links para actualizar datos?
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  </summary>
                  <p className="mt-3 text-gray-700 pl-2 text-base">
                    <strong>No, es una táctica común de phishing.</strong> Los bancos legítimos nunca piden actualizar datos mediante enlaces en correos o mensajes. Siempre acceda directamente al sitio oficial.
                  </p>
                </details>

                <details className="border border-gray-200 rounded-lg p-4">
                  <summary className="cursor-pointer font-medium text-gray-900 text-lg flex items-center justify-between">
                    ¿Cómo verificar si un sitio web es legítimo?
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  </summary>
                  <ul className="mt-3 pl-5 space-y-2 text-gray-700 text-base">
                    <li>• Verifique el candado verde en la barra de direcciones</li>
                    <li>• Revise que el dominio sea exacto (ej: www.bancoreal.com)</li>
                    <li>• Desconfíe de dominios con errores (ej: banc0real.com)</li>
                  </ul>
                </details>
              </div>
            </Section>
          </div>
        </article>

        {/* SIDEBAR */}
        <aside className="lg:w-64">
          <div className="bg-white border border-gray-200 p-6 rounded-lg sticky top-4 space-y-4">
            <ShareButton />
            <DownloadButton
              title="Guía: Cómo protegerse del phishing"
              contentSelector="#content"
            />
            <nav>
              <h3 className="text-xs font-semibold text-gray-900 uppercase tracking-wider mb-2 text-sm">Contenido</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#intro" className="text-blue-600 hover:underline">1. ¿Qué es?</a></li>
                <li><a href="#detect" className="text-blue-600 hover:underline">2. Detectar</a></li>
                <li><a href="#types" className="text-blue-600 hover:underline">3. Tipos</a></li>
                <li><a href="#prevent" className="text-blue-600 hover:underline">4. Prevención</a></li>
                <li><a href="#react" className="text-blue-600 hover:underline">5. Respuesta</a></li>
                <li><a href="#tools" className="text-blue-600 hover:underline">6. Herramientas</a></li>
                <li><a href="#advanced" className="text-blue-600 hover:underline">7. Técnicas avanzadas</a></li>
                <li><a href="#faq" className="text-blue-600 hover:underline">8. FAQ</a></li>
              </ul>
            </nav>
          </div>
        </aside>
      </div>
    </main>
  );
}

/* === Helper components === */
function Checklist({ items, color }: ChecklistProps) {
  return (
    <ul className="space-y-3">
      {items.map((txt, i) => (
        <li key={i} className="flex items-start gap-3 bg-gray-50 p-3 rounded-lg">
          <div className={`w-5 h-5 rounded-full bg-${color}-500 flex-shrink-0 mt-1`} />
          <span className="text-gray-800 text-base">{txt.replace(/\w+\s\(.*?\)/g, match => match.split('(')[0])}</span>
        </li>
      ))}
    </ul>
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