'use client';

import dynamic from 'next/dynamic';

const CyberRiskCalculator = dynamic(
  () => import('./CyberRiskCalculator'),
  { ssr: false }
);

export default CyberRiskCalculator;