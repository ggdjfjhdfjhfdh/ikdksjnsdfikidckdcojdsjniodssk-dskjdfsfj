# Sesecpro Website

Sitio web profesional de ciberseguridad construido con Astro 4, optimizado para rendimiento extremo y diseño diferenciador.

## 🚀 Características

- **Rendimiento extremo**: LCP < 1.5s, CLS < 0.1, INP < 200ms
- **Bilingüe**: Español e Inglés con i18n nativo
- **Diseño diferenciador**: Sin clichés de ciberseguridad, glassmorphism y animaciones cinematográficas
- **Accesibilidad**: WCAG AA compliant
- **SEO optimizado**: Meta tags, Open Graph, Twitter Cards, hreflang

## 📁 Estructura del Proyecto

```
/
├── public/
│   └── icons/          # Iconos SVG personalizados
├── src/
│   ├── components/     # Componentes reutilizables
│   ├── layouts/        # Layout base
│   ├── pages/          # Páginas del sitio
│   │   ├── en/         # Páginas en inglés
│   │   └── *.astro     # Páginas en español
│   └── styles/
│       └── tokens.css  # Sistema de diseño
└── astro.config.mjs    # Configuración de Astro
```

## 🎨 Sistema de Diseño

### Tokens CSS

Todos los valores de diseño están centralizados en `src/styles/tokens.css`:

```css
:root {
  /* Colores */
  --bg: #0b0f14;        /* Fondo principal */
  --bg-soft: #0f141b;   /* Secciones */
  --fg: #e9eef5;        /* Texto primario */
  --fg-dim: #b6c1cf;    /* Texto secundario */
  --accent: #7cf7d4;    /* Acento principal */
  --accent-2: #9b8cff;  /* Acento secundario */
  --border: #1c2530;
  
  /* Tipografía */
  --font-sans: "Inter", "Space Grotesk", system-ui;
  --fs-hero: clamp(40px, 7vw, 72px);
  --fs-h1: clamp(32px, 5vw, 56px);
  --fs-h2: clamp(24px, 3.5vw, 36px);
  --fs-h3: clamp(18px, 2.5vw, 22px);
  --fs-body: clamp(16px, 1.8vw, 18px);
  
  /* Espaciado */
  --sp-1: 4px; --sp-2: 8px; --sp-3: 12px;
  --sp-4: 16px; --sp-6: 24px; --sp-8: 32px;
  --sp-10: 40px; --sp-12: 48px; --sp-16: 64px;
  
  /* Efectos */
  --radius: 16px;
  --radius-lg: 24px;
  --shadow-1: 0 8px 30px rgba(0,0,0,.25);
  --glass: rgba(255,255,255,0.06);
  
  /* Animaciones */
  --ease: cubic-bezier(.2,.8,.2,1);
  --dur-fast: 160ms;
  --dur: 280ms;
  --dur-slow: 420ms;
}
```

### Componentes Principales

#### Layout
```astro
<Layout 
  title="Título de la página"
  description="Descripción SEO"
  lang="es" // o "en"
>
  <!-- Contenido -->
</Layout>
```

#### Section
```astro
<Section 
  title="Título de sección"
  subtitle="Subtítulo opcional"
  background="default" // "soft", "gradient"
  spacing="large" // "medium", "small"
  alignment="center" // "left"
>
  <!-- Contenido -->
</Section>
```

#### Card
```astro
<Card 
  variant="service" // "case", "value", "testimonial"
  title="Título"
  description="Descripción"
  href="/enlace"
  icon="nombre-icono"
/>
```

#### Hero
```astro
<Hero 
  title="Título principal"
  subtitle="Subtítulo"
  primaryCTA={{ text: "Botón", href: "/enlace" }}
  secondaryCTA={{ text: "Botón 2", href: "/enlace2" }}
/>
```

## 🛠️ Desarrollo

### Instalación

```bash
npm install
```

### Desarrollo local

```bash
npm run dev
```

### Build para producción

```bash
npm run build
```

### Preview del build

```bash
npm run preview
```

## 📝 Crear una Nueva Sección

### 1. Usar el sistema de tokens

```css
.mi-seccion {
  background: var(--bg-soft);
  padding: var(--sp-8) var(--sp-4);
  border-radius: var(--radius);
  color: var(--fg);
}

.mi-titulo {
  font-size: var(--fs-h2);
  color: var(--accent);
  margin-bottom: var(--sp-4);
}
```

### 2. Aplicar efectos glassmorphism

```css
.glass-card {
  background: var(--glass);
  border: 1px solid var(--border);
  backdrop-filter: blur(10px);
  border-radius: var(--radius);
  transition: all var(--dur) var(--ease);
}

.glass-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-1);
  border-color: var(--accent);
}
```

### 3. Animaciones de entrada

```css
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-in {
  animation: fadeInUp var(--dur) var(--ease) forwards;
}

/* Respetar preferencias de movimiento */
@media (prefers-reduced-motion: reduce) {
  .animate-in {
    animation: none;
  }
}
```

### 4. Grid responsive

```css
.responsive-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--sp-6);
  max-width: var(--container);
  margin: 0 auto;
}

@media (max-width: 768px) {
  .responsive-grid {
    grid-template-columns: 1fr;
    gap: var(--sp-4);
  }
}
```

## 🌐 Internacionalización

### Estructura de páginas

- Español: `/src/pages/pagina.astro`
- Inglés: `/src/pages/en/page.astro`

### Configuración en Layout

```astro
<Layout 
  title="Título ES"
  description="Descripción ES"
  lang="es"
>
```

```astro
<Layout 
  title="Title EN"
  description="Description EN"
  lang="en"
>
```

## 🎯 Optimización de Rendimiento

### Métricas objetivo
- **LCP**: < 1.5s
- **CLS**: < 0.1
- **INP**: < 200ms
- **JS inicial**: ≤ 80KB gzipped
- **Lighthouse**: ≥ 95 en todas las métricas

### Técnicas aplicadas
- SSG (Static Site Generation)
- Islas de hidratación solo donde es necesario
- CSS crítico inlineado
- Precarga de fuentes
- Imágenes optimizadas con `<Image />`
- Minificación y compresión

## ♿ Accesibilidad

- Contraste WCAG AA mínimo
- Focus visible en todos los elementos interactivos
- Roles y ARIA labels apropiados
- Textos descriptivos en botones
- Soporte para `prefers-reduced-motion`

## 📱 Responsive Design

### Breakpoints
- **sm**: 640px
- **md**: 768px
- **lg**: 1024px
- **xl**: 1280px

### Container
- Ancho máximo: `min(1200px, 92vw)`
- Grid: 12 columnas con gutters de 24px

## 🚀 Despliegue

### Vercel (Recomendado)
1. Conectar repositorio
2. Configurar build command: `npm run build`
3. Output directory: `dist`

### Netlify
1. Build command: `npm run build`
2. Publish directory: `dist`

## 📄 Licencia

MIT License - ver archivo LICENSE para detalles.

---

**Desarrollado con ❤️ usando Astro 4**