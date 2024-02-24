export default {
  ssr: process.env.MODE === "universal" ? true : false, //universal / spa
  target: process.env.TARGET ?? "server", // static / server
  generate: { interval: 1000 },
  server: {
    host: process.env.HOST || "0.0.0.0",
    port: process.env.PORT || 8080,
  },
  head: {
    htmlAttrs: { lang: "en" },
    title: process.env.APP_NAME || "ScanEating",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "google-site-verification",
        name: "google-site-verification",
        content: "bBTEENwGTjrNQd2J2XMpGO_tkmbAWM5mYAp3o0zUAPM",
      },
      {
        hid: "description",
        name: "description",
        content:
          "ScanEating is a alternate of restaurant traditional menu card. It is complete digital menu solution",
      },
      {
        hid: "keyword",
        name: "keyword",
        content:
          "scan, eat, scaneat, scan eat, eating, scaneating, scan eating, menu, restaurant qr menu, qr menu, emenu, digital menu, virtual menu, menu scanner, menu scanning, digital scanner menu, digital scanning menu, complete digital menu solution, Restaurant menu, restaurant, restaurant scanner, restaurant scanning, restaurant qr code scanner, qr code scanner",
      },
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.jpeg" },
      // {
      //   rel: "stylesheet",
      //   href: "https://fonts.googleapis.com/css2?family=Nunito:wght@200;300;400;500;600;700;800;900;1000&display=swap",
      // },
    ],
    script: [
      {
        src: `/gtag-head.js`,
        head: true,
      },
      {
        async: true,
        src: `https://www.googletagmanager.com/gtag/js?id=G-LT5BZHN3QJ`,
        body: true,
      },
      {
        type: "text/javascript",
        src: `/gtag.js`,
        body: true,
      },
    ],
  },

  css: [],

  // pageTransition: { name: "fade", mode: "out-in" },

  plugins: [
    "~/plugins",
    "~/plugins/api.js",
    "~/plugins/filter.js",
    "~/plugins/slide.js",
    { src: "~/plugins/toast.js", mode: "client" },
    { src: "~/plugins/apexChart.js", mode: "client" },
    { src: "~/plugins/datePicker.js", mode: "client" },
    { src: "~/plugins/carousel.js", mode: "client" },
    { src: "~/plugins/google-fonts.js", mode: "client" },
  ],

  components: true,

  buildModules: [
    "@nuxtjs/tailwindcss",
    // "@nuxtjs/fontawesome",
    "@nuxtjs/dotenv",
    "@/modules/generator",
  ],

  // fontawesome: {
  //   component: "i",
  //   icons: {
  //     solid: true,
  //     regular: true,
  //     brands: true,
  //   },
  // },

  modules: [
    "@nuxtjs/axios",
    "@nuxtjs/pwa",
    "@nuxtjs/auth-next",
    "nuxt-client-init-module",
    "vue2-editor/nuxt",
    "nuxt-svg-loader",
    "@nuxtjs/sitemap",
  ],

  sitemap: {
    hostname: "https://scaneating.com",
    gzip: true,
    exclude: [],
    defaults: { changefreq: "daily", priority: 1, lastmod: new Date() },
  },

  axios: { proxy: true },

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
      home: "/dashboard",
      logout: "/auth/login",
      login: "/auth/login",
      callback: "/auth/login",
    },
  },

  pwa: {
    icon: { fileName: "favicon.jpeg" },
    manifest: {
      lang: "en",
      name: process.env.APP_NAME || "ScanEating",
      short_name: process.env.APP_NAME || "ScanEating",
      start_url: "/dashboard",
      theme_color: "#1F2937",
      background_color: "#FFFFFF",
      orientation: "portrait",
    },
    workbox: { swTemplate: "static/sw.js" },
  },

  router: { middleware: ["auth"] },

  build: {
    extend(config, ctx) {
      if (ctx.isClient) {
        config.devtool = "source-map";
      }
    },
  },

  serverMiddleware: [{ path: "/api", handler: "~/backend" }],
};
