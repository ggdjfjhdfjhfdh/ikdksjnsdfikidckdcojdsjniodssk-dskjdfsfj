'use client';
import { Shield, Lock, Eye, Code2, AlertTriangle, BookOpen, Key, Binoculars, RotateCw } from 'lucide-react';
import { CheckCircleIcon, ArrowRightIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useI18n } from '@/lib/LanguageContext';

export default function SolutionsPage() {
  const { t } = useI18n();

  const serviceTiers = [
    {
      title: t('solutionsSectionCoreTitle'),
      description: t('solutionsSectionCoreDesc'),
      services: [
        {
          icon: <Shield className="w-8 h-8 text-white" />,
          title: t('solutionRiskTitle'),
          description: t('solutionRiskDesc'),
          benefits: [t('solutionRiskBenefit1'), t('solutionRiskBenefit2'), t('solutionRiskBenefit3')],
          contextTitle: t('solutionRiskContextTitle'),
          context: [t('solutionRiskContext1'), t('solutionRiskContext2'), t('solutionRiskContext3')],
          cta: 'Evaluar mi situación',
        },
        {
          icon: <Lock className="w-8 h-8 text-white" />,
          title: t('solutionConsultingTitle'),
          description: t('solutionConsultingDesc'),
          benefits: [t('solutionConsultingBenefit1'), t('solutionConsultingBenefit2'), t('solutionConsultingBenefit3')],
          contextTitle: t('solutionConsultingContextTitle'),
          context: [t('solutionConsultingContext1'), t('solutionConsultingContext2'), t('solutionConsultingContext3')],
          cta: 'Revisar mi cumplimiento',
        },
        {
          icon: <Eye className="w-8 h-8 text-white" />,
          title: t('solutionSOCTitle'),
          description: t('solutionSOCDesc'),
          benefits: [t('solutionSOCBenefit1'), t('solutionSOCBenefit2'), t('solutionSOCBenefit3')],
          contextTitle: t('solutionSOCContextTitle'),
          context: [t('solutionSOCContext1'), t('solutionSOCContext2'), t('solutionSOCContext3')],
          cta: 'Probar nuestro SOC',
        },
      ],
    },
    {
      title: t('solutionsSectionSpecializedTitle'),
      description: t('solutionsSectionSpecializedDesc'),
      services: [
        {
          icon: <Code2 className="w-8 h-8 text-white" />,
          title: t('solutionDevSecOpsTitle'),
          description: t('solutionDevSecOpsDesc'),
          benefits: [t('solutionDevSecOpsBenefit1'), t('solutionDevSecOpsBenefit2'), t('solutionDevSecOpsBenefit3')],
          contextTitle: t('solutionDevSecOpsContextTitle'),
          context: [t('solutionDevSecOpsContext1'), t('solutionDevSecOpsContext2'), t('solutionDevSecOpsContext3')],
          cta: 'Mejorar mi DevSecOps',
        },
        {
          icon: <AlertTriangle className="w-8 h-8 text-white" />,
          title: t('solutionCrisisTitle'),
          description: t('solutionCrisisDesc'),
          benefits: [t('solutionCrisisBenefit1'), t('solutionCrisisBenefit2'), t('solutionCrisisBenefit3')],
          contextTitle: t('solutionCrisisContextTitle'),
          context: [t('solutionCrisisContext1'), t('solutionCrisisContext2'), t('solutionCrisisContext3')],
          cta: 'Plan de respuesta',
        },
        {
          icon: <Key className="w-8 h-8 text-white" />,
          title: t('solutionIAMTitle'),
          description: t('solutionIAMDesc'),
          benefits: [t('solutionIAMBenefit1'), t('solutionIAMBenefit2'), t('solutionIAMBenefit3')],
          contextTitle: t('solutionIAMContextTitle'),
          context: [t('solutionIAMContext1'), t('solutionIAMContext2'), t('solutionIAMContext3')],
          cta: 'Gestionar accesos',
        },
      ],
    },
    {
      title: t('solutionsSectionComplementaryTitle'),
      description: t('solutionsSectionComplementaryDesc'),
      services: [
        {
          icon: <BookOpen className="w-8 h-8 text-white" />,
          title: t('solutionTrainingTitle'),
          description: t('solutionTrainingDesc'),
          benefits: [t('solutionTrainingBenefit1'), t('solutionTrainingBenefit2'), t('solutionTrainingBenefit3')],
          contextTitle: t('solutionTrainingContextTitle'),
          context: [t('solutionTrainingContext1'), t('solutionTrainingContext2'), t('solutionTrainingContext3')],
          cta: 'Formar a mi equipo',
        },
        {
          icon: <Binoculars className="w-8 h-8 text-white" />,
          title: t('solutionThreatIntelTitle'),
          description: t('solutionThreatIntelDesc'),
          benefits: [t('solutionThreatIntelBenefit1'), t('solutionThreatIntelBenefit2'), t('solutionThreatIntelBenefit3')],
          contextTitle: t('solutionThreatIntelContextTitle'),
          context: [t('solutionThreatIntelContext1'), t('solutionThreatIntelContext2'), t('solutionThreatIntelContext3')],
          cta: 'Analizar amenazas',
        },
        {
          icon: <RotateCw className="w-8 h-8 text-white" />,
          title: t('solutionBCDRTitle'),
          description: t('solutionBCDRDesc'),
          benefits: [t('solutionBCDRBenefit1'), t('solutionBCDRBenefit2'), t('solutionBCDRBenefit3')],
          contextTitle: t('solutionBCDRContextTitle'),
          context: [t('solutionBCDRContext1'), t('solutionBCDRContext2'), t('solutionBCDRContext3')],
          cta: 'Proteger mi negocio',
        },
      ],
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-40 pb-20 md:pt-48 md:pb-32 text-center overflow-hidden bg-gray-800 text-white">
        <Image
          src="/hero-cybersecurity.png"
          alt="Cybersecurity background for solutions section"
          fill
          className="object-cover z-0 opacity-30"
          priority
        />
        <div className="relative z-10 container mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-4">
            {t('solutionsTitle')}
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto text-gray-300">
            {t('solutionsHeroDescription')}
          </p>
        </div>
      </section>

      {/* Services Sections */}
      <div className="py-24 md:py-32 bg-gray-800 text-white">
        <div className="container mx-auto px-4 space-y-32">
          {serviceTiers.map((tier, tierIndex) => (
            <section key={tierIndex}>
              <div className="text-center max-w-4xl mx-auto mb-20">
                <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-white mb-6">
                  {tier.title}
                </h2>
                <p className="text-xl text-gray-400">{tier.description}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
                {tier.services.map((service, serviceIndex) => (
                  <motion.div
                    key={serviceIndex}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5, delay: serviceIndex * 0.1 }}
                    className="bg-gray-700/50 border border-gray-600 rounded-2xl p-8 flex flex-col hover:border-cyan-500/50 transition-colors duration-300"
                  >
                    <div className="flex items-center mb-5">
                      <div className="bg-gradient-to-br from-cyan-500 to-blue-600 p-3 rounded-lg mr-4">
                        {service.icon}
                      </div>
                      <h3 className="text-xl font-bold text-gray-100">{service.title}</h3>
                    </div>
                    <p className="text-gray-400 text-sm mb-8 flex-grow">{service.description}</p>
                    
                    <div className="text-sm space-y-4 mb-8">
                      <h4 className="font-semibold text-gray-200 mb-3">Beneficios Clave</h4>
                      {service.benefits.map((benefit, i) => (
                        <div key={i} className="flex items-start">
                          <CheckCircleIcon className="w-5 h-5 text-cyan-400 mr-3 mt-0.5 flex-shrink-0" />
                          <span>{benefit}</span>
                        </div>
                      ))}
                    </div>

                    <div className="text-sm space-y-4 bg-gray-800/70 p-5 rounded-lg mb-6">
                       <h4 className="font-semibold text-gray-200 mb-3">{service.contextTitle}</h4>
                       {service.context.map((ctx, i) => (
                        <div key={i} className="flex items-start">
                          <ArrowRightIcon className="w-4 h-4 text-gray-500 mr-3 mt-1 flex-shrink-0" />
                          <span className="text-gray-400">{ctx}</span>
                        </div>
                      ))}
                    </div>
                    <Link 
                      href="/contacto" 
                      className="mt-auto w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 transition-colors duration-200"
                    >
                      {service.cta}
                      <ArrowRightIcon className="ml-2 -mr-1 w-4 h-4" />
                    </Link>
                  </motion.div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </>
  );
}
