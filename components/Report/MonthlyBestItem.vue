<template>
  <section class="bg-white shadow-xl rounded-xl p-3">
    <div class="flex flex-col justify-center mb-3">
      <h2 class="text-gray-700 text-xl font-bold mb-1 text-center">
        Monthly top selling 20 items
      </h2>
      <client-only>
        <DatePicker
          v-model="form.date"
          class="w-full report-pie-date"
          type="month"
          placeholder="Select week"
          prefix-class="xmx"
        />
      </client-only>
    </div>

    <template v-if="orders && orders.length > 0">
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
          class="flex items-center text-gray-600"
          v-for="order in orders"
          :key="order._id"
        >
          <img
            :src="order.itemImage"
            :alt="order.itemName"
            loading="lazy"
            class="max-w-14"
          />
          <p class="flex-1">{{ order.itemName }}</p>
          <p>{{ order.totalQuantity }}</p>
        </div>
      </div>
    </template>
    <div v-else class="h-96 flex flex-col justify-center items-center gap-4">
      <font-awesome-icon
        :icon="['fas', 'chart-pie']"
        class="text-9xl text-rose-600"
      />
      <p class="text-gray-600">No order data found</p>
    </div>
  </section>
</template>
<script>
export default {
  name: "WeeklyBestItem",
  data() {
    return {
      loading: true,
      orders: [],
      form: { date: new Date() },
    };
  },
  computed: {
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
  mounted() {
    this.fetchItem();
  },
  methods: {
    async fetchItem() {
      try {
        this.loading = true;
        const body = {
          date: [
            new Date(this.$moment(this.form.date).startOf("month")),
            new Date(this.$moment(this.form.date).endOf("month")),
          ],
        };
        const { orders } = await this.$managerApi.fetchBestItems(body);
        this.orders = orders;
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style lang="scss">
.report-pie-date {
  width: 100% !important;
  input {
    height: 40px !important;
    border-radius: 8px;
  }
}
</style>
