<template>
  <div>
    <div
      class="grid gap-3 mt-3 px-2"
      :class="align === 'single' ? 'grid-cols-1' : 'grid-cols-2'"
      v-if="['single', 'multiple'].includes(align)"
    >
      <div
        class="flex-column bg-white rounded-xl shadow-lg cursor-pointer relative select-none overflow-hidden"
        v-for="(item, key) in items"
        :key="key"
        @click="openItem(item)"
      >
        <div class="absolute top-2 left-2" v-if="editMode">
          <ToggleSwitch
            @click.native.prevent.stop="toggleStatus(key)"
            :value="item.status"
            size="small"
          />
        </div>
        <div
          class="absolute top-0 left-0 bg-green-500 text-white w-8 h-8 flex justify-center items-center rounded-tl-none rounded-bl-none rounded-br-xl rounded-tr-none"
          v-if="orderCount(item._id) > 0"
        >
          {{ orderCount(item._id) }}
        </div>
        <div class="absolute right-2 top-2 flex items-center" v-if="editMode">
          <div class="relative">
            <button
              class="rounded-full h-8 w-8 flex justify-center items-center focus:outline-none bg-gray-200"
              @click.stop="openDropdown(key)"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-5 h-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"
                />
              </svg>
            </button>

            <div
              class="absolute right-0 z-50 w-44 p-2 bg-white border rounded-lg top-16"
              v-if="dropdown === key"
              v-click-outside="onClickOutside"
            >
              <p
                class="px-4 py-2 text-gray-600 transition-colors duration-300 rounded-lg cursor-pointer hover:bg-gray-100"
                @click.stop="editItem(item)"
              >
                Edit
              </p>
              <p
                class="px-4 py-2 text-gray-600 transition-colors duration-300 rounded-lg cursor-pointer hover:bg-gray-100"
                @click.stop="changeCategory(item)"
              >
                Change category
              </p>
              <p
                class="px-4 py-2 text-gray-600 transition-colors duration-300 rounded-lg cursor-pointer hover:bg-gray-100"
                @click.stop="copyItem(item)"
              >
                Copy
              </p>
              <p
                class="px-4 py-2 text-rose-600 transition-colors duration-300 rounded-lg cursor-pointer hover:bg-gray-100"
                @click.stop="deleteItem(item)"
              >
                Delete
              </p>
            </div>
          </div>
        </div>
        <img
          loading="lazy"
          :src="item.image"
          class="w-full object-cover"
          :class="align === 'single' ? 'h-[200px]' : 'h-[130px]'"
        />
        <div class="p-2 text-sm items-center">
          <p
            class="capitalize font-medium overflow-hidden whitespace-nowrap text-ellipsis"
          >
            {{ item.name }}
          </p>
          <div class="flex justify-between">
            <small>
              <font-awesome-icon :icon="['far', 'clock']" />
              {{ item.estimateTime }}
              minutes
            </small>
            <div>
              <small v-if="item.discount">
                <del class="text-rose-500">৳{{ item.price }}</del>
                ৳{{ item.price - item.discountAmount }}
              </small>
              <small v-else> ৳{{ item.price }} </small>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Modal v-model="editCategoryMode">
      <form class="mt-3" @submit.prevent="submit">
        <div class="flex justify-between items-center mb-3">
          <div class="flex gap-4 text-gray-600">
            <p class="text-gray-600 text-xl">Update category</p>
          </div>
          <p
            class="shadow-lg h-12 w-12 rounded-full flex justify-center items-center cursor-pointer"
            @click="editCategoryMode = false"
          >
            <font-awesome-icon :icon="['fas', 'xmark']" />
          </p>
        </div>
        <Input
          v-for="(field, i) in inputFields"
          :key="i"
          :field="field"
          v-model="editCategory"
          :errors="categoryErrors"
        />
        <div
          class="mt-4 flex flex-col-reverse lg:flex-row items-center sm:-mx-2 gap-3"
        >
          <Button
            variant="white"
            type="button"
            class="w-full tracking-wide flex-1"
            @click.native.prevent="editCategoryMode = false"
          >
            Cancel
          </Button>
          <Button
            variant="green"
            type="submit"
            class="w-full tracking-wide flex-1"
            :loading="loading"
          >
            Update category
          </Button>
        </div>
      </form>
    </Modal>

    <MenuModal v-model="modal" v-if="modal">
      <div
        class="text-2xl absolute mt-3 ml-3 text-gray-700 h-12 w-12 rounded-full bg-gray-300 flex justify-center items-center cursor-pointer"
        @click="modal = false"
      >
        <font-awesome-icon :icon="['fas', 'chevron-left']" />
      </div>
      <img
        loading="lazy"
        :src="modalItem.image"
        class="h-[250px] w-full object-cover"
      />
      <div class="flex justify-between items-center px-4 py-2 shadow-lg gap-3">
        <div class="flex items-center">
          <img
            loading="lazy"
            :src="categoryImage"
            class="object-cover w-12 h-12"
          />
          <img
            loading="lazy"
            :src="categoryImage"
            class="object-cover w-12 h-12 absolute active-animation"
            v-for="(_, i) in showAnimation"
            :key="`animation-${i}`"
          />
          <p class="ml-2 capitalize">{{ modalItem.name }}</p>
        </div>
        <div>
          <p v-if="modalItem.discount">
            <del class="text-rose-500">৳{{ itemPrice }}</del>
            ৳{{ itemPrice - modalItem.discountAmount }}
          </p>
          <p v-else>৳{{ itemPrice }}</p>
        </div>
      </div>
      <div class="flex justify-end items-center">
        <transition-group
          name="slide"
          mode="out-in"
          tag="div"
          class="flex justify-end items-center"
        >
          <button
            class="bg-green-600 text-white h-12 w-12 rounded-full text-3xl flex justify-center items-center mt-[-16px] mr-[-48px] cursor-pointer relative z-10 shadow-[0_1px_3px_rgba(0,0,0,0.25)]"
            @click="removeToCart"
            v-if="getItemQty > 0"
            key="1"
          >
            <font-awesome-icon :icon="['fas', 'minus']" />
          </button>
          <div
            class="bg-green-600 text-white h-12 w-32 text-xl flex justify-center items-center mt-[-16px] mr-[-35px] cursor-pointer rounded-full"
            v-if="getItemQty > 0"
            key="2"
          >
            <p class="ml-4">{{ getItemQty }}</p>
          </div>
        </transition-group>
        <button
          class="bg-green-600 text-white h-14 w-14 flex justify-center items-center mt-[-16px] mr-5 cursor-pointer shadow-[0_4px_4px_rgba(0,0,0,0.25)] relative z-10 transition-all duration-300 rounded-full"
          @click="addCart"
          key="3"
        >
          <font-awesome-icon
            v-if="getItemQty > 0"
            :icon="['fas', 'plus']"
            class="text-3xl"
          />
          <font-awesome-icon
            v-else
            :icon="['fas', 'cart-plus']"
            class="text-2xl"
          />
        </button>
      </div>
      <div class="px-4 my-5 text-gray-500">
        {{ modalItem.description }}
        <p class="mt-5">
          <font-awesome-icon :icon="['far', 'clock']" /> Estimate time
          {{ modalItem.estimateTime }} minutes
        </p>
      </div>
      <hr />
      <div
        class="text-gray-500 px-5 my-5"
        v-for="(choice, key) in modalItem.choices"
        :key="`choice-${key}`"
      >
        <p class="mb-4">{{ choice.title }}</p>
        <div
          class="mt-1"
          v-for="(option, index) in choice.options"
          :key="`choice-option-${index}`"
        >
          <div
            class="inline-flex items-center gap-2 cursor-pointer"
            @click="setChoice(option)"
          >
            <div
              class="h-5 w-5 rounded-full border-white border-4 shadow-[0_0_0_2px_rgba(156,163,175,1)]"
              :class="activeChoice._id === option._id ? 'bg-green-600' : ''"
            ></div>
            <p>{{ option.name }}</p>
          </div>
        </div>
      </div>
      <hr />
      <div
        class="text-gray-500 px-5 my-5"
        v-for="(addon, key) in modalItem.addons"
        :key="`addon-${key}`"
      >
        <p class="mb-4">{{ addon.title }}</p>
        <div
          class="mt-1"
          v-for="(option, index) in addon.options"
          :key="`addon-option-${index}`"
        >
          <div
            class="flex justify-between gap-2 cursor-pointer items-center mb-3"
            @click="setAddon(option)"
          >
            <div class="flex items-center gap-2">
              <div
                class="h-5 w-5 border-white border-4 shadow-[0_0_0_2px_rgba(156,163,175,1)]"
                :class="checkActiveAddon(option._id) ? 'bg-green-600' : ''"
              ></div>
              <p>{{ option.name }}</p>
            </div>

            <p>+ ৳{{ option.price }}</p>
          </div>
        </div>
      </div>
      <hr />
    </MenuModal>
  </div>
</template>

<script>
import vClickOutside from "v-click-outside";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "MenuItemDish",
  props: {
    editMode: Boolean,
    items: Array,
    align: String,
    activeCategory: String,
    activeSubCategory: String,
    categories: Array,
    subCategories: Array,
  },
  directives: { clickOutside: vClickOutside.directive },
  data() {
    return {
      modal: false,
      dropdown: null,
      modalItem: {},
      activeChoice: {},
      activeAddon: [],
      editCategory: {},
      editCategoryMode: false,
      categoryErrors: {},
      loading: false,
      showAnimation: [],
    };
  },
  computed: {
    ...mapGetters("cart", ["cartItems"]),
    form: {
      get() {
        return this.$attrs.value;
      },
      set(value) {
        this.$emit("input", value);
      },
    },
    categoryImage() {
      const find = this.categories.find(
        ({ _id }) => _id === this.modalItem.categoryID
      );
      return find?.image ?? "";
    },
    itemPrice() {
      return this.modalItem.price + (this.activeChoice.price || 0);
    },
    inputFields() {
      return [
        {
          type: "select",
          placeholder: "Select category",
          name: "categoryID",
          label: { id: "categoryID", title: "Select category" },
          options: this.categories.map(({ _id, name }) => ({
            value: _id,
            label: name,
          })),
        },
        {
          type: "select",
          placeholder: "Select sub category",
          name: "subCategoryID",
          label: { id: "subCategoryID", title: "Select sub category" },
          options: this.subCategories
            .filter(
              ({ categoryID }) => categoryID === this.editCategory.categoryID
            )
            .map(({ _id, name }) => ({ value: _id, label: name })),
        },
      ];
    },
    getItemQty() {
      const item = this.cartItems.find(
        ({ _id, choice, addon }) =>
          _id === this.modalItem._id &&
          choice._id === this.activeChoice._id &&
          this.compareArrays(this.activeAddon, addon)
      );
      return item?.qty || 0;
    },
  },
  watch: {
    modal(val) {
      !val ? this.resetSelect() : "";
    },
    modalItem(val) {
      if (val.choices) {
        this.activeChoice = val?.choices[0]?.options[0] || {};
      } else {
        this.activeChoice = {};
      }
    },
    editCategoryMode(val) {
      !val ? this.resetCategory() : "";
    },
    "editCategory.categoryID"(_, val) {
      const exist = this.subCategories
        .filter(({ categoryID }) => categoryID === this.editCategory.categoryID)
        .some(({ _id }) => _id === this.editCategory.subCategoryID);
      if (!exist) {
        this.editCategory.subCategoryID = null;
      }
    },
  },
  methods: {
    ...mapActions("cart", ["addCartItems", "removeCartItems"]),
    openItem(item) {
      this.modalItem = item;
      this.modal = true;

      history.pushState(null, null, location.href);
      window.onpopstate = function (event) {
        history.go(1);
      };
    },
    setChoice(option) {
      this.activeChoice = option;
    },
    setAddon(option) {
      const index = this.activeAddon.findIndex(({ _id }) => _id === option._id);
      if (index === -1) {
        this.activeAddon.push(option);
      } else {
        this.activeAddon.splice(index, 1);
      }
    },
    checkActiveAddon(id) {
      return this.activeAddon.some(({ _id }) => _id === id);
    },
    async toggleStatus(key) {
      try {
        await this.$managerApi.toggleStatus(this.items[key]._id);
        $nuxt.$emit("success", "Status update successfully");
        $nuxt.$emit("refetchMenu");
      } catch (error) {
        console.error(error);
      }
    },
    openDropdown(key) {
      this.dropdown = this.dropdown === key ? null : key;
    },
    onClickOutside() {
      this.dropdown = null;
    },
    editItem(item) {
      this.$emit("editItem", item);
      this.dropdown = null;
    },
    changeCategory({ _id, categoryID, subCategoryID }) {
      this.dropdown = null;
      this.editCategory = { _id, categoryID, subCategoryID };
      this.editCategoryMode = true;
    },
    async submit() {
      try {
        this.loading = true;
        await this.$managerApi.updateItemCategory(this.editCategory);
        $nuxt.$emit("refetchMenu");
        this.loading = false;
        this.editCategoryMode = false;
      } catch (error) {
        console.error(error);
      }
    },
    resetCategory() {
      this.editCategory = {};
      this.categoryErrors = {};
    },
    async copyItem({ _id }) {
      try {
        this.dropdown = null;
        await this.$managerApi.copyItem({ _id });
        $nuxt.$emit("refetchMenu");
        $nuxt.$emit("success", "Item copied successfully");
      } catch (error) {
        console.error(error);
      }
    },
    async deleteItem({ _id }) {
      try {
        if (confirm("Are you sure, you want to delete?")) {
          this.dropdown = null;
          await this.$managerApi.deleteItem({ _id });
          $nuxt.$emit("refetchMenu");
          $nuxt.$emit("success", "Item deleted successfully");
        }
      } catch (error) {
        console.error(error);
      }
    },
    resetSelect() {
      this.activeChoice = {};
      this.activeAddon = [];
      this.modalItem = {};
      this.showAnimation = [];
    },
    addToCart() {
      const { _id, name, price, discount, discountAmount } = this.modalItem;
      const data = {
        _id,
        name,
        choice: { ...this.activeChoice },
        addon: [...this.activeAddon],
        price,
        discount: discount ? discountAmount : 0,
        qty: 1,
      };
      this.addCartItems(data);
    },
    removeToCart() {
      const { _id, name } = this.modalItem;
      const data = {
        _id,
        name,
        choice: { ...this.activeChoice },
        addon: [...this.activeAddon],
        qty: 1,
      };
      this.removeCartItems(data);
    },
    compareArrays(array1, array2) {
      return (
        array1.length === array2.length &&
        array1
          .map((obj) => obj._id)
          .sort()
          .join() ===
          array2
            .map((obj) => obj._id)
            .sort()
            .join()
      );
    },
    addCart() {
      this.addToCart();
      this.showAnimation.push(this.showAnimation.length);
      $nuxt.$emit("addToCartAnimation");
    },
    orderCount(id) {
      return this.cartItems
        .filter(({ _id }) => id === _id)
        .reduce((total, value) => total + value.qty, 0);
    },
  },
};
</script>

<style scoped>
.active-animation {
  animation: slideDown 1s ease-in-out;
}
@keyframes slideDown {
  0% {
    opacity: 1;
    transform: translateX(0) translateY(0);
  }
  100% {
    opacity: 0;
    transform: translateX(150px) translateY(600px);
  }
}
.slide-enter-active,
.slide-leave-active {
  transition: all 0.5s;
}

.slide-enter,
.slide-leave-to {
  opacity: 0;
  transform: translateX(20px);
}
</style>
