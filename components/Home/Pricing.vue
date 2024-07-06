<template>
  <section class="py-10" id="pricing">
    <div class="container px-4 py-4 mx-auto">
      <div class="flex flex-col justify-center items-center">
        <h1 class="text-4xl text-gray-800 font-bold">
          ScanEating
          <span class="text-green-600 underline decoration-green-600"
            >Pricing</span
          >
        </h1>
        <p class="text-gray-800 text-center">
          Choose the Plan That Fits Your Restaurant's
        </p>
      </div>

      <div class="grid grid-cols-1 gap-6 mt-6 lg:grid-cols-3">
        <div
          class="w-full p-8 space-y-8 text-center border border-gray-200 rounded-lg"
        >
          <div class="flex flex-col justify-between h-full">
            <div>
              <p class="font-medium text-gray-700 uppercase">Life time</p>

              <h2 class="text-4xl font-semibold text-gray-800 uppercase mt-8">
                FREE
              </h2>
            </div>
            <nuxt-link
              :to="{ name: 'dashboard-subscription' }"
              class="w-full px-4 py-2 mt-10 tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-900 rounded-md hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:ring focus:ring-gray-300 focus:ring-opacity-80 disabled:bg-gray-500"
            >
              Active
            </nuxt-link>
          </div>
        </div>

        <div class="w-full p-8 space-y-8 text-center bg-gray-900 rounded-lg">
          <div class="flex flex-col justify-between h-full">
            <div>
              <p class="font-medium text-gray-200 uppercase">12 Months</p>

              <h2 class="text-5xl font-bold text-white uppercase">
                <del class="text-2xl">${{ 120 | currencyNumber }}</del>
                <p class="">${{ 100 | currencyNumber }}</p>
              </h2>
            </div>
            <a
              href="https://wa.me/01728293635"
              target="_blank"
              class="w-full px-4 py-2 mt-10 tracking-wide text-gray-900 capitalize transition-colors duration-300 transform bg-white rounded-md hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:ring focus:ring-gray-200 focus:ring-opacity-80 font-bold"
            >
              Contact us
            </a>
          </div>
        </div>

        <div
          class="w-full p-8 space-y-8 text-center border border-gray-200 rounded-lg"
        >
          <div class="flex flex-col justify-between h-full">
            <div>
              <p class="font-medium text-gray-500 uppercase">1 Months</p>

              <h2 class="text-4xl mt-8 font-semibold text-gray-800 uppercase">
                <p class="">${{ 10 | currencyNumber }}</p>
              </h2>
            </div>
            <a
              href="https://wa.me/01728293635"
              target="_blank"
              class="w-full px-4 py-2 mt-10 tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-900 rounded-md hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:ring focus:ring-gray-300 focus:ring-opacity-80"
            >
              Contact us
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  name: "Pricing",
};
</script>
