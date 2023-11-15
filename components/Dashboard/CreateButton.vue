<template>
  <button
    class="px-6 py-3 focus:outline-none mt-4 text-white bg-green-500 rounded-lg md:mt-0 md:mx-1 hover:bg-green-600 transition"
  >
    <slot></slot>
  </button>
</template>
<script>
export default {
  name: "CreateButton",
};
</script>
