<template>
  <div class="px-4">
    <div class="px-6 py-8 mx-auto bg-white rounded-xl">
      <HomePricing />
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "Subscription",
  layout: "dashboard",
  middleware: "managerOrUser",
  head() {
    return { title: "Subscription - " + this.pageTitle };
  },
};
</script>
