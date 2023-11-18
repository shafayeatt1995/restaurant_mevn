<template>
  <Button
    class="text-white bg-rose-500 hover:bg-rose-600 focus:ring-rose-300"
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
