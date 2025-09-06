// Advanced Threat Analytics Service
// Correlates data from multiple APIs to generate deep insights

class ThreatAnalytics {
  constructor() {
    this.correlationCache = new Map();
    this.historicalData = new Map();
    this.alertThresholds = {
      critical: { score: 85, urgency: 'immediate' },
      high: { score: 70, urgency: 'within_hour' },
      medium: { score: 50, urgency: 'within_day' },
      low: { score: 30, urgency: 'monitoring' }
    };
  }

  // Advanced correlation analysis between different threat sources
  async correlateThreats(threatData) {
    if (!threatData) return null;

    const correlations = {
      crossSourceMatches: this.findCrossSourceMatches(threatData),
      geographicCorrelation: this.analyzeGeographicPatterns(threatData),
      temporalCorrelation: this.analyzeTemporalPatterns(threatData),
      threatVectorAnalysis: this.analyzeThreatVectors(threatData),
      riskAmplification: this.calculateRiskAmplification(threatData)
    };

    return {
      ...correlations,
      overallThreatScore: this.calculateOverallThreatScore(correlations),
      recommendations: this.generateRecommendations(correlations),
      predictedTrends: this.predictThrends(correlations)
    };
  }

  // Find matching indicators across different threat sources
  findCrossSourceMatches(data) {
    const matches = {
      ipOverlaps: [],
      domainPatterns: [],
      attackSignatures: [],
      malwareFamilies: []
    };

    // Correlate URLhaus malware families with RansomWatch groups
    if (data.urlhaus?.malwareFamilies && data.ransomwatch?.groups) {
      const familyNames = data.urlhaus.malwareFamilies.map(f => f.family.toLowerCase());
      const ransomGroups = data.ransomwatch.groups.map(g => g.name.toLowerCase());
      
      matches.malwareFamilies = familyNames.filter(family => 
        ransomGroups.some(group => 
          group.includes(family) || family.includes(group)
        )
      );
    }

    // Correlate SANS port scans with Cloudflare attack patterns
    if (data.sansISC?.topPorts && data.cloudflare?.topTechniques) {
      const scannedPorts = data.sansISC.topPorts.map(p => p.port);
      const attackTechniques = data.cloudflare.topTechniques.map(t => t.technique.toLowerCase());
      
      matches.attackSignatures = scannedPorts.filter(port => {
        const service = this.getPortService(port);
        return attackTechniques.some(technique => 
          technique.includes(service.toLowerCase())
        );
      });
    }

    return matches;
  }

  // Analyze geographic patterns and hotspots
  analyzeGeographicPatterns(data) {
    const patterns = {
      hotspots: [],
      emergingRegions: [],
      riskByCountry: new Map()
    };

    // Analyze URLhaus geographic distribution
    if (data.urlhaus?.countries) {
      data.urlhaus.countries.forEach(country => {
        const currentRisk = patterns.riskByCountry.get(country.country) || 0;
        patterns.riskByCountry.set(country.country, currentRisk + country.count * 0.3);
      });
    }

    // Factor in Cloudflare data for Spain
    if (data.cloudflare?.percentage) {
      const spainRisk = patterns.riskByCountry.get('ES') || 0;
      patterns.riskByCountry.set('ES', spainRisk + data.cloudflare.percentage * 2);
    }

    // Identify hotspots (countries with risk > 50)
    patterns.hotspots = Array.from(patterns.riskByCountry.entries())
      .filter(([country, risk]) => risk > 50)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10);

    return patterns;
  }

  // Analyze temporal patterns and trends
  analyzeTemporalPatterns(data) {
    const patterns = {
      peakHours: [],
      trendDirection: 'stable',
      volatility: 0,
      cyclicalPatterns: []
    };

    // Analyze hourly trends from multiple sources
    const allTrends = [];
    if (data.urlhaus?.trend) allTrends.push(...data.urlhaus.trend);
    if (data.cloudflare?.trend) allTrends.push(...data.cloudflare.trend);

    if (allTrends.length > 0) {
      // Calculate peak hours (hours with activity > average + 1 std dev)
      const average = allTrends.reduce((a, b) => a + b, 0) / allTrends.length;
      const stdDev = Math.sqrt(allTrends.reduce((sq, n) => sq + Math.pow(n - average, 2), 0) / allTrends.length);
      const threshold = average + stdDev;

      patterns.peakHours = allTrends
        .map((value, hour) => ({ hour, value }))
        .filter(item => item.value > threshold)
        .map(item => item.hour);

      // Calculate trend direction
      const firstHalf = allTrends.slice(0, Math.floor(allTrends.length / 2));
      const secondHalf = allTrends.slice(Math.floor(allTrends.length / 2));
      const firstAvg = firstHalf.reduce((a, b) => a + b, 0) / firstHalf.length;
      const secondAvg = secondHalf.reduce((a, b) => a + b, 0) / secondHalf.length;

      if (secondAvg > firstAvg * 1.1) patterns.trendDirection = 'increasing';
      else if (secondAvg < firstAvg * 0.9) patterns.trendDirection = 'decreasing';

      // Calculate volatility
      patterns.volatility = stdDev / average;
    }

    return patterns;
  }

  // Analyze threat vectors and attack methods
  analyzeThreatVectors(data) {
    const vectors = {
      webBased: 0,
      networkBased: 0,
      malwareBased: 0,
      socialEngineering: 0,
      ransomware: 0
    };

    // Weight from URLhaus data
    if (data.urlhaus?.threatTypes) {
      data.urlhaus.threatTypes.forEach(threat => {
        const type = threat.type.toLowerCase();
        if (type.includes('phish') || type.includes('scam')) {
          vectors.socialEngineering += threat.count * 0.4;
        } else if (type.includes('malware') || type.includes('trojan')) {
          vectors.malwareBased += threat.count * 0.4;
        } else {
          vectors.webBased += threat.count * 0.3;
        }
      });
    }

    // Weight from Cloudflare data
    if (data.cloudflare?.topTechniques) {
      data.cloudflare.topTechniques.forEach(technique => {
        const tech = technique.technique.toLowerCase();
        if (tech.includes('ddos') || tech.includes('flood')) {
          vectors.networkBased += technique.percentage * 2;
        } else {
          vectors.webBased += technique.percentage * 1.5;
        }
      });
    }

    // Weight from RansomWatch data
    if (data.ransomwatch?.recentPosts) {
      vectors.ransomware += data.ransomwatch.recentPosts.length * 5;
    }

    return vectors;
  }

  // Calculate risk amplification factors
  calculateRiskAmplification(data) {
    let amplification = 1.0;
    const factors = [];

    // Multiple active threat sources amplify risk
    const activeSources = Object.values(data).filter(source => source && Object.keys(source).length > 0).length;
    if (activeSources >= 3) {
      amplification *= 1.3;
      factors.push('Multiple active threat sources');
    }

    // High ransomware activity amplifies all other threats
    if (data.ransomwatch?.recentPosts?.length > 20) {
      amplification *= 1.4;
      factors.push('High ransomware activity');
    }

    // Peak scanning activity indicates coordinated attacks
    if (data.sansISC?.totalScans > 10000) {
      amplification *= 1.2;
      factors.push('Elevated scanning activity');
    }

    // High Cloudflare attack percentage indicates active campaigns
    if (data.cloudflare?.percentage > 15) {
      amplification *= 1.25;
      factors.push('High attack traffic percentage');
    }

    return { factor: amplification, reasons: factors };
  }

  // Calculate overall threat score (0-100)
  calculateOverallThreatScore(correlations) {
    let score = 0;

    // Base score from individual metrics
    const crossMatches = correlations.crossSourceMatches;
    score += crossMatches.malwareFamilies.length * 15;
    score += crossMatches.attackSignatures.length * 10;

    // Geographic risk contribution
    const maxGeoRisk = Math.max(...Array.from(correlations.geographicCorrelation.riskByCountry.values()));
    score += Math.min(maxGeoRisk * 0.3, 25);

    // Temporal pattern contribution
    const temporal = correlations.temporalCorrelation;
    if (temporal.trendDirection === 'increasing') score += 15;
    score += Math.min(temporal.volatility * 20, 15);

    // Threat vector diversity penalty/bonus
    const vectors = Object.values(correlations.threatVectorAnalysis);
    const activeVectors = vectors.filter(v => v > 0).length;
    score += activeVectors * 5;

    // Apply risk amplification
    score *= correlations.riskAmplification.factor;

    return Math.min(Math.round(score), 100);
  }

  // Generate actionable recommendations
  generateRecommendations(correlations) {
    const recommendations = [];
    const score = correlations.overallThreatScore || this.calculateOverallThreatScore(correlations);

    if (score >= 85) {
      recommendations.push({
        priority: 'critical',
        action: 'Activar protocolo de respuesta a incidentes',
        reason: 'Múltiples indicadores de amenaza crítica detectados'
      });
    }

    if (correlations.crossSourceMatches.malwareFamilies.length > 0) {
      recommendations.push({
        priority: 'high',
        action: 'Revisar firmas de detección de malware',
        reason: `Familias de malware correlacionadas: ${correlations.crossSourceMatches.malwareFamilies.join(', ')}`
      });
    }

    if (correlations.temporalCorrelation.trendDirection === 'increasing') {
      recommendations.push({
        priority: 'medium',
        action: 'Incrementar monitorización durante las próximas 24h',
        reason: 'Tendencia creciente de actividad maliciosa detectada'
      });
    }

    if (correlations.geographicCorrelation.hotspots.length > 0) {
      const topHotspot = correlations.geographicCorrelation.hotspots[0];
      recommendations.push({
        priority: 'medium',
        action: `Implementar filtrado geográfico para ${topHotspot[0]}`,
        reason: `Alto riesgo detectado en región: ${topHotspot[0]}`
      });
    }

    return recommendations;
  }

  // Predict future trends based on current patterns
  predictThrends(correlations) {
    const predictions = {
      next6Hours: 'stable',
      next24Hours: 'stable',
      confidence: 0.5
    };

    const temporal = correlations.temporalCorrelation;
    const riskAmp = correlations.riskAmplification.factor;

    // Short-term prediction (6 hours)
    if (temporal.trendDirection === 'increasing' && riskAmp > 1.2) {
      predictions.next6Hours = 'escalating';
      predictions.confidence += 0.2;
    } else if (temporal.trendDirection === 'decreasing') {
      predictions.next6Hours = 'declining';
      predictions.confidence += 0.1;
    }

    // Medium-term prediction (24 hours)
    if (correlations.crossSourceMatches.malwareFamilies.length > 2) {
      predictions.next24Hours = 'elevated';
      predictions.confidence += 0.2;
    }

    if (temporal.volatility > 0.5) {
      predictions.confidence -= 0.1; // High volatility reduces confidence
    }

    predictions.confidence = Math.max(0.1, Math.min(0.9, predictions.confidence));

    return predictions;
  }

  // Helper method to get service name for port
  getPortService(port) {
    const commonPorts = {
      21: 'FTP', 22: 'SSH', 23: 'Telnet', 25: 'SMTP', 53: 'DNS',
      80: 'HTTP', 110: 'POP3', 143: 'IMAP', 443: 'HTTPS', 993: 'IMAPS',
      995: 'POP3S', 1433: 'MSSQL', 3306: 'MySQL', 3389: 'RDP', 5432: 'PostgreSQL'
    };
    return commonPorts[port] || 'Unknown';
  }

  // Store historical data for trend analysis
  storeHistoricalData(timestamp, threatData, correlations) {
    const key = new Date(timestamp).toISOString().split('T')[0]; // Daily key
    
    if (!this.historicalData.has(key)) {
      this.historicalData.set(key, []);
    }
    
    this.historicalData.get(key).push({
      timestamp,
      threatScore: correlations.overallThreatScore,
      activeSources: Object.keys(threatData).length,
      topThreats: correlations.crossSourceMatches.malwareFamilies.slice(0, 3)
    });

    // Keep only last 30 days
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    for (const [date] of this.historicalData) {
      if (date < thirtyDaysAgo) {
        this.historicalData.delete(date);
      }
    }
  }

  // Get historical comparison
  getHistoricalComparison(days = 7) {
    const now = new Date();
    const comparison = {
      averageScore: 0,
      trend: 'stable',
      peakDays: [],
      dataPoints: 0
    };

    let totalScore = 0;
    let dataPoints = 0;
    const scores = [];

    for (let i = 0; i < days; i++) {
      const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
      const dayData = this.historicalData.get(date);
      
      if (dayData && dayData.length > 0) {
        const dayAverage = dayData.reduce((sum, entry) => sum + entry.threatScore, 0) / dayData.length;
        scores.push(dayAverage);
        totalScore += dayAverage;
        dataPoints++;
      }
    }

    if (dataPoints > 0) {
      comparison.averageScore = Math.round(totalScore / dataPoints);
      comparison.dataPoints = dataPoints;

      // Determine trend
      if (scores.length >= 3) {
        const recent = scores.slice(0, Math.ceil(scores.length / 2));
        const older = scores.slice(Math.ceil(scores.length / 2));
        const recentAvg = recent.reduce((a, b) => a + b, 0) / recent.length;
        const olderAvg = older.reduce((a, b) => a + b, 0) / older.length;

        if (recentAvg > olderAvg * 1.1) comparison.trend = 'increasing';
        else if (recentAvg < olderAvg * 0.9) comparison.trend = 'decreasing';
      }
    }

    return comparison;
  }
}

export const threatAnalytics = new ThreatAnalytics();
export default threatAnalytics;