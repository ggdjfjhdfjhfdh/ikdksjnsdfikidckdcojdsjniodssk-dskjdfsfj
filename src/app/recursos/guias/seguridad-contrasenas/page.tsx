'use client';

import Link from 'next/link';
import DownloadButton from '@/components/DownloadButton';
import ShareButton from '@/components/ShareButton';
import BackButton from '@/components/BackButton';
import {
  AlertTriangle,
  BookOpen,
  CheckCircle,
  ChevronDown,
  HelpCircle,
  Key,
  KeySquare,
  Lightbulb,
  Lock,
  PencilLine,
  RefreshCw,
  Search,
  ShieldCheck,
  Users,
  Zap
} from 'lucide-react';
import { useState } from 'react';

/*********************************
 * Utilidades de generación (tipadas)
 *********************************/
const wordList: string[] = [
  'patio', 'apagar', 'mar', 'queso', 'zigzag', 'bicicleta', 'nube', 'telescopio',
  'ventana', 'elefante', 'guitarra', 'jirafa', 'lluvia', 'montaña', 'paraguas',
];
const symbols = '!@#$%^&*()';

// Genérico: devuelve un elemento aleatorio de un array tipado
const random = <T extends string | any[]>(arr: T): T extends string ? string : T[number] => {
  const index = Math.floor(Math.random() * arr.length);
  return (typeof arr === 'string' ? arr[index] : arr[index]) as any;
};

interface Passphrase {
  words: string[];
  combined: string;
}

function generatePassphrase(): Passphrase {
  const words = Array.from({length: 4}, () => random(wordList));
  const caps = Array.from({length: 2}, () => Math.floor(Math.random() * 4));
  const processed = words.map((w, i) => (caps.includes(i) ? w[0].toUpperCase() + w.slice(1) : w));
  const combined = processed.map((w, i) => (i < 3 ? `${w}${random(symbols.split(''))}` : w)).join('') + random(symbols.split(''));
  return { words: processed, combined };
}

function generatePassword(length: number, includeUppercase: boolean, includeNumbers: boolean, includeSymbols: boolean): string {
  const chars = 'abcdefghijklmnopqrstuvwxyz' + (includeUppercase ? 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' : '') + (includeNumbers ? '0123456789' : '') + (includeSymbols ? symbols : '');
  const ensure = [
    random(chars.slice(0, 26).split('')),
    ...(includeUppercase ? [random(chars.slice(26, 52).split(''))] : []),
    ...(includeNumbers ? [random(chars.slice(52, 62).split(''))] : []),
    ...(includeSymbols ? [random(symbols.split(''))] : []),
  ];
  const rest = Array.from({length: length - ensure.length}, () => random(chars.split('')));
  return [...ensure, ...rest].sort(() => 0.5 - Math.random()).join('');
}

/*********************************
 * Componente principal
 *********************************/
export default function SeguridadContrasenas() {
  const [passphrase, setPassphrase] = useState<Passphrase>(generatePassphrase());
  const [password, setPassword] = useState<string>(generatePassword(12, true, true, true));
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [length, setLength] = useState(12);

  const navItems = [
    { id: 'plan-directo', label: 'Plan exprés' },
    { id: 'crisis', label: 'Radiografía del riesgo' },
    { id: 'crear-contrasenas', label: 'Crea contraseñas' },
    { id: 'errores-comunes', label: 'Errores a evitar' },
    { id: 'solucion', label: 'Estrategia 4 pasos' },
    { id: 'checklist', label: 'Checklist' },
    { id: 'faq', label: 'FAQ' },
    { id: 'recursos', label: 'Recursos' },
  ];

  const steps = [
    {
      icon: Lock,
      title: 'Gestor — Proton Pass',
      color: 'indigo',
      items: [
        'Claves aleatorias de 20+ caracteres',
        'Bóveda E2EE sincronizada',
        'Autorrelleno y auditoría de duplicados',
        'Backup cifrado en un clic',
      ],
    },
    {
      icon: Zap,
      title: 'Habilita MFA',
      color: 'emerald',
      items: [
        'TOTP con Authenticator / Proton Pass',
        'Llaves FIDO2 (YubiKey, SoloKey)',
        'Evita SMS: vulnerable a SIM swapping',
      ],
    },
    {
      icon: Search,
      title: 'Monitoriza filtraciones',
      color: 'yellow',
      items: [
        'Alertas Have I Been Pwned',
        'Escaneo dark web del gestor',
        'Revisión de seguridad trimestral',
      ],
    },
    {
      icon: Users,
      title: 'Política de equipo',
      color: 'sky',
      items: [
        'MFA obligatorio en todos los accesos',
        'Contraseñas únicas ≥ 16 caracteres',
        'SSO para revocaciones instantáneas',
        'Formación phishing cada 3 meses',
      ],
    },
  ];

  const resources = [
    { href: 'https://www.nist.gov/itl/tig/projects/special-publication-800-63', title: 'NIST SP 800‑63B', desc: 'Identidad digital (EE. UU.)' },
    { href: 'https://www.cisecurity.org/controls/v8', title: 'CIS Controls v8', desc: 'Controles de ciberseguridad prioritarios' },
    { href: 'https://owasp.org/www-project-top-ten/', title: 'OWASP Top 10', desc: 'Riesgos críticos de aplicaciones web' },
  ];

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 scroll-smooth">
      <div className="max-w-6xl mx-auto">
        <BackButton href="/recursos/guias" label="Volver a guías" />
        <div className="flex flex-col lg:flex-row gap-8 mt-6">
          {/* MAIN */}
          <article className="flex-1">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              {/* HERO */}
              <header className="bg-gradient-to-r from-orange-50 to-orange-100 p-10 text-center border-b border-gray-200">
                <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <KeySquare className="w-10 h-10 text-orange-600" />
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Guía de Seguridad de Contraseñas</h1>
                <p className="text-gray-900 text-lg max-w-2xl mx-auto">Protege tus cuentas con contraseñas robustas y técnicas modernas.</p>
              </header>

              {/* CONTENT */}
              <div className="divide-y divide-gray-200 space-y-10">
                {/* PLAN DIRECTO */}
                <section id="plan-directo" className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-50">
                      <Zap className="w-6 h-6 text-blue-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">Plan exprés (60 s)</h2>
                  </div>
                  <ol className="space-y-3 pl-2">
                    <li className="flex items-start gap-3">
                      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-700 font-medium">1</span>
                      <span className="text-gray-800">
                        <strong>Instala Proton Pass</strong> y genera claves únicas para cada cuenta
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-700 font-medium">2</span>
                      <span className="text-gray-800">
                        <strong>Asegura todas tus cuentas</strong> con autenticación multifactor (MFA)
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-700 font-medium">3</span>
                      <span className="text-gray-800">
                        <strong>Revisa credenciales filtradas</strong> cada trimestre en Have I Been Pwned
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-700 font-medium">4</span>
                      <span className="text-gray-800">
                        <strong>Haz backup cifrado</strong> de tu bóveda de contraseñas
                      </span>
                    </li>
                  </ol>
                </section>

                {/* CRISIS */}
                <section id="crisis" className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-xl">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-50">
                      <AlertTriangle className="w-6 h-6 text-red-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">Radiografía del riesgo</h2>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm">
                      <p className="text-sm font-medium text-gray-500">Cifras clave</p>
                      <p className="text-2xl font-bold text-gray-900 mt-1">81 % de las brechas inician con credenciales robadas.</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm">
                      <p className="text-sm font-medium text-gray-500">Ejemplos recientes</p>
                      <p className="text-2xl font-bold text-gray-900 mt-1">E‑commerce perdió $2 M por reutilizar contraseñas.</p>
                    </div>
                  </div>
                </section>

                {/* CREAR CONTRAS */}
                <section id="crear-contrasenas" className="space-y-12 py-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-orange-50">
                      <PencilLine className="w-6 h-6 text-orange-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">Genera contraseñas robustas</h2>
                  </div>

                  <div className="pb-8">
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <p className="text-gray-800 mb-3">Las contraseñas complejas son esenciales para proteger cuentas críticas donde no se puede usar autenticación moderna:</p>
                      <ul className="list-disc pl-5 text-gray-800 space-y-1">
                        <li>Únicas para cada servicio</li>
                        <li>Aleatorias e impredecibles</li>
                        <li>Guardadas en un gestor de contraseñas</li>
                      </ul>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                      <div className="p-6">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-50">
                            <Key className="w-5 h-5 text-blue-600" />
                          </div>
                          <h3 className="text-lg font-semibold text-gray-900">Generador de contraseñas</h3>
                        </div>
                        
                        <div className="flex items-center gap-3 mb-4">
                          <input
                            type="text"
                            value={password}
                            readOnly
                            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg font-mono text-gray-900 text-sm"
                          />
                          <button
                            onClick={() => setPassword(generatePassword(length, includeUppercase, includeNumbers, includeSymbols))}
                            className="p-3 rounded-lg bg-gray-50 hover:bg-gray-100 text-gray-600 hover:text-gray-900 transition"
                          >
                            <RefreshCw className="w-5 h-5" />
                          </button>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <label className="flex items-center gap-2 text-gray-800">
                              <input type="checkbox" checked={includeUppercase} onChange={() => setIncludeUppercase(!includeUppercase)} />
                              Mayúsculas
                            </label>
                          </div>
                          <div>
                            <label className="flex items-center gap-2 text-gray-800">
                              <input type="checkbox" checked={includeNumbers} onChange={() => setIncludeNumbers(!includeNumbers)} />
                              Números
                            </label>
                          </div>
                          <div>
                            <label className="flex items-center gap-2 text-gray-800">
                              <input type="checkbox" checked={includeSymbols} onChange={() => setIncludeSymbols(!includeSymbols)} />
                              Símbolos
                            </label>
                          </div>
                          <div>
                            <label className="flex items-center gap-2 text-gray-800">
                              <input 
                                type="range" 
                                min="12" 
                                max="20" 
                                value={length} 
                                onChange={(e) => setLength(parseInt(e.target.value))}
                                className="w-full"
                              />
                              <span>{length} caracteres</span>
                            </label>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">
                        <p className="text-xs text-gray-500">Longitud recomendada: 16+ caracteres</p>
                      </div>
                    </div>
                  </div>

                  <div className="pb-8">
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <p className="text-gray-800 mb-3">Las passphrases ofrecen un equilibrio perfecto entre seguridad y usabilidad:</p>
                      <ul className="list-disc pl-5 text-gray-800 space-y-1">
                        <li>Más fáciles de recordar que cadenas aleatorias</li>
                        <li>Igual de seguras que contraseñas complejas (70+ bits de entropía)</li>
                        <li>Resistentes a ataques de diccionario</li>
                        <li>Ideales para claves maestras o de cifrado</li>
                      </ul>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                      <div className="p-6">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-50">
                            <Lock className="w-5 h-5 text-green-600" />
                          </div>
                          <h3 className="text-lg font-semibold text-gray-900">Generador de passphrases</h3>
                        </div>
                        
                        <div className="mb-4">
                          <div className="flex flex-wrap gap-2 mb-3">
                            {passphrase.words.map((w) => (
                              <span key={w} className="bg-gray-50 px-3 py-1.5 rounded-md text-gray-800 text-sm font-medium">
                                {w}
                              </span>
                            ))}
                          </div>
                          
                          <div className="flex items-center gap-3">
                            <input
                              type="text"
                              value={passphrase.combined}
                              readOnly
                              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg font-mono text-gray-900 text-sm"
                            />
                            <button
                              onClick={() => setPassphrase(generatePassphrase())}
                              className="p-3 rounded-lg bg-gray-50 hover:bg-gray-100 text-gray-600 hover:text-gray-900 transition"
                            >
                              <RefreshCw className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">
                        <p className="text-xs text-gray-500">4-5 palabras aleatorias con símbolos</p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-8">
                    <div className="bg-blue-50 p-4 rounded-md border border-blue-200 flex gap-3">
                      <Lightbulb className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-gray-800">
                        <strong>Recomendación:</strong> Usa passphrases para claves maestras y contraseñas para servicios individuales.
                        Prioriza <strong>longitud</strong> sobre complejidad arbitraria.
                      </p>
                    </div>
                  </div>
                </section>

                {/* ERRORES */}
                <section id="errores-comunes" className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-50">
                      <AlertTriangle className="w-6 h-6 text-red-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">Errores a evitar</h2>
                  </div>
                  <ul className="list-disc pl-6 space-y-2 text-gray-900">
                    <li>Reutilizar contraseñas o variarlas mínimamente.</li>
                    <li>Usar datos personales (fechas, nombres, ciudades).</li>
                    <li>Confiar solo en SMS como segundo factor.</li>
                  </ul>
                </section>

                {/* SOLUCION */}
                <section id="solucion" className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-xl">
                  <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
                      <ShieldCheck className="w-8 h-8 text-green-600" />
                      <span>Estrategia en <span className="text-green-600">4 pasos</span></span>
                    </h2>
                    <p className="text-lg text-gray-600 mb-8">Implementa esta estrategia completa para proteger tus credenciales</p>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      {[
                        {
                          title: "1 · Implanta un gestor (Proton Pass)",
                          subtitle: "Centralizar y blindar todas las credenciales",
                          items: [
                            "Genera contraseñas únicas ≥ 20 caracteres",
                            "Bóveda E2EE sincronizada en todos los dispositivos",
                            "Autorrelleno y auditoría de duplicados",
                            "Programa un backup cifrado semanal en un medio offline"
                          ],
                          icon: <Key className="w-6 h-6 text-green-600" />
                        },
                        {
                          title: "2 · Activa MFA robusto",
                          subtitle: "Reducir al mínimo el impacto de un robo de contraseña",
                          items: [
                            "Habilita TOTP (Authenticator o Proton Pass) en cada cuenta",
                            "Para accesos críticos, exige clave FIDO2 (YubiKey/SoloKey)",
                            "Usa SMS solo como método de recuperación, nunca primario"
                          ],
                          icon: <Lock className="w-6 h-6 text-green-600" />
                        },
                        {
                          title: "3 · Monitoriza filtraciones",
                          subtitle: "Detectar exposición antes de que se convierta en incidente",
                          items: [
                            "Suscribe tu dominio a Have I Been Pwned",
                            "Activa el escaneo de dark web del gestor",
                            "Revisa y corrige alertas de seguridad cada 90 días"
                          ],
                          icon: <Search className="w-6 h-6 text-green-600" />
                        },
                        {
                          title: "4 · Refuerza la cultura de seguridad",
                          subtitle: "Garantizar que las medidas perduren",
                          items: [
                            "MFA obligatorio en todos los sistemas",
                            "Contraseñas únicas ≥ 16 caracteres por defecto",
                            "Integra SSO para altas/bajas inmediatas",
                            "Ofrece formación de 'phishing + gestión de credenciales' trimestral"
                          ],
                          icon: <Users className="w-6 h-6 text-green-600" />
                        }
                      ].map((step, index) => (
                        <div 
                          key={index} 
                          className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                        >
                          <div className="flex items-center gap-4 mb-4">
                            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-50">
                              {step.icon}
                            </div>
                            <div>
                              <h3 className="font-bold text-lg text-gray-900">{step.title}</h3>
                              <p className="text-gray-600">{step.subtitle}</p>
                            </div>
                          </div>
                          <ul className="space-y-2 pl-2">
                            {step.items.map((item, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <CheckCircle className="w-4 h-4 mt-1 text-green-500 flex-shrink-0" />
                                <span className="text-gray-600">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>

                {/* CHECKLIST */}
                <section id="checklist" className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-indigo-50">
                      <CheckCircle className="w-6 h-6 text-indigo-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">Checklist rápido</h2>
                  </div>
                  <ul className="list-disc pl-6 space-y-2 text-gray-900">
                    <li>Gestor de contraseñas configurado</li>
                    <li>MFA habilitado en cuentas críticas</li>
                    <li>Contraseñas únicas ≥ 16 caracteres</li>
                    <li>Revisión de filtraciones &lt; 90 días</li>
                  </ul>
                </section>

                {/* FAQ */}
                <section id="faq" className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-50">
                      <HelpCircle className="w-6 h-6 text-blue-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">Preguntas frecuentes</h2>
                  </div>
                  <div className="space-y-4">
                    {[
                      { q: '¿Cada cuánto debo cambiar mis contraseñas?', a: 'Solo cuando haya indicios de filtración o si la cuenta no tiene MFA. Rotaciones periódicas sin motivo suelen empeorar la seguridad.' },
                      { q: '¿Qué tan seguras son las passphrases frente a contraseñas “complejas”?', a: 'Una passphrase de 4-5 palabras aleatorias (≥ 70 bits de entropía) es tan segura como una cadena aleatoria de 20+ caracteres y mucho más fácil de recordar.' },
                      { q: '¿El gestor de contraseñas no es un único punto de fallo?', a: 'Con una contraseña maestra larga, MFA y cifrado E2EE, el riesgo es menor que gestionar claves manualmente. El verdadero punto de fallo es reutilizar contraseñas.' },
                      { q: '¿Qué hago si sospecho que han robado mi contraseña?', a: 'Cambiarla de inmediato, cerrar sesiones, habilitar MFA y revisar movimientos o correos de restablecimiento. Si usas esa clave en más sitios, cámbiala allí también.' },
                      { q: '¿Es seguro usar el autocompletado del navegador?', a: 'Aceptable para cuentas de baja criticidad. Para todo lo demás, usa un gestor dedicado: tiene cifrado extremo-a-extremo y alertas de filtración.' },
                      { q: '¿Las “passkeys” reemplazarán a las contraseñas?', a: 'A medio plazo sí, pero la mayoría de servicios aún requiere contraseña. Prepárate para convivir con ambas y activa passkeys donde estén disponibles.' },
                      { q: '¿MFA ralentiza la experiencia de usuario?', a: 'Solo añade segundos al inicio de sesión y evita horas (o años) de daños por una intrusión. El coste-beneficio es abrumadoramente positivo.' }
                    ].map(({ q, a }) => (
                      <details key={q} className="group [&_summary::-webkit-details-marker]:hidden">
                        <summary className="flex cursor-pointer items-center justify-between gap-1.5 rounded-lg bg-gray-50 p-4 text-gray-900">
                          <h3 className="text-lg font-medium">{q}</h3>
                          <ChevronDown className="h-5 w-5 shrink-0 transition duration-300 group-open:-rotate-180" />
                        </summary>
                        <div className="p-4 bg-white rounded-b-lg">
                          <p className="text-gray-600 text-lg leading-relaxed">{a}</p>
                        </div>
                      </details>
                    ))}
                  </div>
                </section>

                {/* RECURSOS */}
                <section id="recursos" className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-50">
                      <BookOpen className="w-6 h-6 text-blue-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">Recursos recomendados</h2>
                  </div>
                  <div className="grid md:grid-cols-3 gap-4">
                    {resources.map(({ href, title, desc }) => (
                      <a key={href} href={href} target="_blank" rel="noopener noreferrer" className="bg-white rounded-lg p-4 hover:border-blue-400 transition">
                        <h3 className="font-medium text-gray-900 mb-1">{title}</h3>
                        <p className="text-sm text-gray-600">{desc}</p>
                      </a>
                    ))}
                  </div>
                </section>

                {/* CTA */}
                <footer className="bg-blue-600 text-white p-8 text-center">
                  <h3 className="text-xl font-bold mb-2">¿Necesitas ayuda profesional?</h3>
                  <p className="mb-6">Nuestro equipo puede implantar políticas robustas en menos de 2 semanas.</p>
                  <Link href="/contacto" className="inline-block bg-white text-blue-600 px-6 py-2 rounded-md font-medium hover:bg-blue-50 transition">Contactar ahora</Link>
                </footer>
              </div>
            </div>
          </article>

          {/* SIDEBAR */}
          <aside className="lg:w-64">
            <div className="bg-white border border-gray-200 p-6 rounded-lg sticky top-4 space-y-6">
              <DownloadButton />
              <ShareButton />
              <nav>
                <h3 className="text-xs font-medium text-gray-900 uppercase tracking-wider mb-3">Contenido</h3>
                <ul className="space-y-2">
                  {navItems.map(({ id, label }, i) => (
                    <li key={id}><a href={`#${id}`} className="text-sm text-blue-600 hover:text-blue-800 flex gap-1">{i + 1}. {label}</a></li>
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
