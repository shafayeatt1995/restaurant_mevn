<template>
  <div class="w-full mx-auto bg-gray-100">
    <div class="flex bg-white">
      <Button :to="{ name: 'dashboard-order' }" v-if="manualOrder">
        <i class="fas fa-angle-left" /> Back to Order
      </Button>
    </div>

    <MenuRestaurantName :editMode="editMode" :restaurant="restaurant" />
    <MenuCategory
      :editMode="editMode"
      :categories="categories"
      :featureCategories="featureCategories"
      :items="items"
      :activeCategory.sync="activeCategory"
      class="sticky top-0 z-20"
    />
    <MenuSubCategory
      :editMode="editMode"
      :activeCategory="activeCategory"
      :activeSubCategory.sync="activeSubCategory"
      :subCategories="subCategories"
      :isFeatureCategory="isFeatureCategory"
    />
    <MenuItem
      :editMode="editMode"
      :activeCategory="activeCategory"
      :activeSubCategory="activeSubCategory"
      :categories="categories"
      :subCategories="subCategories"
      :items="items"
      :featureCategories="featureCategories"
      :featureItems="featureItems"
      :isFeatureCategory="isFeatureCategory"
      :restaurant="restaurant"
    />

    <p class="text-center py-5">
      All right reserved by
      <nuxt-link :to="{ name: 'index' }" class="text-green-500"
        >www.scaneating.com</nuxt-link
      ><sup class="text-base">®</sup>
    </p>
    <MenuCart
      v-if="!editMode"
      :restaurant="restaurant"
      :tableList="tableList"
    />
    <div class="mb-16"></div>
  </div>
</template>

<script>
export default {
  name: "MenuComponent",
  props: {
    editMode: Boolean,
    items: Array,
    categories: Array,
    featureCategories: Array,
    subCategories: Array,
    tableList: Array,
    restaurant: Object,
  },
  data() {
    return {
      modal: false,
      activeCategory: "",
      activeSubCategory: null,
    };
  },
  computed: {
    isFeatureCategory() {
      return this.featureCategories.some(
        ({ _id }) => _id === this.activeCategory
      );
    },
    featureItems() {
      if (this.isFeatureCategory) {
        const find = this.featureCategories.find(
          ({ _id }) => _id === this.activeCategory
        );
        if (find) {
          return find.items;
        } else {
          return [];
        }
      } else {
        return [];
      }
    },
    manualOrder() {
      const { manualOrder, additionalMode, email } = this.$route.query;
      return (manualOrder || (additionalMode && email)) ?? false;
    },
  },
  watch: {
    activeCategory() {
      this.activeSubCategory = null;
    },
  },
  mounted() {
    this.activeCategory =
      this.featureCategories[0]?._id || this.categories[0]?._id;
  },
  methods: {},
};
</script>
