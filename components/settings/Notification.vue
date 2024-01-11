<template>
  <div class="flex flex-col gap-3">
    <div class="flex justify-between items-center">
      <p>Check notification</p>
      <Button @click.native.prevent="checkNotificationPermission"
        >Check notification</Button
      >
    </div>
  </div>
</template>
<script>
export default {
  name: "SettingsNotification",
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
  },
};
</script>
