<template>
  <aside
    id="sidebar"
    :class="isOpen ? 'translate-x-0 ease-in' : '-translate-x-full ease-out'"
    class="flex flex-col w-64 h-screen px-4 pt-8 pb-16 lg:pb-8 overflow-y-auto bg-white border-r rtl:border-r-0 rtl:border-l fixed inset-y-0 left-0 z-30 min-h-screen space-y-6 text-gray-100 transition duration-200 transform lg:translate-x-0 lg:relative lg:inset-0 border-solid border-1 border-gray-200"
  >
    <nuxt-link :to="{ name: 'dashboard' }" class="mx-auto">
      <img loading="lazy" class="w-44" src="/full-logo.png" alt="logo" />
    </nuxt-link>

    <div class="flex flex-col items-center mt-6 -mx-2">
      <img
        loading="lazy"
        class="object-cover w-24 h-24 mx-2 rounded-full"
        :src="manager ? $auth.user.restaurant.logo : $auth.user.avatar"
        alt="avatar"
      />
      <h4 v-if="manager" class="mx-2 mt-2 font-medium text-gray-800">
        {{ $auth.user.restaurant.name }}
      </h4>
      <h4 class="mx-2 mt-2 font-medium text-gray-800">{{ $auth.user.name }}</h4>
      <p class="mx-2 mt-1 text-sm font-medium text-gray-800">
        {{ $auth.user.type }}
      </p>
    </div>

    <div class="flex flex-col justify-between flex-1 mt-6">
      <nav>
        <template
          v-for="({ name, title, icon, show = true, target }, i) in navLink"
        >
          <nuxt-link
            v-if="show"
            :key="i"
            :to="{ name }"
            class="flex items-center px-4 py-3 mt-2 text-gray-700 transition-colors duration-300 transform rounded-lg hover:text-gray-700 hover:bg-gray-100"
            :class="check(name)"
            :target="target"
          >
            <font-awesome-icon :icon="icon" class="w-5 h-5" />
            <span class="mx-4 font-medium">{{ title }}</span>
          </nuxt-link>
        </template>
        <hr />
        <button
          class="flex items-center px-4 py-3 mt-2 text-rose-500 transition-colors duration-300 transform rounded-lg hover:text-rose-600 hover:bg-gray-100 w-full"
          @click="logOut"
        >
          <font-awesome-icon
            :icon="['fas', 'arrow-right-from-bracket']"
            class="text-xl"
          />
          <span class="mx-4 font-medium">Logout</span>
        </button>
      </nav>
    </div>
  </aside>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "Sidebar",
  props: { isOpen: Boolean },
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["manager", "admin", "waiter"]),
    navLink() {
      const nav = [
        {
          show: this.manager || this.waiter || this.admin,
          name: "dashboard",
          title: "Dashboard",
          icon: ["fas", "cubes"],
        },
        {
          show: this.admin,
          name: "dashboard-user",
          title: "User",
          icon: ["fas", "users"],
        },
        {
          show: this.manager || this.waiter,
          name: "dashboard-order",
          title: "Order",
          icon: ["fas", "chart-line"],
        },
        {
          show: this.manager,
          name: "dashboard-report",
          title: "Report",
          icon: ["fas", "chart-pie"],
        },
        {
          show: this.manager,
          name: "dashboard-table",
          title: "Table",
          icon: ["fas", "table-cells-large"],
        },
        {
          show: this.manager,
          name: "dashboard-employee",
          title: "Employee",
          icon: ["fas", "users"],
        },
        // {
        //   show: this.manager,
        //   name: "dashboard-performance",
        //   title: "Performance",
        //   icon: ["fas", "chart-simple"],
        // },
        {
          show: this.manager,
          name: "dashboard-vat",
          title: "Vat",
          icon: ["fas", "percent"],
        },
        {
          show: this.manager,
          name: "dashboard-block-list",
          title: "Block List",
          icon: ["fas", "users-slash"],
        },
        {
          show: this.manager,
          name: "dashboard-restaurant",
          title: "Restaurant",
          icon: ["fas", "utensils"],
        },
        {
          show: this.manager || this.admin || this.waiter,
          name: "dashboard-settings",
          title: "Settings",
          icon: ["fas", "gear"],
        },
        {
          show: !this.admin,
          name: "dashboard-subscription",
          title: "Subscription",
          icon: ["fas", "address-card"],
        },
      ];
      return nav;
    },
  },
  methods: {
    check(name) {
      return this.$route.name === name ? "bg-gray-100" : "";
    },
    async logOut() {
      try {
        await this.$auth.logout("laravelJWT");
        this.$router.push({ name: "auth-login" });
      } catch (error) {}
    },
  },
};
</script>
