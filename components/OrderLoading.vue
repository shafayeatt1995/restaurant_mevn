<template>
  <div ref="OrderLoading"></div>
</template>

<script>
export default {
  name: "OrderLoading",
  async mounted() {
    if (process.client) {
      await this.loadLottieScript();
      this.initializeAnimation();
    }
  },
  methods: {
    loadLottieScript() {
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
        container: this.$refs.OrderLoading,
        renderer: "canvas",
        loop: true,
        autoplay: true,
        path: "/lottie/hurrah.json",
      });
    },
  },
};
</script>
