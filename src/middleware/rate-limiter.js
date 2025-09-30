// Rate Limiter para el frontend
// Previene abuso de APIs y ataques DDoS

class RateLimiter {
  constructor() {
    this.requests = new Map();
    this.windowMs = 15 * 60 * 1000; // 15 minutos
    this.maxRequests = 100; // máximo 100 requests por ventana
    this.cleanupInterval = 5 * 60 * 1000; // limpiar cada 5 minutos
    
    // Limpiar entradas expiradas periódicamente
    setInterval(() => this.cleanup(), this.cleanupInterval);
  }

  // Obtener identificador único del cliente
  getClientId() {
    // Usar combinación de IP (si está disponible) y fingerprint del navegador
    const fingerprint = this.generateFingerprint();
    return fingerprint;
  }

  // Generar fingerprint del navegador
  generateFingerprint() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    ctx.textBaseline = 'top';
    ctx.font = '14px Arial';
    ctx.fillText('Rate limiter fingerprint', 2, 2);
    
    const fingerprint = [
      navigator.userAgent,
      navigator.language,
      screen.width + 'x' + screen.height,
      new Date().getTimezoneOffset(),
      canvas.toDataURL()
    ].join('|');
    
    // Generar hash simple
    let hash = 0;
    for (let i = 0; i < fingerprint.length; i++) {
      const char = fingerprint.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convertir a 32bit integer
    }
    
    return Math.abs(hash).toString(36);
  }

  // Verificar si la request está permitida
  isAllowed(endpoint = 'default') {
    const clientId = this.getClientId();
    const key = `${clientId}:${endpoint}`;
    const now = Date.now();
    
    if (!this.requests.has(key)) {
      this.requests.set(key, {
        count: 1,
        resetTime: now + this.windowMs,
        firstRequest: now
      });
      return { allowed: true, remaining: this.maxRequests - 1 };
    }
    
    const record = this.requests.get(key);
    
    // Si la ventana ha expirado, resetear
    if (now > record.resetTime) {
      record.count = 1;
      record.resetTime = now + this.windowMs;
      record.firstRequest = now;
      return { allowed: true, remaining: this.maxRequests - 1 };
    }
    
    // Verificar si se ha excedido el límite
    if (record.count >= this.maxRequests) {
      return {
        allowed: false,
        remaining: 0,
        resetTime: record.resetTime,
        retryAfter: Math.ceil((record.resetTime - now) / 1000)
      };
    }
    
    // Incrementar contador
    record.count++;
    return {
      allowed: true,
      remaining: this.maxRequests - record.count
    };
  }

  // Limpiar entradas expiradas
  cleanup() {
    const now = Date.now();
    for (const [key, record] of this.requests.entries()) {
      if (now > record.resetTime) {
        this.requests.delete(key);
      }
    }
  }

  // Obtener estadísticas del rate limiter
  getStats() {
    const now = Date.now();
    let activeClients = 0;
    let totalRequests = 0;
    
    for (const [key, record] of this.requests.entries()) {
      if (now <= record.resetTime) {
        activeClients++;
        totalRequests += record.count;
      }
    }
    
    return {
      activeClients,
      totalRequests,
      cacheSize: this.requests.size
    };
  }
}

// Instancia global del rate limiter
const rateLimiter = new RateLimiter();

// Función helper para verificar rate limiting
export function checkRateLimit(endpoint) {
  const result = rateLimiter.isAllowed(endpoint);
  
  if (!result.allowed) {
    console.warn(`Rate limit exceeded for endpoint: ${endpoint}. Retry after ${result.retryAfter} seconds.`);
    
    // Mostrar notificación al usuario
    if (typeof window !== 'undefined' && window.showNotification) {
      window.showNotification(
        'Demasiadas solicitudes',
        `Por favor, espera ${result.retryAfter} segundos antes de intentar de nuevo.`,
        'warning'
      );
    }
  }
  
  return result;
}

// Middleware para fetch requests
export function rateLimitedFetch(url, options = {}) {
  const endpoint = new URL(url, window.location.origin).pathname;
  const rateCheck = checkRateLimit(endpoint);
  
  if (!rateCheck.allowed) {
    return Promise.reject(new Error(`Rate limit exceeded. Retry after ${rateCheck.retryAfter} seconds.`));
  }
  
  // Agregar headers de rate limiting
  const headers = {
    ...options.headers,
    'X-RateLimit-Remaining': rateCheck.remaining.toString(),
    'X-Client-Fingerprint': rateLimiter.getClientId()
  };
  
  return fetch(url, { ...options, headers });
}

export default rateLimiter;