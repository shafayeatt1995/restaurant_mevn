<template>
  <section class="bg-white p-4 rounded-xl shadow-lg">
    <div class="flex justify-between pb-6 gap-2 items-center">
      <div class="space-y-2 text-center md:text-left sm">
        <h2 class="text-xl font-semibold text-gray-700">Restaurant Details</h2>
        <h1 class="text-2xl font-bold text-gray-800">
          {{ $auth.user?.restaurant?.name || "N/A" }}
        </h1>
      </div>
    </div>
    <div class="flex flex-col gap-6">
      <div class="flex items-center gap-4">
        <div class="w-[calc(100%_-_116px)]">
          <div class="flex justify-between">
            <p class="text-gray-700">Table link</p>
            <p
              class="hover:underline cursor-pointer text-sky-600"
              @click="download()"
            >
              <i class="fa-solid fa-download"></i> Download QR
            </p>
          </div>
          <div
            class="text-sm sm:text-base flex justify-between items-center space-x-4 bg-gray-100 w-full text-black rounded-lg p-2 md:p-4 md:pl-6"
          >
            <a target="_blank" :href="url" class="truncate overflow-hidden">
              <span class="font-mono">{{ url }}</span>
            </a>
            <div class="pr-2 cursor-pointer" @click="copy">
              <i class="text-gray-700 far fa-copy"></i>
            </div>
          </div>
        </div>
        <div class="w-[110]">
          <QrcodeVue :value="url" size="100" level="L" render-as="svg" />
        </div>
        <div
          id="tableSvgCode"
          style="
            border: 30px solid #fff;
            z-index: -999;
            position: absolute;
            top: 0;
            left: 0;
          "
          v-show="showTableUrl"
        >
          <QrcodeVue :value="url" :size="1000" level="L" render-as="svg" />
        </div>
      </div>
      <div class="flex items-center gap-4">
        <div class="w-[calc(100%_-_116px)]">
          <div class="flex justify-between">
            <p class="text-gray-700">Online order link</p>
            <p
              class="hover:underline cursor-pointer text-sky-600"
              @click="download('online')"
            >
              <i class="fa-solid fa-download"></i> Download QR
            </p>
          </div>
          <div
            class="text-sm sm:text-base flex justify-between items-center space-x-4 bg-gray-100 w-full text-black rounded-lg p-2 md:p-4 md:pl-6"
          >
            <a
              target="_blank"
              :href="onlineUrl"
              class="truncate overflow-hidden"
            >
              <span class="font-mono">{{ onlineUrl }}</span>
            </a>
            <div class="pr-2 cursor-pointer" @click="copy('online')">
              <i class="text-gray-700 far fa-copy"></i>
            </div>
          </div>
        </div>
        <div class="w-[110]">
          <QrcodeVue :value="onlineUrl" size="100" level="L" render-as="svg" />
        </div>
        <div
          id="onlineSvgCode"
          style="
            border: 30px solid #fff;
            z-index: -999;
            position: absolute;
            top: 0;
            left: 0;
          "
          v-show="showOnlineUrl"
        >
          <QrcodeVue
            :value="onlineUrl"
            :size="1000"
            level="L"
            render-as="svg"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import QrcodeVue from "qrcode.vue";
import domToImage from "dom-to-image";

export default {
  name: "RestaurantDetails",
  components: { QrcodeVue },
  data() {
    return {
      showOnlineUrl: false,
      showTableUrl: false,
    };
  },
  computed: {
    ...mapGetters(["baseUrl", "manager"]),
    url() {
      return `${location.origin}/menu/${this.$auth.user?.restaurant?.slug}`;
    },
    onlineUrl() {
      return `${location.origin}/menu/${this.$auth.user?.restaurant?.slug}?type=Parcel`;
    },
  },
  methods: {
    setup() {
      this.$router.push({
        name: "dashboard-settings",
        query: { tab: "Domain" },
      });
    },
    async copy(val) {
      try {
        if (val === "online") {
          await navigator.clipboard.writeText(this.onlineUrl);
        } else {
          await navigator.clipboard.writeText(this.url);
        }
        this.$nuxt.$emit("success", "URL copied");
      } catch (error) {}
    },
    async download(val) {
      try {
        if (val === "online") {
          this.showOnlineUrl = true;
          const svgContainer = document.querySelector("#onlineSvgCode");
          const dataUrl = await domToImage.toPng(svgContainer);

          const link = document.createElement("a");
          link.href = dataUrl;
          link.download = `Online-Order-QR.png`;
          link.click();
          this.showOnlineUrl = false;
        } else {
          this.showTableUrl = true;
          const svgContainer = document.querySelector("#tableSvgCode");
          const dataUrl = await domToImage.toPng(svgContainer);

          const link = document.createElement("a");
          link.href = dataUrl;
          link.download = `Table-Order-QR.png`;
          link.click();
          this.showOnlineUrl = false;
        }
      } catch (error) {}
    },
  },
};
</script>
