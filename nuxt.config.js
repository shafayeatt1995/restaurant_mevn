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
          "Discover the future of dining with our restaurant QR code scanner menu app. Seamlessly browse digital menus, place orders, and enjoy a touchless dining experience. Explore our innovative solution today!",
      },
      {
        hid: "keyword",
        name: "keyword",
        content:
          "QR code menu, Digital menu, Restaurant menu app, QR code scanner, Menu scanning, Electronic menu, Restaurant technology, Menu management, Online ordering, Contactless menu, Touchless menu, Mobile menu, Menu display, Menu customization, Food ordering app, Restaurant software, Menu design, QR code ordering, Tabletop QR codes, Menu updates, Menu integration, Menu solutions, Menu system, Restaurant QR technology, Menu accessibility, Digital ordering, Menu optimization, Interactive menu, Menu platform, Menu innovation, Menu automation, QR code dining, Menu presentation, Digital dining experience, Menu analytics, Menu trends, Menu personalization, Menu branding, Menu scanning technology, Virtual menu, QR code technology, Menu refresh, Menu modernization, Menu navigation, QR code integration, Menu scanning app, Menu display options, Menu enhancement, Menu engagement, scan, eat, scaneat, scan eat, eating, scaneating, scan eating, menu, restaurant qr menu, qr menu, emenu, digital menu, virtual menu, menu scanner, menu scanning, digital scanner menu, digital scanning menu, complete digital menu solution, Restaurant menu, restaurant, restaurant scanner, restaurant scanning, restaurant qr code scanner, qr code scanner",
      },
      {
        hid: "og:title",
        property: "og:title",
        content: "Scan Eating - Complete Digital Menus Solution",
      },
      {
        hid: "og:description",
        property: "og:description",
        content:
          "Experience the future of dining with Scan Eating. Our innovative QR code scanner menu app offers a seamless, touchless dining experience. Explore menus, place orders, and enjoy",
      },
      {
        hid: "og:image",
        property: "og:image",
        content: `${process.env.BASE_URL}/og-image.webp`,
      },
      {
        hid: "twitter:image",
        name: "twitter:image",
        content: `${process.env.BASE_URL}/og-image.webp`,
      },
      {
        hid: "twitter:card",
        name: "twitter:card",
        content: `summary_large_image`,
      },
      {
        hid: "twitter:title",
        name: "twitter:title",
        content: `Scan Eating - Complete Digital Menus Solution`,
      },
      {
        hid: "twitter:description",
        name: "twitter:description",
        content: `Experience the future of dining with Scan Eating. Our innovative QR code scanner menu app offers a seamless, touchless dining experience. Explore menus, place orders, and enjoy`,
      },
      { name: "google-adsense-account", content: "ca-pub-3898820315557241" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.jpeg" }],
    script: [
      {
        head: true,
        src: "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3898820315557241",
        async: true,
        crossorigin: "anonymous",
      },
      {
        type: "text/javascript",
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

  plugins: [
    "~/plugins",
    "~/plugins/api.js",
    "~/plugins/filter.js",
    "~/plugins/slide.js",
    "~/plugins/global-variable.js",
    { src: "~/plugins/toast.js", mode: "client" },
    { src: "~/plugins/apexChart.js", mode: "client" },
    { src: "~/plugins/datePicker.js", mode: "client" },
    { src: "~/plugins/carousel.js", mode: "client" },
    { src: "~/plugins/google-fonts.js", mode: "client" },
    { src: "~/plugins/firebase.js", mode: "client" },
  ],

  components: true,

  buildModules: [
    "@nuxtjs/tailwindcss",
    "@nuxtjs/dotenv",
    "@/modules/generator",
    [
      "k-domains",
      {
        subDomains: [{ domain: "bd", path: "" }],
        rootDomain: { domain: "", path: "" },
      },
    ],
    ["@nuxtjs/router", { keepDefaultRouter: true }],
  ],

  modules: [
    "@nuxtjs/axios",
    "@nuxtjs/pwa",
    "@nuxtjs/auth-next",
    "nuxt-client-init-module",
    "vue2-editor/nuxt",
    "nuxt-svg-loader",
    "@nuxtjs/sitemap",
    "@nuxt/image",
  ],

  image: {
    domains: ["utfs.io", "lh3.googleusercontent.com"],
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536,
      "2xl": 1536,
    },
  },

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
      start_url: "/",
      theme_color: "#1F2937",
      background_color: "#FFFFFF",
      orientation: "portrait",
    },
    workbox: { swTemplate: "static/firebase-messaging-sw.js" },
  },

  router: { middleware: ["auth"] },

  build: {
    analyze: !!process.env.ANALYZE,
    extend(config, ctx) {
      if (ctx.isClient) {
        config.devtool = "source-map";
      }
    },
  },

  serverMiddleware: [{ path: "/api", handler: "~/backend" }],
};
