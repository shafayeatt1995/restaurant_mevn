<template>
  <div>
    <header class="bg-white">
      <nav class="sticky top-0 bg-white shadow-md z-10">
        <div
          class="container px-4 py-4 mx-auto md:flex md:justify-between md:items-center"
        >
          <div class="flex items-center justify-between">
            <nuxt-link :to="{ name: 'index' }">
              <img
                loading="lazy"
                class="w-auto h-8 sm:h-7"
                src="/full-logo.png"
                alt="logo"
              />
            </nuxt-link>

            <!-- Mobile menu button -->
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
              isOpen
                ? 'translate-x-0 opacity-100 '
                : 'opacity-0 -translate-x-full',
            ]"
            class="absolute inset-x-0 z-20 w-full px-6 py-4 transition-all duration-300 ease-in-out bg-white md:bg-transparent md: md:mt-0 md:p-0 md:top-0 md:relative md:w-auto md:opacity-100 md:translate-x-0 md:flex md:items-center"
          >
            <div class="flex flex-col md:flex-row md:mx-6">
              <a
                class="my-2 text-gray-700 transition-colors duration-300 transform hover:text-green-600 md:mx-4 md:my-0"
                href="#"
                >Home</a
              >
              <a
                class="my-2 text-gray-700 transition-colors duration-300 transform hover:text-green-600 md:mx-4 md:my-0"
                href="#"
                >Shop</a
              >
              <a
                class="my-2 text-gray-700 transition-colors duration-300 transform hover:text-green-600 md:mx-4 md:my-0"
                href="#"
                >Contact</a
              >
              <a
                class="my-2 text-gray-700 transition-colors duration-300 transform hover:text-green-600 md:mx-4 md:my-0"
                href="#"
                >About</a
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

      <div
        class="container px-4 py-8 lg:py-16 mx-auto"
        :style="isMobile ? `` : `height: calc(100vh - 60px)`"
      >
        <div class="items-center flex h-full flex-col lg:flex-row">
          <div class="flex-1">
            <div class="">
              <img src="/logo.png" class="h-20" />
              <h1
                class="text-3xl font-bold text-gray-800 lg:text-5xl uppercase mt-2"
              >
                Scan<span class="text-green-500">Eating</span>
              </h1>
              <h3 class="text-gray-700 text-xl lg:text-3xl">
                A Complete Digital Menu Solution
              </h3>
              <p class="mt-3 text-gray-600 text-base lg:text-xl">
                Take your restaurant one step further! It's time to dive into
                the digital world. Give your customers a modern experience with
                a menu they can access on their smartphones using a simple QR
                code. No more paper menus – just scan, browse, and order
                <span class="text-2xl">😊</span>
              </p>
            </div>
            <div class="flex mt-5 gap-3">
              <NuxtLink
                class="px-7 py-[10px] text-sm tracking-wider text-white uppercase transition-colors duration-300 transform bg-green-500 rounded-lg lg:w-auto hover:bg-green-600 focus:outline-none focus:bg-green-500 font-bold"
                :to="{
                  name: 'menu-slug-table',
                  params: { slug: '1c', table: 'table-1-lx' },
                }"
                target="_blank"
              >
                Demo Menu
              </NuxtLink>
              <NuxtLink
                class="px-7 py-[10px] text-sm tracking-wider text-white uppercase transition-colors duration-300 transform bg-green-500 rounded-lg lg:w-auto hover:bg-green-600 focus:outline-none focus:bg-green-500 font-bold"
                :to="{
                  name: 'auth-login',
                  query: { demo: true },
                }"
              >
                Demo Waiter
              </NuxtLink>
            </div>
          </div>

          <div
            class="hidden lg:flex items-center justify-center lg:flex-1 lg:mt-0 lg:w-1/2 lg:h-full"
          >
            <img
              class="max-w-full h-96 lg:h-full object-contain"
              src="/images/menu.webp"
              alt="menu image"
            />
          </div>
        </div>
      </div>
    </header>
    <section class="container px-4 py-4 mx-auto">
      <div class="flex flex-col justify-center items-center">
        <h1 class="text-4xl text-gray-700 font-bold">How does it Work?</h1>
        <p class="text-gray-600">
          Provide fantastic experience to your customers!
        </p>
      </div>
      <div class="flex flex-col lg:flex-row justify-between text-gray-600 mt-8">
        <div class="flex flex-col justify-center items-center mb-8">
          <h3 class="text-2xl font-semibold">1. Get QR</h3>
          <img loading="lazy" src="/images/qr.webp" class="max-w-64 h-auto" />
          <p class="text-gray-600 lg:px-16">
            Connect with us today and collect your QR code that perfectly
            matches the personality of your establishment.
          </p>
        </div>
        <div class="lg:flex justify-center items-center hidden">
          <img loading="lazy" src="/images/arrow-top.png" />
        </div>
        <div class="flex flex-col justify-center items-center mb-8">
          <h3 class="text-2xl font-semibold">2. Add categories & items</h3>
          <img
            loading="lazy"
            src="/images/items.webp"
            class="max-w-64 h-auto"
          />
          <p class="text-gray-600 lg:px-16">
            Fill your menu with a variety of categories, sub-categories, items,
            prices, discounts etc. We'll create the menu for you.
          </p>
        </div>
        <div class="hidden lg:flex justify-center items-center">
          <img
            loading="lazy"
            src="/images/arrow-bottom.png"
            class="w-28 h-auto"
          />
        </div>
        <div class="flex flex-col justify-center items-center mb-8">
          <h3 class="text-2xl font-semibold">3. Start receiving orders</h3>
          <img
            loading="lazy"
            src="/images/order.webp"
            class="max-w-64 h-auto"
          />
          <p class="text-gray-600 lg:px-16">
            Fill your menu with a variety of categories, sub-categories, items,
            prices, discounts etc. We'll create the menu for you.
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "indexPage",
  auth: false,
  data() {
    return {
      isOpen: false,
    };
  },
  computed: {
    ...mapGetters(["isMobile"]),
  },
};
</script>
