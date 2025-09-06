/**
 * Real-Time Threat Alerts System
 * Gestiona alertas de amenazas en tiempo real basadas en datos de múltiples fuentes
 */

export class RealTimeAlerts {
  constructor() {
    this.alertThresholds = {
      critical: 85,
      high: 70,
      medium: 50,
      low: 30
    };
    
    this.alertHistory = [];
    this.activeAlerts = new Map();
    this.subscribers = new Set();
    this.alertRules = this.initializeAlertRules();
  }

  /**
   * Inicializa las reglas de alerta predefinidas
   */
  initializeAlertRules() {
    return {
      // Alertas basadas en volumen de amenazas
      volumeSpike: {
        name: 'Pico de Volumen de Amenazas',
        condition: (current, baseline) => current > baseline * 2,
        severity: 'high',
        category: 'volume'
      },
      
      // Alertas geográficas
      geoAnomaly: {
        name: 'Anomalía Geográfica',
        condition: (data) => this.detectGeoAnomaly(data),
        severity: 'medium',
        category: 'geographic'
      },
      
      // Alertas de nuevas familias de malware
      newMalwareFamily: {
        name: 'Nueva Familia de Malware',
        condition: (data) => this.detectNewMalwareFamily(data),
        severity: 'critical',
        category: 'malware'
      },
      
      // Alertas de ransomware
      ransomwareActivity: {
        name: 'Actividad de Ransomware Elevada',
        condition: (data) => this.detectRansomwareSpike(data),
        severity: 'critical',
        category: 'ransomware'
      },
      
      // Alertas de phishing
      phishingCampaign: {
        name: 'Campaña de Phishing Masiva',
        condition: (data) => this.detectPhishingCampaign(data),
        severity: 'high',
        category: 'phishing'
      },
      
      // Alertas de infraestructura
      infrastructureCompromise: {
        name: 'Compromiso de Infraestructura',
        condition: (data) => this.detectInfrastructureCompromise(data),
        severity: 'critical',
        category: 'infrastructure'
      }
    };
  }

  /**
   * Analiza datos de amenazas y genera alertas
   */
  async analyzeThreats(threatData, correlationData, predictions) {
    const alerts = [];
    const timestamp = new Date();

    try {
      // Analizar cada regla de alerta
      for (const [ruleId, rule] of Object.entries(this.alertRules)) {
        const alertResult = await this.evaluateRule(rule, threatData, correlationData, predictions);
        
        if (alertResult.triggered) {
          const alert = this.createAlert({
            id: `${ruleId}_${timestamp.getTime()}`,
            ruleId,
            name: rule.name,
            severity: rule.severity,
            category: rule.category,
            message: alertResult.message,
            data: alertResult.data,
            timestamp,
            source: alertResult.source
          });
          
          alerts.push(alert);
          this.activeAlerts.set(alert.id, alert);
        }
      }

      // Analizar tendencias predictivas
      if (predictions) {
        const predictiveAlerts = this.analyzePredictiveAlerts(predictions);
        alerts.push(...predictiveAlerts);
      }

      // Actualizar historial
      this.alertHistory.push(...alerts);
      
      // Notificar suscriptores
      if (alerts.length > 0) {
        this.notifySubscribers(alerts);
      }

      return {
        alerts,
        activeCount: this.activeAlerts.size,
        criticalCount: alerts.filter(a => a.severity === 'critical').length,
        summary: this.generateAlertSummary(alerts)
      };

    } catch (error) {
      console.error('Error analyzing threats for alerts:', error);
      return {
        alerts: [],
        activeCount: 0,
        criticalCount: 0,
        summary: 'Error en el análisis de alertas',
        error: error.message
      };
    }
  }

  /**
   * Evalúa una regla específica de alerta
   */
  async evaluateRule(rule, threatData, correlationData, predictions) {
    try {
      const context = {
        threatData,
        correlationData,
        predictions,
        timestamp: new Date()
      };

      // Evaluar condición de la regla
      const triggered = await rule.condition(context);
      
      if (triggered) {
        return {
          triggered: true,
          message: this.generateAlertMessage(rule, context),
          data: this.extractRelevantData(rule, context),
          source: this.identifyAlertSource(rule, context)
        };
      }

      return { triggered: false };
    } catch (error) {
      console.error(`Error evaluating rule ${rule.name}:`, error);
      return { triggered: false };
    }
  }

  /**
   * Detecta anomalías geográficas
   */
  detectGeoAnomaly(context) {
    const { threatData } = context;
    
    if (!threatData?.cloudflare?.top_countries) return false;
    
    const countries = threatData.cloudflare.top_countries;
    const topCountryPercentage = countries[0]?.percentage || 0;
    
    // Alerta si un país concentra más del 40% de las amenazas
    return topCountryPercentage > 40;
  }

  /**
   * Detecta nuevas familias de malware
   */
  detectNewMalwareFamily(context) {
    const { threatData } = context;
    
    if (!threatData?.urlhaus?.threat_types) return false;
    
    // Simular detección de nuevas familias (en producción, compararía con base de datos histórica)
    const threatTypes = threatData.urlhaus.threat_types;
    const unusualTypes = threatTypes.filter(type => 
      type.name.includes('unknown') || 
      type.name.includes('new') ||
      type.count > 1000 // Volumen inusualmente alto
    );
    
    return unusualTypes.length > 0;
  }

  /**
   * Detecta picos de actividad de ransomware
   */
  detectRansomwareSpike(context) {
    const { threatData } = context;
    
    if (!threatData?.ransomwatch?.recent_victims) return false;
    
    const recentVictims = threatData.ransomwatch.recent_victims;
    
    // Alerta si hay más de 10 víctimas recientes
    return recentVictims > 10;
  }

  /**
   * Detecta campañas masivas de phishing
   */
  detectPhishingCampaign(context) {
    const { threatData } = context;
    
    if (!threatData?.urlhaus?.threat_types) return false;
    
    const phishingThreats = threatData.urlhaus.threat_types.filter(type => 
      type.name.toLowerCase().includes('phish') ||
      type.name.toLowerCase().includes('scam')
    );
    
    const totalPhishing = phishingThreats.reduce((sum, threat) => sum + threat.count, 0);
    
    // Alerta si hay más de 500 amenazas de phishing
    return totalPhishing > 500;
  }

  /**
   * Detecta compromisos de infraestructura
   */
  detectInfrastructureCompromise(context) {
    const { threatData } = context;
    
    if (!threatData?.sans?.top_ports) return false;
    
    const criticalPorts = [22, 23, 3389, 445, 135]; // Puertos críticos
    const scannedPorts = threatData.sans.top_ports.map(p => p.port);
    
    const compromisedCriticalPorts = criticalPorts.filter(port => 
      scannedPorts.includes(port)
    );
    
    // Alerta si se están escaneando múltiples puertos críticos
    return compromisedCriticalPorts.length >= 2;
  }

  /**
   * Analiza alertas predictivas
   */
  analyzePredictiveAlerts(predictions) {
    const alerts = [];
    const timestamp = new Date();

    // Alertas basadas en predicciones
    if (predictions.alerts && predictions.alerts.length > 0) {
      predictions.alerts.forEach((alert, index) => {
        if (alert.severity === 'high' || alert.severity === 'critical') {
          alerts.push(this.createAlert({
            id: `predictive_${timestamp.getTime()}_${index}`,
            ruleId: 'predictive_analysis',
            name: 'Alerta Predictiva',
            severity: alert.severity,
            category: 'predictive',
            message: alert.message,
            data: { prediction: alert },
            timestamp,
            source: 'Modelo Predictivo'
          }));
        }
      });
    }

    return alerts;
  }

  /**
   * Crea un objeto de alerta estructurado
   */
  createAlert(alertData) {
    return {
      id: alertData.id,
      ruleId: alertData.ruleId,
      name: alertData.name,
      severity: alertData.severity,
      category: alertData.category,
      message: alertData.message,
      data: alertData.data || {},
      timestamp: alertData.timestamp,
      source: alertData.source || 'Sistema de Análisis',
      status: 'active',
      acknowledged: false,
      priority: this.calculatePriority(alertData.severity, alertData.category)
    };
  }

  /**
   * Calcula la prioridad de una alerta
   */
  calculatePriority(severity, category) {
    const severityWeights = { critical: 4, high: 3, medium: 2, low: 1 };
    const categoryWeights = { 
      ransomware: 1.5, 
      malware: 1.3, 
      infrastructure: 1.4,
      phishing: 1.2,
      geographic: 1.1,
      volume: 1.0,
      predictive: 1.2
    };
    
    const baseScore = severityWeights[severity] || 1;
    const categoryMultiplier = categoryWeights[category] || 1;
    
    return Math.round(baseScore * categoryMultiplier * 10);
  }

  /**
   * Genera mensaje descriptivo para la alerta
   */
  generateAlertMessage(rule, context) {
    const { threatData } = context;
    
    switch (rule.category) {
      case 'geographic':
        const topCountry = threatData?.cloudflare?.top_countries?.[0];
        return `Concentración anómala de amenazas detectada en ${topCountry?.country || 'región desconocida'} (${topCountry?.percentage || 0}%)`;
      
      case 'malware':
        return 'Nueva familia de malware o actividad inusual detectada en las fuentes de inteligencia';
      
      case 'ransomware':
        const victims = threatData?.ransomwatch?.recent_victims || 0;
        return `Incremento significativo en actividad de ransomware: ${victims} víctimas recientes reportadas`;
      
      case 'phishing':
        return 'Campaña masiva de phishing detectada con volumen elevado de amenazas';
      
      case 'infrastructure':
        return 'Posible compromiso de infraestructura detectado por escaneo de puertos críticos';
      
      default:
        return `Alerta de ${rule.name} activada`;
    }
  }

  /**
   * Extrae datos relevantes para la alerta
   */
  extractRelevantData(rule, context) {
    const { threatData, correlationData } = context;
    
    return {
      category: rule.category,
      threatScore: correlationData?.overallThreatScore || 0,
      sources: Object.keys(threatData || {}),
      timestamp: context.timestamp,
      metadata: this.extractCategorySpecificData(rule.category, threatData)
    };
  }

  /**
   * Extrae datos específicos por categoría
   */
  extractCategorySpecificData(category, threatData) {
    switch (category) {
      case 'geographic':
        return {
          topCountries: threatData?.cloudflare?.top_countries?.slice(0, 3) || [],
          distribution: 'geographic'
        };
      
      case 'malware':
        return {
          threatTypes: threatData?.urlhaus?.threat_types?.slice(0, 5) || [],
          totalThreats: threatData?.urlhaus?.total_urls || 0
        };
      
      case 'ransomware':
        return {
          recentVictims: threatData?.ransomwatch?.recent_victims || 0,
          activeGroups: threatData?.ransomwatch?.active_groups || []
        };
      
      default:
        return {};
    }
  }

  /**
   * Identifica la fuente de la alerta
   */
  identifyAlertSource(rule, context) {
    const sources = [];
    
    if (context.threatData?.urlhaus) sources.push('URLhaus');
    if (context.threatData?.cloudflare) sources.push('Cloudflare Radar');
    if (context.threatData?.sans) sources.push('SANS ISC');
    if (context.threatData?.ransomwatch) sources.push('RansomWatch');
    
    return sources.join(', ') || 'Sistema de Análisis';
  }

  /**
   * Genera resumen de alertas
   */
  generateAlertSummary(alerts) {
    if (alerts.length === 0) {
      return 'No se han detectado amenazas críticas en este momento';
    }
    
    const criticalCount = alerts.filter(a => a.severity === 'critical').length;
    const highCount = alerts.filter(a => a.severity === 'high').length;
    
    if (criticalCount > 0) {
      return `${criticalCount} alerta${criticalCount > 1 ? 's' : ''} crítica${criticalCount > 1 ? 's' : ''} detectada${criticalCount > 1 ? 's' : ''}`;
    } else if (highCount > 0) {
      return `${highCount} alerta${highCount > 1 ? 's' : ''} de alta prioridad detectada${highCount > 1 ? 's' : ''}`;
    } else {
      return `${alerts.length} alerta${alerts.length > 1 ? 's' : ''} detectada${alerts.length > 1 ? 's' : ''}`;
    }
  }

  /**
   * Notifica a los suscriptores sobre nuevas alertas
   */
  notifySubscribers(alerts) {
    this.subscribers.forEach(callback => {
      try {
        callback(alerts);
      } catch (error) {
        console.error('Error notifying subscriber:', error);
      }
    });
  }

  /**
   * Suscribe un callback para recibir notificaciones de alertas
   */
  subscribe(callback) {
    this.subscribers.add(callback);
    return () => this.subscribers.delete(callback);
  }

  /**
   * Obtiene alertas activas
   */
  getActiveAlerts() {
    return Array.from(this.activeAlerts.values())
      .sort((a, b) => b.priority - a.priority);
  }

  /**
   * Obtiene historial de alertas
   */
  getAlertHistory(limit = 50) {
    return this.alertHistory
      .sort((a, b) => b.timestamp - a.timestamp)
      .slice(0, limit);
  }

  /**
   * Marca una alerta como reconocida
   */
  acknowledgeAlert(alertId) {
    const alert = this.activeAlerts.get(alertId);
    if (alert) {
      alert.acknowledged = true;
      alert.acknowledgedAt = new Date();
      return true;
    }
    return false;
  }

  /**
   * Cierra una alerta activa
   */
  closeAlert(alertId) {
    const alert = this.activeAlerts.get(alertId);
    if (alert) {
      alert.status = 'closed';
      alert.closedAt = new Date();
      this.activeAlerts.delete(alertId);
      return true;
    }
    return false;
  }

  /**
   * Obtiene estadísticas de alertas
   */
  getAlertStatistics() {
    const activeAlerts = this.getActiveAlerts();
    const recentAlerts = this.alertHistory.filter(
      alert => Date.now() - alert.timestamp.getTime() < 24 * 60 * 60 * 1000 // Últimas 24 horas
    );
    
    return {
      active: {
        total: activeAlerts.length,
        critical: activeAlerts.filter(a => a.severity === 'critical').length,
        high: activeAlerts.filter(a => a.severity === 'high').length,
        medium: activeAlerts.filter(a => a.severity === 'medium').length,
        low: activeAlerts.filter(a => a.severity === 'low').length
      },
      recent24h: {
        total: recentAlerts.length,
        byCategory: this.groupAlertsByCategory(recentAlerts),
        bySeverity: this.groupAlertsBySeverity(recentAlerts)
      },
      trends: this.calculateAlertTrends()
    };
  }

  /**
   * Agrupa alertas por categoría
   */
  groupAlertsByCategory(alerts) {
    return alerts.reduce((acc, alert) => {
      acc[alert.category] = (acc[alert.category] || 0) + 1;
      return acc;
    }, {});
  }

  /**
   * Agrupa alertas por severidad
   */
  groupAlertsBySeverity(alerts) {
    return alerts.reduce((acc, alert) => {
      acc[alert.severity] = (acc[alert.severity] || 0) + 1;
      return acc;
    }, {});
  }

  /**
   * Calcula tendencias de alertas
   */
  calculateAlertTrends() {
    const now = Date.now();
    const last24h = this.alertHistory.filter(a => now - a.timestamp.getTime() < 24 * 60 * 60 * 1000);
    const previous24h = this.alertHistory.filter(a => {
      const diff = now - a.timestamp.getTime();
      return diff >= 24 * 60 * 60 * 1000 && diff < 48 * 60 * 60 * 1000;
    });
    
    const currentCount = last24h.length;
    const previousCount = previous24h.length;
    const change = previousCount > 0 ? ((currentCount - previousCount) / previousCount) * 100 : 0;
    
    return {
      last24h: currentCount,
      previous24h: previousCount,
      changePercentage: Math.round(change * 100) / 100,
      trend: change > 10 ? 'increasing' : change < -10 ? 'decreasing' : 'stable'
    };
  }
}

// Instancia singleton para uso global
const realTimeAlerts = new RealTimeAlerts();
export default realTimeAlerts;