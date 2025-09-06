import express from 'express';
import { getCachedThreatData, updateThreatCache, getCacheStats, clearCache } from '../services/cache-manager.js';

const router = express.Router();

/**
 * GET /api/threat/data
 * Get comprehensive threat data from all sources
 */
router.get('/data', async (req, res) => {
  try {
    console.log('📊 Threat data requested from:', req.ip);
    
    const threatData = await getCachedThreatData();
    
    res.json({
      success: true,
      data: threatData,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('❌ Error fetching threat data:', error);
    
    res.status(500).json({
      success: false,
      error: 'Failed to fetch threat data',
      message: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

/**
 * POST /api/threat/refresh
 * Force refresh threat data cache
 */
router.post('/refresh', async (req, res) => {
  try {
    console.log('🔄 Cache refresh requested from:', req.ip);
    
    const freshData = await updateThreatCache();
    
    res.json({
      success: true,
      message: 'Threat data cache refreshed successfully',
      data: freshData,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('❌ Error refreshing cache:', error);
    
    res.status(500).json({
      success: false,
      error: 'Failed to refresh threat data cache',
      message: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

/**
 * GET /api/threat/stats
 * Get cache statistics and system info
 */
router.get('/stats', (req, res) => {
  try {
    const stats = getCacheStats();
    
    res.json({
      success: true,
      stats,
      system: {
        uptime: process.uptime(),
        memory: process.memoryUsage(),
        nodeVersion: process.version,
        platform: process.platform
      },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('❌ Error getting stats:', error);
    
    res.status(500).json({
      success: false,
      error: 'Failed to get statistics',
      message: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

/**
 * DELETE /api/threat/cache
 * Clear threat data cache
 */
router.delete('/cache', (req, res) => {
  try {
    console.log('🗑️ Cache clear requested from:', req.ip);
    
    clearCache();
    
    res.json({
      success: true,
      message: 'Threat data cache cleared successfully',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('❌ Error clearing cache:', error);
    
    res.status(500).json({
      success: false,
      error: 'Failed to clear cache',
      message: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

/**
 * GET /api/threat/sources
 * Get available data sources and their status
 */
router.get('/sources', async (req, res) => {
  try {
    const threatData = await getCachedThreatData();
    
    const sources = {
      urlhaus: {
        available: !threatData.urlhaus?.error,
        lastUpdated: threatData.urlhaus?.lastUpdated,
        error: threatData.urlhaus?.error,
        dataPoints: threatData.urlhaus?.countries?.length || 0
      },
      cloudflare: {
        available: !threatData.cloudflare?.error,
        lastUpdated: threatData.cloudflare?.lastUpdated,
        error: threatData.cloudflare?.error,
        dataPoints: threatData.cloudflare?.topCountries?.length || 0
      },
      ransomwatch: {
        available: !threatData.ransomwatch?.error,
        lastUpdated: threatData.ransomwatch?.lastUpdated,
        error: threatData.ransomwatch?.error,
        dataPoints: threatData.ransomwatch?.count || 0
      },
      sansISC: {
        available: !threatData.sansISC?.error,
        lastUpdated: threatData.sansISC?.lastUpdated,
        error: threatData.sansISC?.error,
        dataPoints: threatData.sansISC?.sources?.length || 0
      }
    };
    
    res.json({
      success: true,
      sources,
      summary: {
        totalSources: Object.keys(sources).length,
        availableSources: Object.values(sources).filter(s => s.available).length,
        totalDataPoints: Object.values(sources).reduce((sum, s) => sum + s.dataPoints, 0)
      },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('❌ Error getting sources info:', error);
    
    res.status(500).json({
      success: false,
      error: 'Failed to get sources information',
      message: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

export default router;