<template>
  <div>
    <section
      class="flex flex-col w-full px-4 md:justify-between md:items-center md:flex-row mb-5"
    >
      <div>
        <h2 class="text-3xl font-medium text-gray-600">Settings</h2>
      </div>
    </section>
    <section class="px-4"></section>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "settings",
  layout: "dashboard",
  middleware: "adminOrManagerOrWaiter",
  head() {
    return { title: "Settings - " + this.pageTitle };
  },
  data() {
    return {
      click: true,
      modal: false,
      form: {
        email: "",
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
    ...mapGetters(["isDev", "pageTitle"]),
    fields() {
      return [
        { key: "name", label: "NAME", span: "minmax(100PX, 1fr)" },
        { key: "email", label: "ID", span: "minmax(100PX, 1fr)" },
        {
          key: "actions",
          label: "Actions",
          span: "minmax(260PX, 1fr)",
          hide: !this.isDev,
        },
      ];
    },
    inputFields() {
      return [
        {
          type: "text",
          name: "email",
          label: { id: "email", title: "Employee phone or email" },
        },
        {
          type: "text",
          name: "name",
          label: { id: "email", title: "Employee name" },
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
          const { employees } = await this.$managerApi.fetchEmployee(params);
          this.items = this.items.concat(employees);
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
            await this.$managerApi.updateEmployee(this.form);
          } else {
            await this.$managerApi.createEmployee(this.form);
          }
          $nuxt.$emit(
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
            await this.$managerApi.deleteEmployee({ _id });
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
