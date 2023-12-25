<template>
  <div>
    <div class="lg:w-[450px] w-full mx-auto fixed bottom-0 z-20 left-0 right-0">
      <div
        class="flex justify-between items-center bg-black text-white p-4 rounded-t-3xl cursor-pointer"
        @click="show = !show"
      >
        <p class="text-xl">Order 2 for ৳1000</p>
        <p class="text-2xl">
          <font-awesome-icon :icon="['fas', 'cart-shopping']" />
        </p>
      </div>
      <div
        class="h-[75vh] bg-white transition-all duration-300"
        :class="show ? 'mb-0' : 'mb-[-75vh]'"
      >
        <div class="h-full flex flex-col justify-center items-center">
          <img src="/images/not-found.png" />
          <p class="text-2xl mt-2 text-gray-600">Nothing to order</p>
        </div>
      </div>
    </div>
    <transition name="fade" mode="out-in">
      <div
        v-if="show"
        @click="show = false"
        class="fixed top-0 bottom-0 left-0 right-0 bg-black bg-opacity-50 z-10 lg:w-[450px] w-full mx-auto bg-green"
      ></div>
    </transition>
  </div>
</template>
<script>
export default {
  name: "MenuCart",
  data() {
    return {
      show: false,
    };
  },
};
</script>
