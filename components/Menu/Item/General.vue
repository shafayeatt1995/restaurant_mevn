<template>
  <div>
    <Input
      v-for="(field, i) in generalInput"
      :key="i"
      :field="field"
      v-model="form"
      :errors="errors"
    />
  </div>
</template>

<script>
export default {
  name: "MenuItemGeneral",
  props: { errors: Object },
  computed: {
    form: {
      get() {
        return this.$attrs.value;
      },
      set(value) {
        this.$emit("input", value);
      },
    },
    generalInput() {
      return [
        {
          type: "text",
          placeholder: "Name",
          label: { id: "item-name", title: "Item name" },
          name: "name",
        },
        {
          type: "number",
          placeholder: "Price",
          name: "price",
          label: { id: "price", title: "Item price" },
        },
        {
          type: "select",
          placeholder: "Select discount type",
          name: "discount",
          label: { id: "discount", title: " Discount" },
          options: [
            { value: true, label: "Discount" },
            { value: false, label: "No discount " },
          ],
        },
        {
          hide: !this.form.discount,
          type: "number",
          placeholder: "Discount amount",
          name: "discountAmount",
          label: { id: "discount-price", title: "Discount Amount" },
        },
        {
          type: "number",
          placeholder: "Estimate Time",
          name: "estimateTime",
          label: { id: "estimate-time", title: "Estimate Time (Optional)" },
        },
        {
          type: "textarea",
          name: "description",
          label: { id: "description", title: "Description (Optional)" },
        },
      ];
    },
  },
};
</script>
