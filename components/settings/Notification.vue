<template>
  <div>
    <div class="flex justify-between">
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
  },
};
</script>
