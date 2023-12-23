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
    this.$nuxt.$on("apiError", (error) => {
      this.$toast.error(
        error?.response?.data?.errors
          ? error?.response?.data?.errors[
              Object.keys(error?.response?.data?.errors)[0]
            ][0]
          : error.response.data.message
          ? error.response.data.message
          : "Something Wrong! Please try Again"
      );
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
    this.$nuxt.$off("apiError");
    this.$nuxt.$off("error");
    this.$nuxt.$off("warning");
  },
};
</script>
