<template>
  <div>
    <section
      class="flex flex-col w-full px-4 md:justify-between md:items-center md:flex-row mb-5"
    >
      <div>
        <h2 class="text-3xl font-medium text-gray-700">Employee</h2>
      </div>
      <div class="flex flex-col mt-6 md:flex-row md:-mx-1 md:mt-0">
        <Button @click.native.prevent="modal = true">
          <div class="flex items-center justify-center -mx-1">
            <i class="fas fa-plus mr-2" />

            <span class="mx-1 text-sm capitalize">Create new employee</span>
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
        <template #actions="{ item, index }">
          <div class="flex gap-2">
            <Button @click.native.prevent="editItem(item)"
              ><i class="far fa-pen-to-square" /> Edit</Button
            >
            <Button
              variant="red"
              @click.native.prevent="deleteItem(item._id, index)"
              ><i class="far fa-trash-can" />Delete</Button
            >
          </div>
        </template>
        <template #empty v-if="items.length === 0 && !loading">
          <div class="flex items-center text-center h-96 bg-white">
            <EmptyMessage
              @action="modal = true"
              title="No employee found"
              buttonText="Add employee"
              icon="far fa-circle-xmark"
              iconClass="rotate-45"
            />
          </div>
        </template>
      </TableResponsive>
    </section>

    <Modal v-model="modal">
      <div class="flex justify-between items-center">
        <h1
          class="text-lg font-medium leading-6 text-gray-700 capitalize"
          id="modal-title"
        >
          {{ editMode ? "Edit" : "Create new" }} employee
        </h1>
        <CloseButton @click.native.prevent="modal = false" />
      </div>
      <form class="mt-4" @submit.prevent="submit">
        <Input
          v-for="(field, i) in inputFields"
          :key="i"
          :field="field"
          v-model="form"
          :errors="errors"
        />
        <div class="mt-4 flex flex-col lg:flex-row items-center sm:-mx-2 gap-3">
          <Button type="submit" class="w-full tracking-wide flex-1">
            {{ editMode ? "Update" : "Create" }} employee
          </Button>
          <Button
            variant="red"
            type="button"
            class="w-full tracking-wide flex-1"
            @click.native.prevent="modal = false"
          >
            Cancel
          </Button>
        </div>
      </form>
    </Modal>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Employee",
  layout: "dashboard",
  middleware: "manager",
  head() {
    return { title: "Employee - " + this.pageTitle };
  },
  data() {
    return {
      click: true,
      modal: false,
      form: {
        email: "",
        name: "",
        password: "",
      },
      editMode: false,
      items: [],
      loading: true,
      errors: {},
    };
  },
  computed: {
    ...mapGetters(["pageTitle"]),
    fields() {
      return [
        { key: "name", label: "NAME", span: "minmax(100PX, 1fr)" },
        { key: "email", label: "ID", span: "minmax(250PX, 1fr)" },
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
          name: "email",
          label: { id: "email", title: "Employee ID" },
        },
        {
          type: "text",
          name: "name",
          label: { id: "name", title: "Employee name" },
        },
        {
          type: "password",
          name: "password",
          label: { id: "password", title: "Employee password" },
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
        const { employees } = await this.$managerApi.fetchEmployee();
        this.items = employees;
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
          const data = { ...this.form, email: this.form.email.toLowerCase() };
          if (this.editMode) {
            if (data.password === "") {
              delete data.password;
            }
            await this.$managerApi.updateEmployee(data);
          } else {
            await this.$managerApi.createEmployee(data);
          }
          this.$nuxt.$emit(
            "success",
            `Employee ${this.editMode ? "updated" : "created"} successfully`
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
        email: "",
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
            await this.$managerApi.deleteEmployee({ _id });
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
