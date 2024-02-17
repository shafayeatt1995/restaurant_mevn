<template>
  <div>
    <div
      class="overflow-x-auto flex gap-6 px-3 pt-4 flex-nowrap items-stretch bg-white z-10 pb-3"
    >
      <div
        v-for="(item, key) in featureCategories"
        :key="key"
        class="flex flex-col items-center relative gap-2 cursor-pointer"
        @click="selectCategory(item)"
      >
        <div
          class="flex justify-center items-center w-16 h-16 transition-all duration-300 rounded-xl"
          :class="
            activeCategory === item._id ? 'bg-green-500' : 'bg-transparent'
          "
        >
          <img
            loading="lazy"
            :src="item.image"
            :alt="item.name"
            class="object-cover w-14 h-14"
          />
        </div>
        <p class="flex text-sm whitespace-nowrap text-gray-800">
          <span class="capitalize">{{ item.name }}</span>
          <span v-if="editMode" class="ml-2">
            |
            <font-awesome-icon
              :icon="['fas', 'pencil']"
              class="ml-2"
              @click.stop="edit(item)"
            />
          </span>
        </p>
      </div>
      <div
        v-if="editMode"
        class="flex flex-col items-center justify-between relative cursor-pointer"
        @click="openFeatureModal"
      >
        <div
          class="bg-green-500 text-white h-10 w-10 rounded-full text-3xl flex justify-center items-center mt-3"
        >
          <font-awesome-icon :icon="['fas', 'plus']" />
        </div>
        <p class="mx-2 flex text-sm whitespace-nowrap text-gray-800">
          Add Feature category
        </p>
      </div>
      <div
        v-for="(item, key) in categories"
        :key="'category-' + key"
        class="flex flex-col items-center relative gap-2 cursor-pointer"
        @click="selectCategory(item)"
      >
        <div
          class="flex justify-center items-center w-16 h-16 transition-all duration-300 rounded-xl"
          :class="
            activeCategory === item._id ? 'bg-green-500' : 'bg-transparent'
          "
        >
          <img
            loading="lazy"
            :src="item.image"
            :alt="item.name"
            class="object-cover w-14 h-14"
          />
        </div>
        <p class="flex text-sm whitespace-nowrap text-gray-800">
          <span class="capitalize">{{ item.name }}</span>
          <span v-if="editMode" class="ml-2">
            |
            <font-awesome-icon
              :icon="['fas', 'pencil']"
              class="ml-2"
              @click.stop="edit(item)"
            />
          </span>
        </p>
      </div>
      <div
        v-if="editMode"
        class="flex flex-col items-center justify-between relative"
        @click="openModal"
      >
        <div
          class="bg-green-500 text-white h-10 w-10 rounded-full text-3xl flex justify-center items-center mt-3"
        >
          <font-awesome-icon :icon="['fas', 'plus']" />
        </div>
        <p class="mx-2 flex text-sm whitespace-nowrap text-gray-800">
          Add Category
        </p>
      </div>
    </div>
    <Modal v-model="modal">
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
            <p v-else class="text-gray-600 text-xl">
              {{ editItem ? "Update" : "Create" }}
              {{ featureMode ? "feature" : "" }} category
            </p>
          </div>

          <CloseButton @click.native.prevent="modal = false" />
        </div>
        <Input
          v-for="(field, i) in inputFields"
          :key="i"
          :field="field"
          v-model="form"
          :errors="errors"
        />
        <div
          @click="imageModal = true"
          class="border rounded-lg flex flex-col items-center justify-center mt-3 h-60 cursor-pointer"
        >
          <img
            loading="lazy"
            :src="selected.url"
            :alt="selected.url"
            v-if="selected.url"
            class="object-contain w-full h-full p-3"
          />
          <template v-else>
            <font-awesome-icon
              :icon="['far', 'image']"
              class="text-8xl text-gray-900"
            />
            <p class="text-lg px-10 text-gray-700">
              Select a {{ featureMode ? "feature" : "" }} Category image
            </p>
          </template>
        </div>
        <small class="text-rose-700" v-if="errors?.image">
          <i>
            {{ errors.image.msg }}
          </i>
        </small>
        <template v-if="featureMode">
          <div class="border my-3 p-2 rounded-lg">
            <button
              class="text-gray-700 flex justify-between w-full items-center"
              @click="showItems = !showItems"
            >
              <span>{{ selectedItems.length }} Items Select</span>
              <font-awesome-icon
                :icon="['fas', 'chevron-down']"
                class="transition-all duration-200"
                :class="showItems ? 'rotate-180' : 'rotate-0'"
              />
            </button>
            <slide-up-down :active="showItems" :duration="300">
              <Input
                v-for="(field, i) in fields"
                :key="i"
                :field="field"
                v-model="search"
                :errors="errors"
              />
              <div class="grid gap-3 grid-cols-2 mt-2">
                <div
                  class="flex-column bg-white rounded-xl shadow-lg cursor-pointer relative select-none"
                  v-for="(item, key) in getItems"
                  :key="key"
                  @click="selectItem(item._id)"
                >
                  <div
                    class="absolute left-0 right-0 top-0 bottom-0 bg-black/70 z-10 flex justify-center items-center"
                    v-if="selectedItems.includes(item._id)"
                  >
                    <p
                      class="text-white bg-green-600 w-10 h-10 rounded-full flex justify-center items-center text-2xl"
                    >
                      {{ getSerialNumber(item._id) + 1 }}
                    </p>
                  </div>
                  <img
                    loading="lazy"
                    :src="item.image"
                    :alt="item.name"
                    class="w-full object-cover"
                    :class="align === 'single' ? 'h-[200px]' : 'h-[130px]'"
                  />
                  <div class="p-2 text-sm items-center">
                    <p
                      class="capitalize font-medium overflow-hidden whitespace-nowrap text-ellipsis"
                    >
                      {{ item.name }}
                    </p>
                    <div class="flex justify-between text-gray-600">
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
            </slide-up-down>
          </div>
          <small class="text-rose-700" v-if="errors?.items">
            <i>
              {{ errors.items.msg }}
            </i>
          </small>
        </template>
        <div
          class="mt-4 flex flex-col-reverse lg:flex-row items-center sm:-mx-2 gap-3"
        >
          <Button
            type="submit"
            class="w-full tracking-wide flex-1"
            :loading="loading"
            @click.native.prevent="submit"
          >
            {{ editItem ? "Update" : "Create" }}
            {{ featureMode ? "feature" : "" }} category
          </Button>
          <Button
            v-if="editItem"
            variant="red"
            type="button"
            class="w-full tracking-wide flex-1"
            @click.native.prevent="deleteItem"
            :loading="deleteLoading"
          >
            Delete Category
          </Button>
          <Button
            v-else
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
  name: "MenuCategory",
  props: {
    editMode: Boolean,
    categories: Array,
    featureCategories: Array,
    items: Array,
    activeCategory: String,
  },
  data() {
    return {
      modal: false,
      imageModal: false,
      editItem: false,
      featureMode: false,
      showItems: false,
      align: "anik",
      selectedItems: [],
      form: { name: "" },
      search: { search: "" },
      errors: {},
      selected: {},
      loading: false,
      deleteLoading: false,
    };
  },
  computed: {
    inputFields() {
      return [
        {
          type: "text",
          placeholder: "Category name",
          name: "name",
        },
      ];
    },
    moveLeft() {
      if (this.featureMode) {
        const key = this.featureCategories.findIndex(
          ({ _id }) => _id === this.form._id
        );
        return key === 0;
      } else {
        const key = this.categories.findIndex(
          ({ _id }) => _id === this.form._id
        );
        return key === 0;
      }
    },
    moveRight() {
      if (this.featureMode) {
        const key = this.featureCategories.findIndex(
          ({ _id }) => _id === this.form._id
        );
        return key + 1 === this.featureCategories.length;
      } else {
        const key = this.categories.findIndex(
          ({ _id }) => _id === this.form._id
        );
        return key + 1 === this.categories.length;
      }
    },
    fields() {
      return [
        {
          type: "text",
          placeholder: "Search",
          icon: ["fas", "magnifying-glass"],
          name: "search",
        },
      ];
    },
    getItems() {
      if (this.search.search) {
        return this.items.filter(({ name }) =>
          name.toLowerCase().includes(this.search.search.toLowerCase())
        );
      } else {
        return this.items;
      }
    },
  },
  watch: {
    modal(val) {
      !val ? this.reset() : "";
    },
    categories(val) {
      if (val.length > 0) {
        const check = val.some(({ _id }) => {
          return _id === this.activeCategory;
        });
        if (!check) {
          this.selectCategory(val[0]);
        }
      } else {
        this.selectCategory({ _id: null });
      }
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
        const data = { ...this.form, image: this.selected.url };
        if (this.editItem) {
          if (this.featureMode) {
            data.items = this.selectedItems;
            await this.$managerApi.updateFeatureCategory(data);
          } else {
            await this.$managerApi.updateCategory(data);
          }
        } else {
          if (this.featureMode) {
            data.items = this.selectedItems;
            await this.$managerApi.createFeatureCategory(data);
          } else {
            await this.$managerApi.createCategory(data);
          }
        }
        this.$nuxt.$emit("refetchMenu");
        this.modal = false;
        this.$nuxt.$emit(
          "success",
          `Feature category ${
            this.editItem ? "updated" : "created"
          } successfully`
        );
      } catch (error) {
        this.errors = error?.response?.data?.errors;
      } finally {
        this.loading = false;
        this.false = true;
      }
    },
    edit(data) {
      if (data.items) {
        this.selectedItems = data.items.filter((id) =>
          this.items.some(({ _id }) => _id === id)
        );
        this.featureMode = true;
      }
      this.editItem = true;
      const { image, name, _id } = data;
      this.form = { name, _id };
      this.selected = { url: image };
      this.modal = true;
    },
    reset() {
      this.form = { name: "" };
      this.selected = {};
      this.errors = {};
      this.selectedItems = [];
      this.editItem = false;
      this.featureMode = false;
      this.showItems = false;
    },
    async deleteItem() {
      try {
        if (
          confirm(
            "Are you sure, you want to delete? If you delete this category then it will be deleted related all sub categories and Items"
          )
        ) {
          this.deleteLoading = true;
          await this.$managerApi.deleteCategory({
            _id: this.form._id,
            featureMode: this.featureMode,
          });
          this.$nuxt.$emit("refetchMenu");
          this.modal = false;
          this.$nuxt.$emit("success", "Category Deleted successfully");
        }
      } catch (error) {
      } finally {
        this.deleteLoading = false;
      }
    },
    async alignCategory(val) {
      try {
        if (val === "left") {
          if (this.featureMode) {
            const key = this.featureCategories.findIndex(
              ({ _id }) => _id === this.form._id
            );
            const itemOne = this.featureCategories[key];
            const itemTwo = this.featureCategories[key - 1];
            if (itemOne && itemTwo) {
              const serialData = [
                { _id: itemOne._id, serial: itemTwo.serial },
                { _id: itemTwo._id, serial: itemOne.serial },
                { featureMode: this.featureMode },
              ];
              await this.$managerApi.UpdateCategorySerial({ serialData });
            }
          } else {
            const key = this.categories.findIndex(
              ({ _id }) => _id === this.form._id
            );
            const itemOne = this.categories[key];
            const itemTwo = this.categories[key - 1];
            if (itemOne && itemTwo) {
              const serialData = [
                { _id: itemOne._id, serial: itemTwo.serial },
                { _id: itemTwo._id, serial: itemOne.serial },
                { featureMode: this.featureMode },
              ];
              await this.$managerApi.UpdateCategorySerial({ serialData });
            }
          }
        } else if (val === "right") {
          if (this.featureMode) {
            const key = this.featureCategories.findIndex(
              ({ _id }) => _id === this.form._id
            );
            const itemOne = this.featureCategories[key];
            const itemTwo = this.featureCategories[key + 1];
            if (itemOne && itemTwo) {
              const serialData = [
                { _id: itemOne._id, serial: itemTwo.serial },
                { _id: itemTwo._id, serial: itemOne.serial },
                { featureMode: this.featureMode },
              ];
              await this.$managerApi.UpdateCategorySerial({ serialData });
            }
          } else {
            const key = this.categories.findIndex(
              ({ _id }) => _id === this.form._id
            );
            const itemOne = this.categories[key];
            const itemTwo = this.categories[key + 1];
            if (itemOne && itemTwo) {
              const serialData = [
                { _id: itemOne._id, serial: itemTwo.serial },
                { _id: itemTwo._id, serial: itemOne.serial },
                { featureMode: this.featureMode },
              ];
              await this.$managerApi.UpdateCategorySerial({ serialData });
            }
          }
        }
        this.modal = false;
        this.$nuxt.$emit("refetchMenu");
        this.$nuxt.$emit("success", "Category position updated");
      } catch (error) {}
    },
    selectCategory({ _id }) {
      this.$emit("update:activeCategory", _id);
    },
    openFeatureModal() {
      this.featureMode = true;
      this.modal = true;
    },
    selectItem(id) {
      const i = this.selectedItems.findIndex((_id) => _id === id);
      if (i !== -1) {
        this.selectedItems.splice(i, 1);
      } else {
        this.selectedItems.push(id);
      }
    },
    getSerialNumber(id) {
      return this.selectedItems.findIndex((_id) => _id === id);
    },
  },
};
</script>
