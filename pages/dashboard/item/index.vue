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
        <Button variant="green" @click.native.prevent="createItem">
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
        <template #name="{ item }">
          <div class="flex items-center gap-x-2">
            <img
              loading="lazy"
              class="object-cover w-24"
              :src="item.image"
              alt="image"
            />
            <div>
              <h2 class="font-medium text-gray-600">
                {{ item.name }}
              </h2>
            </div>
          </div>
        </template>
        <template #discount="{ item }">
          <Badge
            variant="red"
            v-if="item.discount"
            :title="`-${item.discountAmount}`"
          />
          <Badge variant="green" v-else title="No discount" />
        </template>
        <template #status="{ value }">
          <Badge
            variant="green"
            v-if="value"
            title="Active"
            :icon="['fas', 'check']"
          />
          <Badge variant="red" title="Hide" :icon="['fas', 'xmark']" v-else />
        </template>
        <template #actions="{ item, index }">
          <div class="flex gap-2">
            <Button
              variant="green"
              :to="{ name: 'dashboard-item-id', params: { id: item._id } }"
            >
              <font-awesome-icon :icon="['far', 'pen-to-square']" />
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
              @action="createItem"
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
import { mapGetters } from "vuex";
export default {
  name: "Item",
  layout: "dashboard",
  middleware: "manager",
  head() {
    return { title: "Item - " + this.pageTitle };
  },
  data() {
    return {
      click: true,
      items: [],
      perPage: 30,
      loading: true,
    };
  },
  computed: {
    ...mapGetters(["pageTitle"]),
    fields() {
      const fields = [
        { key: "name", label: "Name", span: "minmax(100PX, 1fr)" },
        { key: "price", label: "Price", span: "minmax(200PX, 1fr)" },
        { key: "discount", label: "Discount", span: "minmax(100PX, 1fr)" },
        { key: "status", label: "Status", span: "minmax(100PX, 1fr)" },
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
          const { items } = await this.$managerApi.fetchItems(params);
          this.items = this.items.concat(items);
        }
      } catch (error) {
        this.$nuxt.$emit("error", "Something wrong, PLease try again");
      } finally {
        this.loading = false;
      }
    },
    createItem() {
      this.$router.push({ name: "dashboard-item-id", params: { id: "null" } });
    },
    async deleteItem(_id, key) {
      if (confirm("Are you sure, you want to delete?")) {
        try {
          if (this.click) {
            this.click = false;
            await this.$managerApi.deleteItem({ _id });
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
