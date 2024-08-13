<template>
  <div class="relative min-h-screen lg:flex">
    <DashboardMobileTopbar v-model="isOpen" />
    <DashboardSidebar :isOpen="isOpen" />
    <main
      id="content"
      class="flex-1 pb-12 space-y-6 overflow-y-auto bg-gray-100 lg:h-screen md:space-y-8"
    >
      <DashboardTopbar />
      <Nuxt />
      <CreateRestaurant />
    </main>
    <RealtimeOrderNotification />
    <RealtimePrintItemList />
  </div>
</template>
<script>
export default {
  name: "DashboardLayout",
  data() {
    return {
      isOpen: false,
    };
  },

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

  watch: {
    $route(to, from) {
      this.isOpen = false;
    },
  },
};
</script>

<style lang="scss">
body {
  font-family: "Nunito", sans-serif;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.fade-scale-enter-active,
.fade-scale-leave-active {
  transition: opacity 100ms, transform 100ms;
}

.fade-scale-enter,
.fade-scale-leave-to {
  opacity: 0;
  transform: scale(0.9);
}

.fade-scale-leave,
.fade-scale-enter-to {
  opacity: 1;
  transform: scale(1);
}
</style>
