// WebGL Threat Map Script
// Global variables
let map, deckOverlay;
let threatData = [];
let arcData = [];
let performanceMode = 'auto';
let lastUpdateTime = 0;
let isHeatmapVisible = false;
let areArcsVisible = true;
let areLabelsVisible = false;

// Animation variables
let animationTime = 0;
let animationSpeed = 1;
let pulseData = [];
let explosionData = [];
let attackWaves = [];
let animationFrame = null;
let isAnimationActive = true;

// Module references
let maplibregl, Deck, ScatterplotLayer, ArcLayer, HeatmapLayer, TextLayer, MapboxOverlay;
let reverseGeocode, batchReverseGeocode;

// Performance settings optimizados
const PERFORMANCE_SETTINGS = {
  high: {
    maxPoints: 15000,
    maxArcs: 7500,
    updateInterval: 50,
    radiusScale: 1,
    arcWidth: 2,
    enableAnimations: true,
    enableHeatmap: true,
    cullingDistance: 0.1,
    maxWaves: 10
  },
  medium: {
    maxPoints: 8000,
    maxArcs: 4000,
    updateInterval: 100,
    radiusScale: 0.8,
    arcWidth: 1.5,
    enableAnimations: true,
    enableHeatmap: true,
    cullingDistance: 0.2,
    maxWaves: 5
  },
  low: {
    maxPoints: 3000,
    maxArcs: 1500,
    updateInterval: 200,
    radiusScale: 0.6,
    arcWidth: 1,
    enableAnimations: false,
    enableHeatmap: false,
    cullingDistance: 0.5,
    maxWaves: 2
  },
  potato: {
    maxPoints: 1000,
    maxArcs: 500,
    updateInterval: 500,
    radiusScale: 0.4,
    arcWidth: 0.8,
    enableAnimations: false,
    enableHeatmap: false,
    cullingDistance: 1.0,
    maxWaves: 1
  }
};

// Variables de rendimiento
let frameCount = 0;
let lastFPSUpdate = 0;
let currentFPS = 0;
let performanceMonitor = null;

// Animation performance settings
const ANIMATION_SETTINGS = {
  high: {
    maxPulses: 50,
    maxExplosions: 20,
    maxWaves: 30,
    pulseSpeed: 2,
    waveSpeed: 1.5,
    particleCount: 100
  },
  medium: {
    maxPulses: 30,
    maxExplosions: 10,
    maxWaves: 15,
    pulseSpeed: 1.5,
    waveSpeed: 1,
    particleCount: 50
  },
  low: {
    maxPulses: 15,
    maxExplosions: 5,
    maxWaves: 8,
    pulseSpeed: 1,
    waveSpeed: 0.8,
    particleCount: 25
  },
  potato: {
    maxPulses: 5,
    maxExplosions: 2,
    maxWaves: 3,
    pulseSpeed: 0.5,
    waveSpeed: 0.5,
    particleCount: 10
  }
};

// Load modules dynamically
async function loadModules() {
  try {
    console.log('Loading MapLibre GL...');
    const [maplibreModule, deckCore, deckLayers, deckMapbox] = await Promise.all([
      import('maplibre-gl'),
      import('@deck.gl/core'),
      import('@deck.gl/layers'),
      import('@deck.gl/mapbox')
    ]);
    
    console.log('Assigning module references...');
    maplibregl = maplibreModule.default;
    Deck = deckCore.Deck;
    ScatterplotLayer = deckLayers.ScatterplotLayer;
    ArcLayer = deckLayers.ArcLayer;
    HeatmapLayer = deckLayers.HeatmapLayer;
    TextLayer = deckLayers.TextLayer;
    MapboxOverlay = deckMapbox.MapboxOverlay;
    
    console.log('All modules loaded successfully');
  } catch (error) {
    console.error('Error loading modules:', error);
    throw error;
  }
}

// Detect performance mode based on data size and device capabilities
function detectPerformanceMode(dataSize) {
  const canvas = document.createElement('canvas');
  const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
  
  if (!gl) return 'potato';
  
  const renderer = gl.getParameter(gl.RENDERER);
  const vendor = gl.getParameter(gl.VENDOR);
  
  // Check for high-end GPUs
  const isHighEndGPU = /nvidia|amd|intel iris|intel hd graphics 6|radeon/i.test(renderer);
  const hasEnoughMemory = navigator.deviceMemory ? navigator.deviceMemory >= 4 : true;
  const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  
  // Ajustar según el dispositivo y datos
  if (isMobile || dataSize > 10000) return 'low';
  if (dataSize > 5000 && (!isHighEndGPU || !hasEnoughMemory)) return 'medium';
  if (dataSize > 2000 && (!isHighEndGPU || !hasEnoughMemory)) return 'medium';
  if (isHighEndGPU && hasEnoughMemory && !isMobile) return 'high';
  
  return 'medium';
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
  
  // Actualizar FPS cada segundo
  setInterval(() => {
    updateFPSCounter();
    if (performanceMonitor.autoOptimize) {
      autoOptimizePerformance();
    }
  }, 1000);
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
  
  // Si el FPS es muy bajo, reducir calidad
  if (avgFPS < 20 && performanceMode !== 'potato') {
    const modes = ['high', 'medium', 'low', 'potato'];
    const currentIndex = modes.indexOf(performanceMode);
    if (currentIndex < modes.length - 1) {
      performanceMode = modes[currentIndex + 1];
      console.log(`🔧 Auto-optimización: Cambiando a modo ${performanceMode} (FPS: ${avgFPS})`);
      updateLayers();
    }
  }
  
  // Si el FPS es alto y estable, intentar mejorar calidad
  else if (avgFPS > 50 && performanceMode !== 'high') {
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
async function initWebGLThreatMap() {
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
      zoom: 2,
      pitch: 0,
      bearing: 0,
      antialias: true,
      maxZoom: 18,
      minZoom: 1,
      // Disable automatic interactions that could cause zoom issues
      doubleClickZoom: false,
      touchZoomRotate: true,
      scrollZoom: true,
      boxZoom: true,
      dragRotate: true,
      dragPan: true,
      keyboard: true
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
    console.log('Loading threat data...');
    // Get data from props passed from parent component
    const propsData = window.threatMapProps || {};
    console.log('Props data available:', !!propsData.threatData);
    console.log('Props data keys:', propsData.threatData ? Object.keys(propsData.threatData) : 'none');
    
    let data;
    if (propsData.threatData && Object.keys(propsData.threatData).length > 0) {
      console.log('Using data from props:', propsData.threatData);
      // Use data from props
      data = propsData.threatData;
    } else {
      console.log('No props data available, trying API fallback...');
      try {
        // Fallback to API call
        const response = await fetch('/api/cybersecurity.json');
        if (response.ok) {
          data = await response.json();
          console.log('API data loaded:', data);
        } else {
          console.warn('API call failed, using fallback data');
          generateFallbackData();
          return;
        }
      } catch (apiError) {
        console.warn('API call failed, using fallback data:', apiError);
        generateFallbackData();
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
        const coords = getCountryCoordinates(countryName);
        if (coords) {
          threatData.push({
            position: coords,
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
        const coords = getCountryCoordinates(countryName);
        if (coords) {
          threatData.push({
            position: coords,
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
        const countryName = country.name || country.country || country.code || country.alpha2;
        const coords = getCountryCoordinates(countryName);
        if (coords) {
          threatData.push({
            position: coords,
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
        const coords = getCountryCoordinates(country.country);
        if (coords) {
          threatData.push({
            position: coords,
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
      } else {
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
        const coords = getRandomCoordinates(); // Since we don't have exact location
        threatData.push({
          position: coords,
          region: 'Global',
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
        const coords = getRandomCoordinates();
        threatData.push({
          position: coords,
          region: service.country || 'Unknown',
          type: 'vulnerability',
          count: service.count || 1,
          severity: 'medium',
          timestamp: new Date().toISOString(),
          color: getSeverityColor('medium')
        });
      });
    }
    
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
    
    // If no data was processed, use fallback data
    if (threatData.length === 0) {
      console.warn('No threat data processed, using fallback data');
      generateFallbackData();
      return;
    }
    
    console.log(`Processed ${threatData.length} threat points and ${arcData.length} attack connections`);
    console.log('Sample threat data:', threatData.slice(0, 3));
    
    // Update deck.gl layers
    updateLayers();

  } catch (error) {
    console.error('Error loading threat data:', error);
    // Use fallback data if loading fails
    console.log('Using fallback data due to error');
    generateFallbackData();
  }
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
    'French Guiana': [-53.1258, 3.9339]
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
  
  // Try partial match for common variations
  const partialMatches = {
    'usa': 'United States',
    'us': 'United States',
    'america': 'United States',
    'uk': 'United Kingdom',
    'britain': 'United Kingdom',
    'england': 'United Kingdom',
    'uae': 'United Arab Emirates',
    'emirates': 'United Arab Emirates',
    'south korea': 'South Korea',
    'north korea': 'North Korea'
  };
  
  const matchedCountry = partialMatches[lowerName];
  if (matchedCountry && countryCoords[matchedCountry]) {
    return countryCoords[matchedCountry];
  }
  
  console.warn(`Country coordinates not found for: ${countryName}`);
  return null;
}

// Helper function to get random coordinates
function getRandomCoordinates() {
  return [
    (Math.random() - 0.5) * 360, // longitude: -180 to 180
    (Math.random() - 0.5) * 180  // latitude: -90 to 90
  ];
}

// Helper function to generate attack connections
function generateAttackConnections(threats) {
  const connections = [];
  const maxConnections = Math.min(threats.length * 2, 100); // Limit connections for performance
  
  for (let i = 0; i < maxConnections; i++) {
    const source = threats[Math.floor(Math.random() * threats.length)];
    const target = threats[Math.floor(Math.random() * threats.length)];
    
    if (source !== target) {
      connections.push({
        sourcePosition: source.position,
        targetPosition: target.position,
        sourceRegion: source.region,
        targetRegion: target.region,
        type: source.type,
        timestamp: new Date().toISOString()
      });
    }
  }
  
  return connections;
}

// Generate fallback data for testing
function generateFallbackData() {
  threatData = [
    { position: [-74.006, 40.7128], region: 'New York', type: 'ddos', count: 150, severity: 'high', timestamp: new Date().toISOString(), color: [255, 100, 100] },
    { position: [2.3522, 48.8566], region: 'Paris', type: 'malware', count: 89, severity: 'medium', timestamp: new Date().toISOString(), color: [255, 165, 0] },
    { position: [139.6917, 35.6895], region: 'Tokyo', type: 'phishing', count: 234, severity: 'critical', timestamp: new Date().toISOString(), color: [255, 0, 0] },
    { position: [-0.1276, 51.5074], region: 'London', type: 'ransomware', count: 67, severity: 'high', timestamp: new Date().toISOString(), color: [255, 100, 100] },
    { position: [13.4050, 52.5200], region: 'Berlin', type: 'botnet', count: 123, severity: 'medium', timestamp: new Date().toISOString(), color: [255, 165, 0] }
  ];

  arcData = [
    { sourcePosition: [139.6917, 35.6895], targetPosition: [-74.006, 40.7128], sourceRegion: 'Tokyo', targetRegion: 'New York', type: 'ddos', timestamp: new Date().toISOString() },
    { sourcePosition: [2.3522, 48.8566], targetPosition: [-0.1276, 51.5074], sourceRegion: 'Paris', targetRegion: 'London', type: 'malware', timestamp: new Date().toISOString() },
    { sourcePosition: [13.4050, 52.5200], targetPosition: [139.6917, 35.6895], sourceRegion: 'Berlin', targetRegion: 'Tokyo', type: 'phishing', timestamp: new Date().toISOString() }
  ];

  updateLayers();
}

// Get color based on threat severity
function getSeverityColor(severity) {
  switch (severity) {
    case 'critical': return [255, 0, 0];
    case 'high': return [255, 68, 68];
    case 'medium': return [255, 165, 0];
    case 'low': return [255, 255, 0];
    default: return [0, 255, 255];
  }
}

// Update deck.gl layers with performance optimizations
function updateLayers() {
  console.log('Updating layers...');
  const currentTime = Date.now();
  
  // Ensure performanceMode is valid
  if (!performanceMode || !PERFORMANCE_SETTINGS[performanceMode]) {
    performanceMode = 'medium';
    console.warn('Performance mode not set, defaulting to medium');
  }
  
  // Throttle updates for performance
  if (currentTime - lastUpdateTime < PERFORMANCE_SETTINGS[performanceMode].updateInterval) {
    console.log('Update throttled');
    return;
  }
  lastUpdateTime = currentTime;
  
  const layers = [];
  const settings = PERFORMANCE_SETTINGS[performanceMode];
  
  // Limit data size based on performance mode
  const limitedThreatData = threatData.slice(0, settings.maxPoints);
  const limitedArcData = arcData.slice(0, settings.maxArcs);
  
  console.log(`Creating layers with ${limitedThreatData.length} threat points and ${limitedArcData.length} arcs`);

  // Scatterplot layer for threat points
  layers.push(new ScatterplotLayer({
    id: 'threat-points',
    data: limitedThreatData,
    pickable: true,
    opacity: 0.8,
    stroked: true,
    filled: true,
    radiusScale: settings.radiusScale,
    radiusMinPixels: 6,
    radiusMaxPixels: performanceMode === 'low' ? 20 : 30,
    lineWidthMinPixels: 1,
    getPosition: d => d.position,
    getRadius: d => Math.sqrt(d.count) * (performanceMode === 'low' ? 1.5 : 2),
    getFillColor: d => d.color,
    getLineColor: [255, 255, 255],
    onClick: onThreatPointClick,
    updateTriggers: {
      getPosition: threatData.length,
      getFillColor: threatData.length
    }
  }));

  // Arc layer for attack connections (country-to-country)
  if (limitedArcData.length > 0) {
    layers.push(new ArcLayer({
      id: 'attack-arcs',
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

  console.log(`Setting ${layers.length} layers on deck overlay`);
  deckOverlay.setProps({ layers });
  console.log('Layers updated successfully');
}

// Update layers with real-time animations
function updateLayersWithAnimations() {
  const layers = [];
  const settings = PERFORMANCE_SETTINGS[performanceMode];
  const animSettings = ANIMATION_SETTINGS[performanceMode];
  
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

  // Arcs, heatmap, and labels are disabled
  // Only animated threat points with pulses and explosions are shown

  deckOverlay.setProps({ layers });
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
  popup.style.cssText = `
    position: absolute;
    left: ${point.x}px;
    top: ${point.y}px;
    transform: translate(-50%, -100%);
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
  
  // Create popup content with all country attack information
  popup.innerHTML = `
    <div class="popup-header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
      <h3 style="color: #06b6d4; font-weight: 600; font-size: 16px; margin: 0;">
        ${getCountryFlag(threat.country || threat.region)} ${threat.country || threat.region || 'País Desconocido'}
      </h3>
      <button class="close-popup" style="background: none; border: none; color: #9ca3af; font-size: 18px; cursor: pointer; padding: 0; line-height: 1;">✕</button>
    </div>
    
    <div class="popup-content" style="space-y: 8px;">
      <div style="margin-bottom: 8px;">
        <span style="color: #9ca3af;">Total de Amenazas:</span>
        <span style="color: #fbbf24; margin-left: 8px; font-weight: 600;">${countryData.totalThreats}</span>
      </div>
      
      <div style="margin-bottom: 8px;">
        <span style="color: #9ca3af;">Nivel de Riesgo:</span>
        <span style="color: ${getRiskColor(countryData.riskLevel)}; margin-left: 8px; font-weight: 600; text-transform: uppercase;">${countryData.riskLevel}</span>
      </div>
      
      <div style="margin-bottom: 12px;">
        <span style="color: #9ca3af;">Última Actualización:</span>
        <span style="color: #d1d5db; margin-left: 8px;">${new Date().toLocaleString('es-ES')}</span>
      </div>
      
      <div style="border-top: 1px solid rgba(255, 255, 255, 0.1); padding-top: 12px;">
        <h4 style="color: #06b6d4; font-size: 14px; margin: 0 0 8px 0; font-weight: 600;">Desglose por Tipo:</h4>
        ${countryData.breakdown.map(item => `
          <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
            <span style="color: #d1d5db;">${item.type}:</span>
            <span style="color: ${item.color}; font-weight: 600;">${item.count}</span>
          </div>
        `).join('')}
      </div>
      
      ${countryData.recentAttacks.length > 0 ? `
        <div style="border-top: 1px solid rgba(255, 255, 255, 0.1); padding-top: 12px; margin-top: 12px;">
          <h4 style="color: #06b6d4; font-size: 14px; margin: 0 0 8px 0; font-weight: 600;">Ataques Recientes:</h4>
          ${countryData.recentAttacks.slice(0, 3).map(attack => `
            <div style="margin-bottom: 6px; padding: 6px; background: rgba(255, 255, 255, 0.05); border-radius: 4px;">
              <div style="color: #fbbf24; font-size: 12px; font-weight: 600;">${attack.type}</div>
              <div style="color: #d1d5db; font-size: 11px;">${attack.description}</div>
              <div style="color: #9ca3af; font-size: 10px;">${attack.time}</div>
            </div>
          `).join('')}
        </div>
      ` : ''}
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
  
  if (data) {
    // Count threats from different sources
    let ransomwareCount = 0;
    let ddosCount = 0;
    let malwareCount = 0;
    let phishingCount = 0;
    
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
      malwareCount = Math.floor(Math.random() * 15) + 5; // Simulated for now
    }
    
    // Phishing data (simulated)
    phishingCount = Math.floor(Math.random() * 10) + 2;
    
    totalThreats = ransomwareCount + ddosCount + malwareCount + phishingCount;
    
    // Create breakdown
    breakdown = [
      { type: 'Ransomware', count: ransomwareCount, color: '#ef4444' },
      { type: 'DDoS', count: ddosCount, color: '#f59e0b' },
      { type: 'Malware', count: malwareCount, color: '#8b5cf6' },
      { type: 'Phishing', count: phishingCount, color: '#06b6d4' }
    ];
    
    // Determine risk level
    if (totalThreats > 20) riskLevel = 'crítico';
    else if (totalThreats > 10) riskLevel = 'alto';
    else if (totalThreats > 5) riskLevel = 'medio';
    
    // Generate recent attacks
    if (data.ransomwatch?.rawData?.recentPosts) {
      data.ransomwatch.rawData.recentPosts.slice(0, 2).forEach(post => {
        recentAttacks.push({
          type: 'Ransomware',
          description: `Ataque a ${post.victim || 'objetivo no especificado'}`,
          time: `Hace ${Math.floor(Math.random() * 60)} minutos`
        });
      });
    }
    
    if (data.cloudflare?.topAttackPairs) {
      data.cloudflare.topAttackPairs.slice(0, 1).forEach(pair => {
        recentAttacks.push({
          type: 'DDoS',
          description: `Ataque DDoS detectado`,
          time: `Hace ${Math.floor(Math.random() * 30)} minutos`
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
        // Remove event details if they exist
        const eventDetails = panel.querySelector('.event-details');
        if (eventDetails) {
          eventDetails.remove();
        }
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
      performanceMode = 'medium';
    }
    
    animationTime += 0.016 * animationSpeed; // ~60fps
    
    // Update animation data
    updateAnimations();
    
    // Update layers with animations
    if (PERFORMANCE_SETTINGS[performanceMode].enableAnimations) {
      updateLayersWithAnimations();
    }
    
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
      performanceMode = 'medium';
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

// Update all animations
function updateAnimations() {
  // Generate new animations
  generateAttackAnimations();
  
  // Update and clean up pulse data
  pulseData = pulseData.filter(pulse => {
    const elapsed = animationTime - pulse.startTime;
    return elapsed < pulse.duration;
  });
  
  // Update and clean up explosion data
  explosionData = explosionData.filter(explosion => {
    const elapsed = animationTime - explosion.startTime;
    return elapsed < explosion.duration;
  });
  
  // Update and clean up attack waves
  attackWaves = attackWaves.filter(wave => {
    const elapsed = animationTime - wave.startTime;
    return elapsed < wave.duration;
  });
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

// Filtros globales
let currentFilters = {
  threatType: 'all',
  severity: 'all',
  region: 'all'
};

// API de filtros para la UI
function updateWebGLFilters(filters) {
  console.log('Actualizando filtros WebGL:', filters);
  currentFilters = { ...filters };
  
  // Filtrar datos según los filtros activos
  const filteredThreatData = threatData.filter(threat => {
    if (currentFilters.threatType !== 'all' && threat.type !== currentFilters.threatType) {
      return false;
    }
    if (currentFilters.severity !== 'all' && threat.severity !== currentFilters.severity) {
      return false;
    }
    if (currentFilters.region !== 'all' && !threat.region.toLowerCase().includes(currentFilters.region.toLowerCase())) {
      return false;
    }
    return true;
  });
  
  const filteredArcData = arcData.filter(arc => {
    if (currentFilters.region !== 'all') {
      const regionMatch = arc.sourceRegion.toLowerCase().includes(currentFilters.region.toLowerCase()) ||
                         arc.targetRegion.toLowerCase().includes(currentFilters.region.toLowerCase());
      if (!regionMatch) return false;
    }
    return true;
  });
  
  // Actualizar capas con datos filtrados
  updateLayersWithFilters(filteredThreatData, filteredArcData);
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
    getPosition: d => d.position,
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

// Export for global access
window.initWebGLThreatMap = initWebGLThreatMap;
window.loadThreatData = loadThreatData;
window.updateLayers = updateLayers;
window.generateFallbackData = generateFallbackData;
window.cleanupMap = cleanupMap;
window.startAnimationLoop = startAnimationLoop;
window.stopAnimationLoop = stopAnimationLoop;
window.updateWebGLFilters = updateWebGLFilters;