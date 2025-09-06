import express from 'express';
import { getCachedThreatData } from '../services/cache-manager.js';

const router = express.Router();

/**
 * GET /api/alerts/active
 * Get active threat alerts
 */
router.get('/active', async (req, res) => {
  try {
    const threatData = await getCachedThreatData();
    
    const alerts = [];
    
    // Generate ransomware alerts
    if (threatData.ransomwatch?.count24h > 5) {
      alerts.push({
        id: 'ransomware-spike',
        type: 'ransomware',
        severity: 'high',
        title: 'Aumento en Actividad de Ransomware',
        message: `Se detectaron ${threatData.ransomwatch.count24h} nuevos ataques de ransomware en las últimas 24 horas`,
        timestamp: new Date().toISOString(),
        affectedRegions: Object.keys(threatData.ransomwatch?.geographicDistribution || {}),
        actionRequired: true
      });
    }
    
    // Generate DDoS alerts
    if (threatData.cloudflare?.topAttackPairs?.length > 10) {
      alerts.push({
        id: 'ddos-activity',
        type: 'ddos',
        severity: 'medium',
        title: 'Alta Actividad de Ataques DDoS',
        message: `Se detectaron ${threatData.cloudflare.topAttackPairs.length} conexiones de ataque activas`,
        timestamp: new Date().toISOString(),
        affectedRegions: threatData.cloudflare.topTargetCountries?.slice(0, 5).map(c => c.country) || [],
        actionRequired: false
      });
    }
    
    // Generate malware hosting alerts
    if (threatData.urlhaus?.count > 100) {
      alerts.push({
        id: 'malware-hosting',
        type: 'malware',
        severity: 'medium',
        title: 'Incremento en Hosting de Malware',
        message: `Se identificaron ${threatData.urlhaus.count} URLs maliciosas activas`,
        timestamp: new Date().toISOString(),
        affectedRegions: threatData.urlhaus.countries?.slice(0, 5).map(c => c.country) || [],
        actionRequired: false
      });
    }
    
    // Generate vulnerability scanning alerts
    const highVulnSources = threatData.sansISC?.sources?.filter(s => s.attacks > 1000) || [];
    if (highVulnSources.length > 0) {
      alerts.push({
        id: 'vulnerability-scanning',
        type: 'vulnerability',
        severity: 'high',
        title: 'Escaneo Intensivo de Vulnerabilidades',
        message: `${highVulnSources.length} fuentes están realizando escaneos intensivos`,
        timestamp: new Date().toISOString(),
        affectedRegions: highVulnSources.map(s => s.country).filter(Boolean),
        actionRequired: true
      });
    }
    
    // Sort alerts by severity and timestamp
    const severityOrder = { critical: 4, high: 3, medium: 2, low: 1 };
    alerts.sort((a, b) => {
      const severityDiff = severityOrder[b.severity] - severityOrder[a.severity];
      if (severityDiff !== 0) return severityDiff;
      return new Date(b.timestamp) - new Date(a.timestamp);
    });
    
    res.json({
      success: true,
      alerts,
      summary: {
        total: alerts.length,
        critical: alerts.filter(a => a.severity === 'critical').length,
        high: alerts.filter(a => a.severity === 'high').length,
        medium: alerts.filter(a => a.severity === 'medium').length,
        low: alerts.filter(a => a.severity === 'low').length,
        actionRequired: alerts.filter(a => a.actionRequired).length
      },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('❌ Error generating alerts:', error);
    
    res.status(500).json({
      success: false,
      error: 'Failed to generate alerts',
      message: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

/**
 * GET /api/alerts/recent
 * Get recent threat events
 */
router.get('/recent', async (req, res) => {
  try {
    const threatData = await getCachedThreatData();
    const limit = parseInt(req.query.limit) || 20;
    
    const recentEvents = [];
    
    // Add recent ransomware events
    if (threatData.ransomwatch?.recentPosts) {
      threatData.ransomwatch.recentPosts.slice(0, 10).forEach(post => {
        recentEvents.push({
          id: `ransomware-${post.post_title?.substring(0, 10)}`,
          type: 'ransomware',
          severity: 'high',
          title: `Nuevo Ataque de Ransomware: ${post.group_name}`,
          description: post.post_title || 'Ataque de ransomware detectado',
          timestamp: post.discovered || new Date().toISOString(),
          source: 'RansomWatch'
        });
      });
    }
    
    // Add recent attack connections
    if (threatData.cloudflare?.topAttackPairs) {
      threatData.cloudflare.topAttackPairs.slice(0, 10).forEach((pair, index) => {
        recentEvents.push({
          id: `attack-${index}`,
          type: pair.type || 'ddos',
          severity: pair.attacks > 2000 ? 'high' : 'medium',
          title: `Ataque ${pair.type?.toUpperCase() || 'DDoS'} Detectado`,
          description: `Ataque desde ${pair.origin_country} hacia ${pair.target_country} (${pair.attacks} conexiones)`,
          timestamp: new Date().toISOString(),
          source: 'Cloudflare Radar'
        });
      });
    }
    
    // Add vulnerability scanning events
    if (threatData.sansISC?.sources) {
      threatData.sansISC.sources.slice(0, 5).forEach((source, index) => {
        if (source.attacks > 500) {
          recentEvents.push({
            id: `vuln-scan-${index}`,
            type: 'vulnerability',
            severity: source.attacks > 1000 ? 'high' : 'medium',
            title: 'Escaneo de Vulnerabilidades Detectado',
            description: `Escaneo intensivo desde ${source.country || 'origen desconocido'} (${source.attacks} intentos)`,
            timestamp: new Date().toISOString(),
            source: 'SANS ISC'
          });
        }
      });
    }
    
    // Sort by timestamp (most recent first) and limit
    recentEvents.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    const limitedEvents = recentEvents.slice(0, limit);
    
    res.json({
      success: true,
      events: limitedEvents,
      summary: {
        total: limitedEvents.length,
        byType: {
          ransomware: limitedEvents.filter(e => e.type === 'ransomware').length,
          ddos: limitedEvents.filter(e => e.type === 'ddos').length,
          malware: limitedEvents.filter(e => e.type === 'malware').length,
          vulnerability: limitedEvents.filter(e => e.type === 'vulnerability').length
        },
        bySeverity: {
          critical: limitedEvents.filter(e => e.severity === 'critical').length,
          high: limitedEvents.filter(e => e.severity === 'high').length,
          medium: limitedEvents.filter(e => e.severity === 'medium').length,
          low: limitedEvents.filter(e => e.severity === 'low').length
        }
      },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('❌ Error getting recent events:', error);
    
    res.status(500).json({
      success: false,
      error: 'Failed to get recent events',
      message: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

/**
 * GET /api/alerts/country/:countryCode
 * Get alerts for a specific country
 */
router.get('/country/:countryCode', async (req, res) => {
  try {
    const { countryCode } = req.params;
    const threatData = await getCachedThreatData();
    
    const countryAlerts = [];
    
    // Check if country is in ransomware distribution
    if (threatData.ransomwatch?.geographicDistribution?.[countryCode]) {
      countryAlerts.push({
        type: 'ransomware',
        severity: 'high',
        count: threatData.ransomwatch.geographicDistribution[countryCode],
        message: `${threatData.ransomware.geographicDistribution[countryCode]} ataques de ransomware detectados`
      });
    }
    
    // Check if country is attack origin
    const originAttacks = threatData.cloudflare?.topOriginCountries?.find(c => c.country === countryCode);
    if (originAttacks) {
      countryAlerts.push({
        type: 'attack_origin',
        severity: originAttacks.severity || 'medium',
        count: originAttacks.attacks,
        message: `País identificado como origen de ${originAttacks.attacks} ataques`
      });
    }
    
    // Check if country is attack target
    const targetAttacks = threatData.cloudflare?.topTargetCountries?.find(c => c.country === countryCode);
    if (targetAttacks) {
      countryAlerts.push({
        type: 'attack_target',
        severity: targetAttacks.severity || 'medium',
        count: targetAttacks.attacks,
        message: `País objetivo de ${targetAttacks.attacks} ataques`
      });
    }
    
    // Check if country hosts malware
    const malwareHost = threatData.urlhaus?.countries?.find(c => c.country === countryCode);
    if (malwareHost) {
      countryAlerts.push({
        type: 'malware_host',
        severity: malwareHost.count > 100 ? 'high' : 'medium',
        count: malwareHost.count,
        message: `${malwareHost.count} URLs maliciosas alojadas en el país`
      });
    }
    
    res.json({
      success: true,
      country: countryCode,
      alerts: countryAlerts,
      summary: {
        totalAlerts: countryAlerts.length,
        riskLevel: countryAlerts.length > 2 ? 'high' : countryAlerts.length > 0 ? 'medium' : 'low'
      },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('❌ Error getting country alerts:', error);
    
    res.status(500).json({
      success: false,
      error: 'Failed to get country alerts',
      message: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

export default router;