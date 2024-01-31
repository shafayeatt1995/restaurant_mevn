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
    <DashboardSalesChart />
  </div>
</template>
<script>
export default {
  name: "DashboardManager",
};
</script>
