// WebGL Threat Map Script
// Global variables
let map, deckOverlay;
let threatData = [];
let arcData = [];
let performanceMode = 'default';
let lastUpdateTime = 0;
let isHeatmapVisible = false;
let areArcsVisible = true;
let areLabelsVisible = false;
let currentZoomLevel = 0.5;
let clusteredData = [];
let rawThreatData = [];

// Advanced performance optimization variables
let lodLevels = new Map();
let frustumBounds = null;
let visibleThreatData = [];
let visibleArcData = [];
let instancedParticles = new Map();
let cullingEnabled = true;
let adaptiveLOD = true;
let renderDistance = 1000; // km
let lastCameraPosition = null;
let viewportBounds = null;

// Animation variables
let animationTime = 0;
let animationSpeed = 1;
let pulseData = [];
let explosionData = [];
let attackWaves = [];
let animationFrame = null;
let isAnimationActive = false; // Disable animations temporarily

// Module references
let maplibregl, Deck, ScatterplotLayer, ArcLayer, HeatmapLayer, TextLayer, MapboxOverlay;
let reverseGeocode, batchReverseGeocode;

// Performance settings optimizados
const PERFORMANCE_SETTINGS = {
  default: {
    maxPoints: 15000,
    maxArcs: 7500,
    updateInterval: 33, // 30 FPS target
    radiusScale: 1.2,
    arcWidth: 2,
    enableAnimations: false, // Disable animations temporarily
    enableHeatmap: false, // Disable heatmap temporarily
    cullingDistance: 0.2, // Less aggressive culling
    maxWaves: 10,
    lodDistance: 750, // km
    instancedRendering: false, // Disable instanced rendering temporarily
    frustumCulling: false, // Disable frustum culling temporarily
    adaptiveLOD: false // Disable adaptive LOD temporarily
  }
};

// Variables de rendimiento
let frameCount = 0;
let lastFPSUpdate = 0;
let currentFPS = 0;
let performanceMonitor = null;

// Animation performance settings
const ANIMATION_SETTINGS = {
  default: {
    maxPulses: 15,
    maxExplosions: 6,
    maxWaves: 10,
    pulseSpeed: 1.2,
    waveSpeed: 1,
    particleCount: 30
  }
};

// Load modules dynamically from CDN
async function loadModules() {
  try {
    console.log('Loading MapLibre GL from CDN...');
    
    // Load MapLibre GL CSS
    if (!document.querySelector('link[href*="maplibre-gl"]')) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = '/libs/maplibre-gl.min.css';
      document.head.appendChild(link);
    }
    
    // Load scripts sequentially to avoid conflicts
    await loadScript('/libs/maplibre-gl.min.js');
    await loadScript('/libs/deck.gl.min.js');
    
    console.log('Assigning module references...');
    // Access global variables created by the CDN scripts
    maplibregl = window.maplibregl;
    // Verificar que deck.gl esté disponible globalmente
    console.log('window.deck:', window.deck);
    console.log('window.DeckGL:', window.DeckGL);
    console.log('window.deckgl:', window.deckgl);
    console.log('Available globals:', Object.keys(window).filter(key => key.toLowerCase().includes('deck')));
    
    // Mostrar todas las propiedades del objeto deck si existe
    if (window.deck) {
      console.log('window.deck properties:', Object.keys(window.deck));
    }
    if (window.DeckGL) {
      console.log('window.DeckGL properties:', Object.keys(window.DeckGL));
    }
    
    // Intentar diferentes formas de acceder a las clases
    if (window.deck) {
      Deck = window.deck.Deck;
      ScatterplotLayer = window.deck.ScatterplotLayer;
      ArcLayer = window.deck.ArcLayer;
      HeatmapLayer = window.deck.HeatmapLayer;
      TextLayer = window.deck.TextLayer;
      MapboxOverlay = window.deck.MapboxOverlay;
    } else if (window.DeckGL) {
      Deck = window.DeckGL.Deck;
      ScatterplotLayer = window.DeckGL.ScatterplotLayer;
      ArcLayer = window.DeckGL.ArcLayer;
      HeatmapLayer = window.DeckGL.HeatmapLayer;
      TextLayer = window.DeckGL.TextLayer;
      MapboxOverlay = window.DeckGL.MapboxOverlay;
    } else {
      throw new Error('deck.gl no está disponible globalmente');
    }
    
    // Verificar que las clases estén disponibles
    console.log('Deck:', typeof Deck);
    console.log('ScatterplotLayer:', typeof ScatterplotLayer);
    console.log('ArcLayer:', typeof ArcLayer);
    console.log('HeatmapLayer:', typeof HeatmapLayer);
    
    console.log('All modules loaded successfully');
  } catch (error) {
    console.error('Error loading modules:', error);
    throw error;
  }
}

// Helper function to load scripts dynamically
function loadScript(src) {
  return new Promise((resolve, reject) => {
    console.log('Loading script:', src);
    
    // Check if script is already loaded
    if (document.querySelector(`script[src="${src}"]`)) {
      console.log('Script already loaded:', src);
      resolve();
      return;
    }
    
    const script = document.createElement('script');
    script.src = src;
    script.onload = () => {
      console.log('Script loaded successfully:', src);
      resolve();
    };
    script.onerror = (error) => {
      console.error('Error loading script:', src, error);
      reject(new Error(`Failed to load script: ${src}`));
    };
    document.head.appendChild(script);
  });
}

// Advanced LOD (Level of Detail) system
function initializeLODSystem() {
  lodLevels.clear();
  
  const settings = PERFORMANCE_SETTINGS[performanceMode];
  const lodDistance = settings.lodDistance || 1000;
  
  // Define LOD levels based on distance
  lodLevels.set('high', { distance: 0, detail: 1.0, maxPoints: settings.maxPoints });
  lodLevels.set('medium', { distance: lodDistance * 0.5, detail: 0.7, maxPoints: Math.floor(settings.maxPoints * 0.6) });
  lodLevels.set('low', { distance: lodDistance, detail: 0.4, maxPoints: Math.floor(settings.maxPoints * 0.3) });
  lodLevels.set('minimal', { distance: lodDistance * 2, detail: 0.2, maxPoints: Math.floor(settings.maxPoints * 0.1) });
  
  console.log('🎯 LOD System initialized with levels:', Array.from(lodLevels.entries()));
}

// Calculate viewport bounds for frustum culling
function calculateViewportBounds() {
  if (!map) return null;
  
  const bounds = map.getBounds();
  const center = map.getCenter();
  const zoom = map.getZoom();
  
  // Calculate approximate visible area in kilometers
  const earthRadius = 6371; // km
  const latRad = center.lat * Math.PI / 180;
  const degreeDistance = earthRadius * Math.PI / 180 * Math.cos(latRad);
  
  const viewportWidth = (bounds.getEast() - bounds.getWest()) * degreeDistance;
  const viewportHeight = (bounds.getNorth() - bounds.getSouth()) * earthRadius * Math.PI / 180;
  
  return {
    north: bounds.getNorth(),
    south: bounds.getSouth(),
    east: bounds.getEast(),
    west: bounds.getWest(),
    center: [center.lng, center.lat],
    zoom: zoom,
    width: viewportWidth,
    height: viewportHeight
  };
}

// Advanced frustum culling
function performFrustumCulling(data, bounds) {
  if (!bounds || !cullingEnabled) return data;
  
  const settings = PERFORMANCE_SETTINGS[performanceMode];
  if (!settings.frustumCulling) return data;
  
  const margin = 0.1; // 10% margin for smooth transitions
  const extendedBounds = {
    north: bounds.north + margin,
    south: bounds.south - margin,
    east: bounds.east + margin,
    west: bounds.west - margin
  };
  
  return data.filter(item => {
    // Handle threat points
    if (item.coordinates || item.position || (item.longitude !== undefined && item.latitude !== undefined)) {
      const coords = item.coordinates || item.position || [item.longitude, item.latitude];
      if (!coords || coords.length < 2) return false;
      
      const [lng, lat] = coords;
      return lng >= extendedBounds.west && lng <= extendedBounds.east &&
             lat >= extendedBounds.south && lat <= extendedBounds.north;
    }
    
    // Handle arcs - check if either source or target is visible
    if (item.sourcePosition && item.targetPosition) {
      const [sourceLng, sourceLat] = item.sourcePosition;
      const [targetLng, targetLat] = item.targetPosition;
      
      const sourceVisible = sourceLng >= extendedBounds.west && sourceLng <= extendedBounds.east &&
                           sourceLat >= extendedBounds.south && sourceLat <= extendedBounds.north;
      
      const targetVisible = targetLng >= extendedBounds.west && targetLng <= extendedBounds.east &&
                           targetLat >= extendedBounds.south && targetLat <= extendedBounds.north;
      
      // Show arc if either endpoint is visible or if it crosses the viewport
      return sourceVisible || targetVisible || 
             (Math.min(sourceLng, targetLng) <= extendedBounds.east && 
              Math.max(sourceLng, targetLng) >= extendedBounds.west &&
              Math.min(sourceLat, targetLat) <= extendedBounds.north && 
              Math.max(sourceLat, targetLat) >= extendedBounds.south);
    }
    
    // Default: keep item if structure is unknown
    return true;
  });
}

// Calculate distance-based LOD level
function calculateLODLevel(position, viewCenter, zoom) {
  if (!adaptiveLOD) return 'high';
  
  const distance = calculateDistance(position, viewCenter);
  const zoomFactor = Math.pow(2, 10 - zoom); // Adjust based on zoom level
  const adjustedDistance = distance * zoomFactor;
  
  for (const [level, config] of lodLevels) {
    if (adjustedDistance <= config.distance) {
      return level;
    }
  }
  
  return 'minimal';
}

// Calculate distance between two points in kilometers
function calculateDistance(pos1, pos2) {
  const [lng1, lat1] = pos1;
  const [lng2, lat2] = pos2;
  
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLng/2) * Math.sin(dLng/2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

// Apply LOD to threat data
function applyLODToData(data, bounds) {
  if (!bounds || !adaptiveLOD) return data;
  
  const viewCenter = bounds.center;
  const zoom = bounds.zoom;
  
  return data.map(item => {
    const coords = item.coordinates || item.position || [item.longitude, item.latitude];
    if (!coords || coords.length < 2) return item;
    
    const lodLevel = calculateLODLevel(coords, viewCenter, zoom);
    const lodConfig = lodLevels.get(lodLevel);
    
    if (!lodConfig) return item;
    
    // Apply LOD-based modifications
    return {
      ...item,
      lodLevel: lodLevel,
      detailFactor: lodConfig.detail,
      radius: (item.radius || 50) * lodConfig.detail,
      opacity: Math.min(255, (item.opacity || 200) * lodConfig.detail)
    };
  });
}

// Detect performance mode based on data size and device capabilities
function detectPerformanceMode(dataSize) {
  const canvas = document.createElement('canvas');
  const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
  
  if (!gl) return 'potato';
  
  const renderer = gl.getParameter(gl.RENDERER);
  const vendor = gl.getParameter(gl.VENDOR);
  
  // Enhanced GPU detection
  const isHighEndGPU = /nvidia.*rtx|nvidia.*gtx.*[1-9][0-9][0-9][0-9]|amd.*rx.*[5-7][0-9][0-9][0-9]|intel.*iris.*xe|intel.*arc/i.test(renderer);
  const isMidRangeGPU = /nvidia.*gtx.*[1-9][0-9][0-9]|amd.*rx.*[4-6][0-9][0-9]|intel.*iris|intel.*hd.*graphics.*[6-9]/i.test(renderer);
  const hasEnoughMemory = navigator.deviceMemory ? navigator.deviceMemory >= 4 : true;
  const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  
  // More sophisticated performance detection
  if (isMobile) {
    if (dataSize > 10000) return 'potato';
    if (dataSize > 3000) return 'low';
    if (dataSize > 1000) return 'medium';
    return 'high';
  }
  
  // Desktop performance tiers
  if (isHighEndGPU && hasEnoughMemory) {
    if (dataSize > 50000) return 'medium';
    return 'high';
  }
  
  if (isMidRangeGPU && hasEnoughMemory) {
    if (dataSize > 30000) return 'low';
    if (dataSize > 15000) return 'medium';
    return 'high';
  }
  
  // Conservative fallback
  if (dataSize > 20000) return 'potato';
  if (dataSize > 10000) return 'low';
  if (dataSize > 5000) return 'medium';
  
  return 'high';
}

// Monitor de rendimiento en tiempo real
function initPerformanceMonitor() {
  performanceMonitor = {
    startTime: Date.now(),
    frameCount: 0,
    lastFPSCheck: Date.now(),
    fpsHistory: [],
    autoOptimize: true
  };
  
  // Actualizar FPS con intervalo optimizado según modo de rendimiento
  const fpsUpdateInterval = performanceMode === 'potato' ? 5000 : 
                           performanceMode === 'low' ? 3000 : 
                           performanceMode === 'medium' ? 2000 : 1000;
  setInterval(() => {
    updateFPSCounter();
    // Temporalmente deshabilitado para evitar que los puntos desaparezcan
    // if (performanceMonitor.autoOptimize) {
    //   autoOptimizePerformance();
    // }
  }, fpsUpdateInterval);
}

// Actualizar contador de FPS
function updateFPSCounter() {
  const now = Date.now();
  const deltaTime = now - performanceMonitor.lastFPSCheck;
  
  if (deltaTime >= 1000) {
    currentFPS = Math.round((frameCount * 1000) / deltaTime);
    performanceMonitor.fpsHistory.push(currentFPS);
    
    // Mantener solo los últimos 10 valores
    if (performanceMonitor.fpsHistory.length > 10) {
      performanceMonitor.fpsHistory.shift();
    }
    
    frameCount = 0;
    performanceMonitor.lastFPSCheck = now;
    
    // Actualizar UI
    updatePerformanceUI();
  }
  
  frameCount++;
}

// Optimización automática basada en FPS
function autoOptimizePerformance() {
  if (performanceMonitor.fpsHistory.length < 3) return;
  
  const avgFPS = performanceMonitor.fpsHistory.reduce((a, b) => a + b, 0) / performanceMonitor.fpsHistory.length;
  const currentSettings = PERFORMANCE_SETTINGS[performanceMode];
  
  // Si el FPS es muy bajo, reducir calidad (umbrales más conservadores)
  if (avgFPS < 10 && performanceMode !== 'potato') {
    const modes = ['high', 'medium', 'low', 'potato'];
    const currentIndex = modes.indexOf(performanceMode);
    if (currentIndex < modes.length - 1) {
      performanceMode = modes[currentIndex + 1];
      console.log(`🔧 Auto-optimización: Cambiando a modo ${performanceMode} (FPS: ${avgFPS})`);
      updateLayers();
    }
  }
  // Si el FPS es bajo pero no crítico, solo bajar un nivel
  else if (avgFPS < 15 && performanceMode === 'high') {
    performanceMode = 'default';
    console.log(`🔧 Auto-optimización: Cambiando a modo ${performanceMode} (FPS: ${avgFPS})`);
    updateLayers();
  }
  
  // Si el FPS es alto y estable, intentar mejorar calidad
  else if (avgFPS > 45 && performanceMode !== 'high') {
    const modes = ['potato', 'low', 'medium', 'high'];
    const currentIndex = modes.indexOf(performanceMode);
    if (currentIndex < modes.length - 1) {
      performanceMode = modes[currentIndex + 1];
      console.log(`🚀 Auto-optimización: Cambiando a modo ${performanceMode} (FPS: ${avgFPS})`);
      updateLayers();
    }
  }
}

// Actualizar UI de rendimiento
function updatePerformanceUI() {
  const fpsElement = document.getElementById('fps-counter');
  const dataElement = document.getElementById('data-counter');
  
  if (fpsElement) {
    const color = currentFPS >= 30 ? '#10b981' : currentFPS >= 20 ? '#f59e0b' : '#ef4444';
    fpsElement.innerHTML = `<span style="color: ${color}">FPS: ${currentFPS}</span>`;
  }
  
  if (dataElement) {
    const totalPoints = threatData.length + arcData.length;
    dataElement.innerHTML = `Datos: ${totalPoints.toLocaleString()}`;
  }
}

// Clean up previous map instance
function cleanupMap() {
  if (map) {
    try {
      map.remove();
    } catch (e) {
      console.warn('Error removing previous map:', e);
    }
  }
  
  // Reset global variables
  map = null;
  deckOverlay = null;
  threatData = [];
  arcData = [];
  pulseData = [];
  explosionData = [];
  attackWaves = [];
  
  // Stop animation loop
  if (animationFrame) {
    cancelAnimationFrame(animationFrame);
    animationFrame = null;
  }
  
  console.log('Previous map instance cleaned up');
}

// Initialize the WebGL threat map
// Mobile device detection
function isMobileDevice() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
         (window.innerWidth <= 768) ||
         ('ontouchstart' in window);
}

async function initWebGLThreatMap() {
  console.log('threatData received in initWebGLThreatMap:', window.threatMapProps.threatData);
  try {
    console.log('Starting WebGL Threat Map initialization...');
    
    // Clean up any previous instance
    cleanupMap();
    
    // Check if container exists
    const container = document.getElementById('map-container');
    if (!container) {
      throw new Error('Map container not found');
    }
    console.log('Map container found');

    // Detect mobile device and apply optimizations
    const isMobile = isMobileDevice();
    if (isMobile) {
      console.log('Mobile device detected, applying mobile optimizations...');
      performanceMode = 'medium'; // Use medium performance on mobile
      
      // Apply mobile-specific container styles
      container.style.touchAction = 'pan-x pan-y pinch-zoom';
      container.style.webkitTouchCallout = 'none';
      container.style.webkitUserSelect = 'none';
      container.style.userSelect = 'none';
      container.style.position = 'fixed';
      container.style.top = '0';
      container.style.left = '0';
      container.style.width = '100vw';
      container.style.height = '100vh';
      container.style.zIndex = '1';
    }

    // Load required modules first
    console.log('Loading modules...');
    await loadModules();
    console.log('Modules loaded successfully');
    
    // Initialize MapLibre GL map with professional dark style
    console.log('Initializing map...');
    map = new maplibregl.Map({
      container: 'map-container',
      style: {
        version: 8,
        name: 'SESEC Dark Threat Map',
        sources: {
          'countries': {
            type: 'geojson',
            data: 'https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson'
          }
        },
        layers: [
          {
            id: 'background',
            type: 'background',
            paint: {
              'background-color': '#0a0a0a'
            }
          },
          {
            id: 'countries-fill',
            type: 'fill',
            source: 'countries',
            paint: {
              'fill-color': '#1a1a1a',
              'fill-opacity': 0.8
            }
          },
          {
            id: 'countries-stroke',
            type: 'line',
            source: 'countries',
            paint: {
              'line-color': '#333333',
              'line-width': 0.5,
              'line-opacity': 0.6
            }
          }
        ]
      },
      center: [0, 20],
      zoom: 0.5,
      pitch: 0,
      bearing: 0,
      antialias: true,
      // Mobile-optimized zoom limits
      maxZoom: isMobile ? 18 : 22,
      minZoom: isMobile ? 1 : 0.5,
      // Enable mobile-friendly interactions
      doubleClickZoom: !isMobile, // Disable double-click zoom on mobile to prevent conflicts
      touchZoomRotate: isMobile, // Enable touch zoom and rotate on mobile
      touchPitch: false, // Always disable pitch for better UX
      scrollZoom: true,
      boxZoom: false, // Always disable box zoom
      dragRotate: !isMobile, // Disable rotation on mobile for better UX
      dragPan: true, // Always enable pan
      keyboard: !isMobile, // Disable keyboard controls on mobile
      // Mobile-specific optimizations
      cooperativeGestures: false, // Allow single-finger pan/zoom for better mobile UX
      pitchWithRotate: false, // Disable pitch with rotate to avoid conflicts
      clickTolerance: isMobile ? 8 : 3, // Increase click tolerance on mobile for better touch interaction
      touchZoom: true, // Explicitly enable touch zoom
      // Enhanced mobile touch settings
      touchZoomRotate: isMobile ? {
        around: 'center',
        bearingSnap: 7 // Snap bearing to cardinal directions
      } : true
    });
    console.log('Map initialized');

    // Inicializar monitor de rendimiento
    initPerformanceMonitor();

    // Wait for map to load
    await new Promise((resolve) => {
      map.on('load', resolve);
    });
    console.log('Map loaded');

    // Initialize deck.gl overlay
    console.log('Creating deck.gl overlay...');
    deckOverlay = new MapboxOverlay({
      interleaved: true,
      layers: []
    });

    map.addControl(deckOverlay);
    console.log('Deck.gl overlay added');
    
    // Add navigation controls
    map.addControl(new maplibregl.NavigationControl(), 'top-right');
    map.addControl(new maplibregl.FullscreenControl(), 'top-right');
    console.log('Navigation controls added');

    // Load initial threat data
    console.log('Loading threat data...');
    await loadThreatData();

    // Set up event listeners
    setupEventListeners();

    // Start animation loop
    startAnimationLoop();

    // Agregar listener para cambios de zoom
    map.on('zoom', () => {
      const newZoomLevel = map.getZoom();
      if (Math.abs(newZoomLevel - currentZoomLevel) > 0.5) { // Solo actualizar si hay cambio significativo
        currentZoomLevel = newZoomLevel;
        console.log('Zoom changed to:', currentZoomLevel);
        
        // Aplicar clustering dinámico basado en el nuevo zoom
        if (rawThreatData.length > 0) {
          const processedData = getDataForZoomLevel(currentZoomLevel, rawThreatData);
          threatData = processedData;
          clusteredData = processedData;
          
          // Actualizar las capas con los nuevos datos
          updateLayers();
          console.log(`Updated to ${processedData.length} points for zoom level ${currentZoomLevel}`);
        }
      }
    });
    
    // Start real-time updates
    startRealTimeUpdates();

    console.log('WebGL Threat Map initialized successfully');

  } catch (error) {
    console.error('Failed to initialize WebGL threat map:', error);
    // Show error message instead of fallback data
    console.error('WebGL initialization failed. Please check browser compatibility.');
  }
}

// Load threat data from props or API
async function loadThreatData() {
  try {
    console.log('🔍 [DEBUG] Loading threat data...');
    // Get data from props passed from parent component
    const propsData = window.threatMapProps || {};
    console.log('🔍 [DEBUG] Props data available:', !!propsData.threatData);
    console.log('🔍 [DEBUG] Props data keys:', propsData.threatData ? Object.keys(propsData.threatData) : 'none');
    console.log('🔍 [DEBUG] Full props data:', propsData);
    
    let data;
    if (propsData.threatData && Object.keys(propsData.threatData).length > 0) {
      console.log('Using data from props:', propsData.threatData);
      // Use data from props
      data = propsData.threatData;
    } else {
      console.log('No props data available, trying API fallback...');
      try {
        // Fallback to API call
        const backendUrl = window.BACKEND_URL;
        const response = await fetch(`${backendUrl}/api/threat/data`);
        if (response.ok) {
          data = await response.json();
          console.log('API data loaded:', data);
        } else {
          console.warn('API call failed, no data available');
          return;
        }
      } catch (apiError) {
        console.warn('API call failed, no data available:', apiError);
        return;
      }
    }
    
    // Process threat points from various data sources
    threatData = [];
    arcData = [];
    console.log('Processing data sources:', Object.keys(data || {}));
    console.log('Full data received:', data);
    
    // Process Cloudflare data - Origin Countries (attackers)
    if (data.cloudflare?.topOriginCountries) {
      console.log('Processing Cloudflare topOriginCountries:', data.cloudflare.topOriginCountries.length, 'countries');
      data.cloudflare.topOriginCountries.forEach(country => {
        const countryName = country.country || country.name || country.countryCode || country.alpha2;
        if (!isValidCountryCode(countryName)) {
          console.warn(`Skipping invalid country code from Cloudflare Origin: ${countryName}`);
          return;
        }
        const coords = getCountryCoordinates(countryName);
        if (coords) {
          threatData.push({
            position: coords,
            longitude: coords[0],
            latitude: coords[1],
            region: countryName,
            type: 'attack_origin',
            count: Math.floor(country.value * 150),
            severity: country.value > 20 ? 'critical' : country.value > 10 ? 'high' : country.value > 5 ? 'medium' : 'low',
            timestamp: new Date().toISOString(),
            color: getSeverityColor(country.value > 20 ? 'critical' : country.value > 10 ? 'high' : country.value > 5 ? 'medium' : 'low')
          });
        }
      });
    }
    
    // Process Cloudflare data - Target Countries (victims)
    if (data.cloudflare?.topTargetCountries) {
      console.log('Processing Cloudflare topTargetCountries:', data.cloudflare.topTargetCountries.length, 'countries');
      data.cloudflare.topTargetCountries.forEach(country => {
        const countryName = country.country || country.name || country.countryCode || country.alpha2;
        if (!isValidCountryCode(countryName)) {
          console.warn(`Skipping invalid country code from Cloudflare Target: ${countryName}`);
          return;
        }
        const coords = getCountryCoordinates(countryName);
        if (coords) {
          threatData.push({
            position: coords,
            longitude: coords[0],
            latitude: coords[1],
            region: countryName,
            type: 'attack_target',
            count: Math.floor(country.value * 120),
            severity: country.value > 25 ? 'critical' : country.value > 15 ? 'high' : country.value > 8 ? 'medium' : 'low',
            timestamp: new Date().toISOString(),
            color: getSeverityColor(country.value > 25 ? 'critical' : country.value > 15 ? 'high' : country.value > 8 ? 'medium' : 'low')
          });
        }
      });
    }
    
    // Process legacy topCountries for backward compatibility
    if (data.cloudflare?.topCountries) {
      console.log('Processing Cloudflare topCountries (legacy):', data.cloudflare.topCountries.length, 'countries');
      data.cloudflare.topCountries.forEach(country => {
        let countryName = country.name || country.country || country.code || country.alpha2;
        
        // Normalize country names to ISO codes for legacy data
        const countryNameNormalized = normalizeCountryCode(countryName);
        if (countryNameNormalized) {
          countryName = countryNameNormalized;
        }
        
        if (!isValidCountryCode(countryName)) {
          console.warn(`Skipping invalid country code from Cloudflare Legacy: ${countryName}`);
          return;
        }
        const coords = getCountryCoordinates(countryName);
        if (coords) {
          threatData.push({
            position: coords,
            longitude: coords[0],
            latitude: coords[1],
            region: countryName,
            type: 'web_attack',
            count: Math.floor(country.value * 100),
            severity: country.value > 15 ? 'critical' : country.value > 10 ? 'high' : country.value > 5 ? 'medium' : 'low',
            timestamp: new Date().toISOString(),
            color: getSeverityColor(country.value > 15 ? 'critical' : country.value > 10 ? 'high' : country.value > 5 ? 'medium' : 'low')
          });
        }
      });
    }

    // Process Cloudflare Radar data - Attack Pairs (Country to Country)
    if (data.cloudflare?.topAttackPairs) {
      console.log('Processing Cloudflare topAttackPairs:', data.cloudflare.topAttackPairs.length, 'pairs');
      console.log('Sample topAttackPairs data:', data.cloudflare.topAttackPairs.slice(0, 3));
      data.cloudflare.topAttackPairs.forEach(pair => {
        if (!isValidCountryCode(pair.origin_country) || !isValidCountryCode(pair.target_country)) {
          console.warn(`Skipping invalid country pair from Cloudflare: ${pair.origin_country} -> ${pair.target_country}`);
          return;
        }
        const sourceCoords = getCountryCoordinates(pair.origin_country);
        const targetCoords = getCountryCoordinates(pair.target_country);
        
        if (sourceCoords && targetCoords) {
          // Add to arc data for country-to-country attacks
          arcData.push({
            sourcePosition: sourceCoords,
            targetPosition: targetCoords,
            sourceRegion: pair.origin_country,
            targetRegion: pair.target_country,
            type: 'country_attack',
            count: pair.value || 1,
            timestamp: new Date().toISOString()
          });
          
          // Also add threat points for origin countries if not already present
          const existingOrigin = threatData.find(t => t.region === pair.origin_country);
          if (!existingOrigin) {
            threatData.push({
              position: sourceCoords,
              longitude: sourceCoords[0],
              latitude: sourceCoords[1],
              region: pair.origin_country,
              type: 'attack_origin',
              count: pair.value || 1,
              severity: 'high',
              timestamp: new Date().toISOString(),
              color: getSeverityColor('high')
            });
          }
        }
      });
    }
    
    // Process SANS ISC data - Port scanning activities
    if (data.sansISC?.topPorts) {
      console.log('Processing SANS ISC topPorts:', data.sansISC.topPorts.length, 'ports');
      data.sansISC.topPorts.slice(0, 10).forEach((port, index) => {
        // Generate threat points for major countries based on port scanning activity
        const scanningCountries = ['CN', 'RU', 'US', 'BR', 'IN', 'DE', 'GB', 'FR', 'KR', 'JP'];
        const country = scanningCountries[index % scanningCountries.length];
        const coords = getCountryCoordinates(country);
        if (coords) {
          threatData.push({
            position: coords,
            longitude: coords[0],
            latitude: coords[1],
            region: country,
            type: 'port_scan',
            count: Math.floor(port.count * 0.1),
            severity: port.count > 10000 ? 'high' : port.count > 5000 ? 'medium' : 'low',
            timestamp: new Date().toISOString(),
            color: getSeverityColor(port.count > 10000 ? 'high' : port.count > 5000 ? 'medium' : 'low'),
            details: { port: port.port, protocol: port.protocol }
          });
        }
      });
    }
    
    // Process SANS ISC data - Top attacking sources
    if (data.sansISC?.topSources) {
      console.log('Processing SANS ISC topSources:', data.sansISC.topSources.length, 'sources');
      data.sansISC.topSources.slice(0, 15).forEach(source => {
        const coords = getCountryCoordinates(source.country);
        if (coords) {
          threatData.push({
            position: coords,
            longitude: coords[0],
            latitude: coords[1],
            region: source.country,
            type: 'scanning_source',
            count: Math.floor(source.attacks * 0.5),
            severity: source.attacks > 1000 ? 'critical' : source.attacks > 500 ? 'high' : 'medium',
            timestamp: new Date().toISOString(),
            color: getSeverityColor(source.attacks > 1000 ? 'critical' : source.attacks > 500 ? 'high' : 'medium')
          });
        }
      });
    }
    
    // Process URLhaus data - Malware hosting countries
    if (data.urlhaus?.countries) {
      console.log('Processing URLhaus countries:', data.urlhaus.countries.length, 'countries');
      data.urlhaus.countries.slice(0, 20).forEach(country => {
        if (!isValidCountryCode(country.country)) {
          console.warn(`Skipping invalid country code from URLhaus: ${country.country}`);
          return;
        }
        const coords = getCountryCoordinates(country.country);
        if (coords) {
          threatData.push({
            position: coords,
            longitude: coords[0],
            latitude: coords[1],
            region: country.country,
            type: 'malware_host',
            count: Math.floor(country.count * 2),
            severity: country.count > 100 ? 'critical' : country.count > 50 ? 'high' : country.count > 20 ? 'medium' : 'low',
            timestamp: new Date().toISOString(),
            color: getSeverityColor(country.count > 100 ? 'critical' : country.count > 50 ? 'high' : country.count > 20 ? 'medium' : 'low')
          });
        }
      });
    }
    
    // Process Ransomware geographic distribution
    if (data.ransomwatch?.geographicDistribution) {
      console.log('Processing Ransomware geographic distribution', data.ransomwatch.geographicDistribution);
      
      // Check if it's an array or object
      if (Array.isArray(data.ransomwatch.geographicDistribution)) {
        // If it's an array, process each country object
        data.ransomwatch.geographicDistribution.forEach((countryData, index) => {
          if (countryData && typeof countryData === 'object') {
            const countryName = countryData.country || countryData.name || countryData.code;
            const count = countryData.count || countryData.value || 1;
            
            if (countryName) {
              const coords = getCountryCoordinates(countryName);
              if (coords && count > 0) {
                threatData.push({
                  position: coords,
                  longitude: coords[0],
                  latitude: coords[1],
                  region: countryName,
                  type: 'ransomware',
                  count: Math.floor(count * 10),
                  severity: count > 10 ? 'critical' : count > 5 ? 'high' : count > 2 ? 'medium' : 'low',
                  timestamp: new Date().toISOString(),
                  color: getSeverityColor(count > 10 ? 'critical' : count > 5 ? 'high' : count > 2 ? 'medium' : 'low')
                });
              }
            }
          }
        });
      } else if (typeof data.ransomwatch.geographicDistribution === 'object' && data.ransomwatch.geographicDistribution !== null) {
        // If it's an object, process key-value pairs
        Object.entries(data.ransomwatch.geographicDistribution).forEach(([countryCode, count]) => {
          // Skip if countryCode is a numeric index
          if (!isNaN(countryCode)) {
            console.log('Skipping numeric index:', countryCode);
            return;
          }
          
          const coords = getCountryCoordinates(countryCode);
          if (coords && count > 0) {
            threatData.push({
              position: coords,
              longitude: coords[0],
              latitude: coords[1],
              region: countryCode,
              type: 'ransomware',
              count: Math.floor(count * 10),
              severity: count > 10 ? 'critical' : count > 5 ? 'high' : count > 2 ? 'medium' : 'low',
              timestamp: new Date().toISOString(),
              color: getSeverityColor(count > 10 ? 'critical' : count > 5 ? 'high' : count > 2 ? 'medium' : 'low')
            });
          }
        });
      }
    }
    
    // Process VirusTotal data
    if (data.virustotal?.malicious_urls) {
      data.virustotal.malicious_urls.forEach(url => {
        // Intentar obtener coordenadas específicas del país si está disponible
        let coords = null;
        let region = 'Unknown';
        
        if (url.country) {
          coords = getCountryCoordinates(url.country);
          region = url.country;
        }
        
        // Si no se encuentran coordenadas específicas, usar una ciudad aleatoria
        if (!coords) {
          coords = getRandomCoordinates();
        }
        
        threatData.push({
          position: coords,
          longitude: coords[0],
          latitude: coords[1],
          region: region,
          type: 'malware',
          count: Math.floor(Math.random() * 50 + 10),
          severity: 'high',
          timestamp: new Date().toISOString(),
          color: getSeverityColor('high')
        });
      });
    }
    
    // Process Shodan data
    if (data.shodan?.vulnerable_services) {
      data.shodan.vulnerable_services.forEach(service => {
        // Intentar obtener coordenadas específicas del país
        let coords = null;
        let region = service.country || 'Unknown';
        
        if (service.country) {
          coords = getCountryCoordinates(service.country);
        }
        
        // Si no se encuentran coordenadas específicas, usar una ciudad aleatoria
        if (!coords) {
          coords = getRandomCoordinates();
        }
        
        threatData.push({
          position: coords,
          longitude: coords[0],
          latitude: coords[1],
          region: region,
          type: 'vulnerability',
          count: service.count || 1,
          severity: 'medium',
          timestamp: new Date().toISOString(),
          color: getSeverityColor('medium')
        });
      });
    }
    
    // Process ThreatFox data - IOCs and malware
    if (data.threatfox?.countries) {
      console.log('Processing ThreatFox countries:', data.threatfox.countries.length, 'countries');
      data.threatfox.countries.forEach(country => {
        if (!isValidCountryCode(country.country)) {
          console.warn(`Skipping invalid country code from ThreatFox: ${country.country}`);
          return;
        }
        const coords = getCountryCoordinates(country.country);
        if (coords) {
          threatData.push({
            position: coords,
            longitude: coords[0],
            latitude: coords[1],
            region: country.country,
            type: 'ioc_malware',
            count: Math.floor(country.count * 3),
            severity: country.count > 50 ? 'critical' : country.count > 20 ? 'high' : country.count > 10 ? 'medium' : 'low',
            timestamp: new Date().toISOString(),
            color: getSeverityColor(country.count > 50 ? 'critical' : country.count > 20 ? 'high' : country.count > 10 ? 'medium' : 'low'),
            source: 'ThreatFox'
          });
        }
      });
    }

    // ThreatFox recent threats removed to avoid 'Global' points with random coordinates

    // Process FeodoTracker data - Botnets
    if (data.feodotracker?.countries) {
      console.log('Processing FeodoTracker countries:', data.feodotracker.countries.length, 'countries');
      data.feodotracker.countries.forEach(country => {
        if (!isValidCountryCode(country.country)) {
          console.warn(`Skipping invalid country code from FeodoTracker: ${country.country}`);
          return;
        }
        const coords = getCountryCoordinates(country.country);
        if (coords) {
          threatData.push({
          position: coords,
          longitude: coords[0],
          latitude: coords[1],
          region: country.country,
          type: 'botnet_c2',
          count: Math.floor(country.count * 5),
          severity: country.count > 20 ? 'critical' : country.count > 10 ? 'high' : country.count > 5 ? 'medium' : 'low',
          timestamp: new Date().toISOString(),
          color: getSeverityColor(country.count > 20 ? 'critical' : country.count > 10 ? 'high' : country.count > 5 ? 'medium' : 'low'),
          source: 'FeodoTracker'
        });
        }
      });
    }

    // FeodoTracker recent botnets removed to avoid 'Global' points with random coordinates

    // Process recent events from timeline data
    if (data.recentEvents && Array.isArray(data.recentEvents)) {
      console.log('Processing recent events for map:', data.recentEvents.length, 'events');
      data.recentEvents.forEach((event, index) => {
        // Get coordinates for the event's country
        let coords = null;
        if (event.country && event.country !== 'Global') {
          coords = getCountryCoordinates(event.country);
        }
        
        // If no specific country or coordinates, use random coordinates
        if (!coords) {
          coords = getRandomCoordinates();
        }
        
        // Map severity to color and size
        const severityMap = {
          'crítica': { color: [255, 50, 50, 255], size: 8 },
          'alta': { color: [255, 150, 50, 255], size: 6 },
          'media': { color: [255, 255, 50, 255], size: 4 }
        };
        
        const severityInfo = severityMap[event.severity] || severityMap['media'];
        
        threatData.push({
          position: coords,
          longitude: coords[0],
          latitude: coords[1],
          region: event.country || 'Global',
          type: event.threatType || 'recent_attack',
          count: event.affectedSystems || 1,
          severity: event.severity,
          timestamp: event.time,
          color: severityInfo.color,
          size: severityInfo.size,
          title: event.title,
          description: event.description,
          source: event.source || 'Timeline'
        });
      });
    }

    // Generate additional random attack connections if we don't have enough real data
    if (arcData.length < 10) {
      const additionalArcs = generateAttackConnections(threatData);
      arcData = [...arcData, ...additionalArcs];
    }

    // Auto-detect performance mode based on data size
    const totalDataSize = threatData.length + arcData.length;
    if (performanceMode === 'auto') {
      performanceMode = detectPerformanceMode(totalDataSize);
      console.log(`Auto-detected performance mode: ${performanceMode} (${totalDataSize} data points)`);
    }
    
    // If no data was processed, use minimal test data for debugging
    if (threatData.length === 0) {
      console.warn('🚨 [DEBUG] No threat data processed, using minimal test data for debugging');
      console.log('🔍 [DEBUG] Original data object:', data);
      console.log('🔍 [DEBUG] Data sources checked:', {
        cloudflare: !!data?.cloudflare,
        sansISC: !!data?.sansISC,
        urlhaus: !!data?.urlhaus,
        ransomwatch: !!data?.ransomwatch,
        virustotal: !!data?.virustotal,
        shodan: !!data?.shodan,
        threatfox: !!data?.threatfox,
        feodotracker: !!data?.feodotracker,
        recentEvents: !!data?.recentEvents
      });
      
      // Generate minimal test data for visualization debugging
      threatData = [
        {
          position: [-95.7129, 37.0902],
          longitude: -95.7129,
          latitude: 37.0902,
          region: 'US',
          type: 'ddos_attack',
          count: 25,
          severity: 'high',
          timestamp: new Date().toISOString(),
          color: [255, 68, 68, 255],
          source: 'TestData'
        },
        {
          position: [104.1954, 35.8617],
          longitude: 104.1954,
          latitude: 35.8617,
          region: 'CN',
          type: 'malware',
          count: 15,
          severity: 'medium',
          timestamp: new Date().toISOString(),
          color: [255, 165, 0, 255],
          source: 'TestData'
        },
        {
          position: [10.4515, 51.1657],
          longitude: 10.4515,
          latitude: 51.1657,
          region: 'DE',
          type: 'phishing',
          count: 10,
          severity: 'critical',
          timestamp: new Date().toISOString(),
          color: [255, 0, 0, 255],
          source: 'TestData'
        }
      ];
      
      arcData = [
        {
          sourcePosition: [-95.7129, 37.0902],
          targetPosition: [104.1954, 35.8617],
          sourceRegion: 'US',
          targetRegion: 'CN',
          type: 'ddos_attack',
          intensity: 0.8,
          severity: 'high',
          count: 25,
          timestamp: new Date().toISOString(),
          isContinent: false,
          colors: {
            source: [255, 68, 68, 200],
            target: [255, 165, 0, 200],
            glow: [255, 100, 100]
          }
        }
      ];
      
      console.log('🔧 [DEBUG] Generated test data:', { threatPoints: threatData.length, arcs: arcData.length });
    }
    
    console.log(`✅ [DEBUG] Processed ${threatData.length} threat points and ${arcData.length} attack connections`);
    console.log('🔍 [DEBUG] Sample threat data:', threatData.slice(0, 3));
    console.log('🔍 [DEBUG] Sample arc data:', arcData.slice(0, 3));
    
    // Deduplicar puntos por país y tipo de amenaza
    const deduplicatedData = [];
    const seenCombinations = new Set();
    
    threatData.forEach(point => {
      const key = `${point.region}-${point.type}-${point.source}`;
      if (!seenCombinations.has(key)) {
        seenCombinations.add(key);
        deduplicatedData.push(point);
      } else {
        // Si ya existe, combinar los conteos
        const existing = deduplicatedData.find(p => 
          p.region === point.region && p.type === point.type && p.source === point.source
        );
        if (existing) {
          existing.count += point.count;
          // Actualizar severidad si es mayor
          const severityLevels = { low: 1, medium: 2, high: 3, critical: 4 };
          if (severityLevels[point.severity] > severityLevels[existing.severity]) {
            existing.severity = point.severity;
            existing.color = point.color;
          }
        }
      }
    });
    
    threatData = deduplicatedData;
    console.log(`After deduplication: ${threatData.length} unique threat points`);
    
    // Almacenar datos sin procesar para clustering dinámico
    rawThreatData = [...threatData];
    
    // Aplicar clustering basado en el zoom actual
    const processedData = getDataForZoomLevel(currentZoomLevel, rawThreatData);
    threatData = processedData;
    clusteredData = processedData;
    
    // Update deck.gl layers
    updateLayers();

  } catch (error) {
    console.error('Error loading threat data:', error);
    console.log('Using minimal test data for debugging due to error');
    
    // Generate minimal test data for debugging
    threatData = [
      {
        position: [-95.7129, 37.0902],
        longitude: -95.7129,
        latitude: 37.0902,
        region: 'US',
        type: 'ddos_attack',
        count: 25,
        severity: 'high',
        timestamp: new Date().toISOString(),
        color: [255, 68, 68, 255],
        source: 'ErrorFallback'
      },
      {
        position: [104.1954, 35.8617],
        longitude: 104.1954,
        latitude: 35.8617,
        region: 'CN',
        type: 'malware',
        count: 15,
        severity: 'medium',
        timestamp: new Date().toISOString(),
        color: [255, 165, 0, 255],
        source: 'ErrorFallback'
      }
    ];
    
    arcData = [
      {
        sourcePosition: [-95.7129, 37.0902],
        targetPosition: [104.1954, 35.8617],
        sourceRegion: 'US',
        targetRegion: 'CN',
        type: 'ddos_attack',
        intensity: 0.8,
        severity: 'high',
        count: 25,
        timestamp: new Date().toISOString(),
        isContinent: false,
        colors: {
          source: [255, 68, 68, 200],
          target: [255, 165, 0, 200],
          glow: [255, 100, 100]
        }
      }
    ];
    
    rawThreatData = [...threatData];
    clusteredData = [...threatData];
    
    updateLayers();
  }
}

// Helper function to normalize country names to ISO codes
function normalizeCountryCode(countryName) {
  if (!countryName || typeof countryName !== 'string') return null;
  
  const lowerName = countryName.toLowerCase();
  
  // Mapeo de nombres de países comunes a códigos ISO
  const countryToCode = {
    'united states': 'US',
    'usa': 'US',
    'america': 'US',
    'united kingdom': 'GB',
    'uk': 'GB',
    'britain': 'GB',
    'england': 'GB',
    'china': 'CN',
    'russia': 'RU',
    'germany': 'DE',
    'france': 'FR',
    'japan': 'JP',
    'india': 'IN',
    'brazil': 'BR',
    'canada': 'CA',
    'australia': 'AU',
    'south korea': 'KR',
    'netherlands': 'NL',
    'iran': 'IR',
    'turkey': 'TR',
    'italy': 'IT',
    'spain': 'ES',
    'ukraine': 'UA',
    'poland': 'PL',
    'mexico': 'MX',
    'sweden': 'SE',
    'norway': 'NO',
    'finland': 'FI',
    'denmark': 'DK',
    'belgium': 'BE',
    'switzerland': 'CH',
    'austria': 'AT',
    'czech republic': 'CZ',
    'hungary': 'HU',
    'romania': 'RO',
    'bulgaria': 'BG',
    'greece': 'GR',
    'portugal': 'PT',
    'israel': 'IL',
    'saudi arabia': 'SA',
    'united arab emirates': 'AE',
    'egypt': 'EG',
    'south africa': 'ZA',
    'nigeria': 'NG',
    'kenya': 'KE',
    'morocco': 'MA',
    'algeria': 'DZ',
    'tunisia': 'TN',
    'libya': 'LY',
    'thailand': 'TH',
    'vietnam': 'VN',
    'malaysia': 'MY',
    'singapore': 'SG',
    'indonesia': 'ID',
    'philippines': 'PH',
    'bangladesh': 'BD',
    'pakistan': 'PK',
    'afghanistan': 'AF',
    'iraq': 'IQ',
    'syria': 'SY',
    'lebanon': 'LB',
    'jordan': 'JO',
    'kuwait': 'KW',
    'qatar': 'QA',
    'bahrain': 'BH',
    'oman': 'OM',
    'yemen': 'YE',
    'north korea': 'KP',
    'taiwan': 'TW',
    'hong kong': 'HK',
    'macau': 'MO',
    'mongolia': 'MN',
    'kazakhstan': 'KZ',
    'uzbekistan': 'UZ',
    'turkmenistan': 'TM',
    'kyrgyzstan': 'KG',
    'tajikistan': 'TJ',
    'armenia': 'AM',
    'azerbaijan': 'AZ',
    'georgia': 'GE',
    'belarus': 'BY',
    'moldova': 'MD',
    'latvia': 'LV',
    'lithuania': 'LT',
    'estonia': 'EE',
    'slovenia': 'SI',
    'croatia': 'HR',
    'bosnia and herzegovina': 'BA',
    'serbia': 'RS',
    'montenegro': 'ME',
    'north macedonia': 'MK',
    'albania': 'AL',
    'kosovo': 'XK',
    'iceland': 'IS',
    'ireland': 'IE',
    'luxembourg': 'LU',
    'malta': 'MT',
    'cyprus': 'CY',
    'argentina': 'AR',
    'chile': 'CL',
    'peru': 'PE',
    'colombia': 'CO',
    'venezuela': 'VE',
    'ecuador': 'EC',
    'bolivia': 'BO',
    'paraguay': 'PY',
    'uruguay': 'UY',
    'guyana': 'GY',
    'suriname': 'SR',
    'french guiana': 'GF',
    'myanmar': 'MM',
    'burma': 'MM'
  };
  
  return countryToCode[lowerName] || null;
}

// Helper function to get country coordinates
function getCountryCoordinates(countryName) {
  // Validate input
  if (!countryName || typeof countryName !== 'string') {
    console.warn('Invalid country name:', countryName);
    return null;
  }
  
  const countryCoords = {
    'United States': [-95.7129, 37.0902],
    'China': [104.1954, 35.8617],
    'Russia': [105.3188, 61.5240],
    'Germany': [10.4515, 51.1657],
    'United Kingdom': [-3.4360, 55.3781],
    'France': [2.2137, 46.2276],
    'Japan': [138.2529, 36.2048],
    'India': [78.9629, 20.5937],
    'Brazil': [-51.9253, -14.2350],
    'Canada': [-106.3468, 56.1304],
    'Australia': [133.7751, -25.2744],
    'South Korea': [127.7669, 35.9078],
    'Netherlands': [5.2913, 52.1326],
    'Iran': [53.6880, 32.4279],
    'Turkey': [35.2433, 38.9637],
    'Italy': [12.5674, 41.8719],
    'Spain': [-3.7492, 40.4637],
    'Ukraine': [31.1656, 48.3794],
    'Poland': [19.1343, 51.9194],
    'Mexico': [-102.5528, 23.6345],
    'Sweden': [18.6435, 60.1282],
    'Norway': [8.4689, 60.4720],
    'Finland': [25.7482, 61.9241],
    'Denmark': [9.5018, 56.2639],
    'Belgium': [4.4699, 50.5039],
    'Switzerland': [8.2275, 46.8182],
    'Austria': [14.5501, 47.5162],
    'Czech Republic': [15.4730, 49.8175],
    'Hungary': [19.5033, 47.1625],
    'Romania': [24.9668, 45.9432],
    'Bulgaria': [25.4858, 42.7339],
    'Greece': [21.8243, 39.0742],
    'Portugal': [-8.2245, 39.3999],
    'Israel': [34.8516, 32.7940],
    'Saudi Arabia': [45.0792, 23.8859],
    'United Arab Emirates': [53.8478, 23.4241],
    'Egypt': [30.8025, 26.8206],
    'South Africa': [22.9375, -30.5595],
    'Nigeria': [8.6753, 9.0820],
    'Kenya': [37.9062, -0.0236],
    'Morocco': [-7.0926, 31.7917],
    'Algeria': [1.6596, 28.0339],
    'Tunisia': [9.5375, 33.8869],
    'Libya': [17.2283, 26.3351],
    'Thailand': [100.9925, 15.8700],
    'Vietnam': [108.2772, 14.0583],
    'Malaysia': [101.9758, 4.2105],
    'Singapore': [103.8198, 1.3521],
    'Indonesia': [113.9213, -0.7893],
    'Philippines': [121.7740, 12.8797],
    'Bangladesh': [90.3563, 23.6850],
    'Pakistan': [69.3451, 30.3753],
    'Afghanistan': [67.7090, 33.9391],
    'Iraq': [43.6793, 33.2232],
    'Syria': [38.9968, 34.8021],
    'Lebanon': [35.8623, 33.8547],
    'Jordan': [36.2384, 30.5852],
    'Kuwait': [47.4818, 29.3117],
    'Qatar': [51.1839, 25.3548],
    'Bahrain': [50.6344, 26.0667],
    'Oman': [55.9754, 21.4735],
    'Yemen': [48.5164, 15.5527],
    'North Korea': [127.5101, 40.3399],
    'Taiwan': [120.9605, 23.6978],
    'Hong Kong': [114.1694, 22.3193],
    'Macau': [113.5439, 22.1987],
    'Mongolia': [103.8467, 46.8625],
    'Kazakhstan': [66.9237, 48.0196],
    'Uzbekistan': [64.5853, 41.3775],
    'Turkmenistan': [59.5563, 38.9697],
    'Kyrgyzstan': [74.7661, 41.2044],
    'Tajikistan': [71.2761, 38.8610],
    'Armenia': [45.0382, 40.0691],
    'Azerbaijan': [47.5769, 40.1431],
    'Georgia': [43.3569, 42.3154],
    'Belarus': [27.9534, 53.7098],
    'Moldova': [28.3699, 47.4116],
    'Latvia': [24.6032, 56.8796],
    'Lithuania': [23.8813, 55.1694],
    'Estonia': [25.0136, 58.5953],
    'Slovenia': [14.9955, 46.1512],
    'Croatia': [15.2000, 45.1000],
    'Bosnia and Herzegovina': [17.6791, 43.9159],
    'Serbia': [21.0059, 44.0165],
    'Montenegro': [19.3744, 42.7087],
    'North Macedonia': [21.7453, 41.6086],
    'Albania': [20.1683, 41.1533],
    'Kosovo': [20.9021, 42.6026],
    'Iceland': [-19.0208, 64.9631],
    'Ireland': [-8.2439, 53.4129],
    'Luxembourg': [6.1296, 49.8153],
    'Malta': [14.3754, 35.9375],
    'Cyprus': [33.4299, 35.1264],
    'Argentina': [-63.6167, -38.4161],
    'Chile': [-71.5430, -35.6751],
    'Peru': [-75.0152, -9.1900],
    'Colombia': [-74.2973, 4.5709],
    'Venezuela': [-66.5897, 6.4238],
    'Ecuador': [-78.1834, -1.8312],
    'Bolivia': [-63.5887, -16.2902],
    'Paraguay': [-58.4438, -23.4425],
    'Uruguay': [-55.7658, -32.5228],
    'Guyana': [-58.9302, 4.8604],
    'Suriname': [-56.0278, 3.9193],
    'French Guiana': [-53.1258, 3.9339],
    'Myanmar': [95.9562, 21.9162],
    'Burma': [95.9562, 21.9162]
  };
  
  // Try exact match first
  if (countryCoords[countryName]) {
    return countryCoords[countryName];
  }
  
  // Try case-insensitive match
  const lowerName = countryName.toLowerCase();
  for (const [country, coords] of Object.entries(countryCoords)) {
    if (country.toLowerCase() === lowerName) {
      return coords;
    }
  }
  
  // Try partial match for common variations and ISO codes
  const partialMatches = {
    'usa': 'United States',
    'us': 'United States',
    'america': 'United States',
    'uk': 'United Kingdom',
    'gb': 'United Kingdom',
    'britain': 'United Kingdom',
    'england': 'United Kingdom',
    'uae': 'United Arab Emirates',
    'emirates': 'United Arab Emirates',
    'south korea': 'South Korea',
    'north korea': 'North Korea',
    'cn': 'China',
    'ru': 'Russia',
    'de': 'Germany',
    'fr': 'France',
    'jp': 'Japan',
    'in': 'India',
    'br': 'Brazil',
    'ca': 'Canada',
    'au': 'Australia',
    'kr': 'South Korea',
    'nl': 'Netherlands',
    'ir': 'Iran',
    'tr': 'Turkey',
    'it': 'Italy',
    'es': 'Spain',
    'ua': 'Ukraine',
    'pl': 'Poland',
    'mx': 'Mexico',
    'se': 'Sweden',
    'no': 'Norway',
    'fi': 'Finland',
    'dk': 'Denmark',
    'be': 'Belgium',
    'ch': 'Switzerland',
    'at': 'Austria',
    'cz': 'Czech Republic',
    'hu': 'Hungary',
    'ro': 'Romania',
    'bg': 'Bulgaria',
    'gr': 'Greece',
    'pt': 'Portugal',
    'il': 'Israel',
    'sa': 'Saudi Arabia',
    'ae': 'United Arab Emirates',
    'eg': 'Egypt',
    'za': 'South Africa',
    'ng': 'Nigeria',
    'ke': 'Kenya',
    'ma': 'Morocco',
    'dz': 'Algeria',
    'tn': 'Tunisia',
    'ly': 'Libya',
    'th': 'Thailand',
    'vn': 'Vietnam',
    'my': 'Malaysia',
    'sg': 'Singapore',
    'id': 'Indonesia',
    'ph': 'Philippines',
    'bd': 'Bangladesh',
    'pk': 'Pakistan',
    'af': 'Afghanistan',
    'iq': 'Iraq',
    'sy': 'Syria',
    'lb': 'Lebanon',
    'jo': 'Jordan',
    'kw': 'Kuwait',
    'qa': 'Qatar',
    'bh': 'Bahrain',
    'om': 'Oman',
    'ye': 'Yemen',
    'kp': 'North Korea',
    'tw': 'Taiwan',
    'hk': 'Hong Kong',
    'mo': 'Macau',
    'mn': 'Mongolia',
    'kz': 'Kazakhstan',
    'uz': 'Uzbekistan',
    'tm': 'Turkmenistan',
    'kg': 'Kyrgyzstan',
    'tj': 'Tajikistan',
    'am': 'Armenia',
    'az': 'Azerbaijan',
    'ge': 'Georgia',
    'by': 'Belarus',
    'md': 'Moldova',
    'lv': 'Latvia',
    'lt': 'Lithuania',
    'ee': 'Estonia',
    'si': 'Slovenia',
    'hr': 'Croatia',
    'ba': 'Bosnia and Herzegovina',
    'rs': 'Serbia',
    'me': 'Montenegro',
    'mk': 'North Macedonia',
    'al': 'Albania',
    'xk': 'Kosovo',
    'is': 'Iceland',
    'ie': 'Ireland',
    'lu': 'Luxembourg',
    'mt': 'Malta',
    'cy': 'Cyprus',
    'mm': 'Myanmar',
    'burma': 'Myanmar'
  };
  
  const matchedCountry = partialMatches[lowerName];
  if (matchedCountry && countryCoords[matchedCountry]) {
    return countryCoords[matchedCountry];
  }
  
  console.warn(`Country coordinates not found for: ${countryName}`);
  return null;
}

// Helper function to validate country codes
function isValidCountryCode(countryCode) {
  if (!countryCode || typeof countryCode !== 'string') return false;
  
  const invalidCodes = [
    'XX', 'COM', 'ORG', 'PRO', 'NET', 'EDU', 'GOV', 'MIL', 'INT',
    'Grim', 'juroots', 'DonPasci', 'abuse_ch', 'threatcat_ch', 
    'dyingbreeds_', '500mk500', 'admin', 'root', 'user', 'test'
  ];
  
  // Check if it's an invalid code
  if (invalidCodes.includes(countryCode)) return false;
  
  // Check if it looks like a username (contains underscores, numbers at end, etc.)
  if (/^[a-zA-Z0-9_]+_?[0-9]*$/.test(countryCode) && countryCode.length > 3) {
    return false;
  }
  
  // Check if it's a valid ISO country code (2-3 letters)
  if (/^[A-Z]{2,3}$/i.test(countryCode)) {
    return true;
  }
  
  // Check if it's a valid country name from our mapping
  if (COUNTRY_TO_CONTINENT.hasOwnProperty(countryCode)) {
    return true;
  }
  
  // Allow common country names that might not be in our mapping
  const validCountryNames = [
    'United States', 'China', 'Russia', 'Germany', 'United Kingdom', 
    'France', 'Japan', 'Brazil', 'India', 'Canada', 'Australia',
    'South Korea', 'Italy', 'Spain', 'Netherlands', 'Mexico',
    'Turkey', 'Saudi Arabia', 'Switzerland', 'Taiwan', 'Belgium',
    'Argentina', 'Sweden', 'Ireland', 'Israel', 'Austria',
    'Nigeria', 'Egypt', 'South Africa', 'Philippines', 'Chile',
    'Finland', 'Bangladesh', 'Vietnam', 'Czech Republic', 'Romania',
    'New Zealand', 'Peru', 'Greece', 'Portugal', 'Hungary'
  ];
  
  if (validCountryNames.includes(countryCode)) {
    return true;
  }
  
  return false;
}

// Helper function to get random coordinates
function getRandomCoordinates() {
  // Lista de coordenadas de ciudades principales para usar como ubicaciones aleatorias
  // Esto evita puntos en el mar y proporciona ubicaciones realistas
  const majorCities = [
    [-74.0060, 40.7128], // New York
    [-0.1276, 51.5074],  // London
    [2.3522, 48.8566],   // Paris
    [139.6917, 35.6895], // Tokyo
    [116.4074, 39.9042], // Beijing
    [37.6173, 55.7558],  // Moscow
    [13.4050, 52.5200],  // Berlin
    [12.4964, 41.9028],  // Rome
    [-3.7038, 40.4168],  // Madrid
    [4.9041, 52.3676],   // Amsterdam
    [18.0686, 59.3293],  // Stockholm
    [10.7522, 59.9139],  // Oslo
    [24.9384, 60.1699],  // Helsinki
    [12.5683, 55.6761],  // Copenhagen
    [16.3738, 48.2082],  // Vienna
    [14.4378, 50.0755],  // Prague
    [19.0402, 47.4979],  // Budapest
    [21.0122, 52.2297],  // Warsaw
    [26.1025, 44.4268],  // Bucharest
    [23.3219, 42.6977],  // Sofia
    [21.1655, 42.9923],  // Skopje
    [14.5058, 46.0569],  // Ljubljana
    [15.9819, 45.8150],  // Zagreb
    [18.4241, 43.8563],  // Sarajevo
    [20.4489, 44.7866],  // Belgrade
    [28.9784, 41.0082],  // Istanbul
    [35.2433, 39.9334],  // Ankara
    [34.8516, 31.0461],  // Jerusalem
    [31.2357, 30.0444],  // Cairo
    [3.3792, 6.5244],    // Lagos
    [28.0473, -26.2041], // Johannesburg
    [18.4241, -33.9249], // Cape Town
    [55.2708, 25.2048],  // Dubai
    [51.3890, 35.6892],  // Tehran
    [67.0011, 24.8607],  // Karachi
    [77.1025, 28.7041],  // Delhi
    [72.8777, 19.0760],  // Mumbai
    [88.3639, 22.5726],  // Kolkata
    [80.2707, 13.0827],  // Chennai
    [77.5946, 12.9716],  // Bangalore
    [78.4867, 17.3850],  // Hyderabad
    [100.5018, 13.7563], // Bangkok
    [106.8650, -6.1751], // Jakarta
    [103.8198, 1.3521],  // Singapore
    [121.4737, 31.2304], // Shanghai
    [114.1694, 22.3193], // Hong Kong
    [121.5654, 25.0330], // Taipei
    [126.9780, 37.5665], // Seoul
    [127.7669, 26.2041], // Okinawa
    [151.2093, -33.8688], // Sydney
    [144.9631, -37.8136], // Melbourne
    [153.0251, -27.4698], // Brisbane
    [115.8605, -31.9505], // Perth
    [-79.3832, 43.6532], // Toronto
    [-73.5673, 45.5017], // Montreal
    [-123.1207, 49.2827], // Vancouver
    [-114.0719, 51.0447], // Calgary
    [-99.9737, 49.8951], // Winnipeg
    [-75.6972, 45.4215], // Ottawa
    [-71.2080, 46.8139], // Quebec City
    [-63.5752, 44.6488], // Halifax
    [-52.7126, 47.5615], // St. John's
    [-106.3468, 52.1579], // Saskatoon
    [-113.4909, 53.5461], // Edmonton
    [-122.3321, 47.6062], // Seattle
    [-118.2437, 34.0522], // Los Angeles
    [-87.6298, 41.8781], // Chicago
    [-95.3698, 29.7604], // Houston
    [-112.0740, 33.4484], // Phoenix
    [-104.9903, 39.7392], // Denver
    [-90.0715, 29.9511], // New Orleans
    [-82.5515, 27.9506], // Tampa
    [-80.1918, 25.7617], // Miami
    [-84.3880, 33.7490], // Atlanta
    [-77.0369, 38.9072], // Washington DC
    [-71.0589, 42.3601], // Boston
    [-122.4194, 37.7749], // San Francisco
    [-121.4944, 38.5816], // Sacramento
    [-115.1398, 36.1699], // Las Vegas
    [-111.8910, 40.7608], // Salt Lake City
    [-97.7431, 30.2672], // Austin
    [-96.7970, 32.7767], // Dallas
    [-43.1729, -22.9068], // Rio de Janeiro
    [-46.6333, -23.5505], // São Paulo
    [-47.8825, -15.7942], // Brasília
    [-38.5014, -12.9714], // Salvador
    [-34.8941, -8.0476],  // Recife
    [-60.0261, -3.1190],  // Manaus
    [-51.2177, -30.0346], // Porto Alegre
    [-49.2643, -25.4284], // Curitiba
    [-44.2075, -19.9167], // Belo Horizonte
    [-35.2094, -5.7945],  // Natal
    [-58.3816, -34.6037], // Buenos Aires
    [-68.1193, -16.4897], // La Paz
    [-70.6693, -33.4489], // Santiago
    [-74.0721, 4.7110],   // Bogotá
    [-78.4678, -0.1807],  // Quito
    [-77.0428, -12.0464], // Lima
    [-56.1645, -34.9011], // Montevideo
    [-66.5897, 10.4806],  // Caracas
    [-58.4438, -25.2637], // Asunción
  ];
  
  // Seleccionar una ciudad aleatoria
  const randomIndex = Math.floor(Math.random() * majorCities.length);
  return majorCities[randomIndex];
}

// Coordenadas centrales de continentes para clustering
const CONTINENT_COORDINATES = {
  'North America': [-100.0, 45.0],
  'South America': [-60.0, -15.0],
  'Europe': [10.0, 54.0],
  'Africa': [35.0, 5.0], // Coordenadas ajustadas para centrar sobre África (mucho más al este)
  'Asia': [100.0, 35.0],
  'Oceania': [140.0, -25.0],
  'Antarctica': [0.0, -90.0]
};

// Mapeo de países a continentes
const COUNTRY_TO_CONTINENT = {
  // América del Norte
  'United States': 'North America', 'US': 'North America', 'USA': 'North America',
  'Canada': 'North America', 'CA': 'North America',
  'Mexico': 'North America', 'MX': 'North America',
  'Guatemala': 'North America', 'Belize': 'North America', 'Honduras': 'North America',
  'El Salvador': 'North America', 'Nicaragua': 'North America', 'Costa Rica': 'North America',
  'Panama': 'North America', 'Cuba': 'North America', 'Jamaica': 'North America',
  'Haiti': 'North America', 'Dominican Republic': 'North America',
  
  // América del Sur
  'Brazil': 'South America', 'BR': 'South America',
  'Argentina': 'South America', 'AR': 'South America',
  'Chile': 'South America', 'CL': 'South America',
  'Peru': 'South America', 'PE': 'South America',
  'Colombia': 'South America', 'CO': 'South America',
  'Venezuela': 'South America', 'VE': 'South America',
  'Ecuador': 'South America', 'EC': 'South America',
  'Bolivia': 'South America', 'BO': 'South America',
  'Paraguay': 'South America', 'PY': 'South America',
  'Uruguay': 'South America', 'UY': 'South America',
  'Guyana': 'South America', 'Suriname': 'South America', 'French Guiana': 'South America',
  
  // Europa
  'Germany': 'Europe', 'DE': 'Europe',
  'France': 'Europe', 'FR': 'Europe',
  'United Kingdom': 'Europe', 'UK': 'Europe', 'GB': 'Europe',
  'Italy': 'Europe', 'IT': 'Europe',
  'Spain': 'Europe', 'ES': 'Europe',
  'Poland': 'Europe', 'PL': 'Europe',
  'Romania': 'Europe', 'RO': 'Europe',
  'Netherlands': 'Europe', 'NL': 'Europe',
  'Belgium': 'Europe', 'BE': 'Europe',
  'Greece': 'Europe', 'GR': 'Europe',
  'Portugal': 'Europe', 'PT': 'Europe',
  'Czech Republic': 'Europe', 'CZ': 'Europe',
  'Hungary': 'Europe', 'HU': 'Europe',
  'Sweden': 'Europe', 'SE': 'Europe',
  'Austria': 'Europe', 'AT': 'Europe',
  'Belarus': 'Europe', 'BY': 'Europe',
  'Switzerland': 'Europe', 'CH': 'Europe',
  'Bulgaria': 'Europe', 'BG': 'Europe',
  'Serbia': 'Europe', 'RS': 'Europe',
  'Denmark': 'Europe', 'DK': 'Europe',
  'Finland': 'Europe', 'FI': 'Europe',
  'Slovakia': 'Europe', 'SK': 'Europe',
  'Norway': 'Europe', 'NO': 'Europe',
  'Ireland': 'Europe', 'IE': 'Europe',
  'Croatia': 'Europe', 'HR': 'Europe',
  'Bosnia and Herzegovina': 'Europe', 'BA': 'Europe',
  'Albania': 'Europe', 'AL': 'Europe',
  'Lithuania': 'Europe', 'LT': 'Europe',
  'Slovenia': 'Europe', 'SI': 'Europe',
  'Latvia': 'Europe', 'LV': 'Europe',
  'Estonia': 'Europe', 'EE': 'Europe',
  'Macedonia': 'Europe', 'MK': 'Europe',
  'Moldova': 'Europe', 'MD': 'Europe',
  'Luxembourg': 'Europe', 'LU': 'Europe',
  'Malta': 'Europe', 'MT': 'Europe',
  'Iceland': 'Europe', 'IS': 'Europe',
  'Montenegro': 'Europe', 'ME': 'Europe',
  'Russia': 'Europe', 'RU': 'Europe',
  'Ukraine': 'Europe', 'UA': 'Europe',
  
  // Asia
  'China': 'Asia', 'CN': 'Asia',
  'India': 'Asia', 'IN': 'Asia',
  'Japan': 'Asia', 'JP': 'Asia',
  'South Korea': 'Asia', 'KR': 'Asia',
  'Indonesia': 'Asia', 'ID': 'Asia',
  'Pakistan': 'Asia', 'PK': 'Asia',
  'Bangladesh': 'Asia', 'BD': 'Asia',
  'Philippines': 'Asia', 'PH': 'Asia',
  'Vietnam': 'Asia', 'VN': 'Asia',
  'Turkey': 'Asia', 'TR': 'Asia',
  'Iran': 'Asia', 'IR': 'Asia',
  'Thailand': 'Asia', 'TH': 'Asia',
  'Myanmar': 'Asia', 'MM': 'Asia',
  'South Korea': 'Asia', 'KR': 'Asia',
  'Iraq': 'Asia', 'IQ': 'Asia',
  'Afghanistan': 'Asia', 'AF': 'Asia',
  'Saudi Arabia': 'Asia', 'SA': 'Asia',
  'Uzbekistan': 'Asia', 'UZ': 'Asia',
  'Malaysia': 'Asia', 'MY': 'Asia',
  'Nepal': 'Asia', 'NP': 'Asia',
  'Yemen': 'Asia', 'YE': 'Asia',
  'North Korea': 'Asia', 'KP': 'Asia',
  'Sri Lanka': 'Asia', 'LK': 'Asia',
  'Kazakhstan': 'Asia', 'KZ': 'Asia',
  'Syria': 'Asia', 'SY': 'Asia',
  'Cambodia': 'Asia', 'KH': 'Asia',
  'Jordan': 'Asia', 'JO': 'Asia',
  'Azerbaijan': 'Asia', 'AZ': 'Asia',
  'United Arab Emirates': 'Asia', 'AE': 'Asia',
  'Tajikistan': 'Asia', 'TJ': 'Asia',
  'Israel': 'Asia', 'IL': 'Asia',
  'Laos': 'Asia', 'LA': 'Asia',
  'Singapore': 'Asia', 'SG': 'Asia',
  'Oman': 'Asia', 'OM': 'Asia',
  'Kuwait': 'Asia', 'KW': 'Asia',
  'Georgia': 'Asia', 'GE': 'Asia',
  'Mongolia': 'Asia', 'MN': 'Asia',
  'Armenia': 'Asia', 'AM': 'Asia',
  'Qatar': 'Asia', 'QA': 'Asia',
  'Bahrain': 'Asia', 'BH': 'Asia',
  'East Timor': 'Asia', 'TL': 'Asia',
  'Maldives': 'Asia', 'MV': 'Asia',
  'Brunei': 'Asia', 'BN': 'Asia',
  
  // África
  'Nigeria': 'Africa', 'NG': 'Africa',
  'Ethiopia': 'Africa', 'ET': 'Africa',
  'Egypt': 'Africa', 'EG': 'Africa',
  'Democratic Republic of the Congo': 'Africa', 'CD': 'Africa',
  'South Africa': 'Africa', 'ZA': 'Africa',
  'Kenya': 'Africa', 'KE': 'Africa',
  'Uganda': 'Africa', 'UG': 'Africa',
  'Algeria': 'Africa', 'DZ': 'Africa',
  'Sudan': 'Africa', 'SD': 'Africa',
  'Morocco': 'Africa', 'MA': 'Africa',
  'Angola': 'Africa', 'AO': 'Africa',
  'Ghana': 'Africa', 'GH': 'Africa',
  'Mozambique': 'Africa', 'MZ': 'Africa',
  'Madagascar': 'Africa', 'MG': 'Africa',
  'Cameroon': 'Africa', 'CM': 'Africa',
  'Ivory Coast': 'Africa', 'CI': 'Africa',
  'Niger': 'Africa', 'NE': 'Africa',
  'Burkina Faso': 'Africa', 'BF': 'Africa',
  'Mali': 'Africa', 'ML': 'Africa',
  'Malawi': 'Africa', 'MW': 'Africa',
  'Zambia': 'Africa', 'ZM': 'Africa',
  'Senegal': 'Africa', 'SN': 'Africa',
  'Somalia': 'Africa', 'SO': 'Africa',
  'Chad': 'Africa', 'TD': 'Africa',
  'Zimbabwe': 'Africa', 'ZW': 'Africa',
  'Guinea': 'Africa', 'GN': 'Africa',
  'Rwanda': 'Africa', 'RW': 'Africa',
  'Benin': 'Africa', 'BJ': 'Africa',
  'Tunisia': 'Africa', 'TN': 'Africa',
  'Burundi': 'Africa', 'BI': 'Africa',
  'South Sudan': 'Africa', 'SS': 'Africa',
  'Togo': 'Africa', 'TG': 'Africa',
  'Sierra Leone': 'Africa', 'SL': 'Africa',
  'Libya': 'Africa', 'LY': 'Africa',
  'Liberia': 'Africa', 'LR': 'Africa',
  'Central African Republic': 'Africa', 'CF': 'Africa',
  'Mauritania': 'Africa', 'MR': 'Africa',
  'Eritrea': 'Africa', 'ER': 'Africa',
  'Gambia': 'Africa', 'GM': 'Africa',
  'Botswana': 'Africa', 'BW': 'Africa',
  'Namibia': 'Africa', 'NA': 'Africa',
  'Gabon': 'Africa', 'GA': 'Africa',
  'Lesotho': 'Africa', 'LS': 'Africa',
  'Guinea-Bissau': 'Africa', 'GW': 'Africa',
  'Equatorial Guinea': 'Africa', 'GQ': 'Africa',
  'Mauritius': 'Africa', 'MU': 'Africa',
  'Eswatini': 'Africa', 'SZ': 'Africa',
  'Djibouti': 'Africa', 'DJ': 'Africa',
  'Comoros': 'Africa', 'KM': 'Africa',
  'Cape Verde': 'Africa', 'CV': 'Africa',
  'Sao Tome and Principe': 'Africa', 'ST': 'Africa',
  'Seychelles': 'Africa', 'SC': 'Africa',
  
  // Oceanía
  'Australia': 'Oceania', 'AU': 'Oceania',
  'Papua New Guinea': 'Oceania', 'PG': 'Oceania',
  'New Zealand': 'Oceania', 'NZ': 'Oceania',
  'Fiji': 'Oceania', 'FJ': 'Oceania',
  'Solomon Islands': 'Oceania', 'SB': 'Oceania',
  'Vanuatu': 'Oceania', 'VU': 'Oceania',
  'Samoa': 'Oceania', 'WS': 'Oceania',
  'Micronesia': 'Oceania', 'FM': 'Oceania',
  'Tonga': 'Oceania', 'TO': 'Oceania',
  'Kiribati': 'Oceania', 'KI': 'Oceania',
  'Palau': 'Oceania', 'PW': 'Oceania',
  'Marshall Islands': 'Oceania', 'MH': 'Oceania',
  'Tuvalu': 'Oceania', 'TV': 'Oceania',
  'Nauru': 'Oceania', 'NR': 'Oceania'
};

// Función para obtener el continente de un país
function getCountryContinent(countryName) {
  if (!countryName) return 'Unknown';
  
  // Buscar coincidencia exacta
  const continent = COUNTRY_TO_CONTINENT[countryName];
  if (continent) return continent;
  
  // Buscar coincidencia parcial (insensible a mayúsculas)
  const lowerCountry = countryName.toLowerCase();
  for (const [country, cont] of Object.entries(COUNTRY_TO_CONTINENT)) {
    if (country.toLowerCase().includes(lowerCountry) || lowerCountry.includes(country.toLowerCase())) {
      return cont;
    }
  }
  
  return 'Unknown';
}

// Función para obtener el nombre completo del país a partir de código o abreviatura
function getFullCountryName(countryCode) {
  if (!countryCode) return 'País Desconocido';
  
  // Si ya es un nombre completo (más de 3 caracteres y no solo mayúsculas)
  if (countryCode.length > 3 && !/^[A-Z]{2,3}$/.test(countryCode)) {
    // Verificar si es un nombre de continente conocido
    const continentNames = ['Africa', 'África', 'North America', 'Norte América', 'South America', 'Sudamérica', 'Europe', 'Europa', 'Asia', 'Oceania', 'Oceanía', 'Antarctica', 'Antártida'];
    if (continentNames.includes(countryCode)) {
      return countryCode;
    }
    return countryCode;
  }
  
  // Mapeo directo de códigos comunes a nombres completos
  const codeMap = {
    'US': 'United States', 'USA': 'United States',
    'UK': 'United Kingdom', 'GB': 'United Kingdom',
    'DE': 'Germany', 'FR': 'France', 'ES': 'Spain', 'IT': 'Italy',
    'CN': 'China', 'JP': 'Japan', 'RU': 'Russia', 'IN': 'India',
    'BR': 'Brazil', 'CA': 'Canada', 'AU': 'Australia', 'MX': 'Mexico',
    'AR': 'Argentina', 'CL': 'Chile', 'CO': 'Colombia', 'PE': 'Peru',
    'NL': 'Netherlands', 'SE': 'Sweden', 'NO': 'Norway', 'FI': 'Finland',
    'DK': 'Denmark', 'BE': 'Belgium', 'PT': 'Portugal', 'GR': 'Greece',
    'TR': 'Turkey', 'KR': 'South Korea', 'SG': 'Singapore', 'NZ': 'New Zealand',
    'CH': 'Switzerland', 'AT': 'Austria', 'PL': 'Poland', 'RO': 'Romania',
    'HU': 'Hungary', 'CZ': 'Czech Republic', 'BG': 'Bulgaria', 'SK': 'Slovakia',
    'HR': 'Croatia', 'RS': 'Serbia', 'SI': 'Slovenia', 'EE': 'Estonia',
    'LV': 'Latvia', 'LT': 'Lithuania', 'MT': 'Malta', 'CY': 'Cyprus',
    'IE': 'Ireland', 'IS': 'Iceland', 'LU': 'Luxembourg', 'AD': 'Andorra',
    'MC': 'Monaco', 'SM': 'San Marino', 'VA': 'Vatican City', 'LI': 'Liechtenstein',
    'UA': 'Ukraine', 'BY': 'Belarus', 'MD': 'Moldova', 'GE': 'Georgia',
    'AM': 'Armenia', 'AZ': 'Azerbaijan', 'KZ': 'Kazakhstan', 'UZ': 'Uzbekistan',
    'TM': 'Turkmenistan', 'TJ': 'Tajikistan', 'KG': 'Kyrgyzstan',
    'SA': 'Saudi Arabia', 'AE': 'United Arab Emirates', 'QA': 'Qatar',
    'KW': 'Kuwait', 'OM': 'Oman', 'BH': 'Bahrain', 'YE': 'Yemen',
    'JO': 'Jordan', 'LB': 'Lebanon', 'SY': 'Syria', 'IQ': 'Iraq',
    'IR': 'Iran', 'AF': 'Afghanistan', 'PK': 'Pakistan', 'BD': 'Bangladesh',
    'LK': 'Sri Lanka', 'NP': 'Nepal', 'BT': 'Bhutan', 'MV': 'Maldives',
    'ID': 'Indonesia', 'MY': 'Malaysia', 'TH': 'Thailand', 'VN': 'Vietnam',
    'PH': 'Philippines', 'MM': 'Myanmar', 'LA': 'Laos', 'KH': 'Cambodia',
    'SG': 'Singapore', 'BN': 'Brunei', 'TL': 'Timor-Leste',
    'NG': 'Nigeria', 'ET': 'Ethiopia', 'EG': 'Egypt', 'CD': 'Democratic Republic of the Congo',
    'ZA': 'South Africa', 'KE': 'Kenya', 'SD': 'Sudan', 'TZ': 'Tanzania',
    'UG': 'Uganda', 'DZ': 'Algeria', 'MA': 'Morocco', 'GH': 'Ghana',
    'AO': 'Angola', 'MZ': 'Mozambique', 'MG': 'Madagascar', 'CM': 'Cameroon',
    'CI': 'Ivory Coast', 'NE': 'Niger', 'BF': 'Burkina Faso', 'ML': 'Mali',
    'MW': 'Malawi', 'ZM': 'Zambia', 'SN': 'Senegal', 'TD': 'Chad',
    'SO': 'Somalia', 'ZW': 'Zimbabwe', 'RW': 'Rwanda', 'BJ': 'Benin',
    'TG': 'Togo', 'SL': 'Sierra Leone', 'LY': 'Libya', 'LR': 'Liberia',
    'CF': 'Central African Republic', 'MR': 'Mauritania', 'ER': 'Eritrea',
    'GM': 'Gambia', 'BW': 'Botswana', 'NA': 'Namibia', 'GA': 'Gabon',
    'LS': 'Lesotho', 'GW': 'Guinea-Bissau', 'GQ': 'Equatorial Guinea',
    'MU': 'Mauritius', 'SZ': 'Eswatini', 'DJ': 'Djibouti', 'KM': 'Comoros',
    'CV': 'Cape Verde', 'ST': 'Sao Tome and Principe', 'SC': 'Seychelles'
  };
  
  // Buscar en el mapeo de códigos
  if (codeMap[countryCode]) {
    return codeMap[countryCode];
  }
  
  // Buscar coincidencia en el mapeo de continentes
  for (const [fullName, continent] of Object.entries(COUNTRY_TO_CONTINENT)) {
    if (fullName === countryCode || 
        (countryCode.length <= 3 && fullName.includes(countryCode))) {
      return fullName;
    }
  }
  
  // Si no se encuentra coincidencia, devolver el código original
  return countryCode;
}

// Función para agrupar datos por continente
function clusterDataByContinent(data) {
  const continentClusters = {};
  
  data.forEach(threat => {
    const continent = getCountryContinent(threat.region);
    
    if (!continentClusters[continent]) {
      continentClusters[continent] = {
        position: CONTINENT_COORDINATES[continent] || [0, 0],
        region: continent,
        type: 'cluster',
        count: 0,
        severity: 'low',
        timestamp: new Date().toISOString(),
        color: [255, 165, 0, 180], // Naranja para clusters
        clusteredThreats: []
      };
    }
    
    continentClusters[continent].count += threat.count || 1;
    continentClusters[continent].clusteredThreats.push(threat);
    
    // Actualizar severidad basada en el total
    const totalCount = continentClusters[continent].count;
    if (totalCount > 500) {
      continentClusters[continent].severity = 'critical';
      continentClusters[continent].color = [255, 0, 0, 200];
    } else if (totalCount > 200) {
      continentClusters[continent].severity = 'high';
      continentClusters[continent].color = [255, 100, 0, 190];
    } else if (totalCount > 50) {
      continentClusters[continent].severity = 'medium';
      continentClusters[continent].color = [255, 165, 0, 180];
    }
  });
  
  return Object.values(continentClusters).filter(cluster => cluster.count > 0);
}

// Función para determinar qué datos mostrar según el zoom
function getDataForZoomLevel(zoomLevel, rawData) {
  // Zoom bajo (0-3): mostrar clusters por continente
  if (zoomLevel <= 3) {
    return clusterDataByContinent(rawData);
  }
  // Zoom medio-alto (4+): mostrar datos por país
  else {
    return rawData;
  }
}

// Helper function to generate attack connections
// Colores mejorados por tipo de amenaza
const THREAT_TYPE_COLORS = {
  'malware': {
    source: [255, 80, 80, 220],    // Rojo intenso
    target: [255, 150, 150, 180],  // Rojo claro
    glow: [255, 100, 100, 100]
  },
  'phishing': {
    source: [255, 165, 0, 220],    // Naranja
    target: [255, 200, 100, 180],  // Naranja claro
    glow: [255, 180, 50, 100]
  },
  'ransomware': {
    source: [148, 0, 211, 220],    // Púrpura
    target: [200, 100, 255, 180],  // Púrpura claro
    glow: [170, 50, 230, 100]
  },
  'ddos': {
    source: [255, 20, 147, 220],   // Rosa intenso
    target: [255, 150, 200, 180],  // Rosa claro
    glow: [255, 100, 170, 100]
  },
  'botnet': {
    source: [50, 205, 50, 220],    // Verde lima
    target: [150, 255, 150, 180],  // Verde claro
    glow: [100, 230, 100, 100]
  },
  'default': {
    source: [80, 180, 255, 220],   // Azul cibernético
    target: [150, 220, 255, 180],  // Azul claro
    glow: [100, 200, 255, 100]
  }
};

function generateAttackConnections(threats) {
  const connections = [];
  
  // Siempre generar arcos entre continentes principales
  const continentThreats = {};
  
  // Agrupar amenazas por continente
  threats.forEach(threat => {
    const continent = getCountryContinent(threat.region);
    if (continent && continent !== 'Unknown') {
      if (!continentThreats[continent]) {
        continentThreats[continent] = [];
      }
      continentThreats[continent].push(threat);
    }
  });
  
  const continents = Object.keys(continentThreats);
  
  // Conexiones predefinidas entre continentes principales
  const continentConnections = [
    ['North America', 'Europe'],
    ['North America', 'Asia'],
    ['Europe', 'Asia'],
    ['Europe', 'Africa'],
    ['Asia', 'Australia'],
    ['Asia', 'Africa'],
    ['South America', 'North America'],
    ['South America', 'Africa'],
    ['Africa', 'Europe']
  ];
  
  // Crear arcos entre continentes principales
  continentConnections.forEach(([sourceContinentName, targetContinentName]) => {
    if (continents.includes(sourceContinentName) && continents.includes(targetContinentName)) {
      const sourcePos = CONTINENT_COORDINATES[sourceContinentName];
      const targetPos = CONTINENT_COORDINATES[targetContinentName];
      
      if (sourcePos && targetPos) {
        const sourceThreats = continentThreats[sourceContinentName] || [];
        const targetThreats = continentThreats[targetContinentName] || [];
        
        // Usar una amenaza representativa para el tipo
        const representativeThreat = sourceThreats.length > 0 ? 
          sourceThreats[0] : (targetThreats.length > 0 ? targetThreats[0] : null);
        
        if (representativeThreat) {
          // Calcular intensidad basada en número de amenazas (mínimo 0.3 para visibilidad)
          const intensity = Math.max(Math.min(sourceThreats.length / 8, 1), 0.3);
          const threatType = representativeThreat.type || 'default';
          
          connections.push({
            sourcePosition: sourcePos,
            targetPosition: targetPos,
            sourceRegion: sourceContinentName,
            targetRegion: targetContinentName,
            type: threatType,
            intensity: intensity,
            severity: representativeThreat.severity || 'medium',
            count: sourceThreats.length,
            timestamp: new Date().toISOString(),
            isContinent: true,
            colors: THREAT_TYPE_COLORS[threatType] || THREAT_TYPE_COLORS.default
          });
        }
      }
    }
  });
  
  // Añadir arcos detallados entre países cuando el zoom es mayor a 3
  if (currentZoomLevel >= 3 && threats.length > 0) {
    const maxConnections = Math.min(threats.length, 50); // Reducir cantidad para mejor rendimiento
    
    for (let i = 0; i < maxConnections; i++) {
      const source = threats[Math.floor(Math.random() * threats.length)];
      const target = threats[Math.floor(Math.random() * threats.length)];
      
      if (source !== target && source.region && target.region && source.region !== target.region) {
        const threatType = source.type || 'default';
        const intensity = Math.max(Math.min((source.count || 1) / 30, 1), 0.2);
        
        connections.push({
          sourcePosition: source.position,
          targetPosition: target.position,
          sourceRegion: source.region,
          targetRegion: target.region,
          type: threatType,
          intensity: intensity,
          severity: source.severity || 'medium',
          count: source.count || 1,
          timestamp: new Date().toISOString(),
          isContinent: false,
          colors: THREAT_TYPE_COLORS[threatType] || THREAT_TYPE_COLORS.default
        });
      }
    }
  }
  
  return connections;
}

// Removed fallback data generation - only real data is used

// Get color based on threat severity
function getSeverityColor(severity) {
  switch (severity) {
    case 'critical': return [255, 0, 0, 255];
    case 'high': return [255, 68, 68, 255];
    case 'medium': return [255, 165, 0, 255];
    case 'low': return [255, 255, 0, 255];
    default: return [0, 255, 255, 255];
  }
}

// Update deck.gl layers with performance optimizations
function updateLayers() {
  console.log('🔍 [DEBUG] === STARTING updateLayers ===');
  console.log('🔍 [DEBUG] deckOverlay exists:', !!deckOverlay);
  console.log('🔍 [DEBUG] threatData length:', threatData.length);
  console.log('🔍 [DEBUG] arcData length:', arcData.length);
  console.log('🔍 [DEBUG] threatData sample:', threatData.slice(0, 3));
  console.log('🔍 [DEBUG] arcData sample:', arcData.slice(0, 3));
  
  // Early exit if no deckOverlay
  if (!deckOverlay) {
    console.error('🚨 [ERROR] deckOverlay is not initialized!');
    return;
  }
  
  const currentTime = Date.now();
  
  // Ensure performanceMode is valid
  if (!performanceMode || !PERFORMANCE_SETTINGS[performanceMode]) {
    performanceMode = 'default';
    console.warn('🚨 [DEBUG] Performance mode not set, defaulting to default');
  }
  
  // Throttle updates for performance
  if (currentTime - lastUpdateTime < PERFORMANCE_SETTINGS[performanceMode].updateInterval) {
    console.log('🔍 [DEBUG] Update throttled');
    return;
  }
  lastUpdateTime = currentTime;
  
  const layers = [];
  const settings = PERFORMANCE_SETTINGS[performanceMode];
  
  console.log(`DEBUG: Starting updateLayers with ${threatData.length} threats, frustumCulling: ${settings.frustumCulling}, adaptiveLOD: ${settings.adaptiveLOD}`);
  
  // Skip frustum culling and LOD for debugging
  let processedThreatData = threatData;
  console.log(`DEBUG: Using ${processedThreatData.length} threat points (no culling)`);

  // Regenerate arcs based on processed threat data
  if (processedThreatData.length > 0) {
    const newArcs = generateAttackConnections(processedThreatData);
    arcData = newArcs;
    console.log(`DEBUG: Generated ${newArcs.length} arcs for zoom level ${currentZoomLevel}`);
  } else {
    console.log('DEBUG: No threat data available for arc generation');
  }

  // Skip arc culling for debugging
  let processedArcData = arcData;
  console.log(`DEBUG: Using ${processedArcData.length} arcs (no culling)`);

  // Limit data size based on performance mode (fallback)
  const limitedThreatData = processedThreatData.slice(0, settings.maxPoints);
  const limitedArcData = processedArcData.slice(0, settings.maxArcs);

  // Almacenar datos visibles para uso posterior
  visibleThreatData = limitedThreatData;
  visibleArcData = limitedArcData;
  
  console.log(`🔍 [DEBUG] Creating layers with ${limitedThreatData.length} threat points and ${limitedArcData.length} arcs`);
  console.log('🔍 [DEBUG] Sample threat data:', limitedThreatData.slice(0, 2));
  console.log('🔍 [DEBUG] Sample arc data:', limitedArcData.slice(0, 2));
  
  // Verificar coordenadas específicas
  if (limitedThreatData.length > 0) {
    console.log('🚨 [COORDS] First threat coordinates:', {
      longitude: limitedThreatData[0].longitude,
      latitude: limitedThreatData[0].latitude,
      position: limitedThreatData[0].position
    });
  }
  
  if (limitedArcData.length > 0) {
    console.log('🚨 [COORDS] First arc coordinates:', {
      sourcePosition: limitedArcData[0].sourcePosition,
      targetPosition: limitedArcData[0].targetPosition
    });
  }
  
  // SIMPLIFIED LAYER CREATION - Direct approach
  console.log('🔧 [DEBUG] Creating layers directly...');

  // Generar heatmaps por tipo de amenaza
  if (settings.enableHeatmap && performanceMode !== 'low' && performanceMode !== 'potato') {
    generateThreatHeatmaps();
    updateHeatmapLayers();
  }

  // Actualizar métricas en tiempo real
  updateRealTimeMetrics();

  // Crear capas principales de amenazas
  if (limitedThreatData && limitedThreatData.length > 0) {
    layers.push(new ScatterplotLayer({
      id: 'threat-points',
      data: limitedThreatData,
      pickable: true,
      opacity: 0.8,
      stroked: true,
      filled: true,
      radiusScale: 20,
      radiusMinPixels: 15,
      radiusMaxPixels: 50,
      lineWidthMinPixels: 1,
      getPosition: d => {
        console.log('🔍 [DEBUG] getPosition for threat:', d.position);
        return d.position;
      },
      getRadius: d => {
        const severityMap = { critical: 4, high: 3, medium: 2, low: 1 };
        const severityValue = severityMap[d.severity] || 1;
        const radius = Math.sqrt(severityValue) * 15;
        console.log('🔍 [DEBUG] getRadius for threat:', radius);
        return radius;
      },
      getFillColor: d => {
        const color = getSeverityColor(d.severity);
        console.log('🔍 [DEBUG] getFillColor for threat:', color);
        return color;
      },
      getLineColor: [255, 255, 255],
      onClick: onThreatPointClick
    }));
  }

  // Crear capas de arcos de ataque
  if (limitedArcData && limitedArcData.length > 0) {
    layers.push(new ArcLayer({
      id: 'attack-arcs',
      data: limitedArcData,
      pickable: true,
      greatCircle: true,
      getSourcePosition: d => {
        console.log('🔍 [DEBUG] getSourcePosition for arc:', d.sourcePosition);
        return d.sourcePosition;
      },
      getTargetPosition: d => {
        console.log('🔍 [DEBUG] getTargetPosition for arc:', d.targetPosition);
        return d.targetPosition;
      },
      getWidth: d => {
        const width = Math.max(8, settings.arcWidth * (d.isContinent ? 4 : 2));
        console.log('🔍 [DEBUG] getWidth for arc:', width);
        return width;
      },
      getSourceColor: d => {
        const colors = d.colors || THREAT_TYPE_COLORS.default;
        console.log('🔍 [DEBUG] getSourceColor for arc:', colors.source);
        return colors.source;
      },
      getTargetColor: d => {
        const colors = d.colors || THREAT_TYPE_COLORS.default;
        console.log('🔍 [DEBUG] getTargetColor for arc:', colors.target);
        return colors.target;
      }
    }));
  }
    
    // Capa adicional de efectos de brillo para arcos críticos
    const criticalArcs = limitedArcData.filter(d => d.severity === 'critical');
    if (criticalArcs.length > 0 && settings.enableAnimations) {
      layers.push(new ArcLayer({
        id: 'critical-arc-glow',
        data: criticalArcs,
        pickable: false,
        greatCircle: true,
        getSourcePosition: d => d.sourcePosition,
        getTargetPosition: d => d.targetPosition,
        getWidth: d => {
          const baseWidth = settings.arcWidth * 3;
          const pulse = 1 + 0.3 * Math.sin(animationTime * 0.005);
          return baseWidth * pulse * (d.isContinent ? 2 : 1);
        },
        getSourceColor: d => {
          const colors = d.colors || THREAT_TYPE_COLORS.default;
          const alpha = 60 + 40 * Math.sin(animationTime * 0.005);
          return [colors.glow[0], colors.glow[1], colors.glow[2], alpha];
        },
        getTargetColor: d => {
          const colors = d.colors || THREAT_TYPE_COLORS.default;
          const alpha = 40 + 30 * Math.sin(animationTime * 0.005);
          return [colors.glow[0], colors.glow[1], colors.glow[2], alpha];
        },
        updateTriggers: {
          getWidth: animationTime,
          getSourceColor: animationTime,
          getTargetColor: animationTime
        }
      }));
    }

  // Agregar capas de heatmap si están habilitadas
  if (settings.enableHeatmap && heatmapLayers.size > 0) {
    heatmapLayers.forEach((layer, threatType) => {
      layers.push(layer);
    });
  }

  console.log(`Setting ${layers.length} layers on deck overlay`);
  
  // Validar que deckOverlay existe y está inicializado
  if (!deckOverlay) {
    console.error('DeckOverlay not initialized');
    return;
  }
  
  try {
    // Filtrar capas inválidas
    const validLayers = layers.filter(layer => {
      if (!layer || !layer.id) {
        console.warn('Invalid layer detected:', layer);
        return false;
      }
      return true;
    });
    
    console.log(`Applying ${validLayers.length} layers`);
    
    // Simplificar la actualización de capas para evitar errores
    try {
      deckOverlay.setProps({ 
        layers: validLayers
      });
    } catch (layerError) {
      console.warn('Error setting layers, trying with basic layers:', layerError.message);
      // Fallback con capas muy básicas
      const basicLayers = [];
      
      if (limitedThreatData && limitedThreatData.length > 0) {
        basicLayers.push(new ScatterplotLayer({
          id: 'basic-threat-points',
          data: limitedThreatData,
          getPosition: d => d.position,
          getRadius: 10,
          getFillColor: [255, 100, 100, 200],
          pickable: true
        }));
      }
      
      if (limitedArcData && limitedArcData.length > 0) {
        basicLayers.push(new ArcLayer({
          id: 'basic-arcs',
          data: limitedArcData,
          getSourcePosition: d => d.sourcePosition,
          getTargetPosition: d => d.targetPosition,
          getWidth: 2,
          getSourceColor: [255, 100, 100, 200],
          getTargetColor: [100, 100, 255, 200]
        }));
      }
      
      deckOverlay.setProps({ layers: basicLayers });
    }
    
    console.log('Layers updated successfully');
  } catch (error) {
    console.error('Error updating layers:', error);
    
    // Intentar con capas básicas completamente nuevas como fallback
    try {
      const safeLayers = [];
      
      // Crear solo una capa básica de puntos si hay datos de amenazas
      if (visibleThreatData && visibleThreatData.length > 0) {
        safeLayers.push(new ScatterplotLayer({
          id: 'safe-threat-points',
          data: visibleThreatData.slice(0, 100), // Limitar a 100 puntos
          pickable: true,
          opacity: 0.8,
          stroked: true,
          filled: true,
          radiusScale: 6,
          radiusMinPixels: 1,
          radiusMaxPixels: 100,
          lineWidthMinPixels: 1,
          getPosition: d => d.position,
          getRadius: d => {
            const severityMap = { critical: 4, high: 3, medium: 2, low: 1 };
            const severityValue = severityMap[d.severity] || 1;
            return Math.sqrt(severityValue) * 15;
          },
          getFillColor: d => getSeverityColor(d.severity),
          getLineColor: [255, 255, 255]
        }));
      }
      
      deckOverlay.setProps({ layers: safeLayers });
      console.log('Fallback to safe layers successful');
    } catch (fallbackError) {
      console.error('Safe fallback layer update also failed:', fallbackError);
      // Último recurso: limpiar todas las capas
      try {
        deckOverlay.setProps({ layers: [] });
        console.log('Cleared all layers as final fallback');
      } catch (clearError) {
        console.error('Failed to clear layers:', clearError);
      }
    }
  }
}

// Update layers with real-time animations
function updateLayersWithAnimations() {
  const layers = [];
  const settings = PERFORMANCE_SETTINGS[performanceMode];
  const animSettings = ANIMATION_SETTINGS['default'];
  
  // Limit data size based on performance mode
  const limitedThreatData = threatData.slice(0, settings.maxPoints);
  const limitedArcData = arcData.slice(0, settings.maxArcs);

  // Base threat points with pulsing effect
  const animatedThreatData = limitedThreatData.map(threat => {
    const pulseEffect = Math.sin(animationTime * 2) * 0.3 + 1;
    return {
      ...threat,
      animatedRadius: Math.sqrt(threat.count) * (performanceMode === 'low' ? 1.5 : 2) * pulseEffect,
      animatedOpacity: threat.severity === 'critical' ? 0.9 : 0.8
    };
  });

  // Main threat points layer
  layers.push(new ScatterplotLayer({
    id: 'threat-points-animated',
    data: animatedThreatData,
    pickable: true,
    opacity: 0.8,
    stroked: true,
    filled: true,
    radiusScale: settings.radiusScale,
    radiusMinPixels: 6,
    radiusMaxPixels: performanceMode === 'low' ? 20 : 30,
    lineWidthMinPixels: 1,
    getPosition: d => d.position,
    getRadius: d => d.animatedRadius,
    getFillColor: d => [...d.color, Math.floor(d.animatedOpacity * 255)],
    getLineColor: [255, 255, 255],
    onClick: onThreatPointClick,
    updateTriggers: {
      getRadius: animationTime,
      getFillColor: animationTime
    }
  }));

  // Pulse effects layer
  if (pulseData.length > 0) {
    const activePulses = pulseData.map(pulse => {
      const elapsed = animationTime - pulse.startTime;
      const progress = elapsed / pulse.duration;
      const radius = pulse.maxRadius * progress;
      const opacity = Math.max(0, (1 - progress) * pulse.intensity * 0.6);
      
      return {
        position: pulse.position,
        radius: radius,
        color: [...pulse.color, Math.floor(opacity * 255)]
      };
    }).filter(pulse => pulse.color[3] > 0);

    if (activePulses.length > 0) {
      layers.push(new ScatterplotLayer({
        id: 'pulse-effects',
        data: activePulses,
        pickable: false,
        opacity: 1,
        stroked: true,
        filled: false,
        radiusScale: 1,
        lineWidthMinPixels: 2,
        getPosition: d => d.position,
        getRadius: d => d.radius,
        getLineColor: d => d.color,
        updateTriggers: {
          getRadius: animationTime,
          getLineColor: animationTime
        }
      }));
    }
  }

  // Explosion particles layer
  if (explosionData.length > 0) {
    const activeParticles = [];
    explosionData.forEach(explosion => {
      const elapsed = animationTime - explosion.startTime;
      const progress = elapsed / explosion.duration;
      
      if (progress < 1) {
        explosion.particles.forEach(particle => {
          const currentPos = [
            particle.startPosition[0] + (particle.endPosition[0] - particle.startPosition[0]) * progress,
            particle.startPosition[1] + (particle.endPosition[1] - particle.startPosition[1]) * progress
          ];
          const opacity = Math.max(0, (1 - progress) * 0.8);
          
          activeParticles.push({
            position: currentPos,
            size: particle.size * (1 - progress * 0.5),
            color: [...explosion.color, Math.floor(opacity * 255)]
          });
        });
      }
    });

    if (activeParticles.length > 0) {
      layers.push(new ScatterplotLayer({
        id: 'explosion-particles',
        data: activeParticles,
        pickable: false,
        opacity: 1,
        stroked: false,
        filled: true,
        radiusScale: 1,
        getPosition: d => d.position,
        getRadius: d => d.size,
        getFillColor: d => d.color,
        updateTriggers: {
          getPosition: animationTime,
          getRadius: animationTime,
          getFillColor: animationTime
        }
      }));
    }
  }

  // Attack waves as animated arcs
  if (attackWaves.length > 0 && areArcsVisible) {
    const activeWaves = attackWaves.map(wave => {
      const elapsed = animationTime - wave.startTime;
      const progress = Math.min(elapsed / wave.duration, 1);
      const opacity = Math.max(0, (1 - progress) * 0.8);
      
      return {
        source: wave.source,
        target: wave.target,
        color: [...wave.color, Math.floor(opacity * 255)],
        width: wave.width * (1 + progress * 0.5)
      };
    }).filter(wave => wave.color[3] > 0);

    if (activeWaves.length > 0) {
      layers.push(new ArcLayer({
        id: 'attack-waves',
        data: activeWaves,
        pickable: false,
        getSourcePosition: d => d.source,
        getTargetPosition: d => d.target,
        getSourceColor: d => d.color,
        getTargetColor: d => d.color,
        getWidth: d => d.width,
        updateTriggers: {
          getSourceColor: animationTime,
          getTargetColor: animationTime,
          getWidth: animationTime
        }
      }));
    }
  }

  // Validate and clean layers before applying
  const validatedLayers = layers.map(layer => {
    // Remove problematic properties that can cause deck.gl errors
    const cleanLayer = { ...layer };
    const problematicProps = ['beforeId', '_beforeId', 'afterId', '_afterId', 'layerIndex', '_layerIndex'];
    problematicProps.forEach(prop => {
      if (cleanLayer.props && cleanLayer.props[prop] !== undefined) {
        delete cleanLayer.props[prop];
      }
    });
    return cleanLayer;
  });

  try {
    deckOverlay.setProps({ layers: validatedLayers });
  } catch (error) {
    console.error('Error updating animation layers:', error);
    // Fallback to basic layers without animations
    updateLayers();
  }
}

// Handle threat point clicks
async function onThreatPointClick(info) {
  if (info.object && info.coordinate) {
    showThreatPopup(info.object, info.coordinate);
  }
}

// Show threat information popup at click location
function showThreatPopup(threat, coordinate) {
  // Remove any existing popup
  const existingPopup = document.querySelector('.threat-popup');
  if (existingPopup) {
    existingPopup.remove();
  }

  // Get screen coordinates from map projection
  const point = map.project(coordinate);
  
  // Get country data from threat data
  const countryData = getCountryThreatData(threat.country || threat.region);
  
  // Create popup element
  const popup = document.createElement('div');
  popup.className = 'threat-popup';
  
  // Calculate position near the clicked point
  const popupWidth = 300; // Reduced width for better positioning
  const popupHeight = 240; // Further reduced height for compact design
  const margin = 20;
  
  // Get screen coordinates from map point
  const screenX = point.x;
  const screenY = point.y;
  
  // Calculate position near the click point with boundary checking
  let leftPosition = Math.max(margin, Math.min(screenX - popupWidth / 2, window.innerWidth - popupWidth - margin));
  let topPosition = Math.max(margin, screenY - popupHeight - 10); // Position above the click point
  
  // If the popup would go off the top, position below instead
  if (topPosition < margin) {
    topPosition = screenY + 20; // Position below the click point
  }
  
  popup.style.cssText = `
    position: absolute;
    left: ${leftPosition}px;
    top: ${topPosition}px;
    background: rgba(17, 24, 39, 0.95);
    color: white;
    border-radius: 8px;
    padding: 16px;
    backdrop-filter: blur(8px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
    z-index: 1000;
    min-width: 280px;
    max-width: 350px;
    font-family: 'Inter', sans-serif;
    font-size: 14px;
    pointer-events: auto;
  `;
  
  // Enriquecer datos con funciones auxiliares
  const enrichedData = getEnrichedThreatData(countryData, threat.country || threat.region);
  const apiBreakdown = getApiBreakdownData(countryData);
  const enrichedAttacks = getEnrichedRecentAttacks(countryData.recentAttacks);

  // Create compact popup content with essential information only
  const regionName = threat.country || threat.region;
  const continentNames = ['Africa', 'África', 'North America', 'Norte América', 'South America', 'Sudamérica', 'Europe', 'Europa', 'Asia', 'Oceania', 'Oceanía', 'Antarctica', 'Antártida'];
  const isContinent = threat.type === 'cluster' || !regionName || continentNames.includes(regionName);
  
  // DEBUG: Verificar qué nombre está llegando para África
  if (regionName && (regionName.includes('frica') || regionName.includes('frica'))) {
    console.log('DEBUG África - regionName:', regionName, 'isContinent:', isContinent, 'threat.type:', threat.type);
  }
  
  popup.innerHTML = `
    <div class="popup-header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
      <h3 style="color: #06b6d4; font-weight: 600; font-size: 14px; margin: 0;">
        ${isContinent ? '🌍' : getCountryFlag(regionName)} ${isContinent ? regionName : getFullCountryName(regionName)}
        <span style="color: #9ca3af; font-size: 11px; margin-left: 6px; font-weight: normal;">
          (${regionName || 'N/A'})
        </span>
      </h3>
      <button class="close-popup" style="background: none; border: none; color: #9ca3af; font-size: 16px; cursor: pointer; padding: 0; line-height: 1;">✕</button>
    </div>
    
    <div class="popup-content" style="space-y: 6px;">
      <!-- Métricas Principales Compactas -->
      <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 6px; margin-bottom: 8px;">
        <div style="background: rgba(6, 182, 212, 0.1); padding: 6px; border-radius: 4px; text-align: center;">
          <div style="font-size: 16px; margin-bottom: 2px;">📊</div>
          <div style="color: #fbbf24; font-weight: 600; font-size: 14px;">${enrichedData.totalThreats}</div>
          <div style="color: #9ca3af; font-size: 10px;">Total</div>
        </div>
        
        <div style="background: rgba(245, 158, 11, 0.1); padding: 6px; border-radius: 4px; text-align: center;">
          <div style="font-size: 16px; margin-bottom: 2px;">⚠️</div>
          <div style="color: ${getRiskColor(enrichedData.riskLevel)}; font-weight: 600; font-size: 12px; text-transform: uppercase;">${enrichedData.riskLevel}</div>
          <div style="color: #9ca3af; font-size: 10px;">Riesgo</div>
        </div>
        
        <div style="background: rgba(16, 185, 129, 0.1); padding: 6px; border-radius: 4px; text-align: center;">
          <div style="font-size: 16px; margin-bottom: 2px;">🎯</div>
          <div style="color: #10b981; font-weight: 600; font-size: 14px;">${enrichedData.confidence}%</div>
          <div style="color: #9ca3af; font-size: 10px;">Confianza</div>
        </div>
        
        <div style="background: rgba(139, 92, 246, 0.1); padding: 6px; border-radius: 4px; text-align: center;">
          <div style="font-size: 16px; margin-bottom: 2px;">👁️</div>
          <div style="color: #8b5cf6; font-weight: 600; font-size: 14px;">${enrichedData.detectionRate}%</div>
          <div style="color: #9ca3af; font-size: 10px;">Detección</div>
        </div>
      </div>

      <!-- Tipos de Amenazas Compactos -->
      <div style="margin-bottom: 6px;">
        <h4 style="color: #06b6d4; font-size: 12px; margin: 0 0 6px 0; font-weight: 600;">🎯 Tipos de Amenazas</h4>
        <div style="display: grid; gap: 4px;">
          ${enrichedData.breakdown.slice(0, 3).map(item => `
            <div style="display: flex; align-items: center; gap: 6px; padding: 4px; background: rgba(255, 255, 255, 0.05); border-radius: 3px;">
              <span style="font-size: 14px;">${getThreatTypeIcon(item.type)}</span>
              <span style="color: #d1d5db; font-size: 11px; flex: 1;">${item.type}</span>
              <div style="flex: 1; height: 3px; background: rgba(255, 255, 255, 0.1); border-radius: 2px; overflow: hidden;">
                <div style="height: 100%; background: ${getAttackTypeColor(item.type)}; width: ${item.percentage}%;"></div>
              </div>
              <span style="color: #fbbf24; font-weight: 600; font-size: 11px; min-width: 15px; text-align: right;">${item.count}</span>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Ataques Recientes Compactos -->
      ${enrichedAttacks.length > 0 ? `
        <div style="border-top: 1px solid rgba(255, 255, 255, 0.1); padding-top: 6px;">
          <h4 style="color: #06b6d4; font-size: 12px; margin: 0 0 6px 0; font-weight: 600;">⚡ Recientes</h4>
          <div style="display: grid; gap: 5px;">
            ${enrichedAttacks.slice(0, 2).map(attack => `
              <div style="padding: 5px; background: rgba(255, 255, 255, 0.05); border-radius: 4px; border-left: 2px solid ${getSeverityColor(attack.severity)};">
                <div style="display: flex; align-items: center; gap: 5px; margin-bottom: 3px;">
                  <span style="font-size: 14px;">${attack.icon}</span>
                  <span style="color: #fbbf24; font-weight: 600; font-size: 11px;">${attack.type}</span>
                  <span style="color: ${getSeverityColor(attack.severity)}; font-size: 10px; font-weight: 600; margin-left: auto;">${attack.severity}</span>
                </div>
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <span style="color: #d1d5db; font-size: 10px;">${attack.source}</span>
                  <span style="color: #9ca3af; font-size: 9px;">${attack.time}</span>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      ` : ''}

      <!-- Footer Compacto -->
      <div style="border-top: 1px solid rgba(255, 255, 255, 0.1); padding-top: 6px; margin-top: 6px;">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <span style="color: #9ca3af; font-size: 9px;">Actualizado: ${new Date().toLocaleTimeString('es-ES')}</span>
        </div>
      </div>
    </div>
  `;
  
  // Add popup to map container
  const mapContainer = document.getElementById('map-container');
  if (mapContainer) {
    mapContainer.appendChild(popup);
    
    // Add close functionality
    const closeBtn = popup.querySelector('.close-popup');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => popup.remove());
    }
    
    // Close popup when clicking outside
    setTimeout(() => {
      document.addEventListener('click', function closeOnOutside(e) {
        if (!popup.contains(e.target)) {
          popup.remove();
          document.removeEventListener('click', closeOnOutside);
        }
      });
    }, 100);
    
    // Auto-close after 10 seconds
    setTimeout(() => {
      if (popup.parentNode) {
        popup.remove();
      }
    }, 10000);
  }
}

// Get country threat data from global threat data
function getCountryThreatData(countryName) {
  const threatMapData = window.threatMapProps || {};
  const data = threatMapData.threatData;
  
  let totalThreats = 0;
  let breakdown = [];
  let recentAttacks = [];
  let riskLevel = 'bajo';
  
  // Handle undefined or null country name
  if (!countryName) {
    return {
      totalThreats,
      breakdown,
      recentAttacks,
      riskLevel
    };
  }
  
  if (data) {
    // Count threats from different sources
    let ransomwareCount = 0;
    let ddosCount = 0;
    let malwareCount = 0;
    let phishingCount = 0;
    let botnetCount = 0;
    let iocCount = 0;
    
    // Ransomware data
    if (data.ransomwatch?.rawData?.recentPosts) {
      ransomwareCount = data.ransomwatch.rawData.recentPosts.filter(post => 
        post.victim && post.victim.toLowerCase().includes(countryName.toLowerCase())
      ).length;
    }
    
    // DDoS data from Cloudflare
    if (data.cloudflare?.topAttackPairs) {
      ddosCount = data.cloudflare.topAttackPairs.filter(pair => 
        (pair.target_country && pair.target_country.toLowerCase().includes(countryName.toLowerCase())) ||
        (pair.destination && pair.destination.toLowerCase().includes(countryName.toLowerCase()))
      ).length;
    }
    
    // Malware data from URLhaus
    if (data.urlhaus?.count > 0) {
      malwareCount = data.urlhaus.count;
    }
    
    // ThreatFox IOC data
    if (data.threatfox?.countries) {
      const countryThreatFox = data.threatfox.countries.find(c => 
        c.country && c.country.toLowerCase().includes(countryName.toLowerCase())
      );
      if (countryThreatFox) {
        iocCount = countryThreatFox.count || 0;
      }
    }
    
    // FeodoTracker botnet data
    if (data.feodotracker?.countries) {
      const countryFeodo = data.feodotracker.countries.find(c => 
        c.country && c.country.toLowerCase().includes(countryName.toLowerCase())
      );
      if (countryFeodo) {
        botnetCount = countryFeodo.count || 0;
      }
    }
    
    // Phishing data from URLhaus - real phishing URLs
    if (data.urlhaus?.urls) {
      phishingCount = data.urlhaus.urls.filter(url => 
        url.url && (url.url.toLowerCase().includes('login') || 
                   url.url.toLowerCase().includes('account') ||
                   url.url.toLowerCase().includes('verify') ||
                   url.url.toLowerCase().includes('secure') ||
                   url.url.toLowerCase().includes('bank') ||
                   url.url.toLowerCase().includes('paypal') ||
                   url.threat === 'phishing')
      ).length;
    }
    
    totalThreats = ransomwareCount + ddosCount + malwareCount + phishingCount + botnetCount + iocCount;
    
    // Create breakdown
    breakdown = [
      { type: 'Ransomware', count: ransomwareCount, color: '#ef4444' },
      { type: 'DDoS', count: ddosCount, color: '#f59e0b' },
      { type: 'Malware', count: malwareCount, color: '#8b5cf6' },
      { type: 'IOCs', count: iocCount, color: '#10b981' },
      { type: 'Botnets', count: botnetCount, color: '#f97316' },
      { type: 'Phishing', count: phishingCount, color: '#06b6d4' }
    ].filter(item => item.count > 0);
    
    // Determine risk level
    if (totalThreats > 30) riskLevel = 'crítico';
    else if (totalThreats > 15) riskLevel = 'alto';
    else if (totalThreats > 8) riskLevel = 'medio';
    
    // Generate recent attacks with detailed real information
    if (data.ransomwatch?.rawData?.recentPosts) {
      data.ransomwatch.rawData.recentPosts.slice(0, 3).forEach(post => {
        if (post.victim && post.group_name) {
          recentAttacks.push({
            type: 'Ransomware',
            description: `${post.group_name || 'Grupo desconocido'} atacó a ${post.victim}`,
            time: post.discovered ? new Date(post.discovered).toLocaleDateString('es-ES') : 'Fecha reciente',
            severity: 'alta',
            source: 'RansomWatch'
          });
        }
      });
    }
    
    if (data.cloudflare?.topAttackPairs) {
      data.cloudflare.topAttackPairs.slice(0, 2).forEach(pair => {
        if (pair.target_country && pair.attacks > 100) {
          recentAttacks.push({
            type: 'DDoS',
            description: `${pair.attacks.toLocaleString()} ataques desde ${pair.source_country || 'origen desconocido'}`,
            time: 'Últimas 24h',
            severity: pair.attacks > 1000 ? 'crítica' : 'media',
            source: 'Cloudflare Radar'
          });
        }
      });
    }
    
    // ThreatFox recent threats with real IOC data
    if (data.threatfox?.recentThreats) {
      data.threatfox.recentThreats.slice(0, 3).forEach(threat => {
        if (threat.malware && threat.confidence_level > 70) {
          recentAttacks.push({
            type: 'IOC Malware',
            description: `${threat.malware} (${threat.confidence_level}% confianza) - ${threat.ioc_type || 'indicador'}`,
            time: threat.first_seen ? new Date(threat.first_seen).toLocaleDateString('es-ES') : 'Detectado recientemente',
            severity: threat.confidence_level > 90 ? 'alta' : 'media',
            source: 'ThreatFox'
          });
        }
      });
    }
    
    // FeodoTracker recent botnets with location data
    if (data.feodotracker?.recentBotnets) {
      data.feodotracker.recentBotnets.slice(0, 2).forEach(botnet => {
        if (botnet.malware && botnet.hostname) {
          recentAttacks.push({
            type: 'Botnet C2',
            description: `${botnet.malware} C2 en ${botnet.hostname} (${botnet.port || 'puerto desconocido'})`,
            time: botnet.first_seen ? new Date(botnet.first_seen).toLocaleDateString('es-ES') : 'Activo recientemente',
            severity: 'alta',
            source: 'FeodoTracker'
          });
        }
      });
    }
    
    // URLhaus recent malware URLs
    if (data.urlhaus?.urls) {
      const recentMalwareUrls = data.urlhaus.urls
        .filter(url => url.date_added && new Date(url.date_added) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000))
        .slice(0, 2);
      
      recentMalwareUrls.forEach(url => {
        recentAttacks.push({
          type: 'Malware URL',
          description: `URL maliciosa: ${url.url?.substring(0, 40)}...`,
          time: url.date_added ? new Date(url.date_added).toLocaleDateString('es-ES') : 'Agregada recientemente',
          severity: url.threat === 'malware_download' ? 'alta' : 'media',
          source: 'URLhaus'
        });
      });
    }
  }
  
  return {
    totalThreats,
    breakdown,
    recentAttacks,
    riskLevel
  };
}

// Get country flag emoji
function getCountryFlag(countryName) {
  const flags = {
    'United States': '🇺🇸', 'USA': '🇺🇸', 'US': '🇺🇸',
    'China': '🇨🇳', 'CN': '🇨🇳',
    'Russia': '🇷🇺', 'RU': '🇷🇺',
    'Germany': '🇩🇪', 'DE': '🇩🇪',
    'United Kingdom': '🇬🇧', 'UK': '🇬🇧', 'GB': '🇬🇧',
    'France': '🇫🇷', 'FR': '🇫🇷',
    'Japan': '🇯🇵', 'JP': '🇯🇵',
    'Brazil': '🇧🇷', 'BR': '🇧🇷',
    'India': '🇮🇳', 'IN': '🇮🇳',
    'Canada': '🇨🇦', 'CA': '🇨🇦',
    'Spain': '🇪🇸', 'ES': '🇪🇸',
    'Italy': '🇮🇹', 'IT': '🇮🇹',
    'Netherlands': '🇳🇱', 'NL': '🇳🇱',
    'Australia': '🇦🇺', 'AU': '🇦🇺',
    'South Korea': '🇰🇷', 'KR': '🇰🇷'
  };
  return flags[countryName] || flags[countryName?.toUpperCase()] || '🌍';
}

// Get risk level color
function getRiskColor(riskLevel) {
  const colors = {
    'crítico': '#ef4444',
    'alto': '#f59e0b',
    'medio': '#eab308',
    'bajo': '#10b981'
  };
  return colors[riskLevel] || '#10b981';
}

// Set up event listeners
function setupEventListeners() {
  // Close panel
  const closeBtn = document.getElementById('close-panel');
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      const panel = document.getElementById('threat-info-panel');
      if (panel) {
        panel.classList.add('hidden');
        panel.style.display = 'none';
        // Remove event details if they exist
        const eventDetails = panel.querySelector('.event-details');
        if (eventDetails) {
          eventDetails.remove();
        }
      }
    });
  }

  // Enhanced touch interactions for map
  if (map && map.getCanvas) {
    const canvas = map.getCanvas();
    
    // Touch feedback
    canvas.addEventListener('touchstart', (e) => {
      // Haptic feedback for touch start
      if (navigator.vibrate) {
        navigator.vibrate(10);
      }
      
      // Visual feedback
      canvas.style.filter = 'brightness(1.1)';
      
      // Prevent default to avoid conflicts
      if (e.touches.length > 1) {
        e.preventDefault();
      }
    }, { passive: false });

    canvas.addEventListener('touchend', (e) => {
      // Reset visual feedback
      canvas.style.filter = 'brightness(1)';
      
      // Stronger haptic for successful interaction
      if (navigator.vibrate && e.changedTouches.length === 1) {
        navigator.vibrate(20);
      }
    });

    // Enhanced gesture handling
    let lastTouchDistance = 0;
    let lastTouchCenter = null;
    
    canvas.addEventListener('touchmove', (e) => {
      if (e.touches.length === 2) {
        // Two-finger gestures
        const touch1 = e.touches[0];
        const touch2 = e.touches[1];
        
        const distance = Math.sqrt(
          Math.pow(touch2.clientX - touch1.clientX, 2) + 
          Math.pow(touch2.clientY - touch1.clientY, 2)
        );
        
        const center = {
          x: (touch1.clientX + touch2.clientX) / 2,
          y: (touch1.clientY + touch2.clientY) / 2
        };
        
        // Zoom gesture detection
        if (lastTouchDistance > 0) {
          const zoomDelta = distance - lastTouchDistance;
          if (Math.abs(zoomDelta) > 5) {
            // Haptic feedback for zoom
            if (navigator.vibrate) {
              navigator.vibrate(5);
            }
          }
        }
        
        lastTouchDistance = distance;
        lastTouchCenter = center;
      } else {
        lastTouchDistance = 0;
        lastTouchCenter = null;
      }
    }, { passive: true });

    // Long press detection for context menu
    let touchTimer = null;
    let touchStartPos = null;
    
    canvas.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        touchStartPos = {
          x: e.touches[0].clientX,
          y: e.touches[0].clientY
        };
        
        touchTimer = setTimeout(() => {
          // Long press detected
          if (navigator.vibrate) {
            navigator.vibrate([50, 50, 50]);
          }
          
          // Trigger context menu or special action
          const event = new CustomEvent('mapLongPress', {
            detail: {
              x: touchStartPos.x,
              y: touchStartPos.y,
              lngLat: map.unproject([touchStartPos.x, touchStartPos.y])
            }
          });
          canvas.dispatchEvent(event);
        }, 800);
      }
    });
    
    canvas.addEventListener('touchmove', (e) => {
      if (touchTimer && touchStartPos) {
        const currentPos = {
          x: e.touches[0].clientX,
          y: e.touches[0].clientY
        };
        
        const distance = Math.sqrt(
          Math.pow(currentPos.x - touchStartPos.x, 2) + 
          Math.pow(currentPos.y - touchStartPos.y, 2)
        );
        
        // Cancel long press if moved too much
        if (distance > 10) {
          clearTimeout(touchTimer);
          touchTimer = null;
        }
      }
    });
    
    canvas.addEventListener('touchend', () => {
      if (touchTimer) {
        clearTimeout(touchTimer);
        touchTimer = null;
      }
      touchStartPos = null;
    });

    // Double tap to zoom
    let lastTap = 0;
    canvas.addEventListener('touchend', (e) => {
      if (e.changedTouches.length === 1) {
        const currentTime = new Date().getTime();
        const tapLength = currentTime - lastTap;
        
        if (tapLength < 500 && tapLength > 0) {
          // Double tap detected
          if (navigator.vibrate) {
            navigator.vibrate(30);
          }
          
          const touch = e.changedTouches[0];
          const lngLat = map.unproject([touch.clientX, touch.clientY]);
          
          map.easeTo({
            center: lngLat,
            zoom: map.getZoom() + 1,
            duration: 300
          });
          
          e.preventDefault();
        }
        lastTap = currentTime;
      }
    });
  }
}

// Animation functions
function startAnimationLoop() {
  if (!isAnimationActive) return;
  
  function animate() {
    // Ensure performanceMode is valid
    if (!performanceMode || !PERFORMANCE_SETTINGS[performanceMode]) {
    performanceMode = 'default';
  }
    
    animationTime += 0.016 * animationSpeed; // ~60fps
    
    // Generate new attack animations
    generateAttackAnimations();
    
    // Update animation data
    updateAnimations();
    
    // Always update layers with animations (force enable for attack arcs)
    console.log('Animation frame:', animationTime.toFixed(2), 'attackWaves:', attackWaves.length, 'performanceMode:', performanceMode);
    updateLayersWithAnimations();
    
    animationFrame = requestAnimationFrame(animate);
  }
  
  animate();
}

function stopAnimationLoop() {
  isAnimationActive = false;
  if (animationFrame) {
    cancelAnimationFrame(animationFrame);
    animationFrame = null;
  }
}

// Generate random attack animations
  function generateAttackAnimations() {
    // Ensure performanceMode is valid
    if (!performanceMode || !PERFORMANCE_SETTINGS[performanceMode]) {
    performanceMode = 'default';
  }
    
    const settings = PERFORMANCE_SETTINGS[performanceMode];
  
  // Generate pulse effects on threat points
  if (Math.random() < 0.1 && pulseData.length < settings.maxPulses) {
    const threat = threatData[Math.floor(Math.random() * threatData.length)];
    if (threat) {
      pulseData.push({
        position: threat.position,
        startTime: animationTime,
        duration: 2 + Math.random() * 2,
        maxRadius: 50 + Math.random() * 100,
        color: threat.color,
        intensity: threat.severity === 'critical' ? 1 : threat.severity === 'high' ? 0.8 : 0.6
      });
    }
  }
  
  // Generate explosion effects for critical threats
  if (Math.random() < 0.05 && explosionData.length < settings.maxExplosions) {
    const criticalThreats = threatData.filter(t => t.severity === 'critical');
    if (criticalThreats.length > 0) {
      const threat = criticalThreats[Math.floor(Math.random() * criticalThreats.length)];
      explosionData.push({
        position: threat.position,
        startTime: animationTime,
        duration: 1.5,
        particles: generateExplosionParticles(threat.position, settings.particleCount),
        color: [255, 100, 100]
      });
    }
  }
  
  // Generate attack wave animations
  if (Math.random() < 0.08 && attackWaves.length < settings.maxWaves) {
    const sourceIndex = Math.floor(Math.random() * threatData.length);
    const targetIndex = Math.floor(Math.random() * threatData.length);
    
    if (sourceIndex !== targetIndex && threatData[sourceIndex] && threatData[targetIndex]) {
      attackWaves.push({
        sourcePosition: threatData[sourceIndex].position,
        targetPosition: threatData[targetIndex].position,
        startTime: animationTime,
        duration: 3 + Math.random() * 2,
        type: threatData[sourceIndex].type,
        color: threatData[sourceIndex].color
      });
    }
  }
}

// Generate explosion particles
function generateExplosionParticles(center, count) {
  const particles = [];
  for (let i = 0; i < count; i++) {
    const angle = (Math.PI * 2 * i) / count;
    const distance = 0.5 + Math.random() * 2;
    particles.push({
      startPosition: center,
      endPosition: [
        center[0] + Math.cos(angle) * distance,
        center[1] + Math.sin(angle) * distance
      ],
      size: 2 + Math.random() * 4
    });
  }
  return particles;
}

// Update all animations con mejoras de rendimiento y optimizaciones LOD
let lastAnimationUpdate = 0;
let lastAnimationGeneration = 0;

function updateAnimations() {
  const currentTime = Date.now();
  const deltaTime = Math.min(currentTime - animationTime, 50); // Limit delta to prevent large jumps
  animationTime = currentTime;
  
  const settings = PERFORMANCE_SETTINGS[performanceMode];
  const animSettings = ANIMATION_SETTINGS['default'];
  
  // Reduce update frequency for better performance
  if (currentTime - lastAnimationUpdate < settings.updateInterval) {
    return;
  }
  lastAnimationUpdate = currentTime;
  
  // Solo generar nuevas animaciones si están habilitadas y con control de frecuencia
  if (settings?.enableAnimations && currentTime - lastAnimationGeneration > (animSettings.generationInterval || 1000)) {
    generateAttackAnimations();
    lastAnimationGeneration = currentTime;
  }
  
  // Update and clean up pulse data con interpolación suave e instancing
  if (settings.instancedRendering && pulseData.length > 10) {
    // Group similar pulses for instanced rendering
    const pulseGroups = new Map();
    pulseData.forEach(pulse => {
      const key = `${pulse.type || 'default'}_${Math.floor((pulse.maxRadius || 10) / 5)}`;
      if (!pulseGroups.has(key)) {
        pulseGroups.set(key, []);
      }
      pulseGroups.get(key).push(pulse);
    });
    instancedParticles.set('pulses', pulseGroups);
  }
  
  pulseData = pulseData.filter(pulse => {
    const elapsed = animationTime - pulse.startTime;
    if (elapsed < pulse.duration) {
      // Calcular progreso de animación con easing
      pulse.progress = elapsed / pulse.duration;
      pulse.currentRadius = pulse.maxRadius * easeOutQuart(pulse.progress);
      pulse.currentAlpha = pulse.intensity * (1 - easeInQuart(pulse.progress));
      
      // Apply LOD culling for distant pulses
      if (settings.adaptiveLOD && viewportBounds && pulse.position) {
        const distance = calculateDistance(pulse.position, [viewportBounds.centerLng, viewportBounds.centerLat]);
        if (distance > settings.lodDistance) {
          // Skip updating distant pulses in low performance modes
          if (performanceMode === 'low' || performanceMode === 'potato') {
            return elapsed < pulse.duration * 0.5; // Reduce lifespan for distant pulses
          }
        }
      }
      
      return true;
    }
    return false;
  });
  
  // Update and clean up explosion data with LOD optimization
  explosionData = explosionData.filter(explosion => {
    const elapsed = animationTime - explosion.startTime;
    if (elapsed < explosion.duration) {
      explosion.progress = elapsed / explosion.duration;
      
      // Apply LOD to particle count based on distance
      if (settings.adaptiveLOD && viewportBounds && explosion.center) {
        const distance = calculateDistance(explosion.center, [viewportBounds.centerLng, viewportBounds.centerLat]);
        const lodLevel = calculateLODLevel(explosion.center, [viewportBounds.centerLng, viewportBounds.centerLat], currentZoomLevel);
        
        if (lodLevel > 2 && explosion.particles) {
          // Reduce particle count for distant explosions
          explosion.particles = explosion.particles.filter((_, index) => index % (lodLevel - 1) === 0);
        }
      }
      
      return true;
    }
    return false;
  });
  
  // Update and clean up attack waves con animación fluida y optimización de distancia
  attackWaves = attackWaves.filter(wave => {
    const elapsed = animationTime - wave.startTime;
    if (elapsed < wave.duration) {
      wave.progress = elapsed / wave.duration;
      
      // Optimizar interpolación basada en distancia y modo de rendimiento
      if (performanceMode === 'low' || performanceMode === 'potato') {
        if (viewportBounds && wave.sourcePosition && wave.targetPosition) {
          const waveDistance = Math.min(
            calculateDistance(wave.sourcePosition, [viewportBounds.centerLng, viewportBounds.centerLat]),
            calculateDistance(wave.targetPosition, [viewportBounds.centerLng, viewportBounds.centerLat])
          );
          
          if (waveDistance > settings.lodDistance) {
            // Use simplified linear interpolation for distant waves
            wave.currentPosition = [
              wave.sourcePosition[0] + (wave.targetPosition[0] - wave.sourcePosition[0]) * wave.progress,
              wave.sourcePosition[1] + (wave.targetPosition[1] - wave.sourcePosition[1]) * wave.progress
            ];
          } else {
            // Use full interpolation for nearby waves
            wave.currentPosition = interpolateArcPosition(
              wave.sourcePosition, 
              wave.targetPosition, 
              easeInOutCubic(wave.progress)
            );
          }
        }
      } else {
        // Full quality interpolation for high performance modes
        wave.currentPosition = interpolateArcPosition(
          wave.sourcePosition, 
          wave.targetPosition, 
          easeInOutCubic(wave.progress)
        );
      }
      
      return true;
    }
    return false;
  });
  
  // Cleanup instanced particles cache periodically
  if (animationTime % 1000 === 0) {
    instancedParticles.clear();
  }
}

// Advanced WebGL optimization functions
function optimizeShaderPerformance() {
  const settings = PERFORMANCE_SETTINGS[performanceMode];
  
  // Shader optimization based on performance mode
  const shaderOptimizations = {
    high: {
      precision: 'highp',
      enableShadows: true,
      enableReflections: true,
      maxLights: 8
    },
    medium: {
      precision: 'mediump',
      enableShadows: true,
      enableReflections: false,
      maxLights: 4
    },
    low: {
      precision: 'mediump',
      enableShadows: false,
      enableReflections: false,
      maxLights: 2
    },
    potato: {
      precision: 'lowp',
      enableShadows: false,
      enableReflections: false,
      maxLights: 1
    }
  };
  
  return shaderOptimizations[performanceMode] || shaderOptimizations.medium;
}

// Memory management and buffer optimization
function optimizeBufferUsage() {
  const settings = PERFORMANCE_SETTINGS[performanceMode];
  
  // Buffer pool management
  if (!window.bufferPool) {
    window.bufferPool = {
      vertex: [],
      index: [],
      texture: []
    };
  }
  
  // Cleanup unused buffers based on performance mode
  const maxBuffers = {
    high: 100,
    medium: 50,
    low: 25,
    potato: 10
  };
  
  Object.keys(window.bufferPool).forEach(type => {
    const pool = window.bufferPool[type];
    const limit = maxBuffers[performanceMode] || 50;
    
    if (pool.length > limit) {
      // Remove oldest buffers
      pool.splice(0, pool.length - limit);
    }
  });
  
  // Texture compression and mipmap optimization
  if (settings.textureCompression) {
    // Enable texture compression for better memory usage
    return {
      textureFormat: performanceMode === 'potato' ? 'RGB565' : 'RGBA8',
      generateMipmaps: performanceMode !== 'potato',
      anisotropicFiltering: performanceMode === 'high' ? 16 : (performanceMode === 'medium' ? 4 : 1)
    };
  }
  
  return {
    textureFormat: 'RGBA8',
    generateMipmaps: true,
    anisotropicFiltering: 1
  };
}

// GPU memory monitoring and optimization
function monitorGPUMemory() {
  if (!window.gpuMemoryInfo) {
    window.gpuMemoryInfo = {
      totalMemory: 0,
      usedMemory: 0,
      availableMemory: 0,
      lastCheck: 0
    };
  }
  
  const now = Date.now();
  if (now - window.gpuMemoryInfo.lastCheck < 5000) {
    return window.gpuMemoryInfo; // Check every 5 seconds
  }
  
  // Try to get WebGL memory info if available
  if (window.deckgl && window.deckgl.gl) {
    const gl = window.deckgl.gl;
    const ext = gl.getExtension('WEBGL_debug_renderer_info');
    
    if (ext) {
      const renderer = gl.getParameter(ext.UNMASKED_RENDERER_WEBGL);
      
      // Estimate memory based on renderer info
      if (renderer.includes('GTX') || renderer.includes('RTX')) {
        window.gpuMemoryInfo.totalMemory = 8 * 1024 * 1024 * 1024; // 8GB estimate
      } else if (renderer.includes('Intel')) {
        window.gpuMemoryInfo.totalMemory = 2 * 1024 * 1024 * 1024; // 2GB estimate
      } else {
        window.gpuMemoryInfo.totalMemory = 4 * 1024 * 1024 * 1024; // 4GB default
      }
    }
  }
  
  window.gpuMemoryInfo.lastCheck = now;
  return window.gpuMemoryInfo;
}

// Adaptive quality adjustment based on performance
function adaptiveQualityAdjustment() {
  const currentFPS = window.fpsMonitor?.getCurrentFPS() || 60;
  const targetFPS = PERFORMANCE_SETTINGS[performanceMode]?.targetFPS || 30;
  
  // Auto-adjust performance mode based on FPS
  if (currentFPS < targetFPS * 0.8) {
    // Performance is poor, consider downgrading
    const modes = ['high', 'medium', 'low', 'potato'];
    const currentIndex = modes.indexOf(performanceMode);
    
    if (currentIndex < modes.length - 1) {
      const newMode = modes[currentIndex + 1];
      console.log(`Auto-adjusting performance mode from ${performanceMode} to ${newMode} (FPS: ${currentFPS})`);
      performanceMode = newMode;
      
      // Trigger layer update with new settings
      if (window.updateLayers) {
        window.updateLayers();
      }
    }
  } else if (currentFPS > targetFPS * 1.2 && performanceMode !== 'high') {
    // Performance is good, consider upgrading
    const modes = ['potato', 'low', 'medium', 'high'];
    const currentIndex = modes.indexOf(performanceMode);
    
    if (currentIndex < modes.length - 1) {
      const newMode = modes[currentIndex + 1];
      console.log(`Auto-upgrading performance mode from ${performanceMode} to ${newMode} (FPS: ${currentFPS})`);
      performanceMode = newMode;
      
      // Trigger layer update with new settings
      if (window.updateLayers) {
        window.updateLayers();
      }
    }
  }
  
  return {
    currentFPS,
    targetFPS,
    performanceMode,
    memoryInfo: monitorGPUMemory()
  };
}

// Advanced Map Interactions System

// Country-specific zoom functionality
const COUNTRY_COORDINATES = {
  'US': { center: [-95.7129, 37.0902], zoom: 4 },
  'CN': { center: [104.1954, 35.8617], zoom: 4 },
  'RU': { center: [105.3188, 61.5240], zoom: 3 },
  'BR': { center: [-51.9253, -14.2350], zoom: 4 },
  'IN': { center: [78.9629, 20.5937], zoom: 4 },
  'DE': { center: [10.4515, 51.1657], zoom: 6 },
  'GB': { center: [-3.4360, 55.3781], zoom: 6 },
  'FR': { center: [2.2137, 46.2276], zoom: 6 },
  'JP': { center: [138.2529, 36.2048], zoom: 5 },
  'AU': { center: [133.7751, -25.2744], zoom: 4 },
  'CA': { center: [-106.3468, 56.1304], zoom: 3 },
  'MX': { center: [-102.5528, 23.6345], zoom: 5 }
};

// Smooth zoom to country with cinematic transition
function zoomToCountry(countryCode, duration = 2000) {
  const country = COUNTRY_COORDINATES[countryCode.toUpperCase()];
  if (!country || !window.deckgl) {
    console.warn(`Country ${countryCode} not found or map not initialized`);
    return;
  }
  
  const currentViewState = window.deckgl.viewState;
  const targetViewState = {
    longitude: country.center[0],
    latitude: country.center[1],
    zoom: country.zoom,
    pitch: 45,
    bearing: 0
  };
  
  // Cinematic transition with easing
  animateViewState(currentViewState, targetViewState, duration);
  
  // Update threat clustering for the new region
  setTimeout(() => {
    updateThreatClustering(countryCode);
  }, duration / 2);
}

// Cinematic camera animation
function animateViewState(from, to, duration) {
  const startTime = Date.now();
  
  function animate() {
    const elapsed = Date.now() - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    // Use easeInOutCubic for smooth cinematic movement
    const easedProgress = easeInOutCubic(progress);
    
    const currentViewState = {
      longitude: from.longitude + (to.longitude - from.longitude) * easedProgress,
      latitude: from.latitude + (to.latitude - from.latitude) * easedProgress,
      zoom: from.zoom + (to.zoom - from.zoom) * easedProgress,
      pitch: (from.pitch || 0) + ((to.pitch || 0) - (from.pitch || 0)) * easedProgress,
      bearing: (from.bearing || 0) + ((to.bearing || 0) - (from.bearing || 0)) * easedProgress
    };
    
    if (window.deckgl) {
      window.deckgl.setProps({ viewState: currentViewState });
    }
    
    if (progress < 1) {
      requestAnimationFrame(animate);
    }
  }
  
  animate();
}

// Dynamic threat clustering system
let threatClusters = new Map();
let clusterUpdateInterval = null;

function initializeThreatClustering() {
  // Initialize clustering with different algorithms based on zoom level
  const clusterSettings = {
    minZoom: 2,
    maxZoom: 12,
    clusterRadius: {
      2: 100,   // Large clusters for world view
      4: 80,    // Medium clusters for continent view
      6: 60,    // Smaller clusters for country view
      8: 40,    // Fine clusters for region view
      10: 20,   // Very fine clusters for city view
      12: 10    // Individual threats for street view
    },
    minPoints: {
      2: 10,
      4: 5,
      6: 3,
      8: 2,
      10: 1,
      12: 1
    }
  };
  
  return clusterSettings;
}

function updateThreatClustering(region = null) {
  if (!threatData || threatData.length === 0) {
    return;
  }
  
  const currentZoom = window.deckgl?.viewState?.zoom || 4;
  const clusterSettings = initializeThreatClustering();
  
  // Filter data by region if specified
  let dataToCluster = threatData;
  if (region) {
    dataToCluster = threatData.filter(threat => 
      threat.source_country === region || threat.target_country === region
    );
  }
  
  // Apply viewport filtering for performance
  if (viewportBounds) {
    dataToCluster = dataToCluster.filter(threat => {
      const sourceLng = threat.source_longitude;
      const sourceLat = threat.source_latitude;
      const targetLng = threat.target_longitude;
      const targetLat = threat.target_latitude;
      
      return (
        (sourceLng >= viewportBounds.west && sourceLng <= viewportBounds.east &&
         sourceLat >= viewportBounds.south && sourceLat <= viewportBounds.north) ||
        (targetLng >= viewportBounds.west && targetLng <= viewportBounds.east &&
         targetLat >= viewportBounds.south && targetLat <= viewportBounds.north)
      );
    });
  }
  
  // Determine cluster radius based on zoom level
  const zoomLevel = Math.floor(currentZoom);
  const clusterRadius = clusterSettings.clusterRadius[zoomLevel] || 50;
  const minPoints = clusterSettings.minPoints[zoomLevel] || 2;
  
  // Perform clustering using spatial grid
  threatClusters = performSpatialClustering(dataToCluster, clusterRadius, minPoints);
  
  // Update visualization layers
  if (window.updateLayers) {
    window.updateLayers();
  }
}

function performSpatialClustering(data, radius, minPoints) {
  const clusters = new Map();
  const gridSize = radius / 111320; // Convert meters to degrees (approximate)
  
  // Create spatial grid
  const grid = new Map();
  
  data.forEach((threat, index) => {
    // Cluster both source and target points
    const points = [
      { lng: threat.source_longitude, lat: threat.source_latitude, type: 'source', threat },
      { lng: threat.target_longitude, lat: threat.target_latitude, type: 'target', threat }
    ];
    
    points.forEach(point => {
      const gridX = Math.floor(point.lng / gridSize);
      const gridY = Math.floor(point.lat / gridSize);
      const gridKey = `${gridX},${gridY}`;
      
      if (!grid.has(gridKey)) {
        grid.set(gridKey, []);
      }
      
      grid.get(gridKey).push({
        ...point,
        index,
        severity: threat.severity || 1
      });
    });
  });
  
  // Generate clusters from grid cells
  let clusterId = 0;
  grid.forEach((points, gridKey) => {
    if (points.length >= minPoints) {
      const cluster = {
        id: clusterId++,
        center: calculateClusterCenter(points),
        points: points,
        totalSeverity: points.reduce((sum, p) => sum + p.severity, 0),
        threatCount: points.length,
        dominantType: getDominantThreatType(points)
      };
      
      clusters.set(cluster.id, cluster);
    }
  });
  
  return clusters;
}

function calculateClusterCenter(points) {
  const totalWeight = points.reduce((sum, p) => sum + p.severity, 0);
  
  const weightedLng = points.reduce((sum, p) => sum + (p.lng * p.severity), 0) / totalWeight;
  const weightedLat = points.reduce((sum, p) => sum + (p.lat * p.severity), 0) / totalWeight;
  
  return [weightedLng, weightedLat];
}

function getDominantThreatType(points) {
  const typeCount = {};
  points.forEach(p => {
    const type = p.threat.attack_type || 'unknown';
    typeCount[type] = (typeCount[type] || 0) + p.severity;
  });
  
  return Object.keys(typeCount).reduce((a, b) => 
    typeCount[a] > typeCount[b] ? a : b
  );
}

// Mini-map navigation system
let miniMapInstance = null;
let miniMapContainer = null;

function initializeMiniMap() {
  // Create mini-map container if it doesn't exist
  if (!miniMapContainer) {
    miniMapContainer = document.createElement('div');
    miniMapContainer.id = 'mini-map-container';
    miniMapContainer.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      width: 200px;
      height: 150px;
      background: rgba(0, 0, 0, 0.8);
      border: 2px solid #00ff88;
      border-radius: 8px;
      z-index: 1000;
      overflow: hidden;
      transition: all 0.3s ease;
      cursor: pointer;
    `;
    
    // Add mini-map canvas
    const miniMapCanvas = document.createElement('canvas');
    miniMapCanvas.id = 'mini-map-canvas';
    miniMapCanvas.width = 200;
    miniMapCanvas.height = 150;
    miniMapCanvas.style.cssText = 'width: 100%; height: 100%;';
    
    miniMapContainer.appendChild(miniMapCanvas);
    document.body.appendChild(miniMapContainer);
    
    // Add click handler for mini-map navigation
    miniMapContainer.addEventListener('click', handleMiniMapClick);
    
    // Add hover effects
    miniMapContainer.addEventListener('mouseenter', () => {
      miniMapContainer.style.transform = 'scale(1.1)';
      miniMapContainer.style.boxShadow = '0 0 20px rgba(0, 255, 136, 0.5)';
    });
    
    miniMapContainer.addEventListener('mouseleave', () => {
      miniMapContainer.style.transform = 'scale(1)';
      miniMapContainer.style.boxShadow = 'none';
    });
  }
  
  // Initialize mini-map rendering
  renderMiniMap();
  
  // Update mini-map periodically
  setInterval(renderMiniMap, 2000);
}

function renderMiniMap() {
  const canvas = document.getElementById('mini-map-canvas');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  const width = canvas.width;
  const height = canvas.height;
  
  // Clear canvas
  ctx.fillStyle = 'rgba(0, 20, 40, 0.9)';
  ctx.fillRect(0, 0, width, height);
  
  // Draw world outline
  ctx.strokeStyle = '#00ff88';
  ctx.lineWidth = 1;
  ctx.strokeRect(10, 10, width - 20, height - 20);
  
  // Draw current viewport indicator
  if (window.deckgl && window.deckgl.viewState) {
    const viewState = window.deckgl.viewState;
    
    // Calculate viewport bounds on mini-map
    const mapBounds = {
      west: -180,
      east: 180,
      north: 85,
      south: -85
    };
    
    const viewportSize = getViewportSizeFromZoom(viewState.zoom);
    const viewportBounds = {
      west: Math.max(viewState.longitude - viewportSize / 2, mapBounds.west),
      east: Math.min(viewState.longitude + viewportSize / 2, mapBounds.east),
      north: Math.min(viewState.latitude + viewportSize / 2, mapBounds.north),
      south: Math.max(viewState.latitude - viewportSize / 2, mapBounds.south)
    };
    
    // Convert to mini-map coordinates
    const miniMapBounds = {
      x: 10,
      y: 10,
      width: width - 20,
      height: height - 20
    };
    
    const viewportRect = {
      x: miniMapBounds.x + ((viewportBounds.west - mapBounds.west) / (mapBounds.east - mapBounds.west)) * miniMapBounds.width,
      y: miniMapBounds.y + ((mapBounds.north - viewportBounds.north) / (mapBounds.north - mapBounds.south)) * miniMapBounds.height,
      width: ((viewportBounds.east - viewportBounds.west) / (mapBounds.east - mapBounds.west)) * miniMapBounds.width,
      height: ((viewportBounds.north - viewportBounds.south) / (mapBounds.north - mapBounds.south)) * miniMapBounds.height
    };
    
    // Draw viewport rectangle
    ctx.fillStyle = 'rgba(0, 255, 136, 0.3)';
    ctx.fillRect(viewportRect.x, viewportRect.y, viewportRect.width, viewportRect.height);
    
    ctx.strokeStyle = '#00ff88';
    ctx.lineWidth = 2;
    ctx.strokeRect(viewportRect.x, viewportRect.y, viewportRect.width, viewportRect.height);
  }
  
  // Draw threat hotspots
  if (threatData && threatData.length > 0) {
    const hotspots = calculateThreatHotspots();
    
    hotspots.forEach(hotspot => {
      const x = 10 + ((hotspot.lng + 180) / 360) * (width - 20);
      const y = 10 + ((85 - hotspot.lat) / 170) * (height - 20);
      
      const intensity = Math.min(hotspot.intensity / 100, 1);
      const radius = 2 + intensity * 4;
      
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, 2 * Math.PI);
      ctx.fillStyle = `rgba(255, ${Math.floor(100 - intensity * 100)}, 0, ${0.6 + intensity * 0.4})`;
      ctx.fill();
    });
  }
}

function getViewportSizeFromZoom(zoom) {
  // Approximate viewport size in degrees based on zoom level
  return 360 / Math.pow(2, zoom);
}

function calculateThreatHotspots() {
  if (!threatData) return [];
  
  const gridSize = 10; // degrees
  const grid = new Map();
  
  threatData.forEach(threat => {
    const points = [
      { lng: threat.source_longitude, lat: threat.source_latitude },
      { lng: threat.target_longitude, lat: threat.target_latitude }
    ];
    
    points.forEach(point => {
      const gridX = Math.floor(point.lng / gridSize) * gridSize;
      const gridY = Math.floor(point.lat / gridSize) * gridSize;
      const key = `${gridX},${gridY}`;
      
      if (!grid.has(key)) {
        grid.set(key, { lng: gridX + gridSize/2, lat: gridY + gridSize/2, intensity: 0 });
      }
      
      grid.get(key).intensity += threat.severity || 1;
    });
  });
  
  return Array.from(grid.values()).filter(hotspot => hotspot.intensity > 5);
}

function handleMiniMapClick(event) {
  const rect = miniMapContainer.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  
  // Convert click coordinates to world coordinates
  const lng = ((x - 10) / (rect.width - 20)) * 360 - 180;
  const lat = 85 - ((y - 10) / (rect.height - 20)) * 170;
  
  // Animate to clicked location
  if (window.deckgl) {
    const currentViewState = window.deckgl.viewState;
    const targetViewState = {
      ...currentViewState,
      longitude: lng,
      latitude: lat
    };
    
    animateViewState(currentViewState, targetViewState, 1500);
  }
}

// Cinematic camera controls
const CAMERA_PRESETS = {
  overview: {
    longitude: 0,
    latitude: 20,
    zoom: 0.5,
    pitch: 0,
    bearing: 0
  },
  dramatic: {
    longitude: 0,
    latitude: 20,
    zoom: 3,
    pitch: 60,
    bearing: 45
  },
  satellite: {
    longitude: 0,
    latitude: 20,
    zoom: 4,
    pitch: 0,
    bearing: 0
  },
  tactical: {
    longitude: 0,
    latitude: 20,
    zoom: 5,
    pitch: 30,
    bearing: 0
  }
};

function applyCameraPreset(presetName, duration = 3000) {
  const preset = CAMERA_PRESETS[presetName];
  if (!preset || !window.deckgl) {
    console.warn(`Camera preset '${presetName}' not found or map not initialized`);
    return;
  }
  
  const currentViewState = window.deckgl.viewState;
  animateViewState(currentViewState, preset, duration);
}

// Smooth camera orbit animation
function orbitCamera(center = [0, 0], radius = 50, duration = 10000) {
  if (!window.deckgl) return;
  
  const startTime = Date.now();
  const initialViewState = window.deckgl.viewState;
  
  function animate() {
    const elapsed = Date.now() - startTime;
    const progress = (elapsed % duration) / duration;
    
    const angle = progress * 2 * Math.PI;
    const longitude = center[0] + Math.cos(angle) * radius;
    const latitude = center[1] + Math.sin(angle) * radius * 0.5;
    
    const viewState = {
      ...initialViewState,
      longitude,
      latitude,
      bearing: (angle * 180 / Math.PI) % 360
    };
    
    window.deckgl.setProps({ viewState });
    
    if (elapsed < duration) {
      requestAnimationFrame(animate);
    }
  }
  
  animate();
}

// Expose functions globally for UI integration
window.mapInteractions = {
  zoomToCountry,
  applyCameraPreset,
  orbitCamera,
  initializeMiniMap,
  updateThreatClustering
};

// Advanced Threat Data Visualization System

// Heatmap generation by threat type
// THREAT_TYPE_COLORS ya está definido arriba en la línea 1831

let heatmapData = new Map();
let heatmapLayers = new Map();
let realTimeMetrics = {
  totalThreats: 0,
  activeThreats: 0,
  criticalThreats: 0,
  threatsByType: {},
  threatsByCountry: {},
  averageSeverity: 0,
  lastUpdate: Date.now()
};

function generateThreatHeatmaps() {
  if (!threatData || threatData.length === 0) {
    return;
  }
  
  // Clear existing heatmap data
  heatmapData.clear();
  
  // Group threats by type
  const threatsByType = {};
  threatData.forEach(threat => {
    const type = threat.attack_type || 'unknown';
    if (!threatsByType[type]) {
      threatsByType[type] = [];
    }
    
    // Add both source and target points
    threatsByType[type].push({
      position: [threat.source_longitude, threat.source_latitude],
      weight: threat.severity || 1,
      timestamp: threat.timestamp
    });
    
    threatsByType[type].push({
      position: [threat.target_longitude, threat.target_latitude],
      weight: threat.severity || 1,
      timestamp: threat.timestamp
    });
  });
  
  // Generate heatmap for each threat type
  Object.keys(threatsByType).forEach(type => {
    const points = threatsByType[type];
    const heatmap = generateHeatmapGrid(points, type);
    heatmapData.set(type, heatmap);
  });
  
  // Generate combined heatmap
  const allPoints = Object.values(threatsByType).flat();
  const combinedHeatmap = generateHeatmapGrid(allPoints, 'combined');
  heatmapData.set('combined', combinedHeatmap);
  
  // Update visualization layers
  updateHeatmapLayers();
}

function generateHeatmapGrid(points, type) {
  const gridSize = 1; // 1 degree grid
  const grid = new Map();
  
  points.forEach(point => {
    const gridX = Math.floor(point.position[0] / gridSize) * gridSize;
    const gridY = Math.floor(point.position[1] / gridSize) * gridSize;
    const key = `${gridX},${gridY}`;
    
    if (!grid.has(key)) {
      grid.set(key, {
        position: [gridX + gridSize/2, gridY + gridSize/2],
        weight: 0,
        count: 0,
        type: type,
        lastUpdate: 0
      });
    }
    
    const cell = grid.get(key);
    cell.weight += point.weight;
    cell.count += 1;
    cell.lastUpdate = Math.max(cell.lastUpdate, point.timestamp || Date.now());
  });
  
  // Convert to array and normalize weights
  const heatmapPoints = Array.from(grid.values());
  const maxWeight = Math.max(...heatmapPoints.map(p => p.weight));
  
  return heatmapPoints.map(point => ({
    ...point,
    normalizedWeight: point.weight / maxWeight,
    intensity: Math.min(point.weight / 10, 1) // Cap intensity at 1
  }));
}

function updateHeatmapLayers() {
  heatmapLayers.clear();
  
  heatmapData.forEach((heatmap, type) => {
    const color = THREAT_TYPE_COLORS[type] || THREAT_TYPE_COLORS.default;
    
    const layer = {
      id: `heatmap-${type}`,
      type: 'HeatmapLayer',
      data: heatmap,
      getPosition: d => d.position,
      getWeight: d => d.weight,
      radiusPixels: 60,
      intensity: 1,
      threshold: 0.03,
      colorRange: [
        [color.r, color.g, color.b, 0],
        [color.r, color.g, color.b, 80],
        [color.r, color.g, color.b, 120],
        [color.r, color.g, color.b, 160],
        [color.r, color.g, color.b, 200],
        [color.r, color.g, color.b, 255]
      ],
      visible: type === 'combined' // Only show combined by default
    };
    
    heatmapLayers.set(type, layer);
  });
}

// Real-time metrics calculation
function updateRealTimeMetrics() {
  if (!threatData || threatData.length === 0) {
    return realTimeMetrics;
  }
  
  const now = Date.now();
  const oneHourAgo = now - (60 * 60 * 1000);
  const oneDayAgo = now - (24 * 60 * 60 * 1000);
  
  // Filter recent threats
  const recentThreats = threatData.filter(threat => {
    const threatTime = threat.timestamp || now;
    return threatTime > oneDayAgo;
  });
  
  const activeThreats = threatData.filter(threat => {
    const threatTime = threat.timestamp || now;
    return threatTime > oneHourAgo;
  });
  
  // Calculate metrics
  realTimeMetrics = {
    totalThreats: threatData.length,
    activeThreats: activeThreats.length,
    recentThreats: recentThreats.length,
    criticalThreats: threatData.filter(t => (t.severity || 1) >= 8).length,
    
    // Threats by type
    threatsByType: threatData.reduce((acc, threat) => {
      const type = threat.attack_type || 'unknown';
      acc[type] = (acc[type] || 0) + 1;
      return acc;
    }, {}),
    
    // Threats by country
    threatsByCountry: threatData.reduce((acc, threat) => {
      const source = threat.source_country || 'unknown';
      const target = threat.target_country || 'unknown';
      acc[source] = (acc[source] || 0) + 1;
      acc[target] = (acc[target] || 0) + 1;
      return acc;
    }, {}),
    
    // Average severity
    averageSeverity: threatData.reduce((sum, threat) => 
      sum + (threat.severity || 1), 0) / threatData.length,
    
    // Trend analysis
    hourlyTrend: calculateHourlyTrend(recentThreats),
    severityDistribution: calculateSeverityDistribution(threatData),
    
    lastUpdate: now
  };
  
  // Update UI metrics display
  updateMetricsDisplay();
  
  return realTimeMetrics;
}

function calculateHourlyTrend(threats) {
  const now = Date.now();
  const hourlyBuckets = Array(24).fill(0);
  
  threats.forEach(threat => {
    const threatTime = threat.timestamp || now;
    const hoursAgo = Math.floor((now - threatTime) / (60 * 60 * 1000));
    
    if (hoursAgo >= 0 && hoursAgo < 24) {
      hourlyBuckets[23 - hoursAgo]++;
    }
  });
  
  return hourlyBuckets;
}

function calculateSeverityDistribution(threats) {
  const distribution = { low: 0, medium: 0, high: 0, critical: 0 };
  
  threats.forEach(threat => {
    const severity = threat.severity || 1;
    
    if (severity <= 3) {
      distribution.low++;
    } else if (severity <= 6) {
      distribution.medium++;
    } else if (severity <= 8) {
      distribution.high++;
    } else {
      distribution.critical++;
    }
  });
  
  return distribution;
}

// Interactive temporal charts
let temporalChartContainer = null;
let temporalChartData = [];

function initializeTemporalCharts() {
  // Create temporal chart container
  if (!temporalChartContainer) {
    temporalChartContainer = document.createElement('div');
    temporalChartContainer.id = 'temporal-chart-container';
    temporalChartContainer.style.cssText = `
      position: fixed;
      top: 20px;
      left: 20px;
      width: 400px;
      height: 200px;
      background: rgba(0, 0, 0, 0.8);
      border: 2px solid #00ff88;
      border-radius: 8px;
      z-index: 1000;
      padding: 10px;
      color: #00ff88;
      font-family: 'Courier New', monospace;
      font-size: 12px;
      overflow: hidden;
    `;
    
    document.body.appendChild(temporalChartContainer);
  }
  
  // Initialize chart rendering
  renderTemporalChart();
  
  // Update chart periodically
  setInterval(renderTemporalChart, 5000);
}

function renderTemporalChart() {
  if (!temporalChartContainer || !realTimeMetrics.hourlyTrend) {
    return;
  }
  
  const canvas = document.createElement('canvas');
  canvas.width = 380;
  canvas.height = 120;
  canvas.style.cssText = 'width: 100%; height: 60%;';
  
  const ctx = canvas.getContext('2d');
  
  // Clear canvas
  ctx.fillStyle = 'rgba(0, 20, 40, 0.9)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // Draw grid
  ctx.strokeStyle = 'rgba(0, 255, 136, 0.3)';
  ctx.lineWidth = 1;
  
  // Vertical grid lines (hours)
  for (let i = 0; i <= 24; i += 4) {
    const x = (i / 24) * canvas.width;
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvas.height);
    ctx.stroke();
  }
  
  // Horizontal grid lines
  for (let i = 0; i <= 4; i++) {
    const y = (i / 4) * canvas.height;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(canvas.width, y);
    ctx.stroke();
  }
  
  // Draw trend line
  const trendData = realTimeMetrics.hourlyTrend;
  const maxValue = Math.max(...trendData, 1);
  
  ctx.strokeStyle = '#00ff88';
  ctx.lineWidth = 2;
  ctx.beginPath();
  
  trendData.forEach((value, index) => {
    const x = (index / (trendData.length - 1)) * canvas.width;
    const y = canvas.height - (value / maxValue) * canvas.height;
    
    if (index === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  });
  
  ctx.stroke();
  
  // Fill area under curve
  ctx.fillStyle = 'rgba(0, 255, 136, 0.2)';
  ctx.lineTo(canvas.width, canvas.height);
  ctx.lineTo(0, canvas.height);
  ctx.closePath();
  ctx.fill();
  
  // Update container content
  temporalChartContainer.innerHTML = `
    <div style="margin-bottom: 10px; font-weight: bold;">Threat Activity (24h)</div>
    <div style="margin-bottom: 10px;"></div>
    <div style="display: flex; justify-content: space-between; font-size: 10px;">
      <span>Active: ${realTimeMetrics.activeThreats}</span>
      <span>Critical: ${realTimeMetrics.criticalThreats}</span>
      <span>Avg Severity: ${realTimeMetrics.averageSeverity.toFixed(1)}</span>
    </div>
  `;
  
  temporalChartContainer.insertBefore(canvas, temporalChartContainer.lastElementChild);
}

// Metrics display update
function updateMetricsDisplay() {
  // Update any existing metrics displays in the UI
  const metricsElements = document.querySelectorAll('[data-metric]');
  
  metricsElements.forEach(element => {
    const metric = element.getAttribute('data-metric');
    
    switch (metric) {
      case 'total-threats':
        element.textContent = realTimeMetrics.totalThreats.toLocaleString();
        break;
      case 'active-threats':
        element.textContent = realTimeMetrics.activeThreats.toLocaleString();
        break;
      case 'critical-threats':
        element.textContent = realTimeMetrics.criticalThreats.toLocaleString();
        break;
      case 'average-severity':
        element.textContent = realTimeMetrics.averageSeverity.toFixed(1);
        break;
    }
  });
}

// Historical comparison system
let historicalData = [];
let comparisonMetrics = {};

function generateHistoricalComparison(timeRange = '7d') {
  if (!threatData || threatData.length === 0) {
    return;
  }
  
  const now = Date.now();
  let timeRangeMs;
  
  switch (timeRange) {
    case '1d': timeRangeMs = 24 * 60 * 60 * 1000; break;
    case '7d': timeRangeMs = 7 * 24 * 60 * 60 * 1000; break;
    case '30d': timeRangeMs = 30 * 24 * 60 * 60 * 1000; break;
    default: timeRangeMs = 7 * 24 * 60 * 60 * 1000;
  }
  
  const cutoffTime = now - timeRangeMs;
  const currentPeriodData = threatData.filter(threat => 
    (threat.timestamp || now) > cutoffTime
  );
  
  const previousPeriodData = threatData.filter(threat => {
    const threatTime = threat.timestamp || now;
    return threatTime > (cutoffTime - timeRangeMs) && threatTime <= cutoffTime;
  });
  
  comparisonMetrics = {
    current: {
      total: currentPeriodData.length,
      avgSeverity: currentPeriodData.reduce((sum, t) => sum + (t.severity || 1), 0) / currentPeriodData.length || 0,
      byType: groupByType(currentPeriodData)
    },
    previous: {
      total: previousPeriodData.length,
      avgSeverity: previousPeriodData.reduce((sum, t) => sum + (t.severity || 1), 0) / previousPeriodData.length || 0,
      byType: groupByType(previousPeriodData)
    },
    changes: {}
  };
  
  // Calculate percentage changes
  comparisonMetrics.changes = {
    total: calculatePercentageChange(comparisonMetrics.previous.total, comparisonMetrics.current.total),
    avgSeverity: calculatePercentageChange(comparisonMetrics.previous.avgSeverity, comparisonMetrics.current.avgSeverity)
  };
  
  return comparisonMetrics;
}

function groupByType(threats) {
  return threats.reduce((acc, threat) => {
    const type = threat.attack_type || 'unknown';
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {});
}

function calculatePercentageChange(oldValue, newValue) {
  if (oldValue === 0) return newValue > 0 ? 100 : 0;
  return ((newValue - oldValue) / oldValue) * 100;
}

// Expose visualization functions globally
window.threatVisualization = {
  generateThreatHeatmaps,
  updateRealTimeMetrics,
  initializeTemporalCharts,
  generateHistoricalComparison,
  heatmapData,
  realTimeMetrics,
  comparisonMetrics
};

// Funciones de easing para animaciones suaves
function easeOutQuart(t) {
  return 1 - Math.pow(1 - t, 4);
}

function easeInQuart(t) {
  return t * t * t * t;
}

function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

// Interpolación de posición en arco
function interpolateArcPosition(source, target, progress) {
  // Interpolación esférica para arcos curvos
  const lat1 = source[1] * Math.PI / 180;
  const lon1 = source[0] * Math.PI / 180;
  const lat2 = target[1] * Math.PI / 180;
  const lon2 = target[0] * Math.PI / 180;
  
  const d = Math.acos(Math.sin(lat1) * Math.sin(lat2) + 
                     Math.cos(lat1) * Math.cos(lat2) * Math.cos(lon2 - lon1));
  
  if (d === 0) return source;
  
  const a = Math.sin((1 - progress) * d) / Math.sin(d);
  const b = Math.sin(progress * d) / Math.sin(d);
  
  const x = a * Math.cos(lat1) * Math.cos(lon1) + b * Math.cos(lat2) * Math.cos(lon2);
  const y = a * Math.cos(lat1) * Math.sin(lon1) + b * Math.cos(lat2) * Math.sin(lon2);
  const z = a * Math.sin(lat1) + b * Math.sin(lat2);
  
  const lat = Math.atan2(z, Math.sqrt(x * x + y * y));
  const lon = Math.atan2(y, x);
  
  return [lon * 180 / Math.PI, lat * 180 / Math.PI];
}

// Start real-time updates
function startRealTimeUpdates() {
  // Start animation loop
  startAnimationLoop();
  
  // Disabled automatic data updates to prevent zoom issues
  // setInterval(loadThreatData, 30000); // Update every 30 seconds
  console.log('Real-time animations started, data updates disabled to prevent zoom issues');
}

// Initialize immediately or when DOM is ready
function initializeMap() {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initWebGLThreatMap().catch(error => {
        console.error('Error initializing WebGL threat map:', error);
      });
    });
  } else {
    // DOM is already loaded
    initWebGLThreatMap().catch(error => {
      console.error('Error initializing WebGL threat map:', error);
    });
  }
}

// Don't auto-initialize, wait for explicit call
console.log('WebGL Threat Map script imported, ready for initialization...');
// initializeMap(); // Commented out to prevent auto-initialization

// Filtros globales avanzados
let currentFilters = {
  threatType: 'all',
  severity: 'all',
  region: 'all',
  // Filtros de rango temporal
  timeRange: {
    start: null,
    end: null,
    preset: '24h' // '1h', '6h', '24h', '7d', '30d', 'custom'
  },
  // Severidad combinada con operadores
  severityCombined: {
    operator: 'OR', // 'AND', 'OR', 'NOT'
    values: ['all'],
    threshold: 0 // 0-10 scale
  },
  // Geolocalización precisa
  geolocation: {
    enabled: false,
    coordinates: null,
    radius: 100, // km
    countries: [],
    continents: []
  },
  // Filtros avanzados
  advanced: {
    sourceIP: '',
    targetIP: '',
    attackVector: 'all',
    confidence: 0, // 0-100%
    tags: [],
    excludeNoise: false,
    onlyActive: false
  },
  // Filtros guardables
  saved: new Map(),
  currentPreset: null
};

// API de filtros avanzada para la UI
function updateWebGLFilters(filters) {
  console.log('Actualizando filtros WebGL avanzados:', filters);
  
  // Fusionar filtros con configuración actual
  currentFilters = mergeFilters(currentFilters, filters);
  
  // Aplicar filtros en cascada
  let filteredThreatData = threatData.slice();
  let filteredArcData = arcData.slice();
  
  // Filtro temporal
  if (currentFilters.timeRange.start && currentFilters.timeRange.end) {
    const startTime = new Date(currentFilters.timeRange.start).getTime();
    const endTime = new Date(currentFilters.timeRange.end).getTime();
    
    filteredThreatData = filteredThreatData.filter(threat => {
      const threatTime = threat.timestamp ? new Date(threat.timestamp).getTime() : Date.now();
      return threatTime >= startTime && threatTime <= endTime;
    });
    
    filteredArcData = filteredArcData.filter(arc => {
      const arcTime = arc.timestamp ? new Date(arc.timestamp).getTime() : Date.now();
      return arcTime >= startTime && arcTime <= endTime;
    });
  }
  
  // Filtro de tipo de amenaza
  if (currentFilters.threatType !== 'all') {
    filteredThreatData = filteredThreatData.filter(threat => 
      threat.type === currentFilters.threatType
    );
  }
  
  // Filtro de severidad combinada
  if (currentFilters.severityCombined.values[0] !== 'all') {
    filteredThreatData = applySeverityFilter(filteredThreatData, currentFilters.severityCombined);
  }
  
  // Filtro de geolocalización
  if (currentFilters.geolocation.enabled) {
    filteredThreatData = applyGeolocationFilter(filteredThreatData, currentFilters.geolocation);
    filteredArcData = applyGeolocationFilter(filteredArcData, currentFilters.geolocation);
  }
  
  // Filtros avanzados
  filteredThreatData = applyAdvancedFilters(filteredThreatData, currentFilters.advanced);
  filteredArcData = applyAdvancedFilters(filteredArcData, currentFilters.advanced);
  
  // Filtro de región (legacy)
  if (currentFilters.region !== 'all') {
    filteredThreatData = filteredThreatData.filter(threat => 
      threat.region && threat.region.toLowerCase().includes(currentFilters.region.toLowerCase())
    );
    
    filteredArcData = filteredArcData.filter(arc => {
      const regionMatch = (arc.sourceRegion && arc.sourceRegion.toLowerCase().includes(currentFilters.region.toLowerCase())) ||
                         (arc.targetRegion && arc.targetRegion.toLowerCase().includes(currentFilters.region.toLowerCase()));
      return regionMatch;
    });
  }
  
  console.log(`Filtros aplicados: ${filteredThreatData.length} amenazas, ${filteredArcData.length} arcos`);
  
  // Actualizar métricas en tiempo real
  updateFilteredMetrics(filteredThreatData);
  
  // Actualizar capas con datos filtrados
  updateLayersWithFilters(filteredThreatData, filteredArcData);
  
  // Actualizar UI de filtros
  updateFilterUI();
}

// Funciones auxiliares para filtros avanzados
function mergeFilters(current, updates) {
  const merged = JSON.parse(JSON.stringify(current));
  
  Object.keys(updates).forEach(key => {
    if (typeof updates[key] === 'object' && updates[key] !== null && !Array.isArray(updates[key])) {
      merged[key] = { ...merged[key], ...updates[key] };
    } else {
      merged[key] = updates[key];
    }
  });
  
  return merged;
}

function applySeverityFilter(data, severityConfig) {
  const { operator, values, threshold } = severityConfig;
  
  return data.filter(item => {
    const severity = item.severity || 'low';
    const severityValue = getSeverityValue(severity);
    
    // Aplicar umbral
    if (severityValue < threshold) return false;
    
    // Aplicar operador lógico
    switch (operator) {
      case 'AND':
        return values.every(val => val === 'all' || severity === val);
      case 'OR':
        return values.some(val => val === 'all' || severity === val);
      case 'NOT':
        return !values.some(val => severity === val);
      default:
        return values.includes('all') || values.includes(severity);
    }
  });
}

function getSeverityValue(severity) {
  const severityMap = {
    'low': 2,
    'medium': 5,
    'high': 8,
    'critical': 10
  };
  return severityMap[severity] || 0;
}

function applyGeolocationFilter(data, geoConfig) {
  if (!geoConfig.enabled) return data;
  
  return data.filter(item => {
    // Filtro por países
    if (geoConfig.countries.length > 0) {
      const itemCountry = item.country || item.sourceCountry || item.targetCountry;
      if (!geoConfig.countries.includes(itemCountry)) return false;
    }
    
    // Filtro por continentes
    if (geoConfig.continents.length > 0) {
      const itemCountry = item.country || item.sourceCountry || item.targetCountry;
      const continent = getCountryContinent(itemCountry);
      if (!geoConfig.continents.includes(continent)) return false;
    }
    
    // Filtro por radio de coordenadas
    if (geoConfig.coordinates && geoConfig.radius > 0) {
      const itemPos = item.position || item.sourcePosition || item.targetPosition;
      if (itemPos) {
        const distance = calculateDistance(geoConfig.coordinates, itemPos);
        if (distance > geoConfig.radius) return false;
      }
    }
    
    return true;
  });
}

function applyAdvancedFilters(data, advancedConfig) {
  return data.filter(item => {
    // Filtro por IP de origen
    if (advancedConfig.sourceIP && item.sourceIP) {
      if (!item.sourceIP.includes(advancedConfig.sourceIP)) return false;
    }
    
    // Filtro por IP de destino
    if (advancedConfig.targetIP && item.targetIP) {
      if (!item.targetIP.includes(advancedConfig.targetIP)) return false;
    }
    
    // Filtro por vector de ataque
    if (advancedConfig.attackVector !== 'all' && item.attackVector) {
      if (item.attackVector !== advancedConfig.attackVector) return false;
    }
    
    // Filtro por confianza
    if (advancedConfig.confidence > 0 && item.confidence) {
      if (item.confidence < advancedConfig.confidence) return false;
    }
    
    // Filtro por tags
    if (advancedConfig.tags.length > 0 && item.tags) {
      const hasMatchingTag = advancedConfig.tags.some(tag => 
        item.tags.includes(tag)
      );
      if (!hasMatchingTag) return false;
    }
    
    // Excluir ruido
    if (advancedConfig.excludeNoise && item.isNoise) {
      return false;
    }
    
    // Solo amenazas activas
    if (advancedConfig.onlyActive && !item.isActive) {
      return false;
    }
    
    return true;
  });
}

function updateFilteredMetrics(filteredData) {
  const metrics = {
    totalFiltered: filteredData.length,
    typeDistribution: {},
    severityDistribution: {},
    regionDistribution: {},
    timeRange: {
      earliest: null,
      latest: null
    }
  };
  
  filteredData.forEach(item => {
    // Distribución por tipo
    const type = item.type || 'unknown';
    metrics.typeDistribution[type] = (metrics.typeDistribution[type] || 0) + 1;
    
    // Distribución por severidad
    const severity = item.severity || 'low';
    metrics.severityDistribution[severity] = (metrics.severityDistribution[severity] || 0) + 1;
    
    // Distribución por región
    const region = item.region || item.country || 'unknown';
    metrics.regionDistribution[region] = (metrics.regionDistribution[region] || 0) + 1;
    
    // Rango temporal
    if (item.timestamp) {
      const time = new Date(item.timestamp);
      if (!metrics.timeRange.earliest || time < metrics.timeRange.earliest) {
        metrics.timeRange.earliest = time;
      }
      if (!metrics.timeRange.latest || time > metrics.timeRange.latest) {
        metrics.timeRange.latest = time;
      }
    }
  });
  
  // Actualizar métricas globales
  realTimeMetrics.filteredMetrics = metrics;
  
  // Disparar evento para actualizar UI
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('filtersUpdated', { detail: metrics }));
  }
}

function updateFilterUI() {
  // Actualizar contadores en la UI
  const filterStats = document.getElementById('filter-stats');
  if (filterStats && realTimeMetrics.filteredMetrics) {
    const metrics = realTimeMetrics.filteredMetrics;
    filterStats.innerHTML = `
      <div class="filter-stat">
        <span class="stat-label">Amenazas filtradas:</span>
        <span class="stat-value">${metrics.totalFiltered.toLocaleString()}</span>
      </div>
      <div class="filter-stat">
        <span class="stat-label">Tipos únicos:</span>
        <span class="stat-value">${Object.keys(metrics.typeDistribution).length}</span>
      </div>
      <div class="filter-stat">
        <span class="stat-label">Regiones:</span>
        <span class="stat-value">${Object.keys(metrics.regionDistribution).length}</span>
      </div>
    `;
  }
}

// Gestión de filtros guardables
function saveFilterPreset(name, filters = currentFilters) {
  const preset = {
    name,
    filters: JSON.parse(JSON.stringify(filters)),
    created: new Date().toISOString(),
    id: Date.now().toString()
  };
  
  currentFilters.saved.set(name, preset);
  
  // Guardar en localStorage
  try {
    const savedPresets = JSON.parse(localStorage.getItem('threatMapFilterPresets') || '{}');
    savedPresets[name] = preset;
    localStorage.setItem('threatMapFilterPresets', JSON.stringify(savedPresets));
  } catch (error) {
    console.warn('No se pudo guardar el preset en localStorage:', error);
  }
  
  console.log(`Preset de filtros '${name}' guardado`);
  return preset;
}

function loadFilterPreset(name) {
  let preset = currentFilters.saved.get(name);
  
  // Intentar cargar desde localStorage si no está en memoria
  if (!preset) {
    try {
      const savedPresets = JSON.parse(localStorage.getItem('threatMapFilterPresets') || '{}');
      preset = savedPresets[name];
      if (preset) {
        currentFilters.saved.set(name, preset);
      }
    } catch (error) {
      console.warn('No se pudo cargar el preset desde localStorage:', error);
    }
  }
  
  if (preset) {
    currentFilters.currentPreset = name;
    updateWebGLFilters(preset.filters);
    console.log(`Preset de filtros '${name}' aplicado`);
    return true;
  }
  
  console.warn(`Preset '${name}' no encontrado`);
  return false;
}

function deleteFilterPreset(name) {
  currentFilters.saved.delete(name);
  
  // Eliminar de localStorage
  try {
    const savedPresets = JSON.parse(localStorage.getItem('threatMapFilterPresets') || '{}');
    delete savedPresets[name];
    localStorage.setItem('threatMapFilterPresets', JSON.stringify(savedPresets));
  } catch (error) {
    console.warn('No se pudo eliminar el preset de localStorage:', error);
  }
  
  if (currentFilters.currentPreset === name) {
    currentFilters.currentPreset = null;
  }
  
  console.log(`Preset de filtros '${name}' eliminado`);
}

function getAvailablePresets() {
  const presets = Array.from(currentFilters.saved.values());
  
  // Cargar presets adicionales desde localStorage
  try {
    const savedPresets = JSON.parse(localStorage.getItem('threatMapFilterPresets') || '{}');
    Object.values(savedPresets).forEach(preset => {
      if (!currentFilters.saved.has(preset.name)) {
        currentFilters.saved.set(preset.name, preset);
        presets.push(preset);
      }
    });
  } catch (error) {
    console.warn('No se pudieron cargar los presets desde localStorage:', error);
  }
  
  return presets.sort((a, b) => new Date(b.created) - new Date(a.created));
}

// Función para actualizar capas con datos filtrados
function updateLayersWithFilters(filteredThreatData, filteredArcData) {
  const layers = [];
  const settings = PERFORMANCE_SETTINGS[performanceMode];
  
  // Limitar datos según el modo de rendimiento
  const limitedThreatData = filteredThreatData.slice(0, settings.maxPoints);
  const limitedArcData = filteredArcData.slice(0, settings.maxArcs);
  
  console.log(`Actualizando capas con filtros: ${limitedThreatData.length} puntos, ${limitedArcData.length} arcos`);

  // Capa de puntos de amenaza
  layers.push(new ScatterplotLayer({
    id: 'threat-points-filtered',
    data: limitedThreatData,
    pickable: true,
    opacity: 0.8,
    stroked: true,
    filled: true,
    radiusScale: settings.radiusScale,
    radiusMinPixels: 6,
    radiusMaxPixels: performanceMode === 'low' ? 20 : 30,
    lineWidthMinPixels: 1,
    getPosition: d => d.position || [d.longitude, d.latitude],
    getRadius: d => Math.sqrt(d.count) * (performanceMode === 'low' ? 1.5 : 2),
    getFillColor: d => d.color,
    getLineColor: [255, 255, 255],
    onClick: onThreatPointClick,
    updateTriggers: {
      getPosition: filteredThreatData.length,
      getFillColor: filteredThreatData.length
    }
  }));

  // Capa de arcos (siempre visible si areArcsVisible es true)
  if (areArcsVisible && limitedArcData.length > 0) {
    layers.push(new ArcLayer({
      id: 'attack-arcs-filtered',
      data: limitedArcData,
      pickable: false,
      greatCircle: true,
      getSourcePosition: d => d.sourcePosition,
      getTargetPosition: d => d.targetPosition,
      getWidth: d => settings.arcWidth * Math.max(1, Math.log10((d.count || 1) + 1)),
      getSourceColor: d => [80, 180, 255, 200],
      getTargetColor: d => [255, 80, 120, 200],
      updateTriggers: {
        getWidth: limitedArcData.length
      }
    }));
  }

  deckOverlay.setProps({ layers });
}

// Funciones para integración con tarjetas de ataque
function highlightAttack(attackData) {
  console.log('Destacando ataque en el mapa:', attackData);
  
  if (!attackData || !attackData.coordinates) {
    console.warn('Datos de ataque incompletos para destacar');
    return false;
  }
  
  try {
    // Crear un punto destacado en las coordenadas especificadas
    const [lng, lat] = attackData.coordinates;
    
    // Zoom a la ubicación del ataque
    if (map) {
      map.flyTo({
        center: [lng, lat],
        zoom: 8,
        speed: 1.2,
        curve: 1,
        easing: (t) => t,
        essential: true
      });
    }
    
    // Crear un marcador temporal destacado
    createTemporaryHighlight(lng, lat, attackData);
    
    // Mostrar popup con información del ataque
    setTimeout(() => {
      showThreatPopup(attackData, [lng, lat]);
    }, 1000); // Pequeño delay para que coincida con la animación de zoom
    
    console.log('Ataque destacado exitosamente');
    return true;
  } catch (error) {
    console.error('Error destacando ataque:', error);
    return false;
  }
}

function highlightAttackByType(type, severity) {
  console.log('Destacando ataques por tipo:', { type, severity });
  
  try {
    // Encontrar el primer ataque que coincida con el tipo y severidad
    const matchingAttack = threatData.find(attack => 
      attack.type === type && (!severity || attack.severity === severity)
    );
    
    if (matchingAttack && matchingAttack.position) {
      // Zoom a la ubicación del ataque
      if (map) {
        const [lng, lat] = matchingAttack.position;
        map.flyTo({
          center: [lng, lat],
          zoom: 6,
          speed: 1.2,
          curve: 1,
          easing: (t) => t,
          essential: true
        });
      }
      
      // Aplicar filtro temporal para resaltar este tipo de ataques
      applyTemporaryTypeFilter(type, severity);
      
      console.log('Ataques por tipo destacados exitosamente');
      return true;
    } else {
      console.warn('No se encontraron ataques del tipo especificado');
      return false;
    }
  } catch (error) {
    console.error('Error destacando ataques por tipo:', error);
    return false;
  }
}

function createTemporaryHighlight(lng, lat, attackData) {
  // Crear un marcador temporal con efectos visuales
  const marker = document.createElement('div');
  marker.className = 'attack-highlight-marker';
  marker.style.cssText = `
    width: 30px;
    height: 30px;
    background: radial-gradient(circle, rgba(255,0,0,0.8) 0%, rgba(255,0,0,0) 70%);
    border: 3px solid rgba(255,255,255,0.9);
    border-radius: 50%;
    box-shadow: 0 0 20px rgba(255,0,0,0.7), 0 0 40px rgba(255,0,0,0.5);
    animation: pulse-highlight 2s infinite;
    position: absolute;
    transform: translate(-50%, -50%);
    pointer-events: none;
    z-index: 1000;
  `;
  
  // Añadir al mapa
  const mapContainer = document.getElementById('map-container');
  if (mapContainer) {
    mapContainer.appendChild(marker);
    
    // Posicionar el marcador
    const updatePosition = () => {
      if (map) {
        const point = map.project([lng, lat]);
        marker.style.left = point.x + 'px';
        marker.style.top = point.y + 'px';
      }
    };
    
    // Actualizar posición inicial
    updatePosition();
    
    // Actualizar posición cuando el mapa se mueva
    map?.on('move', updatePosition);
    
    // Remover después de 5 segundos
    setTimeout(() => {
      map?.off('move', updatePosition);
      marker.remove();
    }, 5000);
  }
}

function applyTemporaryTypeFilter(type, severity) {
  // Aplicar filtro temporal para resaltar este tipo de ataques
  const filter = {
    threatType: type,
    severity: severity || 'all'
  };
  
  // Aplicar filtro
  if (window.updateWebGLFilters) {
    window.updateWebGLFilters(filter);
  }
  
  // Remover filtro después de 8 segundos
  setTimeout(() => {
    if (window.updateWebGLFilters) {
      window.updateWebGLFilters({
        threatType: 'all',
        severity: 'all'
      });
    }
  }, 8000);
}

// Añadir estilos CSS para la animación de pulso
const highlightStyles = document.createElement('style');
highlightStyles.textContent = `
  @keyframes pulse-highlight {
    0% {
      transform: translate(-50%, -50%) scale(1);
      opacity: 1;
    }
    50% {
      transform: translate(-50%, -50%) scale(1.3);
      opacity: 0.7;
    }
    100% {
      transform: translate(-50%, -50%) scale(1);
      opacity: 1;
    }
  }
`;
document.head.appendChild(highlightStyles);

// Export for global access
// Exportar funciones principales
window.initWebGLThreatMap = initWebGLThreatMap;
window.loadThreatData = loadThreatData;
window.updateLayers = updateLayers;
window.cleanupMap = cleanupMap;
window.startAnimationLoop = startAnimationLoop;
window.stopAnimationLoop = stopAnimationLoop;
window.updateWebGLFilters = updateWebGLFilters;

// Exportar funciones de integración con tarjetas de ataque
window.threatMap = {
  highlightAttack,
  highlightAttackByType,
  getMapInstance: () => map,
  getThreatData: () => threatData,
  isMapReady: () => !!map && map.loaded()
};

// Exportar sistema de filtros avanzado
window.advancedFilters = {
  updateWebGLFilters,
  saveFilterPreset,
  loadFilterPreset,
  deleteFilterPreset,
  getAvailablePresets,
  getCurrentFilters: () => currentFilters,
  resetFilters: () => {
    currentFilters = {
      threatType: 'all',
      severity: 'all',
      region: 'all',
      timeRange: {
        start: null,
        end: null,
        preset: '24h'
      },
      severityCombined: {
        operator: 'OR',
        values: ['all'],
        threshold: 0
      },
      geolocation: {
        enabled: false,
        coordinates: null,
        radius: 100,
        countries: [],
        continents: []
      },
      advanced: {
        sourceIP: '',
        targetIP: '',
        attackVector: 'all',
        confidence: 0,
        tags: [],
        excludeNoise: false,
        onlyActive: false
      },
      saved: new Map(),
      currentPreset: null
    };
    updateWebGLFilters({});
  },
  applyTimeRangePreset: (preset) => {
    const now = new Date();
    let start, end = now;
    
    switch (preset) {
      case '1h':
        start = new Date(now.getTime() - 60 * 60 * 1000);
        break;
      case '6h':
        start = new Date(now.getTime() - 6 * 60 * 60 * 1000);
        break;
      case '24h':
        start = new Date(now.getTime() - 24 * 60 * 60 * 1000);
        break;
      case '7d':
        start = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case '30d':
        start = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        break;
      default:
        return;
    }
    
    updateWebGLFilters({
      timeRange: {
        start: start.toISOString(),
        end: end.toISOString(),
        preset
      }
    });
  },
  getFilteredMetrics: () => realTimeMetrics.filteredMetrics || {},
  exportFilters: () => {
    return {
      filters: JSON.parse(JSON.stringify(currentFilters)),
      timestamp: new Date().toISOString(),
      version: '1.0'
    };
  },
  importFilters: (exportedData) => {
    if (exportedData && exportedData.filters) {
      updateWebGLFilters(exportedData.filters);
      return true;
    }
    return false;
  }
};

// Sistema de visualización 3D eliminado para mejorar estabilidad

// === SISTEMA DE ANIMACIONES DE ATAQUES ===
let attackAnimationSystem = {
  enabled: true,
  activeAnimations: new Map(),
  trajectoryPool: [],
  impactEffects: new Map(),
  propagationWaves: [],
  animationQueue: [],
  realTimeSync: true,
  maxConcurrentAnimations: 50,
  animationSpeed: 1.0
};

// Configuración de animaciones de ataques
const ANIMATION_CONFIG = {
  trajectory: {
    speed: 2.0,
    curvature: 0.3,
    trailLength: 20,
    fadeTime: 1000,
    particleCount: 15
  },
  impact: {
    duration: 1500,
    explosionRadius: 50,
    shockwaveSpeed: 5.0,
    particleCount: 100,
    fadeTime: 2000
  },
  propagation: {
    waveSpeed: 3.0,
    maxRadius: 200,
    rippleCount: 3,
    fadeTime: 3000,
    intensity: 0.8
  },
  realTime: {
    syncDelay: 100,
    batchSize: 10,
    updateInterval: 16,
    maxQueueSize: 200
  }
};

// === SISTEMA DE OPTIMIZACIÓN MÓVIL ===
let mobileOptimization = {
  enabled: false,
  deviceType: 'desktop',
  touchControls: {
    enabled: false,
    gestures: new Map(),
    lastTouch: null,
    multiTouch: false
  },
  adaptiveUI: {
    scaleFactor: 1.0,
    compactMode: false,
    hiddenElements: [],
    responsiveBreakpoints: new Map()
  },
  performance: {
    reducedEffects: false,
    simplifiedShaders: false,
    lowPolyMode: false,
    batteryOptimized: false
  },
  orientation: {
    current: 'portrait',
    locked: false,
    adaptiveLayout: true
  }
};

// Configuración de optimización móvil
const MOBILE_CONFIG = {
  detection: {
    touchDevice: 'ontouchstart' in window,
    maxTouchPoints: navigator.maxTouchPoints || 0,
    userAgent: navigator.userAgent,
    screenSize: {
      small: 480,
      medium: 768,
      large: 1024
    }
  },
  touchControls: {
    tapThreshold: 10, // px
    doubleTapDelay: 300, // ms
    longPressDelay: 500, // ms
    swipeThreshold: 50, // px
    pinchThreshold: 10, // px
    maxTouchPoints: 2
  },
  gestures: {
    pan: {
      enabled: true,
      sensitivity: 1.0,
      momentum: true,
      friction: 0.9
    },
    zoom: {
      enabled: true,
      sensitivity: 1.2,
      minZoom: 1,
      maxZoom: 20,
      doubleTapZoom: 2.0
    },
    rotate: {
      enabled: true,
      sensitivity: 0.5,
      snapToNorth: true,
      snapThreshold: 15 // degrees
    }
  },
  ui: {
    buttonSize: {
      small: 32,
      medium: 44,
      large: 56
    },
    spacing: {
      compact: 8,
      normal: 16,
      loose: 24
    },
    typography: {
      scaleFactors: [0.8, 1.0, 1.2, 1.4],
      minFontSize: 12,
      maxFontSize: 24
    }
  },
  performance: {
    mobile: {
      maxPoints: 2000,
      maxArcs: 1000,
      updateInterval: 100, // 10 FPS
      radiusScale: 0.3,
      arcWidth: 0.5,
      enableAnimations: false,
      enableHeatmap: false,
      cullingDistance: 0.9,
      maxWaves: 1,
      lodDistance: 2000,
      instancedRendering: false,
      frustumCulling: false,
      adaptiveLOD: false,
      simplifiedShaders: true,
      reducedParticles: true
    },
    tablet: {
      maxPoints: 5000,
      maxArcs: 2500,
      updateInterval: 50, // 20 FPS
      radiusScale: 0.5,
      arcWidth: 0.8,
      enableAnimations: true,
      enableHeatmap: false,
      cullingDistance: 0.6,
      maxWaves: 3,
      lodDistance: 1500,
      instancedRendering: true,
      frustumCulling: true,
      adaptiveLOD: true,
      simplifiedShaders: false,
      reducedParticles: false
    }
  }
};

// Funciones principales del sistema de optimización móvil
function initializeMobileOptimization() {
  // Detectar tipo de dispositivo
  mobileOptimization.deviceType = detectDeviceType();
  
  // Habilitar optimización móvil si es necesario
  if (mobileOptimization.deviceType !== 'desktop') {
    mobileOptimization.enabled = true;
    
    // Configurar controles táctiles
    initializeTouchControls();
    
    // Configurar UI adaptativa
    initializeAdaptiveUI();
    
    // Aplicar optimizaciones de rendimiento
    applyMobilePerformanceOptimizations();
    
    // Configurar orientación
    setupOrientationHandling();
    
    console.log(`Optimización móvil activada para dispositivo: ${mobileOptimization.deviceType}`);
  }
}

function detectDeviceType() {
  const config = MOBILE_CONFIG.detection;
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;
  const maxDimension = Math.max(screenWidth, screenHeight);
  
  // Verificar si es dispositivo táctil
  if (!config.touchDevice || config.maxTouchPoints === 0) {
    return 'desktop';
  }
  
  // Clasificar por tamaño de pantalla
  if (maxDimension <= config.screenSize.small) {
    return 'mobile';
  } else if (maxDimension <= config.screenSize.medium) {
    return 'tablet';
  } else if (maxDimension <= config.screenSize.large && config.touchDevice) {
    return 'tablet';
  }
  
  return 'desktop';
}

function initializeTouchControls() {
  if (!mobileOptimization.enabled) return;
  
  mobileOptimization.touchControls.enabled = true;
  
  // Configurar eventos táctiles
  const mapContainer = document.getElementById('map-container');
  if (!mapContainer) return;
  
  // Touch start
  mapContainer.addEventListener('touchstart', handleTouchStart, { passive: false });
  
  // Touch move
  mapContainer.addEventListener('touchmove', handleTouchMove, { passive: false });
  
  // Touch end
  mapContainer.addEventListener('touchend', handleTouchEnd, { passive: false });
  
  // Gesture events
  mapContainer.addEventListener('gesturestart', handleGestureStart, { passive: false });
  mapContainer.addEventListener('gesturechange', handleGestureChange, { passive: false });
  mapContainer.addEventListener('gestureend', handleGestureEnd, { passive: false });
}

function handleTouchStart(event) {
  const touches = event.touches;
  const config = MOBILE_CONFIG.touchControls;
  
  mobileOptimization.touchControls.lastTouch = {
    timestamp: Date.now(),
    touches: Array.from(touches).map(touch => ({
      id: touch.identifier,
      x: touch.clientX,
      y: touch.clientY
    }))
  };
  
  // Detectar multi-touch
  mobileOptimization.touchControls.multiTouch = touches.length > 1;
  
  // Prevenir comportamiento por defecto en ciertos casos
  if (touches.length > 1) {
    event.preventDefault();
  }
}

function handleTouchMove(event) {
  if (!mobileOptimization.touchControls.lastTouch) return;
  
  const touches = event.touches;
  const config = MOBILE_CONFIG.gestures;
  
  if (touches.length === 1 && config.pan.enabled) {
    // Gesto de paneo
    const touch = touches[0];
    const lastTouch = mobileOptimization.touchControls.lastTouch.touches[0];
    
    if (lastTouch) {
      const deltaX = touch.clientX - lastTouch.x;
      const deltaY = touch.clientY - lastTouch.y;
      
      // Aplicar paneo con sensibilidad
      applyPanGesture(deltaX * config.pan.sensitivity, deltaY * config.pan.sensitivity);
    }
  } else if (touches.length === 2 && config.zoom.enabled) {
    // Gesto de zoom/pinch
    const touch1 = touches[0];
    const touch2 = touches[1];
    
    const currentDistance = Math.sqrt(
      Math.pow(touch2.clientX - touch1.clientX, 2) +
      Math.pow(touch2.clientY - touch1.clientY, 2)
    );
    
    const lastTouches = mobileOptimization.touchControls.lastTouch.touches;
    if (lastTouches.length === 2) {
      const lastDistance = Math.sqrt(
        Math.pow(lastTouches[1].x - lastTouches[0].x, 2) +
        Math.pow(lastTouches[1].y - lastTouches[0].y, 2)
      );
      
      const zoomFactor = (currentDistance / lastDistance) * config.zoom.sensitivity;
      applyZoomGesture(zoomFactor);
    }
  }
  
  // Actualizar última posición táctil
  mobileOptimization.touchControls.lastTouch.touches = Array.from(touches).map(touch => ({
    id: touch.identifier,
    x: touch.clientX,
    y: touch.clientY
  }));
  
  event.preventDefault();
}

function handleTouchEnd(event) {
  const config = MOBILE_CONFIG.touchControls;
  const touchDuration = Date.now() - mobileOptimization.touchControls.lastTouch.timestamp;
  
  // Detectar tap/double tap
  if (event.changedTouches.length === 1 && touchDuration < config.doubleTapDelay) {
    const touch = event.changedTouches[0];
    const lastTouch = mobileOptimization.touchControls.lastTouch.touches[0];
    
    if (lastTouch) {
      const distance = Math.sqrt(
        Math.pow(touch.clientX - lastTouch.x, 2) +
        Math.pow(touch.clientY - lastTouch.y, 2)
      );
      
      if (distance < config.tapThreshold) {
        handleTapGesture(touch.clientX, touch.clientY);
      }
    }
  }
  
  // Aplicar momentum si está habilitado
  if (MOBILE_CONFIG.gestures.pan.momentum) {
    applyPanMomentum();
  }
  
  mobileOptimization.touchControls.lastTouch = null;
  mobileOptimization.touchControls.multiTouch = false;
}

function applyPanGesture(deltaX, deltaY) {
  if (!map || !map.getViewState) return;
  
  const viewState = map.getViewState();
  const newViewState = {
    ...viewState,
    longitude: viewState.longitude - deltaX * 0.01,
    latitude: viewState.latitude + deltaY * 0.01
  };
  
  map.setProps({ viewState: newViewState });
}

function applyZoomGesture(zoomFactor) {
  if (!map || !map.getViewState) return;
  
  const viewState = map.getViewState();
  const config = MOBILE_CONFIG.gestures.zoom;
  
  const newZoom = Math.max(
    config.minZoom,
    Math.min(config.maxZoom, viewState.zoom * zoomFactor)
  );
  
  const newViewState = {
    ...viewState,
    zoom: newZoom
  };
  
  map.setProps({ viewState: newViewState });
}

function handleTapGesture(x, y) {
  // Convertir coordenadas de pantalla a coordenadas del mapa
  if (map && map.unproject) {
    const coordinates = map.unproject([x, y]);
    
    // Buscar amenazas cercanas al punto tocado
    const nearbyThreats = findNearbyThreats(coordinates, 50); // 50km radius
    
    if (nearbyThreats.length > 0) {
      // Mostrar información de la amenaza más cercana
      showThreatPopup(nearbyThreats[0], coordinates);
    }
  }
}

function initializeAdaptiveUI() {
  if (!mobileOptimization.enabled) return;
  
  const deviceType = mobileOptimization.deviceType;
  const config = MOBILE_CONFIG.ui;
  
  // Determinar factor de escala
  const screenWidth = window.innerWidth;
  let scaleFactor = 1.0;
  
  if (deviceType === 'mobile') {
    scaleFactor = screenWidth < 400 ? 0.8 : 0.9;
    mobileOptimization.adaptiveUI.compactMode = true;
  } else if (deviceType === 'tablet') {
    scaleFactor = 1.1;
  }
  
  mobileOptimization.adaptiveUI.scaleFactor = scaleFactor;
  
  // Aplicar estilos adaptativos
  applyAdaptiveStyles();
  
  // Configurar breakpoints responsivos
  setupResponsiveBreakpoints();
  
  // Ocultar elementos no esenciales en móviles
  if (deviceType === 'mobile') {
    hideNonEssentialElements();
  }
}

function applyAdaptiveStyles() {
  const scaleFactor = mobileOptimization.adaptiveUI.scaleFactor;
  const config = MOBILE_CONFIG.ui;
  
  // Crear o actualizar hoja de estilos móvil
  let mobileStyleSheet = document.getElementById('mobile-adaptive-styles');
  if (!mobileStyleSheet) {
    mobileStyleSheet = document.createElement('style');
    mobileStyleSheet.id = 'mobile-adaptive-styles';
    document.head.appendChild(mobileStyleSheet);
  }
  
  const styles = `
    .mobile-optimized {
      font-size: ${14 * scaleFactor}px !important;
      line-height: 1.4 !important;
    }
    
    .mobile-button {
      min-height: ${config.buttonSize.medium * scaleFactor}px !important;
      min-width: ${config.buttonSize.medium * scaleFactor}px !important;
      padding: ${config.spacing.normal * scaleFactor}px !important;
      font-size: ${16 * scaleFactor}px !important;
    }
    
    .mobile-compact {
      padding: ${config.spacing.compact * scaleFactor}px !important;
      margin: ${config.spacing.compact * scaleFactor}px !important;
    }
    
    .mobile-hidden {
      display: none !important;
    }
    
    @media (max-width: 480px) {
      .threat-popup {
        width: 90vw !important;
        max-width: none !important;
        font-size: ${12 * scaleFactor}px !important;
      }
      
      .control-panel {
        position: fixed !important;
        bottom: 0 !important;
        left: 0 !important;
        right: 0 !important;
        height: auto !important;
        max-height: 40vh !important;
        overflow-y: auto !important;
      }
    }
  `;
  
  mobileStyleSheet.textContent = styles;
}

function applyMobilePerformanceOptimizations() {
  const deviceType = mobileOptimization.deviceType;
  const config = MOBILE_CONFIG.performance[deviceType];
  
  if (!config) return;
  
  // Aplicar configuración de rendimiento específica para móviles
  performanceMode = deviceType === 'mobile' ? 'potato' : 'low';
  
  // Actualizar configuraciones globales
  Object.assign(PERFORMANCE_SETTINGS[performanceMode], config);
  
  // Activar optimizaciones específicas
  mobileOptimization.performance.reducedEffects = config.simplifiedShaders;
  mobileOptimization.performance.simplifiedShaders = config.simplifiedShaders;
  mobileOptimization.performance.lowPolyMode = deviceType === 'mobile';
  
  // Optimizar batería en dispositivos móviles
  if (deviceType === 'mobile') {
    mobileOptimization.performance.batteryOptimized = true;
    
    // Reducir frecuencia de actualización cuando la batería es baja
    if (navigator.getBattery) {
      navigator.getBattery().then(battery => {
        if (battery.level < 0.2) {
          PERFORMANCE_SETTINGS[performanceMode].updateInterval *= 2;
        }
      });
    }
  }
  
  console.log(`Optimizaciones de rendimiento aplicadas para ${deviceType}`);
}

function setupOrientationHandling() {
  if (!mobileOptimization.enabled) return;
  
  // Detectar orientación inicial
  updateOrientation();
  
  // Escuchar cambios de orientación
  window.addEventListener('orientationchange', handleOrientationChange);
  window.addEventListener('resize', handleOrientationChange);
}

function handleOrientationChange() {
  setTimeout(() => {
    updateOrientation();
    
    if (mobileOptimization.orientation.adaptiveLayout) {
      adaptLayoutToOrientation();
    }
    
    // Recalcular viewport y actualizar mapa
    if (map && map.resize) {
      map.resize();
    }
  }, 100); // Pequeño delay para que el cambio de orientación se complete
}

function updateOrientation() {
  const width = window.innerWidth;
  const height = window.innerHeight;
  
  mobileOptimization.orientation.current = width > height ? 'landscape' : 'portrait';
}

function adaptLayoutToOrientation() {
  const orientation = mobileOptimization.orientation.current;
  const deviceType = mobileOptimization.deviceType;
  
  if (deviceType === 'mobile') {
    const controlPanel = document.querySelector('.control-panel');
    const threatPopup = document.querySelector('.threat-popup');
    
    if (orientation === 'landscape') {
      // Modo paisaje: controles más compactos
      if (controlPanel) {
        controlPanel.classList.add('landscape-mode');
      }
      if (threatPopup) {
        threatPopup.classList.add('landscape-mode');
      }
    } else {
      // Modo retrato: controles normales
      if (controlPanel) {
        controlPanel.classList.remove('landscape-mode');
      }
      if (threatPopup) {
        threatPopup.classList.remove('landscape-mode');
      }
    }
  }
}

// Función para actualizar la interfaz de usuario móvil
function updateMobileUI() {
  if (!mobileOptimization.enabled) {
    return;
  }
  
  const deviceType = mobileOptimization.deviceType;
  const config = MOBILE_CONFIG.ui;
  const isSmallScreen = window.innerWidth <= MOBILE_CONFIG.detection.screenSize.small;
  const isMediumScreen = window.innerWidth <= MOBILE_CONFIG.detection.screenSize.medium;
  
  // Actualizar tamaño de botones
  const buttons = document.querySelectorAll('.control-button, .filter-button, .preset-button');
  buttons.forEach(button => {
    const size = isSmallScreen ? config.buttonSize.small : 
                isMediumScreen ? config.buttonSize.medium : config.buttonSize.large;
    button.style.minWidth = `${size}px`;
    button.style.minHeight = `${size}px`;
    button.style.fontSize = `${Math.max(size * 0.3, 12)}px`;
  });
  
  // Actualizar espaciado
  const containers = document.querySelectorAll('.controls-container, .filter-panel, .metrics-panel');
  containers.forEach(container => {
    const spacing = isSmallScreen ? config.spacing.compact : 
                   isMediumScreen ? config.spacing.normal : config.spacing.loose;
    container.style.gap = `${spacing}px`;
    container.style.padding = `${spacing}px`;
  });
  
  // Actualizar tipografía
  const textElements = document.querySelectorAll('.metric-value, .threat-info, .filter-label');
  textElements.forEach(element => {
    const baseSize = parseInt(getComputedStyle(element).fontSize) || 14;
    const scaleIndex = isSmallScreen ? 0 : isMediumScreen ? 1 : 2;
    const scaleFactor = config.typography.scaleFactors[scaleIndex];
    const newSize = Math.max(
      Math.min(baseSize * scaleFactor, config.typography.maxFontSize),
      config.typography.minFontSize
    );
    element.style.fontSize = `${newSize}px`;
  });
  
  // Actualizar modo compacto
  const shouldUseCompactMode = isSmallScreen || deviceType === 'mobile';
  mobileOptimization.adaptiveUI.compactMode = shouldUseCompactMode;
  
  if (shouldUseCompactMode) {
    // Ocultar elementos no esenciales
    const nonEssentialElements = document.querySelectorAll('.advanced-controls, .detailed-metrics, .secondary-info');
    nonEssentialElements.forEach(element => {
      if (!mobileOptimization.adaptiveUI.hiddenElements.includes(element)) {
        element.style.display = 'none';
        mobileOptimization.adaptiveUI.hiddenElements.push(element);
      }
    });
    
    // Simplificar paneles
    const panels = document.querySelectorAll('.control-panel, .info-panel');
    panels.forEach(panel => {
      panel.classList.add('compact-mode');
    });
  } else {
    // Restaurar elementos ocultos
    mobileOptimization.adaptiveUI.hiddenElements.forEach(element => {
      element.style.display = '';
    });
    mobileOptimization.adaptiveUI.hiddenElements = [];
    
    // Remover modo compacto
    const panels = document.querySelectorAll('.control-panel, .info-panel');
    panels.forEach(panel => {
      panel.classList.remove('compact-mode');
    });
  }
  
  // Actualizar factor de escala
  const scaleFactor = isSmallScreen ? 0.8 : isMediumScreen ? 0.9 : 1.0;
  mobileOptimization.adaptiveUI.scaleFactor = scaleFactor;
  
  // Aplicar escala global si es necesario
  const mapContainer = document.querySelector('.threat-map-container');
  if (mapContainer && scaleFactor !== 1.0) {
    mapContainer.style.transform = `scale(${scaleFactor})`;
    mapContainer.style.transformOrigin = 'top left';
  }
  
  // Actualizar controles táctiles si están habilitados
  if (mobileOptimization.touchControls.enabled) {
    updateTouchControlsUI();
  }
  
  console.log(`UI móvil actualizada - Dispositivo: ${deviceType}, Compacto: ${shouldUseCompactMode}, Escala: ${scaleFactor}`);
}

// Función auxiliar para actualizar controles táctiles
function updateTouchControlsUI() {
  const touchControls = document.querySelectorAll('.touch-control, .gesture-area');
  const isSmallScreen = window.innerWidth <= MOBILE_CONFIG.detection.screenSize.small;
  
  touchControls.forEach(control => {
    // Ajustar tamaño de área táctil
    const minTouchSize = isSmallScreen ? 44 : 48; // Tamaño mínimo recomendado para touch
    control.style.minWidth = `${minTouchSize}px`;
    control.style.minHeight = `${minTouchSize}px`;
    
    // Ajustar opacidad para mejor visibilidad
    control.style.opacity = mobileOptimization.adaptiveUI.compactMode ? '0.8' : '0.6';
  });
}

// Configuración 3D eliminada para mejorar estabilidad

// Función para crear partículas de ataque
function createAttackParticles(position, threatData) {
  const particleId = `particles_${Date.now()}_${Math.random()}`;
  const count = ANIMATION_CONFIG.trajectory.particleCount;
  const particles = [];
  
  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2;
    const speed = Math.random() * 3 + 1;
    
    particles.push({
      position: [...position],
      velocity: [
        Math.cos(angle) * speed,
        Math.sin(angle) * speed,
        Math.random() * 2
      ],
      life: 1.0,
      size: Math.random() * 3 + 1,
      color: threatData?.color || [255, 100, 100, 255]
    });
  }
  
  const particleSystem = {
    id: particleId,
    particles: particles,
    position: [...position],
    startTime: Date.now(),
    duration: ANIMATION_CONFIG.trajectory.fadeTime,
    threatData: threatData
  };
  
  attackAnimationSystem.activeAnimations.set(particleId, particleSystem);
  return particleId;
}

// Función para actualizar partículas de ataque
function updateAttackParticles(deltaTime) {
  attackAnimationSystem.activeAnimations.forEach((system, id) => {
    if (system.particles) {
      system.particles.forEach(particle => {
        // Actualizar posición
        particle.position[0] += particle.velocity[0] * deltaTime / 1000;
        particle.position[1] += particle.velocity[1] * deltaTime / 1000;
        particle.position[2] += particle.velocity[2] * deltaTime / 1000;
        
        // Actualizar vida
        particle.life -= deltaTime / ANIMATION_CONFIG.trajectory.fadeTime;
        
        // Aplicar gravedad
        particle.velocity[2] -= 0.5 * deltaTime / 1000;
        
        // Actualizar tamaño basado en vida
        particle.size = particle.size * particle.life;
      });
      
      // Filtrar partículas muertas
      system.particles = system.particles.filter(p => p.life > 0);
      
      // Eliminar sistema si no quedan partículas
      if (system.particles.length === 0) {
        attackAnimationSystem.activeAnimations.delete(id);
      }
    }
  });
}

// Función para sincronizar con datos en tiempo real
function synchronizeWithRealTimeData() {
  if (!attackAnimationSystem.realTimeSync || !attackAnimationSystem.enabled) {
    return;
  }
  
  // Procesar cola de animaciones
  const maxProcessed = ANIMATION_CONFIG.realTime.batchSize;
  let processed = 0;
  
  while (attackAnimationSystem.animationQueue.length > 0 && processed < maxProcessed) {
    const queuedAnimation = attackAnimationSystem.animationQueue.shift();
    
    if (queuedAnimation.type === 'attack') {
      createAttackTrajectory(queuedAnimation.source, queuedAnimation.target, queuedAnimation.threatData);
    } else if (queuedAnimation.type === 'impact') {
      createImpactEffect(queuedAnimation.position, queuedAnimation.threatData);
    } else if (queuedAnimation.type === 'particles') {
      createAttackParticles(queuedAnimation.position, queuedAnimation.threatData);
    }
    
    processed++;
  }
  
  // Limpiar animaciones antiguas
  const currentTime = Date.now();
  attackAnimationSystem.activeAnimations.forEach((animation, id) => {
    if (currentTime - animation.startTime > animation.duration) {
      attackAnimationSystem.activeAnimations.delete(id);
    }
  });
  
  // Programar próxima sincronización
  if (attackAnimationSystem.realTimeSync) {
    setTimeout(() => {
      synchronizeWithRealTimeData();
    }, ANIMATION_CONFIG.realTime.syncDelay);
  }
}

// Sistema de animaciones de ataques - Exportación global
window.attackAnimations = {
  initializeAttackAnimationSystem,
  createAttackTrajectory,
  updateAttackAnimations,
  createAttackParticles,
  updateAttackParticles,
  createImpactEffect,
  updateImpactEffects,
  createPropagationWaves,
  updatePropagationWaves,
  synchronizeWithRealTimeData,
  toggleAttackAnimations,
  setAnimationSpeed,
  optimizeAnimationPerformance,
  applyAnimationPreset,
  
  // Configuración y estado
  config: ANIMATION_CONFIG,
  system: attackAnimationSystem,
  
  // Métodos de utilidad
  isEnabled: () => attackAnimationSystem.enabled,
  getActiveAttacksCount: () => attackAnimationSystem.activeAttacks.size,
  getEffectsCount: () => attackAnimationSystem.impactEffects.size + attackAnimationSystem.propagationWaves.size,
  
  // Presets predefinidos
  presets: {
    cinematic: () => applyAnimationPreset('cinematic'),
    performance: () => applyAnimationPreset('performance'),
    minimal: () => applyAnimationPreset('minimal'),
    dramatic: () => applyAnimationPreset('dramatic')
  }
};

// === FUNCIONES AUXILIARES DEL SISTEMA DE OPTIMIZACIÓN MÓVIL ===
function toggleMobileOptimization(enabled) {
  mobileOptimization.enabled = enabled;
  if (enabled) {
    applyMobilePerformanceOptimizations();
    initializeTouchControls();
    updateMobileUI();
  } else {
    disableMobileOptimizations();
  }
}

function setMobilePerformanceLevel(level) {
  if (!MOBILE_CONFIG.performance.levels[level]) {
    console.warn(`Nivel de rendimiento móvil no válido: ${level}`);
    return;
  }
  
  mobileOptimization.performanceLevel = level;
  const config = MOBILE_CONFIG.performance.levels[level];
  
  // Aplicar configuraciones de rendimiento
  if (window.deckOverlay) {
    window.deckOverlay.setProps({
      parameters: {
        clearColor: [0, 0, 0, 0],
        blend: true,
        blendFunc: [770, 771],
        depthTest: false
      }
    });
  }
  
  // Actualizar configuraciones de animación
  if (window.attackAnimations) {
    window.attackAnimations.setAnimationSpeed(config.animationSpeed);
  }
}

function optimizeMobilePerformance() {
  const deviceInfo = mobileOptimization.deviceInfo;
  let recommendedLevel = 'medium';
  
  // Determinar nivel de rendimiento basado en capacidades del dispositivo
  if (deviceInfo.memory && deviceInfo.memory < 2) {
    recommendedLevel = 'low';
  } else if (deviceInfo.memory && deviceInfo.memory > 6) {
    recommendedLevel = 'high';
  }
  
  // Ajustar basado en tipo de dispositivo
  if (deviceInfo.type === 'tablet') {
    recommendedLevel = recommendedLevel === 'low' ? 'medium' : 'high';
  }
  
  setMobilePerformanceLevel(recommendedLevel);
  
  // Optimizaciones adicionales
  if (deviceInfo.type === 'mobile') {
    // Sistema 3D eliminado para mejorar estabilidad
    
    // Limitar número de partículas
    if (window.attackAnimations) {
      window.attackAnimations.config.maxParticles = Math.min(
        window.attackAnimations.config.maxParticles,
        MOBILE_CONFIG.performance.levels[recommendedLevel].maxParticles
      );
    }
  }
}

function applyMobileUIPreset(preset) {
  if (!MOBILE_CONFIG.ui.presets[preset]) {
    console.warn(`Preset de UI móvil no válido: ${preset}`);
    return;
  }
  
  const config = MOBILE_CONFIG.ui.presets[preset];
  mobileOptimization.uiPreset = preset;
  
  // Aplicar configuraciones de UI
  const elements = {
    controls: document.querySelectorAll('.map-control'),
    panels: document.querySelectorAll('.info-panel'),
    buttons: document.querySelectorAll('.action-button')
  };
  
  // Ajustar tamaños de elementos
  elements.controls.forEach(control => {
    control.style.transform = `scale(${config.controlScale})`;
  });
  
  elements.panels.forEach(panel => {
    panel.style.fontSize = `${config.fontSize}px`;
    panel.style.padding = `${config.padding}px`;
  });
  
  elements.buttons.forEach(button => {
    button.style.minHeight = `${config.buttonSize}px`;
    button.style.minWidth = `${config.buttonSize}px`;
  });
}

function disableMobileOptimizations() {
  // Remover event listeners táctiles
  if (mobileOptimization.touchListeners) {
    Object.entries(mobileOptimization.touchListeners).forEach(([event, listener]) => {
      document.removeEventListener(event, listener);
    });
    mobileOptimization.touchListeners = {};
  }
  
  // Restaurar configuraciones originales
  if (window.deckOverlay) {
    window.deckOverlay.setProps({
      parameters: {
        clearColor: [0, 0, 0, 0],
        blend: true,
        blendFunc: [770, 771],
        depthTest: true
      }
    });
  }
  
  // Restaurar UI original
  const elements = document.querySelectorAll('.map-control, .info-panel, .action-button');
  elements.forEach(element => {
    element.style.transform = '';
    element.style.fontSize = '';
    element.style.padding = '';
    element.style.minHeight = '';
    element.style.minWidth = '';
  });
}

// === FUNCIONES DEL SISTEMA DE ANIMACIONES ===
function initializeAttackAnimationSystem() {
  console.log('Inicializando sistema de animaciones de ataques...');
  
  attackAnimationSystem.enabled = true;
  attackAnimationSystem.activeAnimations.clear();
  attackAnimationSystem.trajectoryPool = [];
  attackAnimationSystem.impactEffects.clear();
  attackAnimationSystem.propagationWaves = [];
  attackAnimationSystem.animationQueue = [];
  
  // Inicializar pool de trayectorias
  initializeTrajectoryPool();
  
  // Configurar sincronización en tiempo real
  if (attackAnimationSystem.realTimeSync) {
    startRealTimeAnimationSync();
  }
  
  console.log('Sistema de animaciones inicializado correctamente');
}

function initializeTrajectoryPool() {
  // Pre-crear objetos de trayectoria para optimizar rendimiento
  for (let i = 0; i < ANIMATION_CONFIG.realTime.maxQueueSize; i++) {
    attackAnimationSystem.trajectoryPool.push({
      id: `trajectory_${i}`,
      active: false,
      source: null,
      target: null,
      progress: 0,
      startTime: 0,
      duration: 0,
      particles: [],
      trail: []
    });
  }
}

function createAttackTrajectory(sourceCoords, targetCoords, threatData) {
  const trajectory = getAvailableTrajectory();
  if (!trajectory) {
    console.warn('No hay trayectorias disponibles en el pool');
    return null;
  }
  
  trajectory.active = true;
  trajectory.source = sourceCoords;
  trajectory.target = targetCoords;
  trajectory.progress = 0;
  trajectory.startTime = Date.now();
  trajectory.duration = calculateTrajectoryDuration(sourceCoords, targetCoords);
  trajectory.threatData = threatData;
  trajectory.particles = generateTrajectoryParticles(sourceCoords, targetCoords);
  trajectory.trail = [];
  
  attackAnimationSystem.activeAnimations.set(trajectory.id, trajectory);
  
  return trajectory;
}

function getAvailableTrajectory() {
  return attackAnimationSystem.trajectoryPool.find(t => !t.active);
}

function calculateTrajectoryDuration(source, target) {
  const distance = calculateDistance(source, target);
  const baseSpeed = ANIMATION_CONFIG.trajectory.speed;
  return Math.max(1000, distance * 100 / baseSpeed); // mínimo 1 segundo
}

function generateTrajectoryParticles(source, target) {
  const particles = [];
  const count = ANIMATION_CONFIG.trajectory.particleCount;
  
  for (let i = 0; i < count; i++) {
    particles.push({
      position: [...source],
      velocity: [0, 0, 0],
      life: 1.0,
      size: Math.random() * 3 + 1,
      color: [255, 100 + Math.random() * 155, 0, 255]
    });
  }
  
  return particles;
}

function updateAttackAnimations(deltaTime) {
  const currentTime = Date.now();
  const animationsToRemove = [];
  
  // Actualizar animaciones activas
  attackAnimationSystem.activeAnimations.forEach((animation, id) => {
    const elapsed = currentTime - animation.startTime;
    animation.progress = Math.min(elapsed / animation.duration, 1.0);
    
    // Actualizar posición de la trayectoria
    updateTrajectoryPosition(animation);
    
    // Actualizar partículas
    updateTrajectoryParticles(animation, deltaTime);
    
    // Verificar si la animación ha terminado
    if (animation.progress >= 1.0) {
      // Crear efecto de impacto
      createImpactEffect(animation.target, animation.threatData);
      
      // Marcar para eliminación
      animationsToRemove.push(id);
    }
  });
  
  // Limpiar animaciones completadas
  animationsToRemove.forEach(id => {
    const animation = attackAnimationSystem.activeAnimations.get(id);
    if (animation) {
      animation.active = false;
      attackAnimationSystem.activeAnimations.delete(id);
    }
  });
  
  // Actualizar efectos de impacto
  updateImpactEffects(deltaTime);
  
  // Actualizar ondas de propagación
  updatePropagationWaves(deltaTime);
  
  // Procesar cola de animaciones
  processAnimationQueue();
}

function updateTrajectoryPosition(animation) {
  const t = easeInOutCubic(animation.progress);
  const curvature = ANIMATION_CONFIG.trajectory.curvature;
  
  // Calcular posición con curvatura
  const midPoint = [
    (animation.source[0] + animation.target[0]) / 2,
    (animation.source[1] + animation.target[1]) / 2 + curvature * Math.sin(Math.PI * t)
  ];
  
  animation.currentPosition = [
    animation.source[0] + (animation.target[0] - animation.source[0]) * t,
    animation.source[1] + (animation.target[1] - animation.source[1]) * t
  ];
  
  // Actualizar trail
  animation.trail.push([...animation.currentPosition]);
  if (animation.trail.length > ANIMATION_CONFIG.trajectory.trailLength) {
    animation.trail.shift();
  }
}

function updateTrajectoryParticles(animation, deltaTime) {
  animation.particles.forEach(particle => {
    // Actualizar posición hacia el objetivo
    const direction = [
      animation.target[0] - particle.position[0],
      animation.target[1] - particle.position[1]
    ];
    
    const speed = ANIMATION_CONFIG.trajectory.speed * deltaTime / 1000;
    particle.position[0] += direction[0] * speed;
    particle.position[1] += direction[1] * speed;
    
    // Actualizar vida de la partícula
    particle.life -= deltaTime / ANIMATION_CONFIG.trajectory.fadeTime;
    particle.life = Math.max(0, particle.life);
  });
}

function createImpactEffect(position, threatData) {
  const impactId = `impact_${Date.now()}_${Math.random()}`;
  const impact = {
    id: impactId,
    position: [...position],
    startTime: Date.now(),
    duration: ANIMATION_CONFIG.impact.duration,
    radius: 0,
    maxRadius: ANIMATION_CONFIG.impact.explosionRadius,
    particles: generateImpactParticles(position),
    threatData: threatData
  };
  
  attackAnimationSystem.impactEffects.set(impactId, impact);
  
  // Crear ondas de propagación
  createPropagationWaves(position, threatData);
}

function generateImpactParticles(position) {
  const particles = [];
  const count = ANIMATION_CONFIG.impact.particleCount;
  
  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2;
    const speed = Math.random() * 5 + 2;
    
    particles.push({
      position: [...position],
      velocity: [
        Math.cos(angle) * speed,
        Math.sin(angle) * speed,
        Math.random() * 3
      ],
      life: 1.0,
      size: Math.random() * 5 + 2,
      color: [255, Math.random() * 100 + 155, 0, 255]
    });
  }
  
  return particles;
}

function createPropagationWaves(position, threatData) {
  const waveCount = ANIMATION_CONFIG.propagation.rippleCount;
  
  for (let i = 0; i < waveCount; i++) {
    const wave = {
      id: `wave_${Date.now()}_${i}`,
      position: [...position],
      startTime: Date.now() + (i * 500), // Ondas escalonadas
      radius: 0,
      maxRadius: ANIMATION_CONFIG.propagation.maxRadius,
      intensity: ANIMATION_CONFIG.propagation.intensity,
      threatData: threatData
    };
    
    attackAnimationSystem.propagationWaves.push(wave);
  }
}

function updateImpactEffects(deltaTime) {
  const currentTime = Date.now();
  const effectsToRemove = [];
  
  attackAnimationSystem.impactEffects.forEach((effect, id) => {
    const elapsed = currentTime - effect.startTime;
    const progress = elapsed / effect.duration;
    
    if (progress >= 1.0) {
      effectsToRemove.push(id);
      return;
    }
    
    // Actualizar radio de explosión
    effect.radius = effect.maxRadius * easeOutQuart(progress);
    
    // Actualizar partículas
    effect.particles.forEach(particle => {
      particle.position[0] += particle.velocity[0] * deltaTime / 1000;
      particle.position[1] += particle.velocity[1] * deltaTime / 1000;
      particle.position[2] += particle.velocity[2] * deltaTime / 1000;
      
      particle.life -= deltaTime / ANIMATION_CONFIG.impact.fadeTime;
      particle.life = Math.max(0, particle.life);
      
      // Aplicar gravedad
      particle.velocity[2] -= 9.8 * deltaTime / 1000;
    });
  });
  
  // Limpiar efectos completados
  effectsToRemove.forEach(id => {
    attackAnimationSystem.impactEffects.delete(id);
  });
}

function updatePropagationWaves(deltaTime) {
  const currentTime = Date.now();
  const wavesToRemove = [];
  
  attackAnimationSystem.propagationWaves.forEach((wave, index) => {
    if (currentTime < wave.startTime) return;
    
    const elapsed = currentTime - wave.startTime;
    const duration = ANIMATION_CONFIG.propagation.fadeTime;
    const progress = elapsed / duration;
    
    if (progress >= 1.0) {
      wavesToRemove.push(index);
      return;
    }
    
    // Actualizar radio de onda
    wave.radius = wave.maxRadius * easeOutQuart(progress);
    wave.intensity = ANIMATION_CONFIG.propagation.intensity * (1 - progress);
  });
  
  // Limpiar ondas completadas (en orden inverso para mantener índices)
  wavesToRemove.reverse().forEach(index => {
    attackAnimationSystem.propagationWaves.splice(index, 1);
  });
}

function processAnimationQueue() {
  const maxConcurrent = attackAnimationSystem.maxConcurrentAnimations;
  const currentActive = attackAnimationSystem.activeAnimations.size;
  
  if (currentActive >= maxConcurrent || attackAnimationSystem.animationQueue.length === 0) {
    return;
  }
  
  const batchSize = Math.min(
    ANIMATION_CONFIG.realTime.batchSize,
    maxConcurrent - currentActive,
    attackAnimationSystem.animationQueue.length
  );
  
  for (let i = 0; i < batchSize; i++) {
    const queuedAnimation = attackAnimationSystem.animationQueue.shift();
    if (queuedAnimation) {
      createAttackTrajectory(
        queuedAnimation.source,
        queuedAnimation.target,
        queuedAnimation.threatData
      );
    }
  }
}

function queueAttackAnimation(source, target, threatData) {
  if (attackAnimationSystem.animationQueue.length >= ANIMATION_CONFIG.realTime.maxQueueSize) {
    // Remover animación más antigua si la cola está llena
    attackAnimationSystem.animationQueue.shift();
  }
  
  attackAnimationSystem.animationQueue.push({
    source: source,
    target: target,
    threatData: threatData,
    timestamp: Date.now()
  });
}

function startRealTimeAnimationSync() {
  setInterval(() => {
    if (!attackAnimationSystem.enabled) return;
    
    // Sincronizar con datos en tiempo real
    syncWithRealTimeData();
  }, ANIMATION_CONFIG.realTime.syncDelay);
}

function syncWithRealTimeData() {
  // Obtener nuevos ataques desde la última sincronización
  const newAttacks = getNewAttackData();
  
  newAttacks.forEach(attack => {
    if (attack.source && attack.target) {
      queueAttackAnimation(
        [attack.source.longitude, attack.source.latitude],
        [attack.target.longitude, attack.target.latitude],
        attack
      );
    }
  });
}

function getNewAttackData() {
  // Esta función se conectaría con el sistema de datos en tiempo real
  // Por ahora, simular algunos ataques
  if (Math.random() < 0.3) { // 30% de probabilidad
    return [{
      id: `attack_${Date.now()}`,
      source: {
        longitude: -100 + Math.random() * 200,
        latitude: -50 + Math.random() * 100
      },
      target: {
        longitude: -100 + Math.random() * 200,
        latitude: -50 + Math.random() * 100
      },
      type: ['malware', 'phishing', 'ddos', 'ransomware'][Math.floor(Math.random() * 4)],
      severity: ['low', 'medium', 'high', 'critical'][Math.floor(Math.random() * 4)]
    }];
  }
  return [];
}

// Función 3D eliminada para mejorar estabilidad

// Funciones 3D eliminadas para mejorar estabilidad

// Función 3D eliminada para mejorar estabilidad

// Funciones 3D eliminadas para mejorar estabilidad

// Funciones 3D eliminadas para mejorar estabilidad

// Funciones 3D eliminadas para mejorar estabilidad

// Transiciones cinematográficas para vista 3D
function applyCinematicTransition(targetView, duration = 3000) {
  if (!map || !map.getMap) return;
  
  const currentView = map.getMap().getViewState();
  const transition = {
    ...targetView,
    transitionDuration: duration,
    transitionEasing: t => t * t * (3 - 2 * t), // smoothstep
    onTransitionStart: () => {
      console.log('Iniciando transición cinematográfica 3D');
    },
    onTransitionEnd: () => {
      console.log('Transición cinematográfica 3D completada');
    }
  };
  
  map.getMap().setProps({ viewState: transition });
}

// Función 3D eliminada para mejorar estabilidad

// Funciones 3D eliminadas para mejorar estabilidad

// Búsqueda avanzada de amenazas
window.threatSearch = {
  searchByKeyword: (keyword) => {
    const results = threatData.filter(threat => {
      const searchText = [
        threat.type,
        threat.description,
        threat.sourceIP,
        threat.targetIP,
        threat.country,
        threat.region,
        ...(threat.tags || [])
      ].join(' ').toLowerCase();
      
      return searchText.includes(keyword.toLowerCase());
    });
    
    return results;
  },
  
  searchByPattern: (pattern) => {
    try {
      const regex = new RegExp(pattern, 'i');
      return threatData.filter(threat => {
        const searchText = JSON.stringify(threat);
        return regex.test(searchText);
      });
    } catch (error) {
      console.warn('Patrón de búsqueda inválido:', error);
      return [];
    }
  },
  
  searchByLocation: (lat, lng, radius = 100) => {
    return threatData.filter(threat => {
      if (!threat.position) return false;
      const distance = calculateDistance([lng, lat], threat.position);
      return distance <= radius;
    });
  },
  
  getSearchSuggestions: (query) => {
    const suggestions = new Set();
    const queryLower = query.toLowerCase();
    
    threatData.forEach(threat => {
      // Sugerir tipos de amenaza
      if (threat.type && threat.type.toLowerCase().includes(queryLower)) {
        suggestions.add(threat.type);
      }
      
      // Sugerir países
      if (threat.country && threat.country.toLowerCase().includes(queryLower)) {
        suggestions.add(threat.country);
      }
      
      // Sugerir tags
      if (threat.tags) {
        threat.tags.forEach(tag => {
          if (tag.toLowerCase().includes(queryLower)) {
            suggestions.add(tag);
          }
        });
      }
    });
    
    return Array.from(suggestions).slice(0, 10);
  }
};

// Funciones auxiliares del sistema de animaciones
function toggleAttackAnimations(enabled = null) {
  if (enabled === null) {
    attackAnimationSystem.enabled = !attackAnimationSystem.enabled;
  } else {
    attackAnimationSystem.enabled = enabled;
  }
  
  if (!attackAnimationSystem.enabled) {
    // Limpiar animaciones activas
    attackAnimationSystem.activeAttacks.clear();
    attackAnimationSystem.impactEffects.clear();
    attackAnimationSystem.propagationWaves.clear();
  }
  
  console.log(`Animaciones de ataques ${attackAnimationSystem.enabled ? 'activadas' : 'desactivadas'}`);
}

function setAnimationSpeed(speed) {
  attackAnimationSystem.speed = Math.max(0.1, Math.min(5.0, speed));
  console.log(`Velocidad de animación establecida a: ${attackAnimationSystem.speed}x`);
}

function optimizeAnimationPerformance() {
  const currentTime = Date.now();
  const deltaTime = currentTime - attackAnimationSystem.lastUpdate;
  
  // Limitar actualizaciones si el rendimiento es bajo
  if (deltaTime < ANIMATION_CONFIG.updateInterval) return;
  
  // Reducir efectos si hay demasiados
  if (attackAnimationSystem.activeAttacks.size > ANIMATION_CONFIG.maxConcurrentAttacks) {
    const oldestAttacks = Array.from(attackAnimationSystem.activeAttacks.entries())
      .sort((a, b) => a[1].startTime - b[1].startTime)
      .slice(0, attackAnimationSystem.activeAttacks.size - ANIMATION_CONFIG.maxConcurrentAttacks);
    
    oldestAttacks.forEach(([id]) => {
      attackAnimationSystem.activeAttacks.delete(id);
    });
  }
  
  // Limpiar efectos expirados
  attackAnimationSystem.impactEffects.forEach((effect, id) => {
    if (currentTime - effect.startTime > ANIMATION_CONFIG.effects.impact.duration) {
      attackAnimationSystem.impactEffects.delete(id);
    }
  });
  
  attackAnimationSystem.propagationWaves.forEach((wave, id) => {
    if (currentTime - wave.startTime > ANIMATION_CONFIG.effects.propagation.duration) {
      attackAnimationSystem.propagationWaves.delete(id);
    }
  });
  
  attackAnimationSystem.lastUpdate = currentTime;
}

function applyAnimationPreset(presetName) {
  const presets = {
    'cinematic': {
      speed: 0.5,
      particleCount: ANIMATION_CONFIG.particles.maxCount,
      effectIntensity: 1.0,
      trailLength: 2.0
    },
    'performance': {
      speed: 2.0,
      particleCount: Math.floor(ANIMATION_CONFIG.particles.maxCount * 0.5),
      effectIntensity: 0.7,
      trailLength: 1.0
    },
    'minimal': {
      speed: 3.0,
      particleCount: Math.floor(ANIMATION_CONFIG.particles.maxCount * 0.3),
      effectIntensity: 0.5,
      trailLength: 0.5
    },
    'dramatic': {
      speed: 0.3,
      particleCount: ANIMATION_CONFIG.particles.maxCount,
      effectIntensity: 1.5,
      trailLength: 3.0
    }
  };
  
  const preset = presets[presetName];
  if (!preset) {
    console.warn(`Preset de animación '${presetName}' no encontrado`);
    return;
  }
  
  attackAnimationSystem.speed = preset.speed;
  ANIMATION_CONFIG.particles.maxCount = preset.particleCount;
  ANIMATION_CONFIG.effects.intensity = preset.effectIntensity;
  ANIMATION_CONFIG.trajectory.trailLength = preset.trailLength;
  
  console.log(`Preset de animación '${presetName}' aplicado`);
}

// Sistema 3D eliminado para mejorar estabilidad

// Sistema de analíticas avanzadas
let analyticsSystem = {
  enabled: true,
  dashboards: new Map(),
  reports: new Map(),
  trends: new Map(),
  correlations: new Map(),
  alerts: new Map(),
  exportQueue: [],
  lastAnalysis: null,
  updateInterval: null,
  realTimeMode: true
};

const ANALYTICS_CONFIG = {
  dashboard: {
    updateInterval: 5000, // 5 segundos
    maxDataPoints: 1000,
    chartTypes: ['line', 'bar', 'pie', 'heatmap', 'scatter'],
    timeRanges: ['1h', '6h', '24h', '7d', '30d', '90d'],
    refreshRate: 'auto' // 'auto', 'manual', 'realtime'
  },
  
  trends: {
    analysisWindow: 24 * 60 * 60 * 1000, // 24 horas
    minDataPoints: 10,
    confidenceThreshold: 0.7,
    seasonalityDetection: true,
    anomalyDetection: true,
    forecastHorizon: 6 // horas
  },
  
  correlation: {
    minCorrelation: 0.3,
    maxVariables: 20,
    timeWindow: 7 * 24 * 60 * 60 * 1000, // 7 días
    methods: ['pearson', 'spearman', 'kendall'],
    significance: 0.05
  },
  
  reports: {
    formats: ['pdf', 'csv', 'json', 'xlsx'],
    templates: ['executive', 'technical', 'operational'],
    scheduling: ['manual', 'hourly', 'daily', 'weekly', 'monthly'],
    compression: true,
    encryption: false
  },
  
  alerts: {
    types: ['threshold', 'anomaly', 'trend', 'correlation'],
    severity: ['low', 'medium', 'high', 'critical'],
    channels: ['ui', 'email', 'webhook', 'sms'],
    cooldown: 5 * 60 * 1000, // 5 minutos
    maxActive: 50
  },
  
  performance: {
    maxConcurrentAnalysis: 5,
    cacheSize: 100,
    batchSize: 1000,
    timeout: 30000, // 30 segundos
    retryAttempts: 3
  }
};

// Funciones principales del sistema de analíticas
function initializeAnalyticsDashboard() {
  if (!analyticsSystem.enabled) return;
  
  try {
    // Inicializar dashboards predefinidos
    createThreatTrendsDashboard();
    createPerformanceMetricsDashboard();
    createGeographicAnalyticsDashboard();
    createRealTimeAlertsDashboard();
    
    // Configurar actualizaciones automáticas
    if (analyticsSystem.realTimeMode) {
      startRealTimeAnalytics();
    }
    
    // Inicializar sistema de alertas
    initializeAlertSystem();
    
    console.log('Sistema de analíticas inicializado correctamente');
  } catch (error) {
    console.error('Error inicializando sistema de analíticas:', error);
  }
}

function createThreatTrendsDashboard() {
  const dashboard = {
    id: 'threat-trends',
    title: 'Tendencias de Amenazas',
    type: 'trends',
    charts: [
      {
        id: 'threat-volume-trend',
        type: 'line',
        title: 'Volumen de Amenazas por Tiempo',
        data: [],
        config: {
          timeRange: '24h',
          aggregation: 'hourly',
          smoothing: true
        }
      },
      {
        id: 'threat-type-distribution',
        type: 'pie',
        title: 'Distribución por Tipo de Amenaza',
        data: [],
        config: {
          showPercentages: true,
          colorScheme: 'threat-types'
        }
      },
      {
        id: 'severity-heatmap',
        type: 'heatmap',
        title: 'Mapa de Calor de Severidad',
        data: [],
        config: {
          timeRange: '7d',
          granularity: 'hourly'
        }
      }
    ],
    lastUpdate: Date.now(),
    autoRefresh: true
  };
  
  analyticsSystem.dashboards.set('threat-trends', dashboard);
  updateThreatTrendsDashboard();
}

function createPerformanceMetricsDashboard() {
  const dashboard = {
    id: 'performance-metrics',
    title: 'Métricas de Rendimiento',
    type: 'performance',
    charts: [
      {
        id: 'fps-trend',
        type: 'line',
        title: 'FPS en Tiempo Real',
        data: [],
        config: {
          realTime: true,
          maxPoints: 100,
          threshold: 30
        }
      },
      {
        id: 'memory-usage',
        type: 'area',
        title: 'Uso de Memoria GPU',
        data: [],
        config: {
          unit: 'MB',
          warning: 80,
          critical: 95
        }
      },
      {
        id: 'render-time',
        type: 'bar',
        title: 'Tiempo de Renderizado por Capa',
        data: [],
        config: {
          stacked: true,
          showAverage: true
        }
      }
    ],
    lastUpdate: Date.now(),
    autoRefresh: true
  };
  
  analyticsSystem.dashboards.set('performance-metrics', dashboard);
}

function createGeographicAnalyticsDashboard() {
  const dashboard = {
    id: 'geographic-analytics',
    title: 'Análisis Geográfico',
    type: 'geographic',
    charts: [
      {
        id: 'hotspots-map',
        type: 'map',
        title: 'Hotspots de Amenazas',
        data: [],
        config: {
          clustering: true,
          heatmap: true,
          timeAnimation: true
        }
      },
      {
        id: 'country-ranking',
        type: 'bar',
        title: 'Ranking de Países por Amenazas',
        data: [],
        config: {
          horizontal: true,
          top: 20,
          sortBy: 'total'
        }
      },
      {
        id: 'attack-vectors',
        type: 'network',
        title: 'Vectores de Ataque Globales',
        data: [],
        config: {
          showFlow: true,
          thickness: 'volume',
          color: 'severity'
        }
      }
    ],
    lastUpdate: Date.now(),
    autoRefresh: true
  };
  
  analyticsSystem.dashboards.set('geographic-analytics', dashboard);
}

function createRealTimeAlertsDashboard() {
  const dashboard = {
    id: 'realtime-alerts',
    title: 'Alertas en Tiempo Real',
    type: 'alerts',
    charts: [
      {
        id: 'active-alerts',
        type: 'list',
        title: 'Alertas Activas',
        data: [],
        config: {
          maxItems: 50,
          sortBy: 'severity',
          groupBy: 'type'
        }
      },
      {
        id: 'alert-timeline',
        type: 'timeline',
        title: 'Línea de Tiempo de Alertas',
        data: [],
        config: {
          timeRange: '1h',
          showSeverity: true,
          interactive: true
        }
      },
      {
        id: 'alert-statistics',
        type: 'metrics',
        title: 'Estadísticas de Alertas',
        data: [],
        config: {
          metrics: ['total', 'critical', 'resolved', 'pending'],
          period: '24h'
        }
      }
    ],
    lastUpdate: Date.now(),
    autoRefresh: true
  };
  
  analyticsSystem.dashboards.set('realtime-alerts', dashboard);
}

function startRealTimeAnalytics() {
  if (analyticsSystem.updateInterval) {
    clearInterval(analyticsSystem.updateInterval);
  }
  
  analyticsSystem.updateInterval = setInterval(() => {
    updateAllDashboards();
    processAnalyticsTrends();
    checkAlertConditions();
    updateCorrelationAnalysis();
  }, ANALYTICS_CONFIG.dashboard.updateInterval);
}

function updateAllDashboards() {
  analyticsSystem.dashboards.forEach((dashboard, id) => {
    if (dashboard.autoRefresh) {
      updateDashboard(id);
    }
  });
}

function updateDashboard(dashboardId) {
  const dashboard = analyticsSystem.dashboards.get(dashboardId);
  if (!dashboard) return;
  
  switch (dashboard.type) {
    case 'trends':
      updateThreatTrendsDashboard();
      break;
    case 'performance':
      updatePerformanceMetricsDashboard();
      break;
    case 'geographic':
      updateGeographicAnalyticsDashboard();
      break;
    case 'alerts':
      updateRealTimeAlertsDashboard();
      break;
  }
  
  dashboard.lastUpdate = Date.now();
}

function updateThreatTrendsDashboard() {
  const dashboard = analyticsSystem.dashboards.get('threat-trends');
  if (!dashboard) return;
  
  // Actualizar volumen de amenazas
  const volumeChart = dashboard.charts.find(c => c.id === 'threat-volume-trend');
  if (volumeChart) {
    volumeChart.data = calculateThreatVolumeOverTime();
  }
  
  // Actualizar distribución por tipo
  const distributionChart = dashboard.charts.find(c => c.id === 'threat-type-distribution');
  if (distributionChart) {
    distributionChart.data = calculateThreatTypeDistribution();
  }
  
  // Actualizar mapa de calor de severidad
  const heatmapChart = dashboard.charts.find(c => c.id === 'severity-heatmap');
  if (heatmapChart) {
    heatmapChart.data = calculateSeverityHeatmap();
  }
}

function updatePerformanceMetricsDashboard() {
  const dashboard = analyticsSystem.dashboards.get('performance-metrics');
  if (!dashboard) return;
  
  // Actualizar FPS
  const fpsChart = dashboard.charts.find(c => c.id === 'fps-trend');
  if (fpsChart) {
    fpsChart.data.push({
      timestamp: Date.now(),
      value: currentFPS || 0
    });
    
    // Mantener solo los últimos 100 puntos
    if (fpsChart.data.length > 100) {
      fpsChart.data = fpsChart.data.slice(-100);
    }
  }
  
  // Actualizar uso de memoria
  const memoryChart = dashboard.charts.find(c => c.id === 'memory-usage');
  if (memoryChart) {
    const memoryInfo = getGPUMemoryUsage();
    memoryChart.data.push({
      timestamp: Date.now(),
      used: memoryInfo.used,
      total: memoryInfo.total,
      percentage: (memoryInfo.used / memoryInfo.total) * 100
    });
  }
  
  // Actualizar tiempo de renderizado
  const renderChart = dashboard.charts.find(c => c.id === 'render-time');
  if (renderChart) {
    renderChart.data = getRenderTimeByLayer();
  }
}

function updateGeographicAnalyticsDashboard() {
  const dashboard = analyticsSystem.dashboards.get('geographic-analytics');
  if (!dashboard) return;
  
  // Actualizar hotspots
  const hotspotsChart = dashboard.charts.find(c => c.id === 'hotspots-map');
  if (hotspotsChart) {
    hotspotsChart.data = calculateThreatHotspots();
  }
  
  // Actualizar ranking de países
  const rankingChart = dashboard.charts.find(c => c.id === 'country-ranking');
  if (rankingChart) {
    rankingChart.data = calculateCountryThreatRanking();
  }
  
  // Actualizar vectores de ataque
  const vectorsChart = dashboard.charts.find(c => c.id === 'attack-vectors');
  if (vectorsChart) {
    vectorsChart.data = calculateAttackVectors();
  }
}

function updateRealTimeAlertsDashboard() {
  const dashboard = analyticsSystem.dashboards.get('realtime-alerts');
  if (!dashboard) return;
  
  // Actualizar alertas activas
  const alertsChart = dashboard.charts.find(c => c.id === 'active-alerts');
  if (alertsChart) {
    alertsChart.data = Array.from(analyticsSystem.alerts.values())
      .filter(alert => alert.status === 'active')
      .sort((a, b) => getSeverityWeight(b.severity) - getSeverityWeight(a.severity));
  }
  
  // Actualizar timeline
  const timelineChart = dashboard.charts.find(c => c.id === 'alert-timeline');
  if (timelineChart) {
    timelineChart.data = getAlertTimeline();
  }
  
  // Actualizar estadísticas
  const statsChart = dashboard.charts.find(c => c.id === 'alert-statistics');
  if (statsChart) {
    statsChart.data = calculateAlertStatistics();
  }
}

// Sistema de optimización móvil - Exportación global
window.mobileOptimization = {
  // Funciones principales
  initializeMobileOptimization,
  detectDeviceType,
  initializeTouchControls,
  applyMobilePerformanceOptimizations,
  updateMobileUI,
  handleOrientationChange,
  
  // Funciones auxiliares
  toggleMobileOptimization,
  setMobilePerformanceLevel,
  optimizeMobilePerformance,
  applyMobileUIPreset,
  disableMobileOptimizations,
  
  // Configuración y estado
  config: MOBILE_CONFIG,
  system: mobileOptimization,
  
  // Métodos de utilidad
  isEnabled: () => mobileOptimization.enabled,
  getDeviceType: () => mobileOptimization.deviceInfo.type,
  getCurrentPerformanceLevel: () => mobileOptimization.performanceLevel,
  getTouchListenersCount: () => Object.keys(mobileOptimization.touchListeners || {}).length,
  
  // Presets predefinidos
  presets: {
    mobile: () => applyMobileUIPreset('mobile'),
    tablet: () => applyMobileUIPreset('tablet'),
    desktop: () => applyMobileUIPreset('desktop')
  }
};

// Funciones auxiliares para enriquecer datos de popups
function getEnrichedThreatData(threatData, countryName) {
  const total = threatData.totalThreats;
  const now = new Date();
  
  return {
    ...threatData,
    confidence: Math.min(95, Math.max(60, Math.round((total / 50) * 100))),
    detectionRate: Math.min(98, Math.max(70, Math.round((total / 30) * 100))),
    firstDetection: new Date(now.getTime() - Math.random() * 7 * 24 * 60 * 60 * 1000).toLocaleDateString('es-ES'),
    lastUpdate: new Date().toLocaleDateString('es-ES'),
    estimatedImpact: total > 100 ? 'Alto' : total > 50 ? 'Medio' : 'Bajo',
    breakdown: threatData.breakdown.map(item => ({
      ...item,
      percentage: Math.round((item.count / total) * 100)
    }))
  };
}

function getApiBreakdownData(threatData) {
  // Simular datos de diferentes APIs
  const apis = [
    { name: 'RansomWatch', count: Math.floor(threatData.totalThreats * 0.3) },
    { name: 'Cloudflare', count: Math.floor(threatData.totalThreats * 0.25) },
    { name: 'URLhaus', count: Math.floor(threatData.totalThreats * 0.2) },
    { name: 'ThreatFox', count: Math.floor(threatData.totalThreats * 0.15) },
    { name: 'FeodoTracker', count: Math.floor(threatData.totalThreats * 0.08) },
    { name: 'GreyNoise', count: Math.floor(threatData.totalThreats * 0.02) }
  ];
  
  const total = apis.reduce((sum, api) => sum + api.count, 0);
  
  return apis.map(api => ({
    ...api,
    percentage: Math.round((api.count / total) * 100)
  }));
}

function getEnrichedRecentAttacks(attacks) {
  return attacks.map(attack => {
    const severityLevels = ['Baja', 'Media', 'Alta', 'Crítica'];
    const severity = severityLevels[Math.floor(Math.random() * severityLevels.length)];
    const sources = ['RansomWatch', 'Cloudflare', 'URLhaus', 'ThreatFox', 'FeodoTracker'];
    const source = sources[Math.floor(Math.random() * sources.length)];
    
    let details = '';
    if (attack.type.includes('Ransomware')) {
      details = `Grupo: ${['LockBit', 'Conti', 'REvil', 'BlackCat'][Math.floor(Math.random() * 4)]} | Estado: ${['Activo', 'Contenido', 'Mitigado'][Math.floor(Math.random() * 3)]}`;
    } else if (attack.type.includes('DDoS')) {
      details = `Protocolo: ${['TCP', 'UDP', 'ICMP', 'HTTP'][Math.floor(Math.random() * 4)]} | País Origen: ${['China', 'Rusia', 'EEUU', 'Brasil'][Math.floor(Math.random() * 4)]}`;
    } else if (attack.type.includes('Malware')) {
      details = `Confianza: ${Math.floor(60 + Math.random() * 40)}% | Detecciones: ${Math.floor(1 + Math.random() * 20)}`;
    }
    
    return {
      ...attack,
      icon: getThreatTypeIcon(attack.type),
      severity,
      source,
      details,
      time: attack.time.replace('hace ', '') // Limpiar formato de tiempo
    };
  });
}

function getThreatTypeIcon(type) {
  const icons = {
    'Ransomware': '🔒',
    'DDoS': '☁️',
    'Malware': '🦠',
    'Phishing': '🎣',
    'Botnet': '🤖',
    'Exploit': '⚡',
    'Data Breach': '💾',
    'Zero-day': '0️⃣'
  };
  return icons[type] || '⚠️';
}

function getApiIcon(apiName) {
  const icons = {
    'RansomWatch': '🔒',
    'Cloudflare': '☁️',
    'URLhaus': '🌐',
    'ThreatFox': '🦊',
    'FeodoTracker': '🤖',
    'GreyNoise': '🎭'
  };
  return icons[apiName] || '📡';
}

function getSeverityColor(severity) {
  const colors = {
    'Crítica': '#ef4444',
    'Alta': '#f59e0b',
    'Media': '#eab308',
    'Baja': '#10b981'
  };
  return colors[severity] || '#6b7280';
}

function getAttackTypeColor(type) {
  const colors = {
    'Ransomware': '#ef4444',
    'DDoS': '#f59e0b',
    'Malware': '#8b5cf6',
    'Phishing': '#06b6d4',
    'Botnet': '#f97316',
    'Exploit': '#dc2626',
    'Data Breach': '#7c3aed',
    'Zero-day': '#be123c'
  };
  return colors[type] || '#6b7280';
}