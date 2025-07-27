// Índice de traducciones en español
import { commonES } from './common';
import { navigationES } from './navigation';
import { solutionsES } from './solutions';
import { resourcesES } from './resources';
import { contactES } from './contact';
import { toolsES } from './tools';
import { aboutES } from './about';

export const esTranslations = {
  ...commonES,
  ...navigationES,
  ...solutionsES,
  ...resourcesES,
  ...contactES,
  ...toolsES,
  ...aboutES,
};

export type ESTranslations = typeof esTranslations;

// Exportaciones individuales para uso específico
export { commonES, navigationES, solutionsES, resourcesES, contactES, toolsES, aboutES };