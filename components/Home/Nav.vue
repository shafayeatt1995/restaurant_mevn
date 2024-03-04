<template>
  <nav class="sticky top-0 bg-white shadow-md z-10">
    <div
      class="container px-4 py-2 mx-auto lg:flex lg:justify-between lg:items-center"
    >
      <div class="flex items-center justify-between">
        <nuxt-link :to="{ name: 'index' }">
          <img
            loading="lazy"
            class="lg:h-14 h-12 object-contain"
            src="/favicon.png"
            alt="logo"
          />
        </nuxt-link>

        <div class="flex lg:hidden">
          <button
            @click="isOpen = !isOpen"
            type="button"
            class="text-gray-500 hover:text-gray-700 focus:outline-none focus:text-gray-700"
            aria-label="Toggle menu"
          >
            <i class="fas fa-align-justify" />
          </button>
        </div>
      </div>

      <div
        :class="[
          isOpen ? 'translate-x-0 opacity-100 ' : 'opacity-0 -translate-x-full',
        ]"
        class="absolute inset-x-0 z-20 w-full px-6 py-4 transition-all duration-300 ease-in-out bg-white lg:bg-transparent lg: lg:mt-0 lg:p-0 lg:top-0 lg:relative lg:w-auto lg:opacity-100 lg:translate-x-0 lg:flex lg:items-center shadow-xl lg:shadow-none"
      >
        <div class="flex flex-col lg:flex-row lg:mx-6">
          <nuxt-link
            :to="{ name: 'index', hash: '#home' }"
            class="my-2 text-gray-700 transition-colors duration-300 transform hover:text-green-600 lg:mx-4 lg:my-0"
          >
            Home
          </nuxt-link>

          <nuxt-link
            :to="{ name: 'index', hash: '#process' }"
            class="my-2 text-gray-700 transition-colors duration-300 transform hover:text-green-600 lg:mx-4 lg:my-0"
          >
            How to
          </nuxt-link>
          <nuxt-link
            :to="{ name: 'index', hash: '#feature' }"
            class="my-2 text-gray-700 transition-colors duration-300 transform hover:text-green-600 lg:mx-4 lg:my-0"
            >Feature</nuxt-link
          >
          <nuxt-link
            :to="{ name: 'index', hash: '#faq' }"
            class="my-2 text-gray-700 transition-colors duration-300 transform hover:text-green-600 lg:mx-4 lg:my-0"
            >FAQ</nuxt-link
          >
          <nuxt-link
            :to="{ name: 'index', hash: '#customer' }"
            class="my-2 text-gray-700 transition-colors duration-300 transform hover:text-green-600 lg:mx-4 lg:my-0"
            >Customer</nuxt-link
          >
          <nuxt-link
            :to="{ name: 'index', hash: '#pricing' }"
            class="my-2 text-gray-700 transition-colors duration-300 transform hover:text-green-600 lg:mx-4 lg:my-0"
            >Pricing</nuxt-link
          >
          <nuxt-link
            :to="{ name: 'index', hash: '#contact' }"
            class="my-2 text-gray-700 transition-colors duration-300 transform hover:text-green-600 lg:mx-4 lg:my-0"
            >Contact</nuxt-link
          >
        </div>

        <div class="flex justify-center lg:block">
          <nuxt-link
            class="px-7 py-2 mt-6 text-sm tracking-wider text-white uppercase transition-colors duration-300 transform bg-gray-900 rounded-lg lg:w-auto hover:bg-gray-800 focus:outline-none focus:bg-gray-800 font-bold"
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
