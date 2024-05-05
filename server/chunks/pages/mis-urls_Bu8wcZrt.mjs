import { c as createAstro, d as createComponent, r as renderTemplate, m as maybeRenderHead, s as spreadAttributes, e as renderComponent, f as addAttribute } from '../astro_DMkAxNXf.mjs';
import { g as getSession } from './__C5iiSQvV.mjs';
import { $ as $$Layout } from './index_Bqr8go77.mjs';
import { g as getUserByEmail, a as getUrlsFromUser } from './_code__C1VEFFcA.mjs';
/* empty css                             */

const $$Astro$1 = createAstro("https://talingo.github.io");
const $$ArrowBack = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$ArrowBack;
  return renderTemplate`${maybeRenderHead()}<svg${spreadAttributes(Astro2.props)} xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-arrow-back-up" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round"> <path stroke="none" d="M0 0h24v24H0z" fill="none"></path> <path d="M9 14l-4 -4l4 -4"></path> <path d="M5 10h11a4 4 0 1 1 0 8h-1"></path> </svg>`;
}, "/home/runner/work/acortador-urls-astro/acortador-urls-astro/src/components/icons/ArrowBack.astro", void 0);

const $$Astro = createAstro("https://talingo.github.io");
const $$MisUrls = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$MisUrls;
  const session = await getSession(Astro2.request);
  const h1 = session ? `URLs acortadas de ${session.user?.name?.split(" ")[0]}` : "Inicia sesi\xF3n para ver tus URLs acortadas";
  let urls = [];
  if (session && session.user?.email) {
    const user = await getUserByEmail(session.user.email);
    if (user.success && user.data) {
      const urlsRes = await getUrlsFromUser(user.data?.id);
      if (urlsRes.success && urlsRes.data) {
        urls = urlsRes.data.map((url) => url);
      }
    }
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Mis URLs acortadas", "data-astro-cid-y3eybi4c": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<a href="/" data-astro-cid-y3eybi4c> ${renderComponent($$result2, "ArrowBack", $$ArrowBack, { "class": "icon", "data-astro-cid-y3eybi4c": true })}
Ir al inicio
</a> <h1 data-astro-cid-y3eybi4c>${h1}</h1> <ul data-astro-cid-y3eybi4c> ${urls.map((url) => renderTemplate`<li data-astro-cid-y3eybi4c> <span data-astro-cid-y3eybi4c>${url.url}</span> <button${addAttribute(url.code, "value")} class="copy-shortened-url" data-astro-cid-y3eybi4c>Copy the shortened URL</button> </li>`)} </ul> ` })}  `;
}, "/home/runner/work/acortador-urls-astro/acortador-urls-astro/src/pages/mis-urls.astro", void 0);

const $$file = "/home/runner/work/acortador-urls-astro/acortador-urls-astro/src/pages/mis-urls.astro";
const $$url = "/mis-urls";

export { $$MisUrls as default, $$file as file, $$url as url };
