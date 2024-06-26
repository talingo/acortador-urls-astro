import { defineConfig } from 'astro/config';
import node from "@astrojs/node";
import auth from "auth-astro";
import db from "@astrojs/db";
import react from "@astrojs/react";



// https://astro.build/config
export default defineConfig({
  site: 'https://talingo.github.io',
  base: 'acortador',
  output: "server",
  adapter: node({
    mode: "standalone"
  }),
  integrations: [auth(), db(), react()]
});