<template>
  <div
    class="lg:w-[450px] w-full mx-auto overflow-hidden bg-gray-100 shadow-2xl"
  >
    <MenuRestaurantName :editMode="editMode" :restaurant="restaurant" />
    <MenuCategory
      :editMode="editMode"
      :categories="categories"
      :activeCategory.sync="activeCategory"
    />
    <MenuSubCategory
      :editMode="editMode"
      :activeCategory="activeCategory"
      :activeSubCategory.sync="activeSubCategory"
      :subCategories="subCategories"
    />
    <MenuItem
      :editMode="editMode"
      :activeCategory="activeCategory"
      :activeSubCategory="activeSubCategory"
      :categories="categories"
      :subCategories="subCategories"
      :items="items"
    />

    <p class="text-center py-3">
      powered by anik <sup class="text-base">®</sup>
    </p>

    <MenuCart v-if="!editMode" />
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
    subCategories: Array,
    restaurant: Object,
  },
  data() {
    return {
      modal: false,
      activeCategory: "",
      activeSubCategory: null,
    };
  },
  watch: {
    activeCategory() {
      this.activeSubCategory = null;
    },
  },
  created() {
    this.activeCategory = this.categories[0]?._id;
  },
  methods: {},
};
</script>
