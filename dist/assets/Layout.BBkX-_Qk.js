import { c as createAstro, a as createComponent, m as maybeRenderHead, e as addAttribute, r as renderTemplate, d as defineScriptVars, b as renderComponent, f as renderSlot, g as renderHead } from './astro/server.BfJUwr4X.js';
import 'kleur/colors';
import 'clsx';
/* empty css                           */

const $$Astro$2 = createAstro("https://sesecpro.com");
const $$Navigation = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Navigation;
  const { lang = "es" } = Astro2.props;
  const navigation = {
    es: {
      home: "Inicio",
      services: "Servicios",
      methodology: "Metodolog\xEDa",
      contact: "Contacto"
    },
    en: {
      home: "Home",
      services: "Services",
      methodology: "Methodology",
      contact: "Contact"
    }
  };
  const routeMapping = {
    "/": "/en/",
    "/servicios": "/en/services",
    "/metodologia": "/en/methodology",
    "/contacto": "/en/contact",
    "/aviso-legal": "/en/legal-notice",
    "/politica-privacidad": "/en/privacy-policy",
    "/politica-cookies": "/en/cookie-policy",
    "/terminos-condiciones": "/en/terms-conditions"
  };
  const reverseRouteMapping = Object.fromEntries(
    Object.entries(routeMapping).map(([es, en]) => [en, es])
  );
  function getAlternateRoute(currentPath, currentLang) {
    if (currentLang === "es") {
      return routeMapping[currentPath] || "/en" + currentPath;
    } else {
      return reverseRouteMapping[currentPath] || currentPath.replace("/en", "");
    }
  }
  const nav = navigation[lang];
  const basePath = lang === "en" ? "/en" : "";
  return renderTemplate`${maybeRenderHead()}<nav class="nav nav-hover-effect" id="main-nav" role="navigation"${addAttribute(lang === "es" ? "Navegaci\xF3n principal" : "Main navigation", "aria-label")} data-astro-cid-pux6a34n> <div class="nav-container" data-astro-cid-pux6a34n> <!-- Logo --> <div class="nav-brand" data-astro-cid-pux6a34n> <a${addAttribute(basePath + "/", "href")} class="brand-link focus-ring"${addAttribute(lang === "es" ? "Ir al inicio - Sesecpro" : "Go to home - Sesecpro", "aria-label")} data-astro-cid-pux6a34n> <div class="brand-icon" aria-hidden="true" data-astro-cid-pux6a34n> <svg width="32" height="32" viewBox="0 0 32 32" fill="none" data-astro-cid-pux6a34n> <path d="M16 2L30 9v14L16 30 2 23V9l14-7z" stroke="currentColor" stroke-width="2" fill="none" data-astro-cid-pux6a34n></path> <circle cx="16" cy="16" r="6" stroke="currentColor" stroke-width="2" fill="none" data-astro-cid-pux6a34n></circle> <circle cx="16" cy="16" r="2" fill="currentColor" data-astro-cid-pux6a34n></circle> </svg> </div> <span class="brand-text" data-astro-cid-pux6a34n>Sesecpro</span> </a> </div> <!-- Desktop Navigation --> <div class="nav-links" role="menubar"${addAttribute(lang === "es" ? "Men\xFA principal" : "Main menu", "aria-label")} data-astro-cid-pux6a34n> <a${addAttribute(basePath + "/", "href")} class="nav-link nav-link-hover focus-ring" data-nav="home" role="menuitem"${addAttribute(Astro2.url.pathname === basePath + "/" ? "page" : void 0, "aria-current")} data-astro-cid-pux6a34n> <span class="nav-text" data-astro-cid-pux6a34n>${nav.home}</span> <div class="nav-indicator" aria-hidden="true" data-astro-cid-pux6a34n></div> </a> <a${addAttribute(lang === "en" ? "/en/services" : "/servicios", "href")} class="nav-link focus-ring" data-nav="services" role="menuitem"${addAttribute(Astro2.url.pathname.includes("service") ? "page" : void 0, "aria-current")} data-astro-cid-pux6a34n> <span class="nav-text" data-astro-cid-pux6a34n>${nav.services}</span> <div class="nav-indicator" aria-hidden="true" data-astro-cid-pux6a34n></div> </a> <a${addAttribute(lang === "en" ? "/en/methodology" : "/metodologia", "href")} class="nav-link focus-ring" data-nav="methodology" role="menuitem"${addAttribute(Astro2.url.pathname.includes("method") ? "page" : void 0, "aria-current")} data-astro-cid-pux6a34n> <span class="nav-text" data-astro-cid-pux6a34n>${nav.methodology}</span> <div class="nav-indicator" aria-hidden="true" data-astro-cid-pux6a34n></div> </a> <a${addAttribute(lang === "en" ? "/en/contact" : "/contacto", "href")} class="nav-link focus-ring" data-nav="contact" role="menuitem"${addAttribute(Astro2.url.pathname.includes("contact") ? "page" : void 0, "aria-current")} data-astro-cid-pux6a34n> <span class="nav-text" data-astro-cid-pux6a34n>${nav.contact}</span> <div class="nav-indicator" aria-hidden="true" data-astro-cid-pux6a34n></div> </a> </div> <!-- Language Switcher --> <div class="nav-actions" data-astro-cid-pux6a34n> <div class="lang-switcher" data-astro-cid-pux6a34n> <button class="lang-btn focus-ring" id="lang-toggle"${addAttribute(lang === "es" ? "Cambiar idioma" : "Change language", "aria-label")} aria-expanded="false" aria-haspopup="true" aria-controls="lang-dropdown" data-astro-cid-pux6a34n> <span class="lang-current" aria-hidden="true" data-astro-cid-pux6a34n>${lang.toUpperCase()}</span> <svg class="lang-icon" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" data-astro-cid-pux6a34n> <path d="M8 3C10.7614 3 13 5.23858 13 8C13 10.7614 10.7614 13 8 13C5.23858 13 3 10.7614 3 8C3 5.23858 5.23858 3 8 3Z" stroke="currentColor" stroke-width="1.5" data-astro-cid-pux6a34n></path> <path d="M8 1V3M8 13V15M15 8H13M3 8H1" stroke="currentColor" stroke-width="1.5" data-astro-cid-pux6a34n></path> </svg> </button> <div class="lang-dropdown" id="lang-dropdown" role="menu" aria-labelledby="lang-toggle" data-astro-cid-pux6a34n> <a${addAttribute(getAlternateRoute(Astro2.url.pathname, lang), "href")} class="lang-option focus-ring" role="menuitem"${addAttribute(lang === "es" ? "Cambiar a ingl\xE9s" : "Switch to Spanish", "aria-label")} data-astro-cid-pux6a34n> <span class="lang-flag" aria-hidden="true" data-astro-cid-pux6a34n>${lang === "es" ? "\u{1F1FA}\u{1F1F8}" : "\u{1F1EA}\u{1F1F8}"}</span> <span data-astro-cid-pux6a34n>${lang === "es" ? "English" : "Espa\xF1ol"}</span> </a> </div> </div> <!-- Mobile Menu Toggle --> <button class="mobile-toggle magnetic-hover focus-ring" id="mobile-toggle"${addAttribute(lang === "es" ? "Abrir men\xFA de navegaci\xF3n" : "Open navigation menu", "aria-label")} aria-expanded="false" aria-controls="mobile-menu" data-astro-cid-pux6a34n> <span class="hamburger-line" aria-hidden="true" data-astro-cid-pux6a34n></span> <span class="hamburger-line" aria-hidden="true" data-astro-cid-pux6a34n></span> <span class="hamburger-line" aria-hidden="true" data-astro-cid-pux6a34n></span> </button> </div> </div> <!-- Mobile Menu --> <div class="mobile-menu" id="mobile-menu" role="dialog" aria-modal="true" aria-labelledby="mobile-menu-title" aria-hidden="true" data-astro-cid-pux6a34n> <div class="mobile-menu-content" data-astro-cid-pux6a34n> <h2 id="mobile-menu-title" class="sr-only" data-astro-cid-pux6a34n>${lang === "es" ? "Men\xFA de navegaci\xF3n m\xF3vil" : "Mobile navigation menu"}</h2> <nav class="mobile-links" role="navigation"${addAttribute(lang === "es" ? "Navegaci\xF3n m\xF3vil" : "Mobile navigation", "aria-label")} data-astro-cid-pux6a34n> <a${addAttribute(basePath + "/", "href")} class="mobile-link focus-ring"${addAttribute(Astro2.url.pathname === basePath + "/" ? "page" : void 0, "aria-current")} data-astro-cid-pux6a34n> <span class="mobile-link-text" data-astro-cid-pux6a34n>${nav.home}</span> </a> <a${addAttribute(lang === "en" ? "/en/services" : "/servicios", "href")} class="mobile-link focus-ring"${addAttribute(Astro2.url.pathname.includes("service") ? "page" : void 0, "aria-current")} data-astro-cid-pux6a34n> <span class="mobile-link-text" data-astro-cid-pux6a34n>${nav.services}</span> </a> <a${addAttribute(lang === "en" ? "/en/methodology" : "/metodologia", "href")} class="mobile-link focus-ring"${addAttribute(Astro2.url.pathname.includes("method") ? "page" : void 0, "aria-current")} data-astro-cid-pux6a34n> <span class="mobile-link-text" data-astro-cid-pux6a34n>${nav.methodology}</span> </a> <a${addAttribute(lang === "en" ? "/en/contact" : "/contacto", "href")} class="mobile-link focus-ring"${addAttribute(Astro2.url.pathname.includes("contact") ? "page" : void 0, "aria-current")} data-astro-cid-pux6a34n> <span class="mobile-link-text" data-astro-cid-pux6a34n>${nav.contact}</span> </a> </nav> </div> </div> <!-- Navigation Background Blur --> <div class="nav-backdrop" data-astro-cid-pux6a34n></div> </nav>  `;
}, "C:/Users/sespi/CascadeProjects/web_sesec_2025/src/components/Navigation.astro", void 0);

const $$Astro$1 = createAstro("https://sesecpro.com");
const $$Footer = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Footer;
  const { lang = "es" } = Astro2.props;
  const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
  const footerData = {
    es: {
      company: "SESEC",
      description: "Consultor\xEDa especializada en ciberseguridad empresarial",
      sections: {
        services: {
          title: "Servicios",
          links: [
            { text: "Auditor\xEDas de Seguridad", href: "/servicios#auditorias" },
            { text: "Pentesting Avanzado", href: "/servicios#pentesting" },
            { text: "Hardening de Sistemas", href: "/servicios#hardening" },
            { text: "Respuesta a Incidentes", href: "/servicios#respuesta" }
          ]
        },
        company: {
          title: "Empresa",
          links: [
            { text: "Metodolog\xEDa", href: "/metodologia" },
            { text: "Contacto", href: "/contacto" },
            { text: "Blog", href: "/blog" },
            { text: "Casos de \xC9xito", href: "/casos-exito" }
          ]
        },
        legal: {
          title: "Legal",
          links: [
            { text: "Pol\xEDtica de Privacidad", href: "/politica-privacidad" },
            { text: "T\xE9rminos y Condiciones", href: "/terminos-condiciones" },
            { text: "Pol\xEDtica de Cookies", href: "/politica-cookies" },
            { text: "Aviso Legal", href: "/aviso-legal" },
            { text: "RGPD", href: "/rgpd" }
          ]
        }
      },
      contact: {
        title: "Contacto",
        email: "info@sesecpro.com",
        phone: "+34 XXX XXX XXX",
        address: "Espa\xF1a"
      },
      social: {
        title: "S\xEDguenos",
        links: [
          { text: "LinkedIn", href: "https://linkedin.com/company/sesec", icon: "linkedin" },
          { text: "Twitter", href: "https://twitter.com/sesecpro", icon: "twitter" }
        ]
      },
      copyright: `\xA9 ${currentYear} SESEC. Todos los derechos reservados.`,
      compliance: "Cumplimiento RGPD \u2022 ISO 27001 \u2022 ENS"
    },
    en: {
      company: "SESEC",
      description: "Specialized cybersecurity consulting for enterprises",
      sections: {
        services: {
          title: "Services",
          links: [
            { text: "Security Audits", href: "/en/services#audits" },
            { text: "Advanced Pentesting", href: "/en/services#pentesting" },
            { text: "System Hardening", href: "/en/services#hardening" },
            { text: "Incident Response", href: "/en/services#response" }
          ]
        },
        company: {
          title: "Company",
          links: [
            { text: "Methodology", href: "/en/methodology" },
            { text: "Contact", href: "/en/contact" },
            { text: "Blog", href: "/en/blog" },
            { text: "Success Stories", href: "/en/success-stories" }
          ]
        },
        legal: {
          title: "Legal",
          links: [
            { text: "Privacy Policy", href: "/en/privacy-policy" },
            { text: "Terms & Conditions", href: "/en/terms-conditions" },
            { text: "Cookie Policy", href: "/en/cookie-policy" },
            { text: "Legal Notice", href: "/en/legal-notice" },
            { text: "GDPR", href: "/en/gdpr" }
          ]
        }
      },
      contact: {
        title: "Contact",
        email: "info@sesecpro.com",
        phone: "+34 XXX XXX XXX",
        address: "Spain"
      },
      social: {
        title: "Follow Us",
        links: [
          { text: "LinkedIn", href: "https://linkedin.com/company/sesec", icon: "linkedin" },
          { text: "Twitter", href: "https://twitter.com/sesecpro", icon: "twitter" }
        ]
      },
      copyright: `\xA9 ${currentYear} SESEC. All rights reserved.`,
      compliance: "GDPR Compliant \u2022 ISO 27001 \u2022 ENS"
    }
  };
  const data = footerData[lang];
  return renderTemplate`${maybeRenderHead()}<footer class="footer" data-astro-cid-sz7xmlte> <div class="container" data-astro-cid-sz7xmlte> <!-- Main Footer Content --> <div class="footer-main" data-astro-cid-sz7xmlte> <!-- Company Info --> <div class="footer-brand" data-astro-cid-sz7xmlte> <div class="brand-logo" data-astro-cid-sz7xmlte> <svg width="120" height="40" viewBox="0 0 120 40" fill="none" data-astro-cid-sz7xmlte> <path d="M20 5L35 12v14L20 33 5 26V12l15-7z" stroke="currentColor" stroke-width="2" fill="none" data-astro-cid-sz7xmlte></path> <circle cx="20" cy="20" r="6" stroke="currentColor" stroke-width="2" fill="none" data-astro-cid-sz7xmlte></circle> <circle cx="20" cy="20" r="2" fill="currentColor" data-astro-cid-sz7xmlte></circle> <text x="45" y="25" font-family="Arial, sans-serif" font-size="16" font-weight="bold" fill="currentColor" data-astro-cid-sz7xmlte>Sesecpro</text> </svg> </div> <p class="brand-description" data-astro-cid-sz7xmlte>${data.description}</p> <!-- Contact Info --> <div class="contact-info" data-astro-cid-sz7xmlte> <h4 class="contact-title" data-astro-cid-sz7xmlte>${data.contact.title}</h4> <div class="contact-items" data-astro-cid-sz7xmlte> <a${addAttribute(`mailto:${data.contact.email}`, "href")} class="contact-item" data-astro-cid-sz7xmlte> <svg class="contact-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-astro-cid-sz7xmlte> <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" data-astro-cid-sz7xmlte></path> <polyline points="22,6 12,13 2,6" data-astro-cid-sz7xmlte></polyline> </svg> ${data.contact.email} </a> <div class="contact-item" data-astro-cid-sz7xmlte> <svg class="contact-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-astro-cid-sz7xmlte> <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" data-astro-cid-sz7xmlte></path> </svg> ${data.contact.phone} </div> <div class="contact-item" data-astro-cid-sz7xmlte> <svg class="contact-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-astro-cid-sz7xmlte> <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" data-astro-cid-sz7xmlte></path> <circle cx="12" cy="10" r="3" data-astro-cid-sz7xmlte></circle> </svg> ${data.contact.address} </div> </div> </div> </div> <!-- Footer Links --> <div class="footer-links" data-astro-cid-sz7xmlte> <!-- Services --> <div class="footer-section" data-astro-cid-sz7xmlte> <h4 class="section-title" data-astro-cid-sz7xmlte>${data.sections.services.title}</h4> <ul class="section-links" data-astro-cid-sz7xmlte> ${data.sections.services.links.map((link) => renderTemplate`<li data-astro-cid-sz7xmlte><a${addAttribute(link.href, "href")} class="footer-link" data-astro-cid-sz7xmlte>${link.text}</a></li>`)} </ul> </div> <!-- Company --> <div class="footer-section" data-astro-cid-sz7xmlte> <h4 class="section-title" data-astro-cid-sz7xmlte>${data.sections.company.title}</h4> <ul class="section-links" data-astro-cid-sz7xmlte> ${data.sections.company.links.map((link) => renderTemplate`<li data-astro-cid-sz7xmlte><a${addAttribute(link.href, "href")} class="footer-link" data-astro-cid-sz7xmlte>${link.text}</a></li>`)} </ul> </div> <!-- Legal --> <div class="footer-section" data-astro-cid-sz7xmlte> <h4 class="section-title" data-astro-cid-sz7xmlte>${data.sections.legal.title}</h4> <ul class="section-links" data-astro-cid-sz7xmlte> ${data.sections.legal.links.map((link) => renderTemplate`<li data-astro-cid-sz7xmlte><a${addAttribute(link.href, "href")} class="footer-link" data-astro-cid-sz7xmlte>${link.text}</a></li>`)} </ul> </div> <!-- Social --> <div class="footer-section" data-astro-cid-sz7xmlte> <h4 class="section-title" data-astro-cid-sz7xmlte>${data.social.title}</h4> <div class="social-links" data-astro-cid-sz7xmlte> ${data.social.links.map((link) => renderTemplate`<a${addAttribute(link.href, "href")} class="social-link" target="_blank" rel="noopener noreferrer" data-astro-cid-sz7xmlte> ${link.icon === "linkedin" && renderTemplate`<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" data-astro-cid-sz7xmlte> <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" data-astro-cid-sz7xmlte></path> </svg>`} ${link.icon === "twitter" && renderTemplate`<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" data-astro-cid-sz7xmlte> <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" data-astro-cid-sz7xmlte></path> </svg>`} <span class="sr-only" data-astro-cid-sz7xmlte>${link.text}</span> </a>`)} </div> </div> </div> </div> <!-- Footer Bottom --> <div class="footer-bottom" data-astro-cid-sz7xmlte> <div class="footer-bottom-content" data-astro-cid-sz7xmlte> <p class="copyright" data-astro-cid-sz7xmlte>${data.copyright}</p> <p class="compliance" data-astro-cid-sz7xmlte>${data.compliance}</p> </div> </div> </div> </footer> `;
}, "C:/Users/sespi/CascadeProjects/web_sesec_2025/src/components/Footer.astro", void 0);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro("https://sesecpro.com");
const $$Layout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Layout;
  const { title, description = "Consultoría en ciberseguridad profesional", lang = "es", canonical } = Astro2.props;
  const currentPath = Astro2.url.pathname;
  const baseUrl = Astro2.site || "https://sesecpro.com";
  const getAlternateUrl = (targetLang) => {
    if (currentPath.startsWith("/en/")) {
      return targetLang === "es" ? currentPath.replace("/en/", "/") : currentPath;
    } else {
      return targetLang === "en" ? `/en${currentPath === "/" ? "" : currentPath}` : currentPath;
    }
  };
  return renderTemplate(_a || (_a = __template(["<html", ' data-astro-cid-sckkx6r4> <head><meta charset="UTF-8"><meta name="description"', '><meta name="viewport" content="width=device-width, initial-scale=1.0"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="generator"', `><!-- Configuración de crossorigin para recursos --><meta http-equiv="Content-Security-Policy" content="script-src 'self' 'unsafe-inline' 'unsafe-eval'; worker-src 'self' blob:; object-src 'none';"><!-- SEO --><title>`, '</title><meta name="description"', '><meta name="keywords" content="ciberseguridad, consultoría, auditoría, pentesting, seguridad informática, hardening, respuesta incidentes, ISO 27001, NIST, compliance"><meta name="author" content="SESEC - Consultoría en Ciberseguridad"><meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"><meta name="googlebot" content="index, follow"><link rel="canonical"', '><!-- hreflang --><link rel="alternate" hreflang="es"', '><link rel="alternate" hreflang="en"', '><link rel="alternate" hreflang="x-default"', '><!-- Open Graph --><meta property="og:title"', '><meta property="og:description"', '><meta property="og:url"', '><meta property="og:type" content="website"><meta property="og:locale"', '><!-- Twitter Card --><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title"', '><meta name="twitter:description"', `><!-- Preload critical fonts --><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link rel="preload" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap" as="style" onload="this.onload=null;this.rel='stylesheet'">`, '<noscript><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet"></noscript><!-- Critical CSS --><!-- Fix para module preloads --><script src="/src/scripts/module-preload-fix.js" type="module"></script><!-- Performance hints --><meta name="theme-color" content="#0b0f14"><meta name="color-scheme" content="dark"><!-- Accessibility meta tags --><meta name="format-detection" content="telephone=no"><meta name="mobile-web-app-capable" content="yes"><meta name="apple-mobile-web-app-status-bar-style" content="black-translucent"><!-- Structured data for better SEO --><script type="application/ld+json">\n    {\n      "@context": "https://schema.org",\n      "@type": "Organization",\n      "name": "SESEC",\n      "description": "Consultoría especializada en ciberseguridad empresarial",\n      "url": "https://sesecpro.com",\n      "logo": "https://sesecpro.com/images/logo.svg",\n      "contactPoint": {\n        "@type": "ContactPoint",\n        "telephone": "+34-XXX-XXX-XXX",\n        "contactType": "customer service",\n        "availableLanguage": ["Spanish", "English"]\n      },\n      "address": {\n        "@type": "PostalAddress",\n        "addressCountry": "ES"\n      },\n      "sameAs": [\n        "https://linkedin.com/company/sesec",\n        "https://twitter.com/sesecpro"\n      ],\n      "serviceType": [\n        "Auditorías de Ciberseguridad",\n        "Pentesting",\n        "Hardening de Sistemas",\n        "Respuesta a Incidentes",\n        "Consultoría ISO 27001"\n      ]\n    }\n    </script>', '</head> <body data-astro-cid-sckkx6r4> <a href="#main-content" class="skip-link" data-astro-cid-sckkx6r4> ', ' </a> <div id="app" data-astro-cid-sckkx6r4> ', ' <main id="main-content" tabindex="-1" data-astro-cid-sckkx6r4> ', " </main> ", " </div> <!-- Configuración global --> <script>(function(){", "\n      window.BACKEND_URL = backendUrl;\n    })();</script> <!-- Scripts de microinteracciones -->  <!-- Service Worker Registration -->  </body> </html> "])), addAttribute(lang, "lang"), addAttribute(description, "content"), addAttribute(Astro2.generator, "content"), title, addAttribute(description, "content"), addAttribute(canonical || `${baseUrl}${currentPath}`, "href"), addAttribute(`${baseUrl}${getAlternateUrl("es")}`, "href"), addAttribute(`${baseUrl}${getAlternateUrl("en")}`, "href"), addAttribute(`${baseUrl}${getAlternateUrl("es")}`, "href"), addAttribute(title, "content"), addAttribute(description, "content"), addAttribute(`${baseUrl}${currentPath}`, "content"), addAttribute(lang === "es" ? "es_ES" : "en_US", "content"), addAttribute(title, "content"), addAttribute(description, "content"), maybeRenderHead(), renderHead(), lang === "es" ? "Saltar al contenido principal" : "Skip to main content", renderComponent($$result, "Navigation", $$Navigation, { "lang": lang, "data-astro-cid-sckkx6r4": true }), renderSlot($$result, $$slots["default"]), renderComponent($$result, "Footer", $$Footer, { "lang": lang, "data-astro-cid-sckkx6r4": true }), defineScriptVars({ backendUrl: "https://sesec-backend.fly.dev" }));
}, "C:/Users/sespi/CascadeProjects/web_sesec_2025/src/layouts/Layout.astro", void 0);

export { $$Layout as $ };
