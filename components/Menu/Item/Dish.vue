<template>
  <div>
    <div
      class="grid gap-3 mt-3 px-2"
      :class="
        editMode
          ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-1'
          : 'grid-cols-2 md:grid-cols-3 lg:grid-cols-2'
      "
    >
      <div
        class="flex-column bg-white rounded-2xl shadow-lg cursor-pointer relative select-none"
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
              >
                Copy
              </p>
              <p
                class="px-4 py-2 text-rose-600 transition-colors duration-300 rounded-lg cursor-pointer hover:bg-gray-100"
              >
                Delete
              </p>
            </div>
          </div>
        </div>
        <img
          :src="item.image"
          class="w-full object-cover"
          :class="editMode ? 'h-[200px]' : 'h-[130px]'"
        />
        <div class="flex justify-between p-2 text-sm items-center">
          <p class="capitalize">
            {{
              editMode
                ? item.name
                : item.name.length > 15
                ? `${item.name.substring(0, 15)}...`
                : item.name
            }}
          </p>
          <p>৳{{ item.price }}</p>
        </div>
      </div>
    </div>

    <MenuModal v-model="modal" v-if="modalItem">
      <div
        class="text-2xl absolute mt-3 ml-3 text-gray-700 h-12 w-12 rounded-full bg-gray-300 flex justify-center items-center cursor-pointer"
        @click="modal = false"
      >
        <font-awesome-icon :icon="['fas', 'chevron-left']" />
      </div>
      <img :src="modalItem.image" class="h-[250px] w-full object-cover" />
      <div class="flex justify-between items-center px-4 py-2 shadow-lg">
        <div class="flex items-center">
          <img :src="categoryImage" class="object-cover w-12 h-12" />
          <p class="ml-2 capitalize">{{ modalItem.name }}</p>
        </div>
        <p>৳{{ itemPrice }}</p>
      </div>
      <div class="flex justify-end">
        <div
          class="bg-green-600 text-white h-12 w-12 rounded-full text-3xl flex justify-center items-center mt-[-16px] mr-5 shadow-xl cursor-pointer"
        >
          <font-awesome-icon :icon="['fas', 'plus']" />
        </div>
      </div>
      <div class="px-4 my-5 text-gray-500">
        {{ modalItem.description }}
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

export default {
  name: "MenuItemDish",
  props: {
    editMode: Boolean,
    items: Array,
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
    };
  },
  computed: {
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
      const addonPrice = this.activeAddon.reduce(
        (total, { price }) => total + price,
        0
      );
      return this.modalItem.price + (this.activeChoice.price || 0) + addonPrice;
    },
  },
  watch: {
    modalItem(val) {
      if (val) {
        this.activeChoice = val.choices[0]?.options[0] || {};
      } else {
        this.activeChoice = {};
      }
    },
  },
  methods: {
    openItem(item) {
      this.modalItem = item;
      this.modal = true;
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
        console.log(error);
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
  },
};
</script>
