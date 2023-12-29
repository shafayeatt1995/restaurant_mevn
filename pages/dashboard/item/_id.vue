<template>
  <div class="grid grid-cols-3 gap-4 px-4">
    <div class="bg-white rounded-lg p-2 col-span-3 lg:col-span-2">
      <h1 class="text-4xl text-gray-600">
        {{ editMode ? "Edit" : "Create" }} Item
      </h1>
      <Input
        v-for="(field, i) in inputFields"
        :key="i"
        :field="field"
        v-model="form"
        :errors="errors"
      />
      <div class="border border-gray-200 mb-4 mt-5"></div>
      <p class="text-gray-600">Ingredient Section (optional)</p>
      <div
        class="flex flex-wrap border border-gray-300 rounded-lg gap-3 py-2 px-1"
        v-if="form.ingredient.length"
      >
        <Badge
          variant="green"
          class="text-gray-600 cursor-pointer"
          v-for="(data, i) in form.ingredient"
          :key="i"
          :title="data"
          :backIcon="['fas', 'xmark']"
          @click.native.prevent="removeIngredient(i)"
        />
      </div>
      <form class="relative">
        <Input
          v-for="(field, i) in ingredientFields"
          :key="i"
          :field="field"
          v-model="ingredient"
          @action="addIngredient"
        />
      </form>
    </div>
    <div class="flex-1 col-span-3 lg:col-span-1">
      <div class="bg-white rounded-lg p-2 pb-4">
        <!-- <p class="text-gray-600">Variant Section (optional)</p>
        <div
          class="flex flex-wrap border border-gray-300 rounded-lg gap-3 py-2 px-1"
          v-if="form.variant.length"
        >
          <Badge
            variant="green"
            class="text-gray-600 cursor-pointer break-all"
            v-for="(data, i) in form.variant"
            :key="i"
            :title="data"
            :backIcon="['fas', 'xmark']"
            @click.native.prevent="removeVariant(i)"
          />
        </div>
        <form>
          <Input
            v-for="(field, i) in variantFields"
            :key="i"
            :field="field"
            v-model="variant"
            @action="addVariant"
          />
        </form> -->
        <!-- <div class="border border-gray-200 my-3"></div> -->
        <p class="text-gray-600">Image Section</p>
        <div
          @click="imageModal = true"
          class="border flex flex-col items-center justify-center h-60 cursor-pointer rounded-lg"
        >
          <img
            :src="form.image"
            v-if="form.image"
            class="object-contain w-full h-full p-3"
          />
          <template v-else>
            <font-awesome-icon
              :icon="['far', 'image']"
              class="text-8xl text-green-600"
            />
            <p class="text-lg px-10 text-gray-700">Select an Category image</p>
          </template>
        </div>
        <small class="text-rose-700" v-if="errors?.image">
          <i>
            {{ errors.image.msg }}
          </i>
        </small>
        <ImageModal v-model="imageModal" :selected.sync="selected" />
        <Input
          v-for="(field, i) in statusFields"
          :key="i"
          :field="field"
          v-model="form"
          :errors="errors"
        />
        <Button
          variant="green"
          class="w-full mt-3"
          @click.native.prevent="submit"
          :loading="loading"
          >{{ editMode ? "Update" : "Create" }} Item</Button
        >
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "ItemID",
  layout: "dashboard",
  middleware: "manager",
  head() {
    return { title: "Items - " + process.env.APP_NAME };
  },
  data() {
    return {
      loading: false,
      imageModal: false,
      categories: [],
      selected: {},
      variant: { name: "" },
      ingredient: { name: "" },
      form: {
        categoryID: "",
        name: "",
        image: "",
        ingredient: [],
        price: null,
        discount: false,
        discountAmount: "",
        description: "",
        estimateTime: "",
        variant: [],
        status: true,
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
          label: { id: "item-name", title: "Item name" },
          name: "name",
        },
        {
          type: "select",
          placeholder: "Select a category",
          name: "categoryID",
          label: { id: "category", title: "Select Category" },
          options: this.categories.map(({ _id, name }) => ({
            value: _id,
            label: name,
          })),
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
          type: "text",
          placeholder: "Estimate Time",
          name: "estimateTime",
          label: { id: "estimate-time", title: "Estimate Time" },
        },
        {
          type: "textarea",
          name: "description",
          label: { id: "description", title: "Description (optional)" },
        },
      ];

      return fields;
    },
    variantFields() {
      const fields = [
        {
          type: "text",
          placeholder: "Variant name",
          name: "name",
          inlineSubmit: {
            show: true,
            text: "",
            icon: ["fas", "check"],
          },
        },
      ];
      return fields;
    },
    ingredientFields() {
      const fields = [
        {
          type: "text",
          placeholder: "Ingredient name",
          name: "name",
          inlineSubmit: {
            show: true,
            text: "",
            icon: ["fas", "check"],
          },
        },
      ];

      return fields;
    },
    statusFields() {
      const fields = [
        {
          type: "select",
          placeholder: "Select status",
          name: "status",
          options: [
            { value: true, label: "Active" },
            { value: false, label: "Hide" },
          ],
        },
      ];

      return fields;
    },
    editMode() {
      return this.$route.params.id !== "null";
    },
  },
  watch: {
    selected(val) {
      this.form.image = val.url;
    },
  },
  mounted() {
    this.fetchCategory();
    this.fetchItem();
  },
  methods: {
    async fetchCategory() {
      try {
        const { categories } = await this.$managerApi.getCategory();
        this.categories = categories;
      } catch (error) {
        console.log(error);
      }
    },
    async fetchItem() {
      try {
        if (this.$route.params.id !== "null") {
          const { item } = await this.$managerApi.getItem(
            this.$route.params.id
          );
          const {
            categoryID,
            name,
            image,
            ingredient,
            price,
            discount,
            discountAmount,
            description,
            estimateTime,
            variant,
            status,
          } = item;
          this.form = {
            _id: this.$route.params.id,
            categoryID,
            name,
            image,
            ingredient,
            price,
            discount,
            discountAmount,
            description,
            estimateTime,
            variant,
            status,
          };
        }
      } catch (error) {
        console.log(error);
      }
    },
    addVariant() {
      if (this.variant.name.length) {
        this.form.variant.push(this.variant.name);
        this.variant.name = "";
      }
    },
    addIngredient() {
      if (this.ingredient.name.length) {
        this.form.ingredient.push(this.ingredient.name);
        this.ingredient.name = "";
      }
    },
    removeVariant(index) {
      this.form.variant.splice(index, 1);
    },
    removeIngredient(index) {
      this.form.ingredient.splice(index, 1);
    },
    async submit() {
      try {
        this.loading = true;
        if (this.$route.params.id !== "null") {
          await this.$managerApi.updateItem(this.form);
          $nuxt.$emit("success", "Item updated  successfully");
        } else {
          await this.$managerApi.createItem(this.form);
          $nuxt.$emit("success", "Item created successfully");
        }
        this.$router.push({ name: "dashboard-item" });
      } catch (error) {
        this.errors = error?.response?.data?.errors;
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
