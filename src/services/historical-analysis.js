// Servicio de Análisis Histórico y Comparación Temporal
// Proporciona análisis de tendencias históricas y comparaciones temporales de amenazas

class HistoricalAnalysisService {
  constructor() {
    this.timeRanges = {
      '24h': { hours: 24, label: 'Últimas 24 horas' },
      '7d': { days: 7, label: 'Última semana' },
      '30d': { days: 30, label: 'Último mes' },
      '90d': { days: 90, label: 'Últimos 3 meses' },
      '1y': { days: 365, label: 'Último año' }
    };

    this.analysisTypes = {
      volume: 'Análisis de Volumen',
      geographic: 'Distribución Geográfica',
      malware: 'Familias de Malware',
      vectors: 'Vectores de Ataque',
      severity: 'Niveles de Severidad'
    };
  }

  // Generar datos históricos simulados
  generateHistoricalData(timeRange, analysisType) {
    const range = this.timeRanges[timeRange];
    const periods = this.calculatePeriods(range);
    
    return periods.map(period => {
      const baseValue = this.getBaseValue(analysisType);
      const variation = this.generateVariation(analysisType, period);
      
      return {
        timestamp: period.timestamp,
        date: period.date,
        value: Math.max(0, baseValue + variation),
        trend: this.calculateTrend(baseValue, variation),
        events: this.generateEvents(period, analysisType)
      };
    });
  }

  // Calcular períodos de tiempo
  calculatePeriods(range) {
    const periods = [];
    const now = new Date();
    const totalHours = range.hours || (range.days * 24);
    const intervalHours = totalHours > 168 ? 24 : totalHours > 24 ? 6 : 1; // Intervalos adaptativos
    
    for (let i = totalHours; i >= 0; i -= intervalHours) {
      const timestamp = new Date(now.getTime() - (i * 60 * 60 * 1000));
      periods.push({
        timestamp: timestamp.getTime(),
        date: timestamp.toISOString(),
        period: i
      });
    }
    
    return periods;
  }

  // Obtener valor base según tipo de análisis
  getBaseValue(analysisType) {
    const baseValues = {
      volume: 1500,
      geographic: 45,
      malware: 25,
      vectors: 12,
      severity: 3.2
    };
    
    return baseValues[analysisType] || 100;
  }

  // Generar variación realista
  generateVariation(analysisType, period) {
    const hour = new Date(period.timestamp).getHours();
    const dayOfWeek = new Date(period.timestamp).getDay();
    
    // Patrones temporales realistas
    let timeMultiplier = 1;
    
    // Variación por hora del día
    if (hour >= 9 && hour <= 17) {
      timeMultiplier *= 1.3; // Horario laboral
    } else if (hour >= 22 || hour <= 6) {
      timeMultiplier *= 0.7; // Madrugada
    }
    
    // Variación por día de la semana
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      timeMultiplier *= 0.6; // Fin de semana
    }
    
    // Variación aleatoria
    const randomFactor = (Math.random() - 0.5) * 0.4;
    
    // Variación específica por tipo
    const typeVariations = {
      volume: 300 * timeMultiplier * (1 + randomFactor),
      geographic: 15 * timeMultiplier * (1 + randomFactor),
      malware: 8 * timeMultiplier * (1 + randomFactor),
      vectors: 4 * timeMultiplier * (1 + randomFactor),
      severity: 1.5 * timeMultiplier * (1 + randomFactor)
    };
    
    return typeVariations[analysisType] || 20 * timeMultiplier * (1 + randomFactor);
  }

  // Calcular tendencia
  calculateTrend(baseValue, variation) {
    const percentage = (variation / baseValue) * 100;
    
    if (percentage > 15) return 'increasing';
    if (percentage < -15) return 'decreasing';
    return 'stable';
  }

  // Generar eventos significativos
  generateEvents(period, analysisType) {
    const events = [];
    const random = Math.random();
    
    // 10% de probabilidad de evento significativo
    if (random < 0.1) {
      const eventTypes = {
        volume: [
          'Pico de actividad detectado',
          'Campaña masiva identificada',
          'Botnet activa detectada'
        ],
        geographic: [
          'Nueva región afectada',
          'Concentración geográfica inusual',
          'Migración de amenazas detectada'
        ],
        malware: [
          'Nueva variante detectada',
          'Familia de malware emergente',
          'Mutación significativa observada'
        ],
        vectors: [
          'Nuevo vector de ataque',
          'Técnica de evasión detectada',
          'Explotación de vulnerabilidad'
        ],
        severity: [
          'Escalada de severidad',
          'Amenaza crítica detectada',
          'Impacto elevado observado'
        ]
      };
      
      const typeEvents = eventTypes[analysisType] || ['Evento significativo'];
      events.push({
        type: 'significant',
        message: typeEvents[Math.floor(Math.random() * typeEvents.length)],
        timestamp: period.timestamp
      });
    }
    
    return events;
  }

  // Realizar comparación temporal
  performTemporalComparison(currentPeriod, comparisonPeriod, analysisType) {
    const currentData = this.generateHistoricalData(currentPeriod, analysisType);
    const comparisonData = this.generateHistoricalData(comparisonPeriod, analysisType);
    
    const currentAvg = this.calculateAverage(currentData);
    const comparisonAvg = this.calculateAverage(comparisonData);
    
    const change = currentAvg - comparisonAvg;
    const changePercentage = ((change / comparisonAvg) * 100).toFixed(1);
    
    return {
      current: {
        period: currentPeriod,
        average: currentAvg.toFixed(2),
        data: currentData
      },
      comparison: {
        period: comparisonPeriod,
        average: comparisonAvg.toFixed(2),
        data: comparisonData
      },
      analysis: {
        change: change.toFixed(2),
        changePercentage: changePercentage,
        trend: change > 0 ? 'increasing' : change < 0 ? 'decreasing' : 'stable',
        significance: this.assessSignificance(Math.abs(parseFloat(changePercentage)))
      }
    };
  }

  // Calcular promedio de datos
  calculateAverage(data) {
    const sum = data.reduce((acc, item) => acc + item.value, 0);
    return sum / data.length;
  }

  // Evaluar significancia del cambio
  assessSignificance(changePercentage) {
    if (changePercentage > 50) return 'very_high';
    if (changePercentage > 25) return 'high';
    if (changePercentage > 10) return 'medium';
    if (changePercentage > 5) return 'low';
    return 'minimal';
  }

  // Generar análisis de tendencias
  generateTrendAnalysis(timeRange, analysisType) {
    const data = this.generateHistoricalData(timeRange, analysisType);
    const trends = this.identifyTrends(data);
    const patterns = this.identifyPatterns(data);
    const anomalies = this.detectAnomalies(data);
    
    return {
      timeRange,
      analysisType,
      data,
      trends,
      patterns,
      anomalies,
      summary: this.generateTrendSummary(trends, patterns, anomalies)
    };
  }

  // Identificar tendencias
  identifyTrends(data) {
    const trends = [];
    const windowSize = Math.min(5, Math.floor(data.length / 4));
    
    for (let i = windowSize; i < data.length; i++) {
      const currentWindow = data.slice(i - windowSize, i);
      const previousWindow = data.slice(i - windowSize * 2, i - windowSize);
      
      if (previousWindow.length === 0) continue;
      
      const currentAvg = this.calculateAverage(currentWindow);
      const previousAvg = this.calculateAverage(previousWindow);
      
      const change = ((currentAvg - previousAvg) / previousAvg) * 100;
      
      if (Math.abs(change) > 10) {
        trends.push({
          timestamp: data[i].timestamp,
          type: change > 0 ? 'upward' : 'downward',
          magnitude: Math.abs(change).toFixed(1),
          description: this.describeTrend(change)
        });
      }
    }
    
    return trends;
  }

  // Identificar patrones
  identifyPatterns(data) {
    const patterns = [];
    
    // Patrón cíclico
    const cyclicPattern = this.detectCyclicPattern(data);
    if (cyclicPattern) patterns.push(cyclicPattern);
    
    // Patrón de picos
    const spikePattern = this.detectSpikePattern(data);
    if (spikePattern) patterns.push(spikePattern);
    
    // Patrón estacional
    const seasonalPattern = this.detectSeasonalPattern(data);
    if (seasonalPattern) patterns.push(seasonalPattern);
    
    return patterns;
  }

  // Detectar anomalías
  detectAnomalies(data) {
    const anomalies = [];
    const mean = this.calculateAverage(data);
    const stdDev = this.calculateStandardDeviation(data, mean);
    const threshold = 2; // 2 desviaciones estándar
    
    data.forEach(point => {
      const zScore = Math.abs((point.value - mean) / stdDev);
      if (zScore > threshold) {
        anomalies.push({
          timestamp: point.timestamp,
          value: point.value,
          zScore: zScore.toFixed(2),
          type: point.value > mean ? 'spike' : 'drop',
          severity: zScore > 3 ? 'high' : 'medium'
        });
      }
    });
    
    return anomalies;
  }

  // Calcular desviación estándar
  calculateStandardDeviation(data, mean) {
    const variance = data.reduce((acc, point) => {
      return acc + Math.pow(point.value - mean, 2);
    }, 0) / data.length;
    
    return Math.sqrt(variance);
  }

  // Describir tendencia
  describeTrend(change) {
    const absChange = Math.abs(change);
    const direction = change > 0 ? 'incremento' : 'disminución';
    
    if (absChange > 50) return `${direction} muy significativo`;
    if (absChange > 25) return `${direction} significativo`;
    if (absChange > 10) return `${direction} moderado`;
    return `${direction} leve`;
  }

  // Detectar patrón cíclico
  detectCyclicPattern(data) {
    // Implementación simplificada
    const hours = data.map(d => new Date(d.timestamp).getHours());
    const hourlyAvg = {};
    
    hours.forEach((hour, index) => {
      if (!hourlyAvg[hour]) hourlyAvg[hour] = [];
      hourlyAvg[hour].push(data[index].value);
    });
    
    const hourlyMeans = Object.keys(hourlyAvg).map(hour => ({
      hour: parseInt(hour),
      mean: this.calculateAverage(hourlyAvg[hour].map(v => ({ value: v })))
    }));
    
    const maxHour = hourlyMeans.reduce((max, curr) => curr.mean > max.mean ? curr : max);
    const minHour = hourlyMeans.reduce((min, curr) => curr.mean < min.mean ? curr : min);
    
    if (hourlyMeans.length > 5 && (maxHour.mean - minHour.mean) / minHour.mean > 0.3) {
      return {
        type: 'cyclic',
        description: 'Patrón cíclico diario detectado',
        peakHour: maxHour.hour,
        lowHour: minHour.hour,
        variation: ((maxHour.mean - minHour.mean) / minHour.mean * 100).toFixed(1)
      };
    }
    
    return null;
  }

  // Detectar patrón de picos
  detectSpikePattern(data) {
    const mean = this.calculateAverage(data);
    const spikes = data.filter(d => d.value > mean * 1.5);
    
    if (spikes.length > data.length * 0.1) {
      return {
        type: 'spike',
        description: 'Patrón de picos frecuentes detectado',
        frequency: ((spikes.length / data.length) * 100).toFixed(1),
        averageSpike: this.calculateAverage(spikes).toFixed(2)
      };
    }
    
    return null;
  }

  // Detectar patrón estacional
  detectSeasonalPattern(data) {
    const days = data.map(d => new Date(d.timestamp).getDay());
    const dailyAvg = {};
    
    days.forEach((day, index) => {
      if (!dailyAvg[day]) dailyAvg[day] = [];
      dailyAvg[day].push(data[index].value);
    });
    
    if (Object.keys(dailyAvg).length >= 5) {
      const dailyMeans = Object.keys(dailyAvg).map(day => ({
        day: parseInt(day),
        mean: this.calculateAverage(dailyAvg[day].map(v => ({ value: v })))
      }));
      
      const weekdayMean = dailyMeans.filter(d => d.day >= 1 && d.day <= 5)
        .reduce((sum, d) => sum + d.mean, 0) / 5;
      const weekendMean = dailyMeans.filter(d => d.day === 0 || d.day === 6)
        .reduce((sum, d) => sum + d.mean, 0) / 2;
      
      if (Math.abs(weekdayMean - weekendMean) / weekendMean > 0.2) {
        return {
          type: 'seasonal',
          description: 'Patrón estacional semanal detectado',
          weekdayAverage: weekdayMean.toFixed(2),
          weekendAverage: weekendMean.toFixed(2),
          difference: ((weekdayMean - weekendMean) / weekendMean * 100).toFixed(1)
        };
      }
    }
    
    return null;
  }

  // Generar resumen de tendencias
  generateTrendSummary(trends, patterns, anomalies) {
    const summary = {
      trendsCount: trends.length,
      patternsCount: patterns.length,
      anomaliesCount: anomalies.length,
      overallTrend: 'stable',
      keyInsights: []
    };
    
    // Determinar tendencia general
    const upwardTrends = trends.filter(t => t.type === 'upward').length;
    const downwardTrends = trends.filter(t => t.type === 'downward').length;
    
    if (upwardTrends > downwardTrends * 1.5) {
      summary.overallTrend = 'increasing';
    } else if (downwardTrends > upwardTrends * 1.5) {
      summary.overallTrend = 'decreasing';
    }
    
    // Generar insights clave
    if (anomalies.length > 0) {
      summary.keyInsights.push(`${anomalies.length} anomalías detectadas`);
    }
    
    if (patterns.length > 0) {
      summary.keyInsights.push(`${patterns.length} patrones identificados`);
    }
    
    if (trends.length > 0) {
      summary.keyInsights.push(`${trends.length} cambios de tendencia observados`);
    }
    
    return summary;
  }

  // Obtener análisis completo
  getCompleteAnalysis(timeRange = '7d', analysisType = 'volume') {
    const trendAnalysis = this.generateTrendAnalysis(timeRange, analysisType);
    const comparison = this.performTemporalComparison(timeRange, '30d', analysisType);
    
    return {
      timeRange,
      analysisType,
      timestamp: new Date().toISOString(),
      trendAnalysis,
      temporalComparison: comparison,
      recommendations: this.generateRecommendations(trendAnalysis, comparison)
    };
  }

  // Generar recomendaciones
  generateRecommendations(trendAnalysis, comparison) {
    const recommendations = [];
    
    // Basado en tendencias
    if (trendAnalysis.summary.overallTrend === 'increasing') {
      recommendations.push({
        type: 'alert',
        priority: 'high',
        message: 'Tendencia creciente detectada - considerar medidas preventivas'
      });
    }
    
    // Basado en anomalías
    if (trendAnalysis.anomalies.length > 0) {
      recommendations.push({
        type: 'investigation',
        priority: 'medium',
        message: `Investigar ${trendAnalysis.anomalies.length} anomalías detectadas`
      });
    }
    
    // Basado en comparación temporal
    if (comparison.analysis.significance === 'very_high') {
      recommendations.push({
        type: 'urgent',
        priority: 'critical',
        message: 'Cambio muy significativo detectado - requiere atención inmediata'
      });
    }
    
    return recommendations;
  }
}

// Instancia del servicio
const historicalAnalysis = new HistoricalAnalysisService();

export default historicalAnalysis;
export { HistoricalAnalysisService };