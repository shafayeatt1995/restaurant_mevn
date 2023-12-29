<template>
  <div>
    <section class="flex flex-col w-full px-4 md:justify-between md:items-center md:flex-row mb-5">
      <div>
        <h2 class="text-3xl font-medium text-gray-600">Table</h2>
      </div>
      <div class="flex flex-col mt-6 md:flex-row md:-mx-1 md:mt-0">
        <Button variant="green" @click.native.prevent="modal = true">
          <div class="flex items-center justify-center -mx-1">
            <font-awesome-icon :icon="['fas', 'plus']" class="mr-2" />

            <span class="mx-1 text-sm capitalize">Create new table</span>
          </div>
        </Button>
      </div>
    </section>

    <section class="px-4">
      <TableResponsive :fields="fields" :items="loading ? 10 : items" :skeleton="loading">
        <template #image="{ item }">
          <img :src="item.image" class="max-h-16" />
        </template>
        <template #created_at="{ value }">{{ value | agoDate }}</template>
        <template #updated_at="{ value }">{{ value | agoDate }}</template>
        <template #actions="{ item, index }">
          <div class="flex gap-2">
            <Button variant="green" @click.native.prevent="editItem(item)"><font-awesome-icon
                :icon="['far', 'pen-to-square']" />
              Edit</Button>
            <Button variant="red" @click.native.prevent="deleteItem(item._id, index)"><font-awesome-icon
                :icon="['far', 'trash-can']" />Delete</Button>
          </div>
        </template>
        <template #empty v-if="items.length === 0 && !loading">
          <div class="flex items-center text-center h-96 bg-white">
            <EmptyMessage @action="modal = true" title="No table found" buttonText="Add table"
              :icon="['far', 'circle-xmark']" iconClass="rotate-45" />
          </div>
        </template>
      </TableResponsive>
      <Observer @load="fetchItem" v-if="items.length > 0">
        <Spinner class="text-green-600 h-7 w-7" v-if="items % perPage === 0" />
      </Observer>
    </section>

    <Modal v-model="modal">
      <h3 class="text-lg font-medium leading-6 text-gray-600 capitalize" id="modal-title">
        {{ editMode ? "Edit" : "Create new" }} table
      </h3>
      <form class="mt-4" @submit.prevent="submit">
        <Input v-for="(field, i) in inputFields" :key="i" :field="field" v-model="form" :errors="errors" />
        <div class="mt-4 flex flex-col lg:flex-row items-center sm:-mx-2 gap-3">
          <Button variant="white" type="button" class="w-full tracking-wide flex-1" @click.native.prevent="modal = false">
            Cancel
          </Button>

          <Button variant="green" type="submit" class="w-full tracking-wide flex-1">
            {{ editMode ? "Update" : "Create" }} table
          </Button>
        </div>
      </form>
    </Modal>
  </div>
</template>

<script>
export default {
  name: "Table",
  layout: "dashboard",
  middleware: "manager",
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