<template>
  <div class="flex flex-col gap-3">
    <div class="flex justify-between items-center">
      <p>Check notification</p>
      <Button @click.native.prevent="checkNotification"
        >Check notification</Button
      >
    </div>
  </div>
</template>
<script>
import { getAuth, signInAnonymously } from "firebase/auth";
import { getMessaging, onMessage, getToken } from "firebase/messaging";
import { messaging } from "@/plugins/firebase";
export default {
  name: "SettingsNotification",
  mounted() {
    const messaging = getMessaging();
    onMessage(messaging, (payload) => {
      console.log("message on client: ", payload);
    });
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
    async checkNotification() {
      await signInAnonymously(getAuth());
      this.activate();
    },
    async activate() {
      try {
        const token = await getToken(messaging, {
          vapidKey: "",
        });
        console.log("ami anik");
        console.log(messaging);
        if (token) {
          console.log(token);
        } else {
          console.log("token pai ni");
        }
      } catch (error) {
        console.log(error);
      }
    },
    playNotificationSound() {
      const audio = new Audio("/audio/order.mp3");
      audio.play();
    },
  },
};
</script>
