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

    <template v-if="items && items.length > 0">
      <div class="flex justify-center">
        <client-only>
          <apexchart
            type="pie"
            height="350"
            :options="chartOptions"
            :series="series"
          />
        </client-only>
      </div>
      <hr class="mt-3 mb-2" />
      <div class="grid grid-cols-1 max-h-80 overflow-y-auto">
        <div
          class="flex items-center text-gray-600"
          v-for="order in items"
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
      items: [],
      form: { date: new Date() },
    };
  },
  computed: {
    series() {
      return this.items.map(({ totalQuantity }) => totalQuantity);
    },
    chartOptions() {
      return {
        chart: { type: "pie" },
        labels: this.items.map(({ itemName }) => itemName),
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
        const { performance } = await this.$managerApi.fetchPerformance(body);
        // this.items = performance;
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
