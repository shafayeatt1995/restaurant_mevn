<template></template>
<script>
export default {
  name: "KeyTrigger",
  props: { eventKey: String },
  mounted() {
    document.addEventListener("keydown", this.handleKeyPress);
  },
  beforeDestroy() {
    document.removeEventListener("keydown", this.handleKeyPress);
  },
  methods: {
    handleKeyPress(event) {
      if (event.key === this.eventKey) {
        this.$emit("action");
      }
    },
  },
};
</script>
