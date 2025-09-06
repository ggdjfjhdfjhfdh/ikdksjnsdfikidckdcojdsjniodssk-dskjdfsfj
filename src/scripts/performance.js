/**
 * Performance Optimization Script
 * Implementa lazy loading, code splitting y optimizaciones de rendimiento
 */

class PerformanceOptimizer {
  constructor() {
    this.intersectionObserver = null;
    this.lazyElements = new Set();
    this.loadedModules = new Map();
    this.init();
  }

  init() {
    // Inicializar cuando el DOM esté listo
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.setup());
    } else {
      this.setup();
    }
  }

  setup() {
    this.setupIntersectionObserver();
    this.setupLazyLoading();
    this.setupCodeSplitting();
    this.optimizeImages();
    this.preloadCriticalResources();
  }

  setupIntersectionObserver() {
    if ('IntersectionObserver' in window) {
      this.intersectionObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              this.loadElement(entry.target);
              this.intersectionObserver.unobserve(entry.target);
            }
          });
        },
        {
          rootMargin: '50px 0px',
          threshold: 0.1
        }
      );
    }
  }

  setupLazyLoading() {
    // Lazy load de imágenes
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    lazyImages.forEach(img => {
      if (this.intersectionObserver) {
        this.intersectionObserver.observe(img);
      }
    });

    // Lazy load de secciones
    const lazySections = document.querySelectorAll('[data-lazy]');
    lazySections.forEach(section => {
      if (this.intersectionObserver) {
        this.intersectionObserver.observe(section);
      }
    });
  }

  setupCodeSplitting() {
    // Cargar módulos bajo demanda
    const dynamicComponents = document.querySelectorAll('[data-component]');
    dynamicComponents.forEach(component => {
      if (this.intersectionObserver) {
        this.intersectionObserver.observe(component);
      }
    });
  }

  async loadElement(element) {
    try {
      // Cargar imágenes lazy
      if (element.tagName === 'IMG' && element.dataset.src) {
        await this.loadImage(element);
      }

      // Cargar componentes dinámicos
      if (element.dataset.component) {
        await this.loadComponent(element);
      }

      // Cargar secciones lazy
      if (element.dataset.lazy) {
        await this.loadSection(element);
      }

      element.classList.add('loaded');
    } catch (error) {
      console.warn('Error loading element:', error);
    }
  }

  loadImage(img) {
    return new Promise((resolve, reject) => {
      const newImg = new Image();
      newImg.onload = () => {
        img.src = img.dataset.src;
        img.classList.add('loaded');
        resolve();
      };
      newImg.onerror = reject;
      newImg.src = img.dataset.src;
    });
  }

  async loadComponent(element) {
    const componentName = element.dataset.component;
    
    if (this.loadedModules.has(componentName)) {
      return this.loadedModules.get(componentName);
    }

    try {
      const module = await import(`../components/${componentName}.js`);
      this.loadedModules.set(componentName, module);
      
      if (module.default && typeof module.default === 'function') {
        module.default(element);
      }
      
      return module;
    } catch (error) {
      console.warn(`Failed to load component: ${componentName}`, error);
    }
  }

  loadSection(section) {
    return new Promise(resolve => {
      section.style.opacity = '0';
      section.style.transform = 'translateY(20px)';
      
      requestAnimationFrame(() => {
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        section.style.opacity = '1';
        section.style.transform = 'translateY(0)';
        
        setTimeout(resolve, 600);
      });
    });
  }

  optimizeImages() {
    // Optimizar imágenes existentes
    const images = document.querySelectorAll('img:not([loading="lazy"])');
    images.forEach(img => {
      if (!img.hasAttribute('loading')) {
        img.setAttribute('loading', 'lazy');
      }
      if (!img.hasAttribute('decoding')) {
        img.setAttribute('decoding', 'async');
      }
    });
  }

  preloadCriticalResources() {
    // Precargar recursos críticos
    const criticalImages = document.querySelectorAll('img[data-priority="high"]');
    criticalImages.forEach(img => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = img.src || img.dataset.src;
      document.head.appendChild(link);
    });

    // Las fuentes críticas se precargan desde el HTML estático
    // para evitar advertencias de recursos no utilizados
  }

  // Método para medir rendimiento mejorado
  measurePerformance() {
    if ('performance' in window) {
      window.addEventListener('load', () => {
        setTimeout(() => {
          const perfData = performance.getEntriesByType('navigation')[0];
          const paintEntries = performance.getEntriesByType('paint');
          
          const metrics = {
            loadTime: Math.round(perfData.loadEventEnd - perfData.loadEventStart),
            domContentLoaded: Math.round(perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart),
            firstPaint: Math.round(paintEntries.find(entry => entry.name === 'first-paint')?.startTime || 0),
            firstContentfulPaint: Math.round(paintEntries.find(entry => entry.name === 'first-contentful-paint')?.startTime || 0),
            totalPageSize: this.calculatePageSize(),
            resourceCount: performance.getEntriesByType('resource').length
          };
          
          // Enviar métricas a consola y almacenar para análisis
          console.log('🚀 Performance Metrics:', metrics);
          this.storeMetrics(metrics);
          this.displayPerformanceIndicator(metrics);
        }, 100);
      });
    }
  }

  calculatePageSize() {
    const resources = performance.getEntriesByType('resource');
    return resources.reduce((total, resource) => {
      return total + (resource.transferSize || 0);
    }, 0);
  }

  storeMetrics(metrics) {
    try {
      localStorage.setItem('sesec_performance_metrics', JSON.stringify({
        ...metrics,
        timestamp: Date.now(),
        url: window.location.pathname
      }));
    } catch (e) {
      console.warn('Could not store performance metrics:', e);
    }
  }

  displayPerformanceIndicator(metrics) {
    // Crear indicador visual de rendimiento
    const indicator = document.createElement('div');
    indicator.id = 'performance-indicator';
    indicator.style.cssText = `
      position: fixed;
      top: 10px;
      right: 10px;
      background: rgba(0, 0, 0, 0.8);
      color: white;
      padding: 8px 12px;
      border-radius: 6px;
      font-size: 12px;
      z-index: 9999;
      font-family: monospace;
      opacity: 0.7;
      transition: opacity 0.3s ease;
    `;
    
    const score = this.calculatePerformanceScore(metrics);
    const color = score >= 90 ? '#10b981' : score >= 70 ? '#f59e0b' : '#ef4444';
    
    indicator.innerHTML = `
      <div style="color: ${color};">⚡ ${score}/100</div>
      <div style="font-size: 10px; opacity: 0.8;">
        FCP: ${metrics.firstContentfulPaint}ms<br>
        Size: ${Math.round(metrics.totalPageSize / 1024)}KB
      </div>
    `;
    
    document.body.appendChild(indicator);
    
    // Auto-hide después de 5 segundos
    setTimeout(() => {
      indicator.style.opacity = '0';
      setTimeout(() => indicator.remove(), 300);
    }, 5000);
  }

  calculatePerformanceScore(metrics) {
    let score = 100;
    
    // Penalizar FCP lento
    if (metrics.firstContentfulPaint > 2500) score -= 30;
    else if (metrics.firstContentfulPaint > 1800) score -= 15;
    
    // Penalizar tamaño de página grande
    if (metrics.totalPageSize > 3000000) score -= 20; // 3MB
    else if (metrics.totalPageSize > 1500000) score -= 10; // 1.5MB
    
    // Penalizar muchos recursos
    if (metrics.resourceCount > 50) score -= 15;
    else if (metrics.resourceCount > 30) score -= 8;
    
    return Math.max(0, Math.min(100, score));
  }

  // Cleanup
  destroy() {
    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
    }
    this.lazyElements.clear();
    this.loadedModules.clear();
  }
}

// Inicializar optimizador de rendimiento
const performanceOptimizer = new PerformanceOptimizer();

// Medir rendimiento en desarrollo
if (import.meta.env.DEV) {
  performanceOptimizer.measurePerformance();
}

// Exportar para uso externo
window.PerformanceOptimizer = performanceOptimizer;

export default performanceOptimizer;