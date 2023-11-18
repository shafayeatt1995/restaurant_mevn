<template>
  <Button
    class="text-gray-700 border border-gray-200 hover:bg-gray-100 focus:ring-gray-300 disabled:hover:bg-gray-300 disabled:bg-gray-300"
    :loading="loading"
  >
    <slot />
  </Button>
</template>
<script>
export default {
  name: "Primary",
  props: { loading: Boolean },
};
</script>
