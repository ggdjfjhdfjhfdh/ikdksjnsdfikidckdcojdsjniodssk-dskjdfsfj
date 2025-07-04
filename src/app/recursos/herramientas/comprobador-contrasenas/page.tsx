"use client";

import { useState } from 'react';
import { 
  CheckCircleIcon, 
  ArrowTopRightOnSquareIcon, 
  LockClosedIcon,
  KeyIcon,
  EnvelopeIcon,
  DevicePhoneMobileIcon,
  GlobeAltIcon,
  ShieldCheckIcon,
  UserGroupIcon,
  InformationCircleIcon,
  DocumentMagnifyingGlassIcon,
  Cog6ToothIcon,
  ChevronLeftIcon,
  EyeIcon,
  EyeSlashIcon,
  ClipboardDocumentIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';

type StrengthInfo = { score: number; label: string; color: string };

function computeStrength(pwd: string): StrengthInfo {
  if (!pwd) return { score: 0, label: '', color: 'bg-transparent' };

  let score = 0;
  if (pwd.length >= 8) score++;
  if (/[A-Z]/.test(pwd)) score++;
  if (/[a-z]/.test(pwd)) score++;
  if (/[0-9]/.test(pwd)) score++;
  if (/[^A-Za-z0-9]/.test(pwd)) score++;

  const labels = ['Muy débil', 'Muy débil', 'Débil', 'Media', 'Fuerte', 'Muy fuerte'];
  const colors = ['bg-red-500', 'bg-red-500', 'bg-orange-500', 'bg-yellow-400', 'bg-green-500', 'bg-emerald-600'];

  return { score, label: labels[score], color: colors[score] };
}

function generatePassword(
  length: number,
  upper: boolean,
  lower: boolean,
  numbers: boolean,
  symbols: boolean
): string {
  let charset = '';
  if (upper) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  if (lower) charset += 'abcdefghijklmnopqrstuvwxyz';
  if (numbers) charset += '0123456789';
  if (symbols) charset += '!@#$%^&*()_+~`|}{[]:;?><,./-=';
  if (!charset) return '';

  let pwd = '';
  const randomValues = new Uint32Array(length);
  crypto.getRandomValues(randomValues);
  randomValues.forEach((v) => {
    pwd += charset[v % charset.length];
  });
  return pwd;
}

export default function PasswordChecker() {
  const [password, setPassword] = useState('');
  const [copied, setCopied] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [length, setLength] = useState(16);
  const [useUpper, setUseUpper] = useState(true);
  const [useLower, setUseLower] = useState(true);
  const [useNumbers, setUseNumbers] = useState(true);
  const [useSymbols, setUseSymbols] = useState(true);
  const [showPassInfo, setShowPassInfo] = useState(false);
  const { score, label, color } = computeStrength(password);
  const progress = `${(score / 5) * 100}%`;

  const criteria = [
    { key: 'length', label: 'Al menos 8 caracteres', met: password.length >= 8 },
    { key: 'upper', label: 'Incluye letra mayúscula', met: /[A-Z]/.test(password) },
    { key: 'lower', label: 'Incluye letra minúscula', met: /[a-z]/.test(password) },
    { key: 'number', label: 'Incluye número', met: /[0-9]/.test(password) },
    { key: 'symbol', label: 'Incluye símbolo especial', met: /[^A-Za-z0-9]/.test(password) },
  ];

  const handleGenerate = () => {
    const newPassword = generatePassword(length, useUpper, useLower, useNumbers, useSymbols);
    setPassword(newPassword);
    setCopied(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-100 flex flex-col items-center px-4 sm:px-6 py-8 sm:py-16">
      <div className="absolute inset-0 pointer-events-none select-none opacity-60" aria-hidden>
        <div className="absolute w-96 h-96 bg-gray-300 rounded-full blur-3xl top-[-10%] left-[-10%]" />
        <div className="absolute w-48 h-48 bg-gray-200 rounded-full blur-2xl top-[60%] left-[70%]" />
      </div>

      {/* Back button */}
      <Link href="/recursos/herramientas" className="self-start mb-4 sm:mb-6 ml-4 sm:ml-16 flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors">
        <ChevronLeftIcon className="h-5 w-5" />
        Volver
      </Link>

      {/* Main checker section */}
      <section className="w-full max-w-2xl sm:max-w-4xl mx-auto px-4 relative mb-8 sm:mb-16">
        {/* Simple title section */}
        <div className="mb-8 sm:mb-10 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">Evalúa la fortaleza de tu clave</h1>
          <p className="text-gray-700 text-lg sm:text-xl max-w-2xl mx-auto">
            Comprueba si tu contraseña es segura y recibe recomendaciones para mejorarla
          </p>
        </div>

        {/* Password input */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8 sm:mb-12">
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setCopied(false);
                }}
                placeholder="Introduce tu contraseña"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? (
                  <EyeSlashIcon className="h-5 w-5" />
                ) : (
                  <EyeIcon className="h-5 w-5" />
                )}
              </button>
            </div>
            <button
              onClick={handleCopy}
              disabled={!password}
              className={`px-4 py-3 rounded-lg font-medium flex items-center justify-center gap-2 ${password
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'}`}
            >
              {copied ? (
                <>
                  <CheckCircleIcon className="h-5 w-5" />
                  Copiada
                </>
              ) : (
                <>
                  <ClipboardDocumentIcon className="h-5 w-5" />
                  Copiar
                </>
              )}
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-800 mb-1">Longitud: {length}</label>
              <input
                type="range"
                min="4"
                max="50"
                value={length}
                onChange={(e) => setLength(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center gap-3">
                <input 
                  type="checkbox" 
                  id="useUpper" 
                  checked={useUpper} 
                  onChange={() => setUseUpper(!useUpper)} 
                  className="text-gray-800"
                />
                <label htmlFor="useUpper" className="text-gray-800">Mayúsculas</label>
              </div>
              <div className="flex items-center gap-3">
                <input 
                  type="checkbox" 
                  id="useLower" 
                  checked={useLower} 
                  onChange={() => setUseLower(!useLower)} 
                  className="text-gray-800"
                />
                <label htmlFor="useLower" className="text-gray-800">Minúsculas</label>
              </div>
              <div className="flex items-center gap-3">
                <input 
                  type="checkbox" 
                  id="useNumbers" 
                  checked={useNumbers} 
                  onChange={() => setUseNumbers(!useNumbers)} 
                  className="text-gray-800"
                />
                <label htmlFor="useNumbers" className="text-gray-800">Números</label>
              </div>
              <div className="flex items-center gap-3">
                <input 
                  type="checkbox" 
                  id="useSymbols" 
                  checked={useSymbols} 
                  onChange={() => setUseSymbols(!useSymbols)} 
                  className="text-gray-800"
                />
                <label htmlFor="useSymbols" className="text-gray-800">Símbolos</label>
              </div>
            </div>
          </div>

          <button
            onClick={handleGenerate}
            className="flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-medium rounded-lg transition-colors shadow-md"
          >
            <span>Generar</span>
          </button>
        </div>

        {/* Panel de resultados */}
        <div className="bg-gray-50 p-5 rounded-xl">
          <div className="flex justify-between items-center mb-2">
            <h4 className="font-medium text-gray-800 mb-2">Fortaleza</h4>
            <span className={`font-bold capitalize px-3 py-1 rounded-full text-xs ${color.replace('bg-', 'text-')} ${color.replace('bg-', 'bg-').replace('-500', '-100')}`}>
              {label}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div className={`h-2.5 rounded-full ${color}`} style={{ width: `${progress}%` }}></div>
          </div>
        </div>

        <div className="bg-gray-50 p-5 rounded-xl space-y-3">
          <h4 className="font-medium text-gray-800 mb-2">Recomendaciones</h4>
          <ul className="space-y-2 text-sm text-gray-600 list-disc list-inside">
            {password && (
              <>
                <li>Longitud mínima recomendada: 12 caracteres</li>
                <li>Usa una combinación de mayúsculas, minúsculas, números y símbolos</li>
                <li>Evita información personal o patrones comunes</li>
                <li>Considera usar un gestor de contraseñas</li>
              </>
            )}
            {!password && <li className="text-gray-700">Introduce o genera una contraseña para ver recomendaciones</li>}
          </ul>
        </div>
      </section>

      {/* ProtonPass Recommendation - Premium UI */}
      <div className="mt-12 bg-purple-50/50 border border-purple-100 rounded-2xl p-8 shadow-xl">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row gap-8 items-center mb-8">
            <div className="bg-purple-100 p-4 rounded-xl shadow-inner">
              <ShieldCheckIcon className="h-12 w-12 text-purple-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2"><span className="text-purple-600">ProtonPass</span></h2>
              <p className="text-gray-600 text-lg">El gestor de contraseñas más seguro con cifrado de extremo a extremo y código abierto.</p>
            </div>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl border border-purple-100 shadow-sm hover:shadow-md transition-all">
              <div className="flex items-center gap-3 mb-3">
                <ShieldCheckIcon className="h-6 w-6 text-purple-500" />
                <h3 className="font-semibold text-gray-900">Gestión de Equipos</h3>
              </div>
              <p className="text-gray-600 text-sm">Control centralizado de accesos con roles personalizados y auditoría detallada para empresas.</p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-purple-100 shadow-sm hover:shadow-md transition-all">
              <div className="flex items-center gap-3 mb-3">
                <UserGroupIcon className="h-6 w-6 text-purple-500" />
                <h3 className="font-semibold text-gray-900">Comparte sin Riesgos</h3>
              </div>
              <p className="text-gray-600 text-sm">Envía credenciales de forma segura mediante enlaces temporales y con control de accesos.</p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-purple-100 shadow-sm hover:shadow-md transition-all">
              <div className="flex items-center gap-3 mb-3">
                <LockClosedIcon className="h-6 w-6 text-purple-500" />
                <h3 className="font-semibold text-gray-900">Llaves de Seguridad</h3>
              </div>
              <p className="text-gray-600 text-sm">Protección adicional con YubiKey y autenticación en dos pasos para máxima seguridad.</p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-purple-100 shadow-sm hover:shadow-md transition-all">
              <div className="flex items-center gap-3 mb-3">
                <GlobeAltIcon className="h-6 w-6 text-purple-500" />
                <h3 className="font-semibold text-gray-900">Asistencia Premium</h3>
              </div>
              <p className="text-gray-600 text-sm">Soporte técnico prioritario con respuesta garantizada en menos de 4 horas.</p>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4">
            <a 
              href=" https://go.getproton.me/SH1Xr" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg shadow-md transition-colors flex items-center justify-center gap-2"
            >
              <ArrowTopRightOnSquareIcon className="h-5 w-5" />
              Probar ProtonPass
            </a>
            <button 
              className="px-6 py-3 bg-white border border-purple-200 hover:bg-purple-50 text-purple-600 font-medium rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2"
              onClick={() => setShowPassInfo(!showPassInfo)}
            >
              <InformationCircleIcon className="h-5 w-5" />
              Más información
            </button>
          </div>

          {/* Info Section */}
          {showPassInfo && (
            <div className="mt-6 bg-purple-50 p-6 rounded-xl border border-purple-100">
              <h3 className="font-semibold text-gray-900 mb-3">Tecnología de ProtonPass</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Security Features */}
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <LockClosedIcon className="h-5 w-5 text-purple-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-gray-900">Cifrado de extremo a extremo</h4>
                      <p className="text-gray-700 text-sm">Todos los datos se cifran en tu dispositivo antes de enviarse a los servidores.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <ShieldCheckIcon className="h-5 w-5 text-purple-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-gray-900">Almacenamiento seguro</h4>
                      <p className="text-gray-700 text-sm">Bóvedas cifradas con AES-GCM de 256 bits y claves generadas aleatoriamente.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <KeyIcon className="h-5 w-5 text-purple-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-gray-900">Generación de contraseñas</h4>
                      <p className="text-gray-700 text-sm">Crea contraseñas seguras y únicas para cada cuenta.</p>
                    </div>
                  </div>
                </div>
                
                {/* Convenience Features */}
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <DevicePhoneMobileIcon className="h-5 w-5 text-purple-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-gray-900">Autocompletado seguro</h4>
                      <p className="text-gray-700 text-sm">Rellena automáticamente credenciales en todos tus dispositivos.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <UserGroupIcon className="h-5 w-5 text-purple-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-gray-900">Uso compartido seguro</h4>
                      <p className="text-gray-700 text-sm">Comparte credenciales sin revelar el contenido real.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <EnvelopeIcon className="h-5 w-5 text-purple-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-gray-900">Alias de correo</h4>
                      <p className="text-gray-700 text-sm">Protege tu email real con alias desechables.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Additional Security */}
              <div className="mt-6 pt-6 border-t border-purple-100">
                <h4 className="font-medium text-gray-900 mb-3">Garantías de seguridad</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-start gap-2">
                    <GlobeAltIcon className="h-5 w-5 text-purple-500 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-700 text-sm">Código abierto y auditable públicamente</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <DocumentMagnifyingGlassIcon className="h-5 w-5 text-purple-500 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-700 text-sm">Auditorías independientes periódicas</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <Cog6ToothIcon className="h-5 w-5 text-purple-500 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-700 text-sm">Integración con ecosistema Proton</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Security information */}
      <div className="mt-16 max-w-4xl mx-auto bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-lg">
        <div className="prose prose-purple max-w-none">
          <h3 className="text-xl font-bold text-gray-900 mb-4">¿Por qué es importante usar contraseñas únicas para cada servicio?</h3>
          <p className="text-gray-700 mb-6">
            El 65% de los usuarios reutiliza contraseñas en múltiples sitios. Cuando una cuenta se ve comprometida,
            los atacantes prueban esas mismas credenciales en otros servicios. Usar contraseñas únicas previene
            este "efecto dominó" y limita el daño potencial de cualquier filtración de datos.
          </p>
          
          <div className="mt-6 p-4 bg-purple-50 rounded-lg border border-purple-100">
            <p className="text-purple-800 font-medium">
              💡 Consejo profesional: Usar un gestor de contraseñas como 
              <a href="https://go.getproton.me/SH1Xr" className="text-purple-600 hover:underline font-bold"> ProtonPass</a> te permite generar y almacenar 
              credenciales complejas y únicas para cada servicio sin necesidad de memorizarlas.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
