// Main i18n configuration with modular structure
import { esTranslations } from './locales/es';
import { enTranslations } from './locales/en';

export type Language = 'ES' | 'EN';

export const translations = {
  ES: esTranslations,
  EN: enTranslations,
} as const;

export type Translations = typeof translations;
export type TranslationKey = keyof typeof esTranslations;

// Hook for using translations
export const useTranslations = (language: Language) => {
  return {
    t: (key: TranslationKey): string => {
      return (translations[language] as any)[key] || key;
    },
    translations: translations[language],
  };
};

// Helper function to get translation
export const getTranslation = (language: Language, key: TranslationKey): string => {
  return (translations[language] as any)[key] || key;
};

// Export individual locale modules for specific imports
export { esTranslations, enTranslations };
export * from './locales/es';
export * from './locales/en';