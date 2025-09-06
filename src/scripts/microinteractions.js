/**
 * MICROINTERACCIONES Y ANIMACIONES
 * Maneja efectos de scroll, hover y otras interacciones avanzadas
 */

class MicroInteractions {
  constructor() {
    this.init();
  }

  init() {
    this.setupScrollReveal();
    this.setupParallax();
    this.setupScrollProgress();
    this.setupMagneticElements();
    this.setupHoverEffects();
    this.setupStaggerAnimations();
    this.setupTextReveal();
    this.setupNavHover();
  }

  // Animaciones de scroll reveal
  setupScrollReveal() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          // Una vez revelado, no necesitamos seguir observando
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observar todos los elementos con clase scroll-reveal
    document.querySelectorAll('.scroll-reveal').forEach(el => {
      observer.observe(el);
    });
  }

  // Efectos de parallax suave
  setupParallax() {
    let ticking = false;

    const updateParallax = () => {
      const scrolled = window.pageYOffset;
      const parallaxElements = document.querySelectorAll('.parallax-slow');
      
      parallaxElements.forEach(element => {
        const speed = element.dataset.speed || 0.5;
        const yPos = -(scrolled * speed);
        element.style.setProperty('--parallax-offset', `${yPos}px`);
      });
      
      ticking = false;
    };

    const requestParallaxUpdate = () => {
      if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
      }
    };

    window.addEventListener('scroll', requestParallaxUpdate, { passive: true });
  }

  // Barra de progreso de scroll
  setupScrollProgress() {
    let progressBar = document.querySelector('.scroll-progress');
    
    if (!progressBar) {
      progressBar = document.createElement('div');
      progressBar.className = 'scroll-progress';
      document.body.appendChild(progressBar);
    }

    const updateProgress = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = scrollTop / docHeight;
      
      progressBar.style.transform = `scaleX(${scrollPercent})`;
    };

    window.addEventListener('scroll', updateProgress, { passive: true });
  }

  // Efectos magnéticos para elementos interactivos
  setupMagneticElements() {
    const magneticElements = document.querySelectorAll('.magnetic');
    
    magneticElements.forEach(element => {
      element.addEventListener('mousemove', (e) => {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        const moveX = x * 0.1;
        const moveY = y * 0.1;
        
        element.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.05)`;
      });
      
      element.addEventListener('mouseleave', () => {
        element.style.transform = 'translate(0px, 0px) scale(1)';
      });
    });
  }

  // Efectos de hover mejorados
  setupHoverEffects() {
    // Efectos de ripple para botones
    const rippleElements = document.querySelectorAll('.ripple');
    
    rippleElements.forEach(element => {
      element.addEventListener('click', (e) => {
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        const ripple = document.createElement('span');
        ripple.style.cssText = `
          position: absolute;
          width: ${size}px;
          height: ${size}px;
          left: ${x}px;
          top: ${y}px;
          background: rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          transform: scale(0);
          animation: ripple-animation 0.6s linear;
          pointer-events: none;
        `;
        
        element.appendChild(ripple);
        
        setTimeout(() => {
          ripple.remove();
        }, 600);
      });
    });

    // Agregar estilos de animación de ripple si no existen
    if (!document.querySelector('#ripple-styles')) {
      const style = document.createElement('style');
      style.id = 'ripple-styles';
      style.textContent = `
        @keyframes ripple-animation {
          to {
            transform: scale(4);
            opacity: 0;
          }
        }
      `;
      document.head.appendChild(style);
    }
  }

  // Animaciones escalonadas para listas
  setupStaggerAnimations() {
    const staggerContainers = document.querySelectorAll('.stagger-children');
    
    const staggerObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const children = entry.target.children;
          Array.from(children).forEach((child, index) => {
            setTimeout(() => {
              child.style.opacity = '1';
              child.style.transform = 'translateY(0)';
            }, index * 100);
          });
          staggerObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    staggerContainers.forEach(container => {
      staggerObserver.observe(container);
    });
  }

  // Efectos de revelado de texto
  setupTextReveal() {
    const textElements = document.querySelectorAll('.text-reveal');
    
    textElements.forEach(element => {
      const text = element.textContent;
      const words = text.split(' ');
      
      element.innerHTML = words.map(word => 
        `<span style="display: inline-block; transform: translateY(100%); transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);">${word}</span>`
      ).join(' ');
    });

    const textObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const spans = entry.target.querySelectorAll('span');
          spans.forEach((span, index) => {
            setTimeout(() => {
              span.style.transform = 'translateY(0)';
            }, index * 50);
          });
          entry.target.classList.add('revealed');
          textObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    textElements.forEach(element => {
      textObserver.observe(element);
    });
  }

  // Efectos de hover para navegación
  setupNavHover() {
    const navItems = document.querySelectorAll('.nav-item-hover');
    
    navItems.forEach(item => {
      item.addEventListener('mouseenter', () => {
        item.style.color = 'var(--accent)';
      });
      
      item.addEventListener('mouseleave', () => {
        item.style.color = '';
      });
    });
  }

  // Método para agregar animación de entrada a elementos dinámicos
  animateIn(element, animationType = 'fadeIn', delay = 0) {
    element.style.opacity = '0';
    element.style.transform = this.getInitialTransform(animationType);
    
    setTimeout(() => {
      element.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
      element.style.opacity = '1';
      element.style.transform = 'none';
    }, delay);
  }

  getInitialTransform(animationType) {
    const transforms = {
      fadeIn: 'translateY(20px)',
      slideInLeft: 'translateX(-30px)',
      slideInRight: 'translateX(30px)',
      scaleIn: 'scale(0.9)'
    };
    return transforms[animationType] || transforms.fadeIn;
  }

  // Método para limpiar event listeners (útil para SPA)
  destroy() {
    // Remover event listeners si es necesario
    window.removeEventListener('scroll', this.updateProgress);
    window.removeEventListener('scroll', this.requestParallaxUpdate);
  }
}

// Inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new MicroInteractions();
  });
} else {
  new MicroInteractions();
}

// Exportar para uso en otros módulos
if (typeof module !== 'undefined' && module.exports) {
  module.exports = MicroInteractions;
}

// También disponible globalmente
window.MicroInteractions = MicroInteractions;