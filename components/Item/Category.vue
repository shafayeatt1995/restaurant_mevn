<template>
  <div
    class="overflow-x-auto flex pt-4 flex-nowrap items-stretch sticky top-0 bg-white z-10"
  >
    <div
      v-for="(item, key) in categories"
      :key="key"
      class="flex flex-col items-center p-2 relative"
    >
      <img :src="item.image" class="object-cover w-12 h-12 mx-2 rounded-full" />
      <p class="mx-2 flex text-sm whitespace-nowrap">
        {{ item.name }}
        <span v-if="editMode" class="ml-2" @click="edit(item)">
          | <font-awesome-icon :icon="['fas', 'pencil']" class="ml-2" />
        </span>
      </p>
    </div>
    <div class="flex flex-col items-center p-2 relative">
      <div
        @click="modal = true"
        class="bg-green-500 text-white h-12 w-12 rounded-full text-3xl flex justify-center items-center"
      >
        <font-awesome-icon :icon="['fas', 'plus']" />
      </div>
      <p class="mx-2 flex text-sm whitespace-nowrap">Add Category</p>
    </div>

    <Modal v-model="modal">
      <form class="mt-3" @submit.prevent="submit">
        <div class="flex justify-between items-center mb-3">
          <div class="flex gap-4 text-gray-600">
            <p>
              <font-awesome-icon :icon="['fas', 'arrow-left']" />
              Move left
            </p>
            <p>
              Move right <font-awesome-icon :icon="['fas', 'arrow-right']" />
            </p>
          </div>
          <p
            class="shadow-lg h-12 w-12 rounded-full flex justify-center items-center"
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
            <p class="text-lg px-10 text-gray-700">Select an Category image</p>
          </template>
        </div>
        <p class="text-rose-700" v-if="errors?.image">
          {{ errors.image.msg }}
        </p>
        <div class="mt-4 flex flex-col lg:flex-row items-center sm:-mx-2 gap-3">
          <Button
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
  name: "ItemComponent",
  props: { editMode: Boolean },
  data() {
    return {
      modal: false,
      imageModal: false,
      categories: [],
      editItem: false,
      form: {
        name: "",
      },
      errors: {},
      selected: {},
      loading: false,
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
        const { categories } = await this.$ownerApi.fetchCategory();
        this.categories = categories;
      } catch (error) {
        this.$nuxt.$emit("apiError", error);
        console.log(error);
      } finally {
        this.loading = false;
      }
    },
    async submit() {
      try {
        this.loading = true;
        const data = { ...this.form, image: this.selected.url };
        if (this.editItem) {
          await this.$ownerApi.updateCategory(data);
        } else {
          await this.$ownerApi.createCategory(data);
        }
        this.fetchItem();
        this.modal = false;
        $nuxt.$emit(
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
  },
};
</script>
