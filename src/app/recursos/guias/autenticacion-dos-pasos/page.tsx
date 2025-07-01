import Link from 'next/link';
import DownloadButton from '@/components/DownloadButton';
import ShareButton from '@/components/ShareButton';
import BackButton from '@/components/BackButton';
import {
  KeyRound as Lock,
  ShieldHalf as Shield,
  Info as InfoIcon,
  Smartphone,
  MessageSquare,
  Mail,
  KeySquare,
  BellRing,
  Dot,
} from 'lucide-react';

export default function AutenticacionDosPasos() {
  const nav = [
    { id: 'que-es', label: '¿Qué es 2FA?' },
    { id: 'metodos', label: 'Métodos disponibles' },
    { id: 'comparativa', label: 'Comparativa rápida' },
    { id: 'config', label: 'Configurar en 3 pasos' },
  ];

  const methods = [
    {
      icon: MessageSquare,
      title: 'SMS / Email',
      desc: 'Código de 6 dígitos enviado por mensaje o correo.',
      sec: 'Media',
      ease: 'Alta',
      color: 'yellow',
    },
    {
      icon: Smartphone,
      title: 'App Authenticator (TOTP)',
      desc: 'Códigos temporales de 30 s en apps como Google Authenticator o Proton Pass.',
      sec: 'Alta',
      ease: 'Media',
      color: 'green',
    },
    {
      icon: BellRing,
      title: 'Push (Microsoft / Duo)',
      desc: 'Notificación push a tu móvil para aprobar el inicio de sesión.',
      sec: 'Alta',
      ease: 'Alta',
      color: 'green',
    },
    {
      icon: KeySquare,
      title: 'Llave hardware FIDO2',
      desc: 'Dispositivo físico (YubiKey) inmune a phishing y SIM‑swap.',
      sec: 'Muy alta',
      ease: 'Media',
      color: 'indigo',
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8 scroll-smooth">
      <div className="max-w-6xl mx-auto">
        <BackButton href="/recursos/guias" label="Volver a guías" />
        <div className="flex flex-col lg:flex-row gap-8 mt-8">
          {/* MAIN */}
          <article className="flex-1">
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
              {/* HERO */}
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-10 text-center border-b border-gray-200">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Lock className="w-10 h-10 text-blue-600" />
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Guía de Autenticación en Dos Pasos</h1>
                <p className="text-gray-900 mb-4 text-lg max-w-2xl mx-auto">Añade una capa extra que bloquea el 96% de los ataques de phishing con un esfuerzo mínimo.</p>
              </div>

              {/* ¿QUÉ ES? */}
              <div className="divide-y divide-gray-100">
                <section className="p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-50">
                      <Shield className="w-6 h-6 text-blue-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">¿Qué es la autenticación en dos pasos?</h2>
                  </div>
                  
                  <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm mb-6">
                    <p className="text-gray-900 mb-4">
                      2FA combina algo que <em>sabes</em> (contraseña) con algo que <em>tienes</em> (código, llave, notificación).
                    </p>
                    
                    <div className="bg-blue-50/50 p-4 rounded-lg border-l-4 border-blue-500">
                      <h3 className="font-bold text-blue-900 mb-3 flex items-center gap-2">
                        <InfoIcon className="w-5 h-5" />
                        ¿Por qué es crucial?
                      </h3>
                      <ul className="list-disc pl-5 space-y-2 text-gray-900">
                        <li>Bloquea el 100% de bots automatizados</li>
                        <li>Neutraliza el 96% de ataques de phishing</li>
                        <li>Requerido por PCI-DSS e ISO 27001</li>
                      </ul>
                    </div>
                  </div>
                </section>

                {/* MÉTODOS */}
                <section className="p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-purple-50">
                      <Smartphone className="w-6 h-6 text-purple-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">Métodos disponibles</h2>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    {methods.map(({ icon: Icon, title, desc, sec, ease, color }) => (
                      <div key={title} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition">
                        <div className="flex items-center gap-3 mb-3">
                          <Icon className={`w-5 h-5 text-${color}-600`} />
                          <h3 className="font-bold text-gray-900">{title}</h3>
                        </div>
                        <p className="text-gray-900 mb-4 text-sm">{desc}</p>
                        <div className="flex justify-between text-xs font-medium">
                          <span>Seguridad: <span className={`text-${color}-600`}>{sec}</span></span>
                          <span>Facilidad: <span className="text-green-600">{ease}</span></span>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* COMPARATIVA */}
                <section className="p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-50">
                      <InfoIcon className="w-6 h-6 text-blue-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">Comparativa rápida</h2>
                  </div>
                  
                  <table className="w-full text-sm border-separate border-spacing-0 rounded-lg overflow-hidden">
                    <thead>
                      <tr className="bg-blue-600 text-white">
                        <th className="p-3 text-left font-medium">Método</th>
                        <th className="p-3 font-medium text-center">Seguridad</th>
                        <th className="p-3 font-medium text-center">Facilidad</th>
                        <th className="p-3 font-medium text-left">Recomendado para</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="even:bg-gray-50 hover:bg-blue-50/50">
                        <td className="p-3 border-b border-gray-200">SMS / Email</td>
                        <td className="p-3 border-b border-gray-200 text-center text-yellow-600 font-medium">Media</td>
                        <td className="p-3 border-b border-gray-200 text-center text-green-600 font-medium">Alta</td>
                        <td className="p-3 border-b border-gray-200">Cuentas de bajo riesgo</td>
                      </tr>
                      <tr className="even:bg-gray-50 hover:bg-blue-50/50">
                        <td className="p-3 border-b border-gray-200">TOTP (App)</td>
                        <td className="p-3 border-b border-gray-200 text-center text-green-600 font-medium">Alta</td>
                        <td className="p-3 border-b border-gray-200 text-center text-green-600 font-medium">Media</td>
                        <td className="p-3 border-b border-gray-200">Usuarios generales</td>
                      </tr>
                      <tr className="even:bg-gray-50 hover:bg-blue-50/50">
                        <td className="p-3 border-b border-gray-200">Push</td>
                        <td className="p-3 border-b border-gray-200 text-center text-green-600 font-medium">Alta</td>
                        <td className="p-3 border-b border-gray-200 text-center text-green-600 font-medium">Alta</td>
                        <td className="p-3 border-b border-gray-200">Entornos corporativos</td>
                      </tr>
                      <tr className="even:bg-gray-50 hover:bg-blue-50/50">
                        <td className="p-3">Llave FIDO2</td>
                        <td className="p-3 text-center text-indigo-600 font-medium">Muy alta</td>
                        <td className="p-3 text-center text-green-600 font-medium">Media</td>
                        <td className="p-3">Admins y financieros</td>
                      </tr>
                    </tbody>
                  </table>
                </section>

                {/* CONFIGURAR */}
                <section className="p-8 bg-gray-50 border-t border-gray-200">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-50">
                      <KeySquare className="w-6 h-6 text-green-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">Configurar 2FA en 3 pasos</h2>
                  </div>
                  
                  <ol className="list-decimal pl-6 space-y-3 text-gray-900">
                    <li>Activa 2FA en la sección <strong>Seguridad</strong> de tu servicio.</li>
                    <li>Escanea el QR con tu app Authenticator o registra tu llave FIDO2.</li>
                    <li>Guarda los códigos de recuperación en tu gestor de contraseñas.</li>
                  </ol>
                </section>

                {/* CTA */}
                <footer className="bg-blue-600 text-white p-8 text-center">
                  <h3 className="text-xl font-bold mb-2">Guías paso a paso por servicio</h3>
                  <p className="mb-6">Aprende a habilitar 2FA en Google, Microsoft, Instagram y más.</p>
                  <Link href="/recursos/guias" className="inline-flex items-center gap-1 bg-white text-blue-600 px-6 py-2 rounded-md font-medium hover:bg-blue-50 transition">
                    Ver todas las guías <Dot className="w-4 h-4" />
                  </Link>
                </footer>
              </div>
            </div>
          </article>

          {/* SIDEBAR */}
          <aside className="lg:w-64">
            <div className="bg-white border border-gray-200 p-6 rounded-lg sticky top-4">
              <DownloadButton />
              <ShareButton />
              <nav className="mt-6">
                <h3 className="text-xs font-medium text-gray-900 uppercase tracking-wider mb-2">Contenido</h3>
                <ul className="space-y-2">
                  {nav.map(({ id, label }, i) => (
                    <li key={id}><a href={`#${id}`} className="text-sm text-blue-600 hover:text-blue-800 flex gap-1"><span>{i + 1}.</span>{label}</a></li>
                  ))}
                </ul>
              </nav>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
