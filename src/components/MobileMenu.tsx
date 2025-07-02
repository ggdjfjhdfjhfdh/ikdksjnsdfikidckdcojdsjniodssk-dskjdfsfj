'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiChevronRight } from 'react-icons/fi';
import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';

interface Link {
  href: string;
  label: string;
  subLinks?: Link[];
}

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

interface NavItem {
  path: string;
  name: string;
}

const navItems: NavItem[] = [
  { path: '/about', name: 'Sobre nosotros' },
  { path: '/solutions', name: 'Soluciones' },
  { path: '/contact', name: 'Contacto' }
];

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);
  
  // Close menu when clicking outside or pressing Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.addEventListener('mousedown', handleClickOutside);
      menuRef.current?.focus();
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay with fade-in animation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />
          
          {/* Menu panel with slide-in animation */}
          <motion.div
            ref={menuRef}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 400 }}
            className="fixed inset-y-0 right-0 z-50 w-full max-w-xs bg-white shadow-xl focus:outline-none"
            role="dialog"
            aria-modal="true"
            aria-label="Menú de navegación"
          >
            <div className="flex h-full flex-col overflow-y-auto">
              {/* Header with close button */}
              <div className="flex items-center justify-between p-4 border-b">
                <h2 className="text-lg font-semibold text-gray-900">Menú</h2>
                <button
                  onClick={onClose}
                  className="rounded-md p-2 text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  aria-label="Cerrar menú"
                >
                  <FiX className="h-6 w-6" />
                </button>
              </div>
              
              {/* Navigation links */}
              <nav className="flex-1 px-4 py-6 space-y-2">
                {navItems.map((item) => (
                  <a
                    key={item.path}
                    href={item.path}
                    className={`block rounded-lg px-4 py-3 text-lg font-medium transition-colors ${pathname === item.path ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}
                    onClick={onClose}
                  >
                    {item.name}
                  </a>
                ))}
              </nav>
              
              {/* Footer with contact CTA */}
              <div className="border-t p-4">
                <a
                  href="/contact"
                  className="block w-full px-6 py-3 text-center text-white bg-gradient-to-r from-blue-600 to-cyan-500 rounded-lg shadow hover:shadow-md transition-all"
                  onClick={onClose}
                >
                  Contactar Ahora
                </a>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
