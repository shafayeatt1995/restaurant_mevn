<template>
  <div class="flex flex-col gap-3">
    <div class="flex justify-between items-center">
      <p>anik</p>
      <Button @click.native.prevent="anik" :loading="loading">anik</Button>
    </div>
    <div class="flex justify-between items-center">
      <p>Check notification</p>
      <Button @click.native.prevent="checkNotification" :loading="loading"
        >Check notification</Button
      >
    </div>
    <div class="flex justify-between items-center">
      <p>Check notification</p>
      <Button @click.native.prevent="checkServiceWorker" :loading="loading"
        >Check service worker</Button
      >
    </div>
    <p>{{ JSON.stringify(registrationData) }}</p>
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
            await navigator.serviceWorker.register(
              "/push-notification-service.js",
              { scope: "/" }
            );

            $nuxt.$emit(
              "success",
              "Your device added to the notification service"
            );
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
    async checkServiceWorker() {
      try {
        if ("serviceWorker" in navigator) {
          this.serviceWorker = true;
          const registration = await navigator.serviceWorker.getRegistration(
            "/push-notification-service.js"
          );

          if (registration) {
            this.registrationData = registration;
            alert("push-notification-service.js is installed:");
            alert(registration);
          } else {
            alert("push-notification-service.js is not installed");
          }
        } else {
          alert("Service workers are not supported in this browser.");
        }
      } catch (error) {
        alert("Error checking service worker:");
      }
    },
    anik() {
      if (!("serviceWorker" in navigator)) {
        alert("Your Browser doesn't support ServiceWorkers");
      } else {
        alert("Your Browser support ServiceWorkers");
      }
    },
  },
};
</script>
