<template>
  <header class="bg-white" id="home">
    <div class="relative overflow-hidden lg:h-[calc(100vh_-_60px)]">
      <div class="relative container px-4 py-8 lg:py-16 mx-auto h-full z-[2]">
        <div class="items-center flex h-full flex-col lg:flex-row">
          <div class="flex-1 flex flex-col justify-center">
            <div>
              <img src="/logo.png" class="h-20" alt="logo" />
              <h1
                class="text-3xl font-bold text-gray-800 lg:text-5xl uppercase mt-2"
              >
                Scan<span class="text-green-500 underline decoration-green-500"
                  >Eating</span
                >
              </h1>
              <h1 class="text-gray-800 text-xl lg:text-3xl">
                A Complete Digital Menu Solution
              </h1>
              <p class="mt-3 text-gray-800 text-base lg:text-xl">
                Take your restaurant one step further! It's time to dive into
                the digital world. Give your customers a modern experience with
                a menu they can access on their smartphones using a simple QR
                code. No more paper menus–just scan, browse, and order
                <span class="text-2xl">😊</span>
              </p>
            </div>
            <div class="flex mt-5 gap-3 justify-evenly lg:justify-start">
              <NuxtLink
                class="px-7 py-[10px] text-sm tracking-wider text-white uppercase transition-colors duration-300 transform bg-gray-900 rounded-lg lg:w-auto hover:bg-gray-800 focus:outline-none focus:bg-gray-800 font-bold shadow-xl"
                :to="{
                  name: 'menu-slug',
                  params: { slug: '1c' },
                }"
                target="_blank"
              >
                Demo Menu
              </NuxtLink>
              <NuxtLink
                class="px-7 py-[10px] text-sm tracking-wider text-white uppercase transition-colors duration-300 transform bg-gray-900 rounded-lg lg:w-auto hover:bg-gray-800 focus:outline-none focus:bg-gray-800 font-bold shadow-xl"
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
            class="flex items-center justify-center lg:flex-1 lg:w-1/2 animate-bouncy infinite mt-10 lg:mt-0"
          >
            <div
              class="relative lg:before:absolute lg:before:content-[''] before:h-full before:w-full lg:before:border-[10px] lg:before:border-green-500 before:border-solid before:top-6 before:left-6 before:rounded-[56px]"
            >
              <img
                class="max-w-full max-h-80 lg:max-h-[70vh] object-contain relative z-[1]"
                src="/images/menu.webp"
                alt="menu image"
              />
            </div>
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
