<template>
  <div>
    <section
      class="flex flex-col w-full px-4 md:justify-between md:items-center md:flex-row mb-5"
    >
      <div>
        <h2 class="text-3xl font-medium text-gray-800">Category</h2>
      </div>

      <div class="flex flex-col mt-6 md:flex-row md:-mx-1 md:mt-0">
        <ButtonPrimary @click.native.prevent="modal = true">
          <div class="flex items-center justify-center -mx-1">
            <icon :icon="['fas', 'plus']" class="mr-2" />

            <span class="mx-1 text-sm capitalize">Create new Category</span>
          </div>
        </ButtonPrimary>
      </div>
    </section>

    <section class="px-4">
      <TableResponsive
        :fields="fields"
        :items="loading ? 10 : items"
        :skeleton="loading"
      >
        <template #image="{ item }">
          <img :src="item.photo?.path" class="max-h-16" />
        </template>
        <template #created_at="{ value }">{{ value | agoDate }}</template>
        <template #updated_at="{ value }">{{ value | agoDate }}</template>
        <template #actions="{ item, index }">
          <div class="flex gap-2">
            <ButtonPrimary @click.native.prevent="editItem(item)"
              ><icon :icon="['far', 'pen-to-square']" /> Edit</ButtonPrimary
            >
            <ButtonRed @click.native.prevent="deleteItem(item.id, index)"
              ><icon :icon="['far', 'trash-can']" />Delete</ButtonRed
            >
          </div>
        </template>
        <template #empty v-if="items.length === 0 && !loading">
          <div class="flex items-center text-center h-96 bg-white">
            <div class="flex flex-col w-full items-center">
              <div class="p-3 mx-auto text-green-600 bg-green-100 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                  />
                </svg>
              </div>
              <h1 class="mt-3 text-lg text-gray-800">No Category found</h1>
              <div class="flex items-center mt-4 sm:mx-auto gap-x-3">
                <ButtonPrimary @click.native.prevent="modal = true">
                  <icon
                    :icon="['far', 'circle-xmark']"
                    class="text-xl rotate-45 mr-2"
                  />
                  <span>Add Category</span>
                </ButtonPrimary>
              </div>
            </div>
          </div>
        </template>
      </TableResponsive>
      <Observer @load="fetchItem" v-if="items.length > 0">
        <Spinner class="text-green-600 h-7 w-7" v-if="items % perPage === 0" />
      </Observer>
    </section>

    <Modal v-model="modal">
      <h3
        class="text-lg font-medium leading-6 text-gray-800 capitalize"
        id="modal-title"
      >
        {{ editMode ? "Edit" : "Create new" }} Category
      </h3>
      <form class="mt-4" @submit.prevent="submit">
        <input
          type="text"
          placeholder="Category Name"
          class="block w-full px-4 py-3 text-sm text-gray-700 bg-white border border-gray-200 rounded-md focus:border-green-400 focus:outline-none focus:ring focus:ring-green-300 focus:ring-opacity-40"
          v-model="form.name"
        />
        <div
          @click="imageModal = true"
          class="border flex flex-col items-center justify-center mt-3 h-60 cursor-pointer"
        >
          <img
            :src="selected.path"
            v-if="selected.path"
            class="object-contain w-full h-full p-3"
          />
          <template v-else>
            <icon :icon="['far', 'image']" class="text-8xl text-green-600" />
            <p class="text-lg px-10 text-gray-700">Select an Category image</p>
          </template>
        </div>

        <div class="mt-4 sm:flex sm:items-center sm:-mx-2">
          <button
            type="button"
            class="w-full px-4 py-2 text-sm font-medium tracking-wide text-gray-700 capitalize transition-colors duration-300 transform border border-gray-200 rounded-md sm:w-1/2 sm:mx-2 hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40"
            @click="modal = false"
          >
            Cancel
          </button>

          <button
            type="submit"
            class="w-full px-4 py-2 mt-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-green-500 rounded-md sm:mt-0 sm:w-1/2 sm:mx-2 hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-300 focus:ring-opacity-40"
          >
            {{ editMode ? "Update" : "Create" }} Category
          </button>
        </div>
      </form>
    </Modal>
    <ImageModal v-model="imageModal" :selected.sync="selected" />
  </div>
</template>

<script>
export default {
  name: "Category",
  layout: "dashboard",
  head() {
    return { title: "Dashboard - " + process.env.APP_NAME };
  },
  data() {
    return {
      click: true,
      modal: false,
      imageModal: false,
      form: {
        name: "",
        image: "",
      },
      selected: {},
      editMode: false,
      items: [],
      perPage: 50,
      loading: true,
    };
  },
  computed: {
    fields() {
      const fields = [
        { key: "name", label: "NAME", span: "minmax(100PX, 1fr)" },
        { key: "image", label: "Image", span: "minmax(150PX, 1fr)" },
        { key: "created_at", label: "CREATED", span: "minmax(120PX, 1fr)" },
        { key: "updated_at", label: "UPDATED", span: "minmax(120PX, 1fr)" },
        { key: "actions", label: "Actions", span: "minmax(260PX, 1fr)" },
      ];
      return fields;
    },
  },
  watch: {
    modal(val) {
      !val ? this.reset() : "";
    },
  },
  mounted() {
    this.fetchItem();
  },
  methods: {
    async fetchItem() {
      try {
        const params = {
          perPage: this.perPage,
          page: this.items.length / this.perPage + 1,
        };
        if (Number.isInteger(params.page)) {
          const { data } = await this.$axios.get("admin/category", { params });
          this.items = this.items.concat(data.data);
        }
      } catch (error) {
        this.$nuxt.$emit("apiError", error);
      } finally {
        this.loading = false;
      }
    },
    async submit() {
      try {
        if (this.click) {
          this.click = false;
          this.form.image = this.selected.id;
          if (this.editMode) {
            await this.$axios.patch("admin/category", this.form);
          } else {
            await this.$axios.post("admin/category", this.form);
          }
          $nuxt.$emit(
            "success",
            `Category ${this.editMode ? "updated" : "created"} successfully`
          );
          this.refetch();
          this.modal = false;
          this.click = true;
        }
      } catch (error) {
        $nuxt.$emit("apiError", error);
      } finally {
        this.click = true;
      }
    },
    reset() {
      this.form = {
        name: "",
        image: "",
      };
      this.selected = {};
      this.editMode = false;
    },
    refetch() {
      this.items = [];
      this.fetchItem();
    },
    editItem({ id, photo_id, name, photo }) {
      this.form = { id, name };
      this.selected = { id: photo_id, path: photo.path };
      this.editMode = true;
      this.modal = true;
    },
    async deleteItem(id, key) {
      if (confirm("Are you sure, you want to delete?")) {
        try {
          if (this.click) {
            this.click = false;
            await this.$axios.delete("admin/category", { params: { id } });
            this.items.splice(key, 1);
            this.click = true;
          }
        } catch (error) {
          $nuxt.$emit("apiError", error);
        } finally {
          this.click = true;
        }
      }
    },
  },
};
</script>
