<template>
  <div class="rounded-xl shadow-lg bg-white p-3">
    <div class="flex flex-col lg:flex-row justify-between lg:items-center">
      <h1 class="font-bold text-xl text-gray-700 py-2 px-2">
        Total order: <font-awesome-icon :icon="['fas', 'receipt']" />
        {{ totalOrder | currencyNumber }}
      </h1>
      <client-only>
        <DatePicker
          v-model="date"
          type="date"
          range
          placeholder="Select date"
          prefix-class="xmx"
        />
      </client-only>
    </div>
    <Observer v-if="loaded" @load="getOrderLog" class="h-96" />
    <div
      v-else-if="loading"
      class="w-full flex justify-center items-center h-96"
    >
      <Spinner class="text-green-600" />
    </div>
    <client-only v-else>
      <apexchart
        height="450"
        type="area"
        :options="chartOptions"
        :series="series"
      />
    </client-only>
  </div>
</template>
<script>
export default {
  name: "OrderChart",
  data() {
    return {
      date: [new Date(), new Date()],
      loaded: true,
      loading: true,
      chartData: [],
    };
  },
  computed: {
    mode() {
      const [start, end] = this.date;
      const different = this.$moment(end).diff(this.$moment(start), "days");
      if (different === 0) {
        return "hourly";
      } else if (different > 0 && different <= 31) {
        return "daily";
      } else if (different > 31 && different <= 366) {
        return "monthly";
      } else {
        return "yearly";
      }
    },
    series() {
      if (this.mode === "hourly") {
        const data = Array.from({ length: 24 }, (_, i) => ({
          x: i,
          y: this.findData(i).totalOrder,
        }));
        return [{ name: "Sales", data }];
      } else if (this.mode === "daily") {
        const [start, end] = this.date;
        const different = this.$moment(end).diff(start, "days") + 1;
        const data = Array.from({ length: different }, (_, i) => {
          const x = this.$moment(start).add(i, "day").format("DD-MM-YYYY");
          return {
            x,
            y: this.findData(x).totalOrder,
          };
        });
        return [{ name: "Sales", data }];
      } else if (this.mode === "monthly") {
        let [start, end] = this.date;
        start = this.$moment(start).format("MM-YYYY");
        end = this.$moment(end).format("MM-YYYY");

        const different =
          this.$moment(end, "MM-YYYY").diff(
            this.$moment(start, "MM-YYYY"),
            "months"
          ) + 1;
        const data = Array.from({ length: different }, (_, i) => {
          const x = this.$moment(start, "MM-YYYY")
            .add(i, "months")
            .format("MM-YYYY");
          return {
            x,
            y: this.findData(x).totalOrder,
          };
        });
        return [{ name: "Sales", data }];
      } else if (this.mode === "yearly") {
        let [start, end] = this.date;
        start = this.$moment(start).format("YYYY");
        end = this.$moment(end).format("YYYY");

        const different =
          this.$moment(end, "YYYY").diff(this.$moment(start, "YYYY"), "years") +
          1;
        const data = Array.from({ length: different }, (_, i) => {
          const x = this.$moment(start, "YYYY").add(i, "years").format("YYYY");
          return {
            x,
            y: this.findData(x).totalOrder,
          };
        });
        return [{ name: "Sales", data }];
      }
    },
    chartOptions() {
      const mode = this.mode;
      const moment = this.$moment;
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
            formatter(val) {
              if (mode === "hourly") {
                return moment({ hour: val }).format("h A");
              } else if (mode === "daily") {
                return moment(val, "DD-MM-YYYY").format("DD-MMM");
              } else if (mode === "monthly") {
                return moment(val, "MM-YYYY").format("MMM-YY");
              } else if (mode === "yearly") {
                return moment(val, "YYYY").format("YYYY");
              }
            },
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
      return this.chartData.reduce((t, val) => t + val.totalOrder ?? 0, 0);
    },
  },
  watch: {
    date() {
      this.getOrderLog();
    },
  },
  methods: {
    findData(val) {
      if (this.chartData.length > 0) {
        const findData = this.chartData.find(({ _id }) => {
          if (this.mode === "hourly") {
            return _id === val;
          } else if (this.mode === "daily") {
            return this.$moment(_id, "DD-MM-YYYY").isSame(
              this.$moment(val, "DD-MM-YYYY")
            );
          } else if (this.mode === "monthly") {
            return this.$moment(_id, "MM-YYYY").isSame(
              this.$moment(val, "MM-YYYY")
            );
          } else if (this.mode === "yearly") {
            return this.$moment(_id, "YYYY").isSame(this.$moment(val, "YYYY"));
          } else {
            return false;
          }
        });
        return findData ?? { totalOrder: 0, _id: val };
      } else {
        return { totalOrder: 0, _id: val };
      }
    },
    async getOrderLog() {
      try {
        this.loading = true;
        this.chartData = [];
        const timezone = this.$moment.tz.guess();
        const { chartData } = await this.$managerApi.chartOrderReport({
          date: this.date,
          mode: this.mode,
          timezone,
        });
        this.chartData = chartData;
      } catch (error) {
      } finally {
        this.loading = false;
        this.loaded = false;
      }
    },
    getBetweenDates(startDate, endDate) {
      return Array.from(
        { length: this.$moment(endDate).diff(startDate, "days") + 1 },
        (_, index) => this.$moment(startDate).add(index, "days").toDate()
      );
    },
    mergeDates(dateArray, netPriceArray) {
      return dateArray.map((date) => {
        const matchingObject = netPriceArray.find(({ _id }) => {
          const objectDate = new Date(
            `${_id.split("-").reverse().join("-")}T00:00:00`
          );
          return this.$moment(date).isSame(objectDate);
        });

        return {
          x: date,
          y: matchingObject ? matchingObject.totalOrder : 0,
        };
      });
    },
  },
};
</script>

<style lang="scss">
$namespace: "xmx";
$primary-color: #111827;
$default-color: #555;

@import "~vue2-datepicker/scss/index.scss";
</style>
