<template>
  <Menu
    :categories="categories"
    :restaurant="restaurant"
    :subCategories="subCategories"
  />
</template>

<script>
import axios from "axios";
export default {
  name: "MenuPage",
  auth: false,

  data() {
    return {
      categories: [],
      subCategories: [],
      restaurant: {},
    };
  },

  async asyncData({ route, env }) {
    try {
      const { params } = route;
      let res = await axios.get(env.BASE_URL + "/api/menu", { params });
      const { restaurant, categories, subCategories } = res.data;
      return { restaurant, categories, subCategories };
    } catch (error) {
      console.log(error);
    }
  },
  computed: {
    slug() {
      return this.$route.params.slug;
    },
  },
};
</script>
