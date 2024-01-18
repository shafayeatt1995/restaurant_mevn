<template>
  <div>
    <DashboardManager v-if="manager" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Dashboard",
  layout: "dashboard",
  head() {
    return { title: "Dashboard - " + this.pageTitle };
  },
  data() {
    return {
      isOpen: false,
    };
  },
  computed: {
    ...mapGetters(["pageTitle", "manager"]),
  },
};
</script>
