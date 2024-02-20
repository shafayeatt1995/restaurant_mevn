<template>
  <nuxt-link
    class="hover:underline"
    :to="{ name: 'dashboard-settings', query: { tab: 'Subscription' } }"
  >
    <slot />
  </nuxt-link>
</template>
<script>
export default {
  name: "Upgrade",
};
</script>
