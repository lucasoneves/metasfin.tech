import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: { enabled: true },

  // app: {
  //   pageTransition: { name: "page", mode: "in-out" },
  // },
  app: {
    pageTransition: false,
    layoutTransition: false,
  },

  vite: {
    plugins: [tailwindcss(), tsconfigPaths()],
  },

  css: ["~/assets/css/main.css"],
  modules: [[
    "@nuxtjs/google-fonts",
    {
      families: {
        Inter: [400, 700],
      },
    },
  ], "@nuxt/icon"],
});