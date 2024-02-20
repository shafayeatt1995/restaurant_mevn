<template>
  <div class="bg-white">
    <div class="container px-6 py-8 mx-auto">
      <div class="flex justify-center items-center">
        <img src="/logo.png" class="h-20" alt="logo" />
      </div>
      <h1
        class="text-2xl font-semibold text-center text-gray-800 capitalize lg:text-3xl mt-2"
      >
        Scan<span class="text-green-500">Eating</span> Subscription packages
      </h1>

      <p class="max-w-2xl mx-auto text-center text-gray-700 mt-1">
        Choose the Plan That Fits Your Restaurant's
      </p>

      <div class="grid grid-cols-1 gap-8 mt-6 md:grid-cols-2 lg:grid-cols-3">
        <div
          class="w-full p-8 space-y-8 text-center border border-gray-200 rounded-lg"
        >
          <div class="flex flex-col justify-between h-full">
            <div>
              <p class="font-medium text-gray-700 uppercase">1 Month</p>

              <h2 class="text-4xl font-semibold text-gray-800 uppercase mt-8">
                ৳500
              </h2>
            </div>
            <button
              class="w-full px-4 py-2 mt-10 tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-900 rounded-md hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:ring focus:ring-gray-300 focus:ring-opacity-80"
            >
              Active
            </button>
          </div>
        </div>

        <div class="w-full p-8 space-y-8 text-center bg-gray-900 rounded-lg">
          <div class="flex flex-col justify-between h-full">
            <div>
              <p class="font-medium text-gray-200 uppercase">6 Months</p>

              <h2 class="text-5xl font-bold text-white uppercase">
                <del class="text-2xl">৳3000</del>
                <p class="">৳2500</p>
              </h2>
            </div>
            <button
              class="w-full px-4 py-2 mt-10 tracking-wide text-gray-900 capitalize transition-colors duration-300 transform bg-white rounded-md hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:ring focus:ring-gray-200 focus:ring-opacity-80 font-bold"
            >
              Active
            </button>
          </div>
        </div>

        <div
          class="w-full p-8 space-y-8 text-center border border-gray-200 rounded-lg"
        >
          <div class="flex flex-col justify-between h-full">
            <div>
              <p class="font-medium text-gray-500 uppercase">12 Months</p>

              <h2 class="text-4xl font-semibold text-gray-800 uppercase">
                <del class="text-2xl">৳6000</del>
                <p class="">৳5000</p>
              </h2>
            </div>
            <button
              class="w-full px-4 py-2 mt-10 tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-900 rounded-md hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:ring focus:ring-gray-300 focus:ring-opacity-80"
            >
              Active
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "Subscription",
  layout: "dashboard",
  middleware: "manager",
  head() {
    return { title: "Settings - " + this.pageTitle };
  },
  computed: {
    ...mapGetters(["pageTitle"]),
  },
};
</script>
