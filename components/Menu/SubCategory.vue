<template>
  <div>
    <div class="flex gap-2 px-3 py-4 flex-wrap bg-gray-200 z-10">
      <div
        v-if="editMode"
        class="flex items-center justify-between relative bg-white px-2 py-1 rounded-full cursor-pointer"
        @click="openModal"
      >
        <font-awesome-icon :icon="['fas', 'plus']" />
        <p class="mx-2 flex text-base whitespace-nowrap">Add</p>
      </div>
      <div
        v-for="(item, key) in subCategories"
        :key="key"
        class="flex items-center justify-between relative bg-white px-2 py-1 rounded-full cursor-pointer"
        @click="selectSubCategory(item)"
      >
        <p>{{ item }}</p>
        <p v-if="editMode" class="ml-2 flex">
          |
          <font-awesome-icon
            :icon="['fas', 'pencil']"
            class="ml-2 mt-1"
            @click.stop="edit(item)"
          />
        </p>
      </div>
    </div>

    <Modal v-model="modal">
      <form class="mt-3" @submit.prevent="submit">
        <div class="flex justify-between items-center mb-3">
          <div class="flex gap-4 text-gray-600">
            <p class="text-gray-600 text-xl">
              {{ editItem ? "Edit" : "Create" }} sub category
            </p>
          </div>
          <p
            class="shadow-lg h-12 w-12 rounded-full flex justify-center items-center cursor-pointer"
            @click="modal = false"
          >
            <font-awesome-icon :icon="['fas', 'xmark']" />
          </p>
        </div>
        <Input
          v-for="(field, i) in inputFields"
          :key="i"
          :field="field"
          v-model="form"
          :errors="errors"
        />
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
            {{ editItem ? "Update" : "Create" }} sub category
          </Button>
        </div>
      </form>
    </Modal>
  </div>
</template>

<script>
export default {
  name: "MenuCategory",
  props: { editMode: Boolean, activeCategory: String },
  data() {
    return {
      subCategories: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0],
      modal: false,
      editItem: false,
      form: {
        name: "",
      },
      errors: {},
      loading: false,
      deleteLoading: false,
    };
  },
  computed: {
    inputFields() {
      return [
        {
          type: "text",
          placeholder: "Sub category name",
          name: "name",
        },
      ];
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
        this.form.categoryID = this.activeCategory;
        this.modal = true;
      }
    },
    async submit() {
      try {
        this.loading = true;
        if (this.editItem) {
          await this.$managerApi.updateSubCategory(this.form);
        } else {
          await this.$managerApi.createSubCategory(this.form);
        }
        $nuxt.$emit("refetchMenu");
        this.modal = false;
        $nuxt.$emit(
          "success",
          `Sub category ${this.editItem ? "updated" : "created"} successfully`
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
      const { name, _id } = data;
      this.form = { name, _id };
      this.modal = true;
    },
    reset() {
      this.form = { name: "" };
      this.errors = {};
      this.editItem = false;
    },
    async deleteItem() {
      try {
        if (confirm("Are you sure, you want to delete?")) {
          this.deleteLoading = true;
          await this.$managerApi.deleteSubCategory({ _id: this.form._id });
          $nuxt.$emit("refetchMenu");
          this.modal = false;
          $nuxt.$emit("success", "Sub category Deleted successfully");
        }
      } catch (error) {
        console.error(error);
      } finally {
        this.deleteLoading = false;
      }
    },
    selectSubCategory({ _id }) {
      this.$emit("update:activeSubCategory", _id);
    },
  },
};
</script>
