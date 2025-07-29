import React from 'react';
import CyberRiskCalculator from '../../../../components/CyberRiskCalculator';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Calculadora de Riesgo de Ciberseguridad | SESECPRO',
  description: 'Evalúe el nivel de ciberseguridad de su organización con nuestra calculadora gratuita. Reciba recomendaciones personalizadas para mejorar su protección contra ciberataques.',
  keywords: 'calculadora ciberseguridad, evaluación riesgo cyber, audit seguridad, protección empresarial',
  openGraph: {
    title: 'Calculadora de Riesgo de Ciberseguridad | SESECPRO',
    description: 'Evalúe gratuitamente el nivel de ciberseguridad de su empresa y reciba recomendaciones personalizadas.',
    type: 'website',
  },
};

const CalculadoraRiesgoPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <CyberRiskCalculator />
      </div>
    </div>
  );
};

export default CalculadoraRiesgoPage;