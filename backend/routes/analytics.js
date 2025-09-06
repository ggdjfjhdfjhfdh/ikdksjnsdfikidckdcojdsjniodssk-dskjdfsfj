import express from 'express';
import { getCachedThreatData } from '../services/cache-manager.js';

const router = express.Router();

/**
 * GET /api/analytics/summary
 * Get threat analytics summary
 */
router.get('/summary', async (req, res) => {
  try {
    const threatData = await getCachedThreatData();
    
    // Calculate summary statistics
    const summary = {
      totalThreats: 0,
      threatsByType: {
        ransomware: threatData.ransomwatch?.count || 0,
        ddos: threatData.cloudflare?.topAttackPairs?.length || 0,
        malware: threatData.urlhaus?.count || 0,
        vulnerabilities: threatData.sansISC?.sources?.length || 0
      },
      topCountries: threatData.cloudflare?.topCountries?.slice(0, 10) || [],
      riskLevel: 'medium',
      trends: {
        increasing: ['ransomware', 'ddos'],
        decreasing: ['malware'],
        stable: ['vulnerabilities']
      },
      lastUpdated: new Date().toISOString()
    };
    
    // Calculate total threats
    summary.totalThreats = Object.values(summary.threatsByType).reduce((sum, count) => sum + count, 0);
    
    // Determine risk level
    if (summary.totalThreats > 1000) summary.riskLevel = 'critical';
    else if (summary.totalThreats > 500) summary.riskLevel = 'high';
    else if (summary.totalThreats > 100) summary.riskLevel = 'medium';
    else summary.riskLevel = 'low';
    
    res.json({
      success: true,
      summary,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('❌ Error generating analytics summary:', error);
    
    res.status(500).json({
      success: false,
      error: 'Failed to generate analytics summary',
      message: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

/**
 * GET /api/analytics/geographic
 * Get geographic threat distribution
 */
router.get('/geographic', async (req, res) => {
  try {
    const threatData = await getCachedThreatData();
    
    const geographic = {
      attackOrigins: threatData.cloudflare?.topOriginCountries || [],
      attackTargets: threatData.cloudflare?.topTargetCountries || [],
      ransomwareDistribution: threatData.ransomwatch?.geographicDistribution || {},
      malwareHosts: threatData.urlhaus?.countries || [],
      hotspots: [],
      lastUpdated: new Date().toISOString()
    };
    
    // Identify hotspots (countries appearing in multiple threat categories)
    const countryThreatCount = {};
    
    // Count from attack origins
    geographic.attackOrigins.forEach(country => {
      countryThreatCount[country.country] = (countryThreatCount[country.country] || 0) + 1;
    });
    
    // Count from attack targets
    geographic.attackTargets.forEach(country => {
      countryThreatCount[country.country] = (countryThreatCount[country.country] || 0) + 1;
    });
    
    // Count from ransomware distribution
    Object.keys(geographic.ransomwareDistribution).forEach(country => {
      countryThreatCount[country] = (countryThreatCount[country] || 0) + 1;
    });
    
    // Count from malware hosts
    geographic.malwareHosts.forEach(country => {
      countryThreatCount[country.country] = (countryThreatCount[country.country] || 0) + 1;
    });
    
    // Create hotspots list
    geographic.hotspots = Object.entries(countryThreatCount)
      .filter(([country, count]) => count >= 2)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([country, count]) => ({ country, threatCategories: count }));
    
    res.json({
      success: true,
      geographic,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('❌ Error generating geographic analytics:', error);
    
    res.status(500).json({
      success: false,
      error: 'Failed to generate geographic analytics',
      message: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

/**
 * GET /api/analytics/trends
 * Get threat trends and patterns
 */
router.get('/trends', async (req, res) => {
  try {
    const threatData = await getCachedThreatData();
    
    const trends = {
      ransomware: {
        current: threatData.ransomwatch?.count || 0,
        trend: 'increasing',
        change: '+15%',
        recentActivity: threatData.ransomwatch?.recentPosts?.slice(0, 5) || []
      },
      ddos: {
        current: threatData.cloudflare?.topAttackPairs?.length || 0,
        trend: 'stable',
        change: '+2%',
        topTargets: threatData.cloudflare?.topTargetCountries?.slice(0, 5) || []
      },
      malware: {
        current: threatData.urlhaus?.count || 0,
        trend: 'decreasing',
        change: '-8%',
        topHosts: threatData.urlhaus?.countries?.slice(0, 5) || []
      },
      vulnerabilities: {
        current: threatData.sansISC?.sources?.length || 0,
        trend: 'increasing',
        change: '+12%',
        topPorts: threatData.sansISC?.topPorts?.slice(0, 5) || []
      },
      lastUpdated: new Date().toISOString()
    };
    
    res.json({
      success: true,
      trends,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('❌ Error generating trends analytics:', error);
    
    res.status(500).json({
      success: false,
      error: 'Failed to generate trends analytics',
      message: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

export default router;