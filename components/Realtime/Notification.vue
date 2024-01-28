<template></template>
<script>
import socket from "@/utils/socket";
import { mapGetters } from "vuex";

export default {
  name: "RealtimePrintItemList",
  data() {
    return {
      orderDetails: {},
    };
  },
  computed: {
    ...mapGetters(["baseUrl", "manager"]),
  },
  mounted() {
    if (this.$auth?.user?.restaurant?._id && this.manager) {
      socket.on(`request-bill-${restaurantID}`, () => {
        this.$emit("refetch");
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
