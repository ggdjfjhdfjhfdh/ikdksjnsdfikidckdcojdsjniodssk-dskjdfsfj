'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiChevronRight } from 'react-icons/fi';
import { usePathname } from 'next/navigation';

interface Link {
  href: string;
  label: string;
}

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const pathname = usePathname();
  
  const links: Link[] = [
    { href: '/about', label: 'Sobre nosotros' },
    { href: '/solutions', label: 'Soluciones' }, 
    { href: '/contact', label: 'Contacto' }
  ];

  const menuVariants = {
    open: {
      x: 0,
      transition: { 
        type: 'spring',
        stiffness: 300,
        damping: 30
      }
    },
    closed: {
      x: '100%',
      transition: {
        delay: 0.15,
        type: 'spring',
        stiffness: 300,
        damping: 30
      }
    }
  };

  const itemVariants = {
    open: {
      opacity: 1,
      y: 0,
      transition: { 
        type: 'spring',
        stiffness: 300,
        damping: 15
      }
    },
    closed: {
      opacity: 0,
      y: 20
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
            onClick={onClose}
          />
          
          <motion.nav
            initial="closed"
            animate="open" 
            exit="closed"
            variants={menuVariants}
            className="fixed right-0 top-0 h-full w-72 bg-white/95 backdrop-blur-xl shadow-2xl flex flex-col p-6 z-50 border-l border-gray-100/20"
            role="navigation"
            aria-label="Menú móvil"
          >
            <motion.button
              whileHover={{ rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              className="self-end p-2 rounded-full hover:bg-gray-100 focus:outline-none"
              onClick={onClose}
              aria-label="Cerrar menú"
            >
              <FiX className="w-6 h-6 text-gray-600" />
            </motion.button>

            <div className="flex flex-col gap-3 mt-4">
              {links.map((link, index) => (
                <motion.a
                  key={link.href}
                  variants={itemVariants}
                  initial="closed"
                  animate="open"
                  transition={{ delay: 0.1 * index }}
                  whileHover={{ 
                    x: 5,
                    backgroundColor: 'rgba(239, 246, 255, 0.8)'
                  }}
                  whileTap={{ scale: 0.98 }}
                  href={link.href}
                  className={`flex items-center justify-between px-4 py-3 text-lg rounded-xl transition-all ${
                    pathname === link.href
                      ? 'bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-600'
                      : 'text-gray-700 hover:bg-blue-50/50'
                  }`}
                >
                  <span>{link.label}</span>
                  <FiChevronRight className="text-gray-400" />
                </motion.a>
              ))}
            </div>

            <motion.div
              variants={itemVariants}
              transition={{ delay: 0.4 }}
              className="mt-auto pt-4"
            >
              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href="/contact"
                className="block w-full px-6 py-3 text-center text-white bg-gradient-to-r from-blue-600 to-cyan-500 rounded-xl shadow-lg hover:shadow-xl transition-all"
              >
                Contactar Ahora
              </motion.a>
            </motion.div>
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  );
}
