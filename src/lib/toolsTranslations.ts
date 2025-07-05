export const toolsTranslations = {
  ES: {
    pageTitle: 'Herramientas de Seguridad',
    pageDescription: 'Utiliza nuestras herramientas gratuitas para evaluar y mejorar tu seguridad digital',
    backToResources: 'Volver a recursos',
    footerSlogan1: 'Protección digital con tecnología de vanguardia.',
    footerSlogan2: 'Tu seguridad, nuestra prioridad.',
    legalNotice: 'Aviso Legal',
    privacyPolicy: 'Política de Privacidad',
    cookiePolicy: 'Política de Cookies',
    copyright: ' 2025 Se.Sec.Pro. Todos los derechos reservados.',
    exploreSolutions: 'Explorar soluciones',
    passwordChecker: {
      title: 'Comprobador de Contraseñas',
      description: 'Comprueba la fortaleza de tus contraseñas al instante'
    },
    securityQuiz: {
      title: 'Test de Conocimientos',
      description: 'Evalúa tu conocimiento en ciberseguridad'
    }
  },
  EN: {
    pageTitle: 'Security Tools',
    pageDescription: 'Use our free tools to assess and improve your digital security',
    backToResources: 'Back to resources',
    footerSlogan1: 'Digital protection with cutting-edge technology.',
    footerSlogan2: 'Your security, our priority.',
    legalNotice: 'Legal Notice',
    privacyPolicy: 'Privacy Policy',
    cookiePolicy: 'Cookie Policy',
    copyright: ' 2025 Se.Sec.Pro. All rights reserved.',
    exploreSolutions: 'Explore solutions',
    passwordChecker: {
      title: 'Password Checker',
      description: 'Check your password strength instantly'
    },
    securityQuiz: {
      title: 'Security Knowledge Quiz',
      description: 'Test your cybersecurity knowledge'
    }
  }
};

export type ToolsTranslationKey = keyof typeof toolsTranslations.ES;

export default toolsTranslations;
