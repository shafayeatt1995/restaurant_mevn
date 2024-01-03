<template></template>
<script>
import socket from "@/utils/socket";

export default {
  props: {
    // arb_id: {
    //   type: String,
    //   required: true,
    // },
    // realtime: {
    //   type: Object,
    //   required: true,
    // },
  },
  computed: {
    // room_id() {
    //   return this.arb_id
    // },
  },
  mounted() {
    // if (this.room_id) {
    //   socket.emit('joinArbitrage', this.room_id)
    //   socket.on('arbitrage-' + this.room_id, this.handleData)
    // }
  },
  beforeDestroy() {
    // if (this.room_id) {
    //   socket.emit('leaveArbitrage', this.room_id)
    //   socket.off('arbitrage-' + this.room_id)
    // }
  },
  methods: {
    // handleData(data) {
    //   if (data) {
    //     this.$emit('update:realtime', data)
    //   }
    // },
  },
};
</script>
