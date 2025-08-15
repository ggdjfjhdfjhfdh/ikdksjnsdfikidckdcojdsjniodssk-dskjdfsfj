export const riskCalculatorTranslations = {
  ES: {
    // Metadatos y títulos principales
    pageTitle: 'Calculadora de Riesgo de Ciberseguridad | SESECPRO',
    pageDescription: 'Evalúe el nivel de ciberseguridad de su organización con nuestra calculadora gratuita. Reciba recomendaciones personalizadas para mejorar su protección contra ciberataques.',
    mainTitle: 'Calculadora de Riesgo de Ciberseguridad',
    subtitle: 'Evalúe su nivel de protección en menos de 10 minutos',
    
    // Segmentación inicial
    segmentationTitle: 'Personalicemos su evaluación',

    userTypePersonal: 'Personal',
    userTypeBusiness: 'Empresarial',
    
    companySizeQuestion: '¿Cuál es el tamaño de su organización?',
    companySizeSmall: 'Pequeña (1-50 empleados)',
    companySizeMedium: 'Mediana (51-250 empleados)',
    companySizeLarge: 'Grande (251-1000 empleados)',
    companySizeEnterprise: 'Corporativa (+1000 empleados)',
    
    industryQuestion: '¿En qué sector opera su organización?',
    industryFinancial: 'Servicios Financieros',
    industryHealthcare: 'Salud y Farmacéutica',
    industryTechnology: 'Tecnología',
    industryManufacturing: 'Manufactura',
    industryRetail: 'Retail y E-commerce',
    industryEducation: 'Educación',
    industryGovernment: 'Gobierno y Sector Público',
    industryOther: 'Otro',
    
    itResourcesQuestion: '¿Cuenta con un equipo de IT dedicado?',
    itResourcesYes: 'Sí, tenemos equipo interno',
    itResourcesNo: 'No, externalizamos IT',
    itResourcesPartial: 'Parcialmente (híbrido)',
    
    // Preguntas empresariales
    questionZeroTrust: '¿Ha implementado un modelo de seguridad Zero Trust?',
    questionPrivilegedAccess: '¿Cuenta con una solución de gestión de accesos privilegiados (PAM)?',
    questionMfaAdaptive: '¿Utiliza autenticación multifactor adaptativa basada en riesgo?',
    questionIdentityGovernance: '¿Tiene implementado un sistema de gobierno de identidades (IGA)?',
    questionLeastPrivilege: '¿Aplica el principio de menor privilegio en todos los accesos?',
    questionEdrSolution: '¿Cuenta con una solución EDR/XDR en todos los endpoints?',
    questionDeviceEncryption: '¿Todos sus dispositivos tienen cifrado completo de disco?',
    questionMobileDeviceManagement: '¿Utiliza una solución MDM/EMM para dispositivos móviles?',
    questionEndpointCompliance: '¿Monitorea el cumplimiento de políticas en endpoints?',
    questionUsbControl: '¿Tiene controles sobre el uso de dispositivos USB?',
    questionNgfwDeployment: '¿Ha desplegado firewalls de nueva generación (NGFW)?',
    questionNetworkMicrosegmentation: '¿Ha implementado microsegmentación de red?',
    questionDnsSecurity: '¿Utiliza soluciones de seguridad DNS?',
    questionNetworkMonitoring: '¿Monitorea continuamente el tráfico de red?',
    questionSecureRemoteAccess: '¿Proporciona acceso remoto seguro (ZTNA/SASE)?',
    questionDataClassification: '¿Ha clasificado y etiquetado sus datos críticos?',
    questionDlpSolution: '¿Cuenta con una solución de prevención de pérdida de datos (DLP)?',
    questionEncryptionAtRest: '¿Cifra los datos en reposo en bases de datos y almacenamiento?',
    questionEncryptionInTransit: '¿Cifra todas las comunicaciones en tránsito?',
    questionKeyManagement: '¿Utiliza un sistema centralizado de gestión de claves?',
    questionSiemSolution: '¿Cuenta con una solución SIEM/SOAR implementada?',
    questionThreatHunting: '¿Realiza actividades proactivas de threat hunting?',
    questionIncidentResponseTeam: '¿Tiene un equipo de respuesta a incidentes (CSIRT)?',
    questionForensicCapabilities: '¿Cuenta con capacidades de análisis forense digital?',
    questionVulnerabilityManagement: '¿Tiene un programa formal de gestión de vulnerabilidades?',
    questionPenetrationTesting: '¿Realiza pruebas de penetración regulares?',
    questionPatchManagement: '¿Cuenta con un proceso automatizado de gestión de parches?',
    questionAssetInventory: '¿Mantiene un inventario actualizado de todos los activos?',
    questionBusinessContinuityPlan: '¿Tiene un plan de continuidad del negocio actualizado?',
    questionDisasterRecovery: '¿Cuenta con un plan de recuperación ante desastres probado?',
    questionBackupImmutable: '¿Utiliza copias de seguridad inmutables?',
    questionRtoRpoCompliance: '¿Cumple con los objetivos RTO/RPO definidos?',
    
    // Preguntas individuales
    questionPersonalAntivirus: '¿Tiene antivirus actualizado en todos sus dispositivos?',
    questionPersonalMfa: '¿Utiliza autenticación de dos factores en sus cuentas importantes?',
    questionPasswordManager: '¿Usa un gestor de contraseñas?',
    questionSoftwareUpdates: '¿Mantiene actualizado el software de sus dispositivos?',
    questionSecureBrowsing: '¿Utiliza navegación segura y extensiones de seguridad?',
    questionPersonalBackups: '¿Realiza copias de seguridad regulares de sus datos?',
    questionCloudSecurity: '¿Configura adecuadamente la seguridad en servicios en la nube?',
    questionPersonalEncryption: '¿Cifra sus datos sensibles y comunicaciones?',
    questionSocialMediaPrivacy: '¿Configura adecuadamente la privacidad en redes sociales?',
    questionSecureMessaging: '¿Utiliza aplicaciones de mensajería cifrada?',
    questionEmailSecurity: '¿Verifica la seguridad de sus correos electrónicos?',
    questionPublicWifiSecurity: '¿Toma precauciones al usar WiFi público?',
    questionDeviceLocking: '¿Bloquea sus dispositivos con PIN/contraseña/biometría?',
    questionAppPermissions: '¿Revisa los permisos de las aplicaciones que instala?',
    questionDeviceTracking: '¿Tiene habilitado el rastreo en caso de pérdida?',
    questionPhishingAwareness: '¿Sabe identificar intentos de phishing?',
    questionSecurityNews: '¿Se mantiene informado sobre amenazas de seguridad?',
    questionIncidentResponse: '¿Sabe qué hacer si sufre un incidente de seguridad?',
    
    // Opciones de respuesta
    optionYes: 'Sí',
    optionNo: 'No',
    optionPartially: 'Parcialmente',
    optionPersonal: 'Personal',
    optionBusiness: 'Empresarial',
    optionSmall: 'Pequeña (1-50 empleados)',
    optionMedium: 'Mediana (51-250 empleados)',
    optionLarge: 'Grande (251-1000 empleados)',
    optionEnterprise: 'Empresa (1000+ empleados)',
    optionYesDedicated: 'Sí, equipo dedicado',
    optionYesPartial: 'Sí, parcialmente (híbrido)',
    optionNoIT: 'No, externalizado',
    
    // Resultados y recomendaciones
    excellentSecurity: 'EXCELENTE: Su seguridad personal supera el 95% de usuarios.',
    advancedLevel: 'NIVEL AVANZADO: Supera al 75% de usuarios en seguridad.',
    intermediateLevel: 'NIVEL INTERMEDIO: Básicos cubiertos, vulnerabilidades críticas pendientes.',
    highRisk: 'RIESGO ELEVADO: Múltiples vulnerabilidades críticas detectadas.',
    criticalRisk: 'RIESGO CRÍTICO: Exposición máxima - Acción inmediata requerida.',
    
    // Impacto empresarial
    businessImpactLow: 'Excelencia operativa - Riesgo de brecha <2% vs 46% promedio sector',
    businessImpactMedium: 'Reducción riesgo significativa - Probabilidad brecha 15% vs 46% promedio',
    businessImpactHigh: 'RIESGO CRÍTICO: Probabilidad brecha 40% - Impacto financiero severo',
    businessImpactCritical: 'EMERGENCIA: Probabilidad brecha >60% - Riesgo paralización negocio',
    
    // Impacto personal
    personalImpactLow: 'Protección personal óptima - Riesgo de robo de identidad <1% (vs 15% promedio nacional)',
    personalImpactMedium: 'Buena protección - Riesgo robo identidad 8% (vs 15% promedio)',
    personalImpactHigh: 'RIESGO ALTO: Probabilidad robo identidad 35% - Exposición crítica',
    personalImpactCritical: 'EMERGENCIA: Probabilidad robo identidad >50% - Riesgo financiero extremo',
    
    // Tiempo de implementación
    timeToImplement1to2Months: '1-2 meses',
    timeToImplement2to4Months: '2-4 meses',
    timeToImplement3to6Months: '3-6 meses',
    timeToImplement6to12Months: '6-12 meses',
    timeToImplement9to18Months: '9-18 meses',
    timeToImplement1to3MonthsUrgent: '1-3 meses (URGENTE)',
    timeToImplement3to6MonthsUrgent: '3-6 meses (URGENTE)',
    timeToImplement2to4WeeksEmergency: '2-4 semanas (EMERGENCIA)',
    timeToImplement1to3MonthsEmergency: '1-3 meses (EMERGENCIA)',
    
    // Botones y acciones
    contactImmediate: 'CONTACTO INMEDIATO: SESECPRO para intervención de emergencia.',
    urgentToday: 'HOY: Cambiar TODAS las contraseñas (81% brechas usan credenciales débiles).',
    urgentMFA: 'URGENTE: 2FA inmediato (99.9% efectivo vs account takeover).',
    
    // Etiquetas de urgencia (eliminadas - duplicadas más abajo)
    
    // Categorías de preguntas
    categoryIdentityAccess: 'Identidad y Acceso',
    categoryEndpoints: 'Endpoints',
    categoryNetworkPerimeter: 'Red y Perímetro',
    categoryDataProtection: 'Protección de Datos',
    categoryDetectionResponse: 'Detección y Respuesta',
    categoryVulnerabilityManagement: 'Gestión de Vulnerabilidades',
    categoryBusinessContinuity: 'Continuidad del Negocio',
    categoryPersonalProtection: 'Protección Personal',
    categoryPersonalData: 'Datos Personales',
    categoryCommunications: 'Comunicaciones',
    categoryDevices: 'Dispositivos',
    categoryAwareness: 'Concienciación',
    
    // Navegación
    nextButton: 'Siguiente',
    previousButton: 'Anterior',
    startAssessment: 'Comenzar Evaluación',
    finishAssessment: 'Finalizar Evaluación',
    
    // Progreso
    progressText: 'Pregunta {current} de {total}',
    timeRemaining: 'Tiempo restante: {minutes}:{seconds}',
    almostFinished: '¡Casi terminamos! Últimas preguntas para personalizar sus recomendaciones.',
    
    // Resultados
    resultsTitle: 'Resultados de su Evaluación',
    securityLevel: 'Nivel de Seguridad',
    levelExcellent: 'Excelente',
    levelGood: 'Bueno',
    levelMedium: 'Medio',
    levelHigh: 'Riesgo Alto',
    levelCritical: 'Crítico',
    
    // Urgencia
    urgencyCritical: 'ALERTA CRÍTICA: Acción inmediata requerida',
    urgencyHigh: 'RIESGO ALTO: Acción requerida en 30 días',
    urgencyMedium: 'RIESGO MEDIO: Mejoras recomendadas',
    urgencyLow: 'RIESGO BAJO: Mantenimiento preventivo',
    
    // Costos y tiempo
    preventionCost: 'Costo de prevención:',
    implementationTime: 'Tiempo de implementación',
    
    // Recomendaciones
    recommendationsTitle: 'Recomendaciones Personalizadas',
    
    // Captura de leads
    getDetailedReport: 'Obtener Informe Detallado',
    reportDescription: 'Reciba un análisis completo con roadmap personalizado y presupuesto detallado.',
    emailLabel: 'Email corporativo',
    emailPlaceholder: 'su.email@empresa.com',
    companyLabel: 'Empresa',
    companyPlaceholder: 'Nombre de su empresa',
    roleLabel: 'Cargo',
    rolePlaceholder: 'Su cargo en la empresa',
    phoneLabel: 'Teléfono (opcional)',
    phonePlaceholder: '+34 600 000 000',
    
    // Botones de acción
    downloadReport: 'Descargar Informe PDF',
    scheduleConsultation: 'Agendar Consulta Gratuita',
    contactExpert: 'Contactar Experto',
    newAssessment: 'Realizar Nueva Evaluación',
    
    // Mensajes de urgencia
    criticalMessage: 'Cada minuto cuenta. Su organización está expuesta a amenazas críticas que requieren intervención inmediata de nuestros especialistas.',
    highMessage: 'Los riesgos identificados pueden materializarse en cualquier momento. Nuestro equipo puede reducir su exposición en 30 días.',
    mediumMessage: 'Fortalezca su postura de seguridad con nuestro enfoque probado y metodología de clase mundial.',
    lowMessage: 'Mantenga su excelencia operativa y explore las últimas innovaciones en ciberseguridad empresarial.',
    
    // Elementos de confianza
    noCommitment: 'Sin compromiso',
    certifiedExperts: 'Expertos certificados',
    responseTime: 'Respuesta en menos de 2 horas',
    freeConsultation: 'Consulta sin compromiso',
    socialProof: '+200 empresas ya han mejorado su seguridad con nosotros',
    urgentOffer: '¡Menos de 10 minutos restantes!',
    
    // Errores y validación
    emailRequired: 'El email es requerido',
    emailInvalid: 'Formato de email inválido',
    companyRequired: 'El nombre de la empresa es requerido',
    roleRequired: 'El cargo es requerido',
    submissionError: 'Error al enviar. Inténtelo de nuevo.',
    submissionSuccess: '¡Gracias! Recibirá su reporte en breve.',
    submitting: 'Enviando...',
    
    // Títulos de modal
    criticalSituationDetected: 'Situación Crítica Detectada',
    significantRisksIdentified: 'Riesgos Significativos Identificados',
    improvementOpportunities: 'Oportunidades de Mejora',
    excellentSecurityPosture: 'Excelente Postura de Seguridad',
    
    // Impacto empresarial
    businessImpactTitle: 'Impacto Empresarial',
    priority: 'Prioridad',
    
    // Títulos principales
    calculatorTitle: 'Calculadora de Riesgo Cibernético',
    personalizationMessage: 'Primero, ayúdanos a personalizar la evaluación según su perfil',
    
    // Descripciones de opciones
    personalDescription: 'Evaluar mi seguridad personal y dispositivos',
    businessDescription: 'Evaluar la ciberseguridad empresarial',
    
    // Pregunta de tipo de usuario
    userTypeQuestion: '¿Para quién es esta evaluación?',
    
    // Descripciones adicionales para evaluación personal y recursos de TI
    evaluationPersonalDescription: 'Nuestro cuestionario está personalizado para evaluar la ciberseguridad en el ámbito personal, incluyendo dispositivos, cuentas online, y hábitos de seguridad digital.',
    startPersonalEvaluation: 'Comenzar Evaluación Personal',
    itTeamYes: 'Sí, tenemos equipo IT',
    itTeamYesDescription: 'Contamos con personal técnico interno',
    itTeamNo: 'No, externalizamos IT',
    itTeamNoDescription: 'Dependemos de proveedores externos'
  },
  
  EN: {
    // Metadata and main titles
    pageTitle: 'Cybersecurity Risk Calculator | SESECPRO',
    pageDescription: 'Assess your organization\'s cybersecurity level with our free calculator. Receive personalized recommendations to improve your protection against cyberattacks.',
    mainTitle: 'Cybersecurity Risk Calculator',
    subtitle: 'Assess your protection level in less than 10 minutes',
    
    // Initial segmentation
    segmentationTitle: 'Let\'s personalize your assessment',
    calculatorTitle: 'Cybersecurity Risk Calculator',
    personalizationMessage: 'First, help us personalize the assessment according to your profile',
    personalDescription: 'Assess my personal security and devices',
    businessDescription: 'Assess business cybersecurity',
    userTypeQuestion: 'Who is this assessment for?',

    userTypePersonal: 'Personal',
    userTypeBusiness: 'Business',
    
    companySizeQuestion: 'What is the size of your organization?',
    companySizeSmall: 'Small (1-50 employees)',
    companySizeMedium: 'Medium (51-250 employees)',
    companySizeLarge: 'Large (251-1000 employees)',
    companySizeEnterprise: 'Enterprise (+1000 employees)',
    
    industryQuestion: 'What sector does your organization operate in?',
    industryFinancial: 'Financial Services',
    industryHealthcare: 'Healthcare & Pharmaceutical',
    industryTechnology: 'Technology',
    industryManufacturing: 'Manufacturing',
    industryRetail: 'Retail & E-commerce',
    industryEducation: 'Education',
    industryGovernment: 'Government & Public Sector',
    industryOther: 'Other',
    
    itResourcesQuestion: 'Do you have a dedicated IT team?',
    itResourcesYes: 'Yes, we have internal team',
    itResourcesNo: 'No, we outsource IT',
    itResourcesPartial: 'Partially (hybrid)',
    
    // Business questions
    questionZeroTrust: 'Have you implemented a Zero Trust security model?',
    questionPrivilegedAccess: 'Do you have a Privileged Access Management (PAM) solution?',
    questionMfaAdaptive: 'Do you use risk-based adaptive multi-factor authentication?',
    questionIdentityGovernance: 'Do you have an Identity Governance and Administration (IGA) system?',
    questionLeastPrivilege: 'Do you apply the principle of least privilege for all access?',
    questionEdrSolution: 'Do you have an EDR/XDR solution on all endpoints?',
    questionDeviceEncryption: 'Do all your devices have full disk encryption?',
    questionMobileDeviceManagement: 'Do you use an MDM/EMM solution for mobile devices?',
    questionEndpointCompliance: 'Do you monitor policy compliance on endpoints?',
    questionUsbControl: 'Do you have controls over USB device usage?',
    questionNgfwDeployment: 'Have you deployed Next-Generation Firewalls (NGFW)?',
    questionNetworkMicrosegmentation: 'Have you implemented network microsegmentation?',
    questionDnsSecurity: 'Do you use DNS security solutions?',
    questionNetworkMonitoring: 'Do you continuously monitor network traffic?',
    questionSecureRemoteAccess: 'Do you provide secure remote access (ZTNA/SASE)?',
    questionDataClassification: 'Have you classified and labeled your critical data?',
    questionDlpSolution: 'Do you have a Data Loss Prevention (DLP) solution?',
    questionEncryptionAtRest: 'Do you encrypt data at rest in databases and storage?',
    questionEncryptionInTransit: 'Do you encrypt all communications in transit?',
    questionKeyManagement: 'Do you use a centralized key management system?',
    questionSiemSolution: 'Do you have a SIEM/SOAR solution implemented?',
    questionThreatHunting: 'Do you perform proactive threat hunting activities?',
    questionIncidentResponseTeam: 'Do you have an incident response team (CSIRT)?',
    questionForensicCapabilities: 'Do you have digital forensic analysis capabilities?',
    questionVulnerabilityManagement: 'Do you have a formal vulnerability management program?',
    questionPenetrationTesting: 'Do you conduct regular penetration testing?',
    questionPatchManagement: 'Do you have an automated patch management process?',
    questionAssetInventory: 'Do you maintain an updated inventory of all assets?',
    questionBusinessContinuityPlan: 'Do you have an updated business continuity plan?',
    questionDisasterRecovery: 'Do you have a tested disaster recovery plan?',
    questionBackupImmutable: 'Do you use immutable backups?',
    questionRtoRpoCompliance: 'Do you meet defined RTO/RPO objectives?',
    
    // Individual questions
    questionPersonalAntivirus: 'Do you have updated antivirus on all your devices?',
    questionPersonalMfa: 'Do you use two-factor authentication on your important accounts?',
    questionPasswordManager: 'Do you use a password manager?',
    questionSoftwareUpdates: 'Do you keep your device software updated?',
    questionSecureBrowsing: 'Do you use secure browsing and security extensions?',
    questionPersonalBackups: 'Do you regularly backup your data?',
    questionCloudSecurity: 'Do you properly configure security in cloud services?',
    questionPersonalEncryption: 'Do you encrypt your sensitive data and communications?',
    questionSocialMediaPrivacy: 'Do you properly configure privacy on social media?',
    questionSecureMessaging: 'Do you use encrypted messaging applications?',
    questionEmailSecurity: 'Do you verify the security of your emails?',
    questionPublicWifiSecurity: 'Do you take precautions when using public WiFi?',
    questionDeviceLocking: 'Do you lock your devices with PIN/password/biometrics?',
    questionAppPermissions: 'Do you review permissions of apps you install?',
    questionDeviceTracking: 'Do you have tracking enabled in case of loss?',
    questionPhishingAwareness: 'Do you know how to identify phishing attempts?',
    questionSecurityNews: 'Do you stay informed about security threats?',
    questionIncidentResponse: 'Do you know what to do if you suffer a security incident?',
    
    // Response options
    optionYes: 'Yes',
    optionNo: 'No',
    optionPartially: 'Partially',
    optionPersonal: 'Personal',
    optionBusiness: 'Business',
    optionSmall: 'Small (1-50 employees)',
    optionMedium: 'Medium (51-250 employees)',
    optionLarge: 'Large (251-1000 employees)',
    optionEnterprise: 'Enterprise (1000+ employees)',
    optionYesDedicated: 'Yes, dedicated team',
    optionYesPartial: 'Yes, partially (hybrid)',
    optionNoIT: 'No, outsourced',
    
    // Results and recommendations
    excellentSecurity: 'EXCELLENT: Your personal security exceeds 95% of users.',
    advancedLevel: 'ADVANCED LEVEL: Exceeds 75% of users in security.',
    intermediateLevel: 'INTERMEDIATE LEVEL: Basics covered, critical vulnerabilities pending.',
    highRisk: 'HIGH RISK: Multiple critical vulnerabilities detected.',
    criticalRisk: 'CRITICAL RISK: Maximum exposure - Immediate action required.',
    
    // Business impact
    businessImpactLow: 'Operational excellence - Breach risk <2% vs 46% industry average',
    businessImpactMedium: 'Significant risk reduction - Breach probability 15% vs 46% average',
    businessImpactHigh: 'CRITICAL RISK: Breach probability 40% - Severe financial impact',
    businessImpactCritical: 'EMERGENCY: Breach probability >60% - Business paralysis risk',
    
    // Personal impact
    personalImpactLow: 'Optimal personal protection - Identity theft risk <1% (vs 15% national average)',
    personalImpactMedium: 'Good protection - Identity theft risk 8% (vs 15% average)',
    personalImpactHigh: 'HIGH RISK: Identity theft probability 35% - Critical exposure',
    personalImpactCritical: 'EMERGENCY: Identity theft probability >50% - Extreme financial risk',
    
    // Implementation time
    timeToImplement1to2Months: '1-2 months',
    timeToImplement2to4Months: '2-4 months',
    timeToImplement3to6Months: '3-6 months',
    timeToImplement6to12Months: '6-12 months',
    timeToImplement9to18Months: '9-18 months',
    timeToImplement1to3MonthsUrgent: '1-3 months (URGENT)',
    timeToImplement3to6MonthsUrgent: '3-6 months (URGENT)',
    timeToImplement2to4WeeksEmergency: '2-4 weeks (EMERGENCY)',
    timeToImplement1to3MonthsEmergency: '1-3 months (EMERGENCIA)',
    
    // Buttons and actions
    contactImmediate: 'IMMEDIATE CONTACT: SESECPRO for emergency intervention.',
    urgentToday: 'TODAY: Change ALL passwords (81% breaches use weak credentials).',
    urgentMFA: 'URGENT: Immediate 2FA (99.9% effective vs account takeover).',
    
    // Urgency labels (removed duplicates - keeping descriptive versions below)
    
    // Question categories
    categoryIdentityAccess: 'Identity & Access',
    categoryEndpoints: 'Endpoints',
    categoryNetworkPerimeter: 'Network & Perimeter',
    categoryDataProtection: 'Data Protection',
    categoryDetectionResponse: 'Detection & Response',
    categoryVulnerabilityManagement: 'Vulnerability Management',
    categoryBusinessContinuity: 'Business Continuity',
    categoryPersonalProtection: 'Personal Protection',
    categoryPersonalData: 'Personal Data',
    categoryCommunications: 'Communications',
    categoryDevices: 'Devices',
    categoryAwareness: 'Awareness',
    
    // Navigation
    nextButton: 'Next',
    previousButton: 'Previous',
    startAssessment: 'Start Assessment',
    finishAssessment: 'Finish Assessment',
    
    // Progress
    progressText: 'Question {current} of {total}',
    timeRemaining: 'Time remaining: {minutes}:{seconds}',
    almostFinished: 'Almost done! Final questions to personalize your recommendations.',
    
    // Results
    resultsTitle: 'Your Assessment Results',
    securityLevel: 'Security Level',
    levelExcellent: 'Excellent',
    levelGood: 'Good',
    levelMedium: 'Medium',
    levelHigh: 'High Risk',
    levelCritical: 'Critical',
    
    // Urgency
    urgencyCritical: 'CRITICAL ALERT: Immediate action required',
    urgencyHigh: 'HIGH RISK: Action required within 30 days',
    urgencyMedium: 'MEDIUM RISK: Improvements recommended',
    urgencyLow: 'LOW RISK: Preventive maintenance',
    
    // Costs and time
    preventionCost: 'Prevention cost:',
    implementationTime: 'Implementation time',
    
    // Recommendations
    recommendationsTitle: 'Personalized Recommendations',
    
    // Lead capture
    getDetailedReport: 'Get Detailed Report',
    reportDescription: 'Receive a complete analysis with personalized roadmap and detailed budget.',
    emailLabel: 'Corporate email',
    emailPlaceholder: 'your.email@company.com',
    companyLabel: 'Company',
    companyPlaceholder: 'Your company name',
    roleLabel: 'Role',
    rolePlaceholder: 'Your role in the company',
    phoneLabel: 'Phone (optional)',
    phonePlaceholder: '+1 555 000 0000',
    
    // Action buttons
    downloadReport: 'Download PDF Report',
    scheduleConsultation: 'Schedule Free Consultation',
    contactExpert: 'Contact Expert',
    newAssessment: 'Take New Assessment',
    
    // Urgency messages
    criticalMessage: 'Every minute counts. Your organization is exposed to critical threats that require immediate intervention from our specialists.',
    highMessage: 'The identified risks could materialize at any moment. Our team can reduce your exposure within 30 days.',
    mediumMessage: 'Strengthen your security posture with our proven approach and world-class methodology.',
    lowMessage: 'Maintain your operational excellence and explore the latest innovations in enterprise cybersecurity.',
    
    // Trust elements
    noCommitment: 'No commitment',
    certifiedExperts: 'Certified experts',
    responseTime: 'Response in less than 2 hours',
    freeConsultation: 'No-obligation consultation',
    socialProof: '+200 companies have already improved their security with us',
    urgentOffer: 'Less than 10 minutes remaining!',
    
    // Errors and validation
    emailRequired: 'Email is required',
    emailInvalid: 'Invalid email format',
    companyRequired: 'Company name is required',
    roleRequired: 'Role is required',
    submissionError: 'Submission error. Please try again.',
    submissionSuccess: 'Thank you! You will receive your report shortly.',
    submitting: 'Sending...',
    
    // Modal titles
    criticalSituationDetected: 'Critical Situation Detected',
    significantRisksIdentified: 'Significant Risks Identified',
    improvementOpportunities: 'Improvement Opportunities',
    excellentSecurityPosture: 'Excellent Security Posture',
    
    // Business impact
    businessImpactTitle: 'Business Impact',
    priority: 'Priority',
    
    // Main titles (removed duplicates - already defined above)
  }
};

export type RiskCalculatorTranslationKey = keyof typeof riskCalculatorTranslations.ES;