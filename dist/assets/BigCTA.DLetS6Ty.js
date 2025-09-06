import { c as createAstro, a as createComponent, m as maybeRenderHead, e as addAttribute, r as renderTemplate, b as renderComponent, f as renderSlot } from './astro/server.BfJUwr4X.js';
import 'kleur/colors';
import 'clsx';
/* empty css                           */

const $$Astro$2 = createAstro("https://sesecpro.com");
const $$LoadingSpinner = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$LoadingSpinner;
  const {
    size = "md",
    variant = "primary",
    text,
    inline = false
  } = Astro2.props;
  const sizeClasses = {
    sm: "spinner-sm",
    md: "spinner-md",
    lg: "spinner-lg"
  };
  const variantClasses = {
    primary: "spinner-primary",
    secondary: "spinner-secondary",
    accent: "spinner-accent"
  };
  return renderTemplate`${maybeRenderHead()}<div${addAttribute(`loading-spinner ${inline ? "inline" : ""} ${sizeClasses[size]} ${variantClasses[variant]}`, "class")} data-astro-cid-nk2zudzz> <div class="spinner" role="status" aria-label="Cargando" data-astro-cid-nk2zudzz> <svg class="spinner-svg" viewBox="0 0 24 24" fill="none" data-astro-cid-nk2zudzz> <circle class="spinner-circle-bg" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" data-astro-cid-nk2zudzz></circle> <circle class="spinner-circle" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" stroke-linecap="round" data-astro-cid-nk2zudzz></circle> </svg> </div> ${text && renderTemplate`<span class="loading-text" data-astro-cid-nk2zudzz>${text}</span>`} </div> `;
}, "C:/Users/sespi/CascadeProjects/web_sesec_2025/src/components/LoadingSpinner.astro", void 0);

const $$Astro$1 = createAstro("https://sesecpro.com");
const $$Button = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Button;
  const {
    variant = "primary",
    size = "md",
    href,
    type = "button",
    disabled = false,
    loading = false,
    icon,
    iconPosition = "left",
    fullWidth = false,
    className = "",
    target,
    rel,
    ariaLabel
  } = Astro2.props;
  const isLink = !!href;
  const Tag = isLink ? "a" : "button";
  const baseClasses = "btn";
  const variantClasses = {
    primary: "btn-primary",
    secondary: "btn-secondary",
    outline: "btn-outline",
    ghost: "btn-ghost"
  };
  const sizeClasses = {
    sm: "btn-sm",
    md: "btn-md",
    lg: "btn-lg"
  };
  const classes = [
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    fullWidth && "btn-full-width",
    disabled && "btn-disabled",
    loading && "btn-loading",
    "btn-hover-lift",
    "micro-hover",
    "ripple-effect",
    className
  ].filter(Boolean).join(" ");
  const linkProps = isLink ? {
    href,
    target,
    rel: target === "_blank" ? "noopener noreferrer" : rel
  } : {};
  const buttonProps = !isLink ? {
    type,
    disabled: disabled || loading
  } : {};
  return renderTemplate`${renderComponent($$result, "Tag", Tag, { "class": classes, "aria-label": ariaLabel, "aria-disabled": disabled || loading, ...linkProps, ...buttonProps, "data-astro-cid-vnzlvqnm": true }, { "default": ($$result2) => renderTemplate`${loading && renderTemplate`${renderComponent($$result2, "LoadingSpinner", $$LoadingSpinner, { "size": size === "lg" ? "md" : "sm", "variant": "secondary", "inline": true, "data-astro-cid-vnzlvqnm": true })}`}${!loading && icon && iconPosition === "left" && renderTemplate`${maybeRenderHead()}<span class="btn-icon btn-icon-left" aria-hidden="true" data-astro-cid-vnzlvqnm>${icon}</span>`}<span${addAttribute(`btn-content ${loading ? "btn-content-loading" : ""}`, "class")} data-astro-cid-vnzlvqnm> ${renderSlot($$result2, $$slots["default"])} </span> ${!loading && icon && iconPosition === "right" && renderTemplate`<span class="btn-icon btn-icon-right" aria-hidden="true" data-astro-cid-vnzlvqnm>${icon}</span>`}` })} `;
}, "C:/Users/sespi/CascadeProjects/web_sesec_2025/src/components/Button.astro", void 0);

const $$Astro = createAstro("https://sesecpro.com");
const $$BigCTA = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$BigCTA;
  const {
    title,
    subtitle,
    primaryButton,
    secondaryButton,
    background = "gradient",
    size = "normal"
  } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<section${addAttribute(`big-cta big-cta-${background} big-cta-${size}`, "class")} data-astro-cid-mh4kda3n> <div class="big-cta-container" data-astro-cid-mh4kda3n> <div class="big-cta-content" data-astro-cid-mh4kda3n> <div class="big-cta-text" data-astro-cid-mh4kda3n> <h2 class="big-cta-title" data-astro-cid-mh4kda3n>${title}</h2> ${subtitle && renderTemplate`<p class="big-cta-subtitle" data-astro-cid-mh4kda3n>${subtitle}</p>`} </div> <div class="big-cta-actions" data-astro-cid-mh4kda3n> ${renderComponent($$result, "Button", $$Button, { "href": primaryButton.href, "variant": primaryButton.variant || "primary", "size": "lg", "icon": "\u2197", "iconPosition": "right", "className": "big-cta-primary-btn", "ariaLabel": `${primaryButton.text} - Ir a ${primaryButton.href}`, "data-astro-cid-mh4kda3n": true }, { "default": ($$result2) => renderTemplate`${primaryButton.text}` })} ${secondaryButton && renderTemplate`${renderComponent($$result, "Button", $$Button, { "href": secondaryButton.href, "variant": secondaryButton.variant || "outline", "size": "lg", "className": "big-cta-secondary-btn", "ariaLabel": `${secondaryButton.text} - Ir a ${secondaryButton.href}`, "data-astro-cid-mh4kda3n": true }, { "default": ($$result2) => renderTemplate`${secondaryButton.text}` })}`} </div> </div> <!-- Elementos decorativos --> <div class="big-cta-decoration" data-astro-cid-mh4kda3n> <div class="decoration-circle decoration-circle-1" data-astro-cid-mh4kda3n></div> <div class="decoration-circle decoration-circle-2" data-astro-cid-mh4kda3n></div> <div class="decoration-line decoration-line-1" data-astro-cid-mh4kda3n></div> <div class="decoration-line decoration-line-2" data-astro-cid-mh4kda3n></div> </div> </div> </section> `;
}, "C:/Users/sespi/CascadeProjects/web_sesec_2025/src/components/BigCTA.astro", void 0);

export { $$BigCTA as $, $$Button as a };
