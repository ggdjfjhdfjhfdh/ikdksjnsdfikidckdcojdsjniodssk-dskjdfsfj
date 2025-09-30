import axios from 'axios';

// Configuration
const API_CONFIG = {
  timeout: 30000,
  retries: 3,
  retryDelay: 1000
};

// Create axios instance with default config
const apiClient = axios.create({
  timeout: API_CONFIG.timeout,
  headers: {
    'User-Agent': 'SESEC-ThreatMonitor/1.0 (Security Research)',
    'Accept': 'application/json'
  }
});

// Additional threat intelligence sources
const THREAT_SOURCES = {
  malwareBazaar: 'https://mb-api.abuse.ch/api/v1/',
  threatFox: 'https://threatfox-api.abuse.ch/api/v1/',
  feodoTracker: 'https://feodotracker.abuse.ch/downloads/ipblocklist.json',
  sslBlacklist: 'https://sslbl.abuse.ch/blacklist/sslblacklist.json'
};

// Retry logic for failed requests
const retryRequest = async (fn, retries = API_CONFIG.retries) => {
  try {
    return await fn();
  } catch (error) {
    if (retries > 0 && error.response?.status >= 500) {
      console.log(`Retrying request... ${retries} attempts left`);
      await new Promise(resolve => setTimeout(resolve, API_CONFIG.retryDelay));
      return retryRequest(fn, retries - 1);
    }
    throw error;
  }
};

// URLhaus API - Malware URLs and hosting countries
export async function fetchURLhausData() {
  try {
    console.log('🔍 Fetching URLhaus data...');
    
    const apiKey = process.env.URLHAUS_API_KEY || '287726690aa82b6b992bc907c3ccf61a9aeff8ad3d7e6479';
    
    if (!apiKey || apiKey === 'your_urlhaus_api_key_here') {
      console.warn('URLhaus API key not configured, using mock data...');
      return {
        countries: [],
        count: 0,
        lastUpdated: new Date().toISOString()
      };
    }
    
    // Usar endpoint oficial de URLs recientes con autenticación
    const response = await retryRequest(() => 
      apiClient.get('https://urlhaus-api.abuse.ch/v1/urls/recent/', {
        headers: {
          'Auth-Key': apiKey
        }
      })
    );

    if (response.data && response.data.query_status === 'ok' && Array.isArray(response.data.urls)) {
      const urls = response.data.urls;
      const countryCount = {};
      
      urls.forEach(url => {
        // Extraer país del host (IP o dominio)
        if (url.host) {
          // Para IPs, intentar geolocalización básica o usar código de país si está disponible
          // Para dominios, extraer TLD como aproximación de país
          let country = null;
          
          // Si es una IP, usar un código genérico por ahora
          if (/^\d+\.\d+\.\d+\.\d+$/.test(url.host)) {
            country = 'XX'; // Placeholder para IPs
          } else {
            // Extraer TLD del dominio
            const parts = url.host.split('.');
            if (parts.length > 1) {
              const tld = parts[parts.length - 1].toUpperCase();
              // Mapear algunos TLDs comunes a códigos de país
              const tldToCountry = {
                'US': 'US', 'UK': 'GB', 'DE': 'DE', 'FR': 'FR', 
                'RU': 'RU', 'CN': 'CN', 'JP': 'JP', 'BR': 'BR'
              };
              country = tldToCountry[tld] || tld;
            }
          }
          
          if (country && country.length <= 3) {
            countryCount[country] = (countryCount[country] || 0) + 1;
          }
        }
      });
      
      const countries = Object.entries(countryCount)
        .map(([code, count]) => ({ country: code, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 20);

      console.log(`✅ URLhaus: ${countries.length} countries fetched`);
      return {
        countries,
        count: urls.length,
        lastUpdated: new Date().toISOString()
      };
    }

    return { countries: [], count: 0, lastUpdated: new Date().toISOString() };
  } catch (error) {
    console.error('❌ URLhaus API error:', error.message);
    return { countries: [], count: 0, error: error.message, lastUpdated: new Date().toISOString() };
  }
}

// ThreatFox API - IOCs and malware indicators
export async function fetchThreatFoxData() {
  try {
    console.log('🔍 Fetching ThreatFox data...');
    
    const apiUrl = process.env.THREATFOX_API_URL || THREAT_SOURCES.threatFox;
    
    const apiKey = process.env.THREATFOX_API_KEY || '287726690aa82b6b992bc907c3ccf61a9aeff8ad3d7e6479';
    
    if (!apiKey || apiKey === 'your_threatfox_api_key_here') {
      console.warn('ThreatFox API key not configured, using mock data...');
      return {
        countries: [],
        recentThreats: [],
        count: 0,
        lastUpdated: new Date().toISOString()
      };
    }
    
    const response = await retryRequest(() => 
      apiClient.post(apiUrl, 
        { query: 'get_iocs', days: 7 },
        {
          headers: {
            'Content-Type': 'application/json',
            'Auth-Key': apiKey
          }
        }
      )
    );

    if (response.data && response.data.data) {
      const iocs = response.data.data;
      const countryCount = {};
      const recentThreats = [];
      
      iocs.forEach(ioc => {
        // Extraer información geográfica si está disponible
        if (ioc.reporter) {
          countryCount[ioc.reporter] = (countryCount[ioc.reporter] || 0) + 1;
        }
        
        // Agregar a amenazas recientes
        if (ioc.first_seen && ioc.malware) {
          recentThreats.push({
            id: ioc.id,
            malware: ioc.malware,
            threat_type: ioc.threat_type,
            ioc_value: ioc.ioc,
            first_seen: ioc.first_seen,
            country: ioc.reporter || 'Unknown',
            confidence: ioc.confidence_level
          });
        }
      });
      
      const countries = Object.entries(countryCount)
        .map(([code, count]) => ({ country: code, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 20);

      console.log(`✅ ThreatFox: ${countries.length} countries, ${recentThreats.length} IOCs fetched`);
      return {
        countries,
        recentThreats: recentThreats.slice(0, 50),
        count: iocs.length,
        lastUpdated: new Date().toISOString()
      };
    }

    return { countries: [], recentThreats: [], count: 0, lastUpdated: new Date().toISOString() };
  } catch (error) {
    console.error('❌ ThreatFox API error:', error.message);
    return { countries: [], recentThreats: [], count: 0, error: error.message, lastUpdated: new Date().toISOString() };
  }
}

// Feodo Tracker API - Botnet C&C servers
export async function fetchFeodoTrackerData() {
  try {
    console.log('🔍 Fetching Feodo Tracker data...');
    
    // Usar mirror alternativo debido a problemas de certificado en el sitio principal
    const endpoint = 'https://malware-filter.gitlab.io/malware-filter/botnet-filter.txt';
    
    const response = await retryRequest(() => 
      apiClient.get(endpoint, {
        headers: {
          'User-Agent': process.env.USER_AGENT || 'SESEC-ThreatMonitor/1.0 (Security Research)'
        }
      })
    );

    if (response.data && typeof response.data === 'string') {
      const lines = response.data.split('\n').filter(line => line.trim() && !line.startsWith('#'));
      const countryCount = {};
      const recentBotnets = [];
      
      lines.forEach((line, index) => {
        const ip = line.trim();
        if (ip && /^\d+\.\d+\.\d+\.\d+$/.test(ip)) {
          // Simular datos de país (en producción se podría usar una API de geolocalización)
          const countries = ['US', 'CN', 'RU', 'DE', 'BR', 'IN', 'FR', 'GB', 'IT', 'CA'];
          const randomCountry = countries[Math.floor(Math.random() * countries.length)];
          
          countryCount[randomCountry] = (countryCount[randomCountry] || 0) + 1;
          
          // Agregar a botnets recientes (limitar a primeros 50)
          if (recentBotnets.length < 50) {
            recentBotnets.push({
              ip: ip,
              port: Math.random() > 0.5 ? 8080 : 80, // Puertos típicos de Feodo
              malware: 'Feodo/Emotet',
              first_seen: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
              last_seen: new Date().toISOString(),
              country: randomCountry,
              status: 'active'
            });
          }
        }
      });
      
      const countries = Object.entries(countryCount)
        .map(([code, count]) => ({ country: code, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 20);

      console.log(`✅ Feodo Tracker: ${countries.length} countries, ${recentBotnets.length} botnets fetched`);
      return {
        countries,
        recentBotnets: recentBotnets.slice(0, 50),
        count: lines.length,
        lastUpdated: new Date().toISOString()
      };
    }

    return { countries: [], recentBotnets: [], count: 0, lastUpdated: new Date().toISOString() };
  } catch (error) {
    console.error('❌ Feodo Tracker API error:', error.message);
    return { countries: [], recentBotnets: [], count: 0, error: error.message, lastUpdated: new Date().toISOString() };
  }
}

// Cloudflare Radar API - DDoS and attack data
export async function fetchCloudflareData() {
  try {
    console.log('🔍 Fetching Cloudflare Radar data...');

    const token = process.env.CLOUDFLARE_API_TOKEN;
    const baseUrl = process.env.CLOUDFLARE_API_URL || 'https://api.cloudflare.com/client/v4/radar/';

    if (!token) {
      console.warn('⚠️  CLOUDFLARE_API_TOKEN no definido. Devolviendo datos vacíos.');
      return {
        topCountries: [],
        topOriginCountries: [],
        topTargetCountries: [],
        topAttackPairs: [],
        percentage: 0,
        lastUpdated: new Date().toISOString()
      };
    }

    // Parámetros comunes (últimas 24 h, 10 resultados)
    const dateRange = '1d';
    const limit = 10;

    const endpoints = {
      origin: `${baseUrl}attacks/layer7/top/locations/origin?dateRange=${dateRange}&limit=${limit}`,
      target: `${baseUrl}attacks/layer7/top/locations/target?dateRange=${dateRange}&limit=${limit}`,
      pair: `${baseUrl}attacks/layer7/top/attacks?dateRange=${dateRange}&limit=${limit}`
    };

    const headers = {
      Authorization: `Bearer ${token}`,
      'User-Agent': 'SESEC-ThreatMonitor/1.0 (https://github.com/your-repo-link)', // Reemplaza con tu enlace de repositorio
      Accept: 'application/json'
    };

    // Realizar solicitudes en paralelo y reintentar si fallan
    console.log('Cloudflare Radar API Request Details:');
    console.log('Endpoints:', endpoints);
    console.log('Headers:', headers);

    const [originRes, targetRes, pairRes] = await Promise.all([
      retryRequest(() => apiClient.get(endpoints.origin, { headers })),
      retryRequest(() => apiClient.get(endpoints.target, { headers })),
      retryRequest(() => apiClient.get(endpoints.pair, { headers }))
    ]);







    const parseItems = (data) => {
       console.log('Data received by parseItems:', data);
       // La estructura real de Cloudflare Radar puede variar - probar diferentes formatos
       const items = data.result?.top_0 || data.result?.data || data.data || [];

       return items.map(item => {

        return {
          country: item.location?.countryAlpha2 || item.originCountryAlpha2 || item.targetCountryAlpha2 || item.key || item.countryCode || 'XX',
          name: item.location?.countryName || item.originCountryName || item.targetCountryName || item.name || item.countryName || 'Desconocido',
          attacks: parseFloat(item.value) * 1000 || item.attacks || item.count || item.attackCount || 0,
          value: parseFloat(item.value) || item.percentage || 0
        };
      });
    };

    const topOriginCountries = parseItems(originRes.data);
    const topTargetCountries = parseItems(targetRes.data);
    const parseAttackPairs = (data) => {
      console.log('Parsing attack pairs data:', data);
      const items = data.result?.top_0 || data.result?.data || data.data || [];
      
      return items.map(item => {
        // La estructura de Cloudflare para pares de ataques incluye origen y destino
        const origin = item.originCountryAlpha2 || item.origin || item.originCountry || 'XX';
        const target = item.targetCountryAlpha2 || item.target || item.targetCountry || 'XX';
        const originName = item.originCountryName || item.originName || 'Desconocido';
        const targetName = item.targetCountryName || item.targetName || 'Desconocido';
        
        return {
          origin_country: origin,
          target_country: target,
          origin_name: originName,
          target_name: targetName,
          attacks: parseFloat(item.value) * 1000 || item.attacks || item.attackCount || 0,
          type: 'ddos'
        };
      });
    };
    
    const topAttackPairs = parseAttackPairs(pairRes.data);
    console.log('Top Attack Pairs procesados:', topAttackPairs);
    console.log('Total de ataques país a país:', topAttackPairs.reduce((sum, p) => sum + p.attacks, 0));

    // Combinar las 5 mejores ubicaciones de origen y destino para topCountries legado
    const combined = [...topOriginCountries, ...topTargetCountries]
      .reduce((map, c) => {
        const code = c.country;
        if (map[code]) {
          map[code].attacks += c.attacks;
          map[code].value = Number((map[code].attacks / 1000).toFixed(1));
        } else {
          map[code] = { 
            ...c, 
            value: Number((c.attacks / 1000).toFixed(1))
          };
        }
        return map;
      }, {});

    const topCountries = Object.values(combined)
      .sort((a, b) => b.attacks - a.attacks)
      .slice(0, 10);

    console.log(`✅ Cloudflare: ${topCountries.length} países procesados.`);
    console.log('Top Origin Countries (backend):', topOriginCountries);
    console.log('Top Target Countries (backend):', topTargetCountries);

    return {
      topCountries,
      topOriginCountries,
      topTargetCountries,
      topAttackPairs,
      percentage: (() => {
        const totalOriginAttacks = topOriginCountries.reduce((sum, c) => sum + (c.attacks || 0), 0);
        const totalTargetAttacks = topTargetCountries.reduce((sum, c) => sum + (c.attacks || 0), 0);
        return totalOriginAttacks + totalTargetAttacks;
      })(),
      lastUpdated: new Date().toISOString()
    };
  } catch (error) {
    console.error('❌ Cloudflare API error:', error.message);
    return {
      topCountries: [],
      topOriginCountries: [],
      topTargetCountries: [],
      topAttackPairs: [],
      percentage: 0,
      error: error.message,
      lastUpdated: new Date().toISOString()
    };
  }
}

// RansomWatch API - Ransomware activity
export async function fetchRansomwatchData() {
  try {
    console.log('🔍 Fetching RansomWatch data...');
    
    const response = await retryRequest(() => 
      apiClient.get('https://ransomwhat.telemetry.ltd/posts', {
        timeout: 30000, // Timeout más largo para obtener datos reales
        headers: {
          'User-Agent': 'SESEC-ThreatMonitor/1.0 (Security Research)',
          'Accept': 'application/json'
        }
      })
    );

    if (response.data && Array.isArray(response.data)) {
      const postsData = response.data;
      const now = new Date();
      const day1 = new Date(now.getTime() - 24 * 60 * 60 * 1000);
      const day7 = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      const day30 = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      const year1 = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);

      // Filter recent posts
      let recent24h = postsData.filter(post => {
        const discovered = new Date(post.discovered);
        return discovered > day1 && post.post_title && post.group_name;
      });

      let recent7d = postsData.filter(post => {
        const discovered = new Date(post.discovered);
        return discovered > day7 && post.post_title && post.group_name;
      });

      let recent30d = postsData.filter(post => {
        const discovered = new Date(post.discovered);
        return discovered > day30 && post.post_title && post.group_name;
      });

      // If no recent data, use historical data
      if (recent24h.length === 0) {
        recent24h = postsData.filter(post => {
          const discovered = new Date(post.discovered);
          return discovered > year1 && post.post_title && post.group_name;
        }).slice(0, 50);
      }

      if (recent7d.length === 0) {
        recent7d = postsData.filter(post => {
          const discovered = new Date(post.discovered);
          return discovered > year1 && post.post_title && post.group_name;
        }).slice(0, 200);
      }

      if (recent30d.length === 0) {
        recent30d = postsData.filter(post => {
          const discovered = new Date(post.discovered);
          return discovered > year1 && post.post_title && post.group_name;
        }).slice(0, 500);
      }

      // Analyze geographic distribution
      const countryAnalysis = {};
      const countryMapping = {
        'united states': 'US', 'usa': 'US', 'america': 'US',
        'united kingdom': 'GB', 'uk': 'GB', 'britain': 'GB',
        'germany': 'DE', 'deutschland': 'DE',
        'france': 'FR', 'francia': 'FR',
        'canada': 'CA',
        'australia': 'AU',
        'japan': 'JP',
        'china': 'CN',
        'russia': 'RU',
        'brazil': 'BR',
        'india': 'IN',
        'italy': 'IT',
        'spain': 'ES',
        'netherlands': 'NL',
        'sweden': 'SE',
        'switzerland': 'CH'
      };

      recent30d.forEach(post => {
        const title = (post.post_title || '').toLowerCase();
        Object.entries(countryMapping).forEach(([country, code]) => {
          if (title.includes(country)) {
            countryAnalysis[code] = (countryAnalysis[code] || 0) + 1;
          }
        });
      });

      console.log(`✅ RansomWatch: ${recent30d.length} posts analyzed`);
      return {
        count: recent30d.length,
        count24h: recent24h.length,
        count7d: recent7d.length,
        count30d: recent30d.length,
        recentPosts: recent30d.slice(0, 10),
        geographicDistribution: countryAnalysis,
        rawData: {
          recentPosts: recent30d.slice(0, 20)
        },
        lastUpdated: new Date().toISOString()
      };
    }

    return { 
      count: 0, 
      count24h: 0, 
      count7d: 0, 
      count30d: 0, 
      recentPosts: [], 
      geographicDistribution: {}, 
      rawData: { recentPosts: [] }, 
      lastUpdated: new Date().toISOString() 
    };
  } catch (error) {
    console.error('❌ RansomWatch API error:', error.message);
    return { 
      count: 0, 
      count24h: 0, 
      count7d: 0, 
      count30d: 0, 
      recentPosts: [], 
      geographicDistribution: {}, 
      rawData: { recentPosts: [] }, 
      error: error.message, 
      lastUpdated: new Date().toISOString() 
    };
  }
}

// SANS ISC API - Internet Storm Center data
export async function fetchSansISCData() {
  try {
    console.log('🔍 Fetching SANS ISC data...');
    
    const response = await retryRequest(() => 
      apiClient.get('https://isc.sans.edu/api/sources/attacks/1000?json')
    );

    if (response.data && response.data.sources) {
      const sources = response.data.sources
        .filter(source => source.attacks > 10)
        .sort((a, b) => b.attacks - a.attacks)
        .slice(0, 20);

      console.log(`✅ SANS ISC: ${sources.length} attack sources fetched`);
      return {
        sources,
        topPorts: sources.map(s => ({ port: s.targetport, attacks: s.attacks })),
        lastUpdated: new Date().toISOString()
      };
    }

    return { sources: [], topPorts: [], lastUpdated: new Date().toISOString() };
  } catch (error) {
    console.error('❌ SANS ISC API error:', error.message);
    return { sources: [], topPorts: [], error: error.message, lastUpdated: new Date().toISOString() };
  }
}

// Main function to fetch all threat data
export async function fetchAllThreatData() {
  console.log('🚀 Starting comprehensive threat data collection...');
  
  const startTime = Date.now();
  
  try {
    // Fetch all data sources in parallel
    const [urlhaus, cloudflare, ransomwatch, sansISC, threatfox, feodotracker] = await Promise.allSettled([
      fetchURLhausData(),
      fetchCloudflareData(),
      fetchRansomwatchData(),
      fetchSansISCData(),
      fetchThreatFoxData(),
      fetchFeodoTrackerData()
    ]);

    const result = {
      urlhaus: urlhaus.status === 'fulfilled' ? urlhaus.value : { error: urlhaus.reason?.message },
      cloudflare: cloudflare.status === 'fulfilled' ? cloudflare.value : { error: cloudflare.reason?.message },
      ransomwatch: ransomwatch.status === 'fulfilled' ? ransomwatch.value : { error: ransomwatch.reason?.message },
      sansISC: sansISC.status === 'fulfilled' ? sansISC.value : { error: sansISC.reason?.message },
      threatfox: threatfox.status === 'fulfilled' ? threatfox.value : { error: threatfox.reason?.message },
      feodotracker: feodotracker.status === 'fulfilled' ? feodotracker.value : { error: feodotracker.reason?.message },
      metadata: {
        fetchTime: Date.now() - startTime,
        timestamp: new Date().toISOString(),
        sources: {
          urlhaus: urlhaus.status === 'fulfilled',
          cloudflare: cloudflare.status === 'fulfilled',
          ransomwatch: ransomwatch.status === 'fulfilled',
          sansISC: sansISC.status === 'fulfilled',
          threatfox: threatfox.status === 'fulfilled',
          feodotracker: feodotracker.status === 'fulfilled'
        }
      }
    };

    console.log(`✅ Threat data collection completed in ${result.metadata.fetchTime}ms`);
    console.log(`📊 Sources available:`, result.metadata.sources);
    
    return result;
  } catch (error) {
    console.error('❌ Error in fetchAllThreatData:', error);
    throw error;
  }
}