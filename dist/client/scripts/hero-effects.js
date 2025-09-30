// Script para efectos generativos del fondo del Hero
// Extraído de src/components/Hero.astro

class HeroAnimation {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.particles = [];
    this.mouse = { x: 0, y: 0 };
    this.animationId = null;
    
    this.init();
    this.setupEventListeners();
    this.animate();
  }
  
  init() {
    console.log('Inicializando HeroAnimation');
    this.resize();
    this.createParticles();
    console.log(`HeroAnimation inicializado con ${this.particles.length} partículas`);
  }
  
  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }
  
  createParticles() {
    const particleCount = Math.min(50, Math.floor(window.innerWidth / 20));
    
    for (let i = 0; i < particleCount; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.1
      });
    }
  }
  
  setupEventListeners() {
    window.addEventListener('resize', () => this.resize());
    
    this.canvas.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
    });
  }
  
  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Dibujar líneas de conexión
    this.drawConnections();
    
    // Actualizar y dibujar partículas
    this.particles.forEach(particle => {
      this.updateParticle(particle);
      this.drawParticle(particle);
    });
    
    this.animationId = requestAnimationFrame(() => this.animate());
  }
  
  updateParticle(particle) {
    particle.x += particle.vx;
    particle.y += particle.vy;
    
    // Rebote en los bordes
    if (particle.x < 0 || particle.x > this.canvas.width) {
      particle.vx *= -1;
    }
    if (particle.y < 0 || particle.y > this.canvas.height) {
      particle.vy *= -1;
    }
    
    // Mantener dentro del canvas
    particle.x = Math.max(0, Math.min(this.canvas.width, particle.x));
    particle.y = Math.max(0, Math.min(this.canvas.height, particle.y));
  }
  
  drawParticle(particle) {
    this.ctx.beginPath();
    this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
    this.ctx.fillStyle = `rgba(124, 247, 212, ${particle.opacity})`;
    this.ctx.fill();
  }
  
  drawConnections() {
    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        const dx = this.particles[i].x - this.particles[j].x;
        const dy = this.particles[i].y - this.particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 150) {
          const opacity = (150 - distance) / 150 * 0.1;
          this.ctx.beginPath();
          this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
          this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
          this.ctx.strokeStyle = `rgba(124, 247, 212, ${opacity})`;
          this.ctx.lineWidth = 1;
          this.ctx.stroke();
        }
      }
    }
  }
}

// Inicializar la animación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM cargado - Inicializando animación del Hero');
  const canvas = document.getElementById('hero-canvas');
  if (canvas) {
    console.log('Canvas encontrado, creando animación');
    window.heroAnimation = new HeroAnimation(canvas);
    console.log('Animación del Hero inicializada correctamente');
  } else {
    console.error('No se encontró el canvas con id hero-canvas');
  }
});

// Manejar la recarga de la página para limpiar la animación
window.addEventListener('beforeunload', () => {
  if (window.heroAnimation) {
    console.log('Limpiando animación del Hero');
    cancelAnimationFrame(window.heroAnimation.animationId);
  }
});