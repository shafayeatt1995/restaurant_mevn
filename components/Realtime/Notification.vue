<template></template>
<script>
import socket from "@/utils/socket";
import { mapGetters } from "vuex";

export default {
  name: "RealtimePrintItemList",
  computed: {
    ...mapGetters(["baseUrl", "manager"]),
  },
  mounted() {
    if (this.$auth?.user?.restaurant?._id && this.manager) {
      socket.on(`request-bill-${this.$auth?.user?.restaurant?._id}`, (data) => {
        this.$emit("refetch", data);
      });
      socket.on(
        `order-notification-${this.$auth?.user?.restaurant?._id}`,
        (data) => {
          this.$emit("refetch", data);
        }
      );
      socket.on(
        `order-cancel-request-${this.$auth?.user?.restaurant?._id}`,
        (data) => {
          this.$emit("refetch", data);
        }
      );
    }
  },
  beforeDestroy() {
    if (this.$auth?.user?.restaurant?._id && this.manager) {
      socket.off(`request-bill-${this.$auth?.user?.restaurant?._id}`);
      socket.off(`order-notification-${this.$auth?.user?.restaurant?._id}`);
      socket.off(`order-cancel-request-${this.$auth?.user?.restaurant?._id}`);
    }
  },
};
</script>
