<template>
  <div class="rounded-2xl shadow-lg bg-white p-3">
    <div class="flex flex-col lg:flex-row justify-between lg:items-center">
      <h3 class="font-semibold text-xl text-gray-700 py-2 px-2">
        Weekly Sales Details
      </h3>
      <DatePicker
        v-if="!chartLoader"
        v-model="filterDate"
        type="week"
        placeholder="Select week"
        prefix-class="xmx"
        :lang="lang"
      />
    </div>
    <div
      v-if="chartLoader"
      class="w-full flex justify-center items-center h-96"
    >
      <Spinner class="text-green-600" />
    </div>
    <apexchart
      v-else
      height="450"
      type="area"
      :options="chartOptions"
      :series="series"
    />
  </div>
</template>
<script>
export default {
  name: "WeeklySalesChart",
  data() {
    return {
      lang: {
        formatLocale: {
          firstDayOfWeek: 0,
        },
        monthBeforeYear: false,
      },
      filterDate: new Date(),
      chartLoader: true,
      series: [{ name: "Sales", data: [] }],
      chartOptions: {
        chart: {
          toolbar: { show: false },
          zoom: { enabled: false },
        },
        dataLabels: { enabled: false },
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
              color: "#60B15A",
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
          strokeColors: "#60b15ab3",
          strokeOpacity: 1,
          hover: {
            size: 10,
          },
        },
        colors: ["#60b15a"],
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
        const inputDate = this.$moment(this.filterDate);
        const date = [
          inputDate.clone().startOf("week").add(0, "days").toDate(),
          inputDate.clone().endOf("week").add(0, "days").toDate(),
        ];
        const dates = this.getBetweenDates(date[0], date[1]);

        const { chartData } = await this.$mowApi.chartSalesData({ date });
        this.series[0].data = this.mergeDates(dates, chartData);
      } catch (error) {
        console.error(error);
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
$primary-color: #16a34a;
$default-color: #555;

@import "~vue2-datepicker/scss/index.scss";

.xmx-input {
  &:hover,
  &:focus {
    border-color: #16a34a !important;
  }
}
</style>