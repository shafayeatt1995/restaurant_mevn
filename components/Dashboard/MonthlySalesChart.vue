<template>
  <div class="px-2 lg:px-6 my-4">
    <div class="rounded-2xl shadow-lg bg-white p-3">
      <div class="flex flex-col lg:flex-row justify-between lg:items-center">
        <h1 class="font-semibold text-xl text-gray-700 py-2 px-2">
          Monthly Sales Details
        </h1>
        <client-only>
          <DatePicker
            v-if="!chartLoader"
            v-model="filterDate"
            type="month"
            placeholder="Select month"
            prefix-class="xmx"
          />
        </client-only>
      </div>
      <div
        v-if="chartLoader"
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
  </div>
</template>
<script>
export default {
  name: "MonthlySalesChart",
  data() {
    return {
      filterDate: new Date(),
      chartLoader: true,
      series: [{ name: "Sales", data: [] }],
      chartOptions: {
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
            formatter(value) {
              return new Date(value).toLocaleString("en-GB", {
                day: "numeric",
              });
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
      },
    };
  },

  watch: {
    filterDate() {
      this.getSalesLog();
    },
  },

  mounted() {
    this.getSalesLog();
  },

  methods: {
    async getSalesLog() {
      try {
        this.chartLoader = true;
        const start = this.$moment(this.filterDate).startOf("month").toDate();
        const end = this.$moment(this.filterDate).endOf("month").toDate();
        const dates = this.getBetweenDates(start, end);
        const timezone = this.$moment.tz.guess();
        const { chartData } = await this.$mowApi.chartSalesData({
          date: [start, end],
          timezone,
        });
        this.series[0].data = this.mergeDates(dates, chartData);
      } catch (error) {
      } finally {
        this.chartLoader = false;
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
          y: matchingObject ? matchingObject.totalNetPrice : 0,
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
