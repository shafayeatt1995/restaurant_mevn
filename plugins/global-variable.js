import Vue from "vue";

const globalVal = {
  install(Vue) {
    Vue.mixin({
      computed: {
        $currency() {
          if (process.client) {
            return this.$auth?.user?.restaurant?.currency || "";
          } else {
            return "";
          }
        },
        $domainCurrency() {
          if (process.client) {
            const subdomain = window.location.hostname.split(".")[0];
            return subdomain === "bd" ? "৳" : "$";
          } else {
            return "";
          }
        },
      },
    });
  },
};

Vue.use(globalVal);
