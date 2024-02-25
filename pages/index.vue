<template>
  <div>
    <HomeNav />
    <HomeHeader />
    <HomeProcess />
    <HomeFeature />
    <HomeFaq />
    <HomeCustomer />
    <HomePricing />
    <HomeContact />
    <HomeFooter />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "indexPage",
  auth: false,
  head() {
    return { title: `Home - ${this.pageTitle}` };
  },
  data() {
    return {
      isOpen: false,
    };
  },
  computed: {
    ...mapGetters(["isMobile", "pageTitle"]),
  },
};
</script>

<style lang="scss" scoped>
@keyframes bouncy {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}

.animate-bouncy {
  animation: bouncy 4s infinite;
}
</style>
