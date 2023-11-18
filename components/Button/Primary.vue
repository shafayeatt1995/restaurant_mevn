<template>
  <Button
    class="text-white bg-green-500 hover:bg-green-600 focus:ring-green-300"
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
