<template>
  <div class="flex flex-col gap-3">
    <div class="flex justify-between items-center">
      <p>Check Support</p>
      <Button @click.native.prevent="checkSupport" :loading="loading"
        >Check</Button
      >
    </div>
    <div class="flex justify-between items-center">
      <p>Reset Notification</p>
      <Button @click.native.prevent="installServiceWorker" :loading="loading"
        >Reset notification</Button
      >
    </div>
    <div class="flex justify-between items-center">
      <p>Test notification</p>
      <Button @click.native.prevent="testNotification" :loading="testLoading"
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
      testLoading: false,
      registrationData: null,
    };
  },
  methods: {
    checkSupport() {
      if (!("serviceWorker" in navigator)) {
        alert("Your Browser doesn't support ServiceWorkers");
      } else {
        alert("Your Browser support ServiceWorkers");
      }
    },
    async installServiceWorker() {
      try {
        this.loading = true;
        if ("serviceWorker" in navigator && "Notification" in window) {
          const permission = await Notification.requestPermission();
          if (permission === "granted") {
            const registration = await navigator.serviceWorker.getRegistration(
              "/service-worker.js"
            );
            if (registration) {
              await registration.unregister();
            }

            await navigator.serviceWorker.register("/service-worker.js");
            setTimeout(() => {
              this.$nuxt.$emit(
                "success",
                "Your device added to the notification service"
              );
            }, 500);
          } else {
            alert("Notification permission not granted");
          }
        } else {
          alert("Service Worker or Notification API not supported");
        }
      } catch (error) {
        alert("Error during service worker registration:", error);
      } finally {
        this.loading = false;
      }
    },
    async testNotification() {
      try {
        this.testLoading = true;
        await this.$commonApi.testNotification();
      } catch (error) {
        console.error(error);
      } finally {
        this.testLoading = false;
      }
    },
  },
};
</script>
