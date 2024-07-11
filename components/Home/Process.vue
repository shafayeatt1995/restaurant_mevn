<template>
  <section class="bg-white" id="process">
    <div class="container px-4 py-4 mx-auto" id="process">
      <div class="flex flex-col justify-center items-center mt-10 mb-5">
        <h1 class="text-4xl text-gray-800 font-bold">
          How does it
          <span class="text-green-600 underline decoration-green-600"
            >Work?</span
          >
        </h1>
        <p class="text-gray-800 text-center">
          Provide fantastic experience to your customers!
        </p>
      </div>
      <div
        class="flex flex-col lg:flex-row justify-between text-gray-700 lg:mt-8"
      >
        <div class="flex flex-col justify-center items-center mb-8">
          <h2 class="text-2xl font-semibold mb-3">1. Get QR</h2>
          <nuxt-img
            format="webp"
            loading="lazy"
            decode="async"
            src="/images/qr.webp"
            class="w-64 h-60 lg:h-96 object-contain"
            alt="qr code"
          />
          <p class="text-gray-700 px-4 mt-3">
            Connect with us today and collect your QR code that perfectly
            matches the personality of your establishment.
          </p>
        </div>
        <div class="lg:flex justify-center items-center hidden">
          <nuxt-img
            format="webp"
            loading="lazy"
            decode="async"
            src="/images/arrow-top.png"
            class="w-52 object-contain"
            alt="arrow-top"
          />
        </div>
        <div class="flex flex-col justify-center items-center mb-8">
          <h2 class="text-2xl font-semibold mb-3">2. Add categories & items</h2>
          <nuxt-img
            format="webp"
            loading="lazy"
            decode="async"
            src="/images/items.webp"
            class="w-64 h-60 lg:h-96 object-contain"
            alt="items"
          />
          <p class="text-gray-700 px-4 mt-3">
            Fill your menu with a variety of categories, sub-categories, items,
            prices, discounts etc. We'll create the menu for you.
          </p>
        </div>
        <div class="hidden lg:flex justify-center items-center">
          <nuxt-img
            format="webp"
            loading="lazy"
            decode="async"
            src="/images/arrow-bottom.png"
            class="w-52 object-contain"
            alt="arrow-bottom"
          />
        </div>
        <div class="flex flex-col justify-center items-center mb-8">
          <h2 class="text-2xl font-semibold mb-3">3. Start receiving orders</h2>
          <nuxt-img
            format="webp"
            loading="lazy"
            decode="async"
            src="/images/order.webp"
            class="w-64 h-60 lg:h-96 object-contain"
            alt="order"
          />
          <p class="text-gray-700 px-4 mt-3">
            Fill your menu with a variety of categories, sub-categories, items,
            prices, discounts etc. We'll create the menu for you.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  name: "Process",
};
</script>
