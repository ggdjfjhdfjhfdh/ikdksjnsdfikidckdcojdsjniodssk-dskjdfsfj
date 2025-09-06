import { c as createAstro, a as createComponent, m as maybeRenderHead, e as addAttribute, b as renderComponent, F as Fragment, r as renderTemplate } from './astro/server.BfJUwr4X.js';
import 'kleur/colors';
/* empty css                        */

const $$Astro = createAstro("https://sesecpro.com");
const $$Timeline = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Timeline;
  const { steps } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="timeline" data-astro-cid-zhxkjw2l> <div class="timeline-line" id="timeline-line" data-astro-cid-zhxkjw2l></div> ${steps.map((step, index) => renderTemplate`<div${addAttribute(`timeline-item fade-in stagger-${index + 1}`, "class")}${addAttribute(index, "data-step")} data-astro-cid-zhxkjw2l> <div class="timeline-marker" data-astro-cid-zhxkjw2l> <div class="timeline-dot" data-astro-cid-zhxkjw2l> <svg class="timeline-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-astro-cid-zhxkjw2l> ${index === 0 && renderTemplate`<!-- Recon -->
              ${renderComponent($$result, "Fragment", Fragment, { "data-astro-cid-zhxkjw2l": true }, { "default": ($$result2) => renderTemplate` <circle cx="11" cy="11" r="8" data-astro-cid-zhxkjw2l></circle> <path d="M21 21l-4.35-4.35" data-astro-cid-zhxkjw2l></path> ` })}`} ${index === 1 && renderTemplate`<!-- Pentest -->
              ${renderComponent($$result, "Fragment", Fragment, { "data-astro-cid-zhxkjw2l": true }, { "default": ($$result2) => renderTemplate` <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" data-astro-cid-zhxkjw2l></path> <path d="M9 12l2 2 4-4" data-astro-cid-zhxkjw2l></path> ` })}`} ${index === 2 && renderTemplate`<!-- Implementación -->
              ${renderComponent($$result, "Fragment", Fragment, { "data-astro-cid-zhxkjw2l": true }, { "default": ($$result2) => renderTemplate` <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" data-astro-cid-zhxkjw2l></path> ` })}`} ${index === 3 && renderTemplate`<!-- Mantenimiento -->
              ${renderComponent($$result, "Fragment", Fragment, { "data-astro-cid-zhxkjw2l": true }, { "default": ($$result2) => renderTemplate` <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" data-astro-cid-zhxkjw2l></path> <circle cx="12" cy="12" r="1" data-astro-cid-zhxkjw2l></circle> ` })}`} </svg> </div> </div> <div class="timeline-content" data-astro-cid-zhxkjw2l> <div class="timeline-header" data-astro-cid-zhxkjw2l> <h3 class="timeline-title" data-astro-cid-zhxkjw2l>${step.title}</h3> ${step.duration && renderTemplate`<span class="timeline-duration" data-astro-cid-zhxkjw2l>${step.duration}</span>`} </div> <p class="timeline-description" data-astro-cid-zhxkjw2l>${step.description}</p> </div> </div>`)} </div>  `;
}, "C:/Users/sespi/CascadeProjects/web_sesec_2025/src/components/Timeline.astro", void 0);

export { $$Timeline as $ };
