<template>
  <section class="py-10" id="pricing">
    <div class="container px-4 py-4 mx-auto">
      <div class="flex flex-col justify-center items-center">
        <h1 class="text-4xl text-gray-800 font-bold">
          ScanEating
          <span class="text-green-600 underline decoration-green-600"
            >Pricing</span
          >
        </h1>
        <p class="text-gray-800 text-center">
          Choose the Plan That Fits Your Restaurant's
        </p>
      </div>

      <div class="grid grid-cols-1 gap-6 mt-6 lg:grid-cols-3">
        <div
          class="w-full py-8 px-5 space-y-8 text-center border border-gray-200 rounded-lg"
          v-for="(p, key) in pricing"
          :key="key"
        >
          <div class="flex flex-col justify-between h-full">
            <div>
              <p class="font-medium text-gray-700 uppercase">{{ p.name }}</p>

              <h2 class="text-4xl font-semibold text-gray-800 uppercase mt-5">
                {{ $domainCurrency }}{{ p.price }}
              </h2>
            </div>
            <div class="text-left mt-3">
              <p v-for="(data, i) in p.options" :key="`${key}${i}val`">
                <i class="fa-solid fa-check mr-2"></i> {{ data }}
              </p>
            </div>
            <Button
              @click.native.prevent="processPayment(p)"
              class="mt-10"
              v-if="manager"
              :loading="loading === p.price"
            >
              Active now
            </Button>
            <nuxt-link
              v-else
              :to="{ name: 'dashboard-subscription' }"
              class="w-full px-4 py-2 mt-10 tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-900 rounded-md hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:ring focus:ring-gray-300 focus:ring-opacity-80 disabled:bg-gray-500"
            >
              Active now
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import { mapGetters } from "vuex";
import { setItem, encode } from "@/utils";
export default {
  name: "Pricing",
  data() {
    return {
      bd: true,
      loading: "",
    };
  },
  computed: {
    ...mapGetters(["manager"]),
    pricing() {
      if (process.client) {
        const subdomain = window.location.hostname.split(".")[0];
        if (subdomain === "bd") {
          return [
            {
              name: "STARTER - 250 TOKEN",
              price: 250,
              options: [
                `৳1 per token`,
                `Ger Real-time order notification`,
                `Change item price any time`,
                `Sorting items, categories and feature categories any time`,
                `Monitoring waiter performance`,
                `Detailed Business report`,
                `Token never expire`,
              ],
            },
            {
              name: "STANDARD - 500 TOKEN",
              price: 500,
              options: [
                `৳1 per token`,
                `Ger Real-time order notification`,
                `Change item price any time`,
                `Sorting items, categories and feature categories any time`,
                `Monitoring waiter performance`,
                `Detailed Business report`,
                `Token never expire`,
              ],
            },
            {
              name: "Premium - 1250 TOKEN",
              price: 1000,
              options: [
                `৳0.80 per token`,
                `Ger Real-time order notification`,
                `Change item price any time`,
                `Sorting items, categories and feature categories any time`,
                `Monitoring waiter performance`,
                `Detailed Business report`,
                `Token never expire`,
              ],
            },
          ];
        } else {
          return [
            {
              name: "STARTER - 500 TOKEN",
              price: 5,
              options: [
                `$0.01 per token`,
                `Ger Real-time order notification`,
                `Change item price any time`,
                `Sorting items, categories and feature categories any time`,
                `Monitoring waiter performance`,
                `Detailed Business report`,
                `Token never expire`,
              ],
            },
            {
              name: "STANDARD - 1000 TOKEN",
              price: 10,
              options: [
                `$0.01 per token`,
                `Ger Real-time order notification`,
                `Change item price any time`,
                `Sorting items, categories and feature categories any time`,
                `Monitoring waiter performance`,
                `Detailed Business report`,
                `Token never expire`,
              ],
            },
            {
              name: "Premium - 3000 TOKEN",
              price: 25,
              options: [
                `$0.0083 per token`,
                `Ger Real-time order notification`,
                `Change item price any time`,
                `Sorting items, categories and feature categories any time`,
                `Monitoring waiter performance`,
                `Detailed Business report`,
                `Token never expire`,
              ],
            },
          ];
        }
      } else {
        return [];
      }
    },
  },
  mounted() {
    if (process.client) {
      const subdomain = window.location.hostname.split(".")[0];
      this.bd = subdomain === "bd";
    }
  },
  methods: {
    async processPayment(pack) {
      try {
        if (this.bd) {
          this.loading = pack.price;
          const body = { price: pack.price };
          const data = await this.$managerApi.purchasePackage(body);
          window.open(data.bkashURL, "_self");
        }
      } catch (error) {
        console.error("Error occurred:", error);
        this.$nuxt.$emit(
          "error",
          error.response?.data?.message || "Something wrong please try again"
        );
      } finally {
        this.loading = "";
      }
    },
  },
};
</script>
