/**
 * Efectos avanzados de movimiento para el Hero
 * Incluye ondas, partículas flotantes, parallax y efectos de mouse
 */

class HeroAdvancedEffects {
  constructor() {
    this.canvas = null;
    this.ctx = null;
    this.waves = [];
    this.floatingElements = [];
    this.mouse = { x: 0, y: 0 };
    this.animationId = null;
    this.time = 0;
    
    this.init();
  }
  
  init() {
    this.setupCanvas();
    this.createWaves();
    this.createFloatingElements();
    this.setupEventListeners();
    this.animate();
  }
  
  setupCanvas() {
    // Crear canvas adicional para efectos avanzados
    this.canvas = document.createElement('canvas');
    this.canvas.id = 'hero-advanced-effects';
    this.canvas.style.position = 'absolute';
    this.canvas.style.top = '0';
    this.canvas.style.left = '0';
    this.canvas.style.width = '100%';
    this.canvas.style.height = '100%';
    this.canvas.style.pointerEvents = 'none';
    this.canvas.style.zIndex = '1';
    
    const heroSection = document.querySelector('.hero');
    const heroBg = heroSection?.querySelector('.hero-bg');
    
    if (heroBg) {
      heroBg.appendChild(this.canvas);
      this.ctx = this.canvas.getContext('2d');
      this.resize();
    }
  }
  
  resize() {
    if (!this.canvas) return;
    
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }
  
  createWaves() {
    // Crear ondas sinusoidales animadas
    this.waves = [
      {
        amplitude: 30,
        frequency: 0.01,
        speed: 0.02,
        offset: 0,
        color: 'rgba(124, 247, 212, 0.1)',
        y: window.innerHeight * 0.3
      },
      {
        amplitude: 20,
        frequency: 0.015,
        speed: -0.015,
        offset: Math.PI,
        color: 'rgba(155, 140, 255, 0.08)',
        y: window.innerHeight * 0.7
      },
      {
        amplitude: 25,
        frequency: 0.008,
        speed: 0.025,
        offset: Math.PI / 2,
        color: 'rgba(59, 130, 246, 0.06)',
        y: window.innerHeight * 0.5
      }
    ];
  }
  
  createFloatingElements() {
    // Crear elementos flotantes (códigos, símbolos de seguridad)
    const symbols = ['🔒', '🛡️', '🔐', '⚡', '🌐', '💻', '🔑', '⭐'];
    const codes = ['SSL', 'AES', 'RSA', 'SHA', 'TLS', 'VPN', 'API', 'JWT'];
    
    this.floatingElements = [];
    
    for (let i = 0; i < 15; i++) {
      const isSymbol = Math.random() > 0.5;
      this.floatingElements.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        content: isSymbol ? symbols[Math.floor(Math.random() * symbols.length)] : codes[Math.floor(Math.random() * codes.length)],
        isSymbol: isSymbol,
        size: Math.random() * 10 + 8,
        opacity: Math.random() * 0.3 + 0.1,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.02
      });
    }
  }
  
  setupEventListeners() {
    window.addEventListener('resize', () => {
      this.resize();
      this.createWaves();
    });
    
    // Efecto de parallax con el mouse
    document.addEventListener('mousemove', (e) => {
      this.mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
      this.mouse.y = (e.clientY / window.innerHeight - 0.5) * 2;
      
      // Aplicar parallax a elementos existentes
      this.applyParallaxEffect();
    });
    
    // Detectar scroll para efectos adicionales
    window.addEventListener('scroll', () => {
      this.applyScrollEffects();
    });
  }
  
  applyParallaxEffect() {
    const geometricShapes = document.querySelectorAll('.geometric-shape');
    const lightEffects = document.querySelectorAll('.light-beam, .light-orb');
    
    geometricShapes.forEach((shape, index) => {
      const intensity = (index + 1) * 0.1;
      const translateX = this.mouse.x * intensity * 20;
      const translateY = this.mouse.y * intensity * 20;
      
      shape.style.transform = `translate(${translateX}px, ${translateY}px)`;
    });
    
    lightEffects.forEach((effect, index) => {
      const intensity = (index + 1) * 0.05;
      const translateX = this.mouse.x * intensity * 15;
      const translateY = this.mouse.y * intensity * 15;
      
      effect.style.transform = `translate(${translateX}px, ${translateY}px)`;
    });
  }
  
  applyScrollEffects() {
    const scrollY = window.scrollY;
    const heroHeight = window.innerHeight;
    const scrollProgress = Math.min(scrollY / heroHeight, 1);
    
    // Efecto de fade out en el hero
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
      heroSection.style.opacity = 1 - scrollProgress * 0.5;
    }
    
    // Movimiento de parallax en scroll
    const heroBg = document.querySelector('.hero-bg');
    if (heroBg) {
      heroBg.style.transform = `translateY(${scrollY * 0.5}px)`;
    }
  }
  
  animate() {
    if (!this.ctx) return;
    
    this.time += 0.016; // ~60fps
    
    // Limpiar canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Dibujar ondas
    this.drawWaves();
    
    // Dibujar elementos flotantes
    this.drawFloatingElements();
    
    // Dibujar efectos de mouse
    this.drawMouseEffects();
    
    this.animationId = requestAnimationFrame(() => this.animate());
  }
  
  drawWaves() {
    this.waves.forEach(wave => {
      this.ctx.beginPath();
      this.ctx.strokeStyle = wave.color;
      this.ctx.lineWidth = 2;
      
      for (let x = 0; x <= this.canvas.width; x += 5) {
        const y = wave.y + Math.sin(x * wave.frequency + this.time * wave.speed + wave.offset) * wave.amplitude;
        
        if (x === 0) {
          this.ctx.moveTo(x, y);
        } else {
          this.ctx.lineTo(x, y);
        }
      }
      
      this.ctx.stroke();
    });
  }
  
  drawFloatingElements() {
    this.floatingElements.forEach(element => {
      // Actualizar posición
      element.x += element.vx;
      element.y += element.vy;
      element.rotation += element.rotationSpeed;
      
      // Rebote en bordes
      if (element.x < 0 || element.x > this.canvas.width) {
        element.vx *= -1;
      }
      if (element.y < 0 || element.y > this.canvas.height) {
        element.vy *= -1;
      }
      
      // Mantener dentro del canvas
      element.x = Math.max(0, Math.min(this.canvas.width, element.x));
      element.y = Math.max(0, Math.min(this.canvas.height, element.y));
      
      // Dibujar elemento
      this.ctx.save();
      this.ctx.translate(element.x, element.y);
      this.ctx.rotate(element.rotation);
      this.ctx.globalAlpha = element.opacity;
      
      if (element.isSymbol) {
        this.ctx.font = `${element.size}px Arial`;
        this.ctx.textAlign = 'center';
        this.ctx.fillText(element.content, 0, 0);
      } else {
        this.ctx.font = `${element.size}px 'JetBrains Mono', monospace`;
        this.ctx.fillStyle = 'rgba(124, 247, 212, 0.6)';
        this.ctx.textAlign = 'center';
        this.ctx.fillText(element.content, 0, 0);
      }
      
      this.ctx.restore();
    });
  }
  
  drawMouseEffects() {
    if (!this.mouse.x && !this.mouse.y) return;
    
    const mouseX = (this.mouse.x + 1) * this.canvas.width / 2;
    const mouseY = (this.mouse.y + 1) * this.canvas.height / 2;
    
    // Efecto de ondas desde el mouse
    const rippleRadius = (Math.sin(this.time * 2) + 1) * 50 + 30;
    
    this.ctx.beginPath();
    this.ctx.arc(mouseX, mouseY, rippleRadius, 0, Math.PI * 2);
    this.ctx.strokeStyle = `rgba(124, 247, 212, ${0.3 - rippleRadius / 200})`;
    this.ctx.lineWidth = 2;
    this.ctx.stroke();
    
    // Segundo anillo
    this.ctx.beginPath();
    this.ctx.arc(mouseX, mouseY, rippleRadius * 0.7, 0, Math.PI * 2);
    this.ctx.strokeStyle = `rgba(155, 140, 255, ${0.2 - rippleRadius / 300})`;
    this.ctx.lineWidth = 1;
    this.ctx.stroke();
  }
  
  destroy() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    
    if (this.canvas && this.canvas.parentNode) {
      this.canvas.parentNode.removeChild(this.canvas);
    }
  }
}

// Inicializar efectos avanzados
let heroEffects = null;

// Esperar a que el DOM esté listo
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initHeroEffects);
} else {
  initHeroEffects();
}

function initHeroEffects() {
  // Solo inicializar si no hay preferencia de movimiento reducido
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    // Esperar un poco para asegurar que el Hero esté renderizado
    setTimeout(() => {
      const heroSection = document.querySelector('.hero');
      if (heroSection && !heroEffects) {
        heroEffects = new HeroAdvancedEffects();
      }
    }, 100);
  }
}

// Cleanup al cambiar de página (Astro)
document.addEventListener('astro:before-swap', () => {
  if (heroEffects) {
    heroEffects.destroy();
    heroEffects = null;
  }
});

// Cleanup al salir de la página
window.addEventListener('beforeunload', () => {
  if (heroEffects) {
    heroEffects.destroy();
  }
});

export { HeroAdvancedEffects };