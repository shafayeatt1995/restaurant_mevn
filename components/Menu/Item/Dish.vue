<template>
  <div>
    <div
      class="grid gap-3 mt-3 px-2"
      :class="
        editMode
          ? 'grid-cols-1 md:grid-cols-1 lg:grid-cols-1'
          : 'grid-cols-2 md:grid-cols-3 lg:grid-cols-2'
      "
    >
      <div
        class="flex-column bg-white rounded-2xl overflow-hidden shadow-lg cursor-pointer"
        v-for="(item, key) in items"
        :key="key"
        @click="openItem(item)"
      >
        <img :src="item.image" class="h-[130px] w-full object-cover" />
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
            class="flex justify-between gap-2 cursor-pointer items-center"
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
export default {
  name: "MenuItemDish",
  props: { editMode: Boolean, items: Array, categories: Array },
  data() {
    return {
      modal: false,
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
  },
};
</script>
