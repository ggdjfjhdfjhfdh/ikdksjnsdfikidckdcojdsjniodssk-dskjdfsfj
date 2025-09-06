import { c as createAstro, a as createComponent, m as maybeRenderHead, b as renderComponent, r as renderTemplate } from './astro/server.BfJUwr4X.js';
import 'kleur/colors';
import { a as $$Button } from './BigCTA.DLetS6Ty.js';
/* empty css                           */

const $$Astro = createAstro("https://sesecpro.com");
const $$ContactForm = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$ContactForm;
  const {
    title = "Contacta con nosotros",
    subtitle = "Cu\xE9ntanos sobre tu proyecto y te responderemos en menos de 24 horas.",
    submitText = "Enviar mensaje",
    successMessage = "\xA1Mensaje enviado! Te contactaremos pronto."
  } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="contact-form-wrapper" data-astro-cid-svshx33u> ${(title || subtitle) && renderTemplate`<div class="contact-form-header" data-astro-cid-svshx33u> ${title && renderTemplate`<h2 class="contact-form-title" data-astro-cid-svshx33u>${title}</h2>`} ${subtitle && renderTemplate`<p class="contact-form-subtitle" data-astro-cid-svshx33u>${subtitle}</p>`} </div>`} <form class="contact-form" id="contact-form" novalidate data-astro-cid-svshx33u> <div class="form-group" data-astro-cid-svshx33u> <label for="name" class="form-label" data-astro-cid-svshx33u>
Nombre completo
<span class="required" data-astro-cid-svshx33u>*</span> </label> <input type="text" id="name" name="name" class="form-input focus-ring" required autocomplete="name" placeholder="Tu nombre completo" data-astro-cid-svshx33u> <div class="form-error" id="name-error" data-astro-cid-svshx33u></div> </div> <div class="form-group" data-astro-cid-svshx33u> <label for="email" class="form-label" data-astro-cid-svshx33u>
Email
<span class="required" data-astro-cid-svshx33u>*</span> </label> <input type="email" id="email" name="email" class="form-input focus-ring" required autocomplete="email" placeholder="tu@empresa.com" data-astro-cid-svshx33u> <div class="form-error" id="email-error" data-astro-cid-svshx33u></div> </div> <div class="form-group" data-astro-cid-svshx33u> <label for="message" class="form-label" data-astro-cid-svshx33u>
Mensaje
<span class="required" data-astro-cid-svshx33u>*</span> </label> <textarea id="message" name="message" class="form-textarea focus-ring" required rows="5" placeholder="Cuéntanos sobre tu proyecto, necesidades de ciberseguridad o cualquier consulta..." data-astro-cid-svshx33u></textarea> <div class="form-error" id="message-error" data-astro-cid-svshx33u></div> </div> ${renderComponent($$result, "Button", $$Button, { "type": "submit", "variant": "primary", "size": "lg", "fullWidth": true, "icon": "\u2709", "iconPosition": "right", "className": "btn-submit", "ariaLabel": "Enviar formulario de contacto", "data-astro-cid-svshx33u": true }, { "default": async ($$result2) => renderTemplate`${submitText}` })} </form> <!-- Estado de éxito --> <div class="success-state" id="success-state" data-astro-cid-svshx33u> <div class="success-icon" data-astro-cid-svshx33u> <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-astro-cid-svshx33u> <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" data-astro-cid-svshx33u></path> <polyline points="22,4 12,14.01 9,11.01" data-astro-cid-svshx33u></polyline> </svg> </div> <h3 class="success-title" data-astro-cid-svshx33u>¡Mensaje enviado!</h3> <p class="success-message" data-astro-cid-svshx33u>${successMessage}</p> ${renderComponent($$result, "Button", $$Button, { "type": "button", "variant": "outline", "size": "md", "className": "send-another-btn", "ariaLabel": "Enviar otro mensaje", "data-astro-cid-svshx33u": true }, { "default": async ($$result2) => renderTemplate`
Enviar otro mensaje
` })} </div> </div>  `;
}, "C:/Users/sespi/CascadeProjects/web_sesec_2025/src/components/ContactForm.astro", void 0);

export { $$ContactForm as $ };
