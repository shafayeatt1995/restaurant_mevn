<template>
  <div class="px-2">
    <div
      class="flex flex-col gap-2 items-center my-3 p-3 bg-white shadow-lg cursor-pointer hover:bg-gray-400 transition-all duration-300 rounded-lg"
      @click="modal = true"
      v-if="editMode"
    >
      <p
        class="w-12 h-12 flex justify-center items-center rounded-full border-dotted border-2 border-gray-800 text-2xl"
      >
        <font-awesome-icon :icon="['fas', 'plus']" />
      </p>
      <p>Add new item</p>
    </div>

    <MenuItemDish
      :items="items"
      :editMode="editMode"
      :categories="categories"
    />

    <Modal v-model="modal" v-if="editMode">
      <div class="mt-3">
        <div class="flex justify-between items-center mb-3">
          <div class="flex gap-4 text-gray-600">
            <template v-if="editItem">
              <p
                class="cursor-pointer"
                :class="moveLeft ? ' text-gray-300' : ''"
                @click="!moveLeft ? alignCategory('left') : ''"
              >
                <font-awesome-icon :icon="['fas', 'arrow-left']" />
                Move left
              </p>
              <p
                class="cursor-pointer"
                :class="moveRight ? ' text-gray-300' : ''"
                @click="!moveRight ? alignCategory('right') : ''"
              >
                Move right <font-awesome-icon :icon="['fas', 'arrow-right']" />
              </p>
            </template>
            <p v-else class="text-gray-600 text-xl">Create item</p>
          </div>
          <p
            class="shadow-lg h-12 w-12 rounded-full flex justify-center items-center cursor-pointer"
            @click="modal = false"
          >
            <font-awesome-icon :icon="['fas', 'xmark']" />
          </p>
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
              <img
                :src="selected.url"
                v-if="selected.url"
                class="object-contain w-full h-full p-3"
              />
              <template v-else>
                <font-awesome-icon
                  :icon="['far', 'image']"
                  class="text-8xl text-green-600"
                />
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
            v-if="editItem"
            variant="red"
            type="button"
            class="w-full tracking-wide flex-1"
            @click.native.prevent="deleteItem"
            :loading="deleteLoading"
          >
            Delete item
          </Button>
          <Button
            v-else
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
            @click.native.prevent="submit"
          >
            {{ editItem ? "Update" : "Create" }} item
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
    moveLeft() {
      const key = this.categories.findIndex(({ _id }) => _id === this.form._id);
      return key === 0;
    },
    moveRight() {
      const key = this.categories.findIndex(({ _id }) => _id === this.form._id);
      return key + 1 === this.categories.length;
    },
  },
  watch: {
    modal(val) {
      !val ? this.reset() : "";
    },
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
        const data = {
          ...this.form,
          image: this.selected.url,
          categoryID: this.activeCategory,
          subCategoryID: this.activeSubCategory,
        };
        if (this.editItem) {
          await this.$managerApi.updateItem(data);
        } else {
          await this.$managerApi.createItem(data);
        }
        $nuxt.$emit("refetchMenu");
        this.modal = false;
        $nuxt.$emit(
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
          $nuxt.$emit("refetchMenu");
          this.modal = false;
          $nuxt.$emit("success", "Item deleted successfully");
        }
      } catch (error) {
        console.error(error);
      } finally {
        this.deleteLoading = false;
      }
    },
    async alignCategory(val) {
      try {
        if (val === "left") {
          const key = this.categories.findIndex(
            ({ _id }) => _id === this.form._id
          );
          const itemOne = this.categories[key];
          const itemTwo = this.categories[key - 1];
          if (itemOne && itemTwo) {
            const serialData = [
              { _id: itemOne._id, serial: itemTwo.serial },
              { _id: itemTwo._id, serial: itemOne.serial },
            ];
            await this.$managerApi.UpdateCategorySerial({ serialData });
          }
        } else if (val === "right") {
          const key = this.categories.findIndex(
            ({ _id }) => _id === this.form._id
          );
          const itemOne = this.categories[key];
          const itemTwo = this.categories[key + 1];
          if (itemOne && itemTwo) {
            const serialData = [
              { _id: itemOne._id, serial: itemTwo.serial },
              { _id: itemTwo._id, serial: itemOne.serial },
            ];
            await this.$managerApi.UpdateCategorySerial({ serialData });
          }
        }
        this.modal = false;
        $nuxt.$emit("refetchMenu");
        $nuxt.$emit("success", "Category position updated");
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>
