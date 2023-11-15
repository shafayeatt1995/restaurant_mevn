<template>
  <div>Ami anik</div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  name: "SelectImage",
  mounted() {
    this.getImages();
  },
  methods: {
    ...mapActions("photo", ["getImages"]),
  },
};
</script>
