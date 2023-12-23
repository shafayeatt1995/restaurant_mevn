<template>
  <div
    class="lg:w-[450px] w-full mx-auto overflow-hidden bg-gray-100 shadow-2xl"
  >
    <div class="flex items-center bg-white pt-3">
      <img
        class="object-cover w-12 h-12 mx-2 rounded-full"
        src="/images/logo/1.png"
        alt="avatar"
      />
      <p>
        {{ editMode ? $auth.user?.restaurant?.name || "" : "Restaurant name" }}
        <EditButton @click.native.prevent="nameModal = true" v-if="editMode" />
      </p>
    </div>

    <div
      class="overflow-x-auto flex pt-4 flex-nowrap items-stretch sticky top-0 bg-white z-10"
    >
      <div
        v-for="(name, key) in categories"
        :key="key"
        class="flex flex-col items-center p-2 relative"
      >
        <img
          src="/images/logo/1.png"
          class="object-cover w-12 h-12 mx-2 rounded-full"
        />
        <p class="mx-2 flex text-sm whitespace-nowrap">{{ name }}</p>
      </div>
    </div>

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
    <Modal v-model="nameModal">
      <form class="mt-4" @submit.prevent="updateRestaurant">
        <Input
          v-for="(field, i) in inputFields"
          :key="i"
          :field="field"
          v-model="restaurant"
          :errors="errors"
        />
        <div class="mt-4 flex flex-col lg:flex-row items-center sm:-mx-2 gap-3">
          <Button
            variant="white"
            type="button"
            class="w-full tracking-wide flex-1"
            @click.native.prevent="nameModal = false"
          >
            Cancel
          </Button>

          <Button
            variant="green"
            type="submit"
            class="w-full tracking-wide flex-1"
            :loading="updateRestaurantLoading"
          >
            Update restaurant name
          </Button>
        </div>
      </form>
    </Modal>
  </div>
</template>

<script>
export default {
  name: "ItemComponent",
  props: { editMode: Boolean },
  data() {
    return {
      modal: false,
      nameModal: false,
      categories: [
        "Popular items",
        "Curry testy",
        "ramen dine in",
        "donbury",
        "salad",
        "desert",
        "Drinks",
        "kids",
        "donbury",
        "salad",
        "desert",
        "Drinks",
        "kids",
      ],
      restaurant: {
        name: "",
      },
      errors: {},
      updateRestaurantLoading: false,
    };
  },
  computed: {
    inputFields() {
      return [
        {
          type: "text",
          placeholder: "Name",
          name: "name",
        },
      ];
    },
  },
  mounted() {
    this.setData();
  },
  methods: {
    async updateRestaurant() {
      try {
        this.updateRestaurantLoading = true;
        this.errors = {};
        await this.$ownerApi.updateRestaurantName(this.restaurant);
        this.nameModal = false;
        $nuxt.$emit("success", "Restaurant name successfully updated");
        this.$auth.fetchUser();
      } catch (error) {
        console.log(error);
        this.errors = error.response.data.errors;
      } finally {
        this.updateRestaurantLoading = false;
      }
    },
    setData() {
      if (this.$auth.loggedIn) {
        this.restaurant = {
          name: this.$auth.user.restaurant.name,
          userID: this.$auth.user._id,
          restaurantID: this.$auth.user.restaurant._id,
        };
      }
    },
  },
};
</script>
