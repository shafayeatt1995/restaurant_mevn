<template>
  <div class="flex flex-col gap-3">
    <div class="flex justify-between items-center">
      <p>Check notification</p>
      <Button @click.native.prevent="checkNotification" :loading="loading"
        >Check notification</Button
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
    };
  },
  methods: {
    async checkNotificationPermission() {
      try {
        if (!("Notification" in window)) {
          alert("This browser does not support notifications");
        } else {
          const permission = await Notification.requestPermission();
          if (permission === "granted") {
            this.playNotificationSound();
            alert("Notification permission is granted");
          } else {
            const requestPermission = await Notification.requestPermission();
            if (requestPermission === "granted") {
              alert("Notification permission granted");
            } else {
              alert("Notification permission denied");
            }
          }
        }
      } catch (error) {
        console.error(error);
      }
    },
    playNotificationSound() {
      const audio = new Audio("/audio/order.mp3");
      audio.play();
    },
    async checkNotification() {
      try {
        this.loading = true;
        if ("serviceWorker" in navigator && "Notification" in window) {
          const permission = await Notification.requestPermission();
          if (permission === "granted") {
            this.registerSW();
          } else {
            console.error("Notification permission not granted");
          }
        }
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
    async registerSW() {
      const registration = await navigator.serviceWorker.register(
        "/push-notification-service.js"
      );
      $nuxt.$emit("success", "Your device added to the notification service");

      return registration;
    },
  },
};
</script>
