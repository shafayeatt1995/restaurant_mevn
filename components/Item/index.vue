<template>
  <div
    class="lg:w-[450px] w-full mx-auto overflow-hidden bg-gray-100 shadow-2xl"
  >
    <ItemRestaurantName :editMode="editMode" />
    <ItemCategory :editMode="editMode" />

    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-3 mt-3 px-2">
      <div
        class="flex-column bg-white rounded-2xl overflow-hidden shadow-lg cursor-pointer"
        v-for="(name, key) in categories"
        :key="key"
        @click="modal = true"
      >
        <img src="/images/food.png" class="h-[130px] w-full object-cover" />
        <div class="flex justify-between p-2">
          <p>{{ name }}</p>
          <p>৳499</p>
        </div>
      </div>
    </div>

    <p class="text-center py-3">
      powered by anik <sup class="text-base">®</sup>
    </p>

    <ItemModal v-model="modal">
      <div
        class="text-2xl absolute mt-3 ml-3 text-gray-700 h-12 w-12 rounded-full bg-gray-300 flex justify-center items-center cursor-pointer"
        @click="modal = false"
      >
        <font-awesome-icon :icon="['fas', 'chevron-left']" />
      </div>
      <img src="/images/food.png" class="h-[250px] w-full object-cover" />
      <div class="flex justify-between items-center px-4 py-2 shadow-lg">
        <div class="flex items-center">
          <img src="/images/logo/1.png" class="object-cover w-12 h-12" />
          <p class="ml-2">Category name</p>
        </div>
        <p>৳499</p>
      </div>
      <div class="flex justify-end">
        <div
          class="bg-green-600 text-white h-12 w-12 rounded-full text-3xl flex justify-center items-center mt-[-16px] mr-5 shadow-xl cursor-pointer"
        >
          <font-awesome-icon :icon="['fas', 'plus']" />
        </div>
      </div>
      <div class="px-4 my-5 text-gray-500">
        a mild, coconut and citrus curry, with prawns, mangetout, peppers, red
        and spring onions. served with white rice, a sprinkle of mixed sesame
        seeds, red chillies, coriander and fresh lime
      </div>
      <hr />
      <div class="text-gray-500 px-5 my-5">
        <p>Size</p>
        <div class="flex flex-col gap-1 mt-2">
          <div class="flex gap-2">
            <div
              class="h-5 w-5 bg-green-600 rounded-full border-white border-4 shadow-[0_0_0_2px_rgba(156,163,175,1)]"
            ></div>
            <p>Normal</p>
          </div>
          <div class="flex gap-2">
            <div
              class="h-5 w-5 bg-white rounded-full border-white border-4 shadow-[0_0_0_2px_rgba(156,163,175,1)]"
            ></div>
            <p>Large</p>
          </div>
        </div>
      </div>
      <hr />
    </ItemModal>

    <ItemCart v-if="!editMode" />
    <div class="mb-16"></div>
  </div>
</template>

<script>
export default {
  name: "ItemComponent",
  props: { editMode: Boolean },
  data() {
    return {
      modal: false,
      categories: ["Popular items", "Curry testy"],
    };
  },
  methods: {},
};
</script>
