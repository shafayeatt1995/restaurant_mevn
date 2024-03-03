<template>
  <section class="py-10 relative" id="customer">
    <div class="container px-4 py-4 mx-auto">
      <div class="flex flex-col justify-center items-center">
        <h1 class="text-4xl text-gray-800 font-bold text-center">
          Our Satisfied
          <span class="text-green-600 underline decoration-green-600"
            >Customers</span
          >
        </h1>
        <p class="text-gray-800 text-center">
          Explore menus and tap one that catches your interest to experience how
          it works
        </p>
      </div>
      <div class="w-full my-8 gap-5">
        <client-only>
          <carousel
            :stagePadding="50"
            :nav="false"
            :dots="false"
            :loop="true"
            :autoplay="true"
            :responsive="{
              0: { items: 1 },
              600: { items: 3 },
              1000: { items: 5 },
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
                class="max-w-full max-h-60 lg:max-h-96 object-contain"
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
                class="max-w-full max-h-60 lg:max-h-96 object-contain"
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
                class="max-w-full max-h-60 lg:max-h-96 object-contain"
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
