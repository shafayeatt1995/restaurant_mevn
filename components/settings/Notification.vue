<template>
  <div class="flex flex-col gap-3">
    <div class="flex justify-between items-center">
      <p>Check notification</p>
      <Button @click.native.prevent="checkNotificationPermission"
        >Check notification</Button
      >
    </div>
    <hr />
    <div class="flex justify-between items-center">
      <p>Check notification</p>
      <Button @click.native.prevent="installPwa">install</Button>
    </div>
  </div>
</template>
<script>
export default {
  name: "SettingsNotification",
  methods: {
    checkNotificationPermission() {
      try {
        if (!("Notification" in window)) {
          alert("This browser does not support notifications");
        } else {
          if (Notification.permission === "granted") {
            this.playNotificationSound();
            alert("Notification permission is granted");
          } else if (Notification.permission === "denied") {
            alert("Notification permission is denied");
          } else {
            Notification.requestPermission().then((permission) => {
              if (permission === "granted") {
                alert("Notification permission granted");
              } else {
                alert("Notification permission denied");
              }
            });
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
    async installPwa() {
      try {
        if ("serviceWorker" in navigator) {
          const registration = await navigator.serviceWorker.ready;
          console.log(registration);
          await registration.sync.register("installPWA");
          console.log("Service Worker registration successful:", registration);
        }
      } catch (error) {
        console.error("Error during service worker registration:", error);
      }
    },
  },
};
</script>
