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
    this.getDetails();
  },
  methods: {
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
              name: "m-slug-table",
              params,
              query: {
                error: "This email already used. Try with another gmail",
              },
            });
          } else {
            this.$router.push({ name: "auth-login" });
          }
        } else if (c) {
          if (socialLogin) {
            const { email, id, provider } = JSON.parse(atob(c));
            await this.$auth.loginWith("cookie", {
              data: { email, id, provider, password: "f*#k you" },
            });
            const params = JSON.parse(socialLogin + "");
            window.localStorage.removeItem("socialLogin");
            this.$router.push({
              name: "m-slug-table",
              params,
            });
          } else {
            this.$router.push({ name: "auth-login" });
          }
        }
      } catch (error) {
        const params = JSON.parse(socialLogin + "");
        window.localStorage.removeItem("socialLogin");
        if (params) {
          this.$router.push({
            name: "m-slug-table",
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
