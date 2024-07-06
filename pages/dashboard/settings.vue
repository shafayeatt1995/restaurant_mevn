<template>
  <div>
    <section
      class="flex flex-col w-full px-4 md:justify-between md:items-center md:flex-row mb-5"
    >
      <div>
        <h2 class="text-3xl font-medium text-gray-700">Settings</h2>
      </div>
    </section>
    <section class="px-4">
      <div class="p-4 bg-white rounded-xl">
        <TabTitle :tabTitle="tabTitle" v-model="activeTab" />
        <div class="mt-4">
          <SettingsSetting v-if="activeTab === 'Setting'" />
          <SettingsNotification v-else-if="activeTab === 'Notification'" />
          <SettingsPrinting v-else-if="activeTab === 'Printing'" />
          <SettingsProfile v-else-if="activeTab === 'Profile'" />
          <SettingsPassword v-else-if="activeTab === 'Password'" />
          <SettingsDomain v-else-if="activeTab === 'Domain'" />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
// import { getAuth, signInAnonymously } from "firebase/auth";
// import { getMessaging, onMessage, getToken } from "firebase/messaging";
// import { messaging } from "@/plugins/firebase";
export default {
  name: "settings",
  layout: "dashboard",
  middleware: "adminOrManagerOrWaiter",
  head() {
    return { title: "Settings - " + this.pageTitle };
  },
  data() {
    return {
      activeTab: this.$route?.query?.tab || "Profile",
    };
  },
  computed: {
    ...mapGetters(["pageTitle", "manager", "waiter", "isDev"]),
    tabTitle() {
      return [
        { title: "Setting", icon: "fas fa-gear", show: false },
        {
          title: "Profile",
          icon: "fas fa-circle-user",
        },
        {
          title: "Password",
          icon: "fas fa-key",
          show: this.manager,
        },
        { title: "Printing", icon: "fas fa-newspaper", show: this.manager },
        { title: "Notification", icon: "far fa-bell", show: false },
        {
          title: "Domain",
          icon: "fas fa-globe",
          show: this.manager,
        },
      ];
    },
  },
  watch: {
    activeTab(tab) {
      window.history.pushState(
        {},
        "",
        `?${new URLSearchParams({ tab }).toString()}`
      );
    },
  },
  mounted() {
    // const messaging = getMessaging();
    // onMessage(messaging, (payload) => {
    //   console.log("payload", payload);
    // });
  },
  methods: {
    // async aut() {
    //   await signInAnonymously(getAuth());
    //   this.active();
    // },
    // async active() {
    //   const token = await getToken(messaging, {
    //     vapidKey:
    //       "BN4cXXQOSb4h9u1BP0RfEmWEqFtXer81m6aPtousiVFxc_TX6unhfweQe3pFBSj5-4IFJ0qYyxZOrGpdLluwjFU",
    //   });
    //   if (token) {
    //     console.log(token);
    //   }
    // },
  },
};
</script>
