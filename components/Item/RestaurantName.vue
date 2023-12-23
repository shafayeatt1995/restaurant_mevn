<template>
  <div>
    <div class="flex items-center bg-white pt-3">
      <img
        class="object-cover w-12 h-12 mx-2 rounded-full"
        src="/images/logo/1.png"
        alt="avatar"
      />
      <p>
        {{ editMode ? $auth.user?.restaurant?.name || "" : "Restaurant name" }}
        <EditButton @click.native.prevent="modal = true" v-if="editMode" />
      </p>
    </div>
    <Modal v-model="modal">
      <form class="mt-3" @submit.prevent="updateRestaurant">
        <h3
          class="text-lg font-medium leading-6 text-gray-600 capitalize mb-2"
          id="modal-title"
        >
          Edit Restaurant Name
        </h3>
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
            @click.native.prevent="modal = false"
          >
            Cancel
          </Button>

          <Button
            variant="green"
            type="submit"
            class="w-full tracking-wide flex-1"
            :loading="loading"
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
  name: "ItemRestaurantName",
  props: { editMode: Boolean },
  data() {
    return {
      modal: false,
      restaurant: {
        name: "",
      },
      errors: {},
      loading: false,
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
        this.loading = true;
        this.errors = {};
        await this.$ownerApi.updateRestaurantName(this.restaurant);
        this.modal = false;
        $nuxt.$emit("success", "Restaurant name successfully updated");
        this.$auth.fetchUser();
      } catch (error) {
        console.log(error);
        this.errors = error?.response?.data?.errors;
      } finally {
        this.loading = false;
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
