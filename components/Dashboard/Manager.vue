<template>
  <div>
    <section class="px-6">
      <div>
        <h2 class="text-3xl font-medium text-gray-600 mb-2">
          {{ $auth.user.restaurant.name }}'s Dashboard
        </h2>
      </div>
    </section>

    <section class="grid grid-cols-1 gap-4 px-6 lg:grid-cols-3">
      <div
        class="flex flex-col items-center px-2 py-4 bg-white rounded-lg shadow-md shadow-gray-200"
      >
        <h2 class="text-xl text-gray-600 mb-3">Today</h2>
        <div class="flex justify-center w-full gap-8">
          <div class="flex items-center">
            <div
              class="flex justify-center items-center bg-green-200 h-12 w-12 rounded-full"
            >
              <font-awesome-icon
                :icon="['far', 'file-lines']"
                class="text-green-600 text-xl"
              />
            </div>

            <div class="mx-2">
              <p class="mt-1 text-sm text-gray-500">Total order</p>
              <h3 class="text-2xl font-medium text-gray-600">
                <Skeleton v-if="loading" />
                <template v-else>
                  {{ today.totalOrder }}
                </template>
              </h3>
            </div>
          </div>

          <div class="flex items-center">
            <div
              class="flex justify-center items-center bg-green-200 h-12 w-12 rounded-full"
            >
              <font-awesome-icon
                :icon="['fas', 'bangladeshi-taka-sign']"
                class="text-green-600 text-xl"
              />
            </div>

            <div class="mx-2">
              <p class="mt-1 text-sm text-gray-500">Total sale</p>
              <h3 class="text-2xl font-medium text-gray-600">
                <Skeleton v-if="loading" />
                <template v-else>
                  {{ today.totalSale | currencyNumber }}
                </template>
              </h3>
            </div>
          </div>
        </div>
      </div>

      <div
        class="flex flex-col items-center px-2 py-4 bg-white rounded-lg shadow-md shadow-gray-200"
      >
        <h2 class="text-xl text-gray-600 mb-3">Last 7 days</h2>
        <div class="flex justify-evenly w-full">
          <div class="flex items-center">
            <div
              class="flex justify-center items-center bg-green-200 h-12 w-12 rounded-full"
            >
              <font-awesome-icon
                :icon="['far', 'file-lines']"
                class="text-green-600 text-xl"
              />
            </div>

            <div class="mx-2">
              <p class="mt-1 text-sm text-gray-500">Total order</p>
              <h3 class="text-2xl font-medium text-gray-600">
                <Skeleton v-if="loading" />
                <template v-else>
                  {{ weekly.totalOrder }}
                </template>
              </h3>
            </div>
          </div>

          <div class="flex items-center">
            <div
              class="flex justify-center items-center bg-green-200 h-12 w-12 rounded-full"
            >
              <font-awesome-icon
                :icon="['fas', 'bangladeshi-taka-sign']"
                class="text-green-600 text-xl"
              />
            </div>

            <div class="mx-2">
              <p class="mt-1 text-sm text-gray-500">Total sale</p>
              <h3 class="text-2xl font-medium text-gray-600">
                <Skeleton v-if="loading" />
                <template v-else>
                  {{ weekly.totalSale | currencyNumber }}
                </template>
              </h3>
            </div>
          </div>
        </div>
      </div>

      <div
        class="flex flex-col items-center px-2 py-4 bg-white rounded-lg shadow-md shadow-gray-200"
      >
        <h2 class="text-xl text-gray-600 mb-3">This month</h2>
        <div class="flex justify-evenly w-full">
          <div class="flex items-center">
            <div
              class="flex justify-center items-center bg-green-200 h-12 w-12 rounded-full"
            >
              <font-awesome-icon
                :icon="['far', 'file-lines']"
                class="text-green-600 text-xl"
              />
            </div>

            <div class="mx-2">
              <p class="mt-1 text-sm text-gray-500">Total order</p>
              <h3 class="text-2xl font-medium text-gray-600">
                <Skeleton v-if="loading" />
                <template v-else>
                  {{ monthly.totalOrder }}
                </template>
              </h3>
            </div>
          </div>

          <div class="flex items-center">
            <div
              class="flex justify-center items-center bg-green-200 h-12 w-12 rounded-full"
            >
              <font-awesome-icon
                :icon="['fas', 'bangladeshi-taka-sign']"
                class="text-green-600 text-xl"
              />
            </div>

            <div class="mx-2">
              <p class="mt-1 text-sm text-gray-500">Total sale</p>
              <h3 class="text-2xl font-medium text-gray-600">
                <Skeleton v-if="loading" />
                <template v-else>
                  {{ monthly.totalSale | currencyNumber }}
                </template>
              </h3>
            </div>
          </div>
        </div>
      </div>

      <div class="py-4 bg-white rounded-lg shadow-md shadow-gray-200">
        <p class="px-3 text-center text-xl text-gray-600 mb-3 font-semibold">
          Today's Best Sales
        </p>
        <div
          class="pl-3 pr-4 max-h-96 overflow-y-auto overflow-x-hidden text-gray-600"
        >
          <div class="flex items-center">
            <p class="w-20 text-center">Image</p>
            <p class="flex-1">Item name</p>
            <p class="text-center">Qty</p>
          </div>
          <hr />
          <div
            class="flex items-center mb-2"
            v-for="(item, key) in loading ? 5 : todayItems"
            :key="key"
          >
            <Skeleton v-if="loading" class="w-full my-5" />
            <template v-else>
              <img
                loading="lazy"
                class="max-w-20 max-h-20"
                :src="item.itemImage"
                :alt="item.itemName"
              />
              <p class="flex-1 font-semibold">{{ item.itemName }} ami anik</p>
              <p class="text-center">{{ item.totalQuantity }}</p>
            </template>
          </div>
        </div>
      </div>

      <div class="py-4 bg-white rounded-lg shadow-md shadow-gray-200">
        <p class="px-3 text-center text-xl text-gray-600 mb-3 font-semibold">
          Last 7 days best Sales
        </p>
        <div
          class="pl-3 pr-4 max-h-96 overflow-y-auto overflow-x-hidden text-gray-600"
        >
          <div class="flex items-center">
            <p class="w-20 text-center">Image</p>
            <p class="flex-1">Item name</p>
            <p class="text-center">Qty</p>
          </div>
          <hr />
          <div
            class="flex items-center mb-2"
            v-for="(item, key) in loading ? 5 : weeklyItems"
            :key="key"
          >
            <Skeleton v-if="loading" class="w-full my-5" />
            <template v-else>
              <img
                loading="lazy"
                class="w-20"
                :src="item.itemImage"
                :alt="item.itemName"
              />
              <p class="flex-1 font-semibold">
                {{ item.itemName }}
              </p>
              <p class="text-center">
                {{ item.totalQuantity }}
              </p>
            </template>
          </div>
        </div>
      </div>

      <div class="py-4 bg-white rounded-lg shadow-md shadow-gray-200">
        <p class="px-3 text-center text-xl text-gray-600 mb-3 font-semibold">
          This month best Sales
        </p>
        <div
          class="pl-3 pr-4 max-h-96 overflow-y-auto overflow-x-hidden text-gray-600"
        >
          <div class="flex items-center">
            <p class="w-20 text-center">Image</p>
            <p class="flex-1">Item name</p>
            <p class="text-center">Qty</p>
          </div>
          <hr />
          <div
            class="flex items-center mb-2"
            v-for="(item, key) in loading ? 5 : monthlyItems"
            :key="key"
          >
            <Skeleton v-if="loading" class="w-full my-5" />
            <template v-else>
              <img
                loading="lazy"
                class="max-w-20 max-h-20"
                :src="item.itemImage"
                :alt="item.itemName"
              />
              <p class="flex-1 font-semibold">{{ item.itemName }}</p>
              <p class="text-center">{{ item.totalQuantity }}</p>
            </template>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
export default {
  name: "DashboardManager",
  data() {
    return {
      loading: true,
      today: { totalOrder: 0, totalSale: 0 },
      weekly: { totalOrder: 0, totalSale: 0 },
      monthly: { totalOrder: 0, totalSale: 0 },
      // total: { totalOrder: 0, totalSale: 0 },
      todayItems: [],
      weeklyItems: [],
      monthlyItems: [],
      todayPerformances: [],
      weeklyPerformances: [],
      monthlyPerformances: [],
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
          // totalSale,
          todayItems,
          weeklyItems,
          monthlyItems,
          todayPerformances,
          weeklyPerformances,
          monthlyPerformances,
        } = await this.$mowApi.fetchDashboard(params);

        todaySale ? (this.today = todaySale) : null;
        weeklySale ? (this.weekly = weeklySale) : null;
        monthlySale ? (this.monthly = monthlySale) : null;
        // totalSale ? (this.total = totalSale) : null;
        todayItems ? (this.todayItems = todayItems) : null;
        weeklyItems ? (this.weeklyItems = weeklyItems) : null;
        monthlyItems ? (this.monthlyItems = monthlyItems) : null;
        todayPerformances ? (this.todayPerformances = todayPerformances) : null;
        weeklyPerformances
          ? (this.weeklyPerformances = weeklyPerformances)
          : null;
        monthlyPerformances
          ? (this.monthlyPerformances = monthlyPerformances)
          : null;
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
