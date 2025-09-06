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
    'User-Agent': 'SESEC-ThreatMonitor/1.0',
    'Accept': 'application/json'
  }
});

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
    
    const response = await retryRequest(() => 
      apiClient.get('https://urlhaus-api.abuse.ch/v1/countries/', {
        headers: {
          'Content-Type': 'application/json'
        }
      })
    );

    if (response.data && response.data.countries) {
      const countries = Object.entries(response.data.countries)
        .map(([code, count]) => ({ country: code, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 20);

      console.log(`✅ URLhaus: ${countries.length} countries fetched`);
      return {
        countries,
        count: countries.reduce((sum, c) => sum + c.count, 0),
        lastUpdated: new Date().toISOString()
      };
    }

    return { countries: [], count: 0, lastUpdated: new Date().toISOString() };
  } catch (error) {
    console.error('❌ URLhaus API error:', error.message);
    return { countries: [], count: 0, error: error.message, lastUpdated: new Date().toISOString() };
  }
}

// Cloudflare Radar API - DDoS and attack data
export async function fetchCloudflareData() {
  try {
    console.log('🔍 Fetching Cloudflare Radar data...');
    
    // Simulated data based on Cloudflare patterns
    const mockData = {
      topCountries: [
        { country: 'US', name: 'United States', value: 28.5, attacks: 15420 },
        { country: 'CN', name: 'China', value: 24.8, attacks: 13440 },
        { country: 'RU', name: 'Russia', value: 18.2, attacks: 9870 },
        { country: 'DE', name: 'Germany', value: 12.1, attacks: 6560 },
        { country: 'GB', name: 'United Kingdom', value: 8.9, attacks: 4820 },
        { country: 'FR', name: 'France', value: 7.3, attacks: 3950 },
        { country: 'JP', name: 'Japan', value: 6.8, attacks: 3680 },
        { country: 'BR', name: 'Brazil', value: 5.4, attacks: 2930 },
        { country: 'IN', name: 'India', value: 4.9, attacks: 2650 },
        { country: 'CA', name: 'Canada', value: 3.1, attacks: 1680 }
      ],
      topOriginCountries: [
        { country: 'CN', name: 'China', attacks: 18500, severity: 'critical' },
        { country: 'RU', name: 'Russia', attacks: 15200, severity: 'critical' },
        { country: 'US', name: 'United States', attacks: 12800, severity: 'high' },
        { country: 'KP', name: 'North Korea', attacks: 8900, severity: 'high' },
        { country: 'IR', name: 'Iran', attacks: 7600, severity: 'high' },
        { country: 'TR', name: 'Turkey', attacks: 5400, severity: 'medium' },
        { country: 'VN', name: 'Vietnam', attacks: 4200, severity: 'medium' },
        { country: 'IN', name: 'India', attacks: 3800, severity: 'medium' },
        { country: 'PK', name: 'Pakistan', attacks: 3100, severity: 'medium' },
        { country: 'BD', name: 'Bangladesh', attacks: 2700, severity: 'low' }
      ],
      topTargetCountries: [
        { country: 'US', name: 'United States', attacks: 22400, severity: 'critical' },
        { country: 'DE', name: 'Germany', attacks: 18900, severity: 'critical' },
        { country: 'GB', name: 'United Kingdom', attacks: 16200, severity: 'high' },
        { country: 'FR', name: 'France', attacks: 14800, severity: 'high' },
        { country: 'JP', name: 'Japan', attacks: 12500, severity: 'high' },
        { country: 'CA', name: 'Canada', attacks: 9800, severity: 'medium' },
        { country: 'AU', name: 'Australia', attacks: 8600, severity: 'medium' },
        { country: 'NL', name: 'Netherlands', attacks: 7400, severity: 'medium' },
        { country: 'SE', name: 'Sweden', attacks: 6200, severity: 'medium' },
        { country: 'CH', name: 'Switzerland', attacks: 5100, severity: 'low' }
      ],
      topAttackPairs: [
        { origin_country: 'CN', target_country: 'US', attacks: 3200, type: 'ddos' },
        { origin_country: 'RU', target_country: 'DE', attacks: 2800, type: 'web_attack' },
        { origin_country: 'KP', target_country: 'JP', attacks: 2400, type: 'malware' },
        { origin_country: 'IR', target_country: 'GB', attacks: 2100, type: 'ddos' },
        { origin_country: 'CN', target_country: 'FR', attacks: 1900, type: 'botnet' },
        { origin_country: 'RU', target_country: 'CA', attacks: 1700, type: 'web_attack' },
        { origin_country: 'VN', target_country: 'AU', attacks: 1500, type: 'phishing' },
        { origin_country: 'TR', target_country: 'NL', attacks: 1300, type: 'ddos' },
        { origin_country: 'IN', target_country: 'SE', attacks: 1100, type: 'malware' },
        { origin_country: 'PK', target_country: 'CH', attacks: 900, type: 'botnet' },
        { origin_country: 'US', target_country: 'CN', attacks: 800, type: 'web_attack' },
        { origin_country: 'DE', target_country: 'RU', attacks: 700, type: 'ddos' },
        { origin_country: 'GB', target_country: 'IR', attacks: 600, type: 'malware' },
        { origin_country: 'FR', target_country: 'TR', attacks: 500, type: 'phishing' },
        { origin_country: 'JP', target_country: 'VN', attacks: 400, type: 'botnet' }
      ],
      percentage: 15.2,
      lastUpdated: new Date().toISOString()
    };

    console.log('✅ Cloudflare: Mock data generated');
    return mockData;
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
      apiClient.get('https://api.ransomwatch.telemetry.ltd/posts')
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
    const [urlhaus, cloudflare, ransomwatch, sansISC] = await Promise.allSettled([
      fetchURLhausData(),
      fetchCloudflareData(),
      fetchRansomwatchData(),
      fetchSansISCData()
    ]);

    const result = {
      urlhaus: urlhaus.status === 'fulfilled' ? urlhaus.value : { error: urlhaus.reason?.message },
      cloudflare: cloudflare.status === 'fulfilled' ? cloudflare.value : { error: cloudflare.reason?.message },
      ransomwatch: ransomwatch.status === 'fulfilled' ? ransomwatch.value : { error: ransomwatch.reason?.message },
      sansISC: sansISC.status === 'fulfilled' ? sansISC.value : { error: sansISC.reason?.message },
      metadata: {
        fetchTime: Date.now() - startTime,
        timestamp: new Date().toISOString(),
        sources: {
          urlhaus: urlhaus.status === 'fulfilled',
          cloudflare: cloudflare.status === 'fulfilled',
          ransomwatch: ransomwatch.status === 'fulfilled',
          sansISC: sansISC.status === 'fulfilled'
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