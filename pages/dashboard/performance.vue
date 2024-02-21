<template>
  <div>
    <section
      class="flex flex-col w-full px-4 md:justify-between md:items-center md:flex-row mb-5"
    >
      <div>
        <h2 class="text-3xl font-medium text-gray-700">Performance</h2>
      </div>
      <div class="flex flex-col mt-6 md:flex-row md:-mx-1 md:mt-0">
        <client-only>
          <DatePicker
            v-model="form.date"
            class="w-full"
            range
            type="date"
            placeholder="Select date range"
            prefix-class="block-date-picker performance-date-picker mx"
          />
        </client-only>
      </div>
    </section>
    <section class="px-4">
      <TableResponsive
        :fields="fields"
        :items="loading ? 10 : items"
        :skeleton="loading"
      >
        <template #totalPrice="{ value }"> {{ value | number }} </template>
        <template #empty v-if="items.length === 0 && !loading">
          <div class="flex items-center text-center h-96 bg-white">
            <EmptyMessage
              @action="modal = true"
              title="No performance found"
              icon="far fa-circle-xmark"
              iconClass="rotate-45"
            />
          </div>
        </template>
      </TableResponsive>
    </section>
  </div>
</template>

<script>
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";
import { mapGetters } from "vuex";
export default {
  name: "Performance",
  layout: "dashboard",
  middleware: "manager",
  components: { DatePicker },
  head() {
    return { title: "Performance - " + this.pageTitle };
  },
  data() {
    return {
      click: true,
      form: { date: [new Date(), new Date()] },
      editMode: false,
      items: [],
      loading: true,
      errors: {},
      perPage: 20,
    };
  },
  computed: {
    ...mapGetters(["pageTitle"]),
    fields() {
      return [
        { key: "name", label: "NAME", span: "minmax(120PX, 1fr)" },
        { key: "totalOrder", label: "Total Order", span: "minmax(100PX, 1fr)" },
        { key: "totalPrice", label: "Total Price", span: "minmax(100PX, 1fr)" },
      ];
    },
  },
  watch: {
    "form.date"() {
      this.fetchItem();
    },
  },
  mounted() {
    this.fetchItem();
  },
  methods: {
    async fetchItem() {
      try {
        const { performance } = await this.$managerApi.fetchPerformance(
          this.form
        );
        this.items = performance;
      } catch (error) {
        this.$nuxt.$emit("error", error.response.data.message);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
