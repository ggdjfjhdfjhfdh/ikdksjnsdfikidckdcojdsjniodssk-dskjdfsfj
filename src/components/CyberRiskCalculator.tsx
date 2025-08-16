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
  BoltIcon,
  LockClosedIcon,
  ChatBubbleLeftRightIcon,
  ComputerDesktopIcon
} from '@heroicons/react/24/outline';
import { 
  SiWhatsapp, 
  SiTelegram, 
  SiSignal, 
  SiInstagram, 
  SiApple, 
  SiAndroid
} from 'react-icons/si';
import { useLanguage } from '@/lib/LanguageContext';
import { riskCalculatorTranslations, type RiskCalculatorTranslationKey } from '@/lib/riskCalculatorTranslations';
import { businessQuestions as businessQuestionsData, individualQuestions as individualQuestionsData } from '@/lib/riskCalculatorQuestions';
import DownloadButton from './DownloadButton';
import OptimizedImage from './OptimizedImage';
import { VideoBackground } from './VideoBackground';

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
  // Nuevos campos para filtrado personalizado
  messagingAppsInstalled?: boolean;
  messagingApps?: string[];
  deviceBrands?: string[];
  hasChildren?: boolean;
}

interface ContentPreferences {
  familyProtection: boolean;
  antiScamTips: boolean;
  deviceGuides: boolean;
}

interface ActionStep {
  id: number;
  title: string;
  description: string;
  priority: 'CRÍTICO' | 'ALTO' | 'MEDIO';
  timeframe: 'Inmediato' | '1-3 meses' | '3-6 meses';
  category: '🚨 Inmediato' | '⚡ Corto Plazo' | '📈 Medio Plazo';
}

interface RiskResult {
  score: number;
  level: 'low' | 'medium' | 'high' | 'critical';  
  color: string;
  actionPlan: ActionStep[];
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
  const [isClient, setIsClient] = useState(false);
  const [contentPrefs, setContentPrefs] = useState<ContentPreferences>({ familyProtection: false, antiScamTips: false, deviceGuides: false });
  const [showContentSetup, setShowContentSetup] = useState(false);

  // Prevent hydration mismatch by ensuring client-side rendering
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Helper function to get translations
  const t = (key: RiskCalculatorTranslationKey): string => {
    const translations = riskCalculatorTranslations[language as keyof typeof riskCalculatorTranslations];
    if (translations && key in translations) {
      return translations[key as keyof typeof translations];
    }
    return riskCalculatorTranslations.ES[key as keyof typeof riskCalculatorTranslations.ES] || key;
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
        type: value as 'individual' | 'business',
        // Inicializar campos de filtrado al elegir tipo
        messagingAppsInstalled: false,
        messagingApps: [],
        deviceBrands: [],
        hasChildren: false
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
    } else if (questionId === 'messaging_apps_installed') {
      setUserProfile(prev => ({
        ...prev,
        messagingAppsInstalled: value === 'yes'
      } as UserProfile));
    } else if (questionId === 'has_children') {
      setUserProfile(prev => ({
        ...prev,
        hasChildren: value === 'yes'
      } as UserProfile));
    }
  };
  
  // Funciones helper para manejar listas (apps de mensajería y marcas de dispositivos)
  const toggleMessagingApp = (app: string) => {
    setUserProfile(prev => {
      if (!prev) return prev;
      const apps = prev.messagingApps || [];
      const newApps = apps.includes(app) ? apps.filter(a => a !== app) : [...apps, app];
      return { ...prev, messagingApps: newApps };
    });
  };

  const toggleDeviceBrand = (brand: string) => {
    setUserProfile(prev => {
      if (!prev) return prev;
      const brands = prev.deviceBrands || [];
      const newBrands = brands.includes(brand) ? brands.filter(b => b !== brand) : [...brands, brand];
      return { ...prev, deviceBrands: newBrands };
    });
  };
  
  // Completar segmentación
  const completeSegmentation = () => {
    setShowSegmentation(false);
    setCurrentStep(0);
  };

  // Preferencias de contenido iniciales
  const handleContentPrefChange = (key: keyof ContentPreferences, value: boolean) => {
    setContentPrefs(prev => ({ ...prev, [key]: value }));
  };
  const completeContentSetup = () => {
    setShowContentSetup(false);
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
    let actionPlan: ActionStep[];
    let urgency: RiskResult['urgency'];
    let businessImpact: string;
    let estimatedCost: string;
    let timeToImplement: string;
    
    // Helper para estructurar pasos con metadatos según prioridad
    const createActionSteps = (steps: Array<{ title: string; description: string }>): ActionStep[] =>
      steps.map((step, index) => ({
        id: index + 1,
        title: step.title,
        description: step.description,
        priority: index < 2 ? 'CRÍTICO' : index < 4 ? 'ALTO' : 'MEDIO',
        timeframe: index < 2 ? 'Inmediato' : index < 4 ? '1-3 meses' : '3-6 meses',
        category: index < 2 ? '🚨 Inmediato' : index < 4 ? '⚡ Corto Plazo' : '📈 Medio Plazo'
      }));
    
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
        actionPlan = createActionSteps([
          { title: 'Mantén todo actualizado', description: '1) Activa actualizaciones automáticas en móvil y PC. 2) Actualiza apps críticas (correo, navegador, banca, redes). 3) Reinicia al finalizar.' },
          { title: 'Autenticación biométrica y 2FA', description: '1) Habilita FaceID/TouchID o biometría. 2) Activa 2FA en correo, banca y redes. 3) Guarda códigos de respaldo en el gestor.' },
          { title: 'Gestor de contraseñas empresarial', description: '1) Instala el gestor en todos tus dispositivos. 2) Cambia contraseñas débiles por únicas >12 caracteres. 3) Activa autocompletado seguro.' },
          { title: 'Privacidad avanzada', description: '1) Revisa privacidad en redes (solo amigos/privado). 2) Desactiva geolocalización en publicaciones. 3) Elimina datos sensibles públicos.' },
          { title: 'VPN premium', description: '1) Configura una VPN confiable (no gratuitas). 2) Activa en redes Wi‑Fi públicas. 3) Desactiva cuando no se use para ahorro de batería.' }
        ]);
      } else {
        businessImpact = 'Excelencia operativa - Riesgo de brecha <2% vs 46% promedio sector';
        estimatedCost = userProfile?.companySize === 'small' ? '€12,000 - €25,000/año (13.2% presupuesto IT)' : 
                       userProfile?.companySize === 'medium' ? '€35,000 - €75,000/año (ROI: evita €1.2M promedio)' :
                       userProfile?.companySize === 'large' ? '€85,000 - €180,000/año (vs €4.88M costo brecha)' : '€200,000 - €400,000/año (Enterprise grade)';
        timeToImplement = '3-6 meses';
        actionPlan = createActionSteps([
          { title: 'Zero Trust en accesos', description: '1) MFA obligatorio en VPN/SSO. 2) Segmenta redes. 3) Revisa accesos privilegiados y elimina cuentas huérfanas.' },
          { title: 'Gestión de credenciales privilegiadas', description: '1) Implanta PAM o bóveda segura. 2) Rotación trimestral de contraseñas. 3) Registra y audita accesos.' },
          { title: 'EDR/XDR en endpoints críticos', description: '1) Despliega agente EDR/XDR. 2) Activa reglas de detección. 3) Configura alertas y playbooks.' },
          { title: 'Simulaciones de phishing', description: '1) Programa campañas bimensuales. 2) Mide tasas de clics. 3) Refuerza formación focalizada.' },
          { title: 'Protección de datos (DLP)', description: '1) Clasifica datos sensibles. 2) Define políticas DLP. 3) Monitoriza y bloquea exfiltración.' }
        ]);
      }
    } else if (percentage >= 75) {
      level = 'medium';
      color = 'text-blue-600';
      urgency = 'medium';
      
      if (isIndividual) {
        businessImpact = 'Buena protección - Riesgo robo identidad 8% (vs 15% promedio)';
        estimatedCost = '€120 - €320/año (ROI: evita €2,400 promedio por incidente)';
        timeToImplement = '2-4 meses';
        actionPlan = createActionSteps([
          { title: 'Activa 2FA en cuentas críticas', description: '1) Empieza por correo y banca. 2) Usa app de autenticación (no SMS). 3) Guarda códigos de recuperación.' },
          { title: 'Instala gestor de contraseñas', description: '1) Crea bóveda y contraseña maestra fuerte. 2) Cambia contraseñas débiles. 3) Activa 2FA del gestor.' },
          { title: 'Copia de seguridad automática', description: '1) iCloud/Drive/OneDrive o disco externo. 2) Programa semanal. 3) Prueba restauración de un archivo.' },
          { title: 'Revisión de permisos de apps', description: '1) Revisa permisos por app. 2) Revoca acceso innecesario. 3) Desinstala apps no usadas.' },
          { title: 'Alertas bancarias', description: '1) Activa notificaciones de login y transacciones. 2) Verifica movimientos sospechosos. 3) Ajusta límites.' }
        ]);
      } else {
        businessImpact = 'Reducción riesgo significativa - Probabilidad brecha 15% vs 46% promedio';
        estimatedCost = userProfile?.companySize === 'small' ? '€18,000 - €35,000 (vs €826-€653K costo incidente)' : 
                       userProfile?.companySize === 'medium' ? '€45,000 - €85,000 (ROI: 5.7x en 18 meses)' :
                       userProfile?.companySize === 'large' ? '€95,000 - €180,000 (vs €4.88M costo brecha promedio)' : '€180,000 - €350,000 (Enterprise)';
        timeToImplement = '6-12 meses';
        actionPlan = createActionSteps([
          { title: 'Zero Trust', description: '1) MFA obligatorio en todas las apps. 2) Segmentación por roles. 3) Inventario y control de accesos.' },
          { title: 'XDR/SOAR', description: '1) Centraliza detecciones. 2) Automatiza respuestas comunes. 3) Define runbooks y métricas (MTTD/MTTR).' },
          { title: 'Riesgo de terceros', description: '1) Inventario de proveedores. 2) Evaluación periódica. 3) Cláusulas de seguridad y auditoría.' },
          { title: 'Concienciación', description: '1) Formación mensual breve. 2) Simulaciones de phishing. 3) KPIs de mejora por equipo.' },
          { title: 'Cumplimiento normativo', description: '1) Gap analysis GDPR/NIS2. 2) Plan de remediación. 3) Auditoría interna.' }
        ]);
      }
    } else if (percentage >= 60) {
      level = 'medium';
      color = 'text-yellow-600';
      urgency = 'medium';
      
      if (isIndividual) {
        businessImpact = 'Protección básica - Riesgo robo identidad 12% (vulnerable a ataques dirigidos)';
        estimatedCost = '€80 - €250/año (ROI: evita €1,800 promedio por incidente)';
        timeToImplement = '3-6 meses';
        actionPlan = createActionSteps([
          { title: 'Antivirus de nivel empresarial', description: '1) Instala una solución reputada. 2) Programa análisis semanal. 3) Activa protección en tiempo real.' },
          { title: 'Asegura tu router', description: '1) Cambia la contraseña y desactiva WPS. 2) Actualiza firmware. 3) Activa firewall.' },
          { title: 'VPN confiable', description: '1) Configura VPN sólo de proveedores confiables. 2) Úsala en Wi‑Fi públicas. 3) Verifica que esté conectada.' },
          { title: 'Actualizaciones automáticas', description: '1) Activa updates del sistema. 2) Actualiza navegador y apps clave. 3) Reinicia semanalmente.' },
          { title: 'Backup 3-2-1', description: '1) 3 copias, 2 medios, 1 fuera de línea. 2) Programa copia automática. 3) Prueba restauración.' }
        ]);
      } else {
        businessImpact = 'Riesgo moderado - Probabilidad brecha 25% (necesita refuerzo crítico)';
        estimatedCost = userProfile?.companySize === 'small' ? '€35,000 - €65,000 (vs €826K-€653K costo incidente)' : 
                       userProfile?.companySize === 'medium' ? '€75,000 - €140,000 (ROI: 4.2x en 24 meses)' :
                       userProfile?.companySize === 'large' ? '€150,000 - €280,000 (vs €4.88M costo brecha)' : '€280,000 - €500,000 (Enterprise)';
        timeToImplement = '9-18 meses';
        actionPlan = createActionSteps([
          { title: 'SIEM/SOAR', description: '1) Centraliza logs críticos. 2) Casos de uso prioritarios. 3) Playbooks de respuesta.' },
          { title: 'EDR/XDR endpoints', description: '1) Despliegue por fases. 2) Políticas de bloqueo. 3) Integración con SIEM.' },
          { title: 'Microsegmentación', description: '1) Mapa de flujos. 2) Segmenta por función. 3) Políticas de acceso mínimo.' },
          { title: 'Vulnerabilidades', description: '1) Escaneo continuo. 2) SLA: críticos <72h. 3) Parcheo y verificación.' },
          { title: 'SOC 24/7 o MDR', description: '1) Contrata servicio o monta interno. 2) Define KPIs (MTTD/MTTR). 3) Informes mensuales.' }
        ]);
      }
    } else if (percentage >= 40) {
      level = 'high';
      color = 'text-orange-600';
      urgency = 'high';
      
      if (isIndividual) {
        businessImpact = 'RIESGO ALTO: Probabilidad robo identidad 35% - Exposición crítica';
        estimatedCost = '€60 - €180/año (ROI: evita €3,200 promedio por incidente)';
        timeToImplement = '1-3 meses (URGENTE)';
        actionPlan = createActionSteps([
          { title: 'Activa 2FA URGENTE', description: '1) Correo y banca HOY mismo. 2) Apps de autenticación (no SMS). 3) Guarda códigos de respaldo.' },
          { title: 'Antivirus y escaneo completo', description: '1) Instala antivirus reputado. 2) Escaneo completo del sistema. 3) Activa protección en tiempo real.' },
          { title: 'Cambiar TODAS las contraseñas', description: '1) Instala gestor de contraseñas. 2) Cambia contraseñas por únicas >12 caracteres. 3) Prioriza cuentas críticas.' },
          { title: 'Auditoría de cuentas', description: '1) Lista todas tus cuentas online. 2) Cierra las no utilizadas. 3) Activa alertas de login.' },
          { title: 'Updates críticos', description: '1) Actualiza sistema operativo. 2) Actualiza navegadores y apps. 3) Activa updates automáticos.' }
        ]);
      } else {
        businessImpact = 'RIESGO CRÍTICO: Probabilidad brecha 40% - Impacto financiero severo';
        estimatedCost = userProfile?.companySize === 'small' ? '€50,000 - €95,000 (vs €826K-€653K costo incidente)' : 
                       userProfile?.companySize === 'medium' ? '€110,000 - €200,000 (vs €1.2M costo promedio)' :
                       userProfile?.companySize === 'large' ? '€220,000 - €400,000 (vs €4.88M costo brecha)' : '€400,000 - €700,000 (Enterprise)';
        timeToImplement = '3-6 meses (URGENTE)';
        actionPlan = createActionSteps([
          { title: 'MFA Administrativo Inmediato', description: '1) MFA en VPN/SSO/admin. 2) Deshabilitar cuentas huérfanas. 3) Auditoría de accesos privilegiados.' },
          { title: 'Antimalware Empresarial', description: '1) Despliegue en endpoints críticos. 2) Políticas de bloqueo. 3) Telemetría centralizada.' },
          { title: 'Cifrado de datos', description: '1) Cifrar discos y datos sensibles. 2) Gestión de claves segura. 3) Procedimientos de recuperación.' },
          { title: 'Plan de Respuesta a Incidentes', description: '1) Crear playbooks. 2) Roles y responsables. 3) Simulacros mensuales.' },
          { title: 'Pentest + MSSP/MDR', description: '1) Pentest externo. 2) Selección de MSSP/MDR. 3) Acuerdos de SLAs y reporting.' }
        ]);
      }
    } else {
      level = 'critical';
      color = 'text-red-600';
      urgency = 'critical';
      
      if (isIndividual) {
        businessImpact = 'EMERGENCIA: Probabilidad robo identidad >50% - Riesgo financiero extremo';
        estimatedCost = '€40 - €120/año (ROI: evita €5,400 promedio por incidente grave)';
        timeToImplement = '2-4 semanas (EMERGENCIA)';
        actionPlan = createActionSteps([
          { title: 'Cambia TODAS las contraseñas HOY', description: '1) Instala un gestor. 2) Contraseñas únicas y fuertes. 3) Prioriza correo y banca.' },
          { title: 'Activa 2FA ya', description: '1) Correo y banca. 2) Redes sociales. 3) Guarda códigos de recuperación.' },
          { title: 'Antivirus y escaneo completo', description: '1) Instalar y escanear sistema. 2) Eliminar amenazas. 3) Activar protección en tiempo real.' },
          { title: 'Congelación de crédito', description: '1) Solicita congelación. 2) Activa alertas. 3) Monitorea actividad sospechosa.' },
          { title: 'Updates críticos en todos los dispositivos', description: '1) Sistema operativo. 2) Navegadores y apps. 3) Actualizaciones automáticas.' }
        ]);
      } else {
        businessImpact = 'EMERGENCIA: Probabilidad brecha >60% - Riesgo paralización negocio';
        estimatedCost = userProfile?.companySize === 'small' ? '€70,000 - €150,000 (vs €826K-€653K costo incidente)' : 
                       userProfile?.companySize === 'medium' ? '€180,000 - €350,000 (vs €2.4M costo promedio)' :
                       userProfile?.companySize === 'large' ? '€350,000 - €650,000 (vs €4.88M costo brecha)' : '€650,000 - €1,200,000 (Enterprise)';
        timeToImplement = '1-3 meses (EMERGENCIA)';
        actionPlan = createActionSteps([
          { title: 'Contacto inmediato y contención', description: '1) Contactar SESECPRO. 2) Aislar activos críticos. 3) Activar plan de continuidad.' },
          { title: 'Controles básicos urgentes', description: '1) Firewall activo. 2) Antivirus en todos los equipos. 3) Backups verificados.' },
          { title: 'Políticas fundamentales', description: '1) Políticas de contraseñas. 2) Accesos mínimos. 3) Política de parches.' },
          { title: 'Respuesta a incidentes', description: '1) Equipo y roles. 2) MTTR objetivo <24h. 3) Simulacro en 2 semanas.' },
          { title: 'Assessment + Roadmap', description: '1) Assessment completo. 2) Plan de remediación. 3) Roadmap GDPR/NIS2.' }
        ]);
      }
    }
    
    return { 
      score: Math.round(percentage), 
      level, 
      color, 
      actionPlan, 
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
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
              >
                <option value="" className="text-gray-900">Seleccione su cargo</option>
                <option value="CEO/Gerente General" className="text-gray-900">CEO/Gerente General</option>
                <option value="CTO/Director Tecnología" className="text-gray-900">CTO/Director Tecnología</option>
                <option value="CISO/Director Seguridad" className="text-gray-900">CISO/Director Seguridad</option>
                <option value="IT Manager" className="text-gray-900">IT Manager</option>
                <option value="Responsable Sistemas" className="text-gray-900">Responsable Sistemas</option>
                <option value="Otro" className="text-gray-900">Otro</option>
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

        {/* Resumen Ejecutivo */}
        <div className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-xl p-8 mb-8 border border-slate-200">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-2">Reporte Ejecutivo de Ciberseguridad</h2>
              <p className="text-slate-600">Evaluación completa basada en {currentQuestions.length} controles de seguridad</p>
            </div>
            <div className="text-right">
              <div className={`text-5xl font-bold ${result.color} mb-1`}>{result.score}%</div>
              <div className="text-sm text-slate-500">Índice de Madurez</div>
            </div>
          </div>

          {/* Insignia de nivel de riesgo */}
          <div className={`inline-flex items-center px-6 py-3 rounded-full text-lg font-semibold mb-6 ${
            result.level === 'low' ? 'bg-green-100 text-green-800 border-2 border-green-200' :
            result.level === 'medium' ? 'bg-blue-100 text-blue-800 border-2 border-blue-200' :
            result.level === 'high' ? 'bg-orange-100 text-orange-800 border-2 border-orange-200' : 
            'bg-red-100 text-red-800 border-2 border-red-200'
          }`}>
            {result.level === 'low' && <CheckCircleIcon className="h-6 w-6 mr-2" />}
            {result.level === 'medium' && <ShieldCheckIcon className="h-6 w-6 mr-2" />}
            {result.level === 'high' && <ExclamationTriangleIcon className="h-6 w-6 mr-2" />}
            {result.level === 'critical' && <XCircleIcon className="h-6 w-6 mr-2" />}
            {result.level === 'low' && 'NIVEL ENTERPRISE'}
            {result.level === 'medium' && (result.score >= 75 ? 'NIVEL AVANZADO' : 'NIVEL INTERMEDIO')}
            {result.level === 'high' && 'RIESGO ELEVADO'}
            {result.level === 'critical' && 'RIESGO CRÍTICO'}
          </div>

          {/* Barra de progreso */}
          <div className="mb-4">
            <div className="flex justify-between text-sm text-slate-600 mb-2">
              <span>Nivel de Madurez en Ciberseguridad</span>
              <span>{result.score}% de {currentQuestions.length} controles</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-4 overflow-hidden">
              <div 
                className={`h-4 rounded-full transition-all duration-1000 ease-out ${
                  result.level === 'low' ? 'bg-gradient-to-r from-green-500 to-green-600' :
                  result.level === 'medium' ? (result.score >= 75 ? 'bg-gradient-to-r from-blue-500 to-blue-600' : 'bg-gradient-to-r from-yellow-500 to-yellow-600') :
                  result.level === 'high' ? 'bg-gradient-to-r from-orange-500 to-orange-600' : 'bg-gradient-to-r from-red-500 to-red-600'
                }`}
                style={{ width: `${result.score}%` }}
              ></div>
            </div>
          </div>

          {/* Escala de madurez */}
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

        {/* Análisis Detallado por Categorías */}
        <div className="bg-white rounded-xl border border-slate-200 p-8 mb-8">
          <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
            <ChartBarIcon className="h-7 w-7 mr-3 text-blue-600" />
            Diagnóstico Detallado por Áreas
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            {(() => {
              const currentQuestions = getQuestionsForProfile();
              
              // Calcular puntuación por categoría
              const categoryScores = currentQuestions.reduce((acc, q) => {
                const categoryKey = q.category as string;
                if (!acc[categoryKey]) {
                  acc[categoryKey] = { total: 0, achieved: 0, questions: 0 };
                }
                acc[categoryKey].total += q.weight;
                acc[categoryKey].achieved += answers[q.id] ? q.weight : 0;
                acc[categoryKey].questions += 1;
                return acc;
              }, {} as Record<string, { total: number; achieved: number; questions: number }>);

              const categoryIcons = {
                'Identidad y Acceso': '🔐',
                'Endpoints': '💻',
                'Red y Perímetro': '🛡️',
                'Protección de Datos': '🗂️',
                'Detección y Respuesta': '🚨',
                'Gestión de Vulnerabilidades': '🔍',
                'Continuidad del Negocio': '♻️',
                'Seguridad Personal': '👤',
                'Dispositivos': '📱',
                'Navegación Web': '🌐',
                'Contraseñas': '🔑',
                'Redes Sociales': '📲',
                'Respaldo de Datos': '💾'
              };

              return Object.entries(categoryScores).map(([category, scores]) => {
                const percentage = (scores.achieved / scores.total) * 100;
                const level = percentage >= 90 ? 'excelente' : 
                            percentage >= 75 ? 'bueno' : 
                            percentage >= 50 ? 'regular' : 'crítico';
                
                const colorClass = level === 'excelente' ? 'bg-green-500' :
                                 level === 'bueno' ? 'bg-blue-500' :
                                 level === 'regular' ? 'bg-yellow-500' : 'bg-red-500';
                
                const bgClass = level === 'excelente' ? 'bg-green-50' :
                              level === 'bueno' ? 'bg-blue-50' :
                              level === 'regular' ? 'bg-yellow-50' : 'bg-red-50';

                const textClass = level === 'excelente' ? 'text-green-800' :
                                level === 'bueno' ? 'text-blue-800' :
                                level === 'regular' ? 'text-yellow-800' : 'text-red-800';

                return (
                  <div key={category} className={`p-5 rounded-lg border ${bgClass}`}>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center">
                        <span className="text-2xl mr-3">{categoryIcons[category as keyof typeof categoryIcons] || '📊'}</span>
                        <h4 className="font-semibold text-slate-900">{category}</h4>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${textClass} bg-white`}>
                        {Math.round(percentage)}%
                      </span>
                    </div>
                    
                    <div className="mb-3">
                      <div className="w-full bg-slate-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all duration-1000 ${colorClass}`}
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between text-sm text-slate-600">
                      <span>{scores.questions} controles evaluados</span>
                      <span className={`font-semibold ${textClass}`}>
                        {level === 'excelente' && '✅ Excelente'}
                        {level === 'bueno' && '👍 Bueno'}
                        {level === 'regular' && '⚠️ Mejorable'}
                        {level === 'crítico' && '🚨 Crítico'}
                      </span>
                    </div>
                  </div>
                );
              });
            })()}
          </div>
        </div>

        {/* Benchmarking del Sector */}
        <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50 rounded-2xl border-2 border-indigo-200/60 p-8 mb-8 shadow-xl">
          <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
            <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mr-4">
              <TrophyIcon className="h-6 w-6 text-white" />
            </div>
            Comparativa del Sector
          </h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="group text-center p-6 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200/60">
              <div className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">{result.score}%</div>
              <div className="text-sm text-slate-600 mb-2 font-semibold">Su Puntuación</div>
              <div className={`inline-block text-xs font-bold px-3 py-1.5 rounded-full ${
                result.score >= 75 ? 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border border-green-200' :
                result.score >= 50 ? 'bg-gradient-to-r from-yellow-100 to-orange-100 text-yellow-800 border border-yellow-200' : 'bg-gradient-to-r from-red-100 to-pink-100 text-red-800 border border-red-200'
              }`}>
                {result.score >= 75 ? 'Líder del sector' :
                 result.score >= 50 ? 'Por encima del promedio' : 'Necesita mejoras'}
              </div>
            </div>
            
            <div className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-xl shadow-lg border border-slate-200/60">
              <div className="text-4xl font-bold text-slate-500 mb-2">
                {userProfile?.type === 'business' ? '52%' : '34%'}
              </div>
              <div className="text-sm text-slate-600 mb-2 font-semibold">Promedio del Sector</div>
              <div className="text-xs text-slate-500 font-medium">
                {userProfile?.type === 'business' ? 'Empresas similares' : 'Usuarios personales'}
              </div>
            </div>
            
            <div className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-xl shadow-lg border border-slate-200/60">
              <div className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-2">85%</div>
              <div className="text-sm text-slate-600 mb-2 font-semibold">Objetivo Recomendado</div>
              <div className="text-xs text-slate-500 font-medium">Nivel Enterprise</div>
            </div>
          </div>
          
          <div className="mt-6 p-5 bg-white/70 backdrop-blur-sm rounded-xl border border-indigo-200/60">
            <p className="text-sm text-slate-700 text-center leading-relaxed">
              📊 <strong>Contexto:</strong> Su organización está en el{' '}
              <span className="font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                {result.score >= 75 ? 'top 25%' :
                 result.score >= 50 ? 'top 50%' : 'percentil inferior'}
              </span>{' '}
              del sector. El 46% de empresas sufren brechas de seguridad anuales, 
              con un costo promedio de €4.88M por incidente.
            </p>
          </div>
        </div>

        {/* Plan de Acción Recomendado */}
        <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 rounded-2xl border-2 border-slate-300/60 p-8 mb-8 shadow-xl">
          <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mr-4">
              <DocumentTextIcon className="h-6 w-6 text-white" />
            </div>
            Plan de Acción Prioritario
          </h3>
          
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="group text-center p-5 bg-gradient-to-br from-red-50 to-red-100 rounded-xl border border-red-200 hover:shadow-lg transition-all duration-300">
              <div className="text-2xl font-bold bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-transparent mb-1">🚨 Inmediato</div>
              <div className="text-sm text-slate-600 font-medium">0-30 días</div>
            </div>
            <div className="group text-center p-5 bg-gradient-to-br from-yellow-50 to-orange-100 rounded-xl border border-yellow-200 hover:shadow-lg transition-all duration-300">
              <div className="text-2xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent mb-1">⚡ Corto Plazo</div>
              <div className="text-sm text-slate-600 font-medium">1-3 meses</div>
            </div>
            <div className="group text-center p-5 bg-gradient-to-br from-green-50 to-emerald-100 rounded-xl border border-green-200 hover:shadow-lg transition-all duration-300">
              <div className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-1">📈 Medio Plazo</div>
              <div className="text-sm text-slate-600 font-medium">3-6 meses</div>
            </div>
          </div>
          
          <div className="space-y-4">
            {result.actionPlan.map((step) => (
              <div key={step.id} className="group flex items-start p-5 bg-white/80 backdrop-blur-sm rounded-xl border-l-4 border-blue-500 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-blue-600">
                <span className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4 mt-0.5 group-hover:scale-110 transition-transform duration-300">
                  {step.id}
                </span>
                <div className="flex-1">
                  <h4 className="text-slate-900 font-semibold text-lg mb-2">{step.title}</h4>
                  <p className="text-slate-700 leading-relaxed mb-3">{step.description}</p>
                  <div className="flex items-center text-xs gap-2">
                    <span className={`px-3 py-1.5 rounded-full font-bold border ${
                      step.priority === 'CRÍTICO' ? 'bg-gradient-to-r from-red-100 to-red-200 text-red-800 border-red-300' :
                      step.priority === 'ALTO' ? 'bg-gradient-to-r from-yellow-100 to-orange-200 text-yellow-800 border-yellow-300' : 'bg-gradient-to-r from-green-100 to-emerald-200 text-green-800 border-green-300'
                    }`}>
                      {step.priority}
                    </span>
                    <div className="flex items-center text-slate-500 bg-slate-100 px-2 py-1 rounded-full">
                      <ClockIcon className="h-3 w-3 mr-1" />
                      <span className="font-medium">{step.timeframe}</span>
                    </div>
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full border border-blue-200">
                      {step.category}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
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

        {/* Secciones Específicas para Particulares */}
        {userProfile?.type === 'individual' && (() => {
          // Lógica para determinar si mostrar protección familiar
          const hasFamilyContext = () => {
            const familyKeywords = ['familia', 'hijos', 'menores', 'niños', 'adolescentes', 'control parental'];
            const answeredQuestions = Object.keys(answers);
            
            // Si respondió preguntas relacionadas con dispositivos móviles o control parental
            return answeredQuestions.some(id => 
              currentQuestions.find(q => q.id === id)?.question.toLowerCase().match(/(móvil|celular|tablet|control|parental|familiar)/)
            ) || result.score < 60; // Mostrar si tiene puntuación media-baja
          };

          // Consejos antiestafas específicos por plataforma
          const getAntiScamTips = () => {
            return {
              whatsapp: [
                "Verifica la identidad del remitente antes de hacer transferencias",
                "Desconfía de ofertas demasiado buenas para ser verdad",
                "No compartas códigos de verificación con nadie",
                "Activa la verificación en dos pasos",
                "Revisa los números de contacto oficiales de empresas"
              ],
              email: [
                "Verifica la dirección del remitente cuidadosamente",
                "No hagas clic en enlaces sospechosos",
                "Confirma solicitudes importantes por teléfono",
                "Usa filtros de spam avanzados",
                "Mantén actualizado tu antivirus"
              ],
              social: [
                "Configura la privacidad de tus perfiles",
                "No aceptes solicitudes de desconocidos",
                "Verifica la autenticidad de ofertas y promociones",
                "No compartas información personal sensible",
                "Reporta perfiles y contenido sospechoso"
              ]
            };
          };

          // Guías por dispositivo
          const getDeviceGuides = () => {
            return {
              iphone: {
                "2fa": [
                  "Ir a Ajustes > [Tu nombre] > Iniciar sesión y seguridad",
                  "Tocar 'Autenticación de dos factores'",
                  "Tocar 'Continuar' y seguir las instrucciones",
                  "Verificar con número de teléfono de confianza"
                ],
                "passwords": [
                  "Ir a Ajustes > Contraseñas",
                  "Tocar 'Opciones de contraseñas'",
                  "Activar 'Detectar contraseñas comprometidas'",
                  "Usar 'Contraseñas automáticas' para generar contraseñas seguras"
                ],
                "backup": [
                  "Ir a Ajustes > [Tu nombre] > iCloud",
                  "Tocar 'Copia de seguridad de iCloud'",
                  "Activar 'Copia de seguridad de iCloud'",
                  "Tocar 'Crear copia de seguridad ahora'"
                ]
              },
              android: {
                "2fa": [
                  "Ir a Configuración > Google > Gestionar tu cuenta de Google",
                  "Tocar 'Seguridad' > 'Verificación en dos pasos'",
                  "Tocar 'Empezar' y seguir las instrucciones",
                  "Configurar método de verificación preferido"
                ],
                "passwords": [
                  "Descargar Google Password Manager",
                  "Ir a Configuración > Google > Autorrelleno",
                  "Activar 'Autorrelleno con Google'",
                  "Configurar verificación de contraseñas comprometidas"
                ],
                "backup": [
                  "Ir a Configuración > Sistema > Copia de seguridad",
                  "Activar 'Copia de seguridad en Google Drive'",
                  "Seleccionar cuenta de Google",
                  "Configurar elementos a respaldar"
                ]
              },
              windows: {
                "2fa": [
                  "Abrir Configuración > Cuentas > Opciones de inicio de sesión",
                  "Configurar Windows Hello (huella, PIN o reconocimiento facial)",
                  "Activar 2FA en la cuenta de Microsoft",
                  "Instalar Microsoft Authenticator"
                ],
                "passwords": [
                  "Usar Windows Credential Manager",
                  "Instalar un gestor como Bitwarden o 1Password",
                  "Activar Windows Defender SmartScreen",
                  "Configurar contraseñas de aplicación"
                ],
                "backup": [
                  "Configurar Historial de archivos",
                  "Usar OneDrive para sincronización",
                  "Crear punto de restauración del sistema",
                  "Configurar copia de seguridad automática"
                ]
              },
              mac: {
                "2fa": [
                  "Ir a Preferencias del Sistema > ID de Apple",
                  "Hacer clic en 'Contraseña y seguridad'",
                  "Activar 'Autenticación de dos factores'",
                  "Configurar dispositivos de confianza"
                ],
                "passwords": [
                  "Usar Llavero de iCloud integrado",
                  "Ir a Safari > Preferencias > Contraseñas",
                  "Activar 'Detectar contraseñas comprometidas'",
                  "Considerar 1Password o Bitwarden"
                ],
                "backup": [
                  "Configurar Time Machine",
                  "Conectar disco externo para respaldos",
                  "Usar iCloud para documentos importantes",
                  "Verificar respaldos regularmente"
                ]
              }
            };
          };

          const antiScamTips = getAntiScamTips();
          const deviceGuides = getDeviceGuides();

          return (
            <div className="space-y-8 mb-8">
              {/* Protección Familiar y Control Parental */}
              {contentPrefs.familyProtection && hasFamilyContext() && (
                <div className="bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 rounded-2xl border-2 border-purple-200/60 p-8 shadow-xl">
                  <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center mr-4">
                      <span className="text-white text-xl">👨‍👩‍👧‍👦</span>
                    </div>
                    Protección Familiar y Control Parental
                  </h3>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-purple-200/60">
                      <h4 className="text-lg font-semibold text-purple-800 mb-4 flex items-center">
                        <span className="mr-2">🛡️</span>
                        Controles Parentales Esenciales
                      </h4>
                      <ul className="space-y-3 text-sm text-slate-700">
                        <li className="flex items-start">
                          <span className="text-green-600 mr-2 mt-1">✓</span>
                          <span>Configurar Screen Time (iOS) o Digital Wellbeing (Android)</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-green-600 mr-2 mt-1">✓</span>
                          <span>Activar filtros de contenido en routers y dispositivos</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-green-600 mr-2 mt-1">✓</span>
                          <span>Configurar controles de compras en app stores</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-green-600 mr-2 mt-1">✓</span>
                          <span>Establecer horarios de uso de dispositivos</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-purple-200/60">
                      <h4 className="text-lg font-semibold text-purple-800 mb-4 flex items-center">
                        <span className="mr-2">📚</span>
                        Educación Digital
                      </h4>
                      <ul className="space-y-3 text-sm text-slate-700">
                        <li className="flex items-start">
                          <span className="text-blue-600 mr-2 mt-1">💡</span>
                          <span>Enseñar sobre privacidad en redes sociales</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-blue-600 mr-2 mt-1">💡</span>
                          <span>Explicar los riesgos del cyberbullying</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-blue-600 mr-2 mt-1">💡</span>
                          <span>Crear reglas familiares para el uso de internet</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-blue-600 mr-2 mt-1">💡</span>
                          <span>Supervisar actividad online sin invadir privacidad</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="mt-6 p-4 bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl border border-purple-200">
                    <p className="text-sm text-purple-800 text-center font-medium">
                      🔗 <strong>Recursos:</strong> Configura Family Link (Google) o Tiempo en Pantalla (Apple) para un control integral
                    </p>
                  </div>
                </div>
              )}

              {/* Consejos Antiestafas */}
              {contentPrefs.antiScamTips && (
              <div className="bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 rounded-2xl border-2 border-red-200/60 p-8 shadow-xl">
                <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-orange-600 rounded-full flex items-center justify-center mr-4">
                    <span className="text-white text-xl">🚨</span>
                  </div>
                  Consejos Antiestafas por Plataforma
                </h3>
                
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-red-200/60">
                    <h4 className="text-lg font-semibold text-green-800 mb-4 flex items-center">
                      <span className="mr-2">💬</span>
                      WhatsApp
                    </h4>
                    <ul className="space-y-2 text-sm text-slate-700">
                      {antiScamTips.whatsapp.map((tip, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-green-600 mr-2 mt-1 text-xs">▶</span>
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-red-200/60">
                    <h4 className="text-lg font-semibold text-blue-800 mb-4 flex items-center">
                      <span className="mr-2">📧</span>
                      Email
                    </h4>
                    <ul className="space-y-2 text-sm text-slate-700">
                      {antiScamTips.email.map((tip, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-blue-600 mr-2 mt-1 text-xs">▶</span>
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-red-200/60">
                    <h4 className="text-lg font-semibold text-purple-800 mb-4 flex items-center">
                      <span className="mr-2">📱</span>
                      Redes Sociales
                    </h4>
                    <ul className="space-y-2 text-sm text-slate-700">
                      {antiScamTips.social.map((tip, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-purple-600 mr-2 mt-1 text-xs">▶</span>
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="mt-6 flex items-center justify-center">
                  <a 
                    href="/recursos/guias/proteccion-phishing" 
                    className="inline-flex items-center text-sm font-semibold text-red-700 hover:text-red-800 transition-colors"
                  >
                    📖 Guía completa antiestafas (phishing)
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
                
                <div className="mt-4 p-4 bg-gradient-to-r from-red-100 to-orange-100 rounded-xl border border-red-200">
                  <p className="text-sm text-red-800 text-center font-medium">
                    ⚠️ <strong>Recuerda:</strong> Si algo parece demasiado bueno para ser verdad, probablemente lo es. Verifica siempre antes de actuar.
                  </p>
                </div>
              </div>
              )}

              {/* Guía Rápida por Dispositivo */}
              {contentPrefs.deviceGuides && (
              <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-cyan-50 rounded-2xl border-2 border-blue-200/60 p-8 shadow-xl">
                <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mr-4">
                    <span className="text-white text-xl">📱</span>
                  </div>
                  Guía Rápida por Dispositivo
                </h3>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {Object.entries(deviceGuides).map(([device, guides]) => (
                    <div key={device} className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-blue-200/60">
                      <h4 className="text-lg font-semibold text-blue-800 mb-4 flex items-center">
                        <span className="mr-2">
                          {device === 'iphone' && '📱'}
                          {device === 'android' && '🤖'}
                          {device === 'windows' && '💻'}
                          {device === 'mac' && '🖥️'}
                        </span>
                        {device.charAt(0).toUpperCase() + device.slice(1)}
                      </h4>
                      
                      <div className="space-y-4">
                        <div>
                          <h5 className="font-semibold text-sm text-slate-700 mb-2">🔐 2FA</h5>
                          <ul className="text-xs text-slate-600 space-y-1">
                            {guides["2fa"].slice(0, 2).map((step, index) => (
                              <li key={index} className="flex items-start">
                                <span className="text-blue-500 mr-1">{index + 1}.</span>
                                <span>{step}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <h5 className="font-semibold text-sm text-slate-700 mb-2">🔑 Contraseñas</h5>
                          <ul className="text-xs text-slate-600 space-y-1">
                            {guides.passwords.slice(0, 2).map((step, index) => (
                              <li key={index} className="flex items-start">
                                <span className="text-green-500 mr-1">{index + 1}.</span>
                                <span>{step}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 p-4 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-xl border border-blue-200">
                  <p className="text-sm text-blue-800 text-center font-medium">
                    💡 <strong>Tip:</strong> Cada dispositivo tiene sus propias herramientas de seguridad integradas. ¡Aprovéchalas!
                </p>
              </div>
              </div>
              )}

              {/* Guías Paso a Paso */}
              <div className="bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 rounded-2xl border-2 border-green-200/60 p-8 shadow-xl">
                <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mr-4">
                    <span className="text-white text-xl">📋</span>
                  </div>
                  Guías Paso a Paso
                </h3>
                
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="group bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-green-200/60 hover:shadow-lg transition-all duration-300">
                    <h4 className="text-lg font-semibold text-green-800 mb-4 flex items-center">
                      <span className="mr-2">🔐</span>
                      Configurar 2FA
                    </h4>
                    <p className="text-sm text-slate-600 mb-4">
                      Protege tus cuentas con autenticación de dos factores en menos de 5 minutos.
                    </p>
                    <div className="space-y-2">
                      <a 
                        href="/recursos/guias/autenticacion-dos-pasos" 
                        className="inline-flex items-center text-sm font-semibold text-green-600 hover:text-green-700 transition-colors"
                      >
                        📖 Guía Completa
                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </a>
                      <div className="flex items-center text-xs text-slate-500">
                        <span className="mr-2">📱</span>
                        <span>Incluye códigos QR para configuración rápida</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="group bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-green-200/60 hover:shadow-lg transition-all duration-300">
                    <h4 className="text-lg font-semibold text-blue-800 mb-4 flex items-center">
                      <span className="mr-2">🔑</span>
                      Gestor de Contraseñas
                    </h4>
                    <p className="text-sm text-slate-600 mb-4">
                      Instala y configura un gestor de contraseñas seguro paso a paso.
                    </p>
                    <div className="space-y-2">
                      <a 
                        href="/recursos/guias/seguridad-contrasenas" 
                        className="inline-flex items-center text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                      >
                        📖 Guía Completa
                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </a>
                      <div className="flex items-center text-xs text-slate-500">
                        <span className="mr-2">🔗</span>
                        <span>Enlaces directos a apps recomendadas</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="group bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-green-200/60 hover:shadow-lg transition-all duration-300">
                    <h4 className="text-lg font-semibold text-purple-800 mb-4 flex items-center">
                      <span className="mr-2">💾</span>
                      Copias de Seguridad
                    </h4>
                    <p className="text-sm text-slate-600 mb-4">
                      Configura respaldos automáticos para proteger tus datos importantes.
                    </p>
                    <div className="space-y-2">
                      <a 
                        href="/recursos/guias/gestion-copias-seguridad" 
                        className="inline-flex items-center text-sm font-semibold text-purple-600 hover:text-purple-700 transition-colors"
                      >
                        📖 Guía Completa
                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </a>
                      <div className="flex items-center text-xs text-slate-500">
                        <span className="mr-2">☁️</span>
                        <span>Incluye opciones cloud y locales</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-gradient-to-r from-green-100 to-emerald-100 rounded-xl border border-green-200">
                  <p className="text-sm text-green-800 text-center font-medium">
                    🎯 <strong>Objetivo:</strong> Implementa estas 3 medidas básicas y mejora tu seguridad en un 80%
                  </p>
                </div>
              </div>
            </div>
          );
        })()}

        {/* CTA Section Mejorado */}
        <div className={`${
          result.urgency === 'critical' 
            ? 'bg-gradient-to-r from-red-600 to-red-800' 
            : result.urgency === 'high'
            ? 'bg-gradient-to-r from-orange-600 to-orange-800'
            : 'bg-gradient-to-r from-blue-600 to-indigo-700'
        } rounded-xl p-8 text-white text-center`}>
          <div className="max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold mb-4">
              {result.urgency === 'critical' && '🚨 Acción Inmediata Requerida'}
              {result.urgency === 'high' && '⚠️ No Espere Más - Actúe Ahora'}
              {result.urgency === 'medium' && '📈 Transforme su Ciberseguridad'}
              {result.urgency === 'low' && '🏆 Mantenga su Liderazgo'}
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
              {result.urgency === 'critical' && 'Cada minuto cuenta. Su organización está expuesta a amenazas críticas que requieren intervención inmediata de nuestros especialistas.'}
              {result.urgency === 'high' && 'Los riesgos identificados pueden materializarse en cualquier momento. Nuestro equipo puede reducir su exposición en 30 días.'}
              {result.urgency === 'medium' && 'Fortalezca su postura de seguridad con nuestro enfoque probado y metodología de clase mundial.'}
              {result.urgency === 'low' && 'Mantenga su excelencia operativa y explore las últimas innovaciones en ciberseguridad empresarial.'}
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
          </div>
        </div>

        {/* Botón para descargar PDF */}
        <div className="mb-6">
          <DownloadButton 
            title={t('resultsTitle') || 'Informe de Evaluación'} 
            contentSelector="#assessment-results" 
            userProfile={userProfile || undefined}
            actionPlan={result.actionPlan}
          />
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
  if (!isClient) {
     return null;
   }

  if (showSegmentation) {
    const isPersonal = userProfile?.type === 'individual';
    const isBusiness = userProfile?.type === 'business';
    const canStart = isPersonal || (isBusiness && userProfile?.companySize && typeof userProfile?.hasITTeam === 'boolean');

    // Paso 0: Preferencias de contenido (mostrar solo si aún no se completó)
    if (showContentSetup) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center">
          <div className="max-w-3xl mx-auto w-full p-6">
            <div className="bg-white rounded-2xl shadow-xl ring-1 ring-slate-200 p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Personaliza tu contenido</h2>
              <p className="text-slate-600 mb-6">Selecciona qué secciones quieres ver en tu informe. No mostraremos contenido genérico.</p>
              <div className="space-y-3">
                <label className="flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all hover:border-blue-300">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">👨‍👩‍👧‍👦</span>
                    <div>
                      <div className="font-semibold text-slate-900">Protección Familiar y Control Parental</div>
                      <div className="text-sm text-slate-600">Guías prácticas para familias y menores</div>
                    </div>
                  </div>
                  <input type="checkbox" checked={contentPrefs.familyProtection} onChange={(e) => handleContentPrefChange('familyProtection', e.target.checked)} className="w-5 h-5" />
                </label>

                <label className="flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all hover:border-blue-300">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🚨</span>
                    <div>
                      <div className="font-semibold text-slate-900">Consejos Antiestafas por Plataforma</div>
                      <div className="text-sm text-slate-600">WhatsApp, Email y Redes sociales</div>
                    </div>
                  </div>
                  <input type="checkbox" checked={contentPrefs.antiScamTips} onChange={(e) => handleContentPrefChange('antiScamTips', e.target.checked)} className="w-5 h-5" />
                </label>

                <label className="flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all hover:border-blue-300">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">📱</span>
                    <div>
                      <div className="font-semibold text-slate-900">Guía Rápida por Dispositivo</div>
                      <div className="text-sm text-slate-600">iPhone, Android, Windows, Mac</div>
                    </div>
                  </div>
                  <input type="checkbox" checked={contentPrefs.deviceGuides} onChange={(e) => handleContentPrefChange('deviceGuides', e.target.checked)} className="w-5 h-5" />
                </label>
              </div>

              <div className="mt-6 flex justify-end">
                <button onClick={completeContentSetup} className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl shadow-md">
                  Continuar
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    const companySizes = [
      { value: 'small' as const, label: 'Pequeña (1-49)', icon: '🏪' },
      { value: 'medium' as const, label: 'Mediana (50-249)', icon: '🏬' },
      { value: 'large' as const, label: 'Grande (250-999)', icon: '🏢' },
      { value: 'enterprise' as const, label: 'Enterprise (1000+)', icon: '🏭' },
    ];

    return (
      <div className="bg-gray-50">
        {/* HERO con fondo blanco y diseño moderno */}
        <section className="relative w-full bg-gradient-to-br from-slate-50 via-white to-blue-50">
          <div className="pt-12 md:pt-16 pb-10">
            <div className="max-w-7xl mx-auto h-full flex items-center px-6">
              <div className="w-full">
                {/* Cabecera y mensaje */}
                <div className="max-w-3xl">
                  <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full mb-5 shadow-lg">
                    <ShieldCheckIcon className="h-7 w-7 text-white" />
                  </div>
                  <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-3 leading-tight">
                    {t('calculatorTitle')}
                  </h1>
                  <p className="text-lg md:text-xl text-slate-700 leading-relaxed mb-4">
                    {t('personalizationMessage')}
                  </p>
                  {/* Barra de beneficios compacta */}
                  <div className="flex flex-wrap items-center gap-3 text-sm text-slate-700">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 ring-1 ring-slate-200 shadow-sm">
                      <CheckCircleIcon className="h-4 w-4 text-emerald-600" />
                      <span>Gratis y sin registro</span>
                    </div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 ring-1 ring-slate-200 shadow-sm">
                      <ClockIcon className="h-4 w-4 text-blue-600" />
                      <span>15-20 minutos</span>
                    </div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 ring-1 ring-slate-200 shadow-sm">
                      <ShieldCheckIcon className="h-4 w-4 text-indigo-600" />
                      <span>Recomendaciones prácticas</span>
                    </div>
                  </div>
                </div>

                {/* Introducción breve */}
                <p className="mt-5 text-base md:text-lg text-slate-600 leading-relaxed max-w-3xl">
                  Esta evaluación práctica te ayuda a entender tu nivel de madurez en ciberseguridad. Responde preguntas por áreas clave y recibe un diagnóstico con prioridades y recomendaciones accionables.
                </p>

                {/* Tarjeta con selector integrado */}
                <div className="mt-4">
                  {/* Card de selección */}
                  <div className="w-full">
                    <div className="bg-white rounded-2xl shadow-xl ring-1 ring-slate-200 p-6 md:p-8">
                      {/* Segmented control: para quién */}
                      <div className="flex items-center justify-between flex-wrap gap-3">
                        <div className="text-sm font-medium text-slate-700">Para quién es la evaluación</div>
                        <div className="inline-flex gap-2">
                          <button
                            type="button"
                            aria-pressed={isPersonal}
                            onClick={() => {
                              handleSegmentationAnswer('user_type', 'individual');
                            }}
                            className={`group px-5 py-3 rounded-xl border-2 text-sm font-semibold transition-all duration-300 hover:shadow-lg transform hover:scale-105 ${isPersonal ? 'border-emerald-500 bg-gradient-to-br from-emerald-50 to-green-50 text-emerald-800 shadow-lg' : 'border-slate-200 hover:border-emerald-400 hover:bg-gradient-to-br hover:from-emerald-50 hover:to-green-50 hover:text-emerald-700'}`}
                          >
                            <span className="mr-2 transition-transform group-hover:scale-110">👤</span>
                            {t('optionPersonal')}
                          </button>
                          <button
                            type="button"
                            aria-pressed={isBusiness}
                            onClick={() => {
                              handleSegmentationAnswer('user_type', 'business');
                            }}
                            className={`group px-5 py-3 rounded-xl border-2 text-sm font-semibold transition-all duration-300 hover:shadow-lg transform hover:scale-105 ${isBusiness ? 'border-indigo-500 bg-gradient-to-br from-indigo-50 to-purple-50 text-indigo-800 shadow-lg' : 'border-slate-200 hover:border-indigo-400 hover:bg-gradient-to-br hover:from-indigo-50 hover:to-purple-50 hover:text-indigo-700'}`}
                          >
                            <span className="mr-2 transition-transform group-hover:scale-110">🏢</span>
                            {t('optionBusiness')}
                          </button>
                        </div>
                      </div>

                      {/* Detalles adicionales dependiendo de selección */}
                      {isPersonal && (
                        <div className="mt-6 space-y-6">
                          <div className="text-slate-700 mb-4">
                            {t('evaluationPersonalDescription')}
                          </div>

                          {/* ¿Usas apps de mensajería? */}
                          <div>
                            <div className="text-sm font-medium text-slate-700 mb-3">¿Usas aplicaciones de mensajería (WhatsApp, Telegram, etc.)?</div>
                            <div className="inline-flex gap-2">
                              <button
                                onClick={() => handleSegmentationAnswer('messaging_apps_installed', 'yes')}
                                className={`group px-5 py-3 rounded-xl border-2 text-sm font-semibold transition-all duration-300 hover:shadow-lg transform hover:scale-105 ${userProfile?.messagingAppsInstalled === true ? 'border-emerald-500 bg-gradient-to-br from-emerald-50 to-green-50 text-emerald-800 shadow-lg' : 'border-slate-200 hover:border-emerald-400 hover:bg-gradient-to-br hover:from-emerald-50 hover:to-green-50 hover:text-emerald-700'}`}
                              >
                                <span className="mr-2 transition-transform group-hover:scale-110">💬</span>
                                Sí, uso mensajería
                              </button>
                              <button
                                onClick={() => handleSegmentationAnswer('messaging_apps_installed', 'no')}
                                className={`group px-5 py-3 rounded-xl border-2 text-sm font-semibold transition-all duration-300 hover:shadow-lg transform hover:scale-105 ${userProfile?.messagingAppsInstalled === false ? 'border-orange-500 bg-gradient-to-br from-orange-50 to-yellow-50 text-orange-800 shadow-lg' : 'border-slate-200 hover:border-orange-400 hover:bg-gradient-to-br hover:from-orange-50 hover:to-yellow-50 hover:text-orange-700'}`}
                              >
                                <span className="mr-2 transition-transform group-hover:scale-110">📱</span>
                                No uso mensajería
                              </button>
                            </div>
                          </div>

                          {/* Selección de apps específicas si usa mensajería */}
                          {userProfile?.messagingAppsInstalled && (
                            <div>
                              <div className="text-sm font-medium text-slate-700 mb-3">¿Cuáles usas más frecuentemente?</div>
                              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                {[
                                  { key: 'WhatsApp', icon: <SiWhatsapp className="h-5 w-5 text-emerald-600" /> },
                                  { key: 'Telegram', icon: <SiTelegram className="h-5 w-5 text-sky-500" /> },
                                  { key: 'Signal', icon: <SiSignal className="h-5 w-5 text-blue-600" /> },
                                  { key: 'Instagram', icon: <SiInstagram className="h-5 w-5 text-pink-500" /> },
                                  { key: 'Facebook Messenger', icon: <ChatBubbleLeftRightIcon className="h-5 w-5 text-blue-500" /> },
                                  { key: 'Otros', icon: <ChatBubbleLeftRightIcon className="h-5 w-5 text-slate-500" /> },
                                ].map(({ key, icon }) => (
                                  <button
                                    key={key}
                                    onClick={() => toggleMessagingApp(key)}
                                    className={`group p-3 rounded-xl border-2 transition-all duration-300 text-left transform hover:scale-105 hover:shadow-lg ${(userProfile?.messagingApps || []).includes(key) ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-indigo-50 shadow-lg' : 'border-slate-200 hover:border-blue-300 hover:bg-gradient-to-br hover:from-blue-50 hover:to-indigo-50 hover:shadow-md'}`}
                                  >
                                    <div className="flex items-center gap-2">
                                      {icon}
                                      <div className="text-sm font-semibold text-slate-800">{key}</div>
                                    </div>
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Marcas/SO de dispositivos */}
                          <div>
                            <div className="text-sm font-medium text-slate-700 mb-3">¿Qué dispositivos y sistemas usas?</div>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                              {[
                                { key: 'iPhone/iOS', icon: <SiApple className="h-5 w-5 text-slate-800" /> },
                                { key: 'Android/Samsung', icon: <SiAndroid className="h-5 w-5 text-green-600" /> },
                                { key: 'Android/Otros', icon: <SiAndroid className="h-5 w-5 text-green-600" /> },
                                { key: 'Windows PC', icon: <ComputerDesktopIcon className="h-5 w-5 text-blue-600" /> },
                                { key: 'Mac', icon: <SiApple className="h-5 w-5 text-slate-800" /> },
                                { key: 'Otros', icon: <ComputerDesktopIcon className="h-5 w-5 text-slate-500" /> },
                              ].map(({ key, icon }) => (
                                <button
                                  key={key}
                                  onClick={() => toggleDeviceBrand(key)}
                                  className={`group p-3 rounded-xl border-2 transition-all duration-300 text-left transform hover:scale-105 hover:shadow-lg ${(userProfile?.deviceBrands || []).includes(key) ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-indigo-50 shadow-lg' : 'border-slate-200 hover:border-blue-300 hover:bg-gradient-to-br hover:from-blue-50 hover:to-indigo-50 hover:shadow-md'}`}
                                >
                                  <div className="flex items-center gap-2">
                                    {icon}
                                    <div className="text-sm font-semibold text-slate-800">{key}</div>
                                  </div>
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* ¿Tienes hijos? */}
                          <div>
                            <div className="text-sm font-medium text-slate-700 mb-3">¿Tienes hijos que usen dispositivos digitales?</div>
                            <div className="inline-flex gap-2">
                              <button
                                onClick={() => handleSegmentationAnswer('has_children', 'yes')}
                                className={`group px-5 py-3 rounded-xl border-2 text-sm font-semibold transition-all duration-300 hover:shadow-lg transform hover:scale-105 ${userProfile?.hasChildren === true ? 'border-emerald-500 bg-gradient-to-br from-emerald-50 to-green-50 text-emerald-800 shadow-lg' : 'border-slate-200 hover:border-emerald-400 hover:bg-gradient-to-br hover:from-emerald-50 hover:to-green-50 hover:text-emerald-700'}`}
                              >
                                <span className="mr-2 transition-transform group-hover:scale-110">👨‍👩‍👧‍👦</span>
                                Sí, tengo hijos
                              </button>
                              <button
                                onClick={() => handleSegmentationAnswer('has_children', 'no')}
                                className={`group px-5 py-3 rounded-xl border-2 text-sm font-semibold transition-all duration-300 hover:shadow-lg transform hover:scale-105 ${userProfile?.hasChildren === false ? 'border-orange-500 bg-gradient-to-br from-orange-50 to-yellow-50 text-orange-800 shadow-lg' : 'border-slate-200 hover:border-orange-400 hover:bg-gradient-to-br hover:from-orange-50 hover:to-yellow-50 hover:text-orange-700'}`}
                              >
                                <span className="mr-2 transition-transform group-hover:scale-110">👤</span>
                                No tengo hijos
                              </button>
                            </div>
                          </div>

                          {/* CTA */}
                          <div className="pt-2 flex flex-col sm:flex-row sm:items-center gap-4">
                            <button
                              onClick={completeSegmentation}
                              className="inline-flex items-center justify-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                            >
                              🚀 {t('startPersonalEvaluation')}
                            </button>
                            <div className="flex items-center text-xs text-slate-600">
                              <LockClosedIcon className="h-4 w-4 mr-2 text-slate-500" />
                              <span>Sin registro para ver resultados. Tus datos están seguros.</span>
                            </div>
                          </div>
                        </div>
                      )}

                      {isBusiness && (
                        <div className="mt-6 space-y-6">
                          {/* Tamaño de empresa */}
                          <div>
                            <div className="text-sm font-medium text-slate-700 mb-3">Tamaño de la empresa</div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              {companySizes.map((size) => (
                                <button
                                  key={size.value}
                                  onClick={() => {
                                    handleSegmentationAnswer('company_size', size.value);
                                  }}
                                  className={`group p-4 rounded-xl border-2 transition-all duration-300 text-left transform hover:scale-105 hover:shadow-lg ${userProfile?.companySize === size.value ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-indigo-50 shadow-lg' : 'border-slate-200 hover:border-blue-300 hover:bg-gradient-to-br hover:from-blue-50 hover:to-indigo-50 hover:shadow-md'}`}
                                >
                                  <div className="flex items-center">
                                    <span className="text-2xl mr-3 transition-transform group-hover:scale-110">{size.icon}</span>
                                    <span className="font-semibold text-slate-800">{size.label}</span>
                                  </div>
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* Equipo de IT */}
                          {userProfile?.companySize && (
                            <div>
                              <div className="text-sm font-medium text-slate-700 mb-3">¿Cuenta con equipo de IT?</div>
                              <div className="inline-flex gap-2">
                                <button
                                  onClick={() => handleSegmentationAnswer('it_resources', 'yes')}
                                  className={`group px-5 py-3 rounded-xl border-2 text-sm font-semibold transition-all duration-300 hover:shadow-lg transform hover:scale-105 ${userProfile?.hasITTeam === true ? 'border-emerald-500 bg-gradient-to-br from-emerald-50 to-green-50 text-emerald-800 shadow-lg' : 'border-slate-200 hover:border-emerald-400 hover:bg-gradient-to-br hover:from-emerald-50 hover:to-green-50 hover:text-emerald-700'}`}
                                >
                                  <span className="mr-2 transition-transform group-hover:scale-110">👥</span>
                                  {t('itTeamYes')}
                                </button>
                                <button
                                  onClick={() => handleSegmentationAnswer('it_resources', 'no')}
                                  className={`group px-5 py-3 rounded-xl border-2 text-sm font-semibold transition-all duration-300 hover:shadow-lg transform hover:scale-105 ${userProfile?.hasITTeam === false ? 'border-orange-500 bg-gradient-to-br from-orange-50 to-yellow-50 text-orange-800 shadow-lg' : 'border-slate-200 hover:border-orange-400 hover:bg-gradient-to-br hover:from-orange-50 hover:to-yellow-50 hover:text-orange-700'}`}
                                >
                                  <span className="mr-2 transition-transform group-hover:scale-110">🤝</span>
                                  {t('itTeamNo')}
                                </button>
                              </div>
                            </div>
                          )}

                          {/* CTA */}
                          <div className="pt-2 flex flex-col sm:flex-row sm:items-center gap-4">
                            <button
                              onClick={() => canStart && completeSegmentation()}
                              disabled={!canStart}
                              className={`group inline-flex items-center justify-center px-8 py-4 rounded-xl font-bold transition-all duration-300 shadow-xl transform ${canStart ? 'bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 hover:scale-105 hover:shadow-2xl' : 'bg-slate-300 text-slate-500 cursor-not-allowed'}`}
                            >
                              <span className="mr-2 transition-transform group-hover:scale-110">🚀</span>
                              Comenzar evaluación empresarial
                            </button>
                            <div className="flex items-center text-xs text-slate-600">
                              <LockClosedIcon className="h-4 w-4 mr-2 text-slate-500" />
                              <span>Sin registro para ver resultados. Tus datos están seguros.</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Sección informativa (antes en sidebar) */}
                  <div className="mt-6">
                    <div className="bg-white rounded-2xl shadow-xl ring-1 ring-slate-200 p-6 md:p-7">
                      <div className="text-xs font-semibold tracking-wider text-slate-600 uppercase mb-4">Cómo funciona</div>
                      <div className="space-y-3">
                        <div className="p-3 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200">
                          <div className="text-sm font-semibold text-slate-900 mb-0.5">1) Responde el cuestionario</div>
                          <div className="text-xs text-slate-600">15-20 minutos, preguntas por áreas clave</div>
                        </div>
                        <div className="p-3 rounded-lg bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200">
                          <div className="text-sm font-semibold text-slate-900 mb-0.5">2) Obtén el diagnóstico</div>
                          <div className="text-xs text-slate-600">Puntuación, urgencia y recomendaciones priorizadas</div>
                        </div>
                        <div className="p-3 rounded-lg bg-gradient-to-r from-violet-50 to-purple-50 border border-violet-200">
                          <div className="text-sm font-semibold text-slate-900 mb-0.5">3) Descarga el informe</div>
                          <div className="text-xs text-slate-600">PDF ejecutivo y roadmap de 90 días</div>
                        </div>
                      </div>

                      <div className="mt-6">
                        <div className="text-xs font-semibold tracking-wider text-slate-600 uppercase mb-3">Beneficios</div>
                        <ul className="space-y-2 text-sm text-slate-700">
                          <li className="flex gap-2"><CheckCircleIcon className="h-4 w-4 text-emerald-500 mt-0.5" />Diagnóstico por áreas (IAM, Endpoints, Red, Datos, D&R, Vulns, Continuidad)</li>
                          <li className="flex gap-2"><CheckCircleIcon className="h-4 w-4 text-emerald-500 mt-0.5" />Informe ejecutivo PDF con roadmap 90 días</li>
                          <li className="flex gap-2"><CheckCircleIcon className="h-4 w-4 text-emerald-500 mt-0.5" />Benchmark sectorial y estimación de impacto/esfuerzo</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Intro adicional breve (en lugar de logos) */}
                <div className="mt-10">
                  <p className="text-slate-600 text-base md:text-lg max-w-3xl">
                    
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden ring-1 ring-slate-200">
        <div className="bg-white border-b border-slate-200">
          <div className="text-center py-8 px-6">
            <div className="flex items-center justify-center mb-4">
              <ShieldCheckIcon className="h-12 w-12 text-blue-600 mr-3" />
              <h1 className="text-4xl font-bold text-slate-900">
                {userProfile?.type === 'individual' ? 'Evaluación de Seguridad Personal' : 'Enterprise Security Assessment'}
              </h1>
            </div>
            <p className="text-slate-600 text-lg max-w-3xl mx-auto">
              {userProfile?.type === 'individual' 
                ? 'Evaluación personalizada de su ciberseguridad personal y protección digital'
                : 'Evaluación avanzada de madurez en ciberseguridad basada en frameworks internacionales (NIST, ISO 27001, CIS Controls)'
              }
            </p>
            <div className="flex justify-center items-center mt-4 space-x-6 text-sm text-slate-500">
              <div className="flex items-center">
                <ClockIcon className="h-4 w-4 mr-1 text-slate-500" />
                <span>15-20 minutos</span>
              </div>
              <div className="flex items-center">
                <ChartBarIcon className="h-4 w-4 mr-1 text-slate-500" />
                <span>Análisis por categorías</span>
              </div>
              <div className="flex items-center">
                <DocumentTextIcon className="h-4 w-4 mr-1 text-slate-500" />
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
          <div className="flex justify-between items-center pt-6 border-t border-slate-200/60">
            <button
               onClick={prevStep}
               disabled={currentStep === 0}
               className="group flex items-center px-6 py-3 text-slate-700 border-2 border-slate-300 rounded-xl hover:bg-gradient-to-r hover:from-slate-50 hover:to-gray-50 hover:border-slate-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 font-semibold hover:shadow-md"
             >
               <svg className="w-5 h-5 mr-2 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
               </svg>
               Anterior
             </button>
             
             <button
               onClick={nextStep}
               disabled={answers[currentQuestion.id] === undefined}
               className="group flex items-center px-8 py-3 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 font-bold shadow-xl hover:shadow-2xl transform hover:scale-105"
             >
               {currentStep === currentQuestions.length - 1 ? (
                 <span className="flex items-center">
                   <span className="mr-2 transition-transform group-hover:scale-110">🎯</span>
                   Generar Reporte Personalizado
                   <BoltIcon className="h-5 w-5 ml-2 transition-transform group-hover:rotate-12" />
                 </span>
               ) : (
                 <span className="flex items-center">
                   Siguiente
                   <svg className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                   </svg>
                 </span>
               )}
             </button>
             
             {/* Valor agregado en las últimas preguntas */}
             {currentStep > currentQuestions.length - 5 && (
               <div className="mt-4 p-5 bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 rounded-xl border-2 border-blue-200/60 shadow-lg">
                 <div className="flex items-center text-blue-800">
                   <TrophyIcon className="h-6 w-6 mr-3 text-blue-600" />
                   <span className="text-sm font-semibold">
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
          
          {/* Plan de Acción */}
          {result?.actionPlan && result.actionPlan.length > 0 && (
            <div className="bg-white rounded-xl border border-slate-200 p-8 mb-8">
              <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
                <DocumentTextIcon className="h-7 w-7 mr-3 text-blue-600" />
                Plan de Acción Recomendado
              </h3>
              <div className="space-y-4">
                {result.actionPlan.map((step, index) => (
                  <div key={String(step.id ?? index)} className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start">
                        <span className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold mr-4 mt-0.5">
                          {index + 1}
                        </span>
                        <div>
                          <h4 className="text-slate-900 font-semibold">{step.title}</h4>
                          <p className="text-slate-700 leading-relaxed mt-1">{step.description}</p>
                        </div>
                      </div>
                      <div className="ml-4 flex items-center gap-2">
                        {step.category && (
                          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200">
                            {step.category}
                          </span>
                        )}
                        {step.priority && (
                          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${step.priority === 'CRÍTICO' ? 'bg-red-100 text-red-700 border-red-200' : step.priority === 'ALTO' ? 'bg-orange-100 text-orange-700 border-orange-200' : 'bg-blue-100 text-blue-700 border-blue-200'}`}>
                            {step.priority}
                          </span>
                        )}
                        {step.timeframe && (
                          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
                            {step.timeframe}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
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