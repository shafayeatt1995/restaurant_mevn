<template>
  <div>
    <div
      class="grid gap-3 mt-3"
      :class="[
        items.length > 5
          ? 'md:grid-cols-[repeat(auto-fit,_minmax(200px,_1fr))]'
          : 'md:grid-cols-[repeat(auto-fit,_minmax(200px,_250px))]',
        align === 'single'
          ? 'grid-cols-1'
          : align === 'multiple'
          ? 'grid-cols-2'
          : '',
      ]"
      v-if="['single', 'multiple'].includes(align)"
    >
      <template v-for="(item, key) in items">
        <div
          class="flex-column bg-white rounded-xl shadow-lg cursor-pointer relative select-none"
          :key="key"
          v-if="editor || item.status"
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
            class="absolute top-0 left-0 bg-green-500 text-white w-8 h-8 flex justify-center items-center rounded-tl-xl rounded-bl-none rounded-br-xl rounded-tr-none"
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
                class="absolute right-0 z-50 w-44 p-2 bg-white border rounded-lg top-10"
                v-if="dropdown === key"
                v-click-outside="onClickOutside"
              >
                <p
                  class="px-4 py-2 text-gray-700 transition-colors duration-300 rounded-lg cursor-pointer hover:bg-gray-100"
                  @click.stop="editItem(item)"
                >
                  Edit
                </p>
                <p
                  class="px-4 py-2 text-gray-700 transition-colors duration-300 rounded-lg cursor-pointer hover:bg-gray-100"
                  @click.stop="changeCategory(item)"
                >
                  Change category
                </p>
                <p
                  class="px-4 py-2 text-gray-700 transition-colors duration-300 rounded-lg cursor-pointer hover:bg-gray-100"
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
          <nuxt-img
            format="webp"
            loading="lazy"
            decode="async"
            v-if="item.image"
            :src="item.image"
            :alt="item.name"
            class="w-full object-cover"
            :class="align === 'single' ? 'h-[200px]' : 'h-[130px]'"
          />
          <nuxt-img
            format="webp"
            loading="lazy"
            decode="async"
            v-else
            src="/images/default-img.jpg"
            alt="default image"
            class="w-full object-cover"
            :class="align === 'single' ? 'h-[200px]' : 'h-[130px]'"
          />
          <div class="p-2 text-sm items-center">
            <p
              class="capitalize font-medium overflow-hidden whitespace-nowrap text-ellipsis"
            >
              {{ item.name }}
            </p>
            <div class="flex justify-between text-gray-700">
              <small>
                <i class="far fa-clock" />
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
      </template>
    </div>
    <div
      v-if="items?.length === 0"
      class="flex flex-col justify-center items-center w-full bg-white py-12 shadow-xl rounded-lg"
    >
      <i class="text-5xl text-green-500 fas fa-pizza-slice" />
      <p class="text-gray-700 mt-1">No items found in this category</p>
    </div>

    <Modal v-model="editCategoryMode">
      <form class="mt-3" @submit.prevent="submit">
        <div class="flex justify-between items-center mb-3">
          <div class="flex gap-4 text-gray-700">
            <p class="text-gray-700 text-xl">Update category</p>
          </div>
          <CloseButton @click.native.prevent="editCategoryMode = false" />
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
            type="submit"
            class="w-full tracking-wide flex-1"
            :loading="loading"
          >
            Update category
          </Button>
          <Button
            variant="red"
            type="button"
            class="w-full tracking-wide flex-1"
            @click.native.prevent="editCategoryMode = false"
          >
            Cancel
          </Button>
        </div>
      </form>
    </Modal>

    <transition name="slideFullLeft">
      <MenuModal v-model="modal" v-if="modal">
        <div
          class="text-2xl absolute mt-3 ml-3 text-gray-700 h-12 w-12 rounded-full bg-gray-300 flex justify-center items-center cursor-pointer"
          @click="modal = false"
        >
          <i class="fas fa-chevron-left" />
        </div>
        <nuxt-img
          format="webp"
          loading="lazy"
          decode="async"
          v-if="modalItem.image"
          :alt="modalItem.name"
          :src="modalItem.image"
          class="h-[250px] w-full object-cover"
        />
        <nuxt-img
          format="webp"
          loading="lazy"
          decode="async"
          v-else
          src="/images/default-img.jpg"
          alt="default img"
          class="h-[250px] w-full object-cover"
        />
        <div
          class="flex justify-between items-center px-4 py-2 shadow-lg gap-3 sticky top-0 z-10 bg-white"
        >
          <div class="flex items-center">
            <nuxt-img
              format="webp"
              loading="lazy"
              decode="async"
              :src="categoryImage"
              alt="category image"
              class="object-cover w-12 h-12"
            />
            <nuxt-img
              format="webp"
              loading="lazy"
              decode="async"
              :src="categoryImage"
              class="object-cover w-12 h-12 absolute active-animation"
              v-for="(_, i) in showAnimation"
              :key="`animation-${i}`"
              alt="category image"
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
        <div class="flex justify-end items-center sticky top-16 z-20">
          <transition-group
            name="slide"
            mode="out-in"
            tag="div"
            class="flex justify-end items-center"
          >
            <button
              class="bg-green-600 text-white h-14 w-14 rounded-full text-3xl flex justify-center items-center mt-[-16px] mr-[-48px] cursor-pointer relative z-10 shadow-[0_1px_3px_rgba(0,0,0,0.25)]"
              @click="removeToCart"
              v-if="getItemQty > 0"
              key="1"
            >
              <i class="fas fa-minus" />
            </button>
            <div
              class="bg-green-600 text-white h-14 w-32 text-xl flex justify-center items-center mt-[-16px] mr-[-34px] cursor-pointer rounded-tl-full rounded-bl-full"
              v-if="getItemQty > 0"
              key="2"
            >
              <p class="ml-4">{{ getItemQty }}</p>
            </div>
          </transition-group>
          <button
            class="bg-green-600 text-white h-16 w-16 flex justify-center items-center mt-[-16px] mr-5 cursor-pointer shadow-[0_4px_4px_rgba(0,0,0,0.25)] relative z-10 transition-all duration-300 rounded-full"
            @click="addCart"
            key="3"
          >
            <i class="fas fa-plus text-3xl" />
          </button>
        </div>
        <div class="px-4 my-5 text-gray-500">
          {{ modalItem.description }}
          <p class="mt-5" v-if="modalItem.estimateTime">
            <i class="far fa-clock" /> Estimate time
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
            class="mt-2"
            v-for="(option, index) in choice.options"
            :key="`choice-option-${index}`"
          >
            <div
              class="flex items-center justify-between gap-2 cursor-pointer"
              @click="setChoice(option, key)"
            >
              <div class="flex items-center gap-2">
                <div
                  class="h-5 w-5 rounded-full border-white border-4 shadow-[0_0_0_2px_rgba(156,163,175,1)] text-gray-800"
                  :class="getActiveChoice(option._id) ? 'bg-green-600' : ''"
                ></div>
                <p>{{ option.name }}</p>
              </div>

              <p v-if="option.price > 0">+ ৳{{ option.price }}</p>
            </div>
          </div>
          <hr class="my-5" v-if="modalItem.choices.length !== key + 1" />
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

              <p v-if="option.price > 0">+ ৳{{ option.price }}</p>
            </div>
          </div>
        </div>
        <hr />
      </MenuModal>
    </transition>
  </div>
</template>

<script>
import vClickOutside from "v-click-outside";
import { mapGetters, mapActions } from "vuex";
import AddFoodIcon from "~/static/svg/add-food.svg";

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
  components: { AddFoodIcon },
  directives: { clickOutside: vClickOutside.directive },
  data() {
    return {
      modal: false,
      dropdown: null,
      modalItem: {},
      activeChoice: [],
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
    ...mapGetters(["isMobile"]),
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
      return (
        this.modalItem.price +
        this.activeChoice.reduce(
          (total, value) => total + (value.price || 0),
          0
        ) +
        this.activeAddon.reduce((total, value) => total + (value.price || 0), 0)
      );
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
          this.compareArrays(this.activeChoice, choice) &&
          this.compareArrays(this.activeAddon, addon)
      );
      return item?.qty || 0;
    },
    editor() {
      return this.$route.name === "dashboard-restaurant";
    },
  },
  watch: {
    modal(val) {
      !val ? this.resetSelect() : "";
    },
    modalItem(val) {
      if (val.choices) {
        this.activeChoice =
          val?.choices.map(({ options }) => {
            return options[0];
          }) || [];
      } else {
        this.activeChoice = [];
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
    setChoice(option, key) {
      this.activeChoice.splice(key, 1);
      this.activeChoice.splice(key, 0, option);
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
        this.$nuxt.$emit("success", "Status update successfully");
        this.$nuxt.$emit("refetchMenu");
      } catch (error) {}
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
        this.$nuxt.$emit("refetchMenu");
        this.loading = false;
        this.editCategoryMode = false;
      } catch (error) {}
    },
    resetCategory() {
      this.editCategory = {};
      this.categoryErrors = {};
    },
    async copyItem({ _id }) {
      try {
        this.dropdown = null;
        await this.$managerApi.copyItem({ _id });
        this.$nuxt.$emit("refetchMenu");
        this.$nuxt.$emit("success", "Item copied successfully");
      } catch (error) {}
    },
    async deleteItem({ _id }) {
      try {
        if (confirm("Are you sure, you want to delete?")) {
          this.dropdown = null;
          await this.$managerApi.deleteItem({ _id });
          this.$nuxt.$emit("refetchMenu");
          this.$nuxt.$emit("success", "Item deleted successfully");
        }
      } catch (error) {}
    },
    resetSelect() {
      this.activeChoice = [];
      this.activeAddon = [];
      this.modalItem = {};
      this.showAnimation = [];
    },
    addToCart() {
      const { _id, name, price, discount, discountAmount } = this.modalItem;
      const data = {
        _id,
        name,
        choice: [...this.activeChoice],
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
        choice: [...this.activeChoice],
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
      this.$nuxt.$emit("addToCartAnimation");
    },
    orderCount(id) {
      return this.cartItems
        .filter(({ _id }) => id === _id)
        .reduce((total, value) => total + value.qty, 0);
    },
    getActiveChoice(id) {
      return this.activeChoice.some(({ _id }) => _id === id) || false;
    },
  },
};
</script>

<style scoped>
.slideFullLeft-leave-active,
.slideFullLeft-enter-active {
  transition: 0.2s;
}
.slideFullLeft-enter,
.slideFullLeft-leave-to {
  opacity: 0;
  /* transform: translate(-100%, 0); */
  transform: translate(-100vw, 0);
}
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
