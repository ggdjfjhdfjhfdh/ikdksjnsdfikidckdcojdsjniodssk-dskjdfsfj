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
  ClipboardDocumentIcon,
  XCircleIcon,
  LightBulbIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useI18n } from '@/lib/i18n';

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
  const { t } = useI18n();
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
    { key: 'upper', label: t('passwordUppercase'), met: /[A-Z]/.test(password) },
    { key: 'lower', label: t('passwordLowercase'), met: /[a-z]/.test(password) },
    { key: 'number', label: t('passwordNumber'), met: /[0-9]/.test(password) },
    { key: 'symbol', label: t('passwordSymbol'), met: /[^A-Za-z0-9]/.test(password) },
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
        {t('backButton')}
      </Link>

      {/* Main checker section */}
      <section className="w-full max-w-2xl sm:max-w-4xl mx-auto px-4 relative mb-8 sm:mb-16">
        {/* Simple title section */}
        <div className="mb-8 sm:mb-10 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">{t('passwordCheckerTitle')}</h1>
          <p className="text-gray-700 text-lg sm:text-xl max-w-2xl mx-auto">
            {t('passwordCheckerSubtitle')}
          </p>
        </div>

        {/* Password input */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8 sm:mb-12">
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <input
                type={showPassword ? 'text' : 'password'}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder={t('passwordPlaceholder')}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
                  {t('copiedButton')}
                </>
              ) : (
                <>
                  <ClipboardDocumentIcon className="h-5 w-5" />
                  {t('copyButton')}
                </>
              )}
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-800 mb-1">
                {t('length')}: {length} {t('passwordLengthUnit')}
              </label>
              <input
                type="range"
                min="4"
                max="50"
                value={length}
                onChange={(e) => setLength(parseInt(e.target.value))}
                className="w-full h-2.5 bg-gray-200 rounded-lg appearance-none cursor-pointer"
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
                <label htmlFor="useUpper" className="text-gray-800">{t('passwordUppercase')}</label>
              </div>
              <div className="flex items-center gap-3">
                <input 
                  type="checkbox" 
                  id="useLower" 
                  checked={useLower} 
                  onChange={() => setUseLower(!useLower)} 
                  className="text-gray-800"
                />
                <label htmlFor="useLower" className="text-gray-800">{t('passwordLowercase')}</label>
              </div>
              <div className="flex items-center gap-3">
                <input 
                  type="checkbox" 
                  id="useNumbers" 
                  checked={useNumbers} 
                  onChange={() => setUseNumbers(!useNumbers)} 
                  className="text-gray-800"
                />
                <label htmlFor="useNumbers" className="text-gray-800">{t('passwordNumber')}</label>
              </div>
              <div className="flex items-center gap-3">
                <input 
                  type="checkbox" 
                  id="useSymbols" 
                  checked={useSymbols} 
                  onChange={() => setUseSymbols(!useSymbols)} 
                  className="text-gray-800"
                />
                <label htmlFor="useSymbols" className="text-gray-800">{t('passwordSymbol')}</label>
              </div>
            </div>
          </div>

          <button
            className="flex items-center justify-center gap-2 py-3 px-6 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-medium rounded-lg shadow-md w-full sm:w-auto text-base mt-6 md:mt-8"
            onClick={handleGenerate}
          >
            <span>{t('generate')}</span>
          </button>
        </div>

        {/* Panel de resultados */}
        <div className="bg-white rounded-xl shadow-lg p-6 space-y-4">
          <div className="flex justify-between items-center">
            <h4 className="text-lg font-semibold tracking-wide text-gray-800">{t('passwordStrength')}</h4>
          </div>
          <div className="mt-4 flex items-center gap-4">
            <div className="flex-1 h-4 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full transition-all duration-500 ${
                  score <= 1 ? 'bg-gradient-to-r from-red-500 to-red-600' :
                  score <= 2 ? 'bg-gradient-to-r from-orange-400 to-orange-500' :
                  score <= 3 ? 'bg-gradient-to-r from-yellow-300 to-yellow-400' :
                  score <= 4 ? 'bg-gradient-to-r from-green-400 to-green-500' :
                  'bg-gradient-to-r from-green-500 to-green-600'
                }`}
                style={{ width: `${(score / 5) * 100}%` }}
              ></div>
            </div>
            
            <span className={`text-base font-extrabold whitespace-nowrap ${
              score <= 1 ? 'text-red-600' :
              score <= 2 ? 'text-orange-500' :
              score <= 3 ? 'text-yellow-500' :
              score <= 4 ? 'text-green-500' :
              'text-green-600'
            }`}>
              {score <= 1 && t('veryWeak')}
              {score === 2 && t('weak')}
              {score === 3 && t('medium')}
              {score === 4 && t('strong')}
              {score >= 5 && t('veryStrong')}
            </span>
          </div>

          {password && (
            <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
              <h4 className="font-medium text-gray-800 text-lg mb-2">{t('securityCriteriaAndRecommendations')}</h4>
              
              <div>
                <h5 className="font-medium text-gray-700 mb-2">{t('securityCriteria')}</h5>
                <ul className="space-y-2 mt-4">
                  <li key="length" className="flex items-center gap-2">
                    <CheckCircleIcon className={`w-5 h-5 ${password.length >= 16 ? 'text-green-500' : 'text-gray-300'}`} />
                    <span className={password.length >= 16 ? 'text-green-600 font-medium' : 'text-gray-900'}>
                      {t('length')}: {password.length}
                    </span>
                  </li>
                  {criteria.map((criterion) => (
                    <li key={criterion.key} className="flex items-center gap-2">
                      <CheckCircleIcon className={`w-5 h-5 ${criterion.met ? 'text-green-500' : 'text-gray-300'}`} />
                      <span className={criterion.met ? 'text-green-600 font-medium' : 'text-gray-700'}>{criterion.label}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h5 className="font-medium text-gray-700 mb-2">{t('recommendations')}</h5>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <LightBulbIcon className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0" />
                    <span className="text-gray-700">{t('passwordRecommendation1')}</span>
                  </li>
                  <li className="flex items-start">
                    <LightBulbIcon className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0" />
                    <span className="text-gray-700">{t('passwordRecommendation2')}</span>
                  </li>
                  <li className="flex items-start">
                    <LightBulbIcon className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0" />
                    <span className="text-gray-700">{t('passwordRecommendation3')}</span>
                  </li>
                  <li className="flex items-start">
                    <LightBulbIcon className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0" />
                    <span className="text-gray-700">{t('passwordRecommendation4')}</span>
                  </li>
                </ul>
              </div>
            </div>
          )}
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
              <h2 className="text-2xl font-bold text-gray-900 mb-2"><span className="text-purple-600">{t('protonPassTitle')}</span></h2>
              <p className="text-gray-600 text-lg">{t('protonPassSubtitle')}</p>
            </div>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl border border-purple-100 shadow-sm hover:shadow-md transition-all">
              <div className="flex items-center gap-3 mb-3">
                <ShieldCheckIcon className="h-6 w-6 text-purple-500" />
                <h3 className="font-semibold text-gray-900">{t('protonPassFeature1Title')}</h3>
              </div>
              <p className="text-gray-600 text-sm">{t('protonPassFeature1Description')}</p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-purple-100 shadow-sm hover:shadow-md transition-all">
              <div className="flex items-center gap-3 mb-3">
                <UserGroupIcon className="h-6 w-6 text-purple-500" />
                <h3 className="font-semibold text-gray-900">{t('protonPassFeature2Title')}</h3>
              </div>
              <p className="text-gray-600 text-sm">{t('protonPassFeature2Description')}</p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-purple-100 shadow-sm hover:shadow-md transition-all">
              <div className="flex items-center gap-3 mb-3">
                <LockClosedIcon className="h-6 w-6 text-purple-500" />
                <h3 className="font-semibold text-gray-900">{t('protonPassFeature3Title')}</h3>
              </div>
              <p className="text-gray-600 text-sm">{t('protonPassFeature3Description')}</p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-purple-100 shadow-sm hover:shadow-md transition-all">
              <div className="flex items-center gap-3 mb-3">
                <GlobeAltIcon className="h-6 w-6 text-purple-500" />
                <h3 className="font-semibold text-gray-900">{t('protonPassFeature4Title')}</h3>
              </div>
              <p className="text-gray-600 text-sm">{t('protonPassFeature4Description')}</p>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4">
            <a 
              href="https://go.getproton.me/SH1Xr" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg shadow-md transition-colors flex items-center justify-center gap-2"
            >
              <ArrowTopRightOnSquareIcon className="h-5 w-5" />
              {t('protonPassButton')}
            </a>
            <button 
              className="px-6 py-3 bg-white border border-purple-200 hover:bg-purple-50 text-purple-600 font-medium rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2"
              onClick={() => setShowPassInfo(!showPassInfo)}
            >
              <InformationCircleIcon className="h-5 w-5" />
              {t('moreInfoButton')}
            </button>
          </div>

          {/* Info Section */}
          {showPassInfo && (
            <div className="mt-6 bg-purple-50 p-6 rounded-xl border border-purple-100">
              <h3 className="font-semibold text-gray-900 mb-3">{t('protonPassInfoTitle')}</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Security Features */}
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <LockClosedIcon className="h-5 w-5 text-purple-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-gray-900">{t('protonPassSecurityFeature1Title')}</h4>
                      <p className="text-gray-700 text-sm">{t('protonPassSecurityFeature1Description')}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <ShieldCheckIcon className="h-5 w-5 text-purple-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-gray-900">{t('protonPassSecurityFeature2Title')}</h4>
                      <p className="text-gray-700 text-sm">{t('protonPassSecurityFeature2Description')}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <KeyIcon className="h-5 w-5 text-purple-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-gray-900">{t('protonPassSecurityFeature3Title')}</h4>
                      <p className="text-gray-700 text-sm">{t('protonPassSecurityFeature3Description')}</p>
                    </div>
                  </div>
                </div>
                
                {/* Convenience Features */}
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <DevicePhoneMobileIcon className="h-5 w-5 text-purple-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-gray-900">{t('protonPassConvenienceFeature1Title')}</h4>
                      <p className="text-gray-700 text-sm">
                        {t('protonPassConvenienceFeature1Description').split('ProtonPass').map((part, i) => (
                          i > 0 ? (
                            <>
                              <a href="https://go.getproton.me/SH1Xr" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:underline">
                                ProtonPass
                              </a>
                              {part}
                            </>
                          ) : part
                        ))}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <UserGroupIcon className="h-5 w-5 text-purple-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-gray-900">{t('protonPassConvenienceFeature2Title')}</h4>
                      <p className="text-gray-700 text-sm">
                        {t('protonPassConvenienceFeature2Description').split('ProtonPass').map((part, i) => (
                          i > 0 ? (
                            <>
                              <a href="https://go.getproton.me/SH1Xr" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:underline">
                                ProtonPass
                              </a>
                              {part}
                            </>
                          ) : part
                        ))}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <EnvelopeIcon className="h-5 w-5 text-purple-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-gray-900">{t('protonPassConvenienceFeature3Title')}</h4>
                      <p className="text-gray-700 text-sm">{t('protonPassConvenienceFeature3Description')}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Additional Security */}
              <div className="mt-6 pt-6 border-t border-purple-100">
                <h4 className="font-medium text-gray-900 mb-3">{t('protonPassAdditionalSecurityTitle')}</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-start gap-2">
                    <GlobeAltIcon className="h-5 w-5 text-purple-500 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-700 text-sm">{t('protonPassAdditionalSecurity1')}</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <DocumentMagnifyingGlassIcon className="h-5 w-5 text-purple-500 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-700 text-sm">{t('protonPassAdditionalSecurity2')}</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <Cog6ToothIcon className="h-5 w-5 text-purple-500 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-700 text-sm">{t('protonPassAdditionalSecurity3')}</p>
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
          <h3 className="text-xl font-bold text-gray-900 mb-4">{t('securityInfoTitle')}</h3>
          <p className="text-gray-700 mb-6">
            {t('securityInfoDescription')}
          </p>
          
          <div className="mt-6 p-4 bg-purple-50 rounded-lg border border-purple-100">
            <p className="text-purple-800 font-medium">
              💡 {t('securityInfoTip')}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
