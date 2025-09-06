import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://sesecpro.com',
  
  // Deshabilitar verificaciones de TypeScript
  typescript: {
    check: false
  },
  
  // Optimizaciones de construcción
  build: {
    inlineStylesheets: 'auto',
    assets: '_astro',
    assetsPrefix: '/',
  },
  
  // Compresión y optimización
  compressHTML: true,
  
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
    envPrefix: ['CLOUDFLARE_', 'URLHAUS_', 'SANS_', 'RANSOMWATCH_'],
    build: {
      minify: 'terser',
      sourcemap: false,
      cssMinify: 'lightningcss',
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['astro'],
            utils: ['src/utils'],
            components: ['src/components'],
          },
          assetFileNames: 'assets/[name].[hash][extname]',
          chunkFileNames: 'assets/[name].[hash].js',
          entryFileNames: 'assets/[name].[hash].js',
        },
      },
    },
    ssr: {
      noExternal: ['@astrojs/image'],
    },
  },
  
  // Configuración de salida
  output: 'static',
  
  // Prefetching
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport',
  },
  
  // Configuración experimental removida por compatibilidad
});