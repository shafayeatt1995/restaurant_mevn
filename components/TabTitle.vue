<template>
  <div
    class="flex overflow-x-auto overflow-y-hidden border-b border-gray-200 whitespace-nowrap"
  >
    <template v-for="({ title, icon, iconClass, show = true }, i) in tabTitle">
      <button
        class="inline-flex items-center justify-center h-10 px-2 py-2 -mb-px text-center bg-transparent border-b-2 sm:px-4 -px-1 whitespace-nowrap focus:outline-none"
        :key="i"
        @click="active = title"
        :class="[
          active === title
            ? 'text-green-600 border-green-500 font-semibold'
            : 'text-gray-700 border-gray-400',
          fullWidth ? 'flex-1' : '',
        ]"
        type="button"
        v-if="show"
      >
        <i :class="[icon, iconClass ?? '']" v-if="icon" />
        <span class="mx-1 text-sm sm:text-base"> {{ title }}</span>
      </button>
    </template>
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
