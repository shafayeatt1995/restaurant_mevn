<template>
  <div class="px-2 lg:px-6">
    <div class="border rounded-2xl shadow-lg bg-white p-3">
      <div class="flex flex-col lg:flex-row justify-between lg:items-center">
        <h3
          class="font-semibold text-xl text-gray-700 py-2 px-2"
          @click="getSalesLog"
        >
          Sales Over Time
        </h3>
        <DatePicker
          v-if="!chartLoader"
          v-model="filterDate"
          type="month"
          placeholder="Select month"
        />
      </div>
      <transition name="fade" mode="out-in">
        <div
          v-if="chartLoader"
          class="w-full flex justify-center items-center h-96"
        >
          <Spinner class="text-green-600" />
        </div>
        <apexchart
          v-else
          height="350"
          type="area"
          :options="chartOptions"
          :series="series"
        />
      </transition>
    </div>
  </div>
</template>
<script>
export default {
  name: "SalesChart",
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
              color: "#60B15A",
              width: 2,
              dashArray: 0,
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
          style: {
            fontSize: "12px",
            fontFamily: "Poppins, sans-serif",
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
        const { chartData } = await this.$managerApi.chartSalesData({
          date: this.filterDate,
        });
        const startDate = this.$moment(this.filterDate)
          .startOf("month")
          .toDate();
        const endDate = this.$moment(this.filterDate).endOf("month").toDate();
        const dates = this.getBetweenDates(startDate, endDate);
        this.series[0].data = this.mergeDates(dates, chartData);
      } catch (error) {
        console.log(error);
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
