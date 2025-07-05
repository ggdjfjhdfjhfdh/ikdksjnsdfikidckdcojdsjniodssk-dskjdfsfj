'use client';
import React from 'react';
import { useI18n } from '@/lib/i18n';
import Image from 'next/image';
import { ClipboardDocumentCheckIcon, ShieldCheckIcon, ScaleIcon, LockOpenIcon, DocumentTextIcon, AcademicCapIcon, CpuChipIcon, DevicePhoneMobileIcon, KeyIcon, CloudIcon, ShieldExclamationIcon, CodeBracketIcon, EyeIcon, LockClosedIcon, ServerIcon, CogIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function AboutPage() {
  const { t } = useI18n();
  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[400px] flex items-center justify-center bg-gray-900">
        <Image
          src="/about-bg.png"
          alt="Background"
          fill
          className="object-cover object-center opacity-30"
          priority
        />
        <div className="relative z-10 w-full text-center px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Protegiendo el futuro digital
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto text-gray-200 font-light">
            Creemos que la ciberseguridad debe ser accesible, proactiva y adaptada
          </p>
        </div>
      </section>

      {/* Strategic Tree Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Modelo Integral de Ciberseguridad
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Un enfoque estratégico multicapa para proteger todos los aspectos de su negocio
            </p>
          </div>

          {/* Core Pillar */}
          <div className="flex justify-center mb-16">
            <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-200 w-full max-w-2xl text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShieldCheckIcon className="w-10 h-10 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Ciberseguridad Integral</h3>
              <p className="text-gray-600">
                Protección holística desde la gobernanza hasta la ejecución técnica
              </p>
            </div>
          </div>

          {/* Four Main Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {[
              {
                title: 'Gobierno Estratégico',
                desc: 'Políticas, gestión de riesgos y marco normativo',
                icon: <ScaleIcon className="w-8 h-8 text-blue-600" />
              },
              {
                title: 'Defensa Proactiva',
                desc: 'Monitoreo continuo y protección perimetral',
                icon: <ShieldCheckIcon className="w-8 h-8 text-blue-600" />
              },
              {
                title: 'Cumplimiento & Riesgo',
                desc: 'Auditorías, GDPR/ISO 27001 y controles',
                icon: <DocumentTextIcon className="w-8 h-8 text-blue-600" />
              },
              {
                title: 'Seguridad Ofensiva',
                desc: 'Pentesting avanzado y hardening de sistemas',
                icon: <LockOpenIcon className="w-8 h-8 text-blue-600" />
              }
            ].map((pillar, i) => (
              <div 
                key={i}
                className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm h-full"
              >
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-4 shadow-sm mx-auto">
                  {pillar.icon}
                </div>
                <h3 className="text-xl font-semibold text-center text-gray-900 mb-2">{pillar.title}</h3>
                <p className="text-gray-600 text-center text-sm">{pillar.desc}</p>
              </div>
            ))}
          </div>

          {/* Implementation Layer */}
          <div className="mt-12">
            <div className="text-center mb-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Nuestro Stack Tecnológico
              </h3>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Soluciones especializadas para cada capa de seguridad
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Training Card - Highlighted */}
              <div className="bg-white p-6 rounded-xl border-2 border-blue-200 shadow-sm col-span-1 md:col-span-2">
                <div className="flex items-start">
                  <div className="w-14 h-14 bg-blue-50 rounded-lg flex items-center justify-center mr-4 shadow-sm flex-shrink-0">
                    <AcademicCapIcon className="w-8 h-8 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2 text-lg">Formación en Ciberseguridad</h4>
                    <p className="text-sm text-gray-600 mb-3">Programas de concienciación y capacitación técnica</p>
                    <ul className="text-xs text-gray-700 space-y-1 pl-4 list-disc">
                      <li>Simulaciones de phishing personalizadas</li>
                      <li>Talleres prácticos para equipos</li>
                      <li>Certificaciones especializadas</li>
                      <li>Programas continuos de actualización</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Technical Solutions */}
              {[
                { 
                  title: 'SIEM/SOAR', 
                  desc: 'Monitorización inteligente de amenazas',
                  icon: <CpuChipIcon className="w-8 h-8 text-blue-600" />,
                  link: '/wiki/siem-soar'
                },
                { 
                  title: 'EDR/XDR', 
                  desc: 'Protección endpoints avanzada',
                  icon: <DevicePhoneMobileIcon className="w-8 h-8 text-blue-600" />,
                  link: '/wiki/edr-xdr'
                },
                { 
                  title: 'IAM/PAM', 
                  desc: 'Gestión de identidades y accesos',
                  icon: <KeyIcon className="w-8 h-8 text-blue-600" />,
                  link: '/wiki/iam-pam'
                },
                { 
                  title: 'Cloud Security', 
                  desc: 'Protección entornos cloud',
                  icon: <CloudIcon className="w-8 h-8 text-blue-600" />,
                  link: '/wiki/cloud-security'
                },
                { 
                  title: 'BCP/DRP', 
                  desc: 'Continuidad del negocio',
                  icon: <ShieldExclamationIcon className="w-8 h-8 text-blue-600" />,
                  link: '/wiki/bcp-drp'
                },
                { 
                  title: 'DevSecOps', 
                  desc: 'Seguridad en desarrollo',
                  icon: <CodeBracketIcon className="w-8 h-8 text-blue-600" />,
                  link: '/wiki/devsecops'
                },
                { 
                  title: 'Threat Intel', 
                  desc: 'Inteligencia de amenazas',
                  icon: <EyeIcon className="w-8 h-8 text-blue-600" />,
                  link: '/wiki/threat-intelligence'
                }
              ].map((item, i) => (
                <Link key={i} href={item.link} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all">
                  <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-4 shadow-sm">
                    {item.icon}
                  </div>
                  <h4 className="font-bold text-gray-900 mb-2">{item.title}</h4>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Certificaciones y Estándares</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Cumplimos con los más altos estándares internacionales de seguridad y calidad
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: 'ISO 27001',
                description: 'Gestión de seguridad de la información',
                link: 'https://www.iso.org/standard/54534.html',
                icon: <ShieldCheckIcon className="w-10 h-10 text-blue-600" />
              },
              {
                name: 'ISO 9001',
                description: 'Sistema de gestión de calidad',
                link: 'https://www.iso.org/standard/62085.html',
                icon: <ClipboardDocumentCheckIcon className="w-10 h-10 text-blue-600" />
              },
              {
                name: 'GDPR',
                description: 'Reglamento General de Protección de Datos',
                link: 'https://gdpr-info.eu',
                icon: <LockClosedIcon className="w-10 h-10 text-blue-600" />
              },
              {
                name: 'SOC 2',
                description: 'Controles de seguridad, disponibilidad y confidencialidad',
                link: 'https://www.aicpa.org/soc2',
                icon: <ServerIcon className="w-10 h-10 text-blue-600" />
              },
              {
                name: 'NIST CSF',
                description: 'Marco de ciberseguridad del NIST',
                link: 'https://www.nist.gov/cyberframework',
                icon: <CogIcon className="w-10 h-10 text-blue-600" />
              },
              {
                name: 'CIS Controls',
                description: 'Controles críticos de seguridad',
                link: 'https://www.cisecurity.org/controls',
                icon: <ShieldExclamationIcon className="w-10 h-10 text-blue-600" />
              }
            ].map((cert, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-all">
                <div className="flex items-start mb-4">
                  <div className="bg-blue-50 p-3 rounded-lg mr-4">
                    {cert.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{cert.name}</h3>
                    <p className="text-gray-600 mt-1">{cert.description}</p>
                  </div>
                </div>
                <Link 
                  href={cert.link} 
                  className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium mt-4"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Ver estándar <ArrowTopRightOnSquareIcon className="w-4 h-4 ml-1" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="py-20 bg-blue-50">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-blue-800">¿Listo para proteger tu negocio?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Nuestros expertos están disponibles para evaluar tus necesidades de seguridad
          </p>
          <a 
            href="/contact" 
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-lg transition-colors duration-200"
          >
            Contacta con nosotros
          </a>
        </div>
      </section>
    </>
  );
}
