<template>
  <div>
    <div
      class="grid grid-cols-2 gap-6 px-6 xl:grid-cols-5 2xl:grid-cols-6 lg:grid-cols-4 mt-3 max-h-96 overflow-y-auto"
    >
      <div
        class="relative cursor-pointer text-green-600 flex items-center h-40"
        @click="setImage(photo)"
        v-for="(photo, i) in photos"
        :key="i"
      >
        <transition name="fade" mode="out-in">
          <div
            v-if="checkId(photo)"
            class="flex items-center justify-center absolute w-full h-full bg-gray-800 bg-opacity-70"
          >
            <font-awesome-icon
              :icon="['fas', 'circle-check']"
              class="text-2xl"
            />
          </div>
        </transition>
        <img :src="photo.path" class="object-contain w-full h-full" />
      </div>
      <div ref="lastPhoto" class="w-full flex justify-center">
        <Spinner class="text-green-600 h-7 w-7" v-if="isLoading" />
      </div>
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
        class="px-4 py-2 mt-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-rose-500 rounded-md sm:mt-0 sm:mx-2 hover:bg-rose-600 focus:outline-none focus:ring focus:ring-rose-300 focus:ring-opacity-40 disabled:cursor-not-allowed disabled:hover:bg-rose-300 disabled:bg-rose-300"
        @click="select"
        :disabled="selected.length === 0"
      >
        <font-awesome-icon :icon="['fas', 'trash-can']" />
        Delete Images
      </button>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "DeleteImage",
  props: { modal: Boolean },
  data() {
    return {
      observer: null,
      selected: [],
      click: true,
    };
  },
  computed: {
    ...mapGetters("photo", ["photos", "isLoading"]),
  },
  mounted() {
    this.getImages();
    this.setObserver();
  },
  beforeDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  },
  methods: {
    ...mapActions("photo", ["getImages", "reset"]),
    async select() {
      if (confirm("Are you sure, you want to delete?")) {
        try {
          if (this.click) {
            this.click = false;
            await this.$axios.post("user/delete-photo", {
              pathList: this.selected,
            });
            this.selected = [];
            await this.reset();
            await this.getImages();
            this.click = true;
          }
        } catch (error) {
          $nuxt.$emit("apiError", error);
        } finally {
          this.click = true;
        }
      }
    },

    setObserver() {
      this.observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              this.getImages();
            }
          });
        },
        {
          root: null,
          rootMargin: "0px",
          threshold: 0.5,
        }
      );

      this.observer.observe(this.$refs.lastPhoto);
    },
    setImage({ path }) {
      const index = this.selected.findIndex((val) => val === path);

      if (index !== -1) {
        this.selected.splice(index, 1);
      } else {
        this.selected.push(path);
      }
    },
    checkId({ path }) {
      return this.selected.some((val) => val === path);
    },
  },
};
</script>
