<template>
  <div class="flex flex-col gap-3">
    <div class="flex justify-between items-center">
      <p>Action</p>
      <Button @click.native.prevent="main" :loading="loading"
        >Reset Notification</Button
      >
    </div>
    <div class="flex justify-between items-center">
      <p>Test notification</p>
      <Button @click.native.prevent="testNotification" :loading="loading"
        >Test notification</Button
      >
    </div>
  </div>
</template>
<script>
export default {
  name: "SettingsNotification",
  data() {
    return {
      loading: false,
      serviceWorker: false,
      registrationData: null,
    };
  },
  methods: {
    async main() {
      this.checkPermission();
      await this.requestNotificationPermission();
      await this.register();
    },
    checkPermission() {
      try {
        if (!("serviceWorker" in navigator)) {
          throw new Error("No support for service worker!");
        }

        if (!("Notification" in window)) {
          throw new Error("No support for notification API");
        }

        if (!("PushManager" in window)) {
          throw new Error("No support for Push API");
        }
      } catch (error) {
        console.error(error);
      }
    },
    async requestNotificationPermission() {
      try {
        const permission = await Notification.requestPermission();

        if (permission !== "granted") {
          throw new Error("Notification permission not granted");
        }
      } catch (error) {
        console.error(error);
      }
    },
    async register() {
      try {
        const registration = await navigator.serviceWorker.getRegistration(
          "/service-worker.js"
        );
        if (registration) {
          await registration.unregister();
        }
        const register = await navigator.serviceWorker.register(
          "/service-worker.js"
        );
        return register;
      } catch (error) {
        console.error(error);
      }
    },
    async testNotification() {
      try {
        this.loading = true;
        await this.$commonApi.testNotification();
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
