<template>
  <div class="px-4">
    <div class="px-6 py-8 mx-auto bg-white rounded-xl">
      <div class="flex justify-center items-center">
        <img src="/logo.png" class="h-20 object-contain" alt="logo" />
      </div>
      <h1
        class="text-2xl font-semibold text-center text-gray-800 capitalize lg:text-3xl mt-2"
      >
        Scan<span class="text-green-500">Eating</span> Subscription packages
      </h1>

      <p class="max-w-2xl mx-auto text-center text-gray-700 mt-1">
        Choose the Plan That Fits Your Restaurant's
      </p>

      <div class="grid grid-cols-1 gap-6 mt-6 lg:grid-cols-3">
        <div
          class="w-full p-8 space-y-8 text-center border border-gray-200 rounded-lg"
        >
          <div class="flex flex-col justify-between h-full">
            <div>
              <p class="font-medium text-gray-700 uppercase">Life time</p>

              <h2 class="text-4xl font-semibold text-gray-800 uppercase mt-8">
                FREE
              </h2>
            </div>
            <button
              @click="modal = true"
              :disabled="!this.user"
              class="w-full px-4 py-2 mt-10 tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-900 rounded-md hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:ring focus:ring-gray-300 focus:ring-opacity-80 disabled:bg-gray-500"
            >
              Active
            </button>
          </div>
        </div>

        <div class="w-full p-8 space-y-8 text-center bg-gray-900 rounded-lg">
          <div class="flex flex-col justify-between h-full">
            <div>
              <p class="font-medium text-gray-200 uppercase">12 Months</p>

              <h2 class="text-5xl font-bold text-white uppercase">
                <del class="text-2xl">${{ 120 | currencyNumber }}</del>
                <p class="">${{ 100 | currencyNumber }}</p>
              </h2>
            </div>
            <a
              href="https://wa.me/01728293635"
              target="_blank"
              class="w-full px-4 py-2 mt-10 tracking-wide text-gray-900 capitalize transition-colors duration-300 transform bg-white rounded-md hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:ring focus:ring-gray-200 focus:ring-opacity-80 font-bold"
            >
              Active now
            </a>
          </div>
        </div>

        <div
          class="w-full p-8 space-y-8 text-center border border-gray-200 rounded-lg"
        >
          <div class="flex flex-col justify-between h-full">
            <div>
              <p class="font-medium text-gray-500 uppercase">1 Months</p>

              <h2 class="text-4xl mt-8 font-semibold text-gray-800 uppercase">
                <p class="">${{ 10 | currencyNumber }}</p>
              </h2>
            </div>
            <a
              href="https://wa.me/01728293635"
              target="_blank"
              class="w-full px-4 py-2 mt-10 tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-900 rounded-md hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:ring focus:ring-gray-300 focus:ring-opacity-80"
            >
              Active now
            </a>
          </div>
        </div>
      </div>
    </div>
    <Modal v-model="modal">
      <div class="flex justify-between items-center">
        <h1
          class="text-lg font-medium leading-6 text-gray-700 capitalize"
          id="modal-title"
        >
          Create restaurant
        </h1>
        <CloseButton @click.native.prevent="modal = false" />
      </div>
      <form class="" @submit.prevent="freeSubscription">
        <Input
          v-for="(field, i) in inputFields"
          :key="i"
          :field="field"
          v-model="form"
          :errors="errors"
        />
        <div class="mt-4 flex flex-col lg:flex-row items-center sm:-mx-2 gap-3">
          <Button class="w-full tracking-wide flex-1" type="submit">
            Create restaurant Account
          </Button>
          <Button
            variant="red"
            type="button"
            class="w-full tracking-wide flex-1"
            @click.native.prevent="modal = false"
          >
            Close
          </Button>
        </div>
      </form>
    </Modal>
    <Modal v-model="messageModal">
      <h1 class="text-3xl my-3 text-center">{{ message }}</h1>
      <Button variant="red" @click.native.prevent="logOut" class="w-full mt-4"
        >Logout</Button
      >
    </Modal>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "Subscription",
  layout: "dashboard",
  middleware: "managerOrUser",
  head() {
    return { title: "Subscription - " + this.pageTitle };
  },
  data() {
    return {
      messageModal: false,
      modal: false,
      form: { name: "" },
      errors: {},
      message: "",
    };
  },
  computed: {
    ...mapGetters(["pageTitle", "user"]),
    inputFields() {
      return [
        {
          type: "text",
          placeholder: "Restaurant name",
          name: "name",
          label: { id: "name", title: "Restaurant name" },
        },
      ];
    },
  },
  methods: {
    async freeSubscription() {
      try {
        await this.$userApi.createRestaurant(this.form);
        this.modal = false;
        this.form = { name: "" };
        this.message =
          "Please logout and login again otherwise some functions may not work properly";
        this.$nuxt.$emit("success", "Restaurant account added successfully");
        this.messageModal = true;
      } catch (error) {
        this.errors = error?.response?.data?.errors;
      }
    },
    async logOut() {
      try {
        await this.$auth.logout("laravelJWT");
        this.$router.push({ name: "auth-login" });
      } catch (error) {}
    },
  },
};
</script>
