<template>
  <section class="bg-white">
    <div
      class="container min-h-screen px-6 py-12 mx-auto flex lg:items-center flex-col-reverse lg:flex-row justify-end"
    >
      <div class="wf-ull lg:w-1/3">
        <p class="text-sm font-medium text-blue-500">404 error</p>
        <h1 class="mt-3 text-2xl font-semibold text-gray-700 md:text-3xl">
          Page not found
        </h1>
        <p class="mt-4 text-gray-500">
          Sorry, the page you are looking for doesn't exist. Here are some
          helpful links:
        </p>

        <div class="flex items-center mt-6 gap-x-3" v-if="!menuRoute">
          <button
            @click="goBack"
            class="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 sm:w-auto hover:bg-gray-100"
          >
            <i class="fas fa-arrow-left-long"></i>
            <span>Go back</span>
          </button>

          <nuxt-link
            :to="{ name: 'dashboard' }"
            class="w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-green-500 rounded-lg shrink-0 sm:w-auto hover:bg-green-600"
          >
            Take me home
          </nuxt-link>
        </div>
      </div>

      <div class="relative w-full mt-12 lg:w-2/3 lg:mt-0" ref="error"></div>
    </div>
  </section>
</template>

<script>
export default {
  name: "NotFound",
  data() {
    return {
      menuRoute: true,
    };
  },
  async mounted() {
    if (process.client) {
      await this.loadLottieScript();
      this.initializeAnimation();
    }
    this.setRoute(this.$route.name === "menu-slug-table");
  },
  methods: {
    async loadLottieScript() {
      return new Promise((resolve, reject) => {
        if (window.lottie) {
          resolve();
        } else {
          const script = document.createElement("script");
          script.src = "/js/lottie.min.js";
          script.onload = resolve;
          script.onerror = reject;
          document.body.appendChild(script);
        }
      });
    },
    initializeAnimation() {
      window.lottie.loadAnimation({
        container: this.$refs.error,
        renderer: "canvas",
        loop: true,
        autoplay: true,
        path: "/lottie/404.json",
      });
    },
    goBack() {
      window.history.back();
    },
    setRoute(val) {
      this.menuRoute = val;
    },
  },
};
</script>

<style>
body {
  font-family: "Nunito", sans-serif;
}
</style>
