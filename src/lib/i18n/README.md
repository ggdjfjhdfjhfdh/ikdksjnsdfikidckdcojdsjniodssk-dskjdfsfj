# Sistema de Internacionalización (i18n) Modular

Este directorio contiene la nueva estructura modular del sistema de internacionalización de SESECPRO.

## Estructura

```
src/lib/i18n/
├── index.ts                 # Configuración principal y exports
├── migration.ts             # Herramientas de migración
├── README.md               # Esta documentación
└── locales/
    ├── es/                 # Traducciones en español
    │   ├── index.ts        # Índice de traducciones ES
    │   ├── common.ts       # Términos comunes
    │   ├── navigation.ts   # Navegación y hero
    │   ├── solutions.ts    # Soluciones y servicios
    │   ├── resources.ts    # Recursos y wiki
    │   └── contact.ts      # Contacto y formularios
    └── en/                 # Traducciones en inglés
        ├── index.ts        # Índice de traducciones EN
        ├── common.ts       # Términos comunes
        ├── navigation.ts   # Navegación y hero
        ├── solutions.ts    # Soluciones y servicios
        ├── resources.ts    # Recursos y wiki
        └── contact.ts      # Contacto y formularios
```

## Uso

### Importación básica

```typescript
import { useI18n } from '@/lib/LanguageContext';

function MyComponent() {
  const { t } = useI18n();
  
  return (
    <div>
      <h1>{t('heroTitle')}</h1>
      <p>{t('heroDescription')}</p>
    </div>
  );
}
```

### Uso con el contexto de idioma

```typescript
import { useLanguage } from '@/lib/LanguageContext';

function MyComponent() {
  const { language, setLanguage, t } = useLanguage();
  
  return (
    <div>
      <button onClick={() => setLanguage('EN')}>
        {t('switchToEnglish')}
      </button>
      <h1>{t('welcomeMessage')}</h1>
    </div>
  );
}
```

### Importación de módulos específicos

```typescript
import { solutionsES } from '@/lib/i18n/locales/es/solutions';
import { solutionsEN } from '@/lib/i18n/locales/en/solutions';

// Para uso directo sin contexto
const getSolutionTitle = (language: 'ES' | 'EN') => {
  return language === 'ES' 
    ? solutionsES.solutionsTitle 
    : solutionsEN.solutionsTitle;
};
```

## Ventajas de la nueva estructura

### 1. **Modularidad**
- Cada módulo contiene traducciones relacionadas temáticamente
- Facilita el mantenimiento y la organización
- Permite cargar solo las traducciones necesarias

### 2. **Tipado fuerte**
- TypeScript proporciona autocompletado para todas las claves
- Detección de errores en tiempo de compilación
- Mejor experiencia de desarrollo

### 3. **Escalabilidad**
- Fácil agregar nuevos idiomas
- Estructura clara para nuevas categorías
- Separación de responsabilidades

### 4. **Mantenibilidad**
- Archivos más pequeños y manejables
- Fácil localización de traducciones específicas
- Mejor colaboración en equipo

## Migración desde la estructura anterior

### Herramientas de migración

El archivo `migration.ts` proporciona herramientas para facilitar la migración:

```typescript
import { generateMigrationReport, findMissingTranslations } from '@/lib/i18n/migration';

// Generar reporte de migración
const report = generateMigrationReport();

// Encontrar traducciones faltantes
const missing = findMissingTranslations();
```

### Pasos de migración

1. **Identificar traducciones faltantes**
   ```bash
   # En la consola del navegador (desarrollo)
   window.i18nMigration.generateMigrationReport();
   ```

2. **Mover traducciones al módulo apropiado**
   - Navegación → `navigation.ts`
   - Soluciones → `solutions.ts`
   - Recursos/Wiki → `resources.ts`
   - Contacto/Formularios → `contact.ts`
   - Términos generales → `common.ts`

3. **Actualizar importaciones en componentes**
   ```typescript
   // Antes
   import { useI18n } from '@/lib/i18n';
   
   // Después (sin cambios en la API)
   import { useI18n } from '@/lib/i18n';
   ```

4. **Verificar funcionamiento**
   - Comprobar que todas las traducciones se muestran correctamente
   - Verificar el cambio de idioma
   - Ejecutar tests si están disponibles

## Convenciones de nomenclatura

### Claves de traducción
- **camelCase**: `heroTitle`, `contactFormName`
- **Prefijos por sección**: `nav*`, `solution*`, `contact*`
- **Sufijos descriptivos**: `*Title`, `*Description`, `*Button`

### Archivos de módulo
- **Nombres descriptivos**: `navigation.ts`, `solutions.ts`
- **Exportación nombrada**: `export const navigationES = { ... }`
- **Tipado exportado**: `export type NavigationTranslations = typeof navigationES`

## Mejores prácticas

### 1. **Organización temática**
```typescript
// ✅ Bueno: agrupado por tema
export const navigationES = {
  navHome: 'Inicio',
  navAbout: 'Acerca de',
  navContact: 'Contacto',
};

// ❌ Malo: mezclado
export const mixedES = {
  navHome: 'Inicio',
  contactEmail: 'Email',
  solutionTitle: 'Soluciones',
};
```

### 2. **Consistencia entre idiomas**
```typescript
// ✅ Bueno: mismas claves en ambos idiomas
export const commonES = { welcomeMessage: 'Bienvenido' };
export const commonEN = { welcomeMessage: 'Welcome' };

// ❌ Malo: claves diferentes
export const commonES = { mensajeBienvenida: 'Bienvenido' };
export const commonEN = { welcomeMessage: 'Welcome' };
```

### 3. **Documentación de contexto**
```typescript
export const formsES = {
  // Validaciones de formulario
  validationRequired: 'Este campo es obligatorio',
  validationEmail: 'Formato de email inválido',
  
  // Botones de acción
  submitButton: 'Enviar',
  cancelButton: 'Cancelar',
};
```

## Próximos pasos

1. **Completar migración**: Mover todas las traducciones restantes
2. **Implementar lazy loading**: Cargar módulos bajo demanda
3. **Agregar validaciones**: Verificar consistencia entre idiomas
4. **Implementar pluralización**: Soporte para formas plurales
5. **Agregar interpolación**: Variables en traducciones

## Soporte

Para dudas o problemas con el sistema de i18n:
1. Revisar esta documentación
2. Usar las herramientas de migración
3. Consultar los ejemplos en los componentes existentes