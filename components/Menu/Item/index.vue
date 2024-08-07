<template>
  <div class="px-2">
    <div class="flex justify-between my-3 items-center px-2">
      <p class="text-lg font-medium capitalize text-gray-700">
        All {{ activeCategoryName }} items
      </p>
      <div class="flex gap-1 text-2xl lg:hidden">
        <p
          class="transition-all duration-300 w-10 h-10 flex justify-center items-center rounded-md cursor-pointer"
          :class="align === 'single' ? 'bg-gray-900 text-white' : ''"
          @click="setAlign('single')"
        >
          <i class="fas fa-bars" />
        </p>
        <p
          class="transition-all duration-300 w-10 h-10 flex justify-center items-center rounded-md cursor-pointer"
          :class="align === 'multiple' ? 'bg-gray-900 text-white' : ''"
          @click="setAlign('multiple')"
        >
          <i class="fas fa-table-cells-large" />
        </p>
      </div>
    </div>
    <div
      class="flex flex-col gap-2 items-center my-3 p-3 bg-white shadow-lg cursor-pointer hover:bg-gray-400 transition-all duration-300 rounded-lg"
      @click="modal = true"
      v-if="editMode && activeCategory && !isFeatureCategory"
    >
      <p
        class="w-12 h-12 flex justify-center items-center rounded-full border-dotted border-2 border-gray-800 text-2xl cursor-pointer"
      >
        <i class="fas fa-plus" />
      </p>
      <p>Add new item</p>
    </div>

    <MenuItemDish
      :items="filterItem"
      :editMode="editMode"
      :categories="categories"
      :subCategories="subCategories"
      :activeCategory="activeCategory"
      :activeSubCategory="activeSubCategory"
      :align="align"
      :restaurant="restaurant"
      @editItem="setEditItem"
    />

    <Modal v-model="modal" v-if="editMode">
      <div class="mt-3">
        <div class="flex justify-between items-center mb-3">
          <div class="flex gap-4 text-gray-700">
            <template v-if="editItem">
              <p
                class="cursor-pointer"
                :class="moveUp ? ' text-gray-300' : ''"
                @click="!moveUp ? alignCategory('up') : ''"
              >
                <i class="fas fa-arrow-left" />
                Move left
              </p>
              <p
                class="cursor-pointer"
                :class="moveDown ? ' text-gray-300' : ''"
                @click="!moveDown ? alignCategory('down') : ''"
              >
                Move right <i class="fas fa-arrow-right" />
              </p>
            </template>
            <p v-else class="text-gray-700 text-xl">Create item</p>
          </div>

          <CloseButton @click.native.prevent="modal = false" />
        </div>
        <TabTitle
          :tabTitle="tabTitle"
          v-model="activeTab"
          fullWidth
          class="flex-1"
        />
        <transition name="fade" mode="out-in" tag="div">
          <div v-if="activeTab === 'General'">
            <MenuItemGeneral v-model="form" :errors="errors" />

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
                <p class="text-lg px-10 text-gray-700">
                  Select an Category image
                </p>
              </template>
            </div>
            <small class="text-rose-700" v-if="errors?.image">
              <i>
                {{ errors.image.msg }}
              </i>
            </small>
          </div>
          <MenuItemChoice
            v-model="form"
            :errors="errors"
            v-else-if="activeTab === 'Choice'"
          />
          <MenuItemAddon
            v-model="form"
            :errors="errors"
            v-else-if="activeTab === 'Addons'"
          />
        </transition>

        <div
          class="mt-4 flex flex-col-reverse lg:flex-row items-center sm:-mx-2 gap-3"
        >
          <Button
            type="submit"
            class="w-full tracking-wide flex-1"
            :loading="loading"
            @click.native.prevent="submit"
          >
            {{ editItem ? "Update" : "Create" }} item
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
      </div>
    </Modal>

    <ImageModal v-model="imageModal" :selected.sync="selected" />
  </div>
</template>

<script>
export default {
  name: "MenuItem",
  props: {
    editMode: Boolean,
    activeCategory: String,
    activeSubCategory: String,
    categories: Array,
    subCategories: Array,
    items: Array,
    featureItems: Array,
    featureCategories: Array,
    isFeatureCategory: Boolean,
    restaurant: Object,
  },
  data() {
    return {
      modal: false,
      imageModal: false,
      menuModal: false,
      editItem: false,
      form: {
        name: "",
        price: "",
        discount: false,
        discountAmount: "",
        estimateTime: "",
        description: "",
        choices: [],
        addons: [],
      },
      errors: {},
      selected: {},
      loading: false,
      deleteLoading: false,
      tabTitle: [
        { title: "General" },
        { title: "Choice" },
        { title: "Addons" },
      ],
      activeTab: "General",
      align: "multiple",
    };
  },
  computed: {
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
          label: { id: "estimate-time", title: "Estimate Time (Minute)" },
        },
        {
          type: "textarea",
          name: "description",
          label: { id: "description", title: "Description" },
        },
      ];
    },
    moveUp() {
      const key = this.filterItem.findIndex(({ _id }) => _id === this.form._id);
      return key === 0;
    },
    moveDown() {
      const key = this.filterItem.findIndex(({ _id }) => _id === this.form._id);
      return key + 1 === this.filterItem.length;
    },
    filterItem() {
      if (this.isFeatureCategory) {
        const find = this.featureItems.map((id) =>
          this.items.find(({ _id }) => _id === id)
        );
        return find.filter((val) => val !== undefined);
      } else {
        return this.items.filter(
          ({ categoryID, subCategoryID, status }) =>
            categoryID === this.activeCategory &&
            (this.editMode ? true : status === true) &&
            (this.activeSubCategory === null
              ? true
              : subCategoryID === this.activeSubCategory)
        );
      }
    },
    activeCategoryName() {
      if (this.isFeatureCategory) {
        const find = this.featureCategories.find(
          ({ _id }) => _id === this.activeCategory
        );
        return find?.name || "";
      } else {
        const find = this.categories.find(
          ({ _id }) => _id === this.activeCategory
        );
        return find?.name || "";
      }
    },
  },
  watch: {
    modal(val) {
      !val ? this.reset() : "";
    },
  },
  mounted() {
    // this.align = window.localStorage.getItem("align") || "single";
  },
  methods: {
    openModal() {
      if (this.editMode) {
        this.modal = true;
      }
    },
    async submit() {
      try {
        this.loading = true;
        if (this.editItem) {
          const data = {
            ...this.form,
            image: this.selected.url,
          };
          await this.$managerApi.updateItem(data);
        } else {
          const data = {
            ...this.form,
            image: this.selected.url,
            categoryID: this.activeCategory,
            subCategoryID: this.activeSubCategory,
          };
          await this.$managerApi.createItem(data);
        }
        this.$nuxt.$emit("refetchMenu");
        this.modal = false;
        this.$nuxt.$emit(
          "success",
          `Item ${this.editItem ? "updated" : "created"} successfully`
        );
      } catch (error) {
        this.errors = error?.response?.data?.errors;
      } finally {
        this.loading = false;
        this.false = true;
      }
    },
    edit(data) {
      this.editItem = true;
      const { image, name, _id } = data;
      this.form = { name, _id };
      this.selected = { url: image };
      this.modal = true;
    },
    reset() {
      this.form = {
        name: "",
        price: "",
        discount: false,
        discountAmount: "",
        estimateTime: "",
        description: "",
        choices: [],
        addons: [],
      };
      this.selected = {};
      this.errors = {};
      this.editItem = false;
    },
    async deleteItem() {
      try {
        if (confirm("Are you sure, you want to delete?")) {
          this.deleteLoading = true;
          await this.$managerApi.deleteItem({ _id: this.form._id });
          this.$nuxt.$emit("refetchMenu");
          this.modal = false;
          this.$nuxt.$emit("success", "Item deleted successfully");
        }
      } catch (error) {
      } finally {
        this.deleteLoading = false;
      }
    },
    async alignCategory(val) {
      try {
        if (val === "up") {
          const key = this.filterItem.findIndex(
            ({ _id }) => _id === this.form._id
          );
          const itemOne = this.filterItem[key];
          const itemTwo = this.filterItem[key - 1];
          if (itemOne && itemTwo) {
            const serialData = [
              { _id: itemOne._id, serial: itemTwo.serial },
              { _id: itemTwo._id, serial: itemOne.serial },
            ];
            await this.$managerApi.UpdateItemSerial({ serialData });
          }
        } else if (val === "down") {
          const key = this.filterItem.findIndex(
            ({ _id }) => _id === this.form._id
          );
          const itemOne = this.filterItem[key];
          const itemTwo = this.filterItem[key + 1];
          if (itemOne && itemTwo) {
            const serialData = [
              { _id: itemOne._id, serial: itemTwo.serial },
              { _id: itemTwo._id, serial: itemOne.serial },
            ];
            await this.$managerApi.UpdateItemSerial({ serialData });
          }
        }
        this.modal = false;
        this.$nuxt.$emit("refetchMenu");
        this.$nuxt.$emit("success", "Item position updated");
      } catch (error) {}
    },
    setEditItem(item) {
      if (this.editMode) {
        this.form = item;
        this.selected.url = item.image;
        this.editItem = true;
        this.modal = true;
      }
    },
    setAlign(val) {
      this.align = val;
      window.localStorage.setItem("align", val);
    },
  },
};
</script>
