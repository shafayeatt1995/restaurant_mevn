<template>
  <div class="flex flex-col justify-center items-center h-screen w-screen">
    <div ref="loading" class="max-h-80"></div>
    <div class="flex justify-center">
      <p class="text-gray-700" @click="getDetails">
        We are checking your information
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "socialLogin",
  auth: false,
  async mounted() {
    await this.loadLottieAnimation();
    await this.getDetails();
  },
  methods: {
    loadLottieAnimation() {
      return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = "/js/lottie.min.js"; // Update the path to your local lottie.min.js file
        script.onload = () => {
          lottie.loadAnimation({
            container: this.$refs.loading,
            renderer: "canvas",
            loop: true,
            autoplay: true,
            path: "/lottie/social-login.json",
          });
          resolve();
        };
        script.onerror = reject;
        document.body.appendChild(script);
      });
    },
    async getDetails() {
      const socialLogin = window.localStorage.getItem("socialLogin");
      try {
        const { query } = this.$route;
        const { c, e } = query;
        if (e) {
          if (socialLogin) {
            const params = JSON.parse(socialLogin + "");
            window.localStorage.removeItem("socialLogin");
            this.$router.push({
              name: "menu-slug-table",
              params,
              query: {
                error: "This email already used. Try with another gmail",
              },
            });
          } else {
            this.$router.push({ name: "auth-login" });
          }
        } else if (c) {
          const { email, id, provider } = JSON.parse(atob(c));
          await this.$auth.loginWith("cookie", {
            data: { email, id, provider, password: "f*#k you" },
          });
          if (socialLogin) {
            const params = JSON.parse(socialLogin + "");
            window.localStorage.removeItem("socialLogin");
            this.$router.push({
              name: "menu-slug-table",
              params,
            });
          } else {
            this.$router.push({ name: "dashboard" });
          }
        }
      } catch (error) {
        const params = JSON.parse(socialLogin + "");
        window.localStorage.removeItem("socialLogin");
        if (params) {
          this.$router.push({
            name: "menu-slug-table",
            params,
          });
        } else {
          this.$router.push({ name: "auth-login" });
        }
      }
    },
  },
};
</script>
