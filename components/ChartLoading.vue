<template>
  <div ref="chartLoading" class="h-80"></div>
</template>
<script>
import lottie from "lottie-web";
export default {
  name: "Loading",
  mounted() {
    lottie.loadAnimation({
      container: this.$refs.chartLoading,
      renderer: "canvas",
      loop: true,
      autoplay: true,

      path: "/lottie/chart-loading.json",
    });
  },
};
</script>
