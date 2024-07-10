<template>
  <section class="bg-white shadow-xl rounded-xl p-3">
    <div class="flex flex-col justify-center mb-3">
      <h2 class="text-gray-700 text-xl font-bold mb-1 text-center">
        Daily top selling items
      </h2>
      <client-only>
        <DatePicker
          v-model="form.date"
          class="w-full"
          type="date"
          placeholder="Select date range"
          prefix-class="block-date-picker performance-date-picker mx"
        />
      </client-only>
    </div>
    <div class="relative">
      <div
        class="flex flex-col justify-center items-center backdrop-blur-md absolute left-0 top-0 right-0 bottom-0 z-10"
        v-if="!activeSubscription"
      >
        <Upgrade>
          <p
            class="text-6xl text-center bg-gray-100 h-40 w-40 rounded-full flex justify-center items-center"
          >
            <i class="fas fa-lock" />
          </p>
        </Upgrade>
        <Upgrade class="mt-2"> Upgrade your account</Upgrade>
      </div>
      <Observer v-if="loaded" @load="fetchItem" class="h-96" />
      <ChartLoading v-else-if="loading" />
      <div
        v-else-if="orders && orders.length === 0 && activeSubscription"
        class="h-96 flex flex-col justify-center items-center gap-4"
      >
        <i class="text-9xl text-rose-600 fas fa-chart-pie" />
        <p class="text-gray-700">No data found</p>
      </div>
      <template v-else>
        <div class="flex justify-center">
          <client-only>
            <apexchart
              type="pie"
              height="400"
              :options="chartOptions"
              :series="series"
            />
          </client-only>
        </div>
        <hr class="mt-3 mb-2" />
        <div class="grid grid-cols-1 max-h-96 overflow-y-auto">
          <div
            class="flex items-center text-gray-700"
            v-for="order in orders"
            :key="order._id"
          >
            <nuxt-img
              format="webp"
              loading="lazy"
              decode="async"
              :src="order.itemImage"
              :alt="order.itemName"
              class="max-w-14"
            />
            <p class="flex-1">{{ order.itemName }}</p>
            <p>{{ order.totalQuantity }}</p>
          </div>
        </div>
      </template>
    </div>
  </section>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "DailyBestItem",
  data() {
    return {
      loaded: true,
      loading: true,
      orders: [],
      form: { date: new Date() },
    };
  },
  computed: {
    ...mapGetters(["activeSubscription"]),
    series() {
      return this.orders.map(({ totalQuantity }) => totalQuantity);
    },
    chartOptions() {
      return {
        chart: {
          width: 300,
          type: "pie",
        },
        labels: this.orders.map(({ itemName }) => itemName),
        legend: { position: "bottom" },
      };
    },
  },
  watch: {
    "form.date"() {
      this.fetchItem();
    },
  },
  methods: {
    async fetchItem() {
      try {
        if (this.activeSubscription) {
          this.loading = true;
          const body = {
            date: [
              new Date(this.$moment(this.form.date).startOf("day")),
              new Date(this.$moment(this.form.date).endOf("day")),
            ],
          };
          const { orders } = await this.$managerApi.fetchBestItems(body);
          this.orders = orders;
        }
      } catch (error) {
      } finally {
        this.loading = false;
        this.loaded = false;
      }
    },
  },
};
</script>
