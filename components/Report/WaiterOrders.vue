<template>
  <section class="bg-white shadow-xl rounded-xl p-3">
    <div class="flex justify-between mb-3">
      <h2 class="text-gray-700 text-xl font-bold mb-1 text-center">
        Waiter order: <font-awesome-icon :icon="['fas', 'receipt']" />
        {{ totalOrder | currencyNumber }}
      </h2>
      <client-only>
        <DatePicker
          v-model="form.date"
          type="date"
          range
          placeholder="Select week"
          prefix-class="xmx"
        />
      </client-only>
    </div>

    <Observer v-if="loaded" @load="fetchItem" class="h-96" />
    <template v-else-if="items && items.length > 0">
      <client-only>
        <apexchart
          type="line"
          height="350"
          :options="chartOptions"
          :series="series"
        />
      </client-only>
    </template>
    <div v-else class="h-96 flex flex-col justify-center items-center gap-4">
      <font-awesome-icon
        :icon="['fas', 'chart-pie']"
        class="text-9xl text-rose-600"
      />
      <p class="text-gray-600">No data found</p>
    </div>
  </section>
</template>
<script>
export default {
  name: "WaiterPerformance",
  data() {
    return {
      loaded: true,
      loading: true,
      items: [],
      form: { date: [new Date(), new Date()] },
    };
  },
  computed: {
    series() {
      const data = this.items.map(({ waiterName, totalOrder }) => ({
        x: waiterName,
        y: totalOrder,
      }));
      return [{ name: "Sales", data }];
    },
    chartOptions() {
      return {
        chart: {
          type: "area",
          toolbar: { show: false },
          zoom: { enabled: false },
        },
        dataLabels: { enabled: false },
        stroke: { curve: "smooth" },
        xaxis: {
          type: "category",
          labels: {
            show: true,
            offsetX: 0,
            offsetY: 0,
          },
          axisBorder: {
            show: true,
            color: "#b4b3b3",
            height: 1,
            width: "100%",
            offsetX: 0,
            offsetY: 0,
          },
          crosshairs: {
            stroke: {
              color: "#111827",
              width: 2,
              dashArray: 0,
            },
          },
        },
        yaxis: {
          show: true,
          labels: {
            formatter(val) {
              return val.toLocaleString("en-IN");
            },
          },
        },
        markers: {
          size: 0,
          strokeWidth: 25,
          strokeColors: "#111827b3",
          strokeOpacity: 1,
          hover: {
            size: 10,
          },
        },
        colors: ["#111827"],
        tooltip: {
          enabled: true,
          followCursor: true,
          y: {
            formatter(val) {
              return val.toLocaleString("en-IN");
            },
          },
        },
        grid: { padding: { right: 40 } },
        dataLabels: { enabled: true, style: { fontSize: "14px" } },
      };
    },
    totalOrder() {
      return this.items.reduce((t, val) => t + val.totalOrder ?? 0, 0);
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
        this.loading = true;
        const { performance } = await this.$managerApi.fetchWaiterOrders(
          this.form
        );
        this.items = performance;
      } catch (error) {
      } finally {
        this.loading = false;
        this.loaded = false;
      }
    },
  },
};
</script>
