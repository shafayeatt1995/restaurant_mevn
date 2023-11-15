export default {
  ssr: process.env.MODE === "universal" ? true : false,
  server: {
    host: process.env.HOST || "localhost",
    port: process.env.PORT || 3000,
  },
  head: {
    title: process.env.APP_NAME || "Aniker Restaurant",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.png" }],
  },

  css: [],

  pageTransition: {
    name: "fade",
    mode: "out-in",
  },

  plugins: [
    "~/plugins/api.js",
    "~/plugins",
    { src: "./plugins/toast.js", ssr: false },
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
  ],

  axios: {
    baseURL: process.env.APP_URL,
    proxy: true,
  },

  publicRuntimeConfig: {
    axios: {
      browserBaseURL: process.env.APP_URL,
    },
  },

  privateRuntimeConfig: {
    axios: {
      baseURL: process.env.APP_URL,
    },
  },

  proxy: {
    "/laravel": {
      target: "/",
      pathRewrite: { "^/laravel": "/" },
    },
  },

  auth: {
    strategies: {
      cookie: {
        scheme: "refresh",
        url: "auth/",
        endpoints: {
          login: { url: "/auth/login", method: "post" },
          logout: { url: "/auth/logout", method: "get" },
          user: { url: "/user/profile", method: "get" },
          // refresh: { url: "/user/refresh-token", method: "get" },
        },
        autoLogout: true,
        user: { property: "user" },
        token: {
          property: "access_token",
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
      home: "/dashboard",
      logout: "/auth/login",
      login: "/auth/login",
      callback: "/auth/login",
    },
  },

  pwa: {
    icon: { fileName: "favicon.png" },
    manifest: {
      lang: "en",
      name: process.env.APP_NAME || "Aniker Restaurant",
    },
  },

  build: {},

  router: {
    middleware: ["auth"],
  },

  serverMiddleware: [{ path: "/api", handler: "@/backend/index.js" }],
};
