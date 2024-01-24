<template>
  <div>
    <div
      @click="imageModal = true"
      class="border flex flex-col items-center justify-center mt-3 h-60 cursor-pointer"
    >
      <img
        loading="lazy"
        :src="selected.url"
        v-if="selected.url"
        class="object-contain w-full h-full p-3"
      />
      <template v-else>
        <font-awesome-icon
          :icon="['far', 'image']"
          class="text-8xl text-green-600"
        />
        <p class="text-lg px-10 text-gray-700">Select an printing logo</p>
      </template>
    </div>
    <Input
      v-for="(field, i) in inputFields"
      :key="i"
      :field="field"
      v-model="form"
      :errors="errors"
    />
    <div class="flex justify-end mt-3">
      <Button @click.native.prevent="updatePrintingDetails"
        >Update Details</Button
      >
    </div>
    <ImageModal v-model="imageModal" :selected.sync="selected" />
  </div>
</template>
<script>
export default {
  name: "SettingsNotification",
  data() {
    return {
      form: {
        printName: this.$auth.user.restaurant.printName || "",
        printAddress: this.$auth.user.restaurant.printAddress || "",
        printPhone: this.$auth.user.restaurant.printPhone || "",
        printEmail: this.$auth.user.restaurant.printEmail || "",
        printWebsite: this.$auth.user.restaurant.printWebsite || "",
        customMessage: this.$auth.user.restaurant.customMessage || "",
      },
      imageModal: false,
      selected: { url: this.$auth.user.restaurant.printImage },
      errors: {},
    };
  },
  computed: {
    inputFields() {
      return [
        {
          type: "text",
          placeholder: "Restaurant name",
          name: "printName",
          label: { id: "printName", title: "Restaurant Name" },
        },
        {
          type: "text",
          placeholder: "Restaurant address",
          name: "printAddress",
          label: { id: "printAddress", title: "Restaurant address" },
        },
        {
          type: "text",
          placeholder: "Restaurant phone",
          name: "printPhone",
          label: { id: "printPhone", title: "Restaurant phone" },
        },
        {
          type: "text",
          placeholder: "Restaurant email",
          name: "printEmail",
          label: { id: "printEmail", title: "Restaurant email" },
        },
        {
          type: "text",
          placeholder: "Restaurant website",
          name: "printWebsite",
          label: { id: "printWebsite", title: "Restaurant website" },
        },
        {
          type: "text",
          placeholder: "Custom message",
          name: "customMessage",
          label: { id: "customMessage", title: "Custom message" },
        },
      ];
    },
  },
  methods: {
    async updatePrintingDetails() {
      try {
        this.loading = true;
        await this.$managerApi.updatePrintingDetails({
          ...this.form,
          printImage: this.selected.url,
        });
        await this.$auth.fetchUser();
        $nuxt.$emit("success", "Printing details updated successfully");
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
