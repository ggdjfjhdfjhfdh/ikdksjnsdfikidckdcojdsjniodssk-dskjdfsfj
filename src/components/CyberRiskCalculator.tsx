'use client';

import React, { useState, useEffect } from 'react';
import { 
  ShieldCheckIcon, 
  ExclamationTriangleIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  ChartBarIcon,
  DocumentTextIcon,
  PhoneIcon,
  EnvelopeIcon,
  CalendarDaysIcon,
  TrophyIcon,
  FireIcon,
  BoltIcon
} from '@heroicons/react/24/outline';
import { useLanguage } from '@/lib/LanguageContext';
import { riskCalculatorTranslations, type RiskCalculatorTranslationKey } from '@/lib/riskCalculatorTranslations';
import { businessQuestions as businessQuestionsData, individualQuestions as individualQuestionsData } from '@/lib/riskCalculatorQuestions';
import DownloadButton from './DownloadButton';

interface Question {
  id: string;
  category: string;
  question: string;
  weight: number;
  targetAudience?: 'individual' | 'business' | 'both';
}

interface UserProfile {
  type: 'individual' | 'business';
  companySize?: 'small' | 'medium' | 'large' | 'enterprise';
  industry?: string;
  role?: string;
  hasITTeam?: boolean;
}

interface RiskResult {
  score: number;
  level: 'low' | 'medium' | 'high' | 'critical';
  color: string;
  recommendations: string[];
  urgency: 'low' | 'medium' | 'high' | 'critical';
  businessImpact: string;
  estimatedCost: string;
  timeToImplement: string;
}

interface LeadData {
  email: string;
  company: string;
  role: string;
  phone?: string;
}

// Preguntas de segmentación inicial - se traducirán dinámicamente
const getSegmentationQuestions = (t: (key: RiskCalculatorTranslationKey) => string): Question[] => [
  { id: 'user_type', category: 'Profile', question: t('userTypeQuestion'), weight: 0 },
  { id: 'company_size', category: 'Profile', question: t('companySizeQuestion'), weight: 0 },
  { id: 'industry_type', category: 'Profile', question: t('industryQuestion'), weight: 0 },
  { id: 'it_resources', category: 'Profile', question: t('itResourcesQuestion'), weight: 0 },
];

// Función para convertir preguntas con claves de traducción a preguntas con texto
const convertQuestionsToTranslated = (questions: typeof businessQuestionsData, t: (key: RiskCalculatorTranslationKey) => string): Question[] => {
  return questions.map(q => ({
    id: q.id,
    category: t(q.category as RiskCalculatorTranslationKey),
    question: t(q.questionKey),
    weight: q.weight,
    targetAudience: q.targetAudience
  }));
};



const CyberRiskCalculator: React.FC = () => {
  const { language } = useLanguage();
  const [answers, setAnswers] = useState<Record<string, boolean>>({});
  const [showResults, setShowResults] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [showLeadCapture, setShowLeadCapture] = useState(false);
  const [leadData, setLeadData] = useState<LeadData>({
    email: '',
    company: '',
    role: '',
    phone: ''
  });
  const [isSubmittingLead, setIsSubmittingLead] = useState(false);
  const [showDetailedReport, setShowDetailedReport] = useState(false);
  const [timeLeft, setTimeLeft] = useState(3600); // 1 hora en segundos
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [showSegmentation, setShowSegmentation] = useState(true);
  const [segmentationStep, setSegmentationStep] = useState(0);

  // Helper function to get translations
  const t = (key: RiskCalculatorTranslationKey): string => {
    return (riskCalculatorTranslations[language as keyof typeof riskCalculatorTranslations]?.[key] || riskCalculatorTranslations.ES[key] || key);
  };

  const handleAnswer = (questionId: string, answer: boolean) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };
  
  // Obtener preguntas según el perfil del usuario
  const getQuestionsForProfile = (): Question[] => {
    if (!userProfile) return [];
    
    if (userProfile.type === 'individual') {
      return convertQuestionsToTranslated(individualQuestionsData, t);
    } else {
      // Para empresas, incluir preguntas tanto de negocio como generales
      const businessQuestions = convertQuestionsToTranslated(businessQuestionsData, t);
      return businessQuestions.filter(q => 
        q.targetAudience === 'business' || q.targetAudience === 'both'
      );
    }
  };
  
  // Manejar respuestas de segmentación
  const handleSegmentationAnswer = (questionId: string, value: string) => {
    if (questionId === 'user_type') {
      setUserProfile(prev => ({ 
        ...prev, 
        type: value as 'individual' | 'business'
      } as UserProfile));
    } else if (questionId === 'company_size') {
      setUserProfile(prev => ({ 
        ...prev, 
        companySize: value as 'small' | 'medium' | 'large' | 'enterprise'
      } as UserProfile));
    } else if (questionId === 'industry_type') {
      setUserProfile(prev => ({ 
        ...prev, 
        industry: value
      } as UserProfile));
    } else if (questionId === 'it_resources') {
      setUserProfile(prev => ({ 
        ...prev, 
        hasITTeam: value === 'yes'
      } as UserProfile));
    }
  };
  
  // Completar segmentación
  const completeSegmentation = () => {
    setShowSegmentation(false);
    setCurrentStep(0);
  };

  const calculateRisk = (): RiskResult => {
    const currentQuestions = getQuestionsForProfile();
    const totalWeight = currentQuestions.reduce((sum, q) => sum + q.weight, 0);
    const achievedScore = currentQuestions.reduce((sum, q) => {
      return sum + (answers[q.id] ? q.weight : 0);
    }, 0);
    
    const percentage = (achievedScore / totalWeight) * 100;
    const isIndividual = userProfile?.type === 'individual';
    const isBusiness = userProfile?.type === 'business';
    
    // Análisis por categorías para recomendaciones específicas
    const categoryAnalysis = {
      'Identidad y Acceso': 0,
      'Endpoints': 0,
      'Red y Perímetro': 0,
      'Protección de Datos': 0,
      'Detección y Respuesta': 0,
      'Gestión de Vulnerabilidades': 0,
      'Continuidad del Negocio': 0
    };
    
    currentQuestions.forEach(q => {
      const categoryKey = q.category as keyof typeof categoryAnalysis;
      if (categoryAnalysis[categoryKey] !== undefined) {
        categoryAnalysis[categoryKey] += answers[q.id] ? q.weight : 0;
      }
    });
    
    let level: RiskResult['level'];
    let color: string;
    let recommendations: string[];
    let urgency: RiskResult['urgency'];
    let businessImpact: string;
    let estimatedCost: string;
    let timeToImplement: string;
    
    // Datos reales basados en estadísticas de ciberseguridad 2024
    // Fuente: Costo promedio de brechas de datos: $4.88M (IBM Security)
    // 46% de brechas afectan empresas <1000 empleados
    // 74% de brechas causadas por error humano
    // 95% de incidentes PYME cuestan entre $826-$653,587
    
    if (percentage >= 90) {
      level = 'low';
      color = 'text-green-600';
      urgency = 'low';
      
      if (isIndividual) {
        businessImpact = 'Protección personal óptima - Riesgo de robo de identidad <1% (vs 15% promedio nacional)';
        estimatedCost = '€180 - €420/año (ROI: evita pérdidas promedio de €3,200/incidente)';
        timeToImplement = '1-2 meses';
        recommendations = [
          '🏆 EXCELENTE: Su seguridad personal supera el 95% de usuarios.',
          '🔄 Mantenga actualizados todos sus dispositivos (74% de brechas por error humano).',
          '🎯 VPN premium y gestores de contraseñas empresariales (reducen riesgo 85%).',
          '🚀 Autenticación biométrica (99.9% efectividad vs phishing).',
          '🤝 Comparta conocimientos - solo 23% de usuarios usan 2FA.',
          '📊 Revise configuraciones de privacidad (38% exponen datos innecesariamente).',
          '💡 Formación continua - amenazas evolucionan cada 39 segundos.'
        ];
      } else {
        businessImpact = 'Excelencia operativa - Riesgo de brecha <2% vs 46% promedio sector';
        estimatedCost = userProfile?.companySize === 'small' ? '€12,000 - €25,000/año (13.2% presupuesto IT)' : 
                       userProfile?.companySize === 'medium' ? '€35,000 - €75,000/año (ROI: evita €1.2M promedio)' :
                       userProfile?.companySize === 'large' ? '€85,000 - €180,000/año (vs €4.88M costo brecha)' : '€200,000 - €400,000/año (Enterprise grade)';
        timeToImplement = '3-6 meses';
        recommendations = [
          '🏆 NIVEL ENTERPRISE: Top 5% en madurez de ciberseguridad.',
          '🔄 Revisiones trimestrales (MTTR objetivo: <4 horas).',
          '🎯 ISO 27001/SOC 2 Type II (reduce primas seguro 15-30%).',
          '🚀 AI/ML para detección (mejora detección 67% vs métodos tradicionales).',
          '🤝 Threat intelligence sharing (reduce tiempo detección 23%).',
          '📊 Métricas avanzadas: MTTR <4h, MTTD <1h (benchmarks industria).',
          userProfile?.hasITTeam ? '👥 Certificaciones avanzadas (CISSP, CISM) para equipo IT.' : '💼 Equipo ciberseguridad dedicado (ROI: 3.2x en 24 meses).'
        ];
      }
    } else if (percentage >= 75) {
      level = 'medium';
      color = 'text-blue-600';
      urgency = 'medium';
      
      if (isIndividual) {
        businessImpact = 'Buena protección - Riesgo robo identidad 8% (vs 15% promedio)';
        estimatedCost = '€120 - €320/año (ROI: evita €2,400 promedio por incidente)';
        timeToImplement = '2-4 meses';
        recommendations = [
          '✅ NIVEL AVANZADO: Supera al 75% de usuarios en seguridad.',
          '🔐 2FA en cuentas críticas (reduce riesgo phishing 99.9%).',
          '🛡️ Gestor contraseñas profesional (solo 39% de usuarios lo usa).',
          '📋 Backups automáticos (60% usuarios pierden datos anualmente).',
          '🎓 Formación anti-phishing (reduce susceptibilidad 70%).',
          '🔍 Auditoría permisos apps (promedio: 67 apps con acceso excesivo).',
          '💳 Alertas bancarias (detecta fraude 89% más rápido).'
        ];
      } else {
        businessImpact = 'Reducción riesgo significativa - Probabilidad brecha 15% vs 46% promedio';
        estimatedCost = userProfile?.companySize === 'small' ? '€18,000 - €35,000 (vs €826-€653K costo incidente)' : 
                       userProfile?.companySize === 'medium' ? '€45,000 - €85,000 (ROI: 5.7x en 18 meses)' :
                       userProfile?.companySize === 'large' ? '€95,000 - €180,000 (vs €4.88M costo brecha promedio)' : '€180,000 - €350,000 (Enterprise)';
        timeToImplement = '6-12 meses';
        recommendations = [
          '✅ NIVEL AVANZADO: Top 25% empresas en madurez ciberseguridad.',
          '🔐 Zero Trust (reduce brechas laterales 67%).',
          '🛡️ XDR/SOAR (mejora tiempo respuesta 73%).',
          '📋 Gestión riesgos terceros (80% brechas vía proveedores).',
          '🎓 Concienciación continua (reduce error humano 45%).',
          '🔍 Red/Purple team (mejora detección 58%).',
          userProfile?.industry ? `🏭 Cumplimiento ${userProfile.industry} (evita multas promedio €2.3M).` : '📜 Evaluación normativa (GDPR, NIS2, etc.).'
        ];
      }
    } else if (percentage >= 60) {
      level = 'medium';
      color = 'text-yellow-600';
      urgency = 'medium';
      
      if (isIndividual) {
        businessImpact = 'Protección básica - Riesgo robo identidad 12% (vulnerable a ataques dirigidos)';
        estimatedCost = '€80 - €250/año (ROI: evita €1,800 promedio por incidente)';
        timeToImplement = '3-6 meses';
        recommendations = [
          '⚠️ NIVEL INTERMEDIO: Básicos cubiertos, vulnerabilidades críticas pendientes.',
          '🎯 Antivirus empresarial (detecta 95% vs 60% gratuitos).',
          '🔒 Firewall router (bloquea 78% intentos intrusión).',
          '🌐 VPN confiable (cifrado AES-256, sin logs).',
          '📊 Updates automáticos (parcha 89% vulnerabilidades conocidas).',
          '🚨 Formación anti-phishing (1 de cada 4 emails es malicioso).',
          '💾 Backup 3-2-1 (60% usuarios pierden datos críticos).',
          '🔐 Contraseñas únicas >12 caracteres (vs 123456 en top 10).'
        ];
      } else {
        businessImpact = 'Riesgo moderado - Probabilidad brecha 25% (necesita refuerzo crítico)';
        estimatedCost = userProfile?.companySize === 'small' ? '€35,000 - €65,000 (vs €826K-€653K costo incidente)' : 
                       userProfile?.companySize === 'medium' ? '€75,000 - €140,000 (ROI: 4.2x en 24 meses)' :
                       userProfile?.companySize === 'large' ? '€150,000 - €280,000 (vs €4.88M costo brecha)' : '€280,000 - €500,000 (Enterprise)';
        timeToImplement = '9-18 meses';
        recommendations = [
          '⚠️ NIVEL INTERMEDIO: Fundamentos presentes, gaps críticos identificados.',
          '🎯 SIEM/SOAR (reduce tiempo detección de días a horas).',
          '🔒 EDR/XDR endpoints (detecta 97% amenazas avanzadas).',
          '🌐 Microsegmentación (contiene 84% movimientos laterales).',
          '📊 Gestión vulnerabilidades (parcha CVEs críticos <72h).',
          '🚨 SOC 24/7 o MDR (reduce MTTR 67%).',
          userProfile?.hasITTeam ? '👥 Certificación respuesta incidentes (GCIH, GCFA).' : '💼 Especialista ciberseguridad (salario: €45K-€75K).'
        ];
      }
    } else if (percentage >= 40) {
      level = 'high';
      color = 'text-orange-600';
      urgency = 'high';
      
      if (isIndividual) {
        businessImpact = 'RIESGO ALTO: Probabilidad robo identidad 35% - Exposición crítica';
        estimatedCost = '€60 - €180/año (ROI: evita €3,200 promedio por incidente)';
        timeToImplement = '1-3 meses (URGENTE)';
        recommendations = [
          '🚨 RIESGO ELEVADO: Múltiples vulnerabilidades críticas detectadas.',
          '🔥 URGENTE: 2FA inmediato (99.9% efectivo vs account takeover).',
          '🛡️ Antivirus actualizado (malware crece 5.4M variantes/mes).',
          '🔐 Contraseñas únicas (81% brechas usan credenciales débiles).',
          '📋 Auditoría cuentas (promedio: 130 cuentas online por persona).',
          '🎯 Alertas actividad (detecta 67% actividad fraudulenta).',
          '💼 Monitoreo identidad (dark web, €15/mes vs €3,200 pérdida).',
          '📱 Updates críticos (86% exploits usan vulnerabilidades conocidas).'
        ];
      } else {
        businessImpact = 'RIESGO CRÍTICO: Probabilidad brecha 40% - Impacto financiero severo';
        estimatedCost = userProfile?.companySize === 'small' ? '€50,000 - €95,000 (vs €826K-€653K costo incidente)' : 
                       userProfile?.companySize === 'medium' ? '€110,000 - €200,000 (vs €1.2M costo promedio)' :
                       userProfile?.companySize === 'large' ? '€220,000 - €400,000 (vs €4.88M costo brecha)' : '€400,000 - €700,000 (Enterprise)';
        timeToImplement = '3-6 meses (URGENTE)';
        recommendations = [
          '🚨 RIESGO ELEVADO: Múltiples vectores de ataque expuestos.',
          '🔥 URGENTE: MFA administrativo (reduce riesgo 99.9%).',
          '🛡️ Antimalware empresarial (detecta 99.7% vs 60% básico).',
          '🔐 Cifrado datos (GDPR: multas hasta 4% facturación anual).',
          '📋 Plan respuesta incidentes (reduce MTTR 73%).',
          '🎯 Pentest externo (identifica 89% vulnerabilidades críticas).',
          '💼 MSSP/MDR (reduce costos 34% vs SOC interno).',
          userProfile?.hasITTeam ? '👥 Formación urgente (74% brechas por error humano).' : '🚨 Consultoría especializada (€150-€300/hora vs €4.88M brecha).'
        ];
      }
    } else {
      level = 'critical';
      color = 'text-red-600';
      urgency = 'critical';
      
      if (isIndividual) {
        businessImpact = 'EMERGENCIA: Probabilidad robo identidad >50% - Riesgo financiero extremo';
        estimatedCost = '€40 - €120/año (ROI: evita €5,400 promedio por incidente grave)';
        timeToImplement = '2-4 semanas (EMERGENCIA)';
        recommendations = [
          '🚨 RIESGO CRÍTICO: Exposición máxima - Acción inmediata requerida.',
          '⚡ HOY: Cambiar TODAS las contraseñas (81% brechas usan credenciales débiles).',
          '🔒 2FA inmediato email/banco (previene 99.9% account takeover).',
          '🎯 Antivirus + escaneo completo (5.4M nuevas variantes malware/mes).',
          '👥 Auditoría cuentas (promedio: 130 cuentas online expuestas).',
          '📊 Congelación crédito (previene 89% fraude identidad).',
          '💡 Protección identidad profesional (dark web monitoring).',
          '🚀 Consultoría especializada (vs €5,400 costo promedio incidente).',
          '📱 Updates críticos TODOS los dispositivos (86% exploits conocidos).'
        ];
      } else {
        businessImpact = 'EMERGENCIA: Probabilidad brecha >60% - Riesgo paralización negocio';
        estimatedCost = userProfile?.companySize === 'small' ? '€70,000 - €150,000 (vs €826K-€653K costo incidente)' : 
                       userProfile?.companySize === 'medium' ? '€180,000 - €350,000 (vs €2.4M costo promedio)' :
                       userProfile?.companySize === 'large' ? '€350,000 - €650,000 (vs €4.88M costo brecha)' : '€650,000 - €1,200,000 (Enterprise)';
        timeToImplement = '1-3 meses (EMERGENCIA)';
        recommendations = [
          '🚨 RIESGO CRÍTICO: Múltiples vectores críticos - Intervención urgente.',
          '⚡ CONTACTO INMEDIATO: SESECPRO para intervención de emergencia.',
          '🔒 Controles básicos urgentes (firewall, antivirus, backups).',
          '🎯 Políticas seguridad fundamentales (reduce riesgo 67%).',
          '👥 Equipo respuesta incidentes (MTTR objetivo: <24h).',
          '📊 Assessment completo (identifica 95% vulnerabilidades críticas).',
          '💡 Outsourcing ciberseguridad (reduce costos 34% vs interno).',
          '🚀 Roadmap transformación (compliance GDPR, NIS2).',
          userProfile?.hasITTeam ? '🔥 Formación urgente IT (74% brechas por error humano).' : '🚨 Servicios externos inmediatos (€200-€400/hora vs €4.88M brecha).'
        ];
      }
    }
    
    return { 
      score: Math.round(percentage), 
      level, 
      color, 
      recommendations, 
      urgency, 
      businessImpact, 
      estimatedCost, 
      timeToImplement 
    };
  };

  const resetCalculator = () => {
    setAnswers({});
    setShowResults(false);
    setCurrentStep(0);
    setShowLeadCapture(false);
    setLeadData({ email: '', company: '', role: '' });
    setShowDetailedReport(false);
    setTimeLeft(3600);
    setShowSegmentation(true);
    setSegmentationStep(0);
    setUserProfile(null);
  };

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingLead(true);
    
    // Simular envío de datos (aquí integrarías con tu CRM/backend)
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setShowLeadCapture(false);
      setShowDetailedReport(true);
      
      // Aquí enviarías los datos a tu sistema
      console.log('Lead capturado:', { ...leadData, assessment: result });
    } catch (error) {
      console.error('Error al enviar lead:', error);
    } finally {
      setIsSubmittingLead(false);
    }
  };

  const triggerLeadCapture = () => {
    setShowLeadCapture(true);
  };

  const nextStep = () => {
    const currentQuestions = getQuestionsForProfile();
    if (currentStep < currentQuestions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowResults(true);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const currentQuestions = getQuestionsForProfile();
  const progress = currentQuestions.length > 0 ? ((currentStep + 1) / currentQuestions.length) * 100 : 0;
  const currentQuestion = currentQuestions[currentStep];
  
  const result = showResults ? calculateRisk() : null;
  
  // Efecto para el contador de tiempo
  useEffect(() => {
    if (result && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [result, timeLeft]);
  
  // Formatear tiempo restante
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Modal de captura de leads
  if (showLeadCapture && result) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl max-w-md w-full p-8 relative">
          <button 
            onClick={() => setShowLeadCapture(false)}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          >
            <XCircleIcon className="h-6 w-6" />
          </button>
          
          <div className="text-center mb-6">
            <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
              result.urgency === 'critical' ? 'bg-red-100' :
              result.urgency === 'high' ? 'bg-orange-100' :
              result.urgency === 'medium' ? 'bg-yellow-100' : 'bg-blue-100'
            }`}>
              {result.urgency === 'critical' && <FireIcon className="h-8 w-8 text-red-600" />}
              {result.urgency === 'high' && <ExclamationTriangleIcon className="h-8 w-8 text-orange-600" />}
              {result.urgency === 'medium' && <BoltIcon className="h-8 w-8 text-yellow-600" />}
              {result.urgency === 'low' && <TrophyIcon className="h-8 w-8 text-blue-600" />}
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              {result.urgency === 'critical' && `🚨 ${t('criticalSituationDetected')}`}
              {result.urgency === 'high' && `⚠️ ${t('significantRisksIdentified')}`}
              {result.urgency === 'medium' && `📊 ${t('improvementOpportunities')}`}
              {result.urgency === 'low' && `🏆 ${t('excellentSecurityPosture')}`}
            </h3>
            <p className="text-gray-600 mb-4">
              {t('reportDescription')}
            </p>
          </div>

          <form onSubmit={handleLeadSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t('emailLabel')} *</label>
              <input
                type="email"
                required
                value={leadData.email}
                onChange={(e) => setLeadData({...leadData, email: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder={t('emailPlaceholder')}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t('companyLabel')} *</label>
              <input
                type="text"
                required
                value={leadData.company}
                onChange={(e) => setLeadData({...leadData, company: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder={t('companyPlaceholder')}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t('roleLabel')} *</label>
              <select
                required
                value={leadData.role}
                onChange={(e) => setLeadData({...leadData, role: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Seleccione su cargo</option>
                <option value="CEO/Gerente General">CEO/Gerente General</option>
                <option value="CTO/Director Tecnología">CTO/Director Tecnología</option>
                <option value="CISO/Director Seguridad">CISO/Director Seguridad</option>
                <option value="IT Manager">IT Manager</option>
                <option value="Responsable Sistemas">Responsable Sistemas</option>
                <option value="Otro">Otro</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t('phoneLabel')}</label>
              <input
                type="tel"
                value={leadData.phone || ''}
                onChange={(e) => setLeadData({...leadData, phone: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder={t('phonePlaceholder')}
              />
            </div>
            
            <button
              type="submit"
              disabled={isSubmittingLead}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 transition-all"
            >
              {isSubmittingLead ? t('submitting') : t('getDetailedReport')}
            </button>
            
            <p className="text-xs text-gray-500 text-center">
              Sus datos están protegidos. No compartimos información con terceros.
            </p>
          </form>
        </div>
      </div>
    );
  }

  if (showResults && result) {
    return (
      <div id="assessment-results" className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg">
        {/* Alerta de urgencia */}
        {(result.urgency === 'critical' || result.urgency === 'high') && (
          <div className={`mb-6 p-4 rounded-lg border-l-4 ${
            result.urgency === 'critical' 
              ? 'bg-red-50 border-red-500 text-red-800' 
              : 'bg-orange-50 border-orange-500 text-orange-800'
          }`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <FireIcon className="h-5 w-5 mr-2" />
                <span className="font-semibold">
                  {result.urgency === 'critical' 
                    ? 'ALERTA CRÍTICA: Acción inmediata requerida' 
                    : 'ATENCIÓN: Riesgos significativos detectados'}
                </span>
              </div>
              <span className="text-xs font-medium px-2 py-1 bg-white rounded animate-pulse">
                ⏰ Respuesta en 2h
              </span>
            </div>
            <p className="mt-2 text-sm">
              {result.urgency === 'critical'
                ? 'Su organización presenta vulnerabilidades críticas que requieren intervención inmediata. Cada día de retraso aumenta exponencialmente el riesgo de incidentes.'
                : 'Se han identificado riesgos significativos que deben abordarse con prioridad para evitar posibles incidentes de seguridad.'
              }
            </p>
            <div className="mt-3 p-3 bg-white rounded border">
              <div className="flex items-center justify-between text-sm">
                <span>💰 Costo potencial de un incidente:</span>
                <span className="font-bold text-red-600">
                  {result.urgency === 'critical' ? '€50,000 - €500,000+' : '€15,000 - €150,000'}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm mt-1">
                <span>🛡️ Costo de prevención:</span>
                <span className="font-bold text-green-600">
                  {result.estimatedCost}
                </span>
              </div>
            </div>
          </div>
        )}

        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('resultsTitle')}</h2>
          <div className="flex items-center justify-center mb-6">
            <div className={`text-6xl font-bold ${result.color} mr-4`}>{result.score}%</div>
            <div className="text-left">
              <div className="text-lg font-semibold text-gray-700">{t('securityLevel')}</div>
              <div className={`text-2xl font-bold ${result.color} capitalize`}>
                {result.level === 'low' && t('levelExcellent')}
                {result.level === 'medium' && t('levelGood')}
                {result.level === 'high' && t('levelHigh')}
                {result.level === 'critical' && t('levelCritical')}
              </div>
            </div>
          </div>
          
          {/* Indicador visual */}
          <div className="w-full bg-gray-200 rounded-full h-4 mb-6">
            <div 
              className={`h-4 rounded-full transition-all duration-500 ${
                result.level === 'low' ? 'bg-green-500' :
                result.level === 'medium' ? 'bg-yellow-500' :
                result.level === 'high' ? 'bg-orange-500' : 'bg-red-500'
              }`}
              style={{ width: `${result.score}%` }}
            ></div>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <ExclamationTriangleIcon className="h-6 w-6 mr-2 text-yellow-500" />
            {t('recommendationsTitle')}
          </h3>
          <ul className="space-y-3">
            {result.recommendations.map((rec, index) => (
              <li key={index} className="flex items-start">
                <CheckCircleIcon className="h-5 w-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">{rec}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Información de impacto empresarial */}
        <div className="bg-gradient-to-r from-slate-50 to-blue-50 p-6 rounded-lg mb-6 border border-slate-200">
          <h4 className="text-xl font-bold text-slate-900 mb-4 flex items-center">
            <ChartBarIcon className="h-6 w-6 mr-2 text-blue-600" />
            {t('businessImpactTitle')}
          </h4>
          <div className="grid md:grid-cols-3 gap-4 mb-4">
            <div className="text-center p-3 bg-white rounded-lg border">
              <div className="text-2xl font-bold text-blue-600">{result.timeToImplement}</div>
              <div className="text-sm text-slate-600">{t('implementationTime')}</div>
            </div>
            <div className="text-center p-3 bg-white rounded-lg border">
              <div className="text-2xl font-bold text-green-600">{result.estimatedCost}</div>
              <div className="text-sm text-slate-600">{t('preventionCost')}</div>
            </div>
            <div className="text-center p-3 bg-white rounded-lg border">
              <div className={`text-2xl font-bold ${
                result.urgency === 'critical' ? 'text-red-600' :
                result.urgency === 'high' ? 'text-orange-600' :
                result.urgency === 'medium' ? 'text-yellow-600' : 'text-green-600'
              }`}>
                {result.urgency === 'critical' ? t('urgencyCritical').toUpperCase() :
                 result.urgency === 'high' ? t('urgencyHigh').toUpperCase() :
                 result.urgency === 'medium' ? t('urgencyMedium').toUpperCase() : t('urgencyLow').toUpperCase()}
              </div>
              <div className="text-sm text-slate-600">{t('priority')}</div>
            </div>
          </div>
          <p className="text-slate-700 text-center italic">
            "{result.businessImpact}"
          </p>
        </div>

        {/* CTA mejorado */}
        <div className={`p-6 rounded-lg mb-6 border-2 ${
          result.urgency === 'critical' 
            ? 'bg-red-50 border-red-200' 
            : result.urgency === 'high'
            ? 'bg-orange-50 border-orange-200'
            : 'bg-blue-50 border-blue-200'
        }`}>
          <div className="text-center">
            <h4 className="text-2xl font-bold text-slate-900 mb-3">
              {result.urgency === 'critical' && '🚨 Intervención Urgente Requerida'}
              {result.urgency === 'high' && '⚠️ Consulta Prioritaria Recomendada'}
              {result.urgency === 'medium' && '📈 Optimice su Seguridad'}
              {result.urgency === 'low' && '🏆 Mantenga la Excelencia'}
            </h4>
            <p className="text-slate-700 mb-6 max-w-2xl mx-auto">
              {result.urgency === 'critical' && 'Su organización está en riesgo inmediato. Nuestros expertos pueden implementar controles críticos en 48-72 horas.'}
              {result.urgency === 'high' && 'Reduzca significativamente su exposición con nuestro plan de acción prioritario de 30 días.'}
              {result.urgency === 'medium' && 'Fortalezca su postura de seguridad con nuestro roadmap personalizado de mejora continua.'}
              {result.urgency === 'low' && 'Mantenga su liderazgo en ciberseguridad con nuestros servicios de optimización avanzada.'}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-4">
              <button 
                onClick={triggerLeadCapture}
                className={`px-8 py-4 rounded-lg font-bold text-lg transition-all transform hover:scale-105 ${
                  result.urgency === 'critical'
                    ? 'bg-red-600 hover:bg-red-700 text-white shadow-lg'
                    : result.urgency === 'high'
                    ? 'bg-orange-600 hover:bg-orange-700 text-white shadow-lg'
                    : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg'
                }`}
              >
                {result.urgency === 'critical' && '🚨 Consulta de Emergencia GRATIS'}
                {result.urgency === 'high' && '⚡ Consulta Prioritaria GRATIS'}
                {result.urgency === 'medium' && '📊 Consulta Estratégica GRATIS'}
                {result.urgency === 'low' && '🎯 Consulta de Optimización GRATIS'}
              </button>
              
              <a
                href="tel:+34900000000"
                className="flex items-center justify-center px-6 py-4 bg-white border-2 border-slate-300 text-slate-700 rounded-lg font-semibold hover:bg-slate-50 transition-all"
              >
                <PhoneIcon className="h-5 w-5 mr-2" />
                Llamar Ahora
              </a>
            </div>
            
            <div className="flex items-center justify-center text-sm text-slate-600">
              <CalendarDaysIcon className="h-4 w-4 mr-1" />
              <span>Respuesta en menos de 2 horas • Consulta sin compromiso</span>
            </div>
          </div>
        </div>

        {/* Botón para descargar PDF */}
        <div className="mb-6">
          <DownloadButton title={t('resultsTitle') || 'Informe de Evaluación'} contentSelector="#assessment-results" />
        </div>

        <div className="flex justify-center">
          <button 
            onClick={resetCalculator}
            className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-6 rounded-lg transition-colors"
          >
            Realizar Nueva Evaluación
          </button>
        </div>
      </div>
    );
  }

  // Interfaz de segmentación
  if (showSegmentation) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-t-2xl p-8 border border-slate-200">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-6">
              <ShieldCheckIcon className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-slate-900 mb-4">
              {t('calculatorTitle')}
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
              {t('personalizationMessage')}
            </p>
          </div>
        </div>
        
        <div className="bg-white rounded-b-2xl p-8">
          {segmentationStep === 0 && (
            <div className="text-center">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">
                {t('userTypeQuestion')}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                <button
                  onClick={() => {
                    handleSegmentationAnswer('user_type', 'individual');
                    setSegmentationStep(1);
                  }}
                  className="p-6 border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all group"
                >
                  <div className="text-4xl mb-4">👤</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('optionPersonal')}</h3>
                  <p className="text-gray-600">{t('personalDescription')}</p>
                </button>
                
                <button
                  onClick={() => {
                    handleSegmentationAnswer('user_type', 'business');
                    setSegmentationStep(1);
                  }}
                  className="p-6 border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all group"
                >
                  <div className="text-4xl mb-4">🏢</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('optionBusiness')}</h3>
                  <p className="text-gray-600">{t('businessDescription')}</p>
                </button>
              </div>
            </div>
          )}
          
          {segmentationStep === 1 && userProfile?.type === 'business' && (
            <div className="text-center">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">
                ¿Cuál es el tamaño de su organización?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
                {[
                  { value: 'small', label: 'Pequeña (1-50 empleados)', icon: '🏪' },
                  { value: 'medium', label: 'Mediana (51-250 empleados)', icon: '🏬' },
                  { value: 'large', label: 'Grande (251-1000 empleados)', icon: '🏢' },
                  { value: 'enterprise', label: 'Empresa (1000+ empleados)', icon: '🏭' }
                ].map((size) => (
                  <button
                    key={size.value}
                    onClick={() => {
                      handleSegmentationAnswer('company_size', size.value);
                      setSegmentationStep(2);
                    }}
                    className="p-4 border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all text-left"
                  >
                    <div className="flex items-center">
                      <span className="text-2xl mr-3">{size.icon}</span>
                      <span className="font-medium">{size.label}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {segmentationStep === 1 && userProfile?.type === 'individual' && (
            <div className="text-center">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">
                ¡Perfecto! Evaluaremos su seguridad personal
              </h2>
              <p className="text-gray-600 mb-8">
                Nuestro cuestionario está personalizado para evaluar la ciberseguridad en el ámbito personal, 
                incluyendo dispositivos, cuentas online, y hábitos de seguridad digital.
              </p>
              <button
                onClick={completeSegmentation}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all"
              >
                🚀 Comenzar Evaluación Personal
              </button>
            </div>
          )}
          
          {segmentationStep === 2 && userProfile?.type === 'business' && (
            <div className="text-center">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">
                ¿Cuenta con un equipo de IT dedicado?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                <button
                  onClick={() => {
                    handleSegmentationAnswer('it_resources', 'yes');
                    completeSegmentation();
                  }}
                  className="p-6 border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all"
                >
                  <div className="text-4xl mb-4">👥</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Sí, tenemos equipo IT</h3>
                  <p className="text-gray-600">Contamos con personal técnico interno</p>
                </button>
                
                <button
                  onClick={() => {
                    handleSegmentationAnswer('it_resources', 'no');
                    completeSegmentation();
                  }}
                  className="p-6 border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all"
                >
                  <div className="text-4xl mb-4">🤝</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No, externalizamos IT</h3>
                  <p className="text-gray-600">Dependemos de proveedores externos</p>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 rounded-2xl shadow-2xl overflow-hidden">
        <div className="bg-white/10 backdrop-blur-sm border-b border-white/20">
          <div className="text-center py-8 px-6">
            <div className="flex items-center justify-center mb-4">
              <ShieldCheckIcon className="h-12 w-12 text-cyan-400 mr-3" />
              <h1 className="text-4xl font-bold text-white">
                {userProfile?.type === 'individual' ? 'Evaluación de Seguridad Personal' : 'Enterprise Security Assessment'}
              </h1>
            </div>
            <p className="text-blue-100 text-lg max-w-3xl mx-auto">
              {userProfile?.type === 'individual' 
                ? 'Evaluación personalizada de su ciberseguridad personal y protección digital'
                : 'Evaluación avanzada de madurez en ciberseguridad basada en frameworks internacionales (NIST, ISO 27001, CIS Controls)'
              }
            </p>
            <div className="flex justify-center items-center mt-4 space-x-6 text-sm text-blue-200">
              <div className="flex items-center">
                <ClockIcon className="h-4 w-4 mr-1" />
                <span>15-20 minutos</span>
              </div>
              <div className="flex items-center">
                <ChartBarIcon className="h-4 w-4 mr-1" />
                <span>Análisis por categorías</span>
              </div>
              <div className="flex items-center">
                <DocumentTextIcon className="h-4 w-4 mr-1" />
                <span>Reporte ejecutivo</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-b-2xl p-8">

          {/* Progress Section */}
          <div className="mb-10">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center space-x-4">
                <span className="text-lg font-semibold text-slate-700">
                  Pregunta {currentStep + 1} de {currentQuestions.length}
                </span>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full">
                  {currentQuestion.category}
                </span>
                {currentStep > Math.floor(currentQuestions.length * 0.8) && (
                  <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full animate-pulse">
                    🎯 ¡Casi terminado!
                  </span>
                )}
              </div>
              <span className="text-sm text-slate-500 font-medium">
                {Math.round(progress)}% completado
              </span>
            </div>
            
            <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-blue-500 to-indigo-600 h-3 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            
            {/* Mini progress indicators */}
            <div className="flex justify-between mt-2">
              {currentQuestions.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index <= currentStep ? 'bg-blue-500' : 'bg-slate-300'
                  }`}
                ></div>
              ))}
            </div>
          </div>

          {/* Question Section */}
          <div className="mb-10">
            <div className="bg-slate-50 rounded-xl p-8 mb-8 border border-slate-200">
               <h2 className="text-2xl font-bold text-slate-900 mb-4 leading-tight">
                 {currentQuestion.question}
               </h2>
               
               {/* Indicador de peso de la pregunta */}
               <div className="flex items-center justify-between mb-4">
                 <div className="flex items-center text-sm text-slate-600">
                   <span className="mr-2">Impacto en seguridad:</span>
                   <div className="flex">
                     {[...Array(5)].map((_, i) => (
                       <div
                         key={i}
                         className={`w-2 h-2 rounded-full mr-1 ${
                           i < Math.ceil((currentQuestion.weight / 12) * 5) 
                             ? 'bg-blue-500' 
                             : 'bg-slate-300'
                         }`}
                       ></div>
                     ))}
                   </div>
                 </div>
                 
                 {currentQuestion.weight >= 8 && (
                   <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-medium rounded">
                     🔥 CRÍTICO
                   </span>
                 )}
               </div>

             </div>
            
            <div className="space-y-4">
              <button
                 onClick={() => handleAnswer(currentQuestion.id, true)}
                className={`group w-full p-6 text-left rounded-xl border-2 transition-all duration-200 ${
                  answers[currentQuestion.id] === true
                    ? 'border-green-500 bg-green-50 shadow-lg shadow-green-100'
                    : 'border-slate-200 hover:border-green-400 hover:bg-green-50 hover:shadow-md'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className={`p-2 rounded-full mr-4 transition-colors ${
                      answers[currentQuestion.id] === true 
                        ? 'bg-green-500' 
                        : 'bg-slate-300 group-hover:bg-green-400'
                    }`}>
                      <CheckCircleIcon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <span className="text-lg font-semibold text-slate-900">Sí, implementado</span>
                      <p className="text-sm text-slate-600 mt-1">Este control está activo en nuestra organización</p>
                    </div>
                  </div>
                  {answers[currentQuestion.id] === true && (
                    <div className="text-green-600">
                      <CheckCircleIcon className="h-8 w-8" />
                    </div>
                  )}
                </div>
              </button>
              
              <button
                 onClick={() => handleAnswer(currentQuestion.id, false)}
                className={`group w-full p-6 text-left rounded-xl border-2 transition-all duration-200 ${
                  answers[currentQuestion.id] === false
                    ? 'border-red-500 bg-red-50 shadow-lg shadow-red-100'
                    : 'border-slate-200 hover:border-red-400 hover:bg-red-50 hover:shadow-md'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className={`p-2 rounded-full mr-4 transition-colors ${
                      answers[currentQuestion.id] === false 
                        ? 'bg-red-500' 
                        : 'bg-slate-300 group-hover:bg-red-400'
                    }`}>
                      <XCircleIcon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <span className="text-lg font-semibold text-slate-900">No implementado</span>
                      <p className="text-sm text-slate-600 mt-1">Este control no está implementado o no estoy seguro</p>
                    </div>
                  </div>
                  {answers[currentQuestion.id] === false && (
                    <div className="text-red-600">
                      <XCircleIcon className="h-8 w-8" />
                    </div>
                  )}
                </div>
              </button>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center pt-6 border-t border-slate-200">
            <button
               onClick={prevStep}
               disabled={currentStep === 0}
               className="flex items-center px-6 py-3 text-slate-600 border-2 border-slate-300 rounded-xl hover:bg-slate-50 hover:border-slate-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium"
             >
               <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
               </svg>
               Anterior
             </button>
             
             <button
               onClick={nextStep}
               disabled={answers[currentQuestion.id] === undefined}
               className="flex items-center px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-semibold shadow-lg"
             >
               {currentStep === currentQuestions.length - 1 ? (
                 <span className="flex items-center">
                   🎯 Generar Reporte Personalizado
                   <BoltIcon className="h-5 w-5 ml-2" />
                 </span>
               ) : (
                 <span className="flex items-center">
                   Siguiente
                   <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                   </svg>
                 </span>
               )}
             </button>
             
             {/* Valor agregado en las últimas preguntas */}
             {currentStep > currentQuestions.length - 5 && (
               <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                 <div className="flex items-center text-blue-800">
                   <TrophyIcon className="h-5 w-5 mr-2" />
                   <span className="text-sm font-medium">
                     Su reporte incluirá: Análisis de riesgo personalizado • Plan de acción prioritario • Estimación de costos • Consulta gratuita
                   </span>
                 </div>
               </div>
             )}
           </div>
         </div>
       </div>

       {/* Results */}
      {showResults && (
        <div className="mt-8">
          {/* Executive Summary */}
          <div className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-xl p-8 mb-8 border border-slate-200">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-3xl font-bold text-slate-900 mb-2">Reporte Ejecutivo de Ciberseguridad</h2>
                <p className="text-slate-600">Evaluación completa basada en {currentQuestions.length} controles de seguridad</p>
              </div>
              <div className="text-right">
                <div className={`text-5xl font-bold ${result?.color} mb-1`}>{result?.score}%</div>
                <div className="text-sm text-slate-500">Índice de Madurez</div>
              </div>
            </div>
            
            {/* Risk Level Badge */}
            <div className={`inline-flex items-center px-6 py-3 rounded-full text-lg font-semibold mb-6 ${
              result?.level === 'low' ? 'bg-green-100 text-green-800 border-2 border-green-200' :
              result?.level === 'medium' ? 'bg-blue-100 text-blue-800 border-2 border-blue-200' :
              result?.level === 'high' ? 'bg-orange-100 text-orange-800 border-2 border-orange-200' : 
              'bg-red-100 text-red-800 border-2 border-red-200'
            }`}>
              {result?.level === 'low' && <CheckCircleIcon className="h-6 w-6 mr-2" />}
              {result?.level === 'medium' && <ShieldCheckIcon className="h-6 w-6 mr-2" />}
              {result?.level === 'high' && <ExclamationTriangleIcon className="h-6 w-6 mr-2" />}
              {result?.level === 'critical' && <XCircleIcon className="h-6 w-6 mr-2" />}
              
              {result?.level === 'low' && 'NIVEL ENTERPRISE'}
              {result?.level === 'medium' && (result?.score ?? 0) >= 75 ? 'NIVEL AVANZADO' : 'NIVEL INTERMEDIO'}
              {result?.level === 'high' && 'RIESGO ELEVADO'}
              {result?.level === 'critical' && 'RIESGO CRÍTICO'}
            </div>
            
            {/* Progress Bar */}
            <div className="mb-4">
              <div className="flex justify-between text-sm text-slate-600 mb-2">
                <span>Nivel de Madurez en Ciberseguridad</span>
                <span>{result?.score}% de {currentQuestions.length} controles</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-4 overflow-hidden">
                <div 
                  className={`h-4 rounded-full transition-all duration-1000 ease-out ${
                    result?.level === 'low' ? 'bg-gradient-to-r from-green-500 to-green-600' :
                    result?.level === 'medium' ? (result?.score ?? 0) >= 75 ? 'bg-gradient-to-r from-blue-500 to-blue-600' : 'bg-gradient-to-r from-yellow-500 to-yellow-600' :
                    result?.level === 'high' ? 'bg-gradient-to-r from-orange-500 to-orange-600' : 'bg-gradient-to-r from-red-500 to-red-600'
                  }`}
                  style={{ width: `${result?.score ?? 0}%` }}
                ></div>
              </div>
            </div>
            
            {/* Maturity Scale */}
            <div className="grid grid-cols-4 gap-2 text-xs text-slate-500 mt-2">
              <div className="text-center">
                <div className="h-1 bg-red-300 rounded mb-1"></div>
                <span>0-39% Crítico</span>
              </div>
              <div className="text-center">
                <div className="h-1 bg-orange-300 rounded mb-1"></div>
                <span>40-59% Alto</span>
              </div>
              <div className="text-center">
                <div className="h-1 bg-yellow-300 rounded mb-1"></div>
                <span>60-74% Medio</span>
              </div>
              <div className="text-center">
                <div className="h-1 bg-blue-300 rounded mb-1"></div>
                <span>75-89% Avanzado</span>
              </div>
            </div>
          </div>
          
          {/* Recommendations */}
          <div className="bg-white rounded-xl border border-slate-200 p-8 mb-8">
            <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
              <DocumentTextIcon className="h-7 w-7 mr-3 text-blue-600" />
              Plan de Acción Recomendado
            </h3>
            <div className="space-y-4">
              {result?.recommendations.map((rec, index) => (
                <div key={index} className="flex items-start p-4 bg-slate-50 rounded-lg border-l-4 border-blue-500">
                  <span className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold mr-4 mt-0.5">
                    {index + 1}
                  </span>
                  <span className="text-slate-700 leading-relaxed">{rec}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* CTA Section Mejorado */}
          <div className={`rounded-xl p-8 text-white text-center ${
            result?.urgency === 'critical' 
              ? 'bg-gradient-to-r from-red-600 to-red-800' 
              : result?.urgency === 'high'
              ? 'bg-gradient-to-r from-orange-600 to-orange-800'
              : 'bg-gradient-to-r from-blue-600 to-indigo-700'
          }`}>
            <div className="max-w-4xl mx-auto">
              <h3 className="text-3xl font-bold mb-4">
                {result?.urgency === 'critical' && '🚨 Acción Inmediata Requerida'}
                {result?.urgency === 'high' && '⚠️ No Espere Más - Actúe Ahora'}
                {result?.urgency === 'medium' && '📈 Transforme su Ciberseguridad'}
                {result?.urgency === 'low' && '🏆 Mantenga su Liderazgo'}
              </h3>
              
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <CalendarDaysIcon className="h-8 w-8 mx-auto mb-2" />
                  <h4 className="font-semibold mb-1">Consulta Gratuita</h4>
                  <p className="text-sm opacity-90">30 minutos con expertos certificados</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <DocumentTextIcon className="h-8 w-8 mx-auto mb-2" />
                  <h4 className="font-semibold mb-1">Reporte Detallado</h4>
                  <p className="text-sm opacity-90">Plan de acción personalizado</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <ShieldCheckIcon className="h-8 w-8 mx-auto mb-2" />
                  <h4 className="font-semibold mb-1">Implementación</h4>
                  <p className="text-sm opacity-90">Soporte completo de expertos</p>
                </div>
              </div>
              
              <p className="text-lg mb-8 max-w-3xl mx-auto opacity-95">
                {result?.urgency === 'critical' && 'Cada minuto cuenta. Su organización está expuesta a amenazas críticas que requieren intervención inmediata de nuestros especialistas.'}
                {result?.urgency === 'high' && 'Los riesgos identificados pueden materializarse en cualquier momento. Nuestro equipo puede reducir su exposición en 30 días.'}
                {result?.urgency === 'medium' && 'Fortalezca su postura de seguridad con nuestro enfoque probado y metodología de clase mundial.'}
                {result?.urgency === 'low' && 'Mantenga su excelencia operativa y explore las últimas innovaciones en ciberseguridad empresarial.'}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
                <button
                  onClick={triggerLeadCapture}
                  className="bg-white text-slate-900 px-10 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg"
                >
                  🎯 Obtener Consulta GRATUITA
                </button>
                
                <a
                  href="tel:+34900000000"
                  className="flex items-center justify-center bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-slate-900 transition-all"
                >
                  <PhoneIcon className="h-5 w-5 mr-2" />
                  Llamar Ahora
                </a>
                
                <button
                  onClick={() => {
                    setShowResults(false);
                    setCurrentStep(0);
                    setAnswers({});
                  }}
                  className="bg-transparent border border-white/50 text-white px-6 py-4 rounded-lg font-medium hover:bg-white/10 transition-colors"
                >
                  Nueva Evaluación
                </button>
              </div>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm opacity-90">
                <div className="flex items-center">
                  <CheckCircleIcon className="h-4 w-4 mr-1" />
                  <span>Respuesta en 2 horas</span>
                </div>
                <div className="flex items-center">
                  <CheckCircleIcon className="h-4 w-4 mr-1" />
                  <span>Sin compromiso</span>
                </div>
                <div className="flex items-center">
                  <CheckCircleIcon className="h-4 w-4 mr-1" />
                  <span>Expertos certificados</span>
                </div>
              </div>
              
              {/* Elementos de escasez y prueba social */}
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                   <div className="flex items-center justify-between mb-2">
                     <div className="flex items-center">
                       <span className="text-white/90 text-sm font-medium">🔥 Oferta limitada</span>
                       <span className="ml-2 px-2 py-1 bg-red-500 text-white text-xs rounded animate-pulse">
                         Solo hoy
                       </span>
                     </div>
                     <div className="text-white font-mono text-sm bg-black/30 px-2 py-1 rounded">
                       ⏰ {formatTime(timeLeft)}
                     </div>
                   </div>
                   <p className="text-white/80 text-sm">
                     Consulta gratuita + Reporte detallado valorado en €500
                   </p>
                   {timeLeft < 600 && (
                     <p className="text-red-200 text-xs mt-2 animate-pulse">
                       ⚠️ ¡Menos de 10 minutos restantes!
                     </p>
                   )}
                 </div>
                
                <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                  <div className="flex items-center mb-2">
                    <span className="text-white/90 text-sm font-medium">👥 Prueba social</span>
                  </div>
                  <p className="text-white/80 text-sm">
                    +200 empresas ya han mejorado su seguridad con nosotros
                  </p>
                  <div className="flex items-center mt-2">
                    <div className="flex -space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <div key={i} className="w-6 h-6 bg-blue-500 rounded-full border-2 border-white flex items-center justify-center text-xs text-white font-bold">
                          {String.fromCharCode(65 + i)}
                        </div>
                      ))}
                    </div>
                    <span className="ml-2 text-white/70 text-xs">y muchas más...</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CyberRiskCalculator;