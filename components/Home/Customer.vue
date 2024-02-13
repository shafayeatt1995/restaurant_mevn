<template>
  <section class="bg-green-50 py-10 relative" id="customer">
    <div class="container px-4 py-4 mx-auto">
      <div class="flex flex-col justify-center items-center">
        <h1 class="text-4xl text-gray-700 font-bold text-center">
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
      <div class="w-full my-8 gap-5">
        <client-only>
          <carousel
            :stagePadding="50"
            :nav="false"
            :loop="true"
            :autoplay="true"
            :responsive="{
              0: { items: 1 },
              600: { items: 3 },
              1000: { items: 3 },
            }"
          >
            <nuxt-link
              :to="{
                name: 'menu-slug-table',
                params: { slug: '1c', table: 'table-1-lx' },
                query: { demo: true },
              }"
              target="_blank"
            >
              <img
                src="/images/demo/1.webp"
                alt="demo image"
                class="max-w-full h-96 lg:h-[80vh] object-contain"
              />
            </nuxt-link>
            <nuxt-link
              :to="{
                name: 'menu-slug-table',
                params: { slug: '3kf', table: 'table-31-ug' },
                query: { demo: true },
              }"
              target="_blank"
            >
              <img
                src="/images/demo/2.webp"
                alt="demo image"
                class="max-w-full h-96 lg:h-[80vh] object-contain"
              />
            </nuxt-link>
            <nuxt-link
              :to="{
                name: 'menu-slug-table',
                params: { slug: '2fa', table: 'table-11-fh' },
                query: { demo: true },
              }"
              target="_blank"
            >
              <img
                src="/images/demo/3.webp"
                alt="demo image"
                class="max-w-full h-96 lg:h-[80vh] object-contain"
              />
            </nuxt-link>
          </carousel>
        </client-only>
      </div>
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
