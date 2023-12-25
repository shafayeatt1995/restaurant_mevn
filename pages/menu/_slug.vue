<template>
  <Menu :categories="categories" :restaurant="restaurant" />
</template>

<script>
import axios from "axios";
export default {
  name: "MenuPage",
  auth: false,

  data() {
    return {
      categories: [],
      restaurant: {},
    };
  },

  async asyncData({ route, env }) {
    try {
      const { params } = route;
      let res = await axios.get(env.BASE_URL + "/api/menu", { params });
      const { restaurant, categories } = res.data;
      return { restaurant, categories };
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
