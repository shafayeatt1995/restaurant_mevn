<template>
  <div>
    <section
      class="flex flex-col w-full px-6 md:justify-between md:items-center md:flex-row mb-5"
    >
      <div>
        <h2 class="text-3xl font-medium text-gray-800">Category</h2>
      </div>

      <div class="flex flex-col mt-6 md:flex-row md:-mx-1 md:mt-0">
        <DashboardCreateButton @click.native.prevent="modal = true">
          <div class="flex items-center justify-center -mx-1">
            <font-awesome-icon :icon="['fas', 'plus']" class="mr-2" />

            <span class="mx-1 text-sm capitalize">Create new Category</span>
          </div>
        </DashboardCreateButton>
      </div>
    </section>

    <section class="px-6">
      <TableResponsive :fields="fields" />
    </section>

    <Modal v-model="modal">
      <h3
        class="text-lg font-medium leading-6 text-gray-800 capitalize"
        id="modal-title"
      >
        Create new Category
      </h3>

      <form class="mt-4" @submit.prevent="create">
        <input
          type="text"
          placeholder="Category Name"
          class="block w-full px-4 py-3 text-sm text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
        />
        <div
          @click="anik"
          class="border flex flex-col items-center justify-center mt-3 h-60 cursor-pointer"
        >
          <font-awesome-icon
            :icon="['far', 'image']"
            class="text-8xl text-green-500"
          />
          <p class="text-xl">Select an image</p>
        </div>

        <img :src="preview" class="max-w-80 max-h-80" />

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
            class="w-full px-4 py-2 mt-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-green-500 rounded-md sm:mt-0 sm:w-1/2 sm:mx-2 hover:bg-green-600 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
          >
            Create Category
          </button>
        </div>
      </form>
    </Modal>
    <!-- <client-only> -->
    <ImageModal v-model="imageModal" />
    <!-- </client-only> -->
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
      isOpen: false,
      modal: false,
      imageModal: false,
      preview: "",
      form: {
        name: "",
        image: "",
      },
    };
  },

  computed: {
    fields() {
      const fields = [
        {
          key: "name",
          label: "NAME",
          span: "minmax(165PX, 1fr)",
          hide_title_mobile: true,
          col_span_mobile: 2,
        },
        {
          key: "created_at",
          label: "CREATED",
          span: "minmax(100PX, .7fr)",
          hide_title_mobile: true,
          col_span_mobile: 2,
        },
        {
          key: "updated_at",
          label: "UPDATED",
          span: "minmax(100PX, .7fr)",
          hide_title_mobile: true,
          col_span_mobile: 2,
        },
        {
          key: "actions",
          label: "",
          span: "60px",
          hide_title_mobile: true,
        },
      ];
      // if (this.is_mobile) {
      //   return fields.sort((a, b) => a.order - b.order)
      // } else {
      //   return fields
      // }
      return fields;
    },
  },

  methods: {
    async create() {
      // await this.$adminApi.createCategory(this.form);
    },

    image(event) {
      if (event.target.files.length > 0) {
        let file = event.target.files[0];
        let reader = new FileReader();
        reader.onloadend = () => {
          this.preview = reader.result;
        };
        reader.readAsDataURL(file);
        this.form.image = file;
      }
    },
    anik() {
      this.imageModal = true;
    },
  },
};
</script>
