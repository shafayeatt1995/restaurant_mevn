<template>
  <section class="bg-white p-4 rounded-xl shadow-lg">
    <div class="flex justify-between pb-6 gap-2 items-center">
      <div class="space-y-2 text-center md:text-left sm">
        <h2 class="text-lg text-gray-700">Restaurant Details</h2>
        <h2 class="text-xl font-bold text-gray-800">
          {{ $auth.user?.restaurant?.name || "N/A" }}
        </h2>
      </div>
      <QrcodeVue :value="url" size="110" level="L" render-as="svg" />
    </div>
    <div class="">
      <code
        class="text-sm sm:text-base inline-flex flex-wrap items-center space-x-4 bg-gray-100 w-full text-black rounded-lg p-2 md:p-4 md:pl-6"
      >
        <span
          class="flex-1 gap-4 text-center sm:overflow-x-scroll md:overflow-auto"
        >
          <a
            target="_blank"
            :href="url"
            class="overflow-hidden whitespace-nowrap text-ellipsis"
          >
            {{ url }}
          </a>
        </span>
        <div class="pr-2 cursor-pointer" @click="copy">
          <i class="text-gray-700 far fa-copy" />
        </div>
      </code>
      <Button
        :disabled="!this.manager"
        class="w-full mt-4"
        @click.native.prevent="setup"
      >
        Set up domain
      </Button>
    </div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import QrcodeVue from "qrcode.vue";
export default {
  name: "RestaurantDetails",
  components: { QrcodeVue },
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["baseUrl", "manager"]),
    url() {
      return `${this.baseUrl}/menu/${this.$auth.user?.restaurant?.slug}`;
    },
  },
  methods: {
    setup() {
      console.log("ami anik");
      this.$router.push({
        name: "dashboard-settings",
        query: { tab: "Domain" },
      });
    },
    async copy() {
      try {
        console.log(this.url);
        await navigator.clipboard.writeText(this.url);
        this.$nuxt.$emit("success", "Text copied");
      } catch (error) {}
    },
  },
};
</script>
