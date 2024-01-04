<template></template>
<script>
import socket from "@/utils/socket";

export default {
  mounted() {
    if (this.$auth?.user?.restaurant?._id) {
      socket.on(
        `order-notification-${this.$auth?.user?.restaurant?._id}`,
        () => {
          this.showNotification();
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
    showNotification() {
      if ("Notification" in window) {
        // Request permission to show notifications
        Notification.requestPermission().then((permission) => {
          if (permission === "granted") {
            // Create and show the notification
            const notification = new Notification("Hello, World!", {
              body: "This is a sample notification.",
            });

            // You can also handle the click event of the notification
            notification.onclick = function () {
              console.log("Notification clicked");
            };
          } else {
            console.log("Permission denied for notifications");
          }
        });
      } else {
        console.log("Notification API not supported in this browser");
      }
    },
  },
};
</script>
