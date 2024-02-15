<template>
  <div>
    <section
      class="flex flex-col w-full px-4 md:justify-between md:items-center md:flex-row mb-5"
    >
      <div>
        <h2 class="text-3xl font-medium text-gray-800">
          {{ $auth.user?.restaurant?.name }} Report
        </h2>
      </div>
    </section>

    <section class="px-4 flex flex-col gap-5">
      <ReportEarning />
      <ReportOrder />
      <ReportWaiterSales />
      <ReportWaiterOrders />
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <ReportDailyBestItem />
        <ReportWeeklyBestItem />
        <ReportMonthlyBestItem />
      </div>
      <div class="grid grid-cols-1 lg:grid-cols-2"></div>
    </section>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Report",
  layout: "dashboard",
  middleware: "manager",
  head() {
    return { title: "Report - " + this.pageTitle };
  },
  computed: {
    ...mapGetters(["pageTitle"]),
  },
};
</script>
