import{A as t}from"./_astro-entry_sonner.D8te0avd.js";import"./hoisted.BUJd2Lku.js";import"./index.CW0uNVXs.js";const e=window.location.origin,r=document.getElementsByClassName("copy-shortened-url");if(r)for(const a of r)a.onclick=o=>{if(o.target?.value)try{window.navigator.clipboard.writeText(`${e}/${o.target.value}`),t.success("URL copiada al portapapeles!")}catch{t.error("No se pudo copiar la URL al portapapeles")}};
