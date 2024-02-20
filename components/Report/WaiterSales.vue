<template>
  <section class="bg-white shadow-xl rounded-xl p-3">
    <div class="flex justify-between mb-3">
      <h2 class="text-gray-700 text-xl font-bold mb-1 text-center">
        Waiter sales: ৳<span v-if="activeSubscription">
          {{ totalSales | currencyNumber }}
        </span>
        <span v-else>0</span>
      </h2>
      <client-only>
        <DatePicker
          v-model="date"
          type="date"
          range
          placeholder="Select week"
          prefix-class="xmx"
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
            <font-awesome-icon :icon="['fas', 'lock']" />
          </p>
        </Upgrade>
        <Upgrade class="mt-2"> Upgrade your account</Upgrade>
      </div>
      <Observer v-if="loaded" @load="fetchItem" class="h-96" />
      <div
        v-else-if="items && items.length === 0 && activeSubscription"
        class="h-96 flex flex-col justify-center items-center gap-4"
      >
        <font-awesome-icon
          :icon="['fas', 'chart-pie']"
          class="text-9xl text-rose-600"
        />
        <p class="text-gray-700">No data found</p>
      </div>
      <template v-else>
        <client-only>
          <apexchart
            type="line"
            height="350"
            :options="chartOptions"
            :series="series"
          />
        </client-only>
      </template>
    </div>
  </section>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "WaiterPerformance",
  data() {
    return {
      loaded: true,
      loading: true,
      items: [],
      date: [new Date(), new Date()],
    };
  },
  computed: {
    ...mapGetters(["activeSubscription"]),
    series() {
      const data = this.items.map(({ waiterName, totalRevenue }) => ({
        x: waiterName,
        y: totalRevenue,
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
    totalSales() {
      return this.items.reduce((t, val) => t + val.totalRevenue ?? 0, 0);
    },
  },
  watch: {
    date() {
      this.fetchItem();
    },
  },
  methods: {
    async fetchItem() {
      try {
        if (this.activeSubscription) {
          this.loading = true;
          const date = [
            this.$moment(this.date[0]).startOf("day").toDate(),
            this.$moment(this.date[1]).endOf("day").toDate(),
          ];
          const { performance } = await this.$managerApi.fetchWaiterSales({
            date,
          });
          this.items = performance;
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
