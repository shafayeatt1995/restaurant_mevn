<template>
  <div>
    <div
      class="grid grid-cols-2 gap-6 px-6 xl:grid-cols-5 2xl:grid-cols-6 lg:grid-cols-4 mt-3 max-h-96 overflow-y-auto"
    >
      <div
        class="relative cursor-pointer text-green-600 flex items-center h-24 lg:h-40"
        @click="setImage(photo)"
        v-for="(photo, i) in photos"
        :key="i"
      >
        <transition name="fade" mode="out-in">
          <div
            v-if="checkId(photo.id)"
            class="flex items-center justify-center absolute w-full h-full bg-gray-800 bg-opacity-70"
          >
            <font-awesome-icon
              :icon="['fas', 'circle-check']"
              class="text-2xl"
            />
          </div>
        </transition>
        <img :src="photo.path" class="object-contain h-full w-full" />
      </div>
      <Observer @load="getImages">
        <Spinner class="text-green-600 h-7 w-7" v-if="isLoading" />
      </Observer>
    </div>
    <div
      class="flex flex-col lg:flex-row justify-end mt-3 pt-3 bg-white border-t border-gray-300"
    >
      <button
        type="button"
        class="px-4 py-2 text-sm font-medium tracking-wide text-gray-700 capitalize transition-colors duration-300 transform border border-gray-200 rounded-md sm:mx-2 hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40"
        @click="$emit('update:modal', false)"
      >
        Cancel
      </button>
      <button
        type="button"
        class="px-4 py-2 mt-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-green-500 rounded-md sm:mt-0 sm:mx-2 hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-300 focus:ring-opacity-40 disabled:cursor-not-allowed disabled:hover:bg-green-300 disabled:bg-green-300"
        @click="select"
        :disabled="selected.length === 0"
      >
        <font-awesome-icon :icon="['fas', 'check']" />
        Select
      </button>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "SelectImage",
  props: { multiple: Boolean, modal: Boolean, limit: Number },
  computed: {
    ...mapGetters("photo", ["photos", "isLoading"]),
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
    ...mapActions("photo", ["getImages"]),
    select() {
      this.$emit("update:modal", false);
    },

    setImage(data) {
      const { id, path } = data;
      if (this.multiple) {
        const index = this.selected.findIndex((val) => val.id === id);

        if (index !== -1) {
          this.selected.splice(index, 1);
        } else {
          if (this.selected.length >= this.limit) {
            $nuxt.$emit(
              "error",
              `You can  select maximum ${this.limit} images.`
            );
          } else {
            this.selected.push({ id, path });
          }
        }
      } else {
        this.selected = { id, path };
      }
    },
    checkId(id) {
      if (this.multiple) {
        return this.selected.some((val) => val.id === id);
      } else {
        return this.selected.id === id;
      }
    },
  },
};
</script>
