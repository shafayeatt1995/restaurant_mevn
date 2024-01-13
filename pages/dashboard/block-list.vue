<template>
  <div>
    <section
      class="flex flex-col w-full px-4 md:justify-between md:items-center md:flex-row mb-5"
    >
      <div>
        <h2 class="text-3xl font-medium text-gray-600">Block list</h2>
      </div>
      <div class="flex flex-col mt-6 md:flex-row md:-mx-1 md:mt-0">
        <Button variant="green" @click.native.prevent="modal = true">
          <div class="flex items-center justify-center -mx-1">
            <font-awesome-icon :icon="['fas', 'plus']" class="mr-2" />

            <span class="mx-1 text-sm capitalize">Add a user</span>
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
        <template #image="{ item }">
          <img loading="lazy" :src="item.image" class="max-h-16" />
        </template>
        <template #created_at="{ value }">{{ value | agoDate }}</template>
        <template #date="{ value }">
          <Badge
            variant="green"
            :title="new Date(value) > new Date() ? `Blocked` : `Active`"
          />
        </template>
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
              title="No block user found"
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
        {{ editMode ? "Edit" : "Add" }} user
      </h3>
      <form class="mt-4" @submit.prevent="submit">
        <Input
          v-for="(field, i) in inputFields"
          :key="i"
          :field="field"
          v-model="form"
          :errors="errors"
        />
        <p class="text-gray-700 mt-3">Select block timer</p>
        <DatePicker
          v-model="form.date"
          class="w-full"
          type="datetime"
          placeholder="Select date range"
          prefix-class="block-date-picker performance-date-picker mx"
        />
        <small
          class="text-rose-700"
          v-if="errors && errors.date && typeof errors.date === 'object'"
        >
          <i>{{ errors.date.msg }}</i>
        </small>
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
            {{ editMode ? "Update" : "Add" }} user
          </Button>
        </div>
      </form>
    </Modal>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";
export default {
  name: "BlockUser",
  layout: "dashboard",
  middleware: "manager",
  components: { DatePicker },
  head() {
    return { title: "Block User - " + this.pageTitle };
  },
  data() {
    return {
      click: true,
      modal: false,
      form: {
        email: "",
        date: new Date(),
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
        { key: "email", label: "Email or ID", span: "minmax(100PX, 1fr)" },
        { key: "date", label: "Status", span: "minmax(120PX, 1fr)" },
        { key: "created_at", label: "CREATED", span: "minmax(120PX, 1fr)" },
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
          label: { id: "email", title: "User id or email" },
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
          const { users } = await this.$managerApi.fetchBlockUser(params);
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
            await this.$managerApi.updateBlockUser(this.form);
          } else {
            await this.$managerApi.createBlockUser(this.form);
          }
          this.$nuxt.$emit(
            "success",
            `User ${this.editMode ? "updated" : "added"} successfully`
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
        date: new Date(),
      };
      this.errors = {};
      this.editMode = false;
    },
    refetch() {
      this.items = [];
      this.fetchItem();
    },
    editItem({ _id, email, date }) {
      this.form = { _id, email, date: new Date(date) };
      this.editMode = true;
      this.modal = true;
    },
    async deleteItem(_id, key) {
      if (confirm("Are you sure, you want to delete?")) {
        try {
          if (this.click) {
            this.click = false;
            await this.$managerApi.deleteBlockUser({ _id });
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

<style lang="scss">
.w-full.block-date-picker.performance-date-picker {
  width: 100%;
}
// input.block-date-picker {
//   width: 100%;
// }
</style>
