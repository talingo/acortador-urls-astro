import { defineConfig } from 'astro/config';
import node from "@astrojs/node";
import auth from "auth-astro";
import db from "@astrojs/db";
import react from "@astrojs/react";


const SERVER_PORT = 3000;
// the url to access your blog during local development
const LOCALHOST_URL = `http://localhost:${SERVER_PORT}`;
// the url to access your blog after deploying it somewhere (Eg. Netlify)
const LIVE_URL = "https://talingo.github.io";
// this is the astro command your npm script runs
const isBuild = SCRIPT.includes("astro build");
let BASE_URL = LOCALHOST_URL;
// When you're building your site in local or in CI, you could just set your URL manually
if (isBuild) {
  BASE_URL = LIVE_URL;
}


// https://astro.build/config
export default defineConfig({  
  server: { port: SERVER_PORT },
  site: BASE_URL,
  base: 'acortador',
  output: "server",
  adapter: node({
    mode: "standalone"
  }),
  integrations: [auth(), db(), react()]
});