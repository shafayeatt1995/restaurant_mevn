<template>
  <nuxt-link
    v-if="to"
    :to="to"
    class="flex justify-center items-center px-5 py-3 text-sm font-medium tracking-wide capitalize transition-colors duration-300 transform rounded-lg focus:outline-none focus:ring focus:ring-opacity-50 gap-1"
    :class="variantClass"
    :disabled="loading"
  >
    <Spinner v-if="loading" />
    <slot />
  </nuxt-link>
  <button
    v-else
    class="focus:ring-transparent flex justify-center items-center px-5 py-3 text-sm font-medium tracking-wide capitalize transition-colors duration-300 transform rounded-lg focus:outline-none focus:ring focus:ring-opacity-50 gap-1"
    :class="variantClass"
    :disabled="loading"
  >
    <Spinner v-if="loading" />
    <slot />
  </button>
</template>
<script>
export default {
  props: {
    loading: Boolean,
    variant: { type: String, default: "green" },
    to: [String, Object],
  },
  name: "Button",
  computed: {
    variantClass() {
      if (this.variant === "green") {
        return "text-white bg-green-500 hover:bg-green-600 focus:ring-green-300 disabled:hover:bg-green-300 disabled:bg-green-300";
      } else if (this.variant === "white") {
        return "text-gray-700 border border-gray-200 hover:bg-gray-100 focus:ring-gray-300 disabled:hover:bg-gray-300 disabled:bg-gray-300";
      } else if (this.variant === "gray") {
        return "text-white bg-gray-500 hover:bg-gray-600 focus:ring-gray-300 disabled:hover:bg-gray-300 disabled:bg-gray-300";
      } else if (this.variant === "pink") {
        return "text-white bg-pink-500 hover:bg-pink-600 focus:ring-pink-300 disabled:hover:bg-pink-300 disabled:bg-pink-300";
      } else if (this.variant === "red") {
        return "text-white bg-rose-500 hover:bg-rose-600 focus:ring-rose-300 disabled:hover:bg-rose-300 disabled:bg-rose-300";
      } else if (this.variant === "transparent") {
        return "text-blue-500 hover:text-blue-600 focus:ring-transparent disabled:hover:text-blue-400 disabled:text-blue-400";
      } else if (this.variant === "blue") {
        return "text-white bg-blue-500 hover:bg-blue-600 focus:ring-blue-300 disabled:hover:bg-blue-300 disabled:bg-blue-300";
      } else if (this.variant === "blue") {
        return "text-white bg-blue-500 hover:bg-blue-600 focus:ring-blue-300 disabled:hover:bg-blue-300 disabled:bg-blue-300";
      } else if (this.variant === "yellow") {
        return "text-white bg-yellow-500 hover:bg-yellow-600 focus:ring-yellow-300 disabled:hover:bg-yellow-300 disabled:bg-yellow-300";
      } else if (this.variant === "purple") {
        return "text-white bg-purple-500 hover:bg-purple-600 focus:ring-purple-300 disabled:hover:bg-purple-300 disabled:bg-purple-300";
      } else if (this.variant === "amber") {
        return "text-white bg-amber-500 hover:bg-amber-600 focus:ring-amber-300 disabled:hover:bg-amber-300 disabled:bg-amber-300";
      } else if (this.variant === "sky") {
        return "text-white bg-sky-500 hover:bg-sky-600 focus:ring-sky-300 disabled:hover:bg-sky-300 disabled:bg-sky-300";
      }
    },
  },
};
</script>
