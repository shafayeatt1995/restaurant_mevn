<template>
  <div class="flex flex-col mt-6">
    <div class="overflow-x-auto">
      <div class="inline-block min-w-full align-middle">
        <div class="overflow-hidden border border-gray-200 md:rounded-lg">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr
                class="grid"
                style="grid-template-columns: var(--grid-template-columns)"
                :style="{ '--grid-template-columns': grid_template_columns }"
              >
                <template v-for="(field, index) in fields">
                  <th
                    class="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 uppercase"
                    v-if="!field.hide || false"
                    :key="field.key"
                    :class="[
                      field.title_class,
                      field.sortable ? 'cursor-pointer' : '',
                    ]"
                    @click="checkSortable ? $emit('sorted', field) : null"
                  >
                    <slot :name="field.key + '-label'">
                      <img v-if="field.title_image" :src="field.title_image" />
                      <template v-else>
                        {{ field.hide_title ? "" : field.label }}
                      </template>
                      <icon
                        :icon="['fas', 'arrow-down-long']"
                        v-if="checkSortable(field)"
                        :class="field.rotate_sort ? 'rotate-180' : ''"
                        class="ml-2"
                      />
                    </slot>
                  </th>
                </template>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr
                v-for="(item, index) in items"
                :key="index"
                :class="[body_clicked ? 'cursor-pointer' : '']"
                class="grid"
                style="grid-template-columns: var(--grid-template-columns)"
                :style="{ '--grid-template-columns': grid_template_columns }"
                @click="body_clicked ? $emit('bodyClicked', index) : null"
              >
                <template v-for="field in fields">
                  <td
                    class="px-4 py-4 text-sm font-medium whitespace-nowrap flex items-center text-gray-700"
                    v-if="!field.hide || false"
                    :key="field.key"
                    :class="[
                      data_index === index
                        ? slot_name.some((data) => data === field.key)
                          ? ''
                          : 'hidden lg:block'
                        : '',
                      field.class,
                    ]"
                    :style="{ '--col-span-mobile': field.col_span_mobile || 1 }"
                    @click.capture="activeDropdown = item?._id"
                  >
                    <div
                      v-if="skeleton"
                      class="container flex flex-col items-center justify-between p-6 mx-auto space-y-4 animate-pulse sm:space-y-0 sm:flex-row"
                    >
                      <p class="w-full h-3 bg-gray-200 rounded-lg"></p>
                    </div>
                    <slot
                      v-else
                      :name="field.key"
                      :item="item"
                      :index="index"
                      :value="item[field.key]"
                    >
                      {{ item[field.key] }}
                    </slot>
                  </td>
                </template>
                <slot name="information" :item="item" :index="index" />
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div class="rounded-lg overflow-hidden">
      <slot name="empty" />
    </div>
  </div>
</template>
<script>
export default {
  name: "TableResponsive",
  props: {
    fields: Array,
    items: {
      type: [Array, Number],
      default: () => [],
    },
    title: String,
    th_class: String,
    stripe: Boolean,
    scrollable: Boolean,
    body_clicked: Boolean,
    skeleton: Boolean,
    mobile_grid: { type: Number, default: 2 },
    active_sort: String,
    scrollable_class: String,
    total_rows: { type: Number, default: 0 },
    per_page: { type: Number, default: 10 },
    value: { type: Number, default: 1 },
  },

  data() {
    return {
      data_index: "",
      slot_name: [],
      scrollLeft: 0,
      activeDropdown: "",
    };
  },

  computed: {
    grid_template_columns() {
      const filter = this.fields.filter((data) => !data.hide);
      return filter
        .map((field) => {
          let span;

          if (typeof field.span === "number") {
            span = field.span + "fr";
          } else if (typeof field.span === "string") {
            span = field.span;
          } else {
            span = "1fr";
          }
          return span;
        })
        .join(" ");
    },
    checkSortable() {
      return (field) => {
        return field.sortable && field.key == this.active_sort;
      };
    },
  },
};
</script>

<style></style>
