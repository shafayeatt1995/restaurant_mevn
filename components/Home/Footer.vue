<template>
  <footer class="bg-white shadow py-3">
    <div
      class="container flex flex-col items-center justify-between px-6 lg:py-8 mx-auto lg:flex-row"
    >
      <nuxt-link :to="{ name: 'index' }">
        <img
          class="w-auto h-7"
          src="/full-logo.png"
          alt="logo"
          loading="lazy"
        />
      </nuxt-link>

      <div
        class="flex flex-wrap items-center justify-center gap-4 mt-6 lg:gap-6 lg:mt-0"
      >
        <a
          href="#home"
          class="text-gray-600 transition-colors duration-300 hover:text-green-600"
        >
          Home
        </a>

        <a
          href="#process"
          class="text-gray-600 transition-colors duration-300 hover:text-green-600"
        >
          Process
        </a>

        <a
          href="#feature"
          class="text-gray-600 transition-colors duration-300 hover:text-green-600"
        >
          Feature
        </a>
        <a
          href="#faq"
          class="text-gray-600 transition-colors duration-300 hover:text-green-600"
        >
          FAQ
        </a>
        <a
          href="#customer"
          class="text-gray-600 transition-colors duration-300 hover:text-green-600"
        >
          Customer
        </a>
        <a
          href="#contact"
          class="text-gray-600 transition-colors duration-300 hover:text-green-600"
        >
          Contact
        </a>
      </div>

      <p class="mt-6 text-gray-500 lg:mt-0">
        © Copyright 2023
        <nuxt-link :to="{ name: 'index' }" class="underline">
          ScanEating.</nuxt-link
        >
      </p>
    </div>
  </footer>
</template>
<script>
export default {
  name: "Footer",
};
</script>
