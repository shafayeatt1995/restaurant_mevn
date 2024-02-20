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
        <p class="font-medium text-gray-700">Today's Sale</p>
        <h4 class="text-xl font-bold text-gray-700">
          <span v-if="activeSubscription">
            ৳ {{ (today?.totalSale || 0) | currencyNumber }}
          </span>
          <Upgrade v-else class="text-sm"> 🔒 Upgrade your account </Upgrade>
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
        <p class="text-sm font-medium text-gray-700">Today's Order</p>
        <h4 class="text-xl font-bold text-gray-700">
          <span v-if="activeSubscription">
            {{ today?.totalOrder || 0 }}
          </span>
          <Upgrade v-else class="text-sm"> 🔒 Upgrade your account </Upgrade>
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
        <p class="text-sm font-medium text-gray-700">Today's cancel order</p>
        <h4 class="text-xl font-bold text-gray-700">
          <span v-if="activeSubscription">
            {{ dailyCancel }}
          </span>
          <Upgrade v-else class="text-sm"> 🔒 Upgrade your account </Upgrade>
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
        <p class="text-sm font-medium text-gray-700">This Month Sale</p>
        <h4 class="text-xl font-bold text-gray-700">
          <span v-if="activeSubscription">
            ৳ {{ (monthly?.totalSale || 0) | currencyNumber }}
          </span>
          <Upgrade v-else class="text-sm"> 🔒 Upgrade your account </Upgrade>
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
        <p class="text-sm font-medium text-gray-700">This Month Order</p>
        <h4 class="text-xl font-bold text-gray-700">
          <span v-if="activeSubscription">
            {{ monthly?.totalOrder || 0 }}
          </span>
          <Upgrade v-else class="text-sm"> 🔒 Upgrade your account </Upgrade>
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
        <p class="text-sm font-medium text-gray-700">This month cancel order</p>
        <h4 class="text-xl font-bold text-gray-700">
          <span v-if="activeSubscription">
            {{ monthlyCancel }}
          </span>
          <Upgrade v-else class="text-sm"> 🔒 Upgrade your account </Upgrade>
        </h4>
      </div>
    </div>
  </section>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "DashboardSummery",
  data() {
    return {
      loading: true,
      today: { totalOrder: 0, totalSale: 0 },
      monthly: { totalOrder: 0, totalSale: 0 },
      dailyCancel: 0,
      monthlyCancel: 0,
    };
  },
  computed: {
    ...mapGetters(["activeSubscription"]),
  },
  mounted() {
    this.fetchDashboard();
  },
  methods: {
    async fetchDashboard() {
      try {
        if (this.activeSubscription) {
          this.loading = true;
          const params = {
            today: [
              this.$moment().startOf("day").toDate(),
              this.$moment().endOf("day").toDate(),
            ],
            month: [
              this.$moment().startOf("month"),
              this.$moment().endOf("month"),
            ],
          };
          const { todaySale, monthlySale, dailyCancel, monthlyCancel } =
            await this.$mowApi.fetchDashboard(params);

          todaySale ? (this.today = todaySale) : null;
          monthlySale ? (this.monthly = monthlySale) : null;
          this.dailyCancel = dailyCancel || 0;
          this.monthlyCancel = monthlyCancel || 0;
        }
      } catch (error) {
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
