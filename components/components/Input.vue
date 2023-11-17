<template>
  <div class="mt-3">
    <label class="text-gray-700" :for="field.label?.id" v-if="field.label">{{
      field.label?.title
    }}</label>
    <div class="relative flex items-center">
      <span class="absolute">
        <font-awesome-icon
          :icon="field.icon"
          class="w-5 h-5 mx-3 text-gray-300"
        />
      </span>
      <input
        :type="field.type"
        :id="field.label?.id"
        class="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 focus:border-green-400 focus:ring-green-300 focus:outline-none focus:ring focus:ring-opacity-40"
        :placeholder="field.placeholder"
        :name="field.name"
        v-model="data[field.name]"
      />
    </div>
    <p class="text-rose-700" v-if="errors[field.name]">
      {{ errors[field.name].msg }}
    </p>
  </div>
</template>
<script>
export default {
  name: "Input",
  props: { field: Object, errors: Object },
  computed: {
    data: {
      get() {
        return this.$attrs.value;
      },
      set(value) {
        this.$emit("input", value);
      },
    },
  },
};
</script>
