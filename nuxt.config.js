export default {
  ssr: process.env.MODE === "universal" ? true : false,
  server: {
    host: process.env.HOST || "0.0.0.0",
    port: process.env.PORT || 8080,
  },
  head: {
    title: process.env.APP_NAME || "ScanEat",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content:
          "ScanEating is a alternate of restaurant restaurant traditional menu card. It is complete digital menu solution",
      },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.png" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Nunito:wght@200;300;400;500;600;700;800;900;1000&display=swap",
      },
    ],
  },

  css: [],

  pageTransition: { name: "fade", mode: "out-in" },

  plugins: [
    "~/plugins",
    "~/plugins/api.js",
    "~/plugins/filter.js",
    { src: "~/plugins/toast.js", ssr: false },
    // { src: "~/plugins/pwa.js", ssr: false },
  ],

  components: true,

  buildModules: [
    "@nuxtjs/tailwindcss",
    "@nuxtjs/fontawesome",
    "@nuxtjs/dotenv",
  ],

  fontawesome: {
    component: "font-awesome-icon",
    icons: {
      solid: true,
      regular: true,
      brands: true,
    },
  },

  modules: [
    "@nuxtjs/axios",
    "@nuxtjs/pwa",
    "@nuxtjs/auth-next",
    "nuxt-client-init-module",
    "vue2-editor/nuxt",
    "nuxt-svg-loader",
  ],

  axios: {
    proxy: true,
  },

  auth: {
    strategies: {
      cookie: {
        provider: "laravel/jwt",
        scheme: "refresh",
        url: "api/",
        endpoints: {
          login: { url: "auth/login", method: "post" },
          logout: { url: "auth/logout", method: "get" },
          user: { url: "user/profile", method: "get" },
        },
        autoLogout: true,
        user: { property: "user" },
        token: {
          property: "token",
          maxAge: 60 * 60 * 24 * 30,
          global: true,
          type: "Bearer",
        },
        refreshToken: {
          data: "refresh_token",
          maxAge: 60 * 60 * 24 * 30,
          tokenRequired: true,
          property: "refresh_token",
        },
      },
    },
    redirect: {
      home: "/auth/login",
      logout: "/auth/login",
      login: "/auth/login",
      callback: "/auth/login",
    },
  },

  pwa: {
    icon: { fileName: "favicon.png" },
    manifest: {
      lang: "en",
      name: process.env.APP_NAME || "ScanEat",
    },
  },

  router: { middleware: ["auth"] },

  build: {},

  serverMiddleware: [{ path: "/api", handler: "~/backend" }],
};
