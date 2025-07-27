import { TranslationKey } from './i18n/index';

export const contactTranslations = {
  ES: {
    pageTitle: 'Contacto - Sesecpro',
    pageDescription: 'Contacta con nuestro equipo de expertos en ciberseguridad',
    contactHeroAlt: 'Contacta con nuestro equipo',
    title: 'Contacta con nuestro equipo',
    subtitle: '¿Listo para fortalecer tu seguridad digital? Nuestros expertos están preparados para ayudarte.',
    formTitle: 'Envíanos un mensaje',
    nameLabel: 'Nombre completo',
    namePlaceholder: 'Ana García López',
    emailLabel: 'Email',
    emailPlaceholder: 'ana@email.com',
    subjectLabel: 'Asunto',
    subjectPlaceholder: 'Consulta sobre servicios de ciberseguridad',
    messageLabel: 'Mensaje',
    messagePlaceholder: 'Describe tu consulta en detalle...',
    submitButton: 'Enviar mensaje',
    directEmailTitle: 'Correo electrónico',
    directEmailText: '¿Prefieres escribirnos directamente? Haz clic en el email y te respondemos rápido.',
    directEmailAddress: 'contacto@sesecpro.es',
    validation: {
      nameRequired: 'Por favor ingresa tu nombre',
      emailRequired: 'Por favor ingresa tu email',
      emailInvalid: 'Email inválido',
      subjectRequired: 'Por favor ingresa un asunto',
      messageRequired: 'Por favor escribe tu mensaje',
      messageMinLength: 'El mensaje debe tener al menos 20 caracteres'
    }
  },
  EN: {
    pageTitle: 'Contact - Sesecpro',
    pageDescription: 'Contact our team of cybersecurity experts',
    contactHeroAlt: 'Contact our team',
    title: 'Contact our team',
    subtitle: 'Ready to strengthen your digital security? Our experts are ready to help you.',
    formTitle: 'Send us a message',
    nameLabel: 'Full name',
    namePlaceholder: 'John Smith',
    emailLabel: 'Email',
    emailPlaceholder: 'john@email.com',
    subjectLabel: 'Subject',
    subjectPlaceholder: 'Inquiry about cybersecurity services',
    messageLabel: 'Message',
    messagePlaceholder: 'Describe your inquiry in detail...',
    submitButton: 'Send message',
    directEmailTitle: 'Email',
    directEmailText: 'Prefer to email us directly? Click the email and we\'ll respond quickly.',
    directEmailAddress: 'contact@sesecpro.es',
    validation: {
      nameRequired: 'Please enter your name',
      emailRequired: 'Please enter your email',
      emailInvalid: 'Invalid email',
      subjectRequired: 'Please enter a subject',
      messageRequired: 'Please write your message',
      messageMinLength: 'Message must be at least 20 characters'
    }
  }
} as const;

declare module './i18n' {
  interface AllTranslations {
    contactHeroAlt: string;
    title: string;
    subtitle: string;
    formTitle: string;
    nameLabel: string;
    namePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    subjectLabel: string;
    subjectPlaceholder: string;
    messageLabel: string;
    messagePlaceholder: string;
    submitButton: string;
    directEmailTitle: string;
    directEmailText: string;
    directEmailAddress: string;
    validation: {
      nameRequired: string;
      emailRequired: string;
      emailInvalid: string;
      subjectRequired: string;
      messageRequired: string;
      messageMinLength: string;
    };
  }
}
