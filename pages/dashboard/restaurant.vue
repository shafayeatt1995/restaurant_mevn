<template>
  <div>
    <div class="flex justify-between px-2">
      <Button :to="{ name: 'dashboard' }"
        ><font-awesome-icon :icon="['fas', 'angle-left']" /> Back to
        Dashboard</Button
      >
    </div>
    <div class="absolute right-2 top-2 flex gap-2">
      Edit mode
      <ToggleSwitch
        :value="editMode"
        @click.native.prevent="editMode = !editMode"
      />
    </div>
    <div class="overflow-hidden pt-12 lg:pt-0">
      <Menu
        :editMode="editMode"
        :categories="categories"
        :restaurant="restaurant"
        :subCategories="subCategories"
        :featureCategories="featureCategories"
        :items="items"
      />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";
export default {
  name: "Editor",
  middleware: "manager",
  head() {
    return { title: "Editor - " + this.pageTitle };
  },
  data() {
    return {
      restaurant: {},
      categories: [],
      subCategories: [],
      items: [],
      featureCategories: [],
      editMode: true,
    };
  },
  async asyncData({ store, error }) {
    try {
      const params = { slug: store.getters.restaurantSlug };
      let res = await axios.get(store.getters.baseUrl + "/api/menu", {
        params,
      });
      const {
        restaurant,
        categories,
        subCategories,
        items,
        featureCategories,
      } = res.data;
      return {
        restaurant,
        categories,
        subCategories,
        items,
        featureCategories,
        editMode: true,
      };
    } catch (err) {
      error({ statusCode: 500, message: "Something wrong. Please try again" });
    }
  },
  computed: {
    ...mapGetters(["pageTitle", "restaurantSlug", "baseUrl"]),
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
        let res = await axios.get(this.baseUrl + "/api/menu", {
          params,
        });
        const {
          restaurant,
          categories,
          subCategories,
          items,
          featureCategories,
        } = res.data;
        this.restaurant = restaurant;
        this.categories = categories;
        this.subCategories = subCategories;
        this.items = items;
        this.featureCategories = featureCategories;
      } catch (error) {}
    },
  },
};
</script>
