"use client";
import { useEffect, useState } from "react";
import React from 'react';
import { useI18n } from '@/lib/i18n';
import Link from "next/link";

export default function CookieConsent() {
  const t = useI18n();
  const [visible, setVisible] = useState(false);
  const [showConfig, setShowConfig] = useState(false);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const consent = window.localStorage.getItem("cookie_consent");
      if (!consent) setVisible(true);
    }
  }, []);

  const handleConsent = (value: 'accepted' | 'rejected') => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem("cookie_consent", value);
      window.localStorage.setItem("cookie_analytics", analyticsEnabled ? 'enabled' : 'disabled');
      setVisible(false);
    }
  };


  if (!visible) return null;

  return (
    <>
      {/* Overlay oscuro y bloqueo de interacción global */}
      <div className="fixed inset-0 z-[99] bg-black/40 backdrop-blur-sm pointer-events-auto" aria-hidden="true"></div>
      <div className="fixed bottom-0 left-0 w-full z-[100] flex justify-center items-end pointer-events-none">
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Aviso de cookies"
        className="pointer-events-auto bg-white/95 border border-gray-200 shadow-2xl rounded-3xl px-4 py-8 m-4 max-w-md w-full flex flex-col gap-5 items-center animate-fade-in"
        style={{ animation: 'fadeInUp 0.5s' }}
      >
        {/* Cookie SVG icon */}
        <div className="flex-shrink-0 flex items-center justify-center w-14 h-14 bg-yellow-100 rounded-full shadow-sm animate-cookie-pop">
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="18" cy="18" r="16" fill="#FDE68A" stroke="#F59E42" strokeWidth="2" />
            <circle cx="13" cy="13" r="2" fill="#F59E42" />
            <circle cx="23" cy="18" r="1.5" fill="#F59E42" />
            <circle cx="17" cy="23" r="1.2" fill="#F59E42" />
            <circle cx="22" cy="11" r="1" fill="#F59E42" />
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <span className="text-gray-800 text-base font-medium block mb-1">{t('cookieConsent')}</span>
          <span className="text-gray-600 text-sm block mb-2">
            Utilizamos cookies propias y de terceros para analizar el uso de la web y mejorar tu experiencia. Consulta nuestra{' '}
            <Link href="/legal/cookies-policy" className="underline text-blue-600 hover:text-blue-800 transition-colors">Política de Cookies</Link>.
          </span>
          {showConfig && (
            <form
              className="mt-2 p-3 rounded-xl bg-gray-50 border border-gray-200 text-xs text-gray-700 flex flex-col gap-3"
              onSubmit={e => {
                e.preventDefault();
                handleConsent(analyticsEnabled ? 'accepted' : 'rejected');
              }}
            >
              <div className="flex items-center gap-2">
                <input type="checkbox" checked disabled className="accent-blue-600 w-4 h-4" id="tecnicas" />
                <label htmlFor="tecnicas" className="font-medium text-gray-800">Cookies técnicas necesarias</label>
                <span className="ml-2 text-gray-400">(Siempre activas)</span>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={analyticsEnabled}
                  onChange={() => setAnalyticsEnabled(v => !v)}
                  className="accent-blue-600 w-4 h-4"
                  id="analiticas"
                />
                <label htmlFor="analiticas" className="font-medium text-gray-800">Cookies analíticas</label>
                <span className="ml-2 text-gray-400">(Google Analytics, etc.)</span>
              </div>
              <button
                type="submit"
                className="mt-2 bg-blue-600 text-white font-semibold px-5 py-2 rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors"
              >
                Guardar selección
              </button>
            </form>
          )}
        </div>
        <div className="flex flex-col md:flex-row gap-2 md:gap-3 mt-2 md:mt-0">
          <button
            onClick={() => handleConsent('accepted')}
            className="bg-blue-600 text-white font-semibold px-5 py-2 rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors"
            autoFocus
          >
            Aceptar todas
          </button>
          <button
            onClick={() => handleConsent('rejected')}
            className="bg-gray-200 text-gray-700 font-medium px-5 py-2 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-colors"
          >
            Rechazar
          </button>
          <button
            onClick={() => setShowConfig((v) => !v)}
            className="bg-white border border-gray-300 text-gray-700 font-medium px-5 py-2 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-colors"
            aria-expanded={showConfig}
          >
            Configurar
          </button>
        </div>
      </div>
      {/* Animaciones CSS */}
      <style jsx>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeInUp 0.5s cubic-bezier(0.4,0,0.2,1);
        }
        @keyframes cookie-pop {
          0% { transform: scale(0.7) rotate(-10deg); opacity: 0; }
          60% { transform: scale(1.1) rotate(4deg); opacity: 1; }
          100% { transform: scale(1) rotate(0deg); }
        }
        .animate-cookie-pop {
          animation: cookie-pop 0.7s cubic-bezier(0.4,0,0.2,1);
        }
      `}</style>
    </div>
    </>
  );
}
