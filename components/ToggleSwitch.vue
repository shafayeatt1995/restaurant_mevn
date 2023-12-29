<template>
  <div>
    <label
      class="relative inline-flex items-center mb-5 cursor-pointer"
      v-if="size === 'small'"
    >
      <input type="checkbox" v-model="active" class="sr-only peer" />
      <div
        class="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-green-600"
      ></div>
    </label>

    <label
      class="relative inline-flex items-center mb-5 cursor-pointer"
      v-if="size === 'default'"
    >
      <input type="checkbox" v-model="active" class="sr-only peer" />
      <div
        class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"
      ></div>
    </label>

    <label
      class="relative inline-flex items-center cursor-pointer"
      v-if="size === 'large'"
    >
      <input type="checkbox" v-model="active" class="sr-only peer" />
      <div
        class="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-green-600"
      ></div>
    </label>
  </div>
</template>
<script>
export default {
  name: "ToggleSwitch",
  props: {
    size: {
      type: String,
      default: "default",
      validator: (value) => {
        return ["default", "small", "large"].includes(value);
      },
    },
  },
  computed: {
    active: {
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
