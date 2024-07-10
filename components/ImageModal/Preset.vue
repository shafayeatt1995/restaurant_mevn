<template>
  <div>
    <div
      class="flex flex-wrap justify-between gap-2 max-h-96 overflow-y-auto"
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
        <nuxt-img
          format="webp"
          loading="lazy"
          decode="async"
          :src="image.url"
          alt="preset image"
          class="object-contain h-14 w-14"
        />
      </div>
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
import preset from "~/assets/preset.json";
export default {
  name: "SelectImage",
  props: { multiple: Boolean, modal: Boolean, limit: Number },
  computed: {
    selected: {
      get() {
        return this.$attrs.value;
      },
      set(value) {
        this.$emit("input", value);
      },
    },
    images() {
      return preset.map(({ key }, _id) => ({
        _id,
        url: `https://utfs.io/f/${key}`,
      }));
    },
  },
  mounted() {},
  methods: {
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
