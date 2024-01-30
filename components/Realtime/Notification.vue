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
    }
  },
  beforeDestroy() {
    if (this.$auth?.user?.restaurant?._id && this.manager) {
      socket.off(`print-item-list-${this.$auth?.user?.restaurant?._id}`);
    }
  },
};
</script>
