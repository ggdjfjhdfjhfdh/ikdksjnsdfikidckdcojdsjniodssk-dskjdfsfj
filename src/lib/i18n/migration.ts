// Migration helper to update from old i18n structure to new modular structure
// This file helps identify which translations need to be moved to the new modules

// DISABLED: Importing old translations causes conflicts with new system
// import { translations as oldTranslations } from '../i18n';
import { esTranslations, enTranslations } from './index';

// Function to find missing translations in the new structure
// DISABLED: Depends on old translations import
/*
export const findMissingTranslations = () => {
  const oldESKeys = Object.keys(oldTranslations.ES);
  const oldENKeys = Object.keys(oldTranslations.EN);
  const newESKeys = Object.keys(esTranslations);
  const newENKeys = Object.keys(enTranslations);

  const missingESKeys = oldESKeys.filter(key => !newESKeys.includes(key));
  const missingENKeys = oldENKeys.filter(key => !newENKeys.includes(key));

  return {
    missingES: missingESKeys,
    missingEN: missingENKeys,
    totalOldES: oldESKeys.length,
    totalOldEN: oldENKeys.length,
    totalNewES: newESKeys.length,
    totalNewEN: newENKeys.length,
  };
};
*/

// Function to generate migration report
// DISABLED: Depends on old translations import
/*
export const generateMigrationReport = () => {
  const missing = findMissingTranslations();
  
  console.log('=== I18N MIGRATION REPORT ===');
  console.log(`Old ES translations: ${missing.totalOldES}`);
  console.log(`New ES translations: ${missing.totalNewES}`);
  console.log(`Missing ES translations: ${missing.missingES.length}`);
  console.log('');
  console.log(`Old EN translations: ${missing.totalOldEN}`);
  console.log(`New EN translations: ${missing.totalNewEN}`);
  console.log(`Missing EN translations: ${missing.missingEN.length}`);
  console.log('');
  
  if (missing.missingES.length > 0) {
    console.log('Missing ES keys:', missing.missingES);
  }
  
  if (missing.missingEN.length > 0) {
    console.log('Missing EN keys:', missing.missingEN);
  }
  
  return missing;
};
*/

// Function to extract translations by category from old structure
// DISABLED: Depends on old translations import
/*
export const extractTranslationsByCategory = (category: string) => {
  const categoryKeys = {
    wiki: ['wikiTitle', 'wikiSubtitle', 'wikiCategory', 'wiki'],
    tools: ['passwordChecker', 'cybersecurityTest', 'twoFactorAuth', 'backupManagement'],
    news: ['latestNews', 'newsHero', 'malware', 'vulnerabilities', 'attacks'],
    footer: ['footer', 'company', 'legal', 'social'],
    forms: ['form', 'validation', 'submit', 'error', 'success'],
  };
  
  const keys = categoryKeys[category as keyof typeof categoryKeys] || [];
  const esTranslations: Record<string, string> = {};
  const enTranslations: Record<string, string> = {};
  
  Object.keys(oldTranslations.ES).forEach(key => {
    if (keys.some(categoryKey => key.includes(categoryKey))) {
      esTranslations[key] = oldTranslations.ES[key as keyof typeof oldTranslations.ES];
      enTranslations[key] = oldTranslations.EN[key as keyof typeof oldTranslations.EN];
    }
  });
  
  return { esTranslations, enTranslations };
};
*/

// Export for development use
// DISABLED: Functions are commented out
/*
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  (window as any).i18nMigration = {
    findMissingTranslations,
    generateMigrationReport,
    extractTranslationsByCategory,
  };
}
*/