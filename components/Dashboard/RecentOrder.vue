<template>
  <div class="flex flex-col rounded-2xl bg-white p-4 shadow-md">
    <div class="flex items-center justify-between">
      <div class="text-xl font-semibold text-gray-700">Recent orders</div>
    </div>
    <div class="max-h-72 overflow-y-auto w-full mt-2">
      <table class="w-full">
        <thead class="border-b">
          <tr class="text-gray-500 text-left">
            <th class="pb-1">
              <p class="text-sm">Order No.</p>
            </th>
            <th class="pb-1">
              <p class="text-sm">Table</p>
            </th>
            <th class="pb-1">
              <p class="text-sm">Status</p>
            </th>
            <th class="pb-1">
              <p class="text-sm">Net Price</p>
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
              :class="getStatue(order.status)?.class || ''"
            >
              <i :class="getStatue(order.status)?.icon || ''" />
              {{ order.status }}
            </td>
            <td class="pt-5 font-medium">
              {{ $currency }}{{ order.netPrice | currencyNumber }}
            </td>
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
        const { orders } = await this.$mowApi.recentOrder();
        this.items = orders;
      } catch (error) {}
    },
    getStatue(status) {
      if (status === "pending") {
        return { icon: "fas fa-clock", class: "text-amber-500" };
      } else if (status === "active") {
        return { icon: "fas fa-pizza-slice", class: "text-sky-500" };
      } else if (status === "cancel") {
        return { icon: "fas fa-circle-xmark", class: "text-rose-500" };
      } else if (status === "complete") {
        return { icon: "fas fa-circle-check", class: "text-green-500" };
      } else if (status === "billing") {
        return { icon: "fas fa-file-invoice", class: "text-purple-500" };
      }
    },
  },
};
</script>
