/**
 * Cache Manager para optimizar el rendimiento de las APIs
 * Implementa cache en memoria y localStorage con TTL
 */

class CacheManager {
  constructor() {
    this.memoryCache = new Map();
    this.defaultTTL = 5 * 60 * 1000; // 5 minutos
    this.maxMemoryItems = 100;
    this.storagePrefix = 'sesec_cache_';
    this.init();
  }

  init() {
    // Limpiar cache expirado al inicializar
    this.cleanExpiredCache();
    
    // Limpiar cache cada 10 minutos
    setInterval(() => {
      this.cleanExpiredCache();
    }, 10 * 60 * 1000);
  }

  /**
   * Genera una clave de cache basada en la URL y parámetros
   */
  generateKey(url, params = {}) {
    const paramString = Object.keys(params)
      .sort()
      .map(key => `${key}=${params[key]}`)
      .join('&');
    
    return btoa(`${url}?${paramString}`).replace(/[^a-zA-Z0-9]/g, '');
  }

  /**
   * Obtiene datos del cache (memoria primero, luego localStorage)
   */
  get(key) {
    // Intentar memoria primero
    const memoryItem = this.memoryCache.get(key);
    if (memoryItem && !this.isExpired(memoryItem)) {
      return memoryItem.data;
    }

    // Intentar localStorage
    try {
      const storageItem = localStorage.getItem(this.storagePrefix + key);
      if (storageItem) {
        const parsed = JSON.parse(storageItem);
        if (!this.isExpired(parsed)) {
          // Promover a memoria para acceso rápido
          this.setMemoryCache(key, parsed.data, parsed.ttl);
          return parsed.data;
        } else {
          // Limpiar item expirado
          localStorage.removeItem(this.storagePrefix + key);
        }
      }
    } catch (error) {
      console.warn('Error reading from localStorage cache:', error);
    }

    return null;
  }

  /**
   * Almacena datos en cache (memoria y localStorage)
   */
  set(key, data, ttl = this.defaultTTL) {
    const item = {
      data,
      timestamp: Date.now(),
      ttl
    };

    // Almacenar en memoria
    this.setMemoryCache(key, data, ttl);

    // Almacenar en localStorage (solo si los datos no son muy grandes)
    try {
      const serialized = JSON.stringify(item);
      if (serialized.length < 1024 * 1024) { // Máximo 1MB
        localStorage.setItem(this.storagePrefix + key, serialized);
      }
    } catch (error) {
      console.warn('Error writing to localStorage cache:', error);
    }
  }

  /**
   * Almacena en cache de memoria con límite de items
   */
  setMemoryCache(key, data, ttl) {
    // Limpiar cache si está lleno
    if (this.memoryCache.size >= this.maxMemoryItems) {
      const oldestKey = this.memoryCache.keys().next().value;
      this.memoryCache.delete(oldestKey);
    }

    this.memoryCache.set(key, {
      data,
      timestamp: Date.now(),
      ttl
    });
  }

  /**
   * Verifica si un item del cache ha expirado
   */
  isExpired(item) {
    return Date.now() - item.timestamp > item.ttl;
  }

  /**
   * Limpia cache expirado de memoria y localStorage
   */
  cleanExpiredCache() {
    // Limpiar memoria
    for (const [key, item] of this.memoryCache.entries()) {
      if (this.isExpired(item)) {
        this.memoryCache.delete(key);
      }
    }

    // Limpiar localStorage
    try {
      const keysToRemove = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith(this.storagePrefix)) {
          const item = JSON.parse(localStorage.getItem(key));
          if (this.isExpired(item)) {
            keysToRemove.push(key);
          }
        }
      }
      keysToRemove.forEach(key => localStorage.removeItem(key));
    } catch (error) {
      console.warn('Error cleaning localStorage cache:', error);
    }
  }

  /**
   * Elimina un item específico del cache
   */
  delete(key) {
    this.memoryCache.delete(key);
    try {
      localStorage.removeItem(this.storagePrefix + key);
    } catch (error) {
      console.warn('Error removing from localStorage cache:', error);
    }
  }

  /**
   * Limpia todo el cache
   */
  clear() {
    this.memoryCache.clear();
    
    try {
      const keysToRemove = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith(this.storagePrefix)) {
          keysToRemove.push(key);
        }
      }
      keysToRemove.forEach(key => localStorage.removeItem(key));
    } catch (error) {
      console.warn('Error clearing localStorage cache:', error);
    }
  }

  /**
   * Obtiene estadísticas del cache
   */
  getStats() {
    let localStorageItems = 0;
    let localStorageSize = 0;

    try {
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith(this.storagePrefix)) {
          localStorageItems++;
          localStorageSize += localStorage.getItem(key).length;
        }
      }
    } catch (error) {
      console.warn('Error getting localStorage stats:', error);
    }

    return {
      memoryItems: this.memoryCache.size,
      localStorageItems,
      localStorageSizeKB: Math.round(localStorageSize / 1024),
      maxMemoryItems: this.maxMemoryItems
    };
  }
}

/**
 * Wrapper para fetch con cache automático
 */
class CachedFetch {
  constructor(cacheManager) {
    this.cache = cacheManager || new CacheManager();
  }

  /**
   * Fetch con cache automático
   */
  async fetch(url, options = {}, cacheOptions = {}) {
    const {
      ttl = this.cache.defaultTTL,
      forceRefresh = false,
      cacheKey = null
    } = cacheOptions;

    const key = cacheKey || this.cache.generateKey(url, options.params || {});

    // Intentar obtener del cache primero
    if (!forceRefresh) {
      const cached = this.cache.get(key);
      if (cached) {
        return cached;
      }
    }

    try {
      // Realizar fetch
      const response = await fetch(url, options);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      
      // Almacenar en cache
      this.cache.set(key, data, ttl);
      
      return data;
    } catch (error) {
      console.warn(`Fetch error for ${url}:`, error);
      
      // Intentar devolver datos del cache aunque estén expirados
      const staleData = this.cache.get(key);
      if (staleData) {
        console.warn('Returning stale cache data due to fetch error');
        return staleData;
      }
      
      throw error;
    }
  }

  /**
   * Prefetch de datos para cache
   */
  async prefetch(urls, options = {}) {
    const promises = urls.map(url => 
      this.fetch(url, options, { ttl: 10 * 60 * 1000 }) // 10 minutos para prefetch
        .catch(error => console.warn(`Prefetch failed for ${url}:`, error))
    );
    
    await Promise.allSettled(promises);
  }
}

// Instancia global
const globalCacheManager = new CacheManager();
const cachedFetch = new CachedFetch(globalCacheManager);

// Exportar para uso en módulos
export { CacheManager, CachedFetch, globalCacheManager, cachedFetch };

// Exportar para uso global
if (typeof window !== 'undefined') {
  window.SESECCache = {
    manager: globalCacheManager,
    fetch: cachedFetch,
    CacheManager,
    CachedFetch
  };
}