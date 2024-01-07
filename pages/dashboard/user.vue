<template>
  <div>
    <section
      class="flex flex-col w-full px-4 md:justify-between md:items-center md:flex-row mb-5"
    >
      <div>
        <h2 class="text-3xl font-medium text-gray-600">User</h2>
      </div>

      <div class="flex flex-col mt-6 md:flex-row md:-mx-1 md:mt-0">
        <Button variant="green" @click.native.prevent="modal = true">
          <div class="flex items-center justify-center -mx-1">
            <font-awesome-icon :icon="['fas', 'plus']" class="mr-2" />

            <span class="mx-1 text-sm capitalize">Create new user</span>
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
        <template #type="{ value }">
          <Badge variant="red" title="Admin" v-if="value === 'admin'" />
          <Badge
            variant="blue"
            title="Manager"
            v-else-if="value === 'manager'"
          />
          <Badge
            variant="purple"
            title="Waiter"
            v-else-if="value === 'waiter'"
          />
          <Badge variant="yellow" title="Chef" v-else-if="value === 'chef'" />
          <Badge variant="green" title="User" v-else-if="value === 'user'" />
        </template>
        <template #deleted="{ value }">
          <Badge
            variant="red"
            title="Deleted"
            v-if="value"
            :icon="['fas', 'xmark']"
          />
          <Badge
            variant="green"
            title="Active"
            :icon="['fas', 'check']"
            v-else
          />
        </template>
        <template #suspended="{ value }">
          <Badge
            variant="red"
            title="Suspended"
            v-if="value"
            :icon="['fas', 'xmark']"
          />
          <Badge
            variant="green"
            title="Active"
            :icon="['fas', 'check']"
            v-else
          />
        </template>
        <template #actions="{ item, index }">
          <div class="flex gap-2">
            <Button
              :variant="item.deleted ? 'green' : 'red'"
              @click.native.prevent="deleteItem(item._id, index)"
            >
              <font-awesome-icon :icon="['fas', 'user-xmark']" />

              {{ item.deleted ? "Active" : "Delete" }}
            </Button>
            <Button
              :variant="item.suspended ? 'green' : 'red'"
              @click.native.prevent="suspendItem(item._id, index)"
            >
              <font-awesome-icon :icon="['fas', 'user-slash']" />
              {{ item.suspended ? "Active" : "Suspend" }}
            </Button>
          </div>
        </template>
        <template #empty v-if="items.length === 0 && !loading">
          <div class="flex items-center text-center h-96 bg-white">
            <EmptyMessage
              @action="modal = true"
              title="No user found"
              buttonText="Add user"
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
        {{ editMode ? "Edit" : "Create new" }} user
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
            {{ editMode ? "Update" : "Create" }} user
          </Button>
        </div>
      </form>
    </Modal>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "User",
  layout: "dashboard",
  middleware: "admin",
  head() {
    return { title: "User - " + this.pageTitle };
  },
  data() {
    return {
      click: true,
      modal: false,
      form: {
        name: "",
        email: "",
        password: "",
        type: "manager",
        restaurantName: "",
      },
      editMode: false,
      items: [],
      perPage: 50,
      loading: true,
      errors: {},
    };
  },
  computed: {
    ...mapGetters(["pageTitle"]),
    fields() {
      const fields = [
        { key: "name", label: "Name", span: "minmax(100PX, 1fr)" },
        { key: "email", label: "Email", span: "minmax(200PX, 1fr)" },
        { key: "type", label: "Type", span: "minmax(100PX, 1fr)" },
        { key: "suspended", label: "Suspended", span: "minmax(100PX, 1fr)" },
        { key: "deleted", label: "Delete", span: "minmax(100PX, 1fr)" },
        { key: "actions", label: "Actions", span: "minmax(275PX, 1fr)" },
      ];
      return fields;
    },

    inputFields() {
      const fields = [
        {
          type: "text",
          placeholder: "Name",
          icon: ["far", "user"],
          name: "name",
        },
        {
          type: "text",
          placeholder: "Email",
          icon: ["far", "envelope"],
          name: "email",
        },
        {
          hide: this.editMode,
          type: "password",
          placeholder: "Password",
          icon: ["fas", "lock"],
          name: "password",
        },
        {
          hide: this.editMode,
          type: "select",
          placeholder: "Type",
          icon: ["fas", "lock"],
          name: "type",
          options: [
            { value: "admin", label: "Admin" },
            { value: "manager", label: "Manager" },
            { value: "chef", label: "Chef" },
            { value: "waiter", label: "Waiter" },
            { value: "user", label: "User" },
          ],
        },
        {
          hide: this.form.type !== "manager" || this.editMode,
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
          const { users } = await this.$adminApi.fetchUser(params);
          this.items = this.items.concat(users);
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
          if (this.editMode) {
            await this.$adminApi.updateUser(this.form);
          } else {
            await this.$adminApi.createUser(this.form);
          }
          this.$nuxt.$emit(
            "success",
            `User ${this.editMode ? "updated" : "created"} successfully`
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
          this.errors = error?.response?.data?.errors;
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
        type: "manager",
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
            await this.$adminApi.deleteUser({ _id });
            this.items[key].deleted = !this.items[key].deleted;
            this.click = true;
          }
          this.$nuxt.$emit("success", "User deleted successfully");
        } catch (error) {
          this.$nuxt.$emit(
            "error",
            error.response.data?.message || error.message
          );
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
            await this.$adminApi.suspendUser({ _id });
            this.items[key].suspended = !this.items[key].suspended;
            this.click = true;
          }
          this.$nuxt.$emit("success", "User suspended successfully");
        } catch (error) {
          this.$nuxt.$emit(
            "error",
            error.response.data?.message || error.message
          );
        } finally {
          this.click = true;
        }
      }
    },
  },
};
</script>
