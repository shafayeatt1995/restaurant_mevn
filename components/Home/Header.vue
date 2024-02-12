<template>
  <header class="bg-white" id="home">
    <div class="relative overflow-hidden lg:h-[calc(100vh_-_60px)]">
      <div class="relative container px-4 py-8 lg:py-16 mx-auto h-full z-[2]">
        <div class="items-center flex h-full flex-col lg:flex-row">
          <div class="flex-1 flex flex-col justify-center">
            <div class="">
              <img src="/logo.png" class="h-20" />
              <h1
                class="text-3xl font-bold text-gray-800 lg:text-5xl uppercase mt-2"
              >
                Scan<span class="text-green-500 underline decoration-green-500"
                  >Eating</span
                >
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
                class="px-7 py-[10px] text-sm tracking-wider text-white uppercase transition-colors duration-300 transform bg-green-500 rounded-lg lg:w-auto hover:bg-green-600 focus:outline-none focus:bg-green-500 font-bold shadow-xl"
                :to="{
                  name: 'menu-slug-table',
                  params: { slug: '1c', table: 'table-1-lx' },
                }"
                target="_blank"
              >
                Demo Menu
              </NuxtLink>
              <NuxtLink
                class="px-7 py-[10px] text-sm tracking-wider text-white uppercase transition-colors duration-300 transform bg-green-500 rounded-lg lg:w-auto hover:bg-green-600 focus:outline-none focus:bg-green-500 font-bold shadow-xl"
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
            class="flex items-center justify-center lg:flex-1 lg:w-1/2 lg:h-full animate-bouncy infinite mt-10 lg:mt-0"
          >
            <img
              class="max-w-full h-96 lg:h-[70vh] object-contain"
              src="/images/menu.webp"
              alt="menu image"
            />
          </div>
        </div>
      </div>

      <div class="absolute bottom-0 left-0 right-0 z-[1] hidden lg:block">
        <Wave />
      </div>
    </div>
  </header>
</template>
<script>
import Wave from "~/static/images/wave.svg";
export default {
  name: "Header",
  components: { Wave },
};
</script>
