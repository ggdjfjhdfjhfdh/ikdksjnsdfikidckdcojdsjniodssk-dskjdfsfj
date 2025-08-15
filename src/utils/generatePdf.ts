import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

declare module 'jspdf' {
  interface jsPDF {
    autoTable: (options: any) => jsPDF;
  }
}

interface AssessmentData {
  score: number;
  level: 'low' | 'medium' | 'high' | 'critical';
  urgency: 'low' | 'medium' | 'high' | 'critical';
  businessImpact: string;
  estimatedCost: string;
  timeToImplement: string;
  recommendations: string[];
}

interface UserProfile {
  type: 'individual' | 'business';
  companySize?: 'small' | 'medium' | 'large' | 'enterprise';
  industry?: string;
  role?: string;
  hasITTeam?: boolean;
}

interface PersonalRecommendation {
  title: string;
  description: string;
  time: string;
  cost: string;
  familySpecific?: boolean;
  platform?: 'whatsapp' | 'email' | 'social' | 'general';
  device?: 'iphone' | 'android' | 'windows' | 'mac' | 'general';
  qrLink?: string;
}

interface DeviceGuide {
  device: 'iPhone' | 'Android' | 'Windows' | 'Mac';
  twoFactorSteps: string[];
  passwordManagerSteps: string[];
  backupSteps: string[];
}

interface AntiScamTip {
  platform: 'WhatsApp' | 'Email' | 'Redes Sociales';
  warning: string;
  tips: string[];
}

// Helpers para personalizar contenido de particulares
function getPersonalImpactText(urgency: 'low' | 'medium' | 'high' | 'critical', score: number): string {
  const base = 'Este resumen te muestra de forma sencilla qué podría pasar si no mejoras tu seguridad.';
  if (urgency === 'critical') {
    return `${base} Riesgo muy alto de robo de cuentas (correo, redes sociales o banca), pérdida de fotos y documentos, y posibles compras no autorizadas. Recomendado actuar hoy mismo para reducir el riesgo inmediato.`;
  }
  if (urgency === 'high') {
    return `${base} Riesgo alto de accesos no autorizados y estafas (phishing). Algunas medidas rápidas pueden reducir notablemente el riesgo esta semana.`;
  }
  if (urgency === 'medium') {
    return `${base} Riesgo moderado. Con mejoras graduales este mes (contraseñas, actualizaciones y copias de seguridad) estarás mucho más protegido.`;
  }
  return `${base} Tu situación es estable, pero conviene mantener buenas prácticas y revisar tu seguridad cada cierto tiempo.`;
}

function getPersonalRecommendations(urgency: 'low' | 'medium' | 'high' | 'critical', score: number): PersonalRecommendation[] {
  const essentials: PersonalRecommendation[] = [
    {
      title: 'Activa la verificación en dos pasos (2FA)',
      description: 'Empieza por tu correo principal y banca online. La 2FA añade una segunda capa de seguridad que bloquea la mayoría de accesos no autorizados.',
      time: '10-20 min por cuenta',
      cost: 'Gratis'
    },
    {
      title: 'Usa un gestor de contraseñas y cambia las débiles',
      description: 'Crea contraseñas únicas y largas. Prioriza correo, banca y redes sociales. Un gestor te ayuda a recordar y completar contraseñas de forma segura.',
      time: '30-60 min inicial',
      cost: 'Gratis o 3€/mes'
    },
    {
      title: 'Actualiza el sistema y las apps más usadas',
      description: 'Mantén el móvil y el ordenador actualizados. Revisa también navegador, WhatsApp, redes sociales y aplicaciones bancarias.',
      time: '15-30 min',
      cost: 'Gratis'
    },
    {
      title: 'Activa copias de seguridad automáticas',
      description: 'Configura copias en la nube (Google Drive, iCloud, OneDrive) o en un disco externo para no perder fotos y documentos si hay un problema.',
      time: '20-40 min',
      cost: 'Gratis o 2€/mes'
    },
  ];

  const improvements: PersonalRecommendation[] = [
    {
      title: 'Revisa la privacidad de tus redes sociales',
      description: 'Limita quién puede ver tu información y publicaciones. Evita exponer datos personales (teléfono, dirección, documentos).',
      time: '15-30 min',
      cost: 'Gratis'
    },
    {
      title: 'Protege tu Wi-Fi de casa',
      description: 'Cambia la contraseña por una fuerte y desactiva WPS. Actualiza el firmware del router si es posible.',
      time: '15-30 min',
      cost: 'Gratis'
    },
    {
      title: 'Evita estafas y phishing',
      description: 'Desconfía de enlaces urgentes o que piden códigos. Verifica remitentes y activa alertas de inicio de sesión en tus cuentas.',
      time: '10 min',
      cost: 'Gratis'
    }
  ];

  if (urgency === 'critical' || urgency === 'high') {
    return [...essentials, ...improvements];
  }
  if (urgency === 'medium') {
    return [...essentials.slice(0, 3), ...improvements];
  }
  return [...essentials.slice(2), ...improvements];
}

function getPersonalNextSteps(urgency: 'low' | 'medium' | 'high' | 'critical'): string[] {
  if (urgency === 'critical') {
    return [
      '1) Hoy: Activa 2FA en correo y banca. Cambia contraseñas débiles (usa un gestor).',
      '2) Esta semana: Actualiza móvil/PC y apps principales. Activa copias de seguridad.',
      '3) Este mes: Revisa privacidad de redes y la seguridad del Wi-Fi. Programa un recordatorio en 30 días para comprobar avances.'
    ];
  }
  if (urgency === 'high') {
    return [
      '1) Hoy: Activa 2FA en tus cuentas críticas y cambia las contraseñas débiles.',
      '2) Esta semana: Actualiza dispositivos y configura copias de seguridad automáticas.',
      '3) Próximas semanas: Revisa privacidad de redes y seguridad del Wi-Fi. Revisión en 30 días.'
    ];
  }
  if (urgency === 'medium') {
    return [
      '1) Esta semana: Actualiza dispositivos y revisa contraseñas con un gestor.',
      '2) Este mes: Activa 2FA y configura copias de seguridad automáticas.',
      '3) Mantén el hábito: Revisión rápida cada 2-3 meses.'
    ];
  }
  return [
    '1) Mantén actualizados tus dispositivos y apps.',
    '2) Revisa tus contraseñas y privacidad de redes cada 2-3 meses.',
    '3) Activa 2FA en nuevas cuentas que vayas creando.'
  ];
}

export const generateGuidePdf = (title: string, content: HTMLElement, userProfile?: UserProfile) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.width;
  const pageHeight = doc.internal.pageSize.height;
  
  // Colores corporativos
  const primaryColor = [37, 99, 235]; // Blue-600
  const secondaryColor = [51, 65, 85]; // Slate-700
  const accentColor = [59, 130, 246]; // Blue-500
  const lightGray = [248, 250, 252]; // Slate-50
  const darkGray = [30, 41, 59]; // Slate-800
  const lightText = [100, 116, 139]; // Slate-500
  
  // Función para agregar encabezado en todas las páginas
  const addHeader = () => {
    doc.setFillColor(...primaryColor);
    doc.rect(0, 0, pageWidth, 25, 'F');
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('SESECPRO', 15, 16);
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    const headerTitle = userProfile?.type === 'business' ? 'Informe de Evaluación de Ciberseguridad Empresarial' : 'Informe de Evaluación de Ciberseguridad Personal';
    doc.text(headerTitle, pageWidth - 15, 16, { align: 'right' });
  };

  // Función para agregar pie de página
  const addFooter = (pageNum: number, totalPages: number) => {
    doc.setFillColor(...lightGray);
    doc.rect(0, pageHeight - 15, pageWidth, 15, 'F');
    
    doc.setTextColor(...secondaryColor);
    doc.setFontSize(8);
    doc.text(`Página ${pageNum} de ${totalPages}`, pageWidth / 2, pageHeight - 6, { align: 'center' });
    doc.text(`© ${new Date().getFullYear()} SESECPRO - Confidencial`, 15, pageHeight - 6);
    doc.text(new Date().toLocaleDateString(), pageWidth - 15, pageHeight - 6, { align: 'right' });
  };
  
  // Extraer datos del HTML
  const extractAssessmentData = (): AssessmentData => {
    const scoreElement = content.querySelector('.text-6xl');
    const levelElement = content.querySelector('.text-2xl.font-bold.capitalize') || 
                        content.querySelector('[class*="text-"][class*="font-bold"]');
    const impactElement = content.querySelector('.italic');
    const costElements = content.querySelectorAll('.text-2xl.font-bold');
    const recommendationElements = content.querySelectorAll('li span');
    
    const score = scoreElement ? parseInt(scoreElement.textContent?.replace('%', '') || '0') : 0;
    const levelText = levelElement?.textContent?.toLowerCase() || '';
    
    let level: AssessmentData['level'] = 'medium';
    let urgency: AssessmentData['urgency'] = 'medium';
    
    if (score >= 85) { level = 'low'; urgency = 'low'; }
    else if (score >= 70) { level = 'medium'; urgency = 'medium'; }
    else if (score >= 50) { level = 'high'; urgency = 'high'; }
    else { level = 'critical'; urgency = 'critical'; }
    
    return {
      score,
      level,
      urgency,
      businessImpact: impactElement?.textContent || 'Impacto no especificado',
      estimatedCost: costElements[1]?.textContent || 'No especificado',
      timeToImplement: costElements[0]?.textContent || 'No especificado',
      recommendations: Array.from(recommendationElements).map(el => el.textContent || '').filter(text => text.length > 10)
    };
  };
  
  const data = extractAssessmentData();
  
  // PÁGINA 1: PORTADA
  addHeader();
  
  // Logo placeholder y título principal
  doc.setFillColor(...primaryColor);
  doc.circle(pageWidth / 2, 60, 15, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(16);
  doc.text('S', pageWidth / 2, 65, { align: 'center' });
  
  doc.setTextColor(...darkGray);
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.text(userProfile?.type === 'business' ? 'INFORME EJECUTIVO' : 'RESUMEN PERSONAL', pageWidth / 2, 95, { align: 'center' });
  
  doc.setFontSize(18);
  doc.setTextColor(...primaryColor);
  doc.text(userProfile?.type === 'business' ? 'Evaluación de Ciberseguridad' : 'Evaluación de Seguridad Personal', pageWidth / 2, 110, { align: 'center' });
  
  // Métricas principales en la portada
  const metricsY = 140;
  doc.setFillColor(...lightGray);
  doc.rect(30, metricsY, pageWidth - 60, 60, 'F');
  
  doc.setTextColor(...darkGray);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text(userProfile?.type === 'business' ? 'RESUMEN EJECUTIVO' : 'RESUMEN PERSONAL', pageWidth / 2, metricsY + 15, { align: 'center' });
  
  // Score principal
  doc.setFontSize(36);
  doc.setTextColor(...(data.score >= 85 ? [34, 197, 94] : data.score >= 70 ? [234, 179, 8] : data.score >= 50 ? [249, 115, 22] : [239, 68, 68]));
  doc.text(`${data.score}%`, pageWidth / 2, metricsY + 40, { align: 'center' });
  
  doc.setFontSize(12);
  doc.setTextColor(...secondaryColor);
  doc.text('Nivel de Seguridad', pageWidth / 2, metricsY + 50, { align: 'center' });
  
  // Información del cliente y fecha
  doc.setTextColor(...secondaryColor);
  doc.setFontSize(10);
  doc.text(`Fecha de evaluación: ${new Date().toLocaleDateString()}`, pageWidth / 2, 230, { align: 'center' });
  doc.text('Evaluación realizada por SESECPRO', pageWidth / 2, 245, { align: 'center' });
  
  // Disclaimer de confidencialidad
  doc.setFillColor(255, 243, 204);
  doc.rect(20, 260, pageWidth - 40, 20, 'F');
  doc.setTextColor(...lightText);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  if (userProfile?.type === 'business') {
    doc.text('CONFIDENCIAL: Este documento contiene información sensible sobre la seguridad', pageWidth / 2, 270, { align: 'center' });
    doc.text('de su organización. Distribución limitada a personal autorizado.', pageWidth / 2, 275, { align: 'center' });
  } else {
    doc.text('Documento de referencia personal. No compartir públicamente información sensible.', pageWidth / 2, 272, { align: 'center' });
  }
  
  addFooter(1, 3);
  
  // PÁGINA 2: ANÁLISIS DETALLADO
  doc.addPage();
  addHeader();
  
  let yPos = 40;
  
  // Título de la página
  doc.setTextColor(...primaryColor);
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text(userProfile?.type === 'business' ? 'ANÁLISIS DETALLADO' : 'TU SITUACIÓN ACTUAL', 15, yPos);
  yPos += 20;

  // Estado actual de seguridad
  doc.setTextColor(...darkGray);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text(userProfile?.type === 'business' ? '1. Estado Actual de Seguridad' : '1. ¿Qué tan seguro estás?', 15, yPos);
  yPos += 10;

  // Tabla de métricas
  const metricsTable = userProfile?.type === 'business' ? [
    ['Métrica', 'Valor', 'Evaluación'],
    ['Puntuación General', `${data.score}%`, data.score >= 85 ? 'Excelente' : data.score >= 70 ? 'Bueno' : data.score >= 50 ? 'Mejorable' : 'Crítico'],
    ['Nivel de Riesgo', data.level.toUpperCase(), data.urgency === 'critical' ? 'Acción Inmediata' : data.urgency === 'high' ? 'Prioritario' : data.urgency === 'medium' ? 'Moderado' : 'Bajo'],
    ['Tiempo de Implementación', data.timeToImplement, 'Recomendado'],
    ['Costo Estimado', data.estimatedCost, 'Inversión sugerida']
  ] : [
    ['Aspecto', 'Tu Situación', 'Estado'],
    ['Nivel de Protección', `${data.score}%`, data.score >= 85 ? 'Muy protegido' : data.score >= 70 ? 'Bien protegido' : data.score >= 50 ? 'Necesitas mejoras' : 'En riesgo'],
    ['Urgencia', data.level.toUpperCase(), data.urgency === 'critical' ? 'Actúa HOY' : data.urgency === 'high' ? 'Esta semana' : data.urgency === 'medium' ? 'Este mes' : 'Todo bien'],
    ['Tiempo necesario', data.timeToImplement, 'Para estar seguro'],
    ['Inversión recomendada', data.estimatedCost, 'Para protegerte']
  ];
  
  doc.autoTable({
    startY: yPos,
    head: [metricsTable[0]],
    body: metricsTable.slice(1),
    theme: 'grid',
    headStyles: { fillColor: primaryColor, textColor: [255, 255, 255], fontStyle: 'bold' },
    alternateRowStyles: { fillColor: lightGray },
    margin: { left: 15, right: 15 }
  });
  
  yPos = (doc as any).lastAutoTable.finalY + 20;
  
  // Análisis de impacto
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text(userProfile?.type === 'business' ? '2. Análisis de Impacto Empresarial' : '2. ¿Qué puede pasarte si no actúas?', 15, yPos);
  yPos += 10;

  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  
  // Personalizar el contenido de impacto para particulares
  const impactContent = userProfile?.type === 'business' 
    ? data.businessImpact 
    : getPersonalImpactText(data.urgency, data.score);
  
  const impactLines = doc.splitTextToSize(impactContent, pageWidth - 30);
  doc.text(impactLines, 15, yPos);
  yPos += impactLines.length * 6 + 15;

  // Nivel de urgencia
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text(userProfile?.type === 'business' ? '3. Priorización de Acciones' : '3. ¿Qué hacer AHORA?', 15, yPos);
  yPos += 10;
  
  const urgencyColor = data.urgency === 'critical' ? [239, 68, 68] : 
                      data.urgency === 'high' ? [249, 115, 22] :
                      data.urgency === 'medium' ? [234, 179, 8] : [34, 197, 94];
  
  doc.setFillColor(...urgencyColor);
  doc.rect(15, yPos, pageWidth - 30, 20, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  const urgencyText = userProfile?.type === 'business'
    ? (data.urgency === 'critical' ? 'URGENCIA CRÍTICA - ACCIÓN INMEDIATA (IMPACTO NEGOCIO)'
      : data.urgency === 'high' ? 'ALTA PRIORIDAD - 30 DÍAS (RIESGO OPERATIVO)'
      : data.urgency === 'medium' ? 'PRIORIDAD MEDIA - 90 DÍAS (MEJORA CONTINUA)'
      : 'MANTENIMIENTO - REVISIÓN ANUAL')
    : (data.urgency === 'critical' ? 'URGENCIA CRÍTICA - PROTEGE TUS CUENTAS Y DATOS YA'
      : data.urgency === 'high' ? 'ALTA PRIORIDAD - IMPLEMENTA EN 30 DÍAS'
      : data.urgency === 'medium' ? 'PRIORIDAD MEDIA - MEJORAS EN 90 DÍAS'
      : 'MANTENIMIENTO - BUENAS PRÁCTICAS ANUALES');
  doc.text(urgencyText, pageWidth / 2, yPos + 12, { align: 'center' });
  
  addFooter(2, 3);
  
  // PÁGINA 3: RECOMENDACIONES
  doc.addPage();
  addHeader();
  
  yPos = 40;
  
  doc.setTextColor(...primaryColor);
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text(userProfile?.type === 'business' ? 'PLAN DE ACCIÓN RECOMENDADO' : 'TU PLAN DE PROTECCIÓN PERSONAL', 15, yPos);
  yPos += 20;

  // Recomendaciones prioritarias
  doc.setTextColor(...darkGray);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text(userProfile?.type === 'business' ? 'Recomendaciones Específicas' : 'Pasos Simples para Protegerte', 15, yPos);
  yPos += 15;

  // Personalizar recomendaciones para particulares
  if (userProfile?.type !== 'business') {
    // Mostrar recomendaciones personalizadas con explicaciones simples
    const personalRecommendations = getPersonalRecommendations(data.urgency, data.score);
    
    personalRecommendations.forEach((rec, index) => {
      if (yPos > 250) {
        doc.addPage();
        addHeader();
        yPos = 40;
      }
      
      if (index % 2 === 0) {
        doc.setFillColor(...lightGray);
      } else {
        doc.setFillColor(255, 255, 255);
      }
      doc.rect(15, yPos - 5, pageWidth - 30, 25, 'F');
      
      doc.setTextColor(...primaryColor);
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text(`${index + 1}. ${rec.title}`, 20, yPos + 3);
      
      doc.setTextColor(...darkGray);
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      const descLines = doc.splitTextToSize(rec.description, pageWidth - 50);
      doc.text(descLines, 20, yPos + 10);
      
      doc.setTextColor(...secondaryColor);
      doc.setFontSize(9);
      doc.text(`Tiempo: ${rec.time} | Coste: ${rec.cost}`, pageWidth - 20, yPos + 18, { align: 'right' });
      
      yPos += 30;
    });
  } else {
    // Tabla de recomendaciones para empresas (código existente)
    const recommendationsData = data.recommendations.slice(0, 8).map((rec, index) => [
      `${index + 1}`,
      rec,
      data.urgency === 'critical' ? 'Inmediata' : data.urgency === 'high' ? '30 días' : '90 días'
    ]);

    if (recommendationsData.length > 0) {
      doc.autoTable({
        startY: yPos,
        head: [['#', 'Recomendación', 'Plazo']],
        body: recommendationsData,
        theme: 'grid',
        headStyles: { fillColor: primaryColor, textColor: [255, 255, 255], fontStyle: 'bold' },
        alternateRowStyles: { fillColor: lightGray },
        columnStyles: {
          0: { cellWidth: 15 },
          1: { cellWidth: 130 },
          2: { cellWidth: 25 }
        },
        margin: { left: 15, right: 15 }
      });
      
      yPos = (doc as any).lastAutoTable.finalY + 20;
    }
  }

  // Próximos pasos
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text(userProfile?.type === 'business' ? 'Próximos Pasos Recomendados' : 'Tu Lista de Tareas (¡Empieza Hoy!)', 15, yPos);
  yPos += 15;

  const nextSteps = userProfile?.type === 'business' ? [
    '1. Revisión detallada de este informe con su equipo directivo',
    '2. Priorización de recomendaciones según impacto y recursos disponibles',
    '3. Planificación de implementación con cronograma específico',
    '4. Contacto con especialistas para asistencia técnica si es necesario',
    '5. Programación de seguimiento y nueva evaluación en 6 meses'
  ] : getPersonalNextSteps(data.urgency);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  nextSteps.forEach(step => {
    const stepLines = doc.splitTextToSize(step, pageWidth - 30);
    doc.text(stepLines, 15, yPos);
    yPos += stepLines.length * 6 + 3;
  });
  
  // Información de contacto
  yPos += 15;
  doc.setFillColor(...primaryColor);
  doc.rect(15, yPos, pageWidth - 30, 40, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text(userProfile?.type === 'business' ? '¿Necesita Asistencia Especializada?' : '¿Necesitas ayuda para mejorar tu seguridad?', pageWidth / 2, yPos + 12, { align: 'center' });
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  if (userProfile?.type === 'business') {
    doc.text('Nuestro equipo de expertos está disponible para ayudarle', pageWidth / 2, yPos + 22, { align: 'center' });
    doc.text('a implementar estas recomendaciones de manera efectiva.', pageWidth / 2, yPos + 30, { align: 'center' });
  } else {
    doc.text('Podemos ayudarte a configurar 2FA, gestores de contraseñas y copias de seguridad', pageWidth / 2, yPos + 22, { align: 'center' });
    doc.text('para proteger tus cuentas y dispositivos personales.', pageWidth / 2, yPos + 30, { align: 'center' });
  }
  doc.text('Contacto: info@sesecpro.com | +34 900 000 000', pageWidth / 2, yPos + 36, { align: 'center' });
  
  addFooter(3, 3);
  
  return doc.output('blob');
};


function hasFamilyContext(content: HTMLElement): boolean {
  // Heurística sencilla: busca palabras clave en el HTML para inferir contexto familiar
  const text = content.textContent?.toLowerCase() || '';
  return /hijo|hija|menor|familia|control parental|parental control/.test(text);
}

function getAntiScamTips(): AntiScamTip[] {
  return [
    {
      platform: 'WhatsApp',
      warning: 'Desconfía de mensajes que piden códigos, urgencias de “familiar/amigo”, o enlaces a pagos.',
      tips: [
        'Nunca compartas códigos de verificación que te lleguen por SMS o App.',
        'Verifica por llamada si te piden dinero o datos.',
        'Desactiva vista previa de enlaces y revisa el remitente.'
      ]
    },
    {
      platform: 'Email',
      warning: 'Ojo con facturas falsas, avisos de “bloqueo de cuenta” y enlaces a “verificar identidad”.',
      tips: [
        'Comprueba el dominio real del remitente y no descargues adjuntos sospechosos.',
        'Nunca introduzcas contraseñas desde enlaces de correos; entra manualmente a la web oficial.',
        'Activa alertas de inicio de sesión en tus cuentas.'
      ]
    },
    {
      platform: 'Redes Sociales',
      warning: 'Cuidado con sorteos falsos, apps de filtros que piden permisos excesivos o enlaces acortados.',
      tips: [
        'Activa 2FA en Instagram, Facebook, TikTok y X.',
        'No compartas datos personales por mensajes privados.',
        'Revisa los permisos de apps conectadas a tus cuentas.'
      ]
    }
  ];
}

function getDeviceGuides(): DeviceGuide[] {
  return [
    {
      device: 'iPhone',
      twoFactorSteps: [
        'Ajustes > tu nombre > Contraseña y seguridad > Activar 2FA',
        'Elige app de autenticación (recomendado) o SMS',
        'Guarda códigos de recuperación en lugar seguro'
      ],
      passwordManagerSteps: [
        'Usa el llavero de iCloud o un gestor (1Password, Bitwarden)',
        'Crea contraseñas únicas y largas',
        'Activa autocompletar seguro'
      ],
      backupSteps: [
        'Ajustes > iCloud > Copia de seguridad > Activar',
        'Comprueba que incluya fotos, contactos y apps críticas',
        'Haz una copia local en ordenador de vez en cuando'
      ]
    },
    {
      device: 'Android',
      twoFactorSteps: [
        'Cuenta de Google > Seguridad > Verificación en dos pasos',
        'Usa Google Authenticator o app similar',
        'Guarda los códigos de respaldo'
      ],
      passwordManagerSteps: [
        'Usa Gestor de Google o un gestor dedicado',
        'Crea contraseñas únicas y largas',
        'Activa autocompletar seguro'
      ],
      backupSteps: [
        'Ajustes > Sistema > Copia de seguridad',
        'Incluye fotos (Google Fotos) y documentos importantes',
        'Verifica restauración en otro dispositivo de prueba'
      ]
    },
    {
      device: 'Windows',
      twoFactorSteps: [
        'Activa 2FA en cuentas Microsoft y servicios críticos',
        'Usa app de autenticación en lugar de SMS',
        'Guarda códigos de recuperación'
      ],
      passwordManagerSteps: [
        'Instala un gestor de contraseñas de confianza',
        'Habilita biometría (Windows Hello) con PIN',
        'Revisa contraseñas reutilizadas'
      ],
      backupSteps: [
        'Historial de archivos o copia en nube (OneDrive)',
        'Incluye documentos, fotos y escritorio',
        'Prueba restauración de un archivo'
      ]
    },
    {
      device: 'Mac',
      twoFactorSteps: [
        'Preferencias del Sistema > ID de Apple > Contraseña y seguridad > 2FA',
        'App de autenticación recomendada',
        'Guarda códigos de recuperación'
      ],
      passwordManagerSteps: [
        'Llaveros de iCloud o gestor dedicado',
        'Evita reutilización de contraseñas',
        'Autocompletar seguro en Safari/Chrome'
      ],
      backupSteps: [
        'Time Machine activado y probando restauración',
        'Copia adicional en nube (iCloud, OneDrive, Dropbox)',
        'Verificación mensual de copias'
      ]
    }
  ];
}

function drawQr(doc: jsPDF, x: number, y: number, size: number, url: string) {
  // Placeholder de QR: dibujar un cuadrado con la URL como texto. (Se puede integrar lib QR más adelante)
  doc.setDrawColor(0);
  doc.rect(x, y, size, size);
  doc.setFontSize(7);
  const lines = doc.splitTextToSize(url, size - 4);
  doc.text(lines, x + 2, y + size / 2, { align: 'left' });
}

// Integración en página 3 para particulares: sección familiar, antiestafas, guías por dispositivo y QR
// Añadir justo antes de addFooter(3, 3);
if (userProfile?.type !== 'business') {
  // Ajustar yPos si es necesario
  if (yPos > 200) {
    doc.addPage();
    addHeader();
    yPos = 40;
  }

  // Sección: Perfil familiar y control parental
  if (hasFamilyContext(content)) {
    doc.setTextColor(...primaryColor);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.text('Protección Familiar y Control Parental', 15, yPos);
    yPos += 8;

    doc.setTextColor(...darkGray);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    const famLines = doc.splitTextToSize(
      'Si convives con menores, activa controles parentales en sus dispositivos, limita el tiempo de pantalla, bloquea compras sin permiso y revisa las apps instaladas. Habla con ellos sobre privacidad, contraseñas y cómo detectar estafas.',
      pageWidth - 30
    );
    doc.text(famLines, 15, yPos);
    yPos += famLines.length * 6 + 6;

    const bullets = [
      'Crea cuentas infantiles y perfiles con edad adecuada',
      'En App Store/Play Store, restringe compras y descargas',
      'Activa filtros de contenido y tiempo de uso',
      'Revisa historial y permisos de apps periódicamente'
    ];
    bullets.forEach(b => {
      const l = doc.splitTextToSize(`- ${b}`, pageWidth - 35);
      doc.text(l, 20, yPos);
      yPos += l.length * 6 + 2;
    });

    yPos += 6;
  }

  // Sección: Consejos antiestafas por plataforma
  doc.setTextColor(...primaryColor);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text('Consejos Antiestafas (WhatsApp, Email y Redes)', 15, yPos);
  yPos += 8;

  const tips = getAntiScamTips();
  tips.forEach(t => {
    if (yPos > 250) {
      doc.addPage();
      addHeader();
      yPos = 40;
    }
    doc.setTextColor(...secondaryColor);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.text(t.platform, 15, yPos);
    yPos += 6;

    doc.setTextColor(...darkGray);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    const w = doc.splitTextToSize(`Alerta: ${t.warning}`, pageWidth - 30);
    doc.text(w, 15, yPos);
    yPos += w.length * 6 + 2;

    t.tips.forEach(item => {
      const li = doc.splitTextToSize(`- ${item}`, pageWidth - 35);
      doc.text(li, 20, yPos);
      yPos += li.length * 6 + 1;
    });
    yPos += 4;
  });

  // Guía rápida por dispositivo
  doc.setTextColor(...primaryColor);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text('Guía Rápida por Dispositivo', 15, yPos);
  yPos += 8;

  const guides = getDeviceGuides();
  guides.forEach(g => {
    if (yPos > 240) {
      doc.addPage();
      addHeader();
      yPos = 40;
    }
    doc.setTextColor(...secondaryColor);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.text(g.device, 15, yPos);
    yPos += 6;

    doc.setTextColor(...darkGray);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    const blocks = [
      { title: '2FA', lines: g.twoFactorSteps },
      { title: 'Gestor de contraseñas', lines: g.passwordManagerSteps },
      { title: 'Copias de seguridad', lines: g.backupSteps },
    ];
    blocks.forEach(b => {
      const h = doc.splitTextToSize(`${b.title}:`, pageWidth - 30);
      doc.text(h, 15, yPos);
      yPos += h.length * 6;
      b.lines.forEach(step => {
        const l = doc.splitTextToSize(`- ${step}`, pageWidth - 35);
        doc.text(l, 20, yPos);
        yPos += l.length * 6 + 1;
      });
      yPos += 2;
    });
    yPos += 4;
  });

  // Enlaces y QR a guías paso a paso
  if (yPos > 220) {
    doc.addPage();
    addHeader();
    yPos = 40;
  }
  doc.setTextColor(...primaryColor);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text('Guías Paso a Paso (2FA, Gestores y Copias)', 15, yPos);
  yPos += 8;

  doc.setTextColor(...darkGray);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  const resources = [
    { label: 'Guía 2FA', url: 'https://sesecpro.com/guia/2fa' },
    { label: 'Guía Gestor de Contraseñas', url: 'https://sesecpro.com/guia/gestor' },
    { label: 'Guía Copias de Seguridad', url: 'https://sesecpro.com/guia/copias' },
  ];
  const startX = 15;
  let qrX = startX;
  const qrSize = 26;
  resources.forEach((r, i) => {
    if (qrX + qrSize > pageWidth - 15) {
      qrX = startX;
      yPos += qrSize + 10;
    }
    drawQr(doc, qrX, yPos, qrSize, r.url);
    doc.text(r.label, qrX + qrSize / 2, yPos + qrSize + 5, { align: 'center' });
    qrX += qrSize + 10;
  });
  yPos += qrSize + 18;
}

// ... existing code ...
