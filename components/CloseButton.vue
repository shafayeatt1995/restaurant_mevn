<template>
  <p
    class="shadow-xl h-12 w-12 rounded-full flex justify-center items-center cursor-pointer text-rose-500"
  >
    <font-awesome-icon :icon="['fas', 'xmark']" class="text-2xl" />
  </p>
</template>

<script>
export default {
  name: "CloseButton",
};
</script>
