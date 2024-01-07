<template>
  <div ref="loading" class="h-80"></div>
</template>
<script>
import lottie from "lottie-web";
export default {
  name: "Loading",
  mounted() {
    lottie.loadAnimation({
      container: this.$refs.loading,
      renderer: "canvas",
      loop: true,
      autoplay: true,

      path: "/lottie/loading.json",
    });
  },
};
</script>
