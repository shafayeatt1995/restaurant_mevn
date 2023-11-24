<template>
  <div>
    <section
      class="flex flex-col w-full px-4 md:justify-between md:items-center md:flex-row mb-5"
    >
      <div>
        <h2 class="text-3xl font-medium text-gray-600">
          <font-awesome-icon :icon="['fas', 'pizza-slice']" /> Item
        </h2>
      </div>

      <div class="flex flex-col mt-6 md:flex-row md:-mx-1 md:mt-0">
        <ButtonPrimary @click.native.prevent="modal = true">
          <div class="flex items-center justify-center -mx-1">
            <font-awesome-icon :icon="['fas', 'plus']" class="mr-2" />

            <span class="mx-1 text-sm capitalize">Create new item</span>
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
        <template #actions="{ item, index }">
          <div class="flex gap-2">
            <ButtonPrimary @click.native.prevent="editItem(item)"
              ><font-awesome-icon :icon="['far', 'pen-to-square']" />
              Edit
            </ButtonPrimary>
            <ButtonRed @click.native.prevent="deleteItem(item._id, index)">
              <font-awesome-icon :icon="['fas', 'trash']" />
              Delete
            </ButtonRed>
          </div>
        </template>
        <template #empty v-if="items.length === 0 && !loading">
          <div class="flex items-center text-center h-96 bg-white">
            <EmptyMessage
              @action="modal = true"
              title="No item found"
              buttonText="Add item"
              :icon="['far', 'circle-xmark']"
              iconClass="rotate-45"
            />
          </div>
        </template>
      </TableResponsive>
      <Observer @load="fetchItem" v-if="items.length > 0">
        <Spinner class="text-green-600 h-7 w-7" v-if="items % perPage === 0" />
      </Observer>
    </section>

    <Modal v-model="modal">
      <h3
        class="text-lg font-medium leading-6 text-gray-600 capitalize"
        id="modal-title"
      >
        {{ editMode ? "Edit" : "Create new" }} item
      </h3>
      <form class="mt-4" @submit.prevent="submit">
        <Input
          v-for="(field, i) in inputFields"
          :key="i"
          :field="field"
          v-model="form"
          :errors="errors"
        />
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
            {{ editMode ? "Update" : "Create" }} item
          </button>
        </div>
      </form>
    </Modal>
  </div>
</template>

<script>
export default {
  name: "Item",
  layout: "dashboard",
  middleware: "owner",
  head() {
    return { title: "Dashboard - " + process.env.APP_NAME };
  },
  data() {
    return {
      click: true,
      modal: false,
      variant: {
        name: "",
        stock: "",
      },
      form: {
        categoryID: "",
        name: "",
        image: "",
        ingredient: [],
        price: "",
        discount: false,
        discountAmount: "",
        description: "",
        estimateTime: "",
        estimateTime: "",
        variant: [],
      },
      editMode: false,
      items: [],
      perPage: 50,
      loading: true,
      errors: {},
    };
  },
  computed: {
    fields() {
      const fields = [
        // { key: "name", label: "Name", span: "minmax(100PX, 1fr)" },
        // { key: "email", label: "Email", span: "minmax(200PX, 1fr)" },
        // { key: "type", label: "Type", span: "minmax(100PX, 1fr)" },
        // { key: "suspended", label: "Suspended", span: "minmax(100PX, 1fr)" },
        // { key: "deleted", label: "Delete", span: "minmax(100PX, 1fr)" },
        { key: "actions", label: "Actions", span: "minmax(275PX, 1fr)" },
      ];
      return fields;
    },

    inputFields() {
      const fields = [
        {
          type: "text",
          placeholder: "Name",
          name: "name",
        },
        {
          hide: this.editMode,
          type: "select",
          placeholder: "Type",
          icon: ["fas", "lock"],
          name: "type",
          options: [
            { value: "admin", label: "Admin" },
            { value: "owner", label: "Owner" },
            { value: "chef", label: "Chef" },
            { value: "waiter", label: "Waiter" },
            { value: "user", label: "User" },
          ],
        },
        {
          hide: this.form.type !== "owner" || this.editMode,
          type: "text",
          placeholder: "Restaurant Name",
          icon: ["far", "user"],
          name: "restaurantName",
        },
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
          const { items } = await this.$adminApi.fetchItem(params);
          this.items = this.items.concat(items);
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
          if (this.editMode) {
            await this.$adminApi.updateItem(this.form);
          } else {
            await this.$adminApi.createItem(this.form);
          }
          $nuxt.$emit(
            "success",
            `Item ${this.editMode ? "updated" : "created"} successfully`
          );
          this.refetch();
          this.modal = false;
          this.click = true;
        }
      } catch (error) {
        const { message } = error.response.data;
        if (message) {
          this.$nuxt.$emit("error", message);
        } else {
          this.errors = error.response.data.errors;
        }
      } finally {
        this.click = true;
      }
    },
    reset() {
      this.form = {
        name: "",
        email: "",
        password: "",
        type: "owner",
        restaurantName: "",
      };
      this.editMode = false;
      this.errors = {};
    },
    refetch() {
      this.items = [];
      this.fetchItem();
    },
    editItem({ _id, name, email }) {
      this.form = { _id, name, email };
      this.editMode = true;
      this.modal = true;
    },
    async deleteItem(_id, key) {
      if (confirm("Are you sure, you want to delete?")) {
        try {
          if (this.click) {
            this.click = false;
            await this.$adminApi.deleteItem({ _id });
            this.items[key].deleted = true;
            this.click = true;
          }
          $nuxt.$emit("success", "Item deleted successfully");
        } catch (error) {
          $nuxt.$emit("error", error.response.data?.message || error.message);
        } finally {
          this.click = true;
        }
      }
    },
    async suspendItem(_id, key) {
      if (confirm("Are you sure, you want to delete?")) {
        try {
          if (this.click) {
            this.click = false;
            await this.$adminApi.suspendItem({ _id });
            this.items[key].suspended = true;
            this.click = true;
          }
          $nuxt.$emit("success", "Item suspended successfully");
        } catch (error) {
          $nuxt.$emit("error", error.response.data?.message || error.message);
        } finally {
          this.click = true;
        }
      }
    },
  },
};
</script>
