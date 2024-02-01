<template>
  <div>
    <section class="px-2 lg:px-6">
      <div>
        <h2 class="text-3xl font-medium text-gray-600 mb-2">
          {{ $auth.user.restaurant.name }}'s Dashboard
        </h2>
      </div>
    </section>
    <DashboardSummery />
    <DashboardMonthlySalesChart />
    <div class="my-3 px-2 lg:px-6 grid grid-cols-1 lg:grid-cols-2">
      <DashboardRecentOrder />
    </div>
  </div>
</template>
<script>
export default {
  name: "DashboardManager",
};
</script>
