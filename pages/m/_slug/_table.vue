<template>
  <Menu
    :categories="categories"
    :restaurant="restaurant"
    :subCategories="subCategories"
    :items="items"
  />
</template>

<script>
import axios from "axios";
export default {
  name: "MenuPage",
  auth: false,

  data() {
    return {
      items: [],
      categories: [],
      subCategories: [],
      restaurant: {},
    };
  },
  async asyncData({ route, env, error }) {
    try {
      const { params } = route;
      let res = await axios.get(env.BASE_URL + "/api/menu", { params });
      if (res.data.available) {
        const { restaurant, categories, subCategories, items } = res.data;
        return { restaurant, categories, subCategories, items };
      } else {
        error({ statusCode: 404, message: "Not found" });
      }
    } catch (e) {
      console.error(e);
      error({ statusCode: 500, message: "Internal Server Error" });
    }
  },
};
</script>
