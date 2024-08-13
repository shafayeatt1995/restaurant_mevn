<template>
  <Modal v-model="modal">
    <form class="mt-3" @submit.prevent="createRestaurant">
      <div class="flex justify-between items-center mb-2">
        <h1
          class="text-lg font-medium leading-6 text-gray-700 capitalize"
          id="modal-title"
        >
          Create restaurant
        </h1>
      </div>
      <Input
        v-for="(field, i) in inputFields"
        :key="i"
        :field="field"
        v-model="form"
        :errors="errors"
      />
      <div class="mt-4 flex flex-col lg:flex-row items-center sm:-mx-2 gap-3">
        <Button
          type="submit"
          class="w-full tracking-wide flex-1"
          :loading="loading"
        >
          Create restaurant
        </Button>
      </div>
    </form>
  </Modal>
</template>

<script>
import { refreshTokens } from "@/utils";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      modal: false,
      loading: false,
      errors: {},
      form: { name: "" },
    };
  },
  computed: {
    ...mapGetters(["user"]),
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
    this.modal = this.user ? true : false;
  },
  methods: {
    async createRestaurant() {
      try {
        this.loading = true;
        this.errors = {};
        await this.$userApi.createRestaurant(this.form);
        await refreshTokens.call(this);
        this.$nuxt.$emit("success", "Restaurant created successfully");
        this.modal = false;
      } catch (error) {
        this.errors = error?.response?.data?.errors;
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
