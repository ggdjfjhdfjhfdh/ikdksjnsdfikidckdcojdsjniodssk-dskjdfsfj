import { c as createAstro, a as createComponent, m as maybeRenderHead, e as addAttribute, r as renderTemplate, b as renderComponent, F as Fragment } from './astro/server.BfJUwr4X.js';
import 'kleur/colors';
/* empty css                        */

const $$Astro = createAstro("https://sesecpro.com");
const $$Card = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Card;
  const {
    variant = "service",
    icon,
    title,
    description,
    link,
    image,
    author
  } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div${addAttribute(`card card-${variant} card-hover micro-hover scroll-reveal`, "class")} data-astro-cid-dohjnao5> ${image && renderTemplate`<div class="card-image" data-astro-cid-dohjnao5> <img${addAttribute(image, "src")}${addAttribute(title, "alt")} loading="lazy" decoding="async" width="400" height="250" data-astro-cid-dohjnao5> </div>`} <div class="card-content" data-astro-cid-dohjnao5> ${icon && renderTemplate`<div class="card-icon icon-bounce" aria-hidden="true" data-astro-cid-dohjnao5> <svg class="icon" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" data-astro-cid-dohjnao5> <!-- Icono genérico - se puede personalizar por tipo --> ${variant === "service" && renderTemplate`${renderComponent($$result, "Fragment", Fragment, { "data-astro-cid-dohjnao5": true }, { "default": ($$result2) => renderTemplate` <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" data-astro-cid-dohjnao5></path> <path d="M9 12l2 2 4-4" data-astro-cid-dohjnao5></path> ` })}`} ${variant === "case" && renderTemplate`${renderComponent($$result, "Fragment", Fragment, { "data-astro-cid-dohjnao5": true }, { "default": ($$result2) => renderTemplate` <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" data-astro-cid-dohjnao5></path> <polyline points="14,2 14,8 20,8" data-astro-cid-dohjnao5></polyline> <line x1="16" y1="13" x2="8" y2="13" data-astro-cid-dohjnao5></line> <line x1="16" y1="17" x2="8" y2="17" data-astro-cid-dohjnao5></line> <polyline points="10,9 9,9 8,9" data-astro-cid-dohjnao5></polyline> ` })}`} ${variant === "value" && renderTemplate`${renderComponent($$result, "Fragment", Fragment, { "data-astro-cid-dohjnao5": true }, { "default": ($$result2) => renderTemplate` <path d="M22 12h-4l-3 9L9 3l-3 9H2" data-astro-cid-dohjnao5></path> ` })}`} </svg> </div>`} <div class="card-body" data-astro-cid-dohjnao5> <h3 class="card-title" data-astro-cid-dohjnao5>${title}</h3> <p class="card-description" data-astro-cid-dohjnao5>${description}</p> ${author && renderTemplate`<div class="card-author" data-astro-cid-dohjnao5> ${author.avatar && renderTemplate`<img${addAttribute(author.avatar, "src")}${addAttribute(author.name, "alt")} class="author-avatar" data-astro-cid-dohjnao5>`} <div class="author-info" data-astro-cid-dohjnao5> <div class="author-name" data-astro-cid-dohjnao5>${author.name}</div> <div class="author-role" data-astro-cid-dohjnao5>${author.role}</div> </div> </div>`} ${link && renderTemplate`<a${addAttribute(link.href, "href")} class="card-link focus-ring" data-astro-cid-dohjnao5> ${link.text} <svg class="link-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-astro-cid-dohjnao5> <path d="M7 17l9.2-9.2M17 17V7H7" data-astro-cid-dohjnao5></path> </svg> </a>`} </div> </div> </div> `;
}, "C:/Users/sespi/CascadeProjects/web_sesec_2025/src/components/Card.astro", void 0);

export { $$Card as $ };
