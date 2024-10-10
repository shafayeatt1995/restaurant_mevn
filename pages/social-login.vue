<template>
  <div class="flex flex-col justify-center items-center h-screen w-screen">
    <div ref="loading" class="max-h-80"></div>
    <div class="flex justify-center">
      <p class="text-gray-700">We are checking your information</p>
    </div>
  </div>
</template>

<script>
import { getItem, initLottie, removeItem } from "@/utils";

export default {
  name: "socialLogin",
  auth: false,
  head() {
    return { title: `Social login - ${this.$pageTitle}` };
  },
  async mounted() {
    initLottie(this.$refs.loading, "/lottie/social-login.json");
    this.getDetails();
  },
  methods: {
    async getDetails() {
      const socialLogin = getItem("socialLogin");
      try {
        const { query } = this.$route;
        const { c, e } = query;
        if (e) {
          if (socialLogin) {
            const { name, query, params } = JSON.parse(socialLogin + "");
            removeItem("socialLogin");
            this.$router.push({ name, query, params });
          } else {
            this.$router.push({ name: "index" });
          }
        } else if (c) {
          const { email, id, provider } = JSON.parse(atob(c));
          await this.$auth.loginWith("cookie", {
            data: { email, id, provider, password: "f*#k you" },
          });
          if (socialLogin) {
            const { name, query, params } = JSON.parse(socialLogin + "");
            removeItem("socialLogin");
            // this.$router.push({ name, query, params });
            window.location.href = this.$router.resolve({
              name,
              query,
              params,
            }).href;
          } else {
            // this.$router.push({ name: "index" });
            window.location.href = this.$router.resolve({
              name: "dashboard",
            }).href;
          }
        } else {
          this.$router.push({ name: "index" });
        }
      } catch (error) {
        const { name, query, params } = JSON.parse(socialLogin + "");
        removeItem("socialLogin");
        if (params) {
          this.$router.push({ name, query, params });
        } else {
          this.$router.push({ name: "index" });
        }
      }
    },
  },
};
</script>
