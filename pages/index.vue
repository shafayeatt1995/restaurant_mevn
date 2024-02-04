<template>
  <div>
    <header class="bg-white">
      <nav class="sticky top-0 bg-white shadow-md">
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
        class="container px-4 py-16 mx-auto"
        style="height: calc(100vh - 60px)"
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
            class="flex items-center justify-center flex-1 mt-6 lg:mt-0 lg:w-1/2 h-full"
          >
            <img
              class="max-w-full h-full object-contain"
              src="/images/menu.png"
              alt="menu image"
            />
          </div>
        </div>
      </div>
    </header>
    <section>
      <div class="flex justify-center">
        <h1 class="text-3xl text-gray-700 font-bold">How does it Work?</h1>
      </div>
      <div class="flex justify-between">
        <div class="flex flex-col">1. Get QR</div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "indexPage",
  auth: false,
  data() {
    return {
      isOpen: false,
    };
  },
};
</script>
