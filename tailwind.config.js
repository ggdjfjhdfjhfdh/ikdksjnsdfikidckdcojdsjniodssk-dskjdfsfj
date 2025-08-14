/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // Colores personalizados eliminados para evitar problemas de hidratación
      // Se utilizan únicamente los colores estándar de Tailwind CSS
      // Tipografía mejorada
      fontFamily: {
        sans: ['Nunito', 'Quicksand', 'Rubik', 'system-ui', 'sans-serif'],
        heading: ['Quicksand', 'Nunito', 'system-ui', 'sans-serif'],
        body: ['Nunito', 'system-ui', 'sans-serif'],
      },
      // Espaciado consistente
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      // Sombras mejoradas
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'medium': '0 4px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        'strong': '0 10px 40px -10px rgba(0, 0, 0, 0.15), 0 2px 10px -2px rgba(0, 0, 0, 0.05)',
        'glow': '0 0 20px rgba(8, 145, 178, 0.15)',
        'glow-strong': '0 0 30px rgba(8, 145, 178, 0.3)',
      },
      // Animaciones personalizadas
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-in-right': 'slideInRight 0.3s ease-out',
        'bounce-soft': 'bounceSoft 2s infinite',
        'pulse-soft': 'pulseSoft 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        bounceSoft: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
      },
      // Gradientes personalizados
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #0891b2 0%, #06b6d4 100%)',
        'gradient-secondary': 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
        'gradient-accent': 'linear-gradient(135deg, #8b5cf6 0%, #a78bfa 100%)',
        'gradient-hero': 'linear-gradient(135deg, #0891b2 0%, #1e40af 50%, #8b5cf6 100%)',
        'gradient-soft': 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
      },
      // Bordes redondeados consistentes
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
    },
  },
  plugins: [
    // Plugin para utilidades personalizadas
    function({ addUtilities }) {
      const newUtilities = {
        // Clases para secciones
        '.section-padding': {
          '@apply py-20 md:py-24': {},
        },
        '.container-spacing': {
          '@apply px-4 md:px-8 lg:px-12': {},
        },
        '.element-gap': {
          '@apply mb-8 md:mb-12': {},
        },
        // Clases para tipografía
        '.hero-title': {
          '@apply text-4xl md:text-5xl lg:text-6xl font-bold leading-tight font-heading': {},
        },
        '.section-title': {
          '@apply text-3xl md:text-4xl font-bold font-heading': {},
        },
        '.section-subtitle': {
          '@apply text-xl md:text-2xl font-medium': {},
        },
        '.body-text': {
          '@apply text-lg leading-relaxed font-body': {},
        },
        // Clases para botones
        '.btn-primary': {
          '@apply bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full shadow-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2': {},
        },
        '.btn-secondary': {
          '@apply bg-white hover:bg-gray-50 text-gray-800 font-bold py-3 px-8 rounded-full shadow-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2': {},
        },
        '.btn-accent': {
          '@apply bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-3 px-8 rounded-full shadow-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2': {},
        },
        // Clases para cards
        '.card': {
          '@apply bg-white rounded-2xl shadow-soft border border-gray-100 transition-all duration-200 hover:shadow-medium': {},
        },
        '.card-hover': {
          '@apply hover:scale-105 hover:shadow-strong': {},
        },
      }
      addUtilities(newUtilities)
    }
  ],
}