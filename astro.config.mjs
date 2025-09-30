import { defineConfig } from 'astro/config';


import vercel from '@astrojs/vercel';


// https://astro.build/config
export default defineConfig({
  site: 'https://sesecpro.es',

  // Deshabilitar verificaciones de TypeScript
  typescript: {
    check: false
  },

  // Optimizaciones de construcción
  build: {
    inlineStylesheets: 'never',
    assets: '_astro',
    assetsPrefix: '/',
  },

  // Configuración de seguridad para scripts
  security: {
    checkOrigin: true,
  },

  // Compresión y optimización
  compressHTML: false,

  // Configuración i18n
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en'],
    routing: {
      prefixDefaultLocale: false,
    },
  },

  // Configuración de Vite
  vite: {
    define: {
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production')
    },
    envPrefix: ['PUBLIC_', 'CLOUDFLARE_', 'URLHAUS_', 'SANS_', 'RANSOMWATCH_'],
    build: {
      minify: false,
      sourcemap: false,
      cssMinify: true,
      rollupOptions: {
        output: {
          assetFileNames: 'assets/[name].[hash][extname]',
          chunkFileNames: 'assets/[name].[hash].js',
          entryFileNames: 'assets/[name].[hash].js',
        },
      },
      // Configuración para crossorigin en preloads
      modulePreload: {
        polyfill: false,
      },
    },
    ssr: {
      noExternal: ['@astrojs/image'],
    },
    // Proxy de desarrollo para evitar CORS en llamadas a la API
    server: {
      proxy: {
        '/api': {
          target: process.env.PUBLIC_BACKEND_URL || 'https://sesec-backend.fly.dev',
          changeOrigin: true,
          secure: true,
        }
      }
    }
  },

  // Configuración de salida
  output: 'static',

  // Prefetching
  // Configuración experimental removida por compatibilidad
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport',
  },

  adapter: vercel()
});