<template>
  <div>
    <div class="flex justify-between bg-white items-center px-2 pt-3">
      <div class="flex items-center">
        <nuxt-img
          format="webp"
          loading="lazy"
          decode="async"
          class="object-cover w-auto h-12 mr-2 rounded-full"
          :src="restaurant.logo"
          :alt="restaurant.name"
        />
        <p class="text-xl font-semibold text-gray-700">
          {{ restaurant.name }}
          <EditButton @click.native.prevent="modal = true" v-if="editMode" />
        </p>
      </div>
    </div>
    <Modal v-model="modal">
      <form class="mt-3" @submit.prevent="updateRestaurant">
        <div class="flex justify-between items-center mb-2">
          <h1
            class="text-lg font-medium leading-6 text-gray-700 capitalize"
            id="modal-title"
          >
            Edit Restaurant Name
          </h1>
          <CloseButton @click.native.prevent="modal = false" />
        </div>
        <Input
          v-for="(field, i) in inputFields"
          :key="i"
          :field="field"
          v-model="form"
          :errors="errors"
        />
        <div
          @click="imageModal = true"
          class="border flex flex-col items-center justify-center mt-3 h-60 cursor-pointer"
        >
          <nuxt-img
            format="webp"
            loading="lazy"
            decode="async"
            :src="selected.url"
            :alt="selected.url"
            v-if="selected.url"
            class="object-contain w-full h-full p-3"
          />
          <template v-else>
            <i class="text-8xl text-gray-900 far fa-image" />
            <p class="text-lg px-10 text-gray-700">Select restaurant logo</p>
          </template>
        </div>
        <small class="text-rose-700" v-if="errors?.image">
          <i>
            {{ errors.image.msg }}
          </i>
        </small>
        <div class="mt-4 flex flex-col lg:flex-row items-center sm:-mx-2 gap-3">
          <Button
            type="submit"
            class="w-full tracking-wide flex-1"
            :loading="loading"
          >
            Update restaurant name
          </Button>
          <Button
            variant="red"
            type="button"
            class="w-full tracking-wide flex-1"
            @click.native.prevent="modal = false"
          >
            Cancel
          </Button>
        </div>
      </form>
    </Modal>
    <ImageModal v-model="imageModal" :selected.sync="selected" />
  </div>
</template>

<script>
export default {
  name: "RestaurantName",
  props: { editMode: Boolean, restaurant: Object },
  data() {
    return {
      modal: false,
      imageModal: false,
      form: {
        name: "",
        image: "",
      },
      selected: {},
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
  watch: {
    modal(val) {
      !val ? this.setData() : "";
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
        const formData = { ...this.form, logo: this.selected.url };
        await this.$managerApi.updateRestaurantName(formData);
        this.modal = false;
        this.$nuxt.$emit("refetchMenu");
        this.$nuxt.$emit("success", "Restaurant name successfully updated");
        await this.$auth.fetchUser();
      } catch (error) {
        this.errors = error?.response?.data?.errors;
      } finally {
        this.loading = false;
      }
    },

    setData() {
      if (this.editMode) {
        this.form = {
          name: this.restaurant.name,
          userID: this.$auth.user?._id || "",
          restaurantID: this.$auth.user?.restaurant?._id || "",
        };
        this.selected = { url: this.restaurant.logo };
      }
    },
  },
};
</script>
