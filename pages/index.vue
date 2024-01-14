<template>
  <div
    class="relative h-screen w-full flex items-center justify-center bg-cover bg-center text-center px-5"
    :style="imageUrl"
  >
    <div class="z-50 flex flex-col justify-center text-white w-full h-screen">
      <h1 class="text-5xl">We are <b>Almost</b> there!</h1>
      <p class="text-xl">Stay tuned for something amazing!!!</p>

      <div class="mt-10 mb-5">
        <div class="shadow w-full bg-white mt-2 max-w-2xl mx-auto rounded-full">
          <div
            class="rounded-full bg-green-500 text-xl leading-none text-center text-white py-1"
            style="width: 85%"
          >
            85%
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "indexPage",
  auth: false,
  computed: {
    imageUrl() {
      const randomNumber = Math.floor(Math.random() * 3) + 1;
      return `background-image: url('/images/slider/${randomNumber}.jpg');`;
    },
  },
};
</script>
