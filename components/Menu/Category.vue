<template>
  <div>
    <div
      class="overflow-x-auto flex gap-6 px-3 pt-4 flex-nowrap items-stretch sticky top-0 bg-white z-10 pb-3"
    >
      <div
        v-for="(item, key) in categories"
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
            class="object-cover w-14 h-14 rounded-full"
          />
        </div>
        <p class="flex text-sm whitespace-nowrap">
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
        <p class="mx-2 flex text-sm whitespace-nowrap">Add</p>
      </div>
    </div>
    <Modal v-model="modal">
      <form class="mt-3" @submit.prevent="submit">
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
            <p v-else class="text-gray-600 text-xl">Create category</p>
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
          class="border flex flex-col items-center justify-center mt-3 h-60 cursor-pointer"
        >
          <img
            loading="lazy"
            :src="selected.url"
            v-if="selected.url"
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
            Delete Category
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
          >
            {{ editItem ? "Update" : "Create" }} category
          </Button>
        </div>
      </form>
    </Modal>
    <ImageModal v-model="imageModal" :selected.sync="selected" />
  </div>
</template>

<script>
export default {
  name: "MenuCategory",
  props: { editMode: Boolean, categories: Array, activeCategory: String },
  data() {
    return {
      modal: false,
      imageModal: false,
      editItem: false,
      form: {
        name: "",
      },
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
          await this.$managerApi.updateCategory(data);
        } else {
          await this.$managerApi.createCategory(data);
        }
        this.$nuxt.$emit("refetchMenu");
        this.modal = false;
        this.$nuxt.$emit(
          "success",
          `Category ${this.editItem ? "updated" : "created"} successfully`
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
      this.form = { name: "" };
      this.selected = {};
      this.errors = {};
      this.editItem = false;
    },
    async deleteItem() {
      try {
        if (
          confirm(
            "Are you sure, you want to delete? If you delete this category then it will be deleted related all sub categories and Items"
          )
        ) {
          this.deleteLoading = true;
          await this.$managerApi.deleteCategory({ _id: this.form._id });
          this.$nuxt.$emit("refetchMenu");
          this.modal = false;
          this.$nuxt.$emit("success", "Category Deleted successfully");
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
        this.$nuxt.$emit("refetchMenu");
        this.$nuxt.$emit("success", "Category position updated");
      } catch (error) {
        console.error(error);
      }
    },
    selectCategory({ _id }) {
      this.$emit("update:activeCategory", _id);
    },
  },
};
</script>
