<template>
  <div>
    <section
      class="flex flex-col w-full px-4 md:justify-between md:items-center md:flex-row mb-5"
    >
      <div>
        <h2 class="text-3xl font-medium text-gray-600">Table</h2>
      </div>
    </section>

    <section class="px-4">
      <div class="flex flex-wrap gap-3">
        <div
          class="bg-gray-100 text-gray-600 rounded-xl px-10 py-5 flex justify-center items-center flex-col gap-3 hover:bg-green-600 transition-all duration-300 cursor-pointer hover:text-white border-2 border-gray-300 border-dashed hover:border-green-600"
          v-for="(item, key) in items"
          :key="`table-${key}`"
        >
          <TableIcon class="whitespace-nowrap w-8" />
          {{ item.name }}
        </div>
        <div
          class="bg-gray-100 text-gray-600 rounded-xl px-10 py-5 flex justify-center items-center flex-col gap-3 border-2 border-gray-300 hover:text-white hover:bg-green-600 transition-all duration-300 cursor-pointer border-dashed hover:border-solid hover:border-green-600"
          @click="modal = true"
        >
          <font-awesome-icon :icon="['fas', 'plus']" class="text-2xl" />
          Add table
        </div>
      </div>
      <Observer @load="fetchItem" v-if="items.length > 0">
        <Spinner class="text-green-600 h-7 w-7" v-if="items % perPage === 0" />
      </Observer>
    </section>

    <Modal v-model="modal">
      <h3
        class="text-lg font-medium leading-6 text-gray-600 capitalize"
        id="modal-title"
      >
        {{ editMode ? "Edit" : "Create new" }} table
      </h3>
      <form class="mt-4" @submit.prevent="submit">
        <Input
          v-for="(field, i) in inputFields"
          :key="i"
          :field="field"
          v-model="form"
          :errors="errors"
        />
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
          >
            {{ editMode ? "Update" : "Create" }} table
          </Button>
        </div>
      </form>
    </Modal>
  </div>
</template>

<script>
import TableIcon from "~/static/svg/table.svg";
export default {
  name: "Table",
  layout: "dashboard",
  middleware: "manager",
  components: { TableIcon },
  head() {
    return { title: "Table - " + process.env.APP_NAME };
  },
  data() {
    return {
      click: true,
      modal: false,
      form: {
        name: "",
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
      return [
        { key: "name", label: "NAME", span: "minmax(100PX, 1fr)" },
        { key: "created_at", label: "CREATED", span: "minmax(120PX, 1fr)" },
        { key: "updated_at", label: "UPDATED", span: "minmax(120PX, 1fr)" },
        { key: "actions", label: "Actions", span: "minmax(260PX, 1fr)" },
      ];
    },
    inputFields() {
      return [
        {
          type: "text",
          placeholder: "Name",
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
        const params = {
          perPage: this.perPage,
          page: this.items.length / this.perPage + 1,
        };
        if (Number.isInteger(params.page)) {
          const { tables } = await this.$managerApi.fetchTable(params);
          this.items = this.items.concat(tables);
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
            await this.$managerApi.updateTable(this.form);
          } else {
            await this.$managerApi.createTable(this.form);
          }
          $nuxt.$emit(
            "success",
            `Table ${this.editMode ? "updated" : "created"} successfully`
          );
          this.refetch();
          this.modal = false;
          this.click = true;
        }
      } catch (error) {
        this.errors = error?.response?.data?.errors;
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
      this.errors = {};
      this.editMode = false;
    },
    refetch() {
      this.items = [];
      this.fetchItem();
    },
    editItem({ _id, name, image }) {
      this.form = { _id, name, image };
      this.selected = { url: image };
      this.editMode = true;
      this.modal = true;
    },
    async deleteItem(_id, key) {
      if (confirm("Are you sure, you want to delete?")) {
        try {
          if (this.click) {
            this.click = false;
            await this.$managerApi.deleteTable({ _id });
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
