<template>
  <section class="bg-green-50 py-10 relative" id="customer">
    <div class="container px-4 py-4 mx-auto">
      <div class="flex flex-col justify-center items-center">
        <h1 class="text-4xl text-gray-700 font-bold">
          Our Satisfied
          <span class="text-green-500 underline decoration-green-500"
            >Customers</span
          >
        </h1>
        <p class="text-gray-600 text-center">
          Browse menus and tap one that catches your interest to experience how
          it works
        </p>
      </div>
      <div class="flex my-8 gap-5"></div>
    </div>
  </section>
</template>
<script>
import Wave from "~/static/images/wave.svg";
export default {
  name: "Contact",
  components: { Wave },
};
</script>
