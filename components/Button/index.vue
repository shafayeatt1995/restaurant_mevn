<template>
  <button
    class="flex justify-center items-center px-5 py-3 text-sm font-medium tracking-wide capitalize transition-colors duration-300 transform rounded-lg focus:outline-none focus:ring focus:ring-opacity-50 gap-1"
  >
    <Spinner v-if="loading" />
    <slot />
  </button>
</template>
<script>
export default {
  props: { loading: Boolean },
  name: "Button",
};
</script>
