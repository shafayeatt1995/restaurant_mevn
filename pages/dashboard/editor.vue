<template>
  <div class="overflow-hidden">
    <Menu
      editMode
      :categories="categories"
      :restaurant="restaurant"
      :subCategories="subCategories"
      :items="items"
    />
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";
export default {
  name: "Editor",
  // layout: "dashboard",
  middleware: "manager",
  head() {
    return { title: "Editor - " + process.env.APP_NAME };
  },
  data() {
    return {
      restaurant: {},
      categories: [],
      subCategories: [],
      items: [],
    };
  },
  async asyncData({ env, store }) {
    try {
      const params = { slug: store.getters.restaurantSlug };
      let res = await axios.get(env.BASE_URL + "/api/menu", { params });
      const { restaurant, categories, subCategories, items } = res.data;
      return { restaurant, categories, subCategories, items };
    } catch (error) {
      console.log(error);
    }
  },
  computed: {
    ...mapGetters(["restaurantSlug"]),
  },
  created() {
    this.$nuxt.$on("refetchMenu", () => {
      this.refetch();
    });
  },

  beforeDestroy() {
    this.$nuxt.$off("refetchMenu");
  },
  methods: {
    async refetch() {
      try {
        const params = { slug: this.restaurantSlug };
        let res = await axios.get(process.env.BASE_URL + "/api/menu", {
          params,
        });
        const { restaurant, categories, subCategories } = res.data;
        this.restaurant = restaurant;
        this.categories = categories;
        this.subCategories = subCategories;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
