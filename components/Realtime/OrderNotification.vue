<template></template>
<script>
import socket from "@/utils/socket";
import { mapGetters } from "vuex";

export default {
  name: "RealtimeOrderNotification",
  computed: {
    ...mapGetters(["baseUrl"]),
  },
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
    // showNotification(data) {
    //   if ("Notification" in window) {
    //     Notification.requestPermission().then((permission) => {
    //       if (permission === "granted") {
    //         this.playNotificationSound();
    //         const notification = new Notification(
    //           `New order received from ${data.tableName}`
    //         );

    //         notification.onclick = function () {
    //           window.open(`${this.baseUrl}/dashboard/order`, "_blank");
    //         };
    //       } else {
    //         alert("Permission denied for notifications");
    //       }
    //     });
    //   } else {
    //     alert("Notification API not supported in this browser");
    //   }
    // },
    async showNotification(data) {
      if ("Notification" in window) {
        try {
          const permission = await Notification.requestPermission();

          if (permission === "granted") {
            this.playNotificationSound();

            const notification = new Notification(
              `New order received from ${data.tableName}`
            );

            notification.onclick = () => {
              window.open(`${this.baseUrl}/dashboard/order`, "_blank");
            };
          }
        } catch (error) {
          console.error("Error requesting notification permission:", error);
        }
      } else {
        alert("Notification API not supported in this browser");
      }
    },

    async playNotificationSound() {
      const audio = new Audio("/audio/order.mp3");
      audio.play();
    },
  },
};
</script>
