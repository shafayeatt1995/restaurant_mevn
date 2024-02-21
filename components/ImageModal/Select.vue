<template>
  <div>
    <div
      class="flex flex-wrap justify-between lg:justify-start gap-3 lg:gap-6 px-3 xl:grid-cols-5 2xl:grid-cols-6 lg:grid-cols-4 mt-3 max-h-96 overflow-y-auto"
      v-if="images.length > 0"
    >
      <div
        class="relative cursor-pointer text-green-600 flex items-center"
        @click="setImage(image)"
        v-for="(image, i) in images"
        :key="i"
      >
        <transition name="fade" mode="out-in">
          <div
            v-if="checkId(image._id)"
            class="flex items-center justify-center absolute w-full h-full bg-gray-800 bg-opacity-70"
          >
            <i class="text-2xl fas fa-circle-check" />
          </div>
        </transition>
        <img
          loading="lazy"
          :src="image.url"
          alt="select image"
          class="object-contain h-full w-28"
        />
      </div>
      <Observer @load="getImages">
        <Spinner class="text-green-600 h-7 w-7" v-if="isLoading" />
      </Observer>
    </div>
    <div class="flex justify-center items-center w-full py-5" v-else>
      <EmptyMessage
        @action="$emit('activeUpload')"
        title="No Images found"
        buttonText="Upload Image"
        icon="fas fa-cloud-arrow-up"
      />
    </div>
    <div
      class="flex flex-col lg:flex-row justify-end mt-3 pt-3 bg-white border-t border-gray-300 gap-4"
    >
      <Button
        variant="red"
        @click.native.prevent="$emit('update:modal', false)"
      >
        Close
      </Button>
      <Button @click.native.prevent="select" :disabled="selected.length === 0">
        <i class="fas fa-check" />
        Select
      </Button>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "SelectImage",
  props: { multiple: Boolean, modal: Boolean, limit: Number },
  computed: {
    ...mapGetters("image", ["images", "isLoading"]),
    selected: {
      get() {
        return this.$attrs.value;
      },
      set(value) {
        this.$emit("input", value);
      },
    },
  },
  mounted() {
    this.getImages();
  },
  methods: {
    ...mapActions("image", ["getImages"]),
    select() {
      this.$emit("update:modal", false);
    },

    setImage(data) {
      const { _id, url } = data;
      if (this.multiple) {
        const index = this.selected.findIndex((val) => val._id === _id);

        if (index !== -1) {
          this.selected.splice(index, 1);
        } else {
          if (this.selected.length >= this.limit) {
            this.$nuxt.$emit(
              "error",
              `You can  select maximum ${this.limit} images.`
            );
          } else {
            this.selected.push({ _id, url });
          }
        }
      } else {
        this.selected = { _id, url };
      }
    },
    checkId(_id) {
      if (this.multiple) {
        return this.selected.some((val) => val._id === _id);
      } else {
        return this.selected._id === _id;
      }
    },
  },
};
</script>
