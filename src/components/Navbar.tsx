"use client";
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import React from 'react';
import { useLanguage } from '../lib/LanguageContext';
import { useI18n } from '../lib/i18n';

const navKeys = [
  { key: 'purpose', href: '/about', name: 'Sobre nosotros' },
  { key: 'solutions', href: '/solutions', name: 'Soluciones' },
  { key: 'resources', href: '/recursos', name: 'Recursos' },
  { key: 'contact', href: '/contact', name: 'Contacto' },
];

export default function Navbar() {
  const t = useI18n();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  // Ocultar Navbar en la página de enlaces (tipo Linktree)
  if (pathname === '/enlaces') {
    return null;
  }
  const { lang, setLang } = useLanguage();

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50 border-b border-gray-100 transition-all">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center gap-10 min-w-0">
            <Link href="/" aria-label="Inicio" className="flex-shrink-0">
              <Image 
                src="/logo.svg" 
                alt="Se.Sec.Pro"
                width={72}
                height={72}
                style={{ height: 'auto' }}
                className="cursor-pointer hover:opacity-90 transition-opacity"
                priority
              />
            </Link>
            {/* Menú desktop */}
            <nav className="hidden md:flex items-center gap-2" role="navigation" aria-label="Menú principal">
              {navKeys.map((item) => {
                const isActive = pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.key}
                    href={item.href}
                    className={`relative px-4 py-2 text-gray-700 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 transition-all duration-200 hover:text-blue-600 hover:bg-blue-50 group ${isActive ? 'text-blue-700' : ''}`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {t(item.key as any)}
                    {/* Underline animada si activo */}
                    <span className={`absolute left-2 right-2 -bottom-1 h-0.5 rounded bg-blue-500 transition-all duration-300 ${isActive ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'} group-hover:opacity-60 group-hover:scale-x-100`}></span>
                  </Link>
                );
              })}
            </nav>
          </div>
          {/* Botón de idioma y menú móvil */}
          <div className="flex items-center gap-2">
            {/* Toggle idioma pill */}
            <button
              className={`relative flex items-center w-20 h-9 rounded-full border-2 transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 shadow-inner overflow-hidden
                ${lang === 'EN' ? 'bg-gradient-to-r from-blue-200 to-blue-400 border-blue-400' : 'bg-gradient-to-l from-yellow-100 to-red-300 border-yellow-400'}`}
              aria-label="Cambiar idioma"
              onClick={() => setLang(lang === 'ES' ? 'EN' : 'ES')}
              tabIndex={0}
            >
              {/* Switch pill */}
              <span className={`absolute top-0.5 left-1 transition-transform duration-300 h-7 w-7 rounded-full shadow-lg flex items-center justify-center bg-white border border-gray-200
                ${lang === 'EN' ? 'translate-x-10' : 'translate-x-0'}`}
                aria-hidden="true"
              >
                {lang === 'ES' ? (
                  // Bandera España
                  <svg viewBox="0 0 24 24" width="22" height="22" className="rounded-full" aria-hidden="true"><rect width="24" height="24" fill="#C60B1E"/><rect y="8" width="24" height="8" fill="#FFC400"/></svg>
                ) : (
                  // Bandera UK
                  <svg viewBox="0 0 24 24" width="22" height="22" className="rounded-full" aria-hidden="true"><rect width="24" height="24" fill="#00247D"/><path d="M0 0L24 24ZM24 0L0 24Z" stroke="#FFF" strokeWidth="4"/><path d="M0 0L24 24ZM24 0L0 24Z" stroke="#CF142B" strokeWidth="2"/><rect x="10" width="4" height="24" fill="#FFF"/><rect y="10" width="24" height="4" fill="#FFF"/><rect x="11" width="2" height="24" fill="#CF142B"/><rect y="11" width="24" height="2" fill="#CF142B"/></svg>
                )}
              </span>

            </button>
            {/* Botón menú móvil */}
            <button
              className="md:hidden p-2 rounded-lg text-gray-800 hover:bg-blue-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 ml-2"
              aria-label="Abrir menú"
              onClick={() => setMobileMenuOpen(true)}
            >
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      {/* Menú móvil slide-in */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm transition-all" onClick={() => setMobileMenuOpen(false)}>
          <nav
            className="fixed right-0 top-0 h-full w-72 bg-white shadow-2xl flex flex-col p-8 gap-6 animate-slide-in"
            role="navigation"
            aria-label="Menú móvil"
            onClick={e => e.stopPropagation()}
          >
            <button className="self-end p-2 text-gray-700 hover:text-blue-600 focus:outline-none" aria-label="Cerrar menú" onClick={() => setMobileMenuOpen(false)}>
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            {navKeys.map((item) => {
              const isActive = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.key}
                  href={item.href}
                  className={`block px-4 py-3 text-lg rounded-lg transition-all duration-200 ${isActive ? 'bg-blue-50 text-blue-700' : 'text-gray-800 hover:bg-blue-100 hover:text-blue-600'}`}
                  aria-current={isActive ? 'page' : undefined}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t(item.key as any)}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
      {/* Animación slide-in para el menú móvil */}
      <style>{`@keyframes slide-in { from { transform: translateX(100%); } to { transform: translateX(0); } } .animate-slide-in { animation: slide-in 0.3s cubic-bezier(.4,0,.2,1); }`}</style>
    </header>
  );
}
