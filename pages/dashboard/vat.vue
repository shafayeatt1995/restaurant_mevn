<template>
  <div>
    <section
      class="flex flex-col w-full px-4 md:justify-between md:items-center md:flex-row mb-5"
    >
      <div>
        <h2 class="text-3xl font-medium text-gray-600">Vat</h2>
      </div>
      <div class="flex flex-col mt-6 md:flex-row md:-mx-1 md:mt-0">
        <Button variant="green" @click.native.prevent="modal = true">
          <div class="flex items-center justify-center -mx-1">
            <font-awesome-icon :icon="['fas', 'plus']" class="mr-2" />

            <span class="mx-1 text-sm capitalize">Create new vat</span>
          </div>
        </Button>
      </div>
    </section>
    <section class="px-4">
      <TableResponsive
        :fields="fields"
        :items="loading ? 10 : items"
        :skeleton="loading"
      >
        <template #percent="{ value }"> {{ value }}% </template>
        <template #created_at="{ value }"> {{ value | agoDate }} </template>
        <template #actions="{ item, index }">
          <div class="flex gap-2">
            <Button variant="green" @click.native.prevent="editItem(item)"
              ><font-awesome-icon :icon="['far', 'pen-to-square']" />
              Edit</Button
            >
            <Button
              variant="red"
              @click.native.prevent="deleteItem(item._id, index)"
              ><font-awesome-icon :icon="['far', 'trash-can']" />Delete</Button
            >
          </div>
        </template>
        <template #empty v-if="items.length === 0 && !loading">
          <div class="flex items-center text-center h-96 bg-white">
            <EmptyMessage
              @action="modal = true"
              title="No vat found"
              buttonText="Add vat"
              :icon="['far', 'circle-xmark']"
              iconClass="rotate-45"
            />
          </div>
        </template>
      </TableResponsive>
    </section>

    <Modal v-model="modal">
      <h3
        class="text-lg font-medium leading-6 text-gray-600 capitalize"
        id="modal-title"
      >
        {{ editMode ? "Edit" : "Create new" }} vat
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
            {{ editMode ? "Update" : "Create" }} vat
          </Button>
        </div>
      </form>
    </Modal>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Vat",
  layout: "dashboard",
  middleware: "manager",
  head() {
    return { title: "Vat - " + this.pageTitle };
  },
  data() {
    return {
      click: true,
      modal: false,
      form: {
        name: "",
        percent: "",
      },
      editMode: false,
      items: [],
      loading: true,
      errors: {},
      perPage: 30,
    };
  },
  computed: {
    ...mapGetters(["pageTitle"]),
    fields() {
      return [
        { key: "name", label: "NAME", span: "minmax(100PX, 1fr)" },
        { key: "percent", label: "Percent", span: "minmax(100PX, 1fr)" },
        { key: "created_at", label: "Created At", span: "minmax(100PX, 1fr)" },
        {
          key: "actions",
          label: "Actions",
          span: "minmax(260PX, 1fr)",
        },
      ];
    },
    inputFields() {
      return [
        {
          type: "text",
          name: "name",
          label: { id: "name", title: "Vat name" },
        },
        {
          type: "text",
          name: "percent",
          label: { id: "percent", title: "Vat percent %" },
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
          const { vats } = await this.$managerApi.fetchVat(params);
          this.items = this.items.concat(vats);
        }
      } catch (error) {
        this.$nuxt.$emit("error", error.response.data.message);
      } finally {
        this.loading = false;
      }
    },
    async submit() {
      try {
        if (this.click) {
          this.click = false;
          this.errors = {};
          if (this.editMode) {
            await this.$managerApi.updateVat(this.form);
          } else {
            await this.$managerApi.createVat(this.form);
          }
          this.$nuxt.$emit(
            "success",
            `Vat ${this.editMode ? "updated" : "created"} successfully`
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
        password: "",
      };
      this.errors = {};
      this.editMode = false;
    },
    refetch() {
      this.items = [];
      this.fetchItem();
    },
    editItem({ _id, name, percent }) {
      this.form = { _id, name, percent };
      this.editMode = true;
      this.modal = true;
    },
    async deleteItem(_id, key) {
      if (confirm("Are you sure, you want to delete?")) {
        try {
          if (this.click) {
            this.click = false;
            await this.$managerApi.deleteVat({ _id });
            this.items.splice(key, 1);
            this.click = true;
          }
        } catch (error) {
          this.$nuxt.$emit("error", error.response.data.message);
        } finally {
          this.click = true;
        }
      }
    },
  },
};
</script>
