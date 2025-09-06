import { c as createAstro, a as createComponent, r as renderTemplate, u as unescapeHTML, e as addAttribute } from './astro/server.BfJUwr4X.js';
import 'kleur/colors';
import 'clsx';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a, _b, _c;
const $$Astro = createAstro("https://sesecpro.com");
const $$SEO = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$SEO;
  const {
    title,
    description,
    canonical,
    type = "website",
    image = "/images/og-default.jpg",
    imageAlt = "SESEC - Consultor\xEDa en Ciberseguridad",
    lang = "es",
    structuredData,
    noindex = false
  } = Astro2.props;
  const baseUrl = Astro2.site || "https://sesecpro.com";
  const currentUrl = canonical || `${baseUrl}${Astro2.url.pathname}`;
  const fullImageUrl = image.startsWith("http") ? image : `${baseUrl}${image}`;
  const getDefaultStructuredData = () => {
    const baseData = {
      "@context": "https://schema.org",
      "@type": type === "service" ? "Service" : type === "article" ? "Article" : "WebPage",
      name: title,
      description,
      url: currentUrl,
      image: fullImageUrl,
      inLanguage: lang,
      isPartOf: {
        "@type": "WebSite",
        name: "SESEC",
        url: baseUrl
      }
    };
    if (type === "service") {
      return {
        ...baseData,
        "@type": "Service",
        provider: {
          "@type": "Organization",
          name: "SESEC",
          url: baseUrl
        },
        serviceType: "Cybersecurity Consulting",
        areaServed: {
          "@type": "Country",
          name: "Spain"
        }
      };
    }
    if (type === "article") {
      return {
        ...baseData,
        "@type": "Article",
        author: {
          "@type": "Organization",
          name: "SESEC"
        },
        publisher: {
          "@type": "Organization",
          name: "SESEC",
          logo: {
            "@type": "ImageObject",
            url: `${baseUrl}/images/logo.svg`
          }
        },
        datePublished: (/* @__PURE__ */ new Date()).toISOString(),
        dateModified: (/* @__PURE__ */ new Date()).toISOString()
      };
    }
    return baseData;
  };
  const finalStructuredData = structuredData || getDefaultStructuredData();
  return renderTemplate(_c || (_c = __template(["<!-- SEO Meta Tags --><title>", '</title><meta name="description"', '><link rel="canonical"', ">", '<!-- Open Graph --><meta property="og:type"', '><meta property="og:title"', '><meta property="og:description"', '><meta property="og:url"', '><meta property="og:image"', '><meta property="og:image:alt"', '><meta property="og:site_name" content="SESEC"><meta property="og:locale"', '><!-- Twitter Card --><meta name="twitter:card" content="summary_large_image"><meta name="twitter:site" content="@sesecpro"><meta name="twitter:creator" content="@sesecpro"><meta name="twitter:title"', '><meta name="twitter:description"', '><meta name="twitter:image"', '><meta name="twitter:image:alt"', '><!-- Additional Meta Tags --><meta name="theme-color" content="#1a365d"><meta name="msapplication-TileColor" content="#1a365d"><!-- Structured Data --><script type="application/ld+json">', "<\/script><!-- Breadcrumb Structured Data (si aplica) -->", "<!-- FAQ Structured Data (para p\xE1ginas de servicios) -->", ""])), title, addAttribute(description, "content"), addAttribute(currentUrl, "href"), noindex && renderTemplate`<meta name="robots" content="noindex, nofollow">`, addAttribute(type === "article" ? "article" : "website", "content"), addAttribute(title, "content"), addAttribute(description, "content"), addAttribute(currentUrl, "content"), addAttribute(fullImageUrl, "content"), addAttribute(imageAlt, "content"), addAttribute(lang === "es" ? "es_ES" : "en_US", "content"), addAttribute(title, "content"), addAttribute(description, "content"), addAttribute(fullImageUrl, "content"), addAttribute(imageAlt, "content"), unescapeHTML(JSON.stringify(finalStructuredData)), Astro2.url.pathname !== "/" && renderTemplate(_a || (_a = __template(['<script type="application/ld+json">\n    {\n      "@context": "https://schema.org",\n      "@type": "BreadcrumbList",\n      "itemListElement": [\n        {\n          "@type": "ListItem",\n          "position": 1,\n          "name": "Inicio",\n          "item": `${baseUrl}/`\n        },\n        {\n          "@type": "ListItem",\n          "position": 2,\n          "name": title,\n          "item": currentUrl\n        }\n      ]\n    }\n  <\/script>'], ['<script type="application/ld+json">\n    {\n      "@context": "https://schema.org",\n      "@type": "BreadcrumbList",\n      "itemListElement": [\n        {\n          "@type": "ListItem",\n          "position": 1,\n          "name": "Inicio",\n          "item": \\`\\${baseUrl}/\\`\n        },\n        {\n          "@type": "ListItem",\n          "position": 2,\n          "name": title,\n          "item": currentUrl\n        }\n      ]\n    }\n  <\/script>']))), type === "service" && renderTemplate(_b || (_b = __template(['<script type="application/ld+json">\n    {\n      "@context": "https://schema.org",\n      "@type": "FAQPage",\n      "mainEntity": [\n        {\n          "@type": "Question",\n          "name": "\xBFQu\xE9 incluye una auditor\xEDa de ciberseguridad?",\n          "acceptedAnswer": {\n            "@type": "Answer",\n            "text": "Una auditor\xEDa completa incluye an\xE1lisis de vulnerabilidades, revisi\xF3n de pol\xEDticas de seguridad, evaluaci\xF3n de controles t\xE9cnicos y organizacionales, y un informe detallado con recomendaciones prioritizadas."\n          }\n        },\n        {\n          "@type": "Question",\n          "name": "\xBFCu\xE1nto tiempo toma completar una auditor\xEDa?",\n          "acceptedAnswer": {\n            "@type": "Answer",\n            "text": "El tiempo var\xEDa seg\xFAn el alcance, pero t\xEDpicamente entre 2-6 semanas para organizaciones medianas, incluyendo planificaci\xF3n, ejecuci\xF3n y entrega del informe final."\n          }\n        },\n        {\n          "@type": "Question",\n          "name": "\xBFOfrecen servicios de seguimiento post-auditor\xEDa?",\n          "acceptedAnswer": {\n            "@type": "Answer",\n            "text": "S\xED, ofrecemos servicios de seguimiento para verificar la implementaci\xF3n de recomendaciones y auditor\xEDas de re-certificaci\xF3n seg\xFAn sea necesario."\n          }\n        }\n      ]\n    }\n  <\/script>']))));
}, "C:/Users/sespi/CascadeProjects/web_sesec_2025/src/components/SEO.astro", void 0);

export { $$SEO as $ };
