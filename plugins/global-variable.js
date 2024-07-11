import Vue from "vue";

const globalVal = {
  install(Vue) {
    Vue.mixin({
      computed: {
        $currency() {
          const subdomain = window.location.hostname.split(".")[0];
          return subdomain === "bd" ? "৳" : "$";
        },
      },
    });
  },
};

Vue.use(globalVal);
