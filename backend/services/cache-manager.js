import { fetchAllThreatData } from './cybersecurity-api.js';

// In-memory cache
let threatDataCache = null;
let lastUpdateTime = null;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Cache statistics
let cacheStats = {
  hits: 0,
  misses: 0,
  updates: 0,
  errors: 0,
  lastError: null
};

/**
 * Get cached threat data or fetch new data if cache is expired
 */
export async function getCachedThreatData() {
  const now = Date.now();
  
  // Check if cache is valid
  if (threatDataCache && lastUpdateTime && (now - lastUpdateTime) < CACHE_DURATION) {
    cacheStats.hits++;
    console.log('📋 Serving threat data from cache');
    return {
      ...threatDataCache,
      metadata: {
        ...threatDataCache.metadata,
        cached: true,
        cacheAge: now - lastUpdateTime,
        cacheStats
      }
    };
  }
  
  // Cache miss or expired - fetch new data
  cacheStats.misses++;
  console.log('🔄 Cache miss or expired, fetching fresh data...');
  
  try {
    const freshData = await fetchAllThreatData();
    
    // Update cache
    threatDataCache = freshData;
    lastUpdateTime = now;
    cacheStats.updates++;
    
    console.log('✅ Cache updated with fresh threat data');
    
    return {
      ...freshData,
      metadata: {
        ...freshData.metadata,
        cached: false,
        cacheAge: 0,
        cacheStats
      }
    };
  } catch (error) {
    cacheStats.errors++;
    cacheStats.lastError = {
      message: error.message,
      timestamp: new Date().toISOString()
    };
    
    console.error('❌ Error fetching fresh threat data:', error);
    
    // Return stale cache if available, otherwise throw error
    if (threatDataCache) {
      console.log('⚠️ Returning stale cache data due to fetch error');
      return {
        ...threatDataCache,
        metadata: {
          ...threatDataCache.metadata,
          cached: true,
          stale: true,
          cacheAge: now - lastUpdateTime,
          cacheStats,
          error: error.message
        }
      };
    }
    
    throw error;
  }
}

/**
 * Force update the threat data cache
 */
export async function updateThreatCache() {
  console.log('🔄 Force updating threat data cache...');
  
  try {
    const freshData = await fetchAllThreatData();
    
    threatDataCache = freshData;
    lastUpdateTime = Date.now();
    cacheStats.updates++;
    
    console.log('✅ Threat data cache force updated');
    return freshData;
  } catch (error) {
    cacheStats.errors++;
    cacheStats.lastError = {
      message: error.message,
      timestamp: new Date().toISOString()
    };
    
    console.error('❌ Error force updating cache:', error);
    throw error;
  }
}

/**
 * Get cache statistics
 */
export function getCacheStats() {
  return {
    ...cacheStats,
    cacheSize: threatDataCache ? JSON.stringify(threatDataCache).length : 0,
    lastUpdateTime: lastUpdateTime ? new Date(lastUpdateTime).toISOString() : null,
    cacheAge: lastUpdateTime ? Date.now() - lastUpdateTime : null,
    isValid: lastUpdateTime ? (Date.now() - lastUpdateTime) < CACHE_DURATION : false
  };
}

/**
 * Clear the cache
 */
export function clearCache() {
  threatDataCache = null;
  lastUpdateTime = null;
  console.log('🗑️ Threat data cache cleared');
}

/**
 * Reset cache statistics
 */
export function resetCacheStats() {
  cacheStats = {
    hits: 0,
    misses: 0,
    updates: 0,
    errors: 0,
    lastError: null
  };
  console.log('📊 Cache statistics reset');
}

/**
 * Start automatic cache updates
 */
export function startCacheUpdates() {
  console.log('🚀 Starting automatic cache updates...');
  
  // Initial cache load
  getCachedThreatData().catch(error => {
    console.error('❌ Error during initial cache load:', error);
  });
  
  // Set up periodic updates every 5 minutes
  const updateInterval = setInterval(async () => {
    try {
      await updateThreatCache();
      console.log('🔄 Automatic cache update completed');
    } catch (error) {
      console.error('❌ Error during automatic cache update:', error);
    }
  }, CACHE_DURATION);
  
  // Cleanup on process termination
  process.on('SIGTERM', () => {
    clearInterval(updateInterval);
    console.log('🛑 Cache update interval cleared');
  });
  
  process.on('SIGINT', () => {
    clearInterval(updateInterval);
    console.log('🛑 Cache update interval cleared');
  });
  
  console.log('✅ Automatic cache updates started');
}