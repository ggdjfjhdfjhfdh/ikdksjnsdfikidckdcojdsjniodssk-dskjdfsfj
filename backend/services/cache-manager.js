import { fetchAllThreatData } from './cybersecurity-api.js';

// In-memory cache
let threatDataCache = null;
let lastUpdateTime = null;
const CACHE_DURATION = 3 * 60 * 1000; // 3 minutes for fresher data
let isInitializing = false;

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
    console.log('📋 Serving threat data from cache (age: ' + Math.round((now - lastUpdateTime) / 1000) + 's)');
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
  
  // If cache exists but is expired, serve stale data while updating in background
  if (threatDataCache && !isInitializing) {
    console.log('📋 Serving stale cache while updating in background...');
    cacheStats.hits++;
    
    // Update cache in background
    updateThreatCache().catch(error => {
      console.error('❌ Background cache update failed:', error);
    });
    
    return {
      ...threatDataCache,
      metadata: {
        ...threatDataCache.metadata,
        cached: true,
        stale: true,
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
export async function startCacheUpdates() {
  console.log('🚀 Starting automatic cache updates...');
  
  // Aggressive initial cache preload
  isInitializing = true;
  try {
    console.log('🔄 Preloading cache with fresh data...');
    await updateThreatCache();
    console.log('✅ Initial cache preload completed successfully');
  } catch (error) {
    console.error('❌ Error during initial cache preload:', error);
    // Try to get any available data even if some sources fail
    try {
      await getCachedThreatData();
    } catch (fallbackError) {
      console.error('❌ Complete cache initialization failed:', fallbackError);
    }
  } finally {
    isInitializing = false;
  }
  
  // Set up periodic updates every 3 minutes
  const updateInterval = setInterval(async () => {
    try {
      console.log('🔄 Running scheduled cache update...');
      await updateThreatCache();
      console.log('✅ Scheduled cache update completed');
    } catch (error) {
      console.error('❌ Error during scheduled cache update:', error);
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
  
  console.log('✅ Automatic cache updates started with 3-minute intervals');
}