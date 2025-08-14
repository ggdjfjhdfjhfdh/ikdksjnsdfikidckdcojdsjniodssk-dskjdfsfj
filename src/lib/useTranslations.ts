'use client';

import { useState, useEffect } from 'react';
import translations from './translations';

type Language = 'ES' | 'EN';

export const useTranslations = () => {
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
    // Always use Spanish during SSR to avoid hydration mismatch
    const currentLanguage = isClient ? language : 'ES';
    const keys = key.split('.');
    let value: any = translations[currentLanguage];
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        return key; // Return the key if path doesn't exist
      }
    }
    
    return typeof value === 'string' ? value : key;
  };

  return {
    language,
    setLanguage: handleSetLanguage,
    t,
    isClient
  };
};