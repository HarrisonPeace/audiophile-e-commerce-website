import path from "path";

export default defineNuxtConfig({
  modules: [
    "@nuxtjs/tailwindcss",
    "@vueuse/nuxt",
    "@nuxtjs/tailwindcss",
    "@nuxt/image",
    "@pinia/nuxt",
    "@formkit/nuxt",
  ],
  app: {
    pageTransition: { name: "page", mode: "out-in" },
    head: {
      link: [
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "anonymous" },
        {
          href: "https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;700&display=swap",
          rel: "stylesheet",
        },
        { rel: "shortcut icon", href: "/favicon.png", type: "image/x-icon" },
      ],
    },
  },
  css: ["~/assets/scss/main.scss"],
  alias: {
    "@interfaces": path.resolve(__dirname, "interfaces"),
    "@data": path.resolve(__dirname, "data"),
    "@enums": path.resolve(__dirname, "enums"),
  },
  typescript: {
    strict: true,
    typeCheck: true,
  },
  devtools: {
    enabled: true,
    timeline: {
      enabled: true,
    },
  },
  plugins: ["./plugins/clickOutside.js"],
});
