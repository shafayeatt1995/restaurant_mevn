<template>
  <div>
    <header class="text-gray-100 bg-gray-800 lg:hidden">
      <div class="container flex items-center justify-between p-4 mx-auto">
        <nuxt-link :to="{ name: 'dashboard' }" class="text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-8 h-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
            />
          </svg>
        </nuxt-link>

        <button
          @click="isOpen = !isOpen"
          class="p-2 text-white rounded-lg focus:outline-none hover:bg-gray-700"
        >
          <template v-if="!isOpen">
            <icon :icon="['fas', 'align-justify']" class="text-xl" />
          </template>
          <template v-else>
            <icon :icon="['fas', 'xmark']" class="text-xl" />
          </template>
        </button>
      </div>
    </header>

    <div
      v-cloak
      :class="isOpen ? 'block' : 'hidden'"
      @click="isOpen = false"
      class="fixed inset-0 z-20 transition-opacity bg-black opacity-30 lg:hidden"
    ></div>
  </div>
</template>
<script>
export default {
  name: "MobileTopbar",
  data() {
    return {};
  },
  computed: {
    isOpen: {
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
