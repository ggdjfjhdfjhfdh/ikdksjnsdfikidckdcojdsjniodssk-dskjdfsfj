/**
 * Service Worker para optimización de rendimiento y cache
 */

const CACHE_NAME = 'sesec-v1.0.0';
const STATIC_CACHE = 'sesec-static-v1';
const DYNAMIC_CACHE = 'sesec-dynamic-v1';
const IMAGE_CACHE = 'sesec-images-v1';

// Recursos críticos para cachear
const CRITICAL_RESOURCES = [
  '/',
  '/servicios/',
  '/contacto/'
];

// Recursos estáticos
const STATIC_RESOURCES = [
  '/favicon.svg'
];

// Instalación del Service Worker
self.addEventListener('install', event => {
  console.log('Service Worker: Installing...');
  
  event.waitUntil(
    Promise.all([
      // Cache de recursos críticos
      caches.open(STATIC_CACHE).then(cache => {
        console.log('Service Worker: Caching critical resources');
        return cache.addAll(CRITICAL_RESOURCES.concat(STATIC_RESOURCES));
      })
    ])
  );
  
  // Activar inmediatamente
  self.skipWaiting();
});

// Activación del Service Worker
self.addEventListener('activate', event => {
  console.log('Service Worker: Activating...');
  
  event.waitUntil(
    Promise.all([
      // Limpiar caches antiguos
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== STATIC_CACHE && 
                cacheName !== DYNAMIC_CACHE && 
                cacheName !== IMAGE_CACHE) {
              console.log('Service Worker: Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      }),
      
      // Tomar control de todas las pestañas
      self.clients.claim()
    ])
  );
});

// Interceptar requests
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Solo manejar requests del mismo origen
  if (url.origin !== location.origin) {
    return;
  }
  
  event.respondWith(handleRequest(request));
});

async function handleRequest(request) {
  const url = new URL(request.url);
  
  try {
    // Estrategia para diferentes tipos de recursos
    if (isImageRequest(request)) {
      return handleImageRequest(request);
    }
    
    if (isStaticResource(request)) {
      return handleStaticRequest(request);
    }
    
    if (isPageRequest(request)) {
      return handlePageRequest(request);
    }
    
    if (isAPIRequest(request)) {
      return handleAPIRequest(request);
    }
    
    // Fallback: network first
    return fetch(request);
    
  } catch (error) {
    console.error('Service Worker: Request failed:', error);
    return handleOfflineRequest(request);
  }
}

// Manejar imágenes (Cache First)
async function handleImageRequest(request) {
  const cache = await caches.open(IMAGE_CACHE);
  const cached = await cache.match(request);
  
  if (cached) {
    return cached;
  }
  
  try {
    const response = await fetch(request);
    if (response.ok) {
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    // Fallback a imagen placeholder
    return new Response(
      '<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"><rect width="400" height="300" fill="#f0f0f0"/><text x="200" y="150" text-anchor="middle" fill="#999">Imagen no disponible</text></svg>',
      { headers: { 'Content-Type': 'image/svg+xml' } }
    );
  }
}

// Manejar recursos estáticos (Cache First)
async function handleStaticRequest(request) {
  const cache = await caches.open(STATIC_CACHE);
  const cached = await cache.match(request);
  
  if (cached) {
    return cached;
  }
  
  const response = await fetch(request);
  if (response.ok) {
    cache.put(request, response.clone());
  }
  
  return response;
}

// Manejar páginas (Network First con fallback)
async function handlePageRequest(request) {
  try {
    const response = await fetch(request);
    
    if (response.ok) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, response.clone());
    }
    
    return response;
  } catch (error) {
    const cache = await caches.open(DYNAMIC_CACHE);
    const cached = await cache.match(request);
    
    if (cached) {
      return cached;
    }
    
    // Fallback a página offline
    return handleOfflineRequest(request);
  }
}

// Manejar APIs (Network Only)
async function handleAPIRequest(request) {
  return fetch(request);
}

// Manejar requests offline
async function handleOfflineRequest(request) {
  const url = new URL(request.url);
  
  if (isPageRequest(request)) {
    return new Response(
      `<!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Sin conexión - SESEC</title>
        <style>
          body { font-family: system-ui, sans-serif; text-align: center; padding: 2rem; }
          .offline { max-width: 400px; margin: 0 auto; }
          .icon { font-size: 4rem; margin-bottom: 1rem; }
        </style>
      </head>
      <body>
        <div class="offline">
          <div class="icon">📡</div>
          <h1>Sin conexión</h1>
          <p>No hay conexión a internet. Por favor, verifica tu conexión e intenta nuevamente.</p>
          <button onclick="window.location.reload()">Reintentar</button>
        </div>
      </body>
      </html>`,
      {
        headers: {
          'Content-Type': 'text/html; charset=utf-8'
        }
      }
    );
  }
  
  return new Response('Sin conexión', { status: 503 });
}

// Utilidades
function isImageRequest(request) {
  return request.destination === 'image' || 
         /\.(jpg|jpeg|png|gif|webp|avif|svg)$/i.test(new URL(request.url).pathname);
}

function isStaticResource(request) {
  const url = new URL(request.url);
  return /\.(css|js|woff2?|ttf|eot)$/i.test(url.pathname) ||
         STATIC_RESOURCES.some(resource => url.pathname.includes(resource));
}

function isPageRequest(request) {
  return request.mode === 'navigate' || 
         (request.method === 'GET' && request.headers.get('accept')?.includes('text/html'));
}

function isAPIRequest(request) {
  const url = new URL(request.url);
  return url.pathname.startsWith('/api/') || 
         url.pathname.startsWith('/_astro/') ||
         request.headers.get('accept')?.includes('application/json');
}

// Mensajes del cliente
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'GET_VERSION') {
    event.ports[0].postMessage({ version: CACHE_NAME });
  }
});

// Sincronización en background
self.addEventListener('sync', event => {
  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync());
  }
});

async function doBackgroundSync() {
  // Implementar sincronización de datos cuando sea necesario
  console.log('Service Worker: Background sync');
}