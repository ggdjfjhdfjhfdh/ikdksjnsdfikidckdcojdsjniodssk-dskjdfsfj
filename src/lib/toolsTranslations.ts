export const toolsTranslations = {
  ES: {
    pageTitle: 'Herramientas de Seguridad',
    pageDescription: 'Utiliza nuestras herramientas gratuitas para evaluar y mejorar tu seguridad digital',
    backToResources: 'Volver a recursos',
    openTool: 'Abrir herramienta',
    footerSlogan1: 'Protección digital con tecnología de vanguardia.',
    footerSlogan2: 'Tu seguridad, nuestra prioridad.',
    legalNotice: 'Aviso Legal',
    privacyPolicy: 'Política de Privacidad',
    cookiePolicy: 'Política de Cookies',
    copyright: ' 2025 Se.Sec.Pro. Todos los derechos reservados.',
    exploreSolutions: 'Explorar soluciones',
    passwordChecker: {
      title: 'Comprobador de Contraseñas',
      description: 'Analiza la fortaleza de tus contraseñas y obtén recomendaciones inmediatas.'
    },
    securityQuiz: {
      title: 'Test de Conocimientos',
      description: 'Pon a prueba tus conocimientos en ciberseguridad y detecta áreas de mejora.'
    },
    riskCalculator: {
      title: 'Calculadora de Riesgo',
      description: 'Evalúa tu nivel de ciberseguridad y recibe un plan de mejoras priorizado.'
    }
  },
  EN: {
    pageTitle: 'Security Tools',
    pageDescription: 'Use our free tools to assess and improve your digital security',
    backToResources: 'Back to resources',
    openTool: 'Open tool',
    footerSlogan1: 'Digital protection with cutting-edge technology.',
    footerSlogan2: 'Your security, our priority.',
    legalNotice: 'Legal Notice',
    privacyPolicy: 'Privacy Policy',
    cookiePolicy: 'Cookie Policy',
    copyright: ' 2025 Se.Sec.Pro. All rights reserved.',
    exploreSolutions: 'Explore solutions',
    passwordChecker: {
      title: 'Password Checker',
      description: 'Analyze your password strength and get instant recommendations.'
    },
    securityQuiz: {
      title: 'Security Knowledge Quiz',
      description: 'Test your cybersecurity knowledge and spot improvement areas.'
    },
    riskCalculator: {
      title: 'Risk Calculator',
      description: 'Assess your cybersecurity posture and get a prioritized improvement plan.'
    }
  }
};

export type ToolsTranslationKey = keyof typeof toolsTranslations.ES;

export default toolsTranslations;
