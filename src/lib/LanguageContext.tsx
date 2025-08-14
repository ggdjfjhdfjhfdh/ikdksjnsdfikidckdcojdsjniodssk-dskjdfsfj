'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '@/lib/i18n/index';

type Language = 'ES' | 'EN';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('ES');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && (savedLanguage === 'ES' || savedLanguage === 'EN')) {
      setLanguage(savedLanguage);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    if (isClient) {
      localStorage.setItem('language', lang);
    }
  };

  const t = (key: string): string => {
    // During SSR, always use Spanish as default to avoid hydration mismatch
    const currentLanguage = typeof window === 'undefined' ? 'ES' : language;
    const langObj: any = translations[currentLanguage];

    if (!langObj) return key;

    // Direct key lookup first (for flat keys)
    if (key in langObj && typeof langObj[key] === 'string') {
      return langObj[key];
    }

    // Dot notation path resolution for nested keys (e.g., "hero.title")
    if (key.includes('.')) {
      const keys = key.split('.');
      let value: any = langObj;
      for (const k of keys) {
        if (value && typeof value === 'object' && k in value) {
          value = value[k];
        } else {
          value = undefined;
          break;
        }
      }
      if (typeof value === 'string') return value;
    }

    // Not found: return the key as a safe fallback
    return key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const useI18n = () => {
  const { t } = useLanguage();
  return { t };
};
