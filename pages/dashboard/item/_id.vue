<template>
  <div>
    <div>
      <Input
        v-for="(field, i) in inputFields"
        :key="i"
        :field="field"
        v-model="form"
        :errors="errors"
      />
    </div>
  </div>
</template>
<script>
export default {
  name: "ItemID",
  layout: "dashboard",
  middleware: "owner",
  head() {
    return { title: "Items - " + process.env.APP_NAME };
  },
  data() {
    return {
      loading: false,
      categories: [],
      variant: {
        name: "",
        stock: "",
      },
      form: {
        categoryID: "",
        name: "",
        image: "",
        ingredient: [],
        price: "",
        discount: false,
        discountAmount: "",
        description: "",
        estimateTime: "",
        estimateTime: "",
        variant: [],
      },
      errors: {},
    };
  },
  computed: {
    inputFields() {
      const fields = [
        {
          type: "text",
          placeholder: "Name",
          name: "name",
        },
        {
          hide: this.editMode,
          type: "select",
          placeholder: "Type",
          icon: ["fas", "lock"],
          name: "type",
          options: [
            { value: "admin", label: "Admin" },
            { value: "owner", label: "Owner" },
            { value: "chef", label: "Chef" },
            { value: "waiter", label: "Waiter" },
            { value: "user", label: "User" },
          ],
        },
        {
          hide: this.form.type !== "owner" || this.editMode,
          type: "text",
          placeholder: "Restaurant Name",
          icon: ["far", "user"],
          name: "restaurantName",
        },
      ];

      return fields;
    },
  },
};
</script>
