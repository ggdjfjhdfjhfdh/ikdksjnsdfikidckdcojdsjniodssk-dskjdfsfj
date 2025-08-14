// English translations index
import { commonEN } from './common';
import { navigationEN } from './navigation';
import { solutionsEN } from './solutions';
import { resourcesEN } from './resources';
import { contactEN } from './contact';
import { toolsEN } from './tools';
import { aboutEN } from './about';
import { riskCalculatorEN } from './risk-calculator';

export const enTranslations = {
  ...commonEN,
  ...navigationEN,
  ...solutionsEN,
  ...resourcesEN,
  ...contactEN,
  ...toolsEN,
  ...aboutEN,
  ...riskCalculatorEN,
};

export type ENTranslations = typeof enTranslations;

// Individual exports for specific use
export { commonEN, navigationEN, solutionsEN, resourcesEN, contactEN, toolsEN, aboutEN, riskCalculatorEN };