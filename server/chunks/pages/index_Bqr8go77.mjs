import { c as createAstro, d as createComponent, r as renderTemplate, m as maybeRenderHead, s as spreadAttributes, e as renderComponent, f as addAttribute, g as renderHead, h as renderSlot } from '../astro_DMkAxNXf.mjs';
import { g as getUserByEmail, d as db, U as User } from './_code__C1VEFFcA.mjs';
import { jsxs, jsx } from 'react/jsx-runtime';
import { useState, useRef } from 'react';
import { toast } from 'sonner';
import { g as getSession } from './__C5iiSQvV.mjs';
/* empty css                          */
/* empty css                          */

const $$Astro$4 = createAstro("https://talingo.github.io");
const $$ChevronDown = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$ChevronDown;
  return renderTemplate`${maybeRenderHead()}<svg${spreadAttributes(Astro2.props)} xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-chevron-down" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="white" stroke-linecap="round" stroke-linejoin="round"> <path stroke="none" d="M0 0h24v24H0z" fill="none"></path> <path d="M6 9l6 6l6 -6"></path> </svg>`;
}, "/home/runner/work/acortador-urls-astro/acortador-urls-astro/src/components/icons/ChevronDown.astro", void 0);

const $$Astro$3 = createAstro("https://talingo.github.io");
const $$Header = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$Header;
  const session = await getSession(Astro2.request);
  if (session && session.user?.email && session.user?.name) {
    const res = await getUserByEmail(session.user.email);
    if (res.success && !res.data) {
      await db.insert(User).values({
        email: session.user.email,
        name: session.user.name
      });
    }
  }
  return renderTemplate`${maybeRenderHead()}<header data-astro-cid-3ef6ksr2> ${session ? renderTemplate`<div id="dropdown-menu" data-astro-cid-3ef6ksr2> <div id="dropdown-label" data-astro-cid-3ef6ksr2> <span data-astro-cid-3ef6ksr2>${session.user?.name ? session.user?.name.split(" ")[0] : ""}</span> <span id="chevron" data-astro-cid-3ef6ksr2> ${renderComponent($$result, "ChevronDown", $$ChevronDown, { "color": "white", "width": "24", "heigth": "24", "data-astro-cid-3ef6ksr2": true })} </span> </div> <div id="dropdown-content" data-astro-cid-3ef6ksr2> <nav data-astro-cid-3ef6ksr2> <ul data-astro-cid-3ef6ksr2> <li data-astro-cid-3ef6ksr2> <a href="/my-urls" data-astro-cid-3ef6ksr2>
Ver mis URLs
</a> </li> <li data-astro-cid-3ef6ksr2> <button id="logout" data-astro-cid-3ef6ksr2>Logout</button> </li> </ul> </nav> </div> </div>` : renderTemplate`<button id="login" data-astro-cid-3ef6ksr2>Login</button>`} </header>  `;
}, "/home/runner/work/acortador-urls-astro/acortador-urls-astro/src/components/Header.astro", void 0);

const $$Astro$2 = createAstro("https://talingo.github.io");
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Layout;
  const { title } = Astro2.props;
  return renderTemplate`<html lang="es"> <head><meta charset="UTF-8"><meta name="description" content="Astro description"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>${title}</title>${renderHead()}</head> <body> ${renderComponent($$result, "Header", $$Header, {})} <main> ${renderSlot($$result, $$slots["default"])} </main> ${renderComponent($$result, "Toaster", null, { "richColors": true, "client:only": "react", "client:component-hydration": "only", "client:component-path": "sonner", "client:component-export": "Toaster" })} </body></html>`;
}, "/home/runner/work/acortador-urls-astro/acortador-urls-astro/src/layouts/Layout.astro", void 0);

function validarURL(url) {
  const urlRegex = /^(ftp|http|https):\/\/[^ "]+\.[a-zA-Z]{2,}(\/\S*)?$/;
  return urlRegex.test(url);
}
function ShorterURL({ userId }) {
  const [url, setUrl] = useState();
  const [error, setError] = useState();
  const shortenedUrlRef = useRef(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!url) {
      setError("Debes escribir una URL");
      return;
    }
    if (!validarURL(url)) {
      setError("Debes escribir una URL válida");
      return;
    }
    try {
      const res = await fetch("/api/shorter-url", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          url,
          userId: userId ?? null
        })
      });
      const body = await res.json();
      const shortenedUrl = body.shortenedUrl;
      if (!shortenedUrl) {
        setError("Error al acortar la URL, inténtalo de nuevo más tarde");
        return;
      }
      shortenedUrlRef.current.value = shortenedUrl;
      setError(void 0);
    } catch {
      setError("Error al acortar la URL, inténtalo de nuevo más tarde");
    }
  };
  const handleCopy = () => {
    try {
      window.navigator.clipboard.writeText(shortenedUrlRef.current.value);
      toast.success("URL copiada al portapapeles");
    } catch (e) {
      toast.error("Error al copiar la URL");
    }
  };
  return /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, id: "shorter-url-form", children: [
    error && /* @__PURE__ */ jsx("span", { className: "shorter-url-form-error", children: error }),
    /* @__PURE__ */ jsx(
      "input",
      {
        className: "shorter-url-form-input",
        type: "url",
        placeholder: "Escribe aquí tu URL",
        defaultValue: url,
        onChange: (e) => setUrl(e.target.value)
      }
    ),
    /* @__PURE__ */ jsx(
      "button",
      {
        className: "shorter-url-form-button",
        type: "submit",
        children: "Acortar URL"
      }
    ),
    /* @__PURE__ */ jsx(
      "input",
      {
        ref: shortenedUrlRef,
        className: "shorter-url-form-input",
        disabled: true,
        type: "url"
      }
    ),
    /* @__PURE__ */ jsx(
      "button",
      {
        onClick: handleCopy,
        className: "shorter-url-form-button",
        type: "button",
        children: "Copiar URL"
      }
    )
  ] });
}

const $$Astro$1 = createAstro("https://talingo.github.io");
const $$ShorterURL = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$ShorterURL;
  const session = await getSession(Astro2.request);
  let userId;
  if (session && session.user?.email) {
    const res = await getUserByEmail(session.user.email);
    if (res.success && res.data) {
      userId = res.data.id;
    }
  }
  return renderTemplate`${maybeRenderHead()}<section> ${renderComponent($$result, "ShorterURLReact", ShorterURL, { "userId": userId, "client:load": true, "client:component-hydration": "load", "client:component-path": "/home/runner/work/acortador-urls-astro/acortador-urls-astro/src/components/ShorterURL", "client:component-export": "default" })} </section> `;
}, "/home/runner/work/acortador-urls-astro/acortador-urls-astro/src/components/ShorterURL.astro", void 0);

const $$Astro = createAstro("https://talingo.github.io");
const $$Index = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Welcome to Astro." }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<h1>Acortador de URLs</h1> ${renderComponent($$result2, "ShorterURL", $$ShorterURL, {})} ` })}`;
}, "/home/runner/work/acortador-urls-astro/acortador-urls-astro/src/pages/index.astro", void 0);

const $$file = "/home/runner/work/acortador-urls-astro/acortador-urls-astro/src/pages/index.astro";
const $$url = "";

const index = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { $$Layout as $, index as i };
