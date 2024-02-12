<template>
  <nav class="sticky top-0 bg-white shadow-md z-10">
    <div
      class="container px-4 py-4 mx-auto md:flex md:justify-between md:items-center"
    >
      <div class="flex items-center justify-between">
        <nuxt-link :to="{ name: 'index' }">
          <img
            loading="lazy"
            class="w-auto lg:h-8 h-7"
            src="/full-logo.png"
            alt="logo"
          />
        </nuxt-link>

        <div class="flex md:hidden">
          <button
            @click="isOpen = !isOpen"
            type="button"
            class="text-gray-500 hover:text-gray-600 focus:outline-none focus:text-gray-600"
          >
            <font-awesome-icon :icon="['fas', 'align-justify']" />
          </button>
        </div>
      </div>

      <div
        :class="[
          isOpen ? 'translate-x-0 opacity-100 ' : 'opacity-0 -translate-x-full',
        ]"
        class="absolute inset-x-0 z-20 w-full px-6 py-4 transition-all duration-300 ease-in-out bg-white md:bg-transparent md: md:mt-0 md:p-0 md:top-0 md:relative md:w-auto md:opacity-100 md:translate-x-0 md:flex md:items-center shadow-xl md:shadow-none"
      >
        <div class="flex flex-col md:flex-row md:mx-6">
          <a
            class="my-2 text-gray-700 transition-colors duration-300 transform hover:text-green-600 md:mx-4 md:my-0"
            href="#home"
            >Home</a
          >
          <a
            class="my-2 text-gray-700 transition-colors duration-300 transform hover:text-green-600 md:mx-4 md:my-0"
            href="#process"
            >Process</a
          >
          <a
            class="my-2 text-gray-700 transition-colors duration-300 transform hover:text-green-600 md:mx-4 md:my-0"
            href="#feature"
            >Feature</a
          >
          <a
            class="my-2 text-gray-700 transition-colors duration-300 transform hover:text-green-600 md:mx-4 md:my-0"
            href="#faq"
            >FAQ</a
          >
          <a
            class="my-2 text-gray-700 transition-colors duration-300 transform hover:text-green-600 md:mx-4 md:my-0"
            href="#customer"
            >Customer</a
          >
          <a
            class="my-2 text-gray-700 transition-colors duration-300 transform hover:text-green-600 md:mx-4 md:my-0"
            href="#contact"
            >Contact</a
          >
        </div>

        <div class="flex justify-center md:block">
          <nuxt-link
            class="px-7 py-2 mt-6 text-sm tracking-wider text-white uppercase transition-colors duration-300 transform bg-green-500 rounded-lg lg:w-auto hover:bg-green-600 focus:outline-none focus:bg-green-500 font-bold"
            :to="{ name: 'auth-login' }"
          >
            Login
          </nuxt-link>
        </div>
      </div>
    </div>
  </nav>
</template>
<script>
export default {
  name: "NavBar",
  data() {
    return {
      isOpen: false,
    };
  },
};
</script>
