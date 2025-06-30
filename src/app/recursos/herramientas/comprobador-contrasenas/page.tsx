"use client";

import { useState } from 'react';

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
    <main className="min-h-screen bg-gradient-to-br from-sky-100 via-white to-blue-100 flex items-center justify-center px-4 py-16">
      <div className="absolute inset-0 pointer-events-none select-none opacity-60" aria-hidden>
        <div className="absolute w-96 h-96 bg-blue-300 rounded-full blur-3xl top-[-10%] left-[-10%]" />
        <div className="absolute w-48 h-48 bg-purple-200 rounded-full blur-2xl top-[60%] left-[70%]" />
      </div>
      <section className="w-full max-w-6xl mx-auto px-4 md:px-10 relative">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-blue-100 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-500 to-sky-500 p-6 text-white">
            <div className="flex items-center gap-4">
              <div className="text-4xl">🔒</div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Generador y comprobador de contraseñas</h1>
                <p className="text-blue-100">Crea contraseñas seguras y comprueba su fortaleza</p>
              </div>
            </div>
          </div>

          {/* Contenido principal */}
          <div className="p-6 md:p-8 grid gap-8 md:grid-cols-2">
            {/* Panel de generación */}
            <div className="space-y-6">
              <div className="flex flex-col gap-4">
                <div className="flex gap-3">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="flex-1 border border-gray-200 rounded-lg p-3 text-gray-900 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                    placeholder="Introduce o genera una contraseña"
                  />
                  <button
                    onClick={() => setShowPassword(!showPassword)}
                    className="p-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                    aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                  >
                    {showPassword ? '👁️' : '👁️‍🗨️'}
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={handleGenerate}
                    className="flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-blue-500 to-sky-500 hover:from-blue-600 hover:to-sky-600 text-white font-medium rounded-lg transition-colors"
                  >
                    <span>Generar</span>
                  </button>
                  <button
                    onClick={handleCopy}
                    disabled={!password}
                    className={`flex items-center justify-center gap-2 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors ${copied ? 'ring-2 ring-green-400' : ''}`}
                  >
                    <span>{copied ? 'Copiado!' : 'Copiar'}</span>
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Longitud: {length}</label>
                  <input
                    type="range"
                    min="4"
                    max="64"
                    value={length}
                    onChange={(e) => setLength(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="h-5 w-5 text-blue-600 rounded" checked={useUpper} onChange={() => setUseUpper(!useUpper)} />
                    <span>Mayúsculas</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="h-5 w-5 text-blue-600 rounded" checked={useLower} onChange={() => setUseLower(!useLower)} />
                    <span>Minúsculas</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="h-5 w-5 text-blue-600 rounded" checked={useNumbers} onChange={() => setUseNumbers(!useNumbers)} />
                    <span>Números</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="h-5 w-5 text-blue-600 rounded" checked={useSymbols} onChange={() => setUseSymbols(!useSymbols)} />
                    <span>Símbolos</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Panel de resultados */}
            <div className="space-y-6">
              <div className="bg-gray-50 p-5 rounded-xl">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-gray-700">Fortaleza</span>
                  <span className={`font-bold capitalize px-3 py-1 rounded-full text-xs ${color.replace('bg-', 'text-')} ${color.replace('bg-', 'bg-').replace('-500', '-100')}`}>
                    {label}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className={`h-2.5 rounded-full ${color}`} style={{ width: `${progress}%` }}></div>
                </div>
              </div>

              <div className="bg-gray-50 p-5 rounded-xl space-y-3">
                <h3 className="font-medium text-gray-700">Recomendaciones</h3>
                <ul className="space-y-2 text-sm text-gray-600 list-disc list-inside">
                  {password && (
                    <>
                      <li>Longitud mínima recomendada: 12 caracteres</li>
                      <li>Usa una combinación de mayúsculas, minúsculas, números y símbolos</li>
                      <li>Evita información personal o patrones comunes</li>
                      <li>Considera usar un gestor de contraseñas</li>
                    </>
                  )}
                  {!password && <li>Introduce o genera una contraseña para ver recomendaciones</li>}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
