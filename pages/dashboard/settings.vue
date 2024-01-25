<template>
  <div>
    <section
      class="flex flex-col w-full px-4 md:justify-between md:items-center md:flex-row mb-5"
    >
      <div>
        <h2 class="text-3xl font-medium text-gray-600">Settings</h2>
      </div>
    </section>
    <section class="px-4">
      <div class="p-4 bg-white">
        <TabTitle :tabTitle="tabTitle" v-model="activeTab" />
        <div class="mt-4">
          <SettingsNotification v-if="activeTab === 'Notification'" />
          <SettingsPrinting v-if="activeTab === 'Printing'" />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "settings",
  layout: "dashboard",
  middleware: "adminOrManagerOrWaiter",
  head() {
    return { title: "Settings - " + this.pageTitle };
  },
  data() {
    return {
      activeTab: "Notification",
    };
  },
  computed: {
    ...mapGetters(["pageTitle", "manager"]),
    tabTitle() {
      return [
        { title: "Notification", icon: ["far", "bell"] },
        { title: "Printing", icon: ["far", "newspaper"], show: this.manager },
      ];
    },
  },
};
</script>
