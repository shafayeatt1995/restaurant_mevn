<template>
  <div class="flex flex-col justify-center items-center h-screen w-screen">
    <div ref="loading" class="max-h-80"></div>
    <div class="flex justify-center">
      <p class="text-gray-700">We are checking your information</p>
    </div>
  </div>
</template>

<script>
import lottie from "lottie-web";
export default {
  name: "socialLogin",
  auth: false,
  mounted() {
    lottie.loadAnimation({
      container: this.$refs.loading,
      renderer: "canvas",
      loop: true,
      autoplay: true,

      path: "/lottie/social-login.json",
    });
  },
};
</script>
