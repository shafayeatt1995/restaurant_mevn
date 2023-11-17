<template>
  <div class="relative flex justify-center">
    <transition-group mode="out-in" name="fade">
      <div
        v-if="modal"
        class="fixed inset-0 z-40 overflow-y-auto"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
        key="1"
      >
        <div
          class="flex items-center justify-center min-h-screen px-4 pt-4 bg-gray-500 bg-opacity-50"
        >
          <span
            class="hidden sm:inline-block sm:h-screen sm:align-middle"
            aria-hidden="true"
            >&#8203;</span
          >

          <div
            class="relative inline-block px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:w-full sm:max-w-sm sm:p-6 sm:align-middle opacity-100"
          >
            <slot />
          </div>
        </div>
      </div>
    </transition-group>
  </div>
</template>
<script>
export default {
  name: "Modal",
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
