import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

export const generateGuidePdf = (title: string, content: HTMLElement) => {
  const doc = new jsPDF();
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  
  // Add title
  doc.setFontSize(20);
  doc.text(title, 15, 20);
  
  // Add content
  const data = Array.from(content.querySelectorAll('p, h2, h3')).map(el => ({
    type: el.tagName.toLowerCase(),
    text: el.textContent || ''
  }));
  
  let yPos = 30;
  data.forEach(item => {
    if (item.type === 'h2') {
      doc.setFontSize(16);
      doc.setTextColor(0, 0, 255);
      yPos += 10;
      doc.text(item.text, 15, yPos);
      yPos += 10;
    } else if (item.type === 'h3') {
      doc.setFontSize(14);
      doc.setTextColor(0, 0, 200);
      yPos += 8;
      doc.text(item.text, 15, yPos);
      yPos += 8;
    } else {
      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0);
      const lines = doc.splitTextToSize(item.text, 180);
      doc.text(lines, 15, yPos);
      yPos += lines.length * 7;
    }
    
    if (yPos > 280) {
      // Add page number before creating new page
      doc.text(`Página ${doc.getNumberOfPages()}`, doc.internal.pageSize.width - 20, doc.internal.pageSize.height - 10);
      doc.addPage();
      yPos = 20;
    }
  });
  
  // Add final page number
  doc.text(`Página ${doc.getNumberOfPages()}`, doc.internal.pageSize.width - 20, doc.internal.pageSize.height - 10);
  
  return doc.output('blob');
};
