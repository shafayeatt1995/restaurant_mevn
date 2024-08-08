<template>
  <div>
    <form @submit.prevent="extract" v-if="isDev" class="flex gap-3">
      <input class="border w-full" v-model="url" @click="pasteFromClipboard" />
      <Button type="submit" :loading="loading">Extract</Button>
    </form>
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
import { mapGetters } from "vuex";
export default {
  name: "MenuItemGeneral",
  props: { errors: Object },
  data() {
    return {
      url: "",
      loading: false,
    };
  },
  computed: {
    ...mapGetters(["isDev"]),
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
  watch: {
    url(val) {
      if (val.length > 0) this.extract();
    },
  },
  methods: {
    async extract() {
      try {
        this.loading = true;
        const response = await this.$commonApi.proxy({ url: this.url });
        const doc = new DOMParser().parseFromString(response, "text/html");
        const name = doc.querySelector(
          ".product-page__product-name.text-overflow"
        );
        const description = doc.querySelector(
          ".product-page__product-description"
        );
        const price = doc.querySelector(".product-page__product-price.no-wrap");
        this.form.name = name ? name.innerHTML : "";
        this.form.description = description ? description.innerHTML : "";
        this.form.price = price
          ? parseFloat(price.innerHTML.split(" ")[0].replace(",", ".")).toFixed(
              2
            )
          : "";
        this.url = "";
      } catch (error) {
        console.log(error.message);
      } finally {
        this.loading = false;
      }
    },
    async pasteFromClipboard() {
      try {
        const text = await navigator.clipboard.readText();
        this.url = text;
      } catch (error) {
        console.error("Failed to read clipboard contents:", error);
      }
    },
  },
};
</script>
