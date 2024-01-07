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
          class="flex items-center justify-center min-h-screen p-2 bg-gray-500 bg-opacity-70"
        >
          <span
            class="hidden sm:inline-block sm:h-screen sm:align-middle"
            aria-hidden="true"
            >&#8203;</span
          >

          <div
            class="relative inline-block px-4 pt-3 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 w-full sm:px-6 sm:align-middle opacity-100"
            :class="getWidth"
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
  props: {
    size: { type: String, default: "lg" },
  },
  computed: {
    modal: {
      get() {
        return this.$attrs.value;
      },
      set(value) {
        this.$emit("input", value);
      },
    },
    getWidth() {
      if (this.size === "lg") {
        return "lg:w-2/4";
      } else if (this.size === "sm") {
        return "lg:w-1/3";
      }
    },
  },
};
</script>
