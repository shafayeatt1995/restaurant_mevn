<template>
  <section class="px-2 lg:px-6">
    <div class="bg-white p-4 rounded-xl shadow-lg">
      <div class="flex justify-between pb-6 gap-2 items-center">
        <div class="space-y-2 text-center md:text-left sm">
          <h2 class="text-lg">Restaurant Details</h2>
          <h2 class="text-xl font-bold">
            {{ $auth.user?.restaurant?.name || "N/A" }}
          </h2>
        </div>
        <QrcodeVue
          value="http://localhost:8080/menu/1c"
          size="100"
          level="L"
          render-as="svg"
        />
      </div>
      <div class="">
        <code
          class="text-sm sm:text-base inline-flex flex-wrap items-center space-x-4 bg-gray-100 w-full text-black rounded-lg p-2 md:p-4 md:pl-6"
        >
          <span
            class="flex-1 gap-4 text-center sm:overflow-x-scroll md:overflow-auto"
          >
            <a target="_blank" :href="url">
              {{ url }}
            </a>
          </span>
          <div class="pr-2">
            <i class="text-gray-700 far fa-copy" />
          </div>
        </code>
        <a class="btn btn-primary !btn-outline mt-4"> Set up domain </a>
      </div>
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
    ...mapGetters(["baseUrl"]),
    url() {
      return `${this.baseUrl}/${this.$auth.user?.restaurant?.slug}`;
    },
  },
};
</script>
