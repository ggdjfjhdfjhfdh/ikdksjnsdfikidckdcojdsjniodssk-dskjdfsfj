"use client";

import { useRef } from 'react';
import { generateGuidePdf } from '@/utils/generatePdf';

interface PdfGeneratorProps {
  id?: string;
}

export default function PdfGenerator({ id }: PdfGeneratorProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  const handleDownload = () => {
    if (!contentRef.current) return;
    
    const pdfBlob = generateGuidePdf('Guía de Gestión de Copias de Seguridad', contentRef.current);
    const url = URL.createObjectURL(pdfBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'guia-gestion-copias-seguridad.pdf';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div ref={contentRef} id={id}>
      {/* Content to be included in PDF */}
    </div>
  );
}
