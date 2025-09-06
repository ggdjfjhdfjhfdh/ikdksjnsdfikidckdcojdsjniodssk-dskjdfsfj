/**
 * Script de inicialización de optimizaciones de rendimiento
 * Se ejecuta automáticamente al cargar la página
 */

// Importar módulos de rendimiento
import { globalCacheManager, cachedFetch } from '../utils/cache-manager.js';

class PerformanceInitializer {
  constructor() {
    this.initialized = false;
    this.optimizations = {
      lazyLoading: false,
      imageOptimization: false,
      cacheManager: false,
      performanceMonitoring: false,
      resourceHints: false
    };
    
    this.init();
  }

  async init() {
    if (this.initialized) return;
    
    console.log('🚀 Inicializando optimizaciones de rendimiento...');
    
    try {
      // Esperar a que el DOM esté listo
      await this.waitForDOM();
      
      // Ejecutar optimizaciones en paralelo
      await Promise.allSettled([
        this.initLazyLoading(),
        this.initImageOptimization(),
        this.initCacheManager(),
        this.initPerformanceMonitoring(),
        this.initResourceHints(),
        this.initServiceWorker()
      ]);
      
      this.initialized = true;
      console.log('✅ Optimizaciones de rendimiento inicializadas:', this.optimizations);
      
      // Reportar métricas iniciales
      this.reportInitialMetrics();
      
    } catch (error) {
      console.error('❌ Error inicializando optimizaciones:', error);
    }
  }

  waitForDOM() {
    return new Promise((resolve) => {
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', resolve);
      } else {
        resolve();
      }
    });
  }

  async initLazyLoading() {
    try {
      // Lazy loading para imágenes
      const images = document.querySelectorAll('img:not([loading])');
      images.forEach(img => {
        img.setAttribute('loading', 'lazy');
        img.setAttribute('decoding', 'async');
      });

      // Lazy loading para iframes
      const iframes = document.querySelectorAll('iframe:not([loading])');
      iframes.forEach(iframe => {
        iframe.setAttribute('loading', 'lazy');
      });

      // Inicializar Intersection Observer para elementos personalizados
      this.initIntersectionObserver();
      
      this.optimizations.lazyLoading = true;
      console.log('✅ Lazy loading inicializado');
    } catch (error) {
      console.warn('⚠️ Error en lazy loading:', error);
    }
  }

  initIntersectionObserver() {
    if (!('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const element = entry.target;
            
            // Cargar contenido lazy
            if (element.dataset.src) {
              element.src = element.dataset.src;
              element.removeAttribute('data-src');
            }
            
            // Activar animaciones
            if (element.dataset.animate) {
              element.classList.add('animate-in');
            }
            
            observer.unobserve(element);
          }
        });
      },
      {
        rootMargin: '50px 0px',
        threshold: 0.1
      }
    );

    // Observar elementos con data-lazy
    document.querySelectorAll('[data-lazy], [data-src], [data-animate]')
      .forEach(el => observer.observe(el));
  }

  async initImageOptimization() {
    try {
      // Optimizar imágenes existentes
      const images = document.querySelectorAll('img');
      
      images.forEach(img => {
        // Añadir atributos de optimización
        if (!img.hasAttribute('decoding')) {
          img.setAttribute('decoding', 'async');
        }
        
        // Optimizar sizes para responsive
        if (!img.hasAttribute('sizes') && img.hasAttribute('srcset')) {
          img.setAttribute('sizes', '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw');
        }
      });
      
      this.optimizations.imageOptimization = true;
      console.log('✅ Optimización de imágenes inicializada');
    } catch (error) {
      console.warn('⚠️ Error en optimización de imágenes:', error);
    }
  }

  async initCacheManager() {
    try {
      // Configurar cache manager global
      window.SESECCache = {
        manager: globalCacheManager,
        fetch: cachedFetch
      };
      
      // Prefetch de recursos críticos
      const criticalResources = [
        '/api/threat-summary',
        '/api/global-stats'
      ];
      
      await cachedFetch.prefetch(criticalResources);
      
      this.optimizations.cacheManager = true;
      console.log('✅ Cache manager inicializado');
    } catch (error) {
      console.warn('⚠️ Error en cache manager:', error);
    }
  }

  async initPerformanceMonitoring() {
    try {
      // Inicializar PerformanceOptimizer si existe
      if (typeof PerformanceOptimizer !== 'undefined') {
        new PerformanceOptimizer();
      }
      
      // Monitorear Web Vitals
      this.monitorWebVitals();
      
      this.optimizations.performanceMonitoring = true;
      console.log('✅ Monitoreo de rendimiento inicializado');
    } catch (error) {
      console.warn('⚠️ Error en monitoreo de rendimiento:', error);
    }
  }

  monitorWebVitals() {
    // Monitorear FCP (First Contentful Paint)
    new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        if (entry.name === 'first-contentful-paint') {
          console.log('📊 FCP:', Math.round(entry.startTime), 'ms');
        }
      }
    }).observe({ entryTypes: ['paint'] });

    // Monitorear LCP (Largest Contentful Paint)
    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      const lastEntry = entries[entries.length - 1];
      console.log('📊 LCP:', Math.round(lastEntry.startTime), 'ms');
    }).observe({ entryTypes: ['largest-contentful-paint'] });

    // Monitorear CLS (Cumulative Layout Shift)
    let clsValue = 0;
    new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
        }
      }
      console.log('📊 CLS:', clsValue.toFixed(4));
    }).observe({ entryTypes: ['layout-shift'] });
  }

  async initResourceHints() {
    try {
      // Preconnect a dominios externos críticos
      const criticalDomains = [
        'https://unpkg.com',
        'https://cdn.jsdelivr.net'
      ];
      
      criticalDomains.forEach(domain => {
        const link = document.createElement('link');
        link.rel = 'preconnect';
        link.href = domain;
        link.crossOrigin = 'anonymous';
        document.head.appendChild(link);
      });
      
      this.optimizations.resourceHints = true;
      console.log('✅ Resource hints inicializados');
    } catch (error) {
      console.warn('⚠️ Error en resource hints:', error);
    }
  }

  async initServiceWorker() {
    try {
      if ('serviceWorker' in navigator) {
        // Registrar service worker para cache offline
        const registration = await navigator.serviceWorker.register('/sw.js');
        console.log('✅ Service Worker registrado:', registration.scope);
      }
    } catch (error) {
      console.warn('⚠️ Error registrando Service Worker:', error);
    }
  }

  reportInitialMetrics() {
    setTimeout(() => {
      const metrics = {
        loadTime: performance.timing.loadEventEnd - performance.timing.navigationStart,
        domReady: performance.timing.domContentLoadedEventEnd - performance.timing.navigationStart,
        resourceCount: performance.getEntriesByType('resource').length,
        optimizations: this.optimizations
      };
      
      console.log('📈 Métricas iniciales:', metrics);
      
      // Enviar a analytics si está disponible
      if (typeof gtag !== 'undefined') {
        gtag('event', 'performance_metrics', {
          custom_parameter: JSON.stringify(metrics)
        });
      }
    }, 1000);
  }

  // Método público para obtener estado de optimizaciones
  getOptimizationStatus() {
    return {
      initialized: this.initialized,
      optimizations: { ...this.optimizations },
      cacheStats: globalCacheManager.getStats()
    };
  }
}

// Inicializar automáticamente
const performanceInit = new PerformanceInitializer();

// Exportar para uso global
if (typeof window !== 'undefined') {
  window.SESECPerformance = {
    initializer: performanceInit,
    getStatus: () => performanceInit.getOptimizationStatus()
  };
}

export default PerformanceInitializer;