const translations = {
  ES: {
    common: {
      currentLanguage: 'ES',
      purpose: 'Propósito',
      solutions: 'Soluciones',
      links: 'Enlaces',
      news: 'Noticias',
      resources: 'Recursos',
      all: 'Todos',
      filterByDate: 'Filtrar por fecha',
      navAbout: 'Nosotros',
      navSolutions: 'Soluciones',
      navResources: 'Recursos',
      navContact: 'Contacto',
      navPurpose: 'Propósito',
      menu: 'Menú',
      closeMenu: 'Cerrar menú',
      contactNow: 'Contactar Ahora',
      // Recursos
      resourcesTitle: 'Centro de Recursos',
      resourcesSubtitle: 'Conocimiento y herramientas para fortalecer tu ciberseguridad',
      resourcesCategoriesGuiasTitle: 'Guías de Seguridad',
      resourcesCategoriesGuiasDescription: 'Documentación completa y mejores prácticas',
      resourcesCategoriesWikiTitle: 'Base de Conocimiento',
      resourcesCategoriesWikiDescription: 'Artículos técnicos y conceptos fundamentales',
      resourcesCategoriesHerramientasTitle: 'Herramientas Gratuitas',
      resourcesCategoriesHerramientasDescription: 'Utilidades para evaluar y mejorar tu seguridad',
      exploreResources: 'Explorar',
      resourcesNotFound: '¿No encuentras lo que buscas?',
      resourcesNotFoundDesc: 'Nuestro equipo está aquí para ayudarte con recursos personalizados y consultoría especializada.',
      contactExperts: 'Contactar Expertos',
      // Footer
      footerSlogan1: 'Protegiendo el futuro digital',
      footerSlogan2: 'de tu empresa',
    },
    about: {
      hero: {
        alt: 'Se.Sec.Pro',
        title: 'Protección digital con tecnología de última generación',
        subtitle: 'Tu seguridad, nuestra prioridad',
      },
      model: {
        title: 'Nuestro Modelo de Seguridad',
        subtitle: 'Un enfoque integral de ciberseguridad',
        core: {
          title: 'Principios Fundamentales',
          description: 'Nuestros conceptos de seguridad básicos',
        },
        pillars: {
          governance: {
            title: 'Gobernanza',
            description: 'Gestión estratégica de seguridad',
          },
          defense: {
            title: 'Defensa Proactiva',
            description: 'Sistemas de protección avanzados',
          },
          compliance: {
            title: 'Cumplimiento Normativo',
            description: 'Aseguramiento de regulaciones y estándares',
          },
          offense: {
            title: 'Operaciones Ofensivas',
            description: 'Pruebas de penetración y threat hunting',
          },
        },
      },
      implementation: {
        title: 'Implementación',
        subtitle: 'Nuestro enfoque práctico',
        training: {
          title: 'Programas de Capacitación',
          description: 'Formación especializada para equipos',
          list: {
            item1: 'Talleres prácticos',
            item2: 'Simulaciones de incidentes',
            item3: 'Cursos certificados',
            item4: 'Sesiones personalizadas',
          },
        },
        solutions: {
          siem: {
            title: 'SIEM',
            description: 'Gestión centralizada de eventos de seguridad',
          },
          edr: {
            title: 'EDR',
            description: 'Detección y respuesta en endpoints',
          },
          iam: {
            title: 'Gestión de Identidades',
            description: 'Control de acceso y autenticación',
          },
          cloud: {
            title: 'Seguridad en la Nube',
            description: 'Protección para entornos cloud',
          },
          bcp: {
            title: 'Continuidad de Negocio',
            description: 'Planes de recuperación ante desastres',
          },
          devsecops: {
            title: 'DevSecOps',
            description: 'Seguridad integrada en desarrollo',
          },
          threatintel: {
            title: 'Inteligencia de Amenazas',
            description: 'Análisis predictivo de riesgos',
          },
        },
      },
      certifications: {
        title: 'Certificaciones',
        subtitle: 'Estándares que respaldan nuestro trabajo',
        iso27001: {
          title: 'ISO 27001',
          description: 'Gestión de seguridad de la información',
        },
        iso9001: {
          title: 'ISO 9001',
          description: 'Gestión de calidad',
        },
        gdpr: {
          title: 'GDPR',
          description: 'Protección de datos personales',
        },
        soc2: {
          title: 'SOC 2',
          description: 'Seguridad, disponibilidad y confidencialidad',
        },
        nist: {
          title: 'NIST',
          description: 'Marco de ciberseguridad',
        },
        cis: {
          title: 'CIS Controls',
          description: 'Controles de seguridad críticos',
        },
        view: 'Ver certificado',
      },
      contact: {
        title: 'Contacto',
        subtitle: '¿Listo para mejorar tu seguridad?',
        button: 'Contáctanos',
      },
    },
    home: {
      heroTitle1: 'Ciberseguridad Empresarial',
      heroTitle2: 'de Nueva Generación',
      heroDescription: 'Soluciones integrales de ciberseguridad diseñadas para empresas modernas. Protección 24/7, respuesta inmediata y tecnología de vanguardia.',
      askUs: 'Consúltanos',
      learnMore: 'Conoce más',
      whySesecproTitle: '¿Por qué elegir SESECPRO?',
      whySesecproPoint1Title: 'Experiencia Comprobada',
      whySesecproPoint1Desc: 'Más de 500 empresas protegidas con 10+ años de experiencia en ciberseguridad empresarial',
      whySesecproPoint2Title: 'Tecnología de Vanguardia',
      whySesecproPoint2Desc: 'IA, Machine Learning y arquitectura Zero Trust para protección proactiva',
      whySesecproPoint3Title: 'Respuesta Garantizada',
      whySesecproPoint3Desc: 'SOC 24/7/365 con respuesta garantizada en menos de 15 minutos',
      solutionsTitle: 'Nuestras Soluciones',
      solutionsDescription: 'Protección integral adaptada a las necesidades de tu organización',
      solution1Title: 'Auditoría y Consultoría',
      solution1Description: 'Evaluación de riesgos en 48h, roadmap personalizado y cumplimiento normativo',
      solution2Title: 'SOC as a Service',
      solution2Description: 'Monitoreo 24/7/365, Threat Intelligence y respuesta automatizada',
      solution3Title: 'Incident Response',
      solution3Description: 'Equipo especializado, contención en <1 hora y análisis forense completo',
      exploreSolutions: 'Explorar Soluciones',
      riskCalculatorTitle: '¿Qué tan segura está tu empresa?',
      riskCalculatorSubtitle: 'Evaluación Gratuita de Ciberseguridad',
      riskCalculatorDescription: 'Descubre tu nivel de exposición a ciberataques en solo 5 minutos. Evaluamos 18 aspectos críticos y te proporcionamos un plan de acción personalizado para fortalecer tu seguridad.',
      riskCalculatorButton: 'Evaluar Ahora Gratis',
      riskCalculatorFeatures: '✓ Sin registro requerido • ✓ Resultados inmediatos • ✓ 100% confidencial',
      riskCalculatorAspects: '18 Aspectos Evaluados',
      riskCalculatorTime: '5 Minutos',
      riskCalculatorPersonalized: 'Plan Personalizado',
      ctaTitle: 'Protege tu Empresa Hoy',
      ctaSubtitle: 'Contáctanos hoy y descubre cómo podemos fortalecer tu ciberseguridad',
      ctaButton: 'Comenzar ahora'
    }
  },
  EN: {
    common: {
      currentLanguage: 'EN',
      purpose: 'Purpose',
      solutions: 'Solutions',
      links: 'Links',
      news: 'News',
      resources: 'Resources',
      all: 'All',
      filterByDate: 'Filter by date',
      navAbout: 'About',
      navSolutions: 'Solutions',
      navResources: 'Resources',
      navContact: 'Contact',
      navPurpose: 'Purpose',
      menu: 'Menu',
      closeMenu: 'Close menu',
      contactNow: 'Contact Now',
      // Resources
      resourcesTitle: 'Resource Center',
      resourcesSubtitle: 'Knowledge and tools to strengthen your cybersecurity',
      resourcesCategoriesGuiasTitle: 'Security Guides',
      resourcesCategoriesGuiasDescription: 'Complete documentation and best practices',
      resourcesCategoriesWikiTitle: 'Knowledge Base',
      resourcesCategoriesWikiDescription: 'Technical articles and fundamental concepts',
      resourcesCategoriesHerramientasTitle: 'Free Tools',
      resourcesCategoriesHerramientasDescription: 'Utilities to assess and improve your security',
      exploreResources: 'Explore',
      resourcesNotFound: 'Can\'t find what you\'re looking for?',
      resourcesNotFoundDesc: 'Our team is here to help you with personalized resources and specialized consulting.',
      contactExperts: 'Contact Experts',
      // Footer
      footerSlogan1: 'Protecting the digital future',
      footerSlogan2: 'of your business',
    },
    about: {
      hero: {
        alt: 'Se.Sec.Pro',
        title: 'Digital protection with cutting-edge technology',
        subtitle: 'Your security, our priority',
      },
      model: {
        title: 'Our Security Model',
        subtitle: 'A comprehensive cybersecurity approach',
        core: {
          title: 'Core Principles',
          description: 'Our fundamental security concepts',
        },
        pillars: {
          governance: {
            title: 'Governance',
            description: 'Strategic security management',
          },
          defense: {
            title: 'Proactive Defense',
            description: 'Advanced protection systems',
          },
          compliance: {
            title: 'Regulatory Compliance',
            description: 'Ensuring regulations and standards',
          },
          offense: {
            title: 'Offensive Operations',
            description: 'Penetration testing and threat hunting',
          },
        },
      },
      implementation: {
        title: 'Implementation',
        subtitle: 'Our practical approach',
        training: {
          title: 'Training Programs',
          description: 'Specialized training for teams',
          list: {
            item1: 'Practical workshops',
            item2: 'Incident simulations',
            item3: 'Certified courses',
            item4: 'Personalized sessions',
          },
        },
        solutions: {
          siem: {
            title: 'SIEM',
            description: 'Centralized security event management',
          },
          edr: {
            title: 'EDR',
            description: 'Endpoint detection and response',
          },
          iam: {
            title: 'Identity Management',
            description: 'Access control and authentication',
          },
          cloud: {
            title: 'Cloud Security',
            description: 'Protection for cloud environments',
          },
          bcp: {
            title: 'Business Continuity',
            description: 'Disaster recovery plans',
          },
          devsecops: {
            title: 'DevSecOps',
            description: 'Integrated security in development',
          },
          threatintel: {
            title: 'Threat Intelligence',
            description: 'Predictive risk analysis',
          },
        },
      },
      certifications: {
        title: 'Certifications',
        subtitle: 'Standards that support our work',
        iso27001: {
          title: 'ISO 27001',
          description: 'Information security management',
        },
        iso9001: {
          title: 'ISO 9001',
          description: 'Quality management',
        },
        gdpr: {
          title: 'GDPR',
          description: 'Personal data protection',
        },
        soc2: {
          title: 'SOC 2',
          description: 'Security, availability and confidentiality',
        },
        nist: {
          title: 'NIST',
          description: 'Cybersecurity framework',
        },
        cis: {
          title: 'CIS Controls',
          description: 'Critical security controls',
        },
        view: 'View certificate',
      },
      contact: {
        title: 'Contact',
        subtitle: 'Ready to improve your security?',
        button: 'Contact us',
      },
    },
    home: {
      heroTitle1: 'Next-Generation',
      heroTitle2: 'Enterprise Cybersecurity',
      heroDescription: 'Comprehensive cybersecurity solutions designed for modern enterprises. 24/7 protection, immediate response, and cutting-edge technology.',
      askUs: 'Contact Us',
      learnMore: 'Learn More',
      whySesecproTitle: 'Why choose SESECPRO?',
      whySesecproPoint1Title: 'Proven Experience',
      whySesecproPoint1Desc: '500+ companies protected with 10+ years of enterprise cybersecurity experience',
      whySesecproPoint2Title: 'Cutting-Edge Technology',
      whySesecproPoint2Desc: 'AI, Machine Learning, and Zero Trust architecture for proactive protection',
      whySesecproPoint3Title: 'Guaranteed Response',
      whySesecproPoint3Desc: '24/7/365 SOC with guaranteed response in under 15 minutes',
      solutionsTitle: 'Our Solutions',
      solutionsDescription: 'Comprehensive protection tailored to your organization\'s needs',
      solution1Title: 'Audit & Consulting',
      solution1Description: '48h risk assessment, personalized roadmap, and regulatory compliance',
      solution2Title: 'SOC as a Service',
      solution2Description: '24/7/365 monitoring, Threat Intelligence, and automated response',
      solution3Title: 'Incident Response',
      solution3Description: 'Specialized team, <1 hour containment, and complete forensic analysis',
      exploreSolutions: 'Explore Solutions',
      riskCalculatorTitle: 'How secure is your company?',
      riskCalculatorSubtitle: 'Free Cybersecurity Assessment',
      riskCalculatorDescription: 'Discover your exposure level to cyberattacks in just 5 minutes. We evaluate 18 critical aspects and provide you with a personalized action plan to strengthen your security.',
      riskCalculatorButton: 'Assess Now for Free',
      riskCalculatorFeatures: '✓ No registration required • ✓ Immediate results • ✓ 100% confidential',
      riskCalculatorAspects: '18 Aspects Evaluated',
      riskCalculatorTime: '5 Minutes',
      riskCalculatorPersonalized: 'Personalized Plan',
      ctaTitle: 'Protect Your Business Today',
      ctaSubtitle: 'Contact us today and discover how we can strengthen your cybersecurity',
      ctaButton: 'Get Started Now'
    }
  }
};

export default translations;
