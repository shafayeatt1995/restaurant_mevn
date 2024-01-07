<template>
  <div>
    <Menu
      :categories="categories"
      :restaurant="restaurant"
      :subCategories="subCategories"
      :items="items"
    />
  </div>
</template>

<script>
import { mapActions } from "vuex";
import axios from "axios";
export default {
  name: "MenuPage",
  auth: false,
  head() {
    return { title: this.restaurant.name };
  },
  data() {
    return {
      items: [],
      categories: [],
      subCategories: [],
      restaurant: {},
      table: {},
    };
  },
  async asyncData({ route, env, error }) {
    try {
      const { params } = route;
      let res = await axios.get(env.BASE_URL + "/api/menu", { params });
      if (res.data.table) {
        const { restaurant, categories, subCategories, items, table } =
          res.data;
        return { restaurant, categories, subCategories, items, table };
      } else {
        error({ statusCode: 404, message: "Not found" });
      }
    } catch (e) {
      console.error(e);
      error({ statusCode: 500, message: "Internal Server Error" });
    }
  },
  mounted() {
    this.setInitialData({ restaurant: this.restaurant, table: this.table });
  },
  methods: {
    ...mapActions("cart", ["setInitialData"]),
  },
};
</script>
