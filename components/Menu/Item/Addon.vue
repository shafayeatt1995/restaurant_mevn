<template>
  <div class="my-2">
    <Button variant="green" type="button" @click.native.prevent="addAddon">
      <font-awesome-icon :icon="['fas', 'plus']" /> Add addon</Button
    >
    <div class="h-64" v-if="form.addons.length === 0"></div>
    <div
      class="mt-3 mb-8 bg-gray-200 relative px-2 py-6 rounded-xl"
      v-for="(addon, key) in form.addons"
      :key="`addon-${key}`"
    >
      <button
        class="rounded-full h-8 w-8 absolute right-[-10px] top-[-10px] text-white bg-rose-500 flex justify-center items-center"
        @click="removeAddon(key)"
        type="button"
      >
        <font-awesome-icon
          :icon="['fas', 'xmark']"
          class="text-2xl cursor-pointer"
        />
      </button>
      <input
        type="text"
        placeholder="Addon title"
        class="block w-full py-2 text-gray-700 bg-white border rounded-lg focus:border-green-400 focus:ring-green-300 focus:outline-none focus:ring focus:ring-opacity-40 px-4 border-gray-300 text-xl"
        v-model="form.addons[key].title"
      />
      <div class="mt-5 mb-2">
        <Button
          variant="transparent"
          type="button"
          @click.native.prevent="addOption(key)"
        >
          <font-awesome-icon :icon="['fas', 'plus']" /> Add</Button
        >
      </div>
      <div
        class="flex gap-2 mb-2 items-center"
        v-for="(option, index) in form.addons[key].options"
        :key="`options-${index}`"
      >
        <input
          placeholder="Addon name"
          class="block w-full py-2 text-gray-700 bg-white border rounded-lg focus:border-green-400 focus:ring-green-300 focus:outline-none focus:ring focus:ring-opacity-40 px-4 border-gray-300"
          v-model="form.addons[key].options[index].name"
        />
        <input
          type="number"
          v-model="form.addons[key].options[index].price"
          placeholder="Addon price"
          class="block w-full py-2 text-gray-700 bg-white border rounded-lg focus:border-green-400 focus:ring-green-300 focus:outline-none focus:ring focus:ring-opacity-40 px-4 border-gray-300"
        />
        <div
          v-if="form.addons[key].options.length > 1"
          class="w-7 h-7 bg-white rounded-full p-1 cursor-pointer flex justify-center items-center"
          @click="removeOption(key, index)"
        >
          <font-awesome-icon
            :icon="['far', 'circle-xmark']"
            class="text-red-500 text-xl"
            @click="modal = false"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MenuItemAddon",
  props: { errors: Object },
  computed: {
    form: {
      get() {
        return this.$attrs.value;
      },
      set(value) {
        this.$emit("input", value);
      },
    },
  },
  methods: {
    addAddon() {
      const data = {
        title: "New Addon",
        options: [{ name: "New Options", price: 0, stock: true }],
      };
      this.form.addons.push(data);
    },
    addOption(key) {
      const options = { name: "New Options", price: 0, stock: true };
      this.form.addons[key].options.push(options);
    },
    removeAddon(key) {
      this.form.addons.splice(key, 1);
    },
    removeOption(key, index) {
      this.form.addons[key].options.splice(index, 1);
    },
  },
};
</script>
