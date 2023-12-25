<template>
  <transition mode="out-in" name="fade">
    <div
      v-if="modal"
      class="lg:w-[450px] w-full mx-auto fixed inset-0 z-40 overflow-y-auto"
    >
      <div
        class="relative bg-white shadow-xl h-screen w-full overflow-y-auto overflow-x-hidden"
      >
        <slot />
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  name: "MenuModal",
  computed: {
    modal: {
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
