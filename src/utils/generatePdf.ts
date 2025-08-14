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

export const generateGuidePdf = (title: string, content: HTMLElement) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.width;
  const pageHeight = doc.internal.pageSize.height;
  
  // Colores corporativos
  const primaryColor = [37, 99, 235]; // Blue-600
  const secondaryColor = [51, 65, 85]; // Slate-700
  const accentColor = [59, 130, 246]; // Blue-500
  const lightGray = [248, 250, 252]; // Slate-50
  const darkGray = [30, 41, 59]; // Slate-800
  
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
    doc.text('Informe de Evaluación de Ciberseguridad', pageWidth - 15, 16, { align: 'right' });
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
  doc.text('INFORME EJECUTIVO', pageWidth / 2, 95, { align: 'center' });
  
  doc.setFontSize(18);
  doc.setTextColor(...primaryColor);
  doc.text('Evaluación de Ciberseguridad', pageWidth / 2, 110, { align: 'center' });
  
  // Métricas principales en la portada
  const metricsY = 140;
  doc.setFillColor(...lightGray);
  doc.rect(30, metricsY, pageWidth - 60, 60, 'F');
  
  doc.setTextColor(...darkGray);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('RESUMEN EJECUTIVO', pageWidth / 2, metricsY + 15, { align: 'center' });
  
  // Score principal
  doc.setFontSize(36);
  doc.setTextColor(data.score >= 85 ? [34, 197, 94] : data.score >= 70 ? [234, 179, 8] : data.score >= 50 ? [249, 115, 22] : [239, 68, 68]);
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
  doc.setTextColor(146, 64, 14);
  doc.setFontSize(8);
  doc.text('CONFIDENCIAL: Este documento contiene información sensible sobre la seguridad', pageWidth / 2, 270, { align: 'center' });
  doc.text('de su organización. Distribución limitada a personal autorizado.', pageWidth / 2, 275, { align: 'center' });
  
  addFooter(1, 3);
  
  // PÁGINA 2: ANÁLISIS DETALLADO
  doc.addPage();
  addHeader();
  
  let yPos = 40;
  
  // Título de la página
  doc.setTextColor(...primaryColor);
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text('ANÁLISIS DETALLADO', 15, yPos);
  yPos += 20;
  
  // Estado actual de seguridad
  doc.setTextColor(...darkGray);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('1. Estado Actual de Seguridad', 15, yPos);
  yPos += 10;
  
  // Tabla de métricas
  const metricsTable = [
    ['Métrica', 'Valor', 'Evaluación'],
    ['Puntuación General', `${data.score}%`, data.score >= 85 ? 'Excelente' : data.score >= 70 ? 'Bueno' : data.score >= 50 ? 'Mejorable' : 'Crítico'],
    ['Nivel de Riesgo', data.level.toUpperCase(), data.urgency === 'critical' ? 'Acción Inmediata' : data.urgency === 'high' ? 'Prioritario' : data.urgency === 'medium' ? 'Moderado' : 'Bajo'],
    ['Tiempo de Implementación', data.timeToImplement, 'Recomendado'],
    ['Costo Estimado', data.estimatedCost, 'Inversión sugerida']
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
  doc.text('2. Análisis de Impacto Empresarial', 15, yPos);
  yPos += 10;
  
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  const impactLines = doc.splitTextToSize(data.businessImpact, pageWidth - 30);
  doc.text(impactLines, 15, yPos);
  yPos += impactLines.length * 6 + 15;
  
  // Nivel de urgencia
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('3. Priorización de Acciones', 15, yPos);
  yPos += 10;
  
  const urgencyColor = data.urgency === 'critical' ? [239, 68, 68] : 
                      data.urgency === 'high' ? [249, 115, 22] :
                      data.urgency === 'medium' ? [234, 179, 8] : [34, 197, 94];
  
  doc.setFillColor(...urgencyColor);
  doc.rect(15, yPos, pageWidth - 30, 20, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  const urgencyText = data.urgency === 'critical' ? 'URGENCIA CRÍTICA - ACCIÓN INMEDIATA' :
                     data.urgency === 'high' ? 'ALTA PRIORIDAD - ACCIÓN EN 30 DÍAS' :
                     data.urgency === 'medium' ? 'PRIORIDAD MEDIA - ACCIÓN EN 90 DÍAS' :
                     'MANTENIMIENTO - REVISIÓN ANUAL';
  doc.text(urgencyText, pageWidth / 2, yPos + 12, { align: 'center' });
  
  addFooter(2, 3);
  
  // PÁGINA 3: RECOMENDACIONES
  doc.addPage();
  addHeader();
  
  yPos = 40;
  
  doc.setTextColor(...primaryColor);
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text('PLAN DE ACCIÓN RECOMENDADO', 15, yPos);
  yPos += 20;
  
  // Recomendaciones prioritarias
  doc.setTextColor(...darkGray);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Recomendaciones Específicas', 15, yPos);
  yPos += 15;
  
  // Tabla de recomendaciones
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
  
  // Próximos pasos
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Próximos Pasos Recomendados', 15, yPos);
  yPos += 15;
  
  const nextSteps = [
    '1. Revisión detallada de este informe con su equipo directivo',
    '2. Priorización de recomendaciones según impacto y recursos disponibles',
    '3. Planificación de implementación con cronograma específico',
    '4. Contacto con especialistas para asistencia técnica si es necesario',
    '5. Programación de seguimiento y nueva evaluación en 6 meses'
  ];
  
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
  doc.text('¿Necesita Asistencia Especializada?', pageWidth / 2, yPos + 12, { align: 'center' });
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.text('Nuestro equipo de expertos está disponible para ayudarle', pageWidth / 2, yPos + 22, { align: 'center' });
  doc.text('a implementar estas recomendaciones de manera efectiva.', pageWidth / 2, yPos + 30, { align: 'center' });
  doc.text('Contacto: info@sesecpro.com | +34 900 000 000', pageWidth / 2, yPos + 36, { align: 'center' });
  
  addFooter(3, 3);
  
  return doc.output('blob');
};
