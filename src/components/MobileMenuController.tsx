'use client';

import { useState } from 'react';
import MobileMenu from './MobileMenu';

export default function MobileMenuController() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <button 
        onClick={() => setIsMenuOpen(true)}
        className="lg:hidden p-3 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 shadow-lg"
        aria-label="Abrir menú móvil"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="w-6 h-6 text-white" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      <MobileMenu 
        isOpen={isMenuOpen} 
        onClose={() => setIsMenuOpen(false)} 
      />
    </>
  );
}
