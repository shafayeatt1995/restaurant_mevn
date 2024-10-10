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
              <p class="text-xl font-bold text-gray-700 uppercase">
                {{ p.name }}
              </p>

              <h2
                class="text-5xl font-semibold uppercase mt-6 mb-10 text-green-600"
              >
                <del v-if="p.discount" class="text-rose-500"
                  >{{ $domainCurrency }}{{ p.discount }}</del
                >
                {{ $domainCurrency }}{{ p.price }}
              </h2>
            </div>
            <div class="text-left mt-3">
              <p
                v-for="(data, i) in p.options"
                :key="`${key}${i}val`"
                class="flex items-center mb-1"
              >
                <i class="far fa-check-circle mr-2 text-green-600"></i>
                {{ data }}
              </p>
            </div>
            <Button
              @click.native.prevent="processPayment(p)"
              class="mt-10"
              v-if="$auth.loggedIn"
              :loading="loading === p.price"
            >
              Active now
            </Button>
            <nuxt-link
              v-else
              :to="{ name: 'auth-login' }"
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
export default {
  name: "Pricing",
  data() {
    return {
      loading: "",
      pricing: [
        {
          name: "STARTER - 1000 TOKEN",
          price: 9.99,
          options: [
            `$0.01 per token`,
            `1 tokens will be deducted per order`,
            `Ger Real-time order notification`,
            `Change item name, price, etc any time`,
            `Dine-in & Take-out order receive`,
            `Sorting items, categories and feature categories any time`,
            `Monitoring waiter performance`,
            `Detailed Business report`,
            `Token never expire`,
          ],
        },
        {
          name: "STANDARD - 2500 TOKEN",
          price: 24.99,
          options: [
            `$0.01 per token`,
            `1 tokens will be deducted per order`,
            `Ger Real-time order notification`,
            `Change item name, price, etc any time`,
            `Dine-in & Take-out order receive`,
            `Sorting items, categories and feature categories any time`,
            `Monitoring waiter performance`,
            `Detailed Business report`,
            `Token never expire`,
          ],
        },
        {
          name: "Premium - 6000 TOKEN",
          price: 49.99,
          discount: 30,
          options: [
            `$0.008 per token`,
            `1 tokens will be deducted per order`,
            `Ger Real-time order notification`,
            `Change item name, price, etc any time`,
            `Dine-in & Take-out order receive`,
            `Sorting items, categories and feature categories any time`,
            `Monitoring waiter performance`,
            `Detailed Business report`,
            `Token never expire`,
          ],
        },
      ],
    };
  },
  computed: {
    ...mapGetters(["manager"]),
  },
  methods: {
    async processPayment(pack) {
      try {
        this.click = false;
        await this.createCharge();
      } catch (error) {
        console.error("Error occurred:", error);
        this.$nuxt.$emit(
          "error",
          error.response?.data?.message || "Something wrong please try again"
        );
      } finally {
        this.loading = "";
        this.click = true;
      }
    },
    async createCharge() {
      try {
        const data = await this.$userApi.purchasePackage();
        console.log(data);
        // const { payment_url, vendor } = await this.$userApi.buyPackage();
        // return { payment_url, vendor: Number(vendor) };
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>
