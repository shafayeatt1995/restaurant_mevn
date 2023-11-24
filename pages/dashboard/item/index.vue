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
        <Button variant="green" @click.native.prevent="modal = true">
          <div class="flex items-center justify-center -mx-1">
            <font-awesome-icon :icon="['fas', 'plus']" class="mr-2" />

            <span class="mx-1 text-sm capitalize">Create new item</span>
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
            <Button variant="green" @click.native.prevent="editItem(item)"
              ><font-awesome-icon :icon="['far', 'pen-to-square']" />
              Edit
            </Button>
            <Button
              variant="red"
              @click.native.prevent="deleteItem(item._id, index)"
            >
              <font-awesome-icon :icon="['fas', 'trash']" />
              Delete
            </Button>
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
  </div>
</template>

<script>
export default {
  name: "Item",
  layout: "dashboard",
  middleware: "owner",
  head() {
    return { title: "Item - " + process.env.APP_NAME };
  },
  data() {
    return {
      click: true,
      items: [],
      perPage: 50,
      loading: true,
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
        this.$nuxt.$emit("error", "Something wrong, PLease try again");
      } finally {
        this.loading = false;
      }
    },
    editItem(data) {},
    async deleteItem(_id, key) {
      if (confirm("Are you sure, you want to delete?")) {
        console.log("ami anik");
      }
    },
  },
};
</script>
