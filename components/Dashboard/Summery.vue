<template>
  <section
    class="my-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 min-[1600px]:grid-cols-6 px-2 lg:px-6"
  >
    <div
      class="relative flex bg-white bg-clip-border shadow-3xl shadow-shadow-500 flex-grow items-center rounded-2xl p-3 shadow-md"
    >
      <div class="flex w-auto flex-row items-center">
        <div
          class="rounded-full bg-gray-100 h-10 w-10 flex justify-center items-center"
        >
          <font-awesome-icon
            :icon="['fas', 'chart-simple']"
            class="text-green-600 text-xl"
          />
        </div>
      </div>
      <div class="h-50 ml-4 flex w-auto flex-col justify-center">
        <p class="font-dm text-sm font-medium text-gray-600">Today's Sale</p>
        <h4 class="text-xl font-bold text-gray-700">
          ৳ {{ (today?.totalSale || 0) | currencyNumber }}
        </h4>
      </div>
    </div>
    <div
      class="relative flex bg-white bg-clip-border shadow-3xl shadow-shadow-500 flex-grow items-center rounded-2xl p-3 shadow-md"
    >
      <div class="flex w-auto flex-row items-center">
        <div
          class="rounded-full bg-gray-100 h-10 w-10 flex justify-center items-center"
        >
          <font-awesome-icon
            :icon="['fas', 'clipboard-check']"
            class="text-sky-600 text-xl"
          />
        </div>
      </div>
      <div class="h-50 ml-4 flex w-auto flex-col justify-center">
        <p class="font-dm text-sm font-medium text-gray-600">Today's Order</p>
        <h4 class="text-xl font-bold text-gray-700">
          {{ today?.totalOrder || 0 }}
        </h4>
      </div>
    </div>
    <div
      class="relative flex bg-white bg-clip-border shadow-3xl shadow-shadow-500 flex-grow items-center rounded-2xl p-3 shadow-md"
    >
      <div class="flex w-auto flex-row items-center">
        <div
          class="rounded-full bg-gray-100 h-10 w-10 flex justify-center items-center"
        >
          <font-awesome-icon
            :icon="['fas', 'chart-simple']"
            class="text-green-600 text-xl"
          />
        </div>
      </div>
      <div class="h-50 ml-4 flex w-auto flex-col justify-center">
        <p class="font-dm text-sm font-medium text-gray-600">
          Last 7 Days Sale
        </p>
        <h4 class="text-xl font-bold text-gray-700">
          ৳ {{ (weekly?.totalSale || 0) | currencyNumber }}
        </h4>
      </div>
    </div>
    <div
      class="relative flex bg-white bg-clip-border shadow-3xl shadow-shadow-500 flex-grow items-center rounded-2xl p-3 shadow-md"
    >
      <div class="flex w-auto flex-row items-center">
        <div
          class="rounded-full bg-gray-100 h-10 w-10 flex justify-center items-center"
        >
          <font-awesome-icon
            :icon="['fas', 'clipboard-check']"
            class="text-sky-600 text-xl"
          />
        </div>
      </div>
      <div class="h-50 ml-4 flex w-auto flex-col justify-center">
        <p class="font-dm text-sm font-medium text-gray-600">
          Last 7 Days Order
        </p>
        <h4 class="text-xl font-bold text-gray-700">
          {{ weekly?.totalOrder }}
        </h4>
      </div>
    </div>
    <div
      class="relative flex bg-white bg-clip-border shadow-3xl shadow-shadow-500 flex-grow items-center rounded-2xl p-3 shadow-md"
    >
      <div class="flex w-auto flex-row items-center">
        <div
          class="rounded-full bg-gray-100 h-10 w-10 flex justify-center items-center"
        >
          <font-awesome-icon
            :icon="['fas', 'chart-simple']"
            class="text-green-600 text-xl"
          />
        </div>
      </div>
      <div class="h-50 ml-4 flex w-auto flex-col justify-center">
        <p class="font-dm text-sm font-medium text-gray-600">This Month Sale</p>
        <h4 class="text-xl font-bold text-gray-700">
          ৳ {{ (monthly?.totalSale || 0) | currencyNumber }}
        </h4>
      </div>
    </div>
    <div
      class="relative flex bg-white bg-clip-border shadow-3xl shadow-shadow-500 flex-grow items-center rounded-2xl p-3 shadow-md"
    >
      <div class="flex w-auto flex-row items-center">
        <div
          class="rounded-full bg-gray-100 h-10 w-10 flex justify-center items-center"
        >
          <font-awesome-icon
            :icon="['fas', 'clipboard-check']"
            class="text-sky-600 text-xl"
          />
        </div>
      </div>
      <div class="h-50 ml-4 flex w-auto flex-col justify-center">
        <p class="font-dm text-sm font-medium text-gray-600">
          This Month Order
        </p>
        <h4 class="text-xl font-bold text-gray-700">
          {{ monthly?.totalOrder || 0 }}
        </h4>
      </div>
    </div>
    <div
      class="relative flex bg-white bg-clip-border shadow-3xl shadow-shadow-500 flex-grow items-center rounded-2xl p-3 shadow-md"
    >
      <div class="flex w-auto flex-row items-center">
        <div
          class="rounded-full bg-gray-100 h-10 w-10 flex justify-center items-center"
        >
          <font-awesome-icon
            :icon="['fas', 'ban']"
            class="text-rose-600 text-xl"
          />
        </div>
      </div>
      <div class="h-50 ml-4 flex w-auto flex-col justify-center">
        <p class="font-dm text-sm font-medium text-gray-600">
          Today's cancel order
        </p>
        <h4 class="text-xl font-bold text-gray-700">
          {{ dailyCancel }}
        </h4>
      </div>
    </div>
    <div
      class="relative flex bg-white bg-clip-border shadow-3xl shadow-shadow-500 flex-grow items-center rounded-2xl p-3 shadow-md"
    >
      <div class="flex w-auto flex-row items-center">
        <div
          class="rounded-full bg-gray-100 h-10 w-10 flex justify-center items-center"
        >
          <font-awesome-icon
            :icon="['fas', 'ban']"
            class="text-rose-600 text-xl"
          />
        </div>
      </div>
      <div class="h-50 ml-4 flex w-auto flex-col justify-center">
        <p class="font-dm text-sm font-medium text-gray-600">
          Last 7 days cancel order
        </p>
        <h4 class="text-xl font-bold text-gray-700">
          {{ weeklyCancel }}
        </h4>
      </div>
    </div>
    <div
      class="relative flex bg-white bg-clip-border shadow-3xl shadow-shadow-500 flex-grow items-center rounded-2xl p-3 shadow-md"
    >
      <div class="flex w-auto flex-row items-center">
        <div
          class="rounded-full bg-gray-100 h-10 w-10 flex justify-center items-center"
        >
          <font-awesome-icon
            :icon="['fas', 'ban']"
            class="text-rose-600 text-xl"
          />
        </div>
      </div>
      <div class="h-50 ml-4 flex w-auto flex-col justify-center">
        <p class="font-dm text-sm font-medium text-gray-600">
          Monthly cancel order
        </p>
        <h4 class="text-xl font-bold text-gray-700">
          {{ monthlyCancel }}
        </h4>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  name: "DashboardSummery",
  data() {
    return {
      loading: true,
      today: { totalOrder: 0, totalSale: 0 },
      weekly: { totalOrder: 0, totalSale: 0 },
      monthly: { totalOrder: 0, totalSale: 0 },
      dailyCancel: 0,
      weeklyCancel: 0,
      monthlyCancel: 0,
    };
  },
  mounted() {
    this.fetchDashboard();
  },
  methods: {
    async fetchDashboard() {
      try {
        this.loading = true;
        const params = {
          today: new Date(),
          week: [new Date(this.$moment().subtract(7, "days")), new Date()],
          month: [
            new Date(this.$moment().startOf("month")),
            new Date(this.$moment().endOf("month")),
          ],
        };
        const {
          todaySale,
          weeklySale,
          monthlySale,
          dailyCancel,
          weeklyCancel,
          monthlyCancel,
        } = await this.$mowApi.fetchDashboard(params);

        todaySale ? (this.today = todaySale) : null;
        weeklySale ? (this.weekly = weeklySale) : null;
        monthlySale ? (this.monthly = monthlySale) : null;
        this.dailyCancel = dailyCancel || 0;
        this.weeklyCancel = weeklyCancel || 0;
        this.monthlyCancel = monthlyCancel || 0;
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
