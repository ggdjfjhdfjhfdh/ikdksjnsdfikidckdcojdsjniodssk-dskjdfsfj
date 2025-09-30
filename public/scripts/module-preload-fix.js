/**
 * Fix para advertencias de crossorigin en module preloads
 * Este script asegura que todos los module preloads tengan el atributo crossorigin correcto
 */

// Función para corregir preloads existentes
function fixModulePreloads() {
  const modulePreloads = document.querySelectorAll('link[rel="modulepreload"]');
  const regularPreloads = document.querySelectorAll('link[rel="preload"]:not([as])');
  
  modulePreloads.forEach(link => {
    // Agregar crossorigin si no existe
    if (!link.hasAttribute('crossorigin')) {
      link.setAttribute('crossorigin', 'anonymous');
    }
    
    // Asegurar que tenga el atributo 'as' apropiado
    if (!link.hasAttribute('as')) {
      link.setAttribute('as', 'script');
    }
  });
  
  // Corregir preloads regulares sin atributo 'as'
  regularPreloads.forEach(link => {
    const href = link.href;
    if (href.includes('.css')) {
      link.setAttribute('as', 'style');
    } else if (href.includes('.js')) {
      link.setAttribute('as', 'script');
    } else if (href.match(/\.(woff2?|ttf|otf)$/)) {
      link.setAttribute('as', 'font');
      link.setAttribute('crossorigin', 'anonymous');
    } else if (href.match(/\.(jpg|jpeg|png|webp|svg)$/)) {
      link.setAttribute('as', 'image');
    }
  });
  
  console.log(`✅ Corregidos ${modulePreloads.length} module preloads y ${regularPreloads.length} preloads regulares`);
}

// Observador para nuevos preloads que se agreguen dinámicamente
function setupPreloadObserver() {
  const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      mutation.addedNodes.forEach(node => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          // Verificar si es un link de modulepreload
          if (node.tagName === 'LINK' && node.rel === 'modulepreload') {
            if (!node.hasAttribute('crossorigin')) {
              node.setAttribute('crossorigin', 'anonymous');
            }
            if (!node.hasAttribute('as')) {
              node.setAttribute('as', 'script');
            }
          }
          
          // Verificar links dentro del nodo agregado
          const modulePreloads = node.querySelectorAll?.('link[rel="modulepreload"]') || [];
          modulePreloads.forEach(link => {
            if (!link.hasAttribute('crossorigin')) {
              link.setAttribute('crossorigin', 'anonymous');
            }
            if (!link.hasAttribute('as')) {
              link.setAttribute('as', 'script');
            }
          });
        }
      });
    });
  });
  
  observer.observe(document.head, {
    childList: true,
    subtree: true
  });
  
  return observer;
}

// Inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    fixModulePreloads();
    setupPreloadObserver();
  });
} else {
  fixModulePreloads();
  setupPreloadObserver();
}

// También ejecutar en eventos de Astro
document.addEventListener('astro:page-load', () => {
  fixModulePreloads();
});

export { fixModulePreloads, setupPreloadObserver };