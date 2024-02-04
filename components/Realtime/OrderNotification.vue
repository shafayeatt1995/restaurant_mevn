<template>
  <audio
    ref="audioPlayer"
    src="/audio/order.mp3"
    @loadeddata="playSound"
    class="hidden"
  ></audio>
</template>
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
    showNotification(data) {
      if ("Notification" in window) {
        Notification.requestPermission().then((permission) => {
          if (permission === "granted") {
            const notification = new Notification(
              `New order received from ${data.tableName}`
            );
            notification.onclick = function () {
              window.open(`${this.baseUrl}/dashboard/order`, "_blank");
            };
          } else {
            alert("Permission denied for notifications");
          }
        });
      } else {
        alert("Notification API not supported in this browser");
      }
      this.playSound();
    },
    async playSound() {
      try {
        this.$refs.audioPlayer.play();
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
