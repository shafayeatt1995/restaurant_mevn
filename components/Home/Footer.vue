<template>
  <footer class="bg-white shadow py-3">
    <div
      class="container flex flex-col items-center justify-between px-6 lg:py-8 mx-auto lg:flex-row"
    >
      <nuxt-link :to="{ name: 'index' }">
        <img
          class="w-auto h-7 object-contain"
          src="/full-logo.png"
          alt="logo"
          loading="lazy"
        />
      </nuxt-link>

      <div
        class="flex flex-wrap items-center justify-center gap-4 mt-6 lg:gap-6 lg:mt-0"
      >
        <nuxt-link
          :to="{ name: 'index', hash: '#home' }"
          class="text-gray-700 transition-colors duration-300 hover:text-green-600"
        >
          Home
        </nuxt-link>

        <nuxt-link
          :to="{ name: 'index', hash: '#process' }"
          class="text-gray-700 transition-colors duration-300 hover:text-green-600"
        >
          How to
        </nuxt-link>

        <nuxt-link
          :to="{ name: 'index', hash: '#feature' }"
          class="text-gray-700 transition-colors duration-300 hover:text-green-600"
        >
          Feature
        </nuxt-link>
        <nuxt-link
          :to="{ name: 'index', hash: '#faq' }"
          class="text-gray-700 transition-colors duration-300 hover:text-green-600"
        >
          FAQ
        </nuxt-link>
        <nuxt-link
          :to="{ name: 'index', hash: '#customer' }"
          class="text-gray-700 transition-colors duration-300 hover:text-green-600"
        >
          Customer
        </nuxt-link>
        <nuxt-link
          :to="{ name: 'index', hash: '#pricing' }"
          class="text-gray-700 transition-colors duration-300 hover:text-green-600"
        >
          Pricing
        </nuxt-link>
        <nuxt-link
          :to="{ name: 'index', hash: '#contact' }"
          class="text-gray-700 transition-colors duration-300 hover:text-green-600"
        >
          Contact
        </nuxt-link>
        <nuxt-link
          :to="{ name: 'privacy-policy' }"
          class="text-gray-700 transition-colors duration-300 hover:text-green-600"
        >
          Privacy policy
        </nuxt-link>
      </div>

      <p class="mt-6 text-gray-500 lg:mt-0">
        © Copyright {{ $moment().format("YYYY") }}
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
