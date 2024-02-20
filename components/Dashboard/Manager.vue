<template>
  <div>
    <section class="px-2 lg:px-6">
      <div>
        <p class="font-medium text-gray-700 mb-2">
          {{ $moment().format("ddd DD, MMM YYYY") }}
        </p>
        <h2 class="text-3xl font-medium text-gray-700 mb-2">
          Hello, {{ $auth.user.restaurant.name }}
        </h2>
      </div>
    </section>
    <DashboardSummery />
    <!-- <div class="grid grid-cols-1 lg:grid-cols-2" v-if="manager">
      <DashboardRestaurantDetails />
    </div> -->
    <DashboardMonthlySalesChart />
    <div class="my-3 px-2 lg:px-6 grid gap-4 grid-cols-1 lg:grid-cols-2">
      <DashboardWeeklySalesChart />
      <DashboardRecentOrder />
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "DashboardManager",
  computed: {
    ...mapGetters(["manager"]),
  },
};
</script>
