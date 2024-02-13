<template>
  <div>
    <section
      class="flex flex-col w-full px-4 md:justify-between md:items-center md:flex-row mb-5"
    >
      <div>
        <h2 class="text-3xl font-medium text-gray-600">
          {{ $auth.user?.restaurant?.name || $auth.user?.name }} Report
        </h2>
      </div>
    </section>

    <section class="px-4">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <ReportDailyBestItem />
        <ReportWeeklyBestItem />
        <ReportMonthlyBestItem />
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "Report",
  layout: "dashboard",
  middleware: "manager",
  head() {
    return { title: "Report - " + this.pageTitle };
  },
};
</script>
