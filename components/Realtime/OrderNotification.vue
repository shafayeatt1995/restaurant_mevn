<template></template>
<script>
import socket from "@/utils/socket";

export default {
  mounted() {
    if (this.$auth?.user?.restaurant?._id) {
      socket.on(
        `order-notification-${this.$auth.user.restaurant._id}`,
        (data) => {
          this.$nuxt.$emit("order-notification-socket-data", data);
          this.showNotification(data);
        }
      );
    }
  },
  beforeDestroy() {
    if (this.$auth?.user?.restaurant?._id) {
      socket.off(`order-notification-${this.$auth?.user?.restaurant?._id}`);
    }
  },
  methods: {
    showNotification(data) {
      if ("Notification" in window) {
        Notification.requestPermission().then((permission) => {
          if (permission === "granted") {
            this.playNotificationSound();
            console.log("ami anik");
            const notification = new Notification(
              `New order received from ${data.tableName}`
              // {
              //   body: `click here to see the order`,
              // }
            );

            notification.onclick = function () {
              // alert("Notification clicked");
              window.open(`${process.env.BASE_URL}/dashboard/order`, "_blank");
            };
          } else {
            alert("Permission denied for notifications");
          }
        });
      } else {
        alert("Notification API not supported in this browser");
      }
    },
    playNotificationSound() {
      const audio = new Audio("/audio/order.mp3");
      audio.play();
    },
  },
};
</script>
