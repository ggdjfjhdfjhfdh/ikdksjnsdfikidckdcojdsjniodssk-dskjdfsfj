import { c as createAstro, a as createComponent, m as maybeRenderHead, e as addAttribute, r as renderTemplate } from './astro/server.BfJUwr4X.js';
import 'kleur/colors';
import 'clsx';
/* empty css                        */

const $$Astro = createAstro("https://sesecpro.com");
const $$LogoStrip = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$LogoStrip;
  const {
    logos,
    speed = "normal",
    direction = "left",
    pauseOnHover = true
  } = Astro2.props;
  const displayLogos = logos;
  return renderTemplate`${maybeRenderHead()}<div${addAttribute(`logo-strip ${pauseOnHover ? "pause-on-hover" : ""}`, "class")} data-astro-cid-al6a75xv> <div class="logo-strip-track"${addAttribute(speed, "data-speed")}${addAttribute(direction, "data-direction")} data-astro-cid-al6a75xv> ${displayLogos.map((logo, index) => renderTemplate`<div class="logo-item"${addAttribute(`${logo.name}-${index}`, "key")} data-astro-cid-al6a75xv> <img${addAttribute(logo.src, "src")}${addAttribute(logo.alt, "alt")}${addAttribute(logo.width || 120, "width")}${addAttribute(logo.height || 60, "height")} loading="lazy" class="logo-image" data-astro-cid-al6a75xv> </div>`)} </div> </div>  `;
}, "C:/Users/sespi/CascadeProjects/web_sesec_2025/src/components/LogoStrip.astro", void 0);

export { $$LogoStrip as $ };
