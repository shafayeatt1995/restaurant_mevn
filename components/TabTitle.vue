<template>
  <div
    class="flex overflow-x-auto overflow-y-hidden border-b border-gray-200 whitespace-nowrap"
  >
    <button
      class="inline-flex items-center justify-center h-10 px-2 py-2 -mb-px text-center bg-transparent border-b-2 sm:px-4 -px-1 whitespace-nowrap focus:outline-none"
      v-for="({ title, icon }, i) in tabTitle"
      :key="i"
      @click="active = title"
      :class="[
        active === title
          ? 'text-green-500 border-green-500'
          : 'text-gray-700 border-gray-400',
        fullWidth ? 'flex-1' : '',
      ]"
    >
      <font-awesome-icon :icon="icon" />
      <span class="mx-1 text-sm sm:text-base"> {{ title }}</span>
    </button>
  </div>
</template>
<script>
export default {
  name: "TabTitle",
  props: { tabTitle: Array, fullWidth: Boolean },
  computed: {
    active: {
      get() {
        return this.$attrs.value;
      },
      set(value) {
        this.$emit("input", value);
      },
    },
  },
};
</script>
