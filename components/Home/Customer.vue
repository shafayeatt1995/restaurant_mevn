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
            :autoplay="true"
            :stagePadding="50"
            :nav="false"
            :dots="false"
            :loop="true"
            :responsive="{
              0: { items: 1 },
              600: { items: 3 },
              1000: { items: 5 },
            }"
          >
            <nuxt-link
              v-for="({ slug, image }, key) in items"
              :key="key"
              :to="{
                name: 'menu-slug',
                params: { slug },
                query: { demo: true },
              }"
              target="_blank"
            >
              <nuxt-img
                format="webp"
                loading="lazy"
                decode="async"
                :src="image"
                alt="demo image"
                class="w-full h-72 lg:h-[28rem] object-contain"
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
  data() {
    return {
      items: [
        {
          slug: "wagamama",
          image: "/images/demo/1.webp",
        },
        {
          slug: "theb_baked_potato_factory_58",
          image: "/images/demo/7.webp",
        },
        {
          slug: "european_bakery_105",
          image: "/images/demo/6.webp",
        },
        {
          slug: "gustelo_106",
          image: "/images/demo/5.webp",
        },
        {
          slug: "janan_restaurant_107",
          image: "/images/demo/4.webp",
        },
        {
          slug: "ice_berg_108",
          image: "/images/demo/3.webp",
        },
        {
          slug: "maritxu_109",
          image: "/images/demo/2.webp",
        },
      ],
    };
  },
};
</script>
