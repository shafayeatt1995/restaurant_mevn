<template>
  <div class="relative flex justify-center">
    <transition mode="out-in" name="fade">
      <div
        v-if="modal"
        class="fixed inset-0 z-40 overflow-y-auto"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <div
          class="flex items-center justify-center min-h-screen px-4 pt-4 modal-bg"
        >
          <!-- pb-20 text-center sm:block sm:p-0 -->
          <span
            class="hidden sm:inline-block sm:h-screen sm:align-middle"
            aria-hidden="true"
            >&#8203;</span
          >

          <div
            class="relative inline-block px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 w-full lg:w-2/3"
          >
            <div class="flex items-center">
              <TabTitle
                :tabTitle="tabTitle"
                v-model="active"
                fullWidth
                class="flex-1"
              />
              <font-awesome-icon
                :icon="['fas', 'xmark']"
                class="text-red-500 text-2xl cursor-pointer"
                @click="modal = false"
              />
            </div>
            <ImageModalSelectImage v-if="active === 'Select image'" />
            <ImageModalUpload v-else-if="active === 'Upload'" v-model="modal" />
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
export default {
  name: "ImageModal",
  data() {
    return {
      tabTitle: [
        { title: "Select image", icon: ["far", "images"] },
        { title: "Upload", icon: ["fas", "cloud-arrow-up"] },
      ],
      active: "Select image",
    };
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
  },
};
</script>

<style scoped>
.modal-bg {
  background: rgb(51 51 51 / 50%);
}
</style>
