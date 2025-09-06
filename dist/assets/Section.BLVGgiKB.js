import { c as createAstro, a as createComponent, m as maybeRenderHead, e as addAttribute, f as renderSlot, r as renderTemplate } from './astro/server.BfJUwr4X.js';
import 'kleur/colors';
import 'clsx';
/* empty css                              */

const $$Astro = createAstro("https://sesecpro.com");
const $$Section = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Section;
  const {
    title,
    subtitle,
    background = "default",
    padding = "lg",
    centered = false,
    id,
    spacing = "normal",
    alignment = "left",
    variant = "default"
  } = Astro2.props;
  const paddingClasses = {
    sm: "section-padding-sm",
    md: "section-padding-md",
    lg: "section-padding-lg",
    xl: "section-padding-xl"
  };
  const backgroundClasses = {
    default: "bg-transparent",
    soft: "bg-soft",
    gradient: "bg-gradient"
  };
  const alignmentClasses = {
    left: "text-left",
    center: "text-center",
    right: "text-right"
  };
  const variantClasses = {
    default: "",
    light: "text-gray-600",
    dark: "text-gray-900"
  };
  return renderTemplate`${maybeRenderHead()}<section${addAttribute(`section ${backgroundClasses[background]} ${paddingClasses[padding]} ${alignmentClasses[alignment]} ${variantClasses[variant]} scroll-reveal`, "class")}${addAttribute(id, "id")} data-astro-cid-sh445jdo> <div class="container" data-astro-cid-sh445jdo> ${(title || subtitle) && renderTemplate`<div${addAttribute(`section-header stagger-children ${centered ? "text-center" : ""}`, "class")} data-astro-cid-sh445jdo> ${title && renderTemplate`<h2 class="section-title animate-fade-in" data-astro-cid-sh445jdo>${title}</h2>`} ${subtitle && renderTemplate`<p class="section-subtitle animate-fade-in delay-100" data-astro-cid-sh445jdo>${subtitle}</p>`} </div>`} <div class="section-content stagger-children" data-astro-cid-sh445jdo> ${renderSlot($$result, $$slots["default"])} </div> </div> </section> `;
}, "C:/Users/sespi/CascadeProjects/web_sesec_2025/src/components/Section.astro", void 0);

export { $$Section as $ };
