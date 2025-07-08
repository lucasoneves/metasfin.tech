import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  runtimeConfig: {
    public: {
      apiBaseUrl:
        process.env.NUXT_PUBLIC_API_BASE_URL || "http://localhost:5000",
      googleClientId: process.env.NUXT_PUBLIC_GOOGLE_CLIENT_ID,
    },
  },
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
  modules: [
    [
      "@nuxtjs/google-fonts",
      {
        families: {
          Inter: [400, 700],
        },
      },
    ],
    "@nuxt/icon",
    "@pinia/nuxt",
  ],
  plugins: ["~/plugins/auth.client.js"],
});
