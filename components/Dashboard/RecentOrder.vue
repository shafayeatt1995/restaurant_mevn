<template>
  <div class="flex flex-col rounded-2xl bg-white p-4 shadow-md">
    <div class="flex items-center justify-between">
      <div class="text-xl font-bold text-gray-700">Recent orders</div>
    </div>
    <div class="mt-2">
      <table class="w-full">
        <thead class="border-b">
          <tr class="text-gray-500 text-left">
            <th class="pb-1">
              <p class="text-xs">Order No.</p>
            </th>
            <th class="pb-1">
              <p class="text-xs">Table</p>
            </th>
            <th class="pb-1">
              <p class="text-xs">Status</p>
            </th>
            <th class="pb-1">
              <p class="text-xs">Net Price</p>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr class="text-gray-700" v-for="(order, key) in items" :key="key">
            <td class="pt-5 font-medium">
              <p class="text-sm font-bold text-navy-700">
                #{{ order.orderNumber }}
              </p>
            </td>
            <td class="pt-5 font-medium">{{ order.tableName }}</td>
            <td
              class="pt-5 font-medium capitalize"
              :class="getStatue(order.status).class"
            >
              <font-awesome-icon :icon="getStatue(order.status).icon" />
              {{ order.status }}
            </td>
            <td class="pt-5 font-medium">৳{{ order.netPrice }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
export default {
  name: "RecentOrder",
  data() {
    return {
      items: [],
    };
  },

  mounted() {
    this.fetchItems();
  },

  methods: {
    async fetchItems() {
      try {
        const { orders } = await this.$managerApi.recentOrder();
        this.items = orders;
      } catch (error) {
        console.error(error);
      }
    },
    getStatue(status) {
      if (status === "pending") {
        return { icon: ["fas", "clock"], class: "text-amber-500" };
      } else if (status === "active") {
        return { icon: ["fas", "pizza-slice"], class: "text-sky-500" };
      } else if (status === "cancel") {
        return { icon: ["fas", "circle-xmark"], class: "text-rose-500" };
      } else if (status === "complete") {
        return { icon: ["fas", "circle-check"], class: "text-green-500" };
      }
    },
  },
};
</script>
