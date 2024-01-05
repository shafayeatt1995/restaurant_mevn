<template>
  <Nuxt />
</template>
<script>
export default {
  name: "DefaultLayout",

  created() {
    this.$nuxt.$on("success", (success) => {
      this.$toast.success(success);
    });

    // Trigger Error Toast Message
    this.$nuxt.$on("error", (message) => {
      this.$toast.error(message);
    });

    //Trigger Info Toast Message
    this.$nuxt.$on("warning", (warning) => {
      this.$toast.warning(warning);
    });
  },
  beforeDestroy() {
    this.$nuxt.$off("success");
    this.$nuxt.$off("error");
    this.$nuxt.$off("warning");
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Nunito:wght@200;300;400;500;600;700;800;900;1000&display=swap");
body {
  font-family: "Nunito", sans-serif;
}
</style>
